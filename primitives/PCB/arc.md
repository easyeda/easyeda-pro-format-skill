# TPcbArc

> 返回 [PCB 图元索引](../../documents/PCB.md)

## 定义

圆弧线

**PCB / 封装域里的一条圆弧**，一行一条（`type:"ARC"`）。常见用途是圆弧走线、
圆形板框的圆角段、以及封装里的圆弧丝印 / 装配线。

## 几何怎么定 —— 与原理图的圆弧**不是同一套**

用 **起点 + 终点 + 圆弧角** 三者定弧：
- **起点** `startX` / `startY`、**终点** `endX` / `endY`；
- **圆弧角** `angle` —— 以谁为基准由 `arcType` 决定：`DOT`（两点圆弧）拿它表示
  起终点之间跨过的角度，`CENT`（中心圆弧）则**以圆心为基准**。

⚠️ 原理图的圆弧（[TSchArc](../SCH_PAGE/arc.md)）用的是「起点 + **参考点** + 终点」三点定弧，**没有 `angle`**；
两者字段不通用，别照另一套去写。

⚠️ **`angle` 不要写 `0` 或 `±360`** —— 解码会据此把**整条 ARC 拒收**
（角度为空、为 0、绝对值为 360 都判非法）。方向：**逆时针为正、顺时针为负**（本域统一口径）。

## 单位与归属

- 坐标（`startX`/`startY`/`endX`/`endY`）与线宽 `width` 的单位都是 **mil**（见 `TPcbBase`）；
- 它**属于某一层**（`layerId`），并可在 `netName` 上标注所属网络；
- ⚠️ `specialColor` 在本格式里**是个空壳**：编解码两侧都没有它，写盘不产、读盘不消费，
  字段保留仅为兼容历史数据 —— **别照它生成数据**。

id 由编辑器生成（随机 16 位十六进制），形态见 [TElementId](../REFERENCE/t-element-id.md)。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| partitionId | [TElementId](../REFERENCE/t-element-id.md) \| null |  | - | 所属分区编号，为null表示无分区：**值是 `PARTITION` 行的外壳 `id`**（图元 id，不是 uuid） |
| groupId | [TElementId](../REFERENCE/t-element-id.md) | ✓ | - | 分组编号：相同值的图元属于同一组；**未分组时的取值见下**。 ⚠️ **未分组写的是数字 `0`**（不是字符串 `"0"`）——真实数据里 `"groupId":0` 出现 5 千余次，而 `"groupId":"0"` **一次都没有**；FOOTPRINT 文档下该字段**恒为 0**。 成组时才是字符串（组合 id）；未分组的判定是「`groupId` 为空或 FOOTPRINT 文档」，此时写**数字 0**。 ⚠️ 上方的类型 `string` 比实际形态窄（装不下数字 0）——**放宽类型会波及 pro-* 仓的 消费方，需跨仓协调后再改**，故此处暂以说明为准。本文件各 `@example` 里的 `"groupId":"0"` 也是同一问题，同理按“说明为准”处理。 |
| layerId | number \| [ELayerCode](../REFERENCE/e-layer-code.md) | ✓ | - | 层编号。 **第几号是哪一层见 [ELayerCode](../REFERENCE/e-layer-code.md)** —— 那是层编号的枚举（`1` = 顶层、`47` = 孔层 …）， 里面逐条写了每个编号对应的**层类型字符串名**。 ⚠️ 类型写成 **`number \| ELayerCode`** 而不是单用枚举：实际数据里层号本来就是普通数字， 消费方大量按 `number` 传值，收紧成枚举会让那些构造点编译不过。 |
| locked | `boolean` | ✓ | - | 是否锁定：锁定后**不能拖拽、不能删除、不能用鼠标键盘调整大小、不能调整形状**。 实际是以**锁弹窗**（`ActionForLockedObjectsDialog`）拦截，用户可在弹窗里选 「解锁并继续」，所以不是硬禁止。 |
| zIndex | `number \| null` | ✓ | default: -1 | 同层内的叠放次序（渲染排序键，格式里没有高度语义）。 **它是独立字段，不由 id 推导**：3.0 里未设置时写盘为 **-1**（内部实现即 `_zIndex \|\| -1`；真实数据 `"zIndex":-1` 出现 4 千余次）。**例外**：`ATTR` / `META` 的默认体直接写 `null`。 「由 id 尾部数字推导」是 **2.0 的语义**（2.0 的 `getZIndex` + `idReg`；那个正则也 匹配不了 3.0 的随机 16 位十六进制 id）。**不要照它推导 3.0 的值。** ⚠️ **VIA 是个特例：3.0 写盘不会产出该键**——写盘端的 switch 里**没有** zIndex 分支 （虽然槽位表里有该槽位），取值为 `undefined` 时会被 JSON 序列化整个丢弃。 但**真机存量里仍能遇到 2.0 遗留的带 `zIndex` 的 VIA 行**（样本 15455 条 VIA 中 10404 条载荷含该键，其值恰好等于 id 尾部的数字——正是上面说的「2.0 语义」）。 **读盘时不要假设它不存在。** |
| netName | `string` | ✓ | - | NET，网络名称 |
| startX | `number` | ✓ | - | 开始 X（mil） |
| startY | `number` | ✓ | - | 开始 Y（mil） |
| endX | `number` | ✓ | - | 结束 X（mil） |
| endY | `number` | ✓ | - | 结束 Y（mil） |
| angle | `number` | ✓ | - | 圆弧角，逆时针正，顺时针负。 ⚠️ 不要写 `0` 或 `±360`：解码的 `arcCheck()` 会据此整条拒收该 ARC （`angle` 为空、`\|角度\|` 为 360、或为 0 时校验不通过）。 |
| width | `number` | ✓ | - | 线宽（mil） |
| arcType | [EArcType](../REFERENCE/e-arc-type.md) | ✓ | - | 取值范围：DOT（两点圆弧）、CENT（中心圆弧） |
| specialColor | `string` |  | pattern: ^$\|^#[0-9A-Fa-f]{6}$ | 特殊颜色。 ⚠️ **当前格式里它只是个空壳**：编码 / 解码两侧**都没有它**（属未实现 / 2.0 遗留）， 写盘不会产出该键、读盘也不会消费。 字段保留仅为兼容历史数据。**不要据此推断同族字段**—— [TPcbImage](./image.md) / [TPcbString](./string.md) / [TPcbDimension](./dimension.md) 的 `specialColor` 是**真的会写会读**的。 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-pcb-arc.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `layerId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `netName`: 必需字段 |
| required | ERROR | `startX`: 必需字段 |
| required | ERROR | `startY`: 必需字段 |
| required | ERROR | `endX`: 必需字段 |
| required | ERROR | `endY`: 必需字段 |
| required | ERROR | `angle`: 必需字段 |
| required | ERROR | `width`: 必需字段 |
| required | ERROR | `arcType`: 必需字段 |
| enum | ERROR | `arcType`: 允许值: DOT, CENT |
| pattern | ERROR | `specialColor`: 匹配模式: ^$\|^#[0-9A-Fa-f]{6}$ |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PCB/t-pcb-arc.md)

