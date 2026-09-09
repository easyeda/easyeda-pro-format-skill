# TPanelizeStamp

> 返回 [FOOTPRINT 图元索引](../../documents/FOOTPRINT.md)

## 定义

邮票孔参数

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| on | `boolean` | ✓ | - | 是否启用（不启用则使用 V-CUT） |
| stampHoleGroupQuantity | `number` | ✓ | - | 邮票孔组数 |
| stampHoleDiameter | `number` | ✓ | - | 邮票孔直径 |
| stampHoleQuantityPerGroup | `number` | ✓ | - | 邮票孔每组数量 |
| stampHoleSpacing | `number` | ✓ | - | 邮票孔间距 |
| center_percent | `number[]` |  | - | 邮票孔组位置与板子左侧的距离（百分比） |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-panelize-stamp.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `on`: 必需字段 |
| required | ERROR | `stampHoleGroupQuantity`: 必需字段 |
| required | ERROR | `stampHoleDiameter`: 必需字段 |
| required | ERROR | `stampHoleQuantityPerGroup`: 必需字段 |
| required | ERROR | `stampHoleSpacing`: 必需字段 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/FOOTPRINT/t-panelize-stamp.md)

