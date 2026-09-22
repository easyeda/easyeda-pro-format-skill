# TDifferentialPairWire

> 返回 [SIMULATION_SCH 图元索引](../../documents/SIMULATION_SCH.md)

## 定义

差分对

注：「差分对组」复用本类型，**盘上载荷只含 `positiveNet` / `negativeNet`**
（差分对组记录这两个字段皆为空串）。

两个层次分清楚，不要混为一谈：
- **【外层数据id构造】盘上 id** = `["DIFFERENTIAL_PAIR", 名称]`，两段各有含义：
  **第 1 段** `"DIFFERENTIAL_PAIR"` 是固定前缀；**第 2 段**是**差分对的名字**，
  即用户在工程里给这对网络起的名字（属性面板上显示、可以改的那个文本，**不是任何 id**）。
  这是**键式 id**（盘上是数组串、靠键区分同一类型下的多条记录，见 [TKeyedElementId](../REFERENCE/t-keyed-element-id.md)）；
  有父级（属于某个差分对组）时，id **再追加第 3 段 = 那个差分对组的名字**：
  `["DIFFERENTIAL_PAIR", 名称, 组名]`。
- **盘上载荷** = `{ positiveNet, negativeNet }`，**写盘端不含 `name`，也不含 `parentName`**
  （`parentName` 同样只进 id）。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| negativeNet | `string` | ✓ | - | 负级网络：网络名称（不是图元 id）。**「差分对组」记录里为空串** |
| positiveNet | `string` | ✓ | - | 正级网络：网络名称（不是图元 id）。**「差分对组」记录里为空串** |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-differential-pair-wire.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `negativeNet`: 必需字段 |
| required | ERROR | `positiveNet`: 必需字段 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/SIMULATION_SCH/t-differential-pair-wire.md)

