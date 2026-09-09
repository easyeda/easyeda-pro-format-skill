# TSchRect

> 返回 [SCH_PAGE 图元索引](../../documents/SCH_PAGE.md)

## 定义

矩形

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| partId | `string` |  | - | 部件编号；符号页专属，表示归属于某部件下, 非符号忽略该字段 |
| groupId | `string` | ✓ | - | 分组编号, 没有则为空 |
| locked | `boolean` | ✓ | - | 是否锁定 |
| zIndex | `number | null` | ✓ | - | Z 轴高度 |
| dotX1 | `number` | ✓ | - | 点 1 X |
| dotY1 | `number` | ✓ | - | 点 1 Y |
| dotX2 | `number` | ✓ | - | 点 2 X |
| dotY2 | `number` | ✓ | - | 点 2 Y |
| radiusX | `number` | ✓ | min: 0 | 圆角半径 X：0 表示非圆角 |
| radiusY | `number` | ✓ | min: 0 | 圆角半径 Y：0 表示非圆角 |
| rotation | `number` | ✓ | min: 0, max: 360 | 旋转角度（角度制）, 绕点 1 旋转 |
| text | `TSchText` |  | - | 3.3 添加文本字段 |
| strokeColor | `string | null` | ✓ | - | 颜色 |
| strokeStyle | `EStrokeStyle | null` | ✓ | - | 样式, null 为默认 |
| fillColor | `string | null` | ✓ | - | 填充颜色："" 不填充，填充自动闭合起始点和结束点 |
| strokeWidth | `number | null` | ✓ | - | 宽度 |
| fillStyle | `ESchFillStyle | null` | ✓ | - | 填充样式, null 为默认 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-sch-rect.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `dotX1`: 必需字段 |
| required | ERROR | `dotY1`: 必需字段 |
| required | ERROR | `dotX2`: 必需字段 |
| required | ERROR | `dotY2`: 必需字段 |
| required | ERROR | `radiusX`: 必需字段 |
| required | ERROR | `radiusY`: 必需字段 |
| required | ERROR | `rotation`: 必需字段 |
| required | ERROR | `strokeColor`: 必需字段 |
| required | ERROR | `strokeStyle`: 必需字段 |
| required | ERROR | `fillColor`: 必需字段 |
| required | ERROR | `strokeWidth`: 必需字段 |
| required | ERROR | `fillStyle`: 必需字段 |
| minimum | ERROR | `radiusX`: 最小值: 0 |
| minimum | ERROR | `radiusY`: 最小值: 0 |
| minimum | ERROR | `rotation`: 最小值: 0 |
| maximum | ERROR | `rotation`: 最大值: 360 |
| enum | ERROR | `strokeStyle`: 允许值: SOLID, SHORT_DASH, DOT, DOT_DASH |
| enum | ERROR | `fillStyle`: 允许值: NONE, SOLID, GRID, HORIZONTAL_LINE, VERTICAL_LINE, RHOMBIC, LEFT_SLASH_LINE, RIGHT_SLASH_LINE |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/SCH_PAGE/t-sch-rect.md)

