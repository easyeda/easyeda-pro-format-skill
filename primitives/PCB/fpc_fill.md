# TPcbFpcFill

> 返回 [PCB 图元索引](../../documents/PCB.md)

## 定义

柔性工艺补强板

**FPC（柔性板）上贴的那块补强片**，一行一条（`type:"FPC_FILL"`）：
软板在连接器、元件焊盘、金手指这些地方需要局部变硬，否则插拔或焊接时容易折伤 ——
本图元就是用来画出「在哪儿贴、贴多大、用什么材料、多厚」的。

- `material` 是补强材质（常见如聚酰亚胺、以及 3M / TESA 各家型号，取值见 [EFpcMaterial](../REFERENCE/e-fpc-material.md)），
  `thickness` 是厚度；
- `path` 给出补强外形，与普通填充一样是**复杂多边形**，各子路径是**彼此独立**的多块，
  **不是**「外轮廓 + 内洞」的嵌套关系。

⚠️ **厚度单位是 mm**，与坐标的单位（mil）不同 —— 而且读写两端都**不做 ×10 / ÷10 换算**，
盘上写多少就是多少，别按坐标那套去推。

id 由编辑器生成（随机 16 位十六进制），形态见 [TElementId](../REFERENCE/t-element-id.md)。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| partitionId | [TElementId](../REFERENCE/t-element-id.md) \| null |  | - | 所属分区编号，为null表示无分区：**值是 `PARTITION` 行的外壳 `id`**（图元 id，不是 uuid） |
| groupId | [TElementId](../REFERENCE/t-element-id.md) | ✓ | - | 分组编号：相同值的图元属于同一组；**未分组时的取值见下**。 ⚠️ **未分组写的是数字 `0`**（不是字符串 `"0"`）——真实数据里 `"groupId":0` 出现 5 千余次，而 `"groupId":"0"` **一次都没有**；FOOTPRINT 文档下该字段**恒为 0**。 成组时才是字符串（组合 id）；未分组的判定是「`groupId` 为空或 FOOTPRINT 文档」，此时写**数字 0**。 ⚠️ 上方的类型 `string` 比实际形态窄（装不下数字 0）——**放宽类型会波及 pro-* 仓的 消费方，需跨仓协调后再改**，故此处暂以说明为准。本文件各 `@example` 里的 `"groupId":"0"` 也是同一问题，同理按“说明为准”处理。 |
| layerId | number \| [ELayerCode](../REFERENCE/e-layer-code.md) | ✓ | - | 层编号。 **第几号是哪一层见 [ELayerCode](../REFERENCE/e-layer-code.md)** —— 那是层编号的枚举（`1` = 顶层、`47` = 孔层 …）， 里面逐条写了每个编号对应的**层类型字符串名**。 ⚠️ 类型写成 **`number \| ELayerCode`** 而不是单用枚举：实际数据里层号本来就是普通数字， 消费方大量按 `number` 传值，收紧成枚举会让那些构造点编译不过。 |
| locked | `boolean` | ✓ | - | 是否锁定：锁定后**不能拖拽、不能删除、不能用鼠标键盘调整大小、不能调整形状**。 实际是以**锁弹窗**（`ActionForLockedObjectsDialog`）拦截，用户可在弹窗里选 「解锁并继续」，所以不是硬禁止。 |
| zIndex | `number \| null` | ✓ | default: -1 | 同层内的叠放次序（渲染排序键，格式里没有高度语义）。 **它是独立字段，不由 id 推导**：3.0 里未设置时写盘为 **-1**（内部实现即 `_zIndex \|\| -1`；真实数据 `"zIndex":-1` 出现 4 千余次）。**例外**：`ATTR` / `META` 的默认体直接写 `null`。 「由 id 尾部数字推导」是 **2.0 的语义**（2.0 的 `getZIndex` + `idReg`；那个正则也 匹配不了 3.0 的随机 16 位十六进制 id）。**不要照它推导 3.0 的值。** ⚠️ **VIA 是个特例：3.0 写盘不会产出该键**——写盘端的 switch 里**没有** zIndex 分支 （虽然槽位表里有该槽位），取值为 `undefined` 时会被 JSON 序列化整个丢弃。 但**真机存量里仍能遇到 2.0 遗留的带 `zIndex` 的 VIA 行**（样本 15455 条 VIA 中 10404 条载荷含该键，其值恰好等于 id 尾部的数字——正是上面说的「2.0 语义」）。 **读盘时不要假设它不存在。** |
| material | [EFpcMaterial](../REFERENCE/e-fpc-material.md) | ✓ | - | 取值范围：Polyimide（PI）、FR4（FR4）、Stainless Steel（钢片）、3M Tape（3M双面胶）、EMI Shielding Film（电磁屏蔽膜） |
| thickness | `number` | ✓ | - | 厚度：**单位 mm**，读写两端都**不做 ×10 / ÷10 换算**（原样返回、解码端只做 `+thickness`）——**不要按本文件其它长度字段的 mil 口径换算它**。 |
| path | [TPcbComplexPolygon](../REFERENCE/t-pcb-complex-polygon.md) | ✓ | - | 补强外形（**复杂多边形**，即 [TPcbComplexPolygon](../REFERENCE/t-pcb-complex-polygon.md)）：外层数组的每个元素是一条子路径， 每个元素本身又是一个单多边形（[TPcbSinglePolygon](../REFERENCE/t-pcb-single-polygon.md)）。 读法为 **【并列】**，且**所有子路径都会被解析**——**本类型与 BOARD / POUR 等不同**： 解码端把整个 `path` 交给 `parseShapeModel`、**保留全部**子路径， 所以「首个子路径是外轮廓、其后每个子路径都是内洞」与「后续内洞当前不会被使用」 这两句**对本类型都不成立**。 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-pcb-fpc-fill.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `layerId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `material`: 必需字段 |
| required | ERROR | `thickness`: 必需字段 |
| required | ERROR | `path`: 必需字段 |
| enum | ERROR | `material`: 允许值: Polyimide, FR4, Stainless Steel, 3M Tape, EMI Shielding Film |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PCB/t-pcb-fpc-fill.md)

