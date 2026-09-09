# TMSheet

> 返回 [SCH_PAGE 图元索引](../../documents/SCH_PAGE.md)

## 定义

原理图页 META 类型

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| schematic | `string` | ✓ | - | 所属原理图 |
| title | `string` | ✓ | - | 文档名称 |
| source | `string` | ✓ | - | 来源的 uuid(工程库独有) |
| zIndex | `number` | ✓ | - | 排序大小 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/tm-sheet.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `schematic`: 必需字段 |
| required | ERROR | `title`: 必需字段 |
| required | ERROR | `source`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/SCH_PAGE/tm-sheet.md)

