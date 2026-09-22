# TSchTable

> 返回 [SCH_PAGE 图元索引](../../documents/SCH_PAGE.md)

## 定义

表格

**原理图族里的一张表格**，一行一条（`type:"TABLE"`）：由左上角、行高数组 `rowSizes` / 列宽数组
`colSizes` 与旋转角定义，行 / 列可逐条锁定（`rowLocked` / `colLocked`）。

表格的**内容不在这行**：每个单元格是一个内嵌结构 [TTableCell](../REFERENCE/t-table-cell.md)，随本行的 `tableCell` 数组
一起写盘（跨行 / 跨列、四边线型、字体样式都在单元格上），**不要为单元格单独生成一行**。

⚠️ 本类型在 `TSchBase` 上**剔除了 `locked`**：表格没有整体的锁定字段，只有按行 / 列的那两个数组。

本行的 `id` 由编辑器生成（随机 16 位小写十六进制），图元 id 的几类形态与判别见 [TElementId](../REFERENCE/t-element-id.md)。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| groupId | [TElementId](../REFERENCE/t-element-id.md) | ✓ | - | 分组编号；**两种「未成组」形态都表示未成组**： - **3.0 写盘时该键根本不存在**：写入端取 `model.combination?.id`，未成组即 `undefined`， 经 `JSON.stringify` 后整键被丢弃，消费方须**按可选键处理**； - **`""` 只出现在 2.0 迁移数据里**（2.0 → 3.0 转换腿原样带着它）。 |
| zIndex | `number \| null` | ✓ | - | 同层内的叠放次序：渲染排序键，数值越小越靠下（格式里没有高度语义） |
| partId | [TPartId](../REFERENCE/t-part-id.md) |  | - | 所属部件编号（**可选**，真机存在整键缺失的 COMPONENT）： **符号页**上表示自身归属于哪个部件，**图页**的元件则指向它**关联的符号文档**里的部件。 取值即目标 `PART` 行的 `id`（`PART` 行只存在于 SYMBOL 文档，见 [TPart](./part.md)）。 |
| yAxisDirection | [TYAxisDirection](../REFERENCE/ty-axis-direction.md) |  | - | Y 轴方向标记：**仅 eprj3 本地文件格式会带**，读盘时被剥离。 取值：`up` = **笛卡尔坐标系（Y 向上）**，本行坐标已按它写出（本地文件固定用它），`down` = **屏幕坐标系（Y 向下）**（编辑器内部与云端的常态） ——**字段缺失等价于它**，两者是同一件事；两套坐标系下同一个形状的 y **互为相反数**。完整语义见 [TYAxisDirection](../REFERENCE/ty-axis-direction.md)。 ⚠️ 本基类被多个图元继承，**各自被翻转的字段不同**——完整对照表见 [TYAxisDirection](../REFERENCE/ty-axis-direction.md)。 本基类直接覆盖的：`ATTR`/`TEXT`/`PIN`/`COMPONENT` 翻 `y`；`OBJ`/`TABLE` 翻 `startY`； `ARC` 翻 `startY`/`referY`/`endY`；`CIRCLE`/`ELLIPSE` 翻 `centerY` + 内嵌 `text.y`； `RECT` 翻 `dotY1`/`dotY2` + `text.y`；`MASK_REGION` 翻 `dotY1`/`dotY2`；`POLY` 翻 `points` 各项的 `y`；`BEZIER` 翻 `controls` 的奇数下标。 `rotation` / `isMirror` / `zIndex` 与所有幅值字段**不翻**。 |
| startX | `number` | ✓ | - | 左上角 X（0.01 inch） |
| startY | `number` | ✓ | - | 左上角 Y（0.01 inch） |
| rowSizes | `number[]` | ✓ | - | 行高 |
| colSizes | `number[]` | ✓ | - | 列宽 |
| rowLocked | `number[]` | ✓ | - | 行锁定 |
| colLocked | `number[]` | ✓ | - | 列锁定 |
| rotation | `number` | ✓ | min: 0, max: 360 | 旋转角度（角度制，**逆时针为正**） |
| tableCell | [TTableCell](../REFERENCE/t-table-cell.md)[] | ✓ | - | 表格单元格 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-sch-table.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `startX`: 必需字段 |
| required | ERROR | `startY`: 必需字段 |
| required | ERROR | `rowSizes`: 必需字段 |
| required | ERROR | `colSizes`: 必需字段 |
| required | ERROR | `rowLocked`: 必需字段 |
| required | ERROR | `colLocked`: 必需字段 |
| required | ERROR | `rotation`: 必需字段 |
| required | ERROR | `tableCell`: 必需字段 |
| enum | ERROR | `yAxisDirection`: 允许值: up, down |
| minimum | ERROR | `rotation`: 最小值: 0 |
| maximum | ERROR | `rotation`: 最大值: 360 |

### 内嵌结构

此图元包含以下内嵌结构：

- 内嵌类型: [TTableCell](../../primitives/REFERENCE/t-table-cell.md)
- 包含内嵌结构的字段: `tableCell`

tableCell 字段包含多个 TTableCell

## 示例

→ [查看示例](../../examples/SCH_PAGE/t-sch-table.md)

