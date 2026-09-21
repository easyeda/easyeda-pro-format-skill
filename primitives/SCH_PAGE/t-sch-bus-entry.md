# TSchBusEntry

> 返回 [SCH_PAGE 图元索引](../../documents/SCH_PAGE.md)

## 定义

总线接入标识

⚠️ **这是「内嵌结构」，不是数据流里的独立图元**——它**不单独占一行数据**，
而是作为 `TBus.busEntry` 这个 map 的 **value**（键为接入点 id）随 BUS 行一起写盘。
客户端写盘时只产出内嵌形态；3.0 解码器也会**忽略**独立出现的 BUSENTRY 记录。
因此**不要为它单独生成一行**。

【联动增删】接入点与其成员 LINE、ATTR 同属一个 BUS 的生命周期：
删除 BUS 时必须一并删除它的 LINE 与 ATTR（见 TBus 的说明）。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| groupId | `string` | ✓ | - | 分组编号；**两种「未成组」形态都表示未成组**： - **3.0 写盘时该键根本不存在**：写入端取 `model.combination?.id`，未成组即 `undefined`， 经 `JSON.stringify` 后整键被丢弃，消费方须**按可选键处理**； - **`""` 只出现在 2.0 迁移数据里**（2.0 → 3.0 转换腿原样带着它）。 |
| locked | `boolean` | ✓ | - | 是否锁定 |
| zIndex | `number \| null` | ✓ | - | 同层内的叠放次序：渲染排序键，数值越小越靠下（格式里没有高度语义） |
| yAxisDirection | `TYAxisDirection` |  | - | Y 轴方向标记：**仅 eprj3 本地文件格式会带**，读盘时被剥离。 取值：`up` **已按 Y 轴向上写出**（本地文件固定用它）、`down` Y 轴向下 （**字段缺失等价于它**，两者是同一件事）。完整语义见 `TYAxisDirection`。 ⚠️ 本基类被多个图元继承，**各自被翻转的字段不同**——完整对照表见 `TYAxisDirection`。 本基类直接覆盖的：`ATTR`/`TEXT`/`PIN`/`COMPONENT` 翻 `y`；`OBJ`/`TABLE` 翻 `startY`； `ARC` 翻 `startY`/`referY`/`endY`；`CIRCLE`/`ELLIPSE` 翻 `centerY` + 内嵌 `text.y`； `RECT` 翻 `dotY1`/`dotY2` + `text.y`；`MASK_REGION` 翻 `dotY1`/`dotY2`；`POLY` 翻 `points` 各项的 `y`；`BEZIER` 翻 `controls` 的奇数下标。 `rotation` / `isMirror` / `zIndex` 与所有幅值字段**不翻**。 |
| order | `number` | ✓ | min: 0 | 顺序编号：在隶属的 BUS 里的顺序编号，可重复 |
| pointX | `number` | ✓ | - | 端点 X |
| pointY | `number` | ✓ | - | 端点 Y |
| rotation | `number` | ✓ | min: 0, max: 360 | 旋转角度（角度制）：绕 端点 旋转 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-sch-bus-entry.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `order`: 必需字段 |
| required | ERROR | `pointX`: 必需字段 |
| required | ERROR | `pointY`: 必需字段 |
| required | ERROR | `rotation`: 必需字段 |
| enum | ERROR | `yAxisDirection`: 允许值: up, down |
| minimum | ERROR | `order`: 最小值: 0 |
| minimum | ERROR | `rotation`: 最小值: 0 |
| maximum | ERROR | `rotation`: 最大值: 360 |

### 内嵌结构

此图元包含以下内嵌结构：

- 内嵌类型: [TSchLine](../../primitives/SCH_PAGE/line.md)
- 包含内嵌结构的字段: `lineGroup`

接入点是 BUS 的内嵌成员：每个成员 LINE 的 lineGroup 必须指向所属 BUS 的 id

## 示例

→ [查看示例](../../examples/SCH_PAGE/t-sch-bus-entry.md)

