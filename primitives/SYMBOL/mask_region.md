# TSchMaskRegion

> 返回 [SYMBOL 图元索引](../../documents/SYMBOL.md)

## 定义

屏蔽区域

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| maskExpand | `boolean` | ✓ | - | 是否屏蔽,默认是 |
| dotX1 | `number` | ✓ | - | 点 1 X |
| dotY1 | `number` | ✓ | - | 点 1 Y |
| dotX2 | `number` | ✓ | - | 点 2 X |
| dotY2 | `number` | ✓ | - | 点 2 Y |
| expandWidth | `number | null` | ✓ | - | 展开宽度 |
| expandHeight | `number | null` | ✓ | - | 展开高度 |
| strokeColor | `string | null` | ✓ | - | 颜色 |
| strokeStyle | `EStrokeStyle | null` | ✓ | - | 样式, null 为默认 |
| fillColor | `string | null` | ✓ | - | 填充颜色："" 不填充，填充自动闭合起始点和结束点 |
| strokeWidth | `number | null` | ✓ | - | 宽度 |
| fillStyle | `ESchFillStyle | null` | ✓ | - | 填充样式, null 为默认 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-sch-mask-region.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `maskExpand`: 必需字段 |
| required | ERROR | `dotX1`: 必需字段 |
| required | ERROR | `dotY1`: 必需字段 |
| required | ERROR | `dotX2`: 必需字段 |
| required | ERROR | `dotY2`: 必需字段 |
| required | ERROR | `expandWidth`: 必需字段 |
| required | ERROR | `expandHeight`: 必需字段 |
| required | ERROR | `strokeColor`: 必需字段 |
| required | ERROR | `strokeStyle`: 必需字段 |
| required | ERROR | `fillColor`: 必需字段 |
| required | ERROR | `strokeWidth`: 必需字段 |
| required | ERROR | `fillStyle`: 必需字段 |
| enum | ERROR | `strokeStyle`: 允许值: SOLID, SHORT_DASH, DOT, DOT_DASH |
| enum | ERROR | `fillStyle`: 允许值: NONE, SOLID, GRID, HORIZONTAL_LINE, VERTICAL_LINE, RHOMBIC, LEFT_SLASH_LINE, RIGHT_SLASH_LINE |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/SYMBOL/t-sch-mask-region.md)

