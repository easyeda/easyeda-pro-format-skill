# TSchGroup

> 返回 [SYMBOL 图元索引](../../documents/SYMBOL.md)

## 定义

原理图分组控制

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| parentId | `string` | ✓ | - | 父级分组编号，为 0 则表示无父级 |
| title | `string` | ✓ | - | 分组名称，无名称为空字符串 "" |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-sch-group.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `parentId`: 必需字段 |
| required | ERROR | `title`: 必需字段 |

### 父子图元

此图元包含以下子图元类型：

- 子图元类型: [TSchGroup](../../primitives/SCH_PAGE/group.md)
- 子图元中的关联字段: `parentId` (指向父图元 id)
- 父图元中的引用字段: `id`

GROUP 可以包含多个子 GROUP，形成树形结构，每个子 GROUP 的 parentId 必须指向父 GROUP 的 id

## 示例

→ [查看示例](../../examples/SYMBOL/t-sch-group.md)

