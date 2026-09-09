# TDifferentialPair

> 返回 [SCH 图元索引](../../documents/SCH.md)

## 定义

差分对

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| name | `string` | ✓ | - | 名称 |
| negativeNet | `string` | ✓ | - | 负级网络 |
| positiveNet | `string` | ✓ | - | 正级网络 |
| parentName | `string` |  | - | 父级名称 |

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

