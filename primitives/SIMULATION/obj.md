# TSchObj

> 返回 [SIMULATION 图元索引](../../documents/SIMULATION.md)

## 定义

原理图二进制内嵌对象

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| partId | `string` |  | - | 所属部件编号（**可选**，真机存在整键缺失的 COMPONENT）： **符号页**上表示自身归属于哪个部件，**图页**的元件则指向它**关联的符号文档**里的部件。 取值即目标 `PART` 行的 `id`（`PART` 行只存在于 SYMBOL 文档，见 `TPart`）。 |
| groupId | `string` | ✓ | - | 分组编号；**两种「未成组」形态都表示未成组**： - **3.0 写盘时该键根本不存在**：写入端取 `model.combination?.id`，未成组即 `undefined`， 经 `JSON.stringify` 后整键被丢弃，消费方须**按可选键处理**； - **`""` 只出现在 2.0 迁移数据里**（2.0 → 3.0 转换腿原样带着它）。 |
| locked | `boolean` | ✓ | - | 是否锁定 |
| zIndex | `number \| null` | ✓ | - | 同层内的叠放次序：渲染排序键，数值越小越靠下（格式里没有高度语义） |
| yAxisDirection | `TYAxisDirection` |  | - | Y 轴方向标记：**仅 eprj3 本地文件格式会带**，读盘时被剥离。 取值：`up` **已按 Y 轴向上写出**（本地文件固定用它）、`down` Y 轴向下 （**字段缺失等价于它**，两者是同一件事）。完整语义见 `TYAxisDirection`。 ⚠️ 本基类被多个图元继承，**各自被翻转的字段不同**——完整对照表见 `TYAxisDirection`。 本基类直接覆盖的：`ATTR`/`TEXT`/`PIN`/`COMPONENT` 翻 `y`；`OBJ`/`TABLE` 翻 `startY`； `ARC` 翻 `startY`/`referY`/`endY`；`CIRCLE`/`ELLIPSE` 翻 `centerY` + 内嵌 `text.y`； `RECT` 翻 `dotY1`/`dotY2` + `text.y`；`MASK_REGION` 翻 `dotY1`/`dotY2`；`POLY` 翻 `points` 各项的 `y`；`BEZIER` 翻 `controls` 的奇数下标。 `rotation` / `isMirror` / `zIndex` 与所有幅值字段**不翻**。 |
| fileName | `string` | ✓ | - | 文件名 |
| startX | `number` | ✓ | - | 左上角 X |
| startY | `number` | ✓ | - | 左上角 Y |
| width | `number` | ✓ | min: 0 | 宽 |
| height | `number` | ✓ | min: 0 | 高 |
| rotation | `number` | ✓ | min: 0, max: 360 | 旋转角度（角度制）：绕左上角旋转 |
| isMirror | `boolean` | ✓ | - | 是否镜像 |
| content | `string` | ✓ | pattern: ^(data:\|blob:) | 二进制数据，有两种模式一般格式，1.遵循 Data Urls 规范 data:[<mediatype>][;base64],<data> 2.BLOB引用模式，blob:hashid |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-sch-obj.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `fileName`: 必需字段 |
| required | ERROR | `startX`: 必需字段 |
| required | ERROR | `startY`: 必需字段 |
| required | ERROR | `width`: 必需字段 |
| required | ERROR | `height`: 必需字段 |
| required | ERROR | `rotation`: 必需字段 |
| required | ERROR | `isMirror`: 必需字段 |
| required | ERROR | `content`: 必需字段 |
| enum | ERROR | `yAxisDirection`: 允许值: up, down |
| minimum | ERROR | `width`: 最小值: 0 |
| minimum | ERROR | `height`: 最小值: 0 |
| minimum | ERROR | `rotation`: 最小值: 0 |
| maximum | ERROR | `rotation`: 最大值: 360 |
| pattern | ERROR | `content`: 匹配模式: ^(data:\|blob:) |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/SIMULATION/t-sch-obj.md)

