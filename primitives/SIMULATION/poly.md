# TSchPoly

> 返回 [SIMULATION 图元索引](../../documents/SIMULATION.md)

## 定义

原理图多边形

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| partId | `string` |  | - | 部件编号；符号页专属，表示归属于某部件下, 非符号忽略该字段 |
| groupId | `string` | ✓ | - | 分组编号, 没有则为空 |
| locked | `boolean` | ✓ | - | 是否锁定 |
| zIndex | `number \| null` | ✓ | - | Z 轴高度 |
| yAxisDirection | `TYAxisDirection` |  | - | Y 轴方向标记：仅 eprj3 本地文件格式会带，读盘时被剥离；语义见 TYAxisDirection |
| points | `TDot[]` | ✓ | - | 点集坐标 |
| closed | `boolean` | ✓ | - | 是否自动闭合：如果自动闭合，则结束点会自动连上起始点 |
| startShape | `EBothEndShape \| null` | ✓ | - | 取值范围：NONE（无）、ARROW（箭头）、SOLID_ARROW（实心箭头）、TAIL（尾巴）、SOLID_TAIL（燕尾箭头）、CIRCLE（圆形）、SQUARE（方形）、RHOMBUS（菱形） |
| endShape | `EBothEndShape \| null` | ✓ | - | 取值范围：NONE（无）、ARROW（箭头）、SOLID_ARROW（实心箭头）、TAIL（尾巴）、SOLID_TAIL（燕尾箭头）、CIRCLE（圆形）、SQUARE（方形）、RHOMBUS（菱形） |
| strokeColor | `string \| null` | ✓ | - | 颜色 |
| strokeStyle | `EStrokeStyle \| null` | ✓ | default: null | 取值范围：SOLID（实线）、SHORT_DASH（短划线）、DOT（点线）、DOT_DASH（点划线） |
| fillColor | `string \| null` | ✓ | - | 填充颜色："" 不填充，填充自动闭合起始点和结束点 |
| strokeWidth | `number \| null` | ✓ | - | 宽度 |
| fillStyle | `ESchFillStyle \| null` | ✓ | default: null | 取值范围：NONE（无填充）、SOLID（实心填充）、GRID（网格）、HORIZONTAL_LINE（横线）、VERTICAL_LINE（竖线）、RHOMBIC（菱形网格）、LEFT_SLASH_LINE（左斜线）、RIGHT_SLASH_LINE（右斜线） |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-sch-poly.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `points`: 必需字段 |
| required | ERROR | `closed`: 必需字段 |
| required | ERROR | `startShape`: 必需字段 |
| required | ERROR | `endShape`: 必需字段 |
| required | ERROR | `strokeColor`: 必需字段 |
| required | ERROR | `strokeStyle`: 必需字段 |
| required | ERROR | `fillColor`: 必需字段 |
| required | ERROR | `strokeWidth`: 必需字段 |
| required | ERROR | `fillStyle`: 必需字段 |
| enum | ERROR | `yAxisDirection`: 允许值: up, down |
| enum | ERROR | `startShape`: 允许值: NONE, ARROW, SOLID_ARROW, TAIL, SOLID_TAIL, CIRCLE, SQUARE, RHOMBUS, null |
| enum | ERROR | `endShape`: 允许值: NONE, ARROW, SOLID_ARROW, TAIL, SOLID_TAIL, CIRCLE, SQUARE, RHOMBUS, null |
| enum | ERROR | `strokeStyle`: 允许值: SOLID, SHORT_DASH, DOT, DOT_DASH, null |
| enum | ERROR | `fillStyle`: 允许值: NONE, SOLID, GRID, HORIZONTAL_LINE, VERTICAL_LINE, RHOMBIC, LEFT_SLASH_LINE, RIGHT_SLASH_LINE, null |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/SIMULATION/t-sch-poly.md)

