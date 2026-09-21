# TDifferentialPair

> 返回 [SCH 图元索引](../../documents/SCH.md)

## 定义

差分对

注：「差分对组」复用本类型，**盘上载荷只含 `positiveNet` / `negativeNet`**
（差分对组记录这两个字段皆为空串）。

两个层次分清楚，不要混为一谈：
- **盘上 id** = `["DIFFERENTIAL_PAIR", <名称>]`；有父级（属于某个差分对组）时
  id 的第 3 元为**组名**：`["DIFFERENTIAL_PAIR", <名称>, <组名>]`。
- **盘上载荷** = `{ positiveNet, negativeNet }`，**写盘端不含 `name`，也不含 `parentName`**
  （`parentName` 同样只进 id）。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| name | `string` | ✓ | - | 名称：**写盘端编码进外壳 `id`、不写进载荷**（id 形如 `["DIFFERENTIAL_PAIR","DP1"]`）； 解析端从 id 还原后运行时对象才有它。 |
| negativeNet | `string` | ✓ | - | 负级网络：网络名称（不是图元 id）。**「差分对组」记录里为空串 |
| positiveNet | `string` | ✓ | - | 正级网络：网络名称（不是图元 id）。**「差分对组」记录里为空串 |
| parentName | `string` |  | - | 父级名称：**编码进外壳 `id` 的第 3 个元素**（`["DIFFERENTIAL_PAIR", <名称>, <父级名称>]`）， 指向同域内「差分对组」记录的 `name`；**无父级时 id 只有 2 个元素**，本字段不出现在载荷中。 「差分对组」记录自身该项为空串。 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-differential-pair.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `name`: 必需字段 |
| required | ERROR | `negativeNet`: 必需字段 |
| required | ERROR | `positiveNet`: 必需字段 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/SCH/t-differential-pair.md)

