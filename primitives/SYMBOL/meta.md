# TMSymbol

> 返回 [SYMBOL 图元索引](../../documents/SYMBOL.md)

## 定义

符号 META 类型

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| title | `string` | ✓ | - | 名称 |
| description | `string` | ✓ | - | 库描述 |
| tags | `string[]` | ✓ | - | 自定义分类 |
| source | `string` | ✓ | - | 来源的 uuid(工程库独有) |
| docType | `number` | ✓ | - | 库类型 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/tm-symbol.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `title`: 必需字段 |
| required | ERROR | `description`: 必需字段 |
| required | ERROR | `tags`: 必需字段 |
| required | ERROR | `source`: 必需字段 |
| required | ERROR | `docType`: 必需字段 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/SYMBOL/tm-symbol.md)

