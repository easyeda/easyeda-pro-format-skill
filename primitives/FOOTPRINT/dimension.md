# TPcbDimension

> 返回 [FOOTPRINT 图元索引](../../documents/FOOTPRINT.md)

## 定义

PCB 尺寸工具集

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| partitionId | `string \| null` |  | - | 所属分区编号，为null表示无分区 |
| groupId | `string` | ✓ | - | 分组编号：相同值的图元属于同一组；**未分组时的取值见下**。 ⚠️ **未分组写的是数字 `0`**（不是字符串 `"0"`）——真实数据里 `"groupId":0` 出现 5 千余次，而 `"groupId":"0"` **一次都没有**；FOOTPRINT 文档下该字段**恒为 0**。 成组时才是字符串（组合 id）；未分组的判定是「`groupId` 为空或 FOOTPRINT 文档」，此时写**数字 0**。 ⚠️ 上方的类型 `string` 比实际形态窄（装不下数字 0）——**放宽类型会波及 pro-* 仓的 消费方，需跨仓协调后再改**，故此处暂以说明为准。本文件各 `@example` 里的 `"groupId":"0"` 也是同一问题，同理按“说明为准”处理。 |
| layerId | `number` | ✓ | - | 层编号 |
| locked | `boolean` | ✓ | - | 是否锁定 |
| zIndex | `number \| null` | ✓ | default: -1 | 同层内的叠放次序（渲染排序键，格式里没有高度语义）。 **它是独立字段，不由 id 推导**：3.0 里未设置时写盘为 **-1**（内部实现即 `_zIndex \|\| -1`；真实数据 `"zIndex":-1` 出现 4 千余次）。**例外**：`ATTR` / `META` 的默认体直接写 `null`。 「由 id 尾部数字推导」是 **2.0 的语义**（2.0 的 `getZIndex` + `idReg`；那个正则也 匹配不了 3.0 的随机 16 位十六进制 id）。**不要照它推导 3.0 的值。** ⚠️ **VIA 是个特例：3.0 写盘不会产出该键**——写盘端的 switch 里**没有** zIndex 分支 （虽然槽位表里有该槽位），取值为 `undefined` 时会被 JSON 序列化整个丢弃。 但**真机存量里仍能遇到 2.0 遗留的带 `zIndex` 的 VIA 行**（样本 15455 条 VIA 中 10404 条载荷含该键，其值恰好等于 id 尾部的数字——正是上面说的「2.0 语义」）。 **读盘时不要假设它不存在。** |
| type | `EDimensionType` | ✓ | - | 取值范围：LENGTH（长度）、RADIUS（半径）、ANGLE（角度） |
| unit | `EUnitName` | ✓ | - | 取值范围：mil（密耳）、inch（英寸）、cm（厘米）、mm（毫米） |
| strokeWidth | `number` | ✓ | - | 线宽 |
| precision | `number` | ✓ | min: 0 | 精度 |
| textFollow | `boolean` | ✓ | - | 文字是否跟随。 ⚠️ **它实际是个死字段**：写出端**恒写数字 `1`**，解码端解构后**根本不读它**。 **真正决定「文字跟随」的是 `text.x === null`**——解码时由 x/y 是否为 null 推导 `positionIsNull`（`AttrDecode`）。所以要表达语义请写 `text.x`， 本字段照写 `1` 即可。 |
| coords | `number[]` | ✓ | - | 坐标集：扁平数组，**元素的个数与含义随 `type` 而变**—— - `LENGTH`（长度）：8 个数，依次为 左点 `x y`、起点 `x y`、终点 `x y`、右点 `x y` - `RADIUS`（半径）：5 个数，依次为 终点 `x y`、起点 `x y`、半径 - `ANGLE`（角度）：6 个数，依次为 起点 `x y`、圆心 `x y`、终点 `x y` |
| text | `TPcbString` | ✓ | - | 文本。 ⚠️ **类型/示例声明为完整的 TPcbString，实际写盘却只有 15 个键**—— `layerId` / `x` / `y` / `text` / `fontFamily` / `fontSize` / `strokeWidth` / `bold` / `italic` / `origin` / `angle` / `reverse` / `expansion` / `mirror` / `locked` （编码端 key 表）。 **盘上不会出现** `partitionId` / `groupId` / `zIndex` / `specialColor`， 往这四项塞东西**不会落盘**。 另：处于「跟随」态时 `x` / `y` 会被写成 `null`。 |
| specialColor | `string` |  | pattern: ^$\|^#[0-9A-Fa-f]{6}$ | 特殊颜色。**不是可以随便填的自由字段**：只在**顶层 / 底层丝印层** （`layerId` 为 TopSilk / BottomSilk）、**模型带有丝印色**（`silkColor != null`）、 **且 `getParent() == null`** 时才写出，否则**恒为 `null`**。 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-pcb-dimension.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `layerId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `type`: 必需字段 |
| required | ERROR | `unit`: 必需字段 |
| required | ERROR | `strokeWidth`: 必需字段 |
| required | ERROR | `precision`: 必需字段 |
| required | ERROR | `textFollow`: 必需字段 |
| required | ERROR | `coords`: 必需字段 |
| required | ERROR | `text`: 必需字段 |
| enum | ERROR | `type`: 允许值: LENGTH, RADIUS, ANGLE |
| enum | ERROR | `unit`: 允许值: mil, inch, cm, mm |
| minimum | ERROR | `precision`: 最小值: 0 |
| pattern | ERROR | `specialColor`: 匹配模式: ^$\|^#[0-9A-Fa-f]{6}$ |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/FOOTPRINT/t-pcb-dimension.md)

