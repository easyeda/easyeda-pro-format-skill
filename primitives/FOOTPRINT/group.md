# TPcbGroup

> 返回 [FOOTPRINT 图元索引](../../documents/FOOTPRINT.md)

## 定义

分组配置

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| groupName | `string` | ✓ | - | 分组名称 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-pcb-group.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupName`: 必需字段 |

### 父子图元

此图元包含以下子图元类型：

- 子图元类型: [TPcbGroup](../../primitives/PCB/group.md)
- 子图元中的关联字段: `parentId` (指向父图元 id)
- 父图元中的引用字段: `id`

GROUP 可以包含多个子 GROUP，形成树形结构，每个子 GROUP 的 parentId 必须指向父 GROUP 的 id

## 示例

→ [查看示例](../../examples/FOOTPRINT/t-pcb-group.md)

