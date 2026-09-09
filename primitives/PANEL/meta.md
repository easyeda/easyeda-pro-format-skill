# TMPanel

> 返回 [PANEL 图元索引](../../documents/PANEL.md)

## 定义

面板 META 类型

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| title | `string` | ✓ | - | 文档名称 |
| zIndex | `number` | ✓ | min: 0 | 排序大小 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/tm-panel.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `title`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| minimum | ERROR | `zIndex`: 最小值: 0 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PANEL/tm-panel.md)

