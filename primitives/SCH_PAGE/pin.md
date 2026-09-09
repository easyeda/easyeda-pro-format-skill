# TSchPin

> 返回 [SCH_PAGE 图元索引](../../documents/SCH_PAGE.md)

## 定义

标号

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| partId | `string` |  | - | 部件编号；符号页专属，表示归属于某部件下, 非符号忽略该字段 |
| groupId | `string` | ✓ | - | 分组编号, 没有则为空 |
| locked | `boolean` | ✓ | - | 是否锁定 |
| zIndex | `number | null` | ✓ | - | Z 轴高度 |
| display | `boolean` | ✓ | - | 是否在原理图显示 |
| x | `number` | ✓ | - | 位置 X |
| y | `number` | ✓ | - | 位置 Y |
| length | `number` | ✓ | min: 0 | 引脚长度 |
| rotation | `number` | ✓ | min: 0, max: 360 | 旋转角度（角度制）：0 90 180 270 |
| color | `string` | ✓ | pattern: ^$|^#[0-9A-Fa-f]{6}$ | 引脚颜色 |
| pinShape | `EPinShape` | ✓ | - | 引脚样式 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-sch-pin.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `display`: 必需字段 |
| required | ERROR | `x`: 必需字段 |
| required | ERROR | `y`: 必需字段 |
| required | ERROR | `length`: 必需字段 |
| required | ERROR | `rotation`: 必需字段 |
| required | ERROR | `color`: 必需字段 |
| required | ERROR | `pinShape`: 必需字段 |
| minimum | ERROR | `length`: 最小值: 0 |
| minimum | ERROR | `rotation`: 最小值: 0 |
| maximum | ERROR | `rotation`: 最大值: 360 |
| pattern | ERROR | `color`: 匹配模式: ^$|^#[0-9A-Fa-f]{6}$ |
| enum | ERROR | `pinShape`: 允许值: NONE, CLOCK, INVERTED, INVERTED_CLOCK |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/SCH_PAGE/t-sch-pin.md)

