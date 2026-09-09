# TSchArc

> 返回 [SYMBOL 图元索引](../../documents/SYMBOL.md)

## 定义

圆弧

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| partId | `string` |  | - | 部件编号；符号页专属，表示归属于某部件下, 非符号忽略该字段 |
| groupId | `string` | ✓ | - | 分组编号, 没有则为空 |
| locked | `boolean` | ✓ | - | 是否锁定 |
| zIndex | `number | null` | ✓ | - | Z 轴高度 |
| startX | `number` | ✓ | - | 起始 X |
| startY | `number` | ✓ | - | 起始 Y |
| referX | `number` | ✓ | - | 参考 X |
| referY | `number` | ✓ | - | 参考 Y |
| endX | `number` | ✓ | - | 结束 X |
| endY | `number` | ✓ | - | 结束 Y |
| strokeColor | `string | null` | ✓ | - | 颜色 |
| strokeStyle | `EStrokeStyle | null` | ✓ | - | 样式, null 为默认 |
| fillColor | `string | null` | ✓ | - | 填充颜色："" 不填充，填充自动闭合起始点和结束点 |
| strokeWidth | `number | null` | ✓ | - | 宽度 |
| fillStyle | `ESchFillStyle | null` | ✓ | - | 填充样式, null 为默认 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-sch-arc.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `startX`: 必需字段 |
| required | ERROR | `startY`: 必需字段 |
| required | ERROR | `referX`: 必需字段 |
| required | ERROR | `referY`: 必需字段 |
| required | ERROR | `endX`: 必需字段 |
| required | ERROR | `endY`: 必需字段 |
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

→ [查看示例](../../examples/SYMBOL/t-sch-arc.md)

