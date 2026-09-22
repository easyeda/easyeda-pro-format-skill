# TPanelizeStamp

> 返回 [FOOTPRINT 图元索引](../../documents/FOOTPRINT.md)

## 定义

邮票孔参数

拼板时**板与板 / 板与边框之间怎么连**的一种方式：沿板边打一**排小孔**（掰板时沿孔断开）。
一排骨由 `stampHoleGroupQuantity` 组组成、每组若干个孔，各组落在板边的什么位置见
`center_percent`；不启用邮票孔时改用 V-CUT（见 `on` 字段）。

⚠️ 3.0 里它**不是独立的一行数据**：只作为 [TPanelize](./panelize.md) 的 `horizontalStamp` /
`verticalStamp` 两个字段的**内嵌**载体出现（水平、垂直各一份），
**方向由它在 [TPanelize](./panelize.md) 里的字段位置表达**。

其 `id`（如单独出现在盘上）形态见 [TElementId](../REFERENCE/t-element-id.md)（普通形态为随机 16 位十六进制）。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| on | `boolean` | ✓ | - | 是否启用（不启用则使用 V-CUT） |
| stampHoleGroupQuantity | `number` | ✓ | - | 邮票孔组数 |
| stampHoleDiameter | `number` | ✓ | - | 邮票孔直径（mil） |
| stampHoleQuantityPerGroup | `number` | ✓ | - | 邮票孔每组数量 |
| stampHoleSpacing | `number` | ✓ | - | 邮票孔间距（mil） |
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

