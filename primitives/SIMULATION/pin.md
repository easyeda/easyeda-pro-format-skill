# TSchPin

> 返回 [SIMULATION 图元索引](../../documents/SIMULATION.md)

## 定义

标号

**引脚（客户端中文口径叫「标号」）**，一行一条（`type:"PIN"`）：由位置、长度、旋转角与引脚样式
（`NONE` / `CLOCK` / `INVERTED` / `INVERTED_CLOCK`）定义，`color` 可空——`null` 与 `""`
都表示未显式设色、取默认色。

引脚的名称 / 编号 / 类型**不在本行**，而在同生命周期的 [TSchAttr](./attr.md) 行上（`Pin Name` /
`Pin Number` / `Pin Type`），靠 `parentId` 指回本行；**图页**上元件的引脚则由符号模板运行时派生，
盘上没有对应行，别照符号页的样子去图页里找。

⚠️ **文件里的 `rotation` 与模型值相差 +180**（读写两条腿都做同一个 +180，往返自洽），
不要拿文件值直接当模型角度用。

本行的 `id` 通常由编辑器生成（随机 16 位小写十六进制），但**符号页**上引脚是独立一行、
存量数据里存在 `ie1` 这类短串 id，别按 16 位 hex 校验——图元 id 的几类形态与判别见 [TElementId](../REFERENCE/t-element-id.md)。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| partId | [TPartId](../REFERENCE/t-part-id.md) |  | - | 所属部件编号（**可选**，真机存在整键缺失的 COMPONENT）： **符号页**上表示自身归属于哪个部件，**图页**的元件则指向它**关联的符号文档**里的部件。 取值即目标 `PART` 行的 `id`（`PART` 行只存在于 SYMBOL 文档，见 [TPart](./part.md)）。 |
| groupId | [TElementId](../REFERENCE/t-element-id.md) | ✓ | - | 分组编号；**两种「未成组」形态都表示未成组**： - **3.0 写盘时该键根本不存在**：写入端取 `model.combination?.id`，未成组即 `undefined`， 经 `JSON.stringify` 后整键被丢弃，消费方须**按可选键处理**； - **`""` 只出现在 2.0 迁移数据里**（2.0 → 3.0 转换腿原样带着它）。 |
| locked | `boolean` | ✓ | - | 是否锁定。 ⚠️ **原理图侧目前只是数据字段**：pro-sch 里没有任何按它拦截拖拽 / 删除 / 改大小 / 改形状的实现（连「锁定 / 解锁」命令本身都是空实现，只 publish 属性面板刷新）。 那四条行为特征只在 **PCB / 面板**侧落实。生成数据时照常写入本字段， 但**不要指望原理图端会因为它而禁止操作**。 |
| zIndex | `number \| null` | ✓ | - | 同层内的叠放次序：渲染排序键，数值越小越靠下（格式里没有高度语义） |
| yAxisDirection | [TYAxisDirection](../REFERENCE/ty-axis-direction.md) |  | - | Y 轴方向标记：**仅 eprj3 本地文件格式会带**，读盘时被剥离。 取值：`up` = **笛卡尔坐标系（Y 向上）**，本行坐标已按它写出（本地文件固定用它），`down` = **屏幕坐标系（Y 向下）**（编辑器内部与云端的常态） ——**字段缺失等价于它**，两者是同一件事；两套坐标系下同一个形状的 y **互为相反数**。完整语义见 [TYAxisDirection](../REFERENCE/ty-axis-direction.md)。 ⚠️ 本基类被多个图元继承，**各自被翻转的字段不同**——完整对照表见 [TYAxisDirection](../REFERENCE/ty-axis-direction.md)。 本基类直接覆盖的：`ATTR`/`TEXT`/`PIN`/`COMPONENT` 翻 `y`；`OBJ`/`TABLE` 翻 `startY`； `ARC` 翻 `startY`/`referY`/`endY`；`CIRCLE`/`ELLIPSE` 翻 `centerY` + 内嵌 `text.y`； `RECT` 翻 `dotY1`/`dotY2` + `text.y`；`MASK_REGION` 翻 `dotY1`/`dotY2`；`POLY` 翻 `points` 各项的 `y`；`BEZIER` 翻 `controls` 的奇数下标。 `rotation` / `isMirror` / `zIndex` 与所有幅值字段**不翻**。 |
| display | `boolean` | ✓ | - | 是否在原理图显示 |
| x | `number` | ✓ | - | 位置 X（0.01 inch） |
| y | `number` | ✓ | - | 位置 Y（0.01 inch） |
| length | `number` | ✓ | min: 0 | 引脚长度 单位：**0.01 inch** |
| rotation | `number` | ✓ | min: 0, max: 360 | 旋转角度（角度制，**逆时针为正**）：0 90 180 270 ⚠️ **文件里的取值与模型值相差 +180**：写腿为 `Angle.regularD(model.rotation + 180)` （归一化到 `[0, 360)`），读腿为 `Math.round(Angle.regularD(data.rotation + 180))`， 两条腿都做同一个 +180，故**不要拿文件的 rotation 直接当模型角度用**。 |
| color | `string \| null` | ✓ | pattern: ^$\|^#[0-9A-Fa-f]{6}$ | 引脚颜色 ⚠️ 写入端**可产出 `null`**（默认新建引脚的 `_color` 即为 `null`）， 故本字段按 `string \| null` 处理：`null` / `""` 都表示未显式设色、取默认色。 |
| pinShape | [EPinShape](../REFERENCE/e-pin-shape.md) | ✓ | - | 取值范围：NONE（无）、CLOCK（时钟）、INVERTED（反相）、INVERTED_CLOCK（反相时钟） |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-sch-pin.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `display`: 必需字段 |
| required | ERROR | `x`: 必需字段 |
| required | ERROR | `y`: 必需字段 |
| required | ERROR | `length`: 必需字段 |
| required | ERROR | `rotation`: 必需字段 |
| required | ERROR | `color`: 必需字段 |
| required | ERROR | `pinShape`: 必需字段 |
| enum | ERROR | `yAxisDirection`: 允许值: up, down |
| minimum | ERROR | `length`: 最小值: 0 |
| minimum | ERROR | `rotation`: 最小值: 0 |
| maximum | ERROR | `rotation`: 最大值: 360 |
| pattern | ERROR | `color`: 匹配模式: ^$\|^#[0-9A-Fa-f]{6}$ |
| enum | ERROR | `pinShape`: 允许值: NONE, CLOCK, INVERTED, INVERTED_CLOCK |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/SIMULATION/t-sch-pin.md)

