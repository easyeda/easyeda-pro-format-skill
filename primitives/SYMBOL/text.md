# TSchText

> 返回 [SYMBOL 图元索引](../../documents/SYMBOL.md)

## 定义

文本

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| partId | `string` |  | - | 部件编号；符号页专属，表示归属于某部件下, 非符号忽略该字段 |
| groupId | `string` | ✓ | - | 分组编号, 没有则为空 |
| locked | `boolean` | ✓ | - | 是否锁定 |
| zIndex | `number | null` | ✓ | - | Z 轴高度 |
| x | `number` | ✓ | - | 文本坐标 X |
| y | `number` | ✓ | - | 文本坐标 Y |
| rotation | `number` | ✓ | min: 0, max: 360 | 旋转角度（角度制），绕 文本坐标 旋转 |
| value | `string` | ✓ | - | 文本内容：任意字符 |
| version | `'2.0'` |  | - | 表示来自 2.0 版本 |
| color | `string | null` | ✓ | - | 颜色 |
| fillColor | `string | null` | ✓ | - | 背景色 |
| fontFamily | `string | null` | ✓ | - | 字体名称 |
| fontSize | `number | null` | ✓ | - | 字体大小，与坐标等单位相同 |
| strikeout | `boolean | null` | ✓ | - | 是否加删除线 |
| underline | `boolean | null` | ✓ | - | 是否加下划线 |
| italic | `boolean | null` | ✓ | - | 是否斜体 |
| fontWeight | `boolean | null` | ✓ | - | 是否加粗 |
| align | `EAlign` | ✓ | - | 对齐模式 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-sch-text.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `x`: 必需字段 |
| required | ERROR | `y`: 必需字段 |
| required | ERROR | `rotation`: 必需字段 |
| required | ERROR | `value`: 必需字段 |
| required | ERROR | `color`: 必需字段 |
| required | ERROR | `fillColor`: 必需字段 |
| required | ERROR | `fontFamily`: 必需字段 |
| required | ERROR | `fontSize`: 必需字段 |
| required | ERROR | `strikeout`: 必需字段 |
| required | ERROR | `underline`: 必需字段 |
| required | ERROR | `italic`: 必需字段 |
| required | ERROR | `fontWeight`: 必需字段 |
| required | ERROR | `align`: 必需字段 |
| minimum | ERROR | `rotation`: 最小值: 0 |
| maximum | ERROR | `rotation`: 最大值: 360 |
| enum | ERROR | `align`: 允许值: LEFT_BOTTOM, CENTER_BOTTOM, RIGHT_BOTTOM, LEFT_MIDDLE, CENTER_MIDDLE, RIGHT_MIDDLE, LEFT_TOP, CENTER_TOP, RIGHT_TOP |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/SYMBOL/t-sch-text.md)

