# TPanelString

> 返回 [PANEL 图元索引](../../documents/PANEL.md)

## 定义

面板文字

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| groupId | `string` | ✓ | pattern: ^0$|^[1-9][0-9]*$ | 分组编号, 没有则为空（预留）："0" 不分组，非 0 为组标志，相同组标志的为一组 |
| layer | `number` | ✓ | min: 0 | 层 |
| locked | `boolean` | ✓ | - | 是否锁定 |
| zIndex | `number | null` | ✓ | min: 0 | Z 轴高度, null 为默认 |
| valid | `boolean` | ✓ | - | 是否生效 |
| visible | `boolean` | ✓ | - | 是否可见 |
| cover | `number | null` | ✓ | - | 遮盖透明度 |
| name | `string` | ✓ | - | 名称 |
| rotation | `number` | ✓ | min: 0, max: 360 | 控制点旋转角度（角度制） |
| value | `string` | ✓ | - | 内容 |
| fontFamily | `string` | ✓ | - | 字体名称 |
| fontSize | `number` | ✓ | min: 0 | 字号 |
| fontWeight | `number` | ✓ | - | 字体粗细 |
| italic | `boolean` | ✓ | - | 是否斜体 |
| underline | `boolean` | ✓ | - | 是否下划线 |
| strikeout | `boolean` | ✓ | - | 是否删除线 |
| align | `EAlign` | ✓ | - | 对齐模式 |
| strokeColor | `string` | ✓ | pattern: ^(#[0-9A-Fa-f]{6})|(rgb\(\d{1,3},\d{1,3},\d{1,3}\))|(cmyk\(\d{1,3},\d{1,3},\d{1,3},\d{1,3}\))|$ | 颜色 |
| opacity | `number` | ✓ | min: 0, max: 1 | 不透明度：0 - 1 |
| matrix | `number[] | null` | ✓ | - | 变换矩阵 |
| strokes | `boolean` | ✓ | - | 是否变换描边 |
| path | `any[][]` | ✓ | - | 路径，复杂多边形 |
| transScope | `EPanelTransScope` |  | - | 控制范围：'PRINT' 打印、 'COVER' 遮盖、 'PRINT_COVER' 打印 + 遮盖 |
| transPrint | `number | null` |  | - | 自定义打印层不透明度（可选）：被控制范围选中，默认 0.3，未选中，默认 0，范围 0~1 |
| transWhite | `number | null` |  | - | 自定义遮盖层不透明度（可选）：被控制范围选中，默认 0.3，未选中，默认 0，范围 0~1 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-panel-string.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `layer`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `valid`: 必需字段 |
| required | ERROR | `visible`: 必需字段 |
| required | ERROR | `cover`: 必需字段 |
| required | ERROR | `name`: 必需字段 |
| required | ERROR | `rotation`: 必需字段 |
| required | ERROR | `value`: 必需字段 |
| required | ERROR | `fontFamily`: 必需字段 |
| required | ERROR | `fontSize`: 必需字段 |
| required | ERROR | `fontWeight`: 必需字段 |
| required | ERROR | `italic`: 必需字段 |
| required | ERROR | `underline`: 必需字段 |
| required | ERROR | `strikeout`: 必需字段 |
| required | ERROR | `align`: 必需字段 |
| required | ERROR | `strokeColor`: 必需字段 |
| required | ERROR | `opacity`: 必需字段 |
| required | ERROR | `matrix`: 必需字段 |
| required | ERROR | `strokes`: 必需字段 |
| required | ERROR | `path`: 必需字段 |
| pattern | ERROR | `groupId`: 匹配模式: ^0$|^[1-9][0-9]*$ |
| minimum | ERROR | `layer`: 最小值: 0 |
| minimum | ERROR | `zIndex`: 最小值: 0 |
| minimum | ERROR | `rotation`: 最小值: 0 |
| maximum | ERROR | `rotation`: 最大值: 360 |
| minimum | ERROR | `fontSize`: 最小值: 0 |
| enum | ERROR | `align`: 允许值: LEFT_BOTTOM, CENTER_BOTTOM, RIGHT_BOTTOM, LEFT_MIDDLE, CENTER_MIDDLE, RIGHT_MIDDLE, LEFT_TOP, CENTER_TOP, RIGHT_TOP |
| pattern | ERROR | `strokeColor`: 匹配模式: ^(#[0-9A-Fa-f]{6})|(rgb\(\d{1,3},\d{1,3},\d{1,3}\))|(cmyk\(\d{1,3},\d{1,3},\d{1,3},\d{1,3}\))|$ |
| minimum | ERROR | `opacity`: 最小值: 0 |
| maximum | ERROR | `opacity`: 最大值: 1 |
| enum | ERROR | `transScope`: 允许值: PRINT, COVER, PRINT&COVER |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PANEL/t-panel-string.md)

