# TBus

> 返回 [SIMULATION 图元索引](../../documents/SIMULATION.md)

## 定义

总线组

【联动增删·必须成组操作】BUS 与其成员 LINE、成员 ATTR 是**同一生命周期**：
**新增 BUS 时必须一并写出它的 LINE；删除 BUS 时必须一并删除它的 LINE 与 ATTR**。
`lineGroup` 是必填字段，成员 LINE 无法脱离组独立存在，只删 BUS 会留下悬空引用。

成员类型只列 [TSchLine](./line.md)：`ATTR` **亦属同一生命周期**（要一并增删），但它是经 `parentId`
指向本组 id 的（**`ATTR` 上没有 `lineGroup`**），**不走 `lineGroup`**，故不算成员类型。

本行的 `id` 由编辑器生成（随机 16 位小写十六进制），成员 LINE 的 `lineGroup` 就指向它；
图元 id 的几类形态与判别见 [TElementId](../REFERENCE/t-element-id.md)。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| groupId | [TElementId](../REFERENCE/t-element-id.md) | ✓ | - | 分组编号；**两种「未成组」形态都表示未成组**： - **3.0 写盘时该键根本不存在**：写入端取 `model.combination?.id`，未成组即 `undefined`， 经 `JSON.stringify` 后整键被丢弃，消费方须**按可选键处理**； - **`""` 只出现在 2.0 迁移数据里**（2.0 → 3.0 转换腿原样带着它）。 |
| locked | `boolean` | ✓ | - | 是否锁定。 ⚠️ **原理图侧目前只是数据字段**：pro-sch 里没有任何按它拦截拖拽 / 删除 / 改大小 / 改形状的实现（连「锁定 / 解锁」命令本身都是空实现，只 publish 属性面板刷新）。 那四条行为特征只在 **PCB / 面板**侧落实。生成数据时照常写入本字段， 但**不要指望原理图端会因为它而禁止操作**。 |
| zIndex | `number \| null` | ✓ | - | 同层内的叠放次序：渲染排序键，数值越小越靠下（格式里没有高度语义） |
| yAxisDirection | [TYAxisDirection](../REFERENCE/ty-axis-direction.md) |  | - | Y 轴方向标记：**仅 eprj3 本地文件格式会带**，读盘时被剥离。 取值：`up` = **笛卡尔坐标系（Y 向上）**，本行坐标已按它写出（本地文件固定用它），`down` = **屏幕坐标系（Y 向下）**（编辑器内部与云端的常态） ——**字段缺失等价于它**，两者是同一件事；两套坐标系下同一个形状的 y **互为相反数**。完整语义见 [TYAxisDirection](../REFERENCE/ty-axis-direction.md)。 ⚠️ 本基类被多个图元继承，**各自被翻转的字段不同**——完整对照表见 [TYAxisDirection](../REFERENCE/ty-axis-direction.md)。 本基类直接覆盖的：`ATTR`/`TEXT`/`PIN`/`COMPONENT` 翻 `y`；`OBJ`/`TABLE` 翻 `startY`； `ARC` 翻 `startY`/`referY`/`endY`；`CIRCLE`/`ELLIPSE` 翻 `centerY` + 内嵌 `text.y`； `RECT` 翻 `dotY1`/`dotY2` + `text.y`；`MASK_REGION` 翻 `dotY1`/`dotY2`；`POLY` 翻 `points` 各项的 `y`；`BEZIER` 翻 `controls` 的奇数下标。 `rotation` / `isMirror` / `zIndex` 与所有幅值字段**不翻**。 |
| busEntry | { [id: string]: [TSchBusEntry](../REFERENCE/t-sch-bus-entry.md) } | ✓ | - |  |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-bus.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `busEntry`: 必需字段 |
| enum | ERROR | `yAxisDirection`: 允许值: up, down |

### 容器成员

此图元作为容器，包含以下成员图元类型：

- 成员图元类型: [TSchLine](../../primitives/SCH_PAGE/line.md)
- 成员图元中的关联字段: `lineGroup` (指向容器 id)

BUS 包含多个 LINE，每个 LINE 的 lineGroup 必须指向 BUS 的 id

## 示例

→ [查看示例](../../examples/SIMULATION/t-bus.md)

