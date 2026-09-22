# TPcbString

> 返回 [PCB 图元索引](../../documents/PCB.md)

## 定义

PCB 文字

PCB / 封装域里的**文字图元**，一行一条（`type:"STRING"`）：在某一层上写一段文本 ——
丝印字符、装配标记、技术说明都能用它。

`x` / `y` 是**锚点**，具体落在文字的哪个角 / 边由 `origin`（对齐模式）决定；
文字可旋转，出现在底层时一般同时把 `mirror` 置上。

⚠️ `bold` / `italic` 当前是**死字段**：写盘恒为数字 `0`、解码也不回填，读出来恒为「未启用」。
⚠️ `specialColor` 不是自由字段：只在**顶层 / 底层丝印层**且模型带丝印色时才会写出。

id 由编辑器生成（随机 16 位十六进制），形态见 [TElementId](../REFERENCE/t-element-id.md)。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| partitionId | [TElementId](../REFERENCE/t-element-id.md) \| null |  | - | 所属分区编号，为null表示无分区：**值是 `PARTITION` 行的外壳 `id`**（图元 id，不是 uuid） |
| groupId | [TElementId](../REFERENCE/t-element-id.md) | ✓ | - | 分组编号：相同值的图元属于同一组；**未分组时的取值见下**。 ⚠️ **未分组写的是数字 `0`**（不是字符串 `"0"`）——真实数据里 `"groupId":0` 出现 5 千余次，而 `"groupId":"0"` **一次都没有**；FOOTPRINT 文档下该字段**恒为 0**。 成组时才是字符串（组合 id）；未分组的判定是「`groupId` 为空或 FOOTPRINT 文档」，此时写**数字 0**。 ⚠️ 上方的类型 `string` 比实际形态窄（装不下数字 0）——**放宽类型会波及 pro-* 仓的 消费方，需跨仓协调后再改**，故此处暂以说明为准。本文件各 `@example` 里的 `"groupId":"0"` 也是同一问题，同理按“说明为准”处理。 |
| layerId | number \| [ELayerCode](../REFERENCE/e-layer-code.md) | ✓ | - | 层编号。 **第几号是哪一层见 [ELayerCode](../REFERENCE/e-layer-code.md)** —— 那是层编号的枚举（`1` = 顶层、`47` = 孔层 …）， 里面逐条写了每个编号对应的**层类型字符串名**。 ⚠️ 类型写成 **`number \| ELayerCode`** 而不是单用枚举：实际数据里层号本来就是普通数字， 消费方大量按 `number` 传值，收紧成枚举会让那些构造点编译不过。 |
| locked | `boolean` | ✓ | - | 是否锁定：锁定后**不能拖拽、不能删除、不能用鼠标键盘调整大小、不能调整形状**。 实际是以**锁弹窗**（`ActionForLockedObjectsDialog`）拦截，用户可在弹窗里选 「解锁并继续」，所以不是硬禁止。 |
| zIndex | `number \| null` | ✓ | default: -1 | 同层内的叠放次序（渲染排序键，格式里没有高度语义）。 **它是独立字段，不由 id 推导**：3.0 里未设置时写盘为 **-1**（内部实现即 `_zIndex \|\| -1`；真实数据 `"zIndex":-1` 出现 4 千余次）。**例外**：`ATTR` / `META` 的默认体直接写 `null`。 「由 id 尾部数字推导」是 **2.0 的语义**（2.0 的 `getZIndex` + `idReg`；那个正则也 匹配不了 3.0 的随机 16 位十六进制 id）。**不要照它推导 3.0 的值。** ⚠️ **VIA 是个特例：3.0 写盘不会产出该键**——写盘端的 switch 里**没有** zIndex 分支 （虽然槽位表里有该槽位），取值为 `undefined` 时会被 JSON 序列化整个丢弃。 但**真机存量里仍能遇到 2.0 遗留的带 `zIndex` 的 VIA 行**（样本 15455 条 VIA 中 10404 条载荷含该键，其值恰好等于 id 尾部的数字——正是上面说的「2.0 语义」）。 **读盘时不要假设它不存在。** |
| x | `number` | ✓ | - | 位置 X（mil） |
| y | `number` | ✓ | - | 位置 Y（mil） |
| text | `string` | ✓ | - | 内容 |
| fontFamily | `string` | ✓ | - | 字体名称 |
| fontSize | `number` | ✓ | min: 1 | 字号 单位：**mil** |
| strokeWidth | `number` | ✓ | min: 0 | 粗细 单位：**mil** |
| bold | `boolean` | ✓ | - | 是否加粗。 ⚠️ **写盘恒为数字 `0`**（编码器直接 `return 0`，不是布尔），解码端解构后 **从不赋值**该字段 —— 也就是说当前版本它**恒为 0、读出来等于未启用**。 |
| italic | `boolean` | ✓ | - | 是否斜体。口径同 `bold`：**写盘恒为数字 `0`、解码忽略**。 |
| origin | [EAlign](../REFERENCE/e-align.md) | ✓ | - | 取值范围：LEFT_BOTTOM（左底）、CENTER_BOTTOM（中底）、RIGHT_BOTTOM（右底）、LEFT_MIDDLE（左中）、CENTER_MIDDLE（中中）、RIGHT_MIDDLE（右中）、LEFT_TOP（左顶）、CENTER_TOP（中顶）、RIGHT_TOP（右顶） |
| angle | `number` | ✓ | min: 0 | 旋转角度（角度制，**逆时针为正**） |
| reverse | `boolean` | ✓ | - | 是否反相扩展 |
| expansion | `number` | ✓ | - | 反相扩展尺寸：反相扩展区域的尺寸，支持负数 |
| mirror | `boolean` | ✓ | - | 是否镜像，一般来说 ，当一个文字出现在底层，这里也需要相应调整成 1 |
| specialColor | `string` |  | pattern: ^$\|^#[0-9A-Fa-f]{6}$ | 特殊颜色。**不是可以随便填的自由字段**：只在**顶层 / 底层丝印层** （`layerId` 为 TopSilk / BottomSilk）**且模型带有丝印色**（`silkColor != null`）时 才会写出，否则**恒为 `null`**。**生成数据时不要指望它一定落盘。** |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-pcb-string.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `layerId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `x`: 必需字段 |
| required | ERROR | `y`: 必需字段 |
| required | ERROR | `text`: 必需字段 |
| required | ERROR | `fontFamily`: 必需字段 |
| required | ERROR | `fontSize`: 必需字段 |
| required | ERROR | `strokeWidth`: 必需字段 |
| required | ERROR | `bold`: 必需字段 |
| required | ERROR | `italic`: 必需字段 |
| required | ERROR | `origin`: 必需字段 |
| required | ERROR | `angle`: 必需字段 |
| required | ERROR | `reverse`: 必需字段 |
| required | ERROR | `expansion`: 必需字段 |
| required | ERROR | `mirror`: 必需字段 |
| minimum | ERROR | `fontSize`: 最小值: 1 |
| minimum | ERROR | `strokeWidth`: 最小值: 0 |
| enum | ERROR | `origin`: 允许值: LEFT_BOTTOM, CENTER_BOTTOM, RIGHT_BOTTOM, LEFT_MIDDLE, CENTER_MIDDLE, RIGHT_MIDDLE, LEFT_TOP, CENTER_TOP, RIGHT_TOP |
| minimum | ERROR | `angle`: 最小值: 0 |
| pattern | ERROR | `specialColor`: 匹配模式: ^$\|^#[0-9A-Fa-f]{6}$ |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PCB/t-pcb-string.md)

