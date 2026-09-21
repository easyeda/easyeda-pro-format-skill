# TPcbGroup

> 返回 [PCB 图元索引](../../documents/PCB.md)

## 定义

分组配置

【联动增删·解引用不删成员】与 COMPONENT 不同，**删除 GROUP 不会删除其成员**：
成员图元保留，只是把成员的 groupId 清掉（解除归属）。

## 哪些图元能成为成员

**只有下面这 21 个类型在格式上能带分组字段**——这是**封闭集合**，不是举例：
判据是编辑器各类型的最新槽位表是否含分组键（交叉验证过，一个不多、一个不少）。

**不能**成为成员的代表：`CANVAS` / `LAYER` / `NET` / `PRIMITIVE` / `SILK_OPTS` /
`PREFERENCE` / `PARTITION` / `POURED` / `EQLEN_GRP` / `PAD_NET` / `FOOTPRINT_NET` /
`X_NET` / `X_NET_GROUP` / `RULE*` / `D3_*` / `PANELIZE*` / `BOARD` / `META` —— 这些行
的槽位表里**没有**分组字段，写了也不落盘。

## 四条容易踩空的限定

- **成员的归属字段是 `groupId`，但 `ATTR` 是例外**：它的键名是大写 **`groupID`**
  （编辑器如此拼，真实数据也全是这个拼法）。照 `groupId` 写在 ATTR 上会找不到。
- **能带分组字段 ≠ 编辑器会让你这么分**。编辑器的门禁更窄：**元件内图元**
  （按住 `parent` 属于某个元件，如元件自带的焊盘/丝印/属性）与**飞线**都不会被接受打组。
  格式上它们仍合法（真机的 PAD 成员就是例子），只是新建分组时选不中。
- **FOOTPRINT 文档下该字段通常恒为 `0`**（写盘时对 FOOTPRINT 一律归零）。⚠️ 但这条
  不是绝对的：由导入或服务端导出的数据里出现过非 0 的分组（如 `.epru` 样本的
  FOOTPRINT 段就有带 `partitionId` 的成组焊盘/填充）。
- **`LAYER_FILL` 是个半例外**：该行本身没有分组字段，但它内嵌的 `fill` 数组**每一项**
  带分组字段。那些内嵌项格式上算成员，却**不是独立行**，故不列入上面的成员类型清单。

另注：成员类型清单里的 `TPcbShellCut` **已废弃**（当前版本写盘停用、被 `SHELL_ENTITY`
取代，仅保留解析兼容），列出来是为完整反映格式契约。

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

### 容器成员

此图元作为容器，包含以下成员图元类型：

- 成员图元类型: [TPcbLine](../../primitives/PCB/line.md)、[TPcbArc](../../primitives/PCB/arc.md)、[TPcbVia](../../primitives/PCB/via.md)、[TPcbPad](../../primitives/PCB/pad.md)、[TPcbPoly](../../primitives/PCB/poly.md)、[TPcbFill](../../primitives/PCB/fill.md)、[TPcbRegion](../../primitives/PCB/region.md)、[TPcbPour](../../primitives/PCB/pour.md)、[TPcbImage](../../primitives/PCB/image.md)、[TPcbObj](../../primitives/PCB/obj.md)、[TPcbTeardrop](../../primitives/PCB/teardrop.md)、[TPcbString](../../primitives/PCB/string.md)、[TPcbAttr](../../primitives/PCB/attr.md)、[TPcbDimension](../../primitives/PCB/dimension.md)、[TMPcbComponent](../../primitives/PCB/component.md)、[TPcbShell](../../primitives/PCB/shell.md)、[TPcbShellCut](../../primitives/PCB/shellcut.md)、[TPcbShellEntity](../../primitives/PCB/shell_entity.md)、[TPcbBoss](../../primitives/PCB/boss.md)、[TPcbCrease](../../primitives/PCB/crease.md)、[TPcbFpcFill](../../primitives/PCB/fpc_fill.md)
- 成员图元中的关联字段: `groupId` (指向容器 id)

GROUP 是**扁平**的（不支持嵌套子组，与原理图的 TSchGroup 不同）：组内成员图元通过各自的 `groupId` 指向本 GROUP 的 id；本类型只承载组名

## 示例

→ [查看示例](../../examples/PCB/t-pcb-group.md)

