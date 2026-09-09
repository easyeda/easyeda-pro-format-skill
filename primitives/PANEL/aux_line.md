# TAuxLine

> 返回 [PANEL 图元索引](../../documents/PANEL.md)

## 定义

辅助线

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| x | `number` | ✓ | - | X |
| y | `number` | ✓ | - | Y |
| rotation | `number` | ✓ | min: 0, max: 360 | 旋转角度（角度制） |
| strokeWidth | `number` | ✓ | min: 0 | 线宽（预留，非画布尺寸) |
| strokeStyle | `EStrokeStyle | null` | ✓ | - | 线型：SOLID 实线 SHORT_DASH 短划线 DOT 点线 DOT_DASH 点划线, null 为默认 |
| color | `string` | ✓ | pattern: ^(#[0-9A-Fa-f]{6})|(rgb\(\d{1,3},\d{1,3},\d{1,3}\))|(cmyk\(\d{1,3},\d{1,3},\d{1,3},\d{1,3}\))|$ | 颜色 |
| length | `number` | ✓ | min: 0 | 长度（非画布尺寸） |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-aux-line.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `x`: 必需字段 |
| required | ERROR | `y`: 必需字段 |
| required | ERROR | `rotation`: 必需字段 |
| required | ERROR | `strokeWidth`: 必需字段 |
| required | ERROR | `strokeStyle`: 必需字段 |
| required | ERROR | `color`: 必需字段 |
| required | ERROR | `length`: 必需字段 |
| minimum | ERROR | `rotation`: 最小值: 0 |
| maximum | ERROR | `rotation`: 最大值: 360 |
| minimum | ERROR | `strokeWidth`: 最小值: 0 |
| enum | ERROR | `strokeStyle`: 允许值: SOLID, SHORT_DASH, DOT, DOT_DASH |
| pattern | ERROR | `color`: 匹配模式: ^(#[0-9A-Fa-f]{6})|(rgb\(\d{1,3},\d{1,3},\d{1,3}\))|(cmyk\(\d{1,3},\d{1,3},\d{1,3},\d{1,3}\))|$ |
| minimum | ERROR | `length`: 最小值: 0 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PANEL/t-aux-line.md)

