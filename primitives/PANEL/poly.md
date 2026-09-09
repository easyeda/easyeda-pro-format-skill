# TPanelPoly

> 返回 [PANEL 图元索引](../../documents/PANEL.md)

## 定义

面板多边形

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
| strokeWidth | `number` | ✓ | min: 0 | 线宽 |
| strokeStyle | `EStrokeStyle | null` | ✓ | - | 线型：SOLID 实线 SHORT_DASH 短划线 DOT 点线 DOT_DASH 点划线, null 为默认 |
| strokeColor | `string` | ✓ | pattern: ^(#[0-9A-Fa-f]{6})|(rgb\(\d{1,3},\d{1,3},\d{1,3}\))|(cmyk\(\d{1,3},\d{1,3},\d{1,3},\d{1,3}\))|$ | 描边颜色 |
| fillColor | `string` | ✓ | pattern: ^$|^(#[0-9A-Fa-f]{6})|(rgb\(\d{1,3},\d{1,3},\d{1,3}\))|(cmyk\(\d{1,3},\d{1,3},\d{1,3},\d{1,3}\))$|^(data:)|(blob:) | 填充 1.无填充模式："" 2.颜色模式：#FF00FF 3.图片内嵌模式：data,base64,xxxxaaa134234 4.图片外部引用模式：blob:hashid |
| opacity | `number` | ✓ | min: 0, max: 1 | 不透明度：0 - 1 |
| autoClose | `boolean` | ✓ | - | 是否自动闭合首尾端点 |
| ploys | `any[][]` | ✓ | - | 复杂多边形 |
| displayFill | `boolean` | ✓ | - | 是否显示填充（可选） |
| displayStroke | `boolean` | ✓ | - | 是否显示描边（可选） |
| matrix | `number[] | null` | ✓ | - | 变换矩阵 |
| transScope | `EPanelTransScope` |  | - | 控制范围：'PRINT' 打印、 'COVER' 遮盖、 'PRINT_COVER' 打印 + 遮盖 |
| transPrint | `number | null` |  | - | 自定义打印层不透明度（可选）：被控制范围选中，默认 0.3，未选中，默认 0，范围 0~1 |
| transWhite | `number | null` |  | - | 自定义遮盖层不透明度（可选）：被控制范围选中，默认 0.3，未选中，默认 0，范围 0~1 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-panel-poly.json)

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
| required | ERROR | `strokeWidth`: 必需字段 |
| required | ERROR | `strokeStyle`: 必需字段 |
| required | ERROR | `strokeColor`: 必需字段 |
| required | ERROR | `fillColor`: 必需字段 |
| required | ERROR | `opacity`: 必需字段 |
| required | ERROR | `autoClose`: 必需字段 |
| required | ERROR | `ploys`: 必需字段 |
| required | ERROR | `displayFill`: 必需字段 |
| required | ERROR | `displayStroke`: 必需字段 |
| required | ERROR | `matrix`: 必需字段 |
| pattern | ERROR | `groupId`: 匹配模式: ^0$|^[1-9][0-9]*$ |
| minimum | ERROR | `layer`: 最小值: 0 |
| minimum | ERROR | `zIndex`: 最小值: 0 |
| minimum | ERROR | `rotation`: 最小值: 0 |
| maximum | ERROR | `rotation`: 最大值: 360 |
| minimum | ERROR | `strokeWidth`: 最小值: 0 |
| enum | ERROR | `strokeStyle`: 允许值: SOLID, SHORT_DASH, DOT, DOT_DASH |
| pattern | ERROR | `strokeColor`: 匹配模式: ^(#[0-9A-Fa-f]{6})|(rgb\(\d{1,3},\d{1,3},\d{1,3}\))|(cmyk\(\d{1,3},\d{1,3},\d{1,3},\d{1,3}\))|$ |
| pattern | ERROR | `fillColor`: 匹配模式: ^$|^(#[0-9A-Fa-f]{6})|(rgb\(\d{1,3},\d{1,3},\d{1,3}\))|(cmyk\(\d{1,3},\d{1,3},\d{1,3},\d{1,3}\))$|^(data:)|(blob:) |
| minimum | ERROR | `opacity`: 最小值: 0 |
| maximum | ERROR | `opacity`: 最大值: 1 |
| enum | ERROR | `transScope`: 允许值: PRINT, COVER, PRINT&COVER |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PANEL/t-panel-poly.md)

