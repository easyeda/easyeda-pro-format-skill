# TMFont

> 返回 [FONT 图元索引](../../documents/FONT.md)

## 定义

字体缓存

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| width | `number` | ✓ | min: 0 | 宽 |
| height | `number` | ✓ | min: 0 | 高 |
| path | `any[][]` | ✓ | - | 文字缓存，复杂多边形数组，参考复杂多边形 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/tm-font.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `width`: 必需字段 |
| required | ERROR | `height`: 必需字段 |
| required | ERROR | `path`: 必需字段 |
| minimum | ERROR | `width`: 最小值: 0 |
| minimum | ERROR | `height`: 最小值: 0 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/FONT/tm-font.md)

