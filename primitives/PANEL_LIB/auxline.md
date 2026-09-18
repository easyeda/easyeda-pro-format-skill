# TAuxLine

> 返回 [PANEL_LIB 图元索引](../../documents/PANEL_LIB.md)

## 定义

辅助线

原子类型取数据流里的实际取值（EPanelDataType.AUX_LINE 的值是 "AUXLINE"，
枚举成员名里的下划线不进数据流）。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| groupId | `string` | ✓ | pattern: ^0$\|^[1-9][0-9]*$ | 分组编号, 没有则为空（预留）："0" 不分组，非 0 为组标志，相同组标志的为一组 |
| layer | `number` | ✓ | min: 0 | 层 |
| locked | `boolean` | ✓ | - | 是否锁定 |
| zIndex | `number \| null` | ✓ | min: 0, default: null | Z 轴高度, null 为默认 |
| visible | `boolean` | ✓ | - | 是否可见 |
| cover | `number \| null` | ✓ | - | 遮盖透明度 |
| name | `string` | ✓ | - | 名称 |
| x | `number` | ✓ | - | X |
| y | `number` | ✓ | - | Y |
| rotation | `number` | ✓ | min: 0, max: 360 | 旋转角度（角度制） |
| strokeWidth | `number` | ✓ | min: 0 | 线宽（预留，非画布尺寸) |
| strokeStyle | `EStrokeStyle \| null` | ✓ | default: null | 取值范围：SOLID（实线）、SHORT_DASH（短划线）、DOT（点线）、DOT_DASH（点划线） |
| color | `string` | ✓ | pattern: ^(#[0-9A-Fa-f]{6})\|(rgb\(\d{1,3},\d{1,3},\d{1,3}\))\|(cmyk\(\d{1,3},\d{1,3},\d{1,3},\d{1,3}\))\|$ | 颜色 |
| length | `number` | ✓ | min: 0 | 长度（非画布尺寸） |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-aux-line.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `layer`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `visible`: 必需字段 |
| required | ERROR | `cover`: 必需字段 |
| required | ERROR | `name`: 必需字段 |
| required | ERROR | `x`: 必需字段 |
| required | ERROR | `y`: 必需字段 |
| required | ERROR | `rotation`: 必需字段 |
| required | ERROR | `strokeWidth`: 必需字段 |
| required | ERROR | `strokeStyle`: 必需字段 |
| required | ERROR | `color`: 必需字段 |
| required | ERROR | `length`: 必需字段 |
| pattern | ERROR | `groupId`: 匹配模式: ^0$\|^[1-9][0-9]*$ |
| minimum | ERROR | `layer`: 最小值: 0 |
| minimum | ERROR | `zIndex`: 最小值: 0 |
| minimum | ERROR | `rotation`: 最小值: 0 |
| maximum | ERROR | `rotation`: 最大值: 360 |
| minimum | ERROR | `strokeWidth`: 最小值: 0 |
| enum | ERROR | `strokeStyle`: 允许值: SOLID, SHORT_DASH, DOT, DOT_DASH, null |
| pattern | ERROR | `color`: 匹配模式: ^(#[0-9A-Fa-f]{6})\|(rgb\(\d{1,3},\d{1,3},\d{1,3}\))\|(cmyk\(\d{1,3},\d{1,3},\d{1,3},\d{1,3}\))\|$ |
| minimum | ERROR | `length`: 最小值: 0 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PANEL_LIB/t-aux-line.md)

