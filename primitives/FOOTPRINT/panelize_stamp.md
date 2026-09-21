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
| center_percent | `number[]` |  | - | 邮票孔组位置与板子左侧的距离——**比例值（0~1 的小数，不是百分数）**， 实际坐标 = 板框左边界 + 比例 × 板框宽度；数组元素对应各组。 例：`[0.3333, 0.6667]` 表示两组分别位于板宽 1/3、2/3 处。 不填时按组序均分：第 i 组取 `(i+1)/(组数+1)`。 |

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

