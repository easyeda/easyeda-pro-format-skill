# TSchGroup

> 返回 [SYMBOL 图元索引](../../documents/SYMBOL.md)

## 定义

原理图分组控制

⚠️ **`parentId` 在 3.0 无实现**（字段保留仅为兼容 2.0，下面各关联标签也只描述 2.0 语义）：
- **写盘端恒写空串**：3.0 不写入任何父子信息；
- **读盘端两个 `handleGroup` 只读 `title`**，组合模型 `Combination` 类里**没有父子概念**，
  UI 的组合树是靠**成员的 `groupId` 反推层级**的，不看本字段；
- **哨兵值**：真实数据里用**空串 `""`**，不是 `"0"`；
- 2.0 → 3.0 转换腿（`SchTransform`）会**原样透传**它，故字段不能删。

⚠️ **跨域同名不同义**：`TPanelGroup.parentId` **是活的层级字段**（面板的组合带
`combinations` 子数组、递归建树、递归级联删），**不要照面板的语义理解本字段**。

【联动增删·解引用不删成员】删除 GROUP **不删除成员**，只解除其归属。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| parentId | `string` | ✓ | - | 父级分组编号；3.0 无实现，写盘恒为空串 `""`（见上方类型说明） |
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

