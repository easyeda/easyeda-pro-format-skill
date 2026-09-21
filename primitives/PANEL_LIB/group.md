# TPanelGroup

> 返回 [PANEL_LIB 图元索引](../../documents/PANEL_LIB.md)

## 定义

面板分组控制

【联动增删·必须成组操作】面板与 PCB/原理图**相反**：**删除组合会连同组内成员图元
和子组合一起删除**（只有「取消组合」才保留成员）。
另外，删除被尺寸标注关联的图元时，关联的 DIMENSION 会被一并删除——
但**只有 LENGTH-\* 一类尺寸会被级联**（`LENGTH-CONSTRAINT` / `LENGTH-MEASUREMENT`：
它们把两端图元分别存进 `start.id` / `end.id`，因此扫描得到）。
⚠️ `RADIUS-MEASUREMENT` 的关联落在自己的 `ellipseId` 上（`relationIds` 只含该椭圆 id），
**不在该扫描范围内**——删掉椭圆会**留下悬空的半径标注**，读取端须自行容忍。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| parentId | `string` | ✓ | - | 父组合的行标识：**= 某条 `type:"GROUP"` 记录的外壳 `id`**。 怎么用：把 `type:"GROUP"` 的行捞出来，`id` 等于本字段的那条就是父组合。 `"0"` 或**空串**都表示**无父级**（本组合是顶层）。 ⚠️ 本字段在面板域是**活的层级字段**（组合可嵌套，删除组合会级联整棵子树）。 `TSchGroup.parentId` 是同名但**语义不同的预留位**（SCH 侧 3.0 无实现， 写盘恒为空串），**两域不要互相套用**。 |
| title | `string` | ✓ | - | 组合名，无名称时为空串 |
| visible | `boolean` | ✓ | - | 是否可见 |
| locked | `boolean` | ✓ | - | 是否锁定 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-panel-group.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `parentId`: 必需字段 |
| required | ERROR | `title`: 必需字段 |
| required | ERROR | `visible`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |

### 父子图元

此图元包含以下子图元类型：

- 子图元类型: [TPanelGroup](../../primitives/PANEL/group.md)
- 子图元中的关联字段: `parentId` (指向父图元 id)
- 父图元中的引用字段: `id`

GROUP 可嵌套：子组合通过 parentId 指向父组合的 id（无父级时写 "0" 或空串）；
组内成员图元通过各自的 groupId 指向本组合的 id

## 示例

→ [查看示例](../../examples/PANEL_LIB/t-panel-group.md)

