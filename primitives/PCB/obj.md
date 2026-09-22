# TPcbObj

> 返回 [PCB 图元索引](../../documents/PCB.md)

## 定义

PCB 二进制内嵌对象

PCB / 封装域里的**二进制内嵌对象**，一行一条（`type:"OBJ"`）：把图片、附件等
数据**内嵌**在画布上 —— 既可以**直接显示**，也可以**作为附件下载**。

数据本身放在 `path` 里，有两种写法：与 Data URL 完全兼容的
`data:[<mediatype>][;base64],<data>`，或指向工程内 BLOB 文档的 `blob:<hashid>`。

它是有尺寸的图元：位置取左上角（`startX` / `startY`），外形由 `width` / `height`、
绕左上角旋转的 `angle` 以及是否水平镜像的 `mirror` 决定。

id 由编辑器生成（随机 16 位十六进制），形态见 [TElementId](../REFERENCE/t-element-id.md)。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| partitionId | [TElementId](../REFERENCE/t-element-id.md) \| null |  | - | 所属分区编号，为null表示无分区：**值是 `PARTITION` 行的外壳 `id`**（图元 id，不是 uuid） |
| groupId | [TElementId](../REFERENCE/t-element-id.md) | ✓ | - | 分组编号：相同值的图元属于同一组；**未分组时的取值见下**。 ⚠️ **未分组写的是数字 `0`**（不是字符串 `"0"`）——真实数据里 `"groupId":0` 出现 5 千余次，而 `"groupId":"0"` **一次都没有**；FOOTPRINT 文档下该字段**恒为 0**。 成组时才是字符串（组合 id）；未分组的判定是「`groupId` 为空或 FOOTPRINT 文档」，此时写**数字 0**。 ⚠️ 上方的类型 `string` 比实际形态窄（装不下数字 0）——**放宽类型会波及 pro-* 仓的 消费方，需跨仓协调后再改**，故此处暂以说明为准。本文件各 `@example` 里的 `"groupId":"0"` 也是同一问题，同理按“说明为准”处理。 |
| layerId | number \| [ELayerCode](../REFERENCE/e-layer-code.md) | ✓ | - | 层编号。 **第几号是哪一层见 [ELayerCode](../REFERENCE/e-layer-code.md)** —— 那是层编号的枚举（`1` = 顶层、`47` = 孔层 …）， 里面逐条写了每个编号对应的**层类型字符串名**。 ⚠️ 类型写成 **`number \| ELayerCode`** 而不是单用枚举：实际数据里层号本来就是普通数字， 消费方大量按 `number` 传值，收紧成枚举会让那些构造点编译不过。 |
| locked | `boolean` | ✓ | - | 是否锁定：锁定后**不能拖拽、不能删除、不能用鼠标键盘调整大小、不能调整形状**。 实际是以**锁弹窗**（`ActionForLockedObjectsDialog`）拦截，用户可在弹窗里选 「解锁并继续」，所以不是硬禁止。 |
| zIndex | `number \| null` | ✓ | default: -1 | 同层内的叠放次序（渲染排序键，格式里没有高度语义）。 **它是独立字段，不由 id 推导**：3.0 里未设置时写盘为 **-1**（内部实现即 `_zIndex \|\| -1`；真实数据 `"zIndex":-1` 出现 4 千余次）。**例外**：`ATTR` / `META` 的默认体直接写 `null`。 「由 id 尾部数字推导」是 **2.0 的语义**（2.0 的 `getZIndex` + `idReg`；那个正则也 匹配不了 3.0 的随机 16 位十六进制 id）。**不要照它推导 3.0 的值。** ⚠️ **VIA 是个特例：3.0 写盘不会产出该键**——写盘端的 switch 里**没有** zIndex 分支 （虽然槽位表里有该槽位），取值为 `undefined` 时会被 JSON 序列化整个丢弃。 但**真机存量里仍能遇到 2.0 遗留的带 `zIndex` 的 VIA 行**（样本 15455 条 VIA 中 10404 条载荷含该键，其值恰好等于 id 尾部的数字——正是上面说的「2.0 语义」）。 **读盘时不要假设它不存在。** |
| fileName | `string` | ✓ | - | 文件名 |
| startX | `number` | ✓ | - | 左上 X（mil） |
| startY | `number` | ✓ | - | 左上 Y（mil） |
| width | `number` | ✓ | - | 宽（mil） |
| height | `number` | ✓ | - | 高（mil） |
| angle | `number` | ✓ | - | 旋转角度（角度制，**逆时针为正**），绕 左上 点 |
| mirror | `boolean` | ✓ | - | 原始图片是否水平镜像，镜像以原始图片 BBox 中点进行水平镜像 |
| path | `string` | ✓ | - | 二进制数据 1.一般格式，与 Data Urls 完全兼容 data:[<mediatype>][;base64],<data> 2.BLOB 引用格式 blob:hashid |
| specialColor | `string` |  | pattern: ^$\|^#[0-9A-Fa-f]{6}$ | 特殊颜色。 ⚠️ **当前格式里它只是个空壳**：编码 / 解码两侧**都没有它**（属未实现 / 2.0 遗留），写盘不会产出该键、读盘也不会消费。 字段保留仅为兼容历史数据。**不要据此推断同族字段**—— [TPcbImage](./image.md) / [TPcbString](./string.md) / [TPcbDimension](./dimension.md) 的 `specialColor` 是**真的会写会读**的。 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-pcb-obj.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `layerId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `fileName`: 必需字段 |
| required | ERROR | `startX`: 必需字段 |
| required | ERROR | `startY`: 必需字段 |
| required | ERROR | `width`: 必需字段 |
| required | ERROR | `height`: 必需字段 |
| required | ERROR | `angle`: 必需字段 |
| required | ERROR | `mirror`: 必需字段 |
| required | ERROR | `path`: 必需字段 |
| pattern | ERROR | `specialColor`: 匹配模式: ^$\|^#[0-9A-Fa-f]{6}$ |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PCB/t-pcb-obj.md)

