# TSchLine

> 返回 [SCH_PAGE 图元索引](../../documents/SCH_PAGE.md)

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
| yAxisDirection | `TYAxisDirection` |  | - | Y 轴方向标记：**仅 eprj3 本地文件格式会带**，读盘时被剥离。 取值：`up` **已按 Y 轴向上写出**（本地文件固定用它）、`down` Y 轴向下 （**字段缺失等价于它**，两者是同一件事）。完整语义见 `TYAxisDirection`。 本类型（`LINE`）翻转的字段是 **`startY` 与 `endY`**（`startX`/`endX` 不动）。 |
| strokeColor | `string \| null` | ✓ | - | 描边颜色：`"#RRGGBB"` 十六进制色值；**null 表示采用主题默认色** 注：本文件各示例中的该字段**一律为 null**，非空色的具体串格式未在示例中出现； 可参照同文件 `TSchPin.color` 的 `@pattern ^$\|^#[0-9A-Fa-f]{6}$`。 |
| strokeStyle | `EStrokeStyle \| null` | ✓ | default: null | 取值范围：SOLID（实线）、SHORT_DASH（短划线）、DOT（点线）、DOT_DASH（点划线） |
| fillColor | `string \| null` | ✓ | - | 填充颜色：`"#RRGGBB"` 十六进制色值；`""` 表示不填充（填充会自动闭合起始点与结束点）； null 表示采用主题默认 |
| strokeWidth | `number \| null` | ✓ | default: null | 宽度：null 表示采用主题默认线宽 |
| fillStyle | `ESchFillStyle \| null` | ✓ | default: null | 取值范围：NONE（无填充）、SOLID（实心填充）、GRID（网格）、HORIZONTAL_LINE（横线）、VERTICAL_LINE（竖线）、RHOMBIC（菱形网格）、LEFT_SLASH_LINE（左斜线）、RIGHT_SLASH_LINE（右斜线） |

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
| enum | ERROR | `yAxisDirection`: 允许值: up, down |
| enum | ERROR | `strokeStyle`: 允许值: SOLID, SHORT_DASH, DOT, DOT_DASH, null |
| enum | ERROR | `fillStyle`: 允许值: NONE, SOLID, GRID, HORIZONTAL_LINE, VERTICAL_LINE, RHOMBIC, LEFT_SLASH_LINE, RIGHT_SLASH_LINE, null |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/SCH_PAGE/t-sch-line.md)

