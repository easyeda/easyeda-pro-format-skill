# TSchLine

> 返回 [SYMBOL 图元索引](../../documents/SYMBOL.md)

## 定义

单线段

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| lineGroup | `string` | ✓ | pattern: ^[0-9a-f]{16}$ | 所属的导线或总线组 id |
| startX | `number` | ✓ | - | 起点坐标 X |
| startY | `number` | ✓ | - | 起点坐标 Y |
| endX | `number` | ✓ | - | 结束坐标 X |
| endY | `number` | ✓ | - | 结束坐标 Y |
| strokeColor | `string | null` | ✓ | - | 颜色 |
| strokeStyle | `EStrokeStyle | null` | ✓ | - | 样式, null 为默认 |
| fillColor | `string | null` | ✓ | - | 填充颜色："" 不填充，填充自动闭合起始点和结束点 |
| strokeWidth | `number | null` | ✓ | - | 宽度 |
| fillStyle | `ESchFillStyle | null` | ✓ | - | 填充样式, null 为默认 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-sch-line.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `lineGroup`: 必需字段 |
| required | ERROR | `startX`: 必需字段 |
| required | ERROR | `startY`: 必需字段 |
| required | ERROR | `endX`: 必需字段 |
| required | ERROR | `endY`: 必需字段 |
| required | ERROR | `strokeColor`: 必需字段 |
| required | ERROR | `strokeStyle`: 必需字段 |
| required | ERROR | `fillColor`: 必需字段 |
| required | ERROR | `strokeWidth`: 必需字段 |
| required | ERROR | `fillStyle`: 必需字段 |
| pattern | ERROR | `lineGroup`: 匹配模式: ^[0-9a-f]{16}$ |
| enum | ERROR | `strokeStyle`: 允许值: SOLID, SHORT_DASH, DOT, DOT_DASH |
| enum | ERROR | `fillStyle`: 允许值: NONE, SOLID, GRID, HORIZONTAL_LINE, VERTICAL_LINE, RHOMBIC, LEFT_SLASH_LINE, RIGHT_SLASH_LINE |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/SYMBOL/t-sch-line.md)

