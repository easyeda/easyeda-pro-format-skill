# TSchEllipse

> 返回 [SIMULATION 图元索引](../../documents/SIMULATION.md)

## 定义

椭圆

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| partId | `string` |  | - | 所属部件编号（**可选**，真机存在整键缺失的 COMPONENT）： **符号页**上表示自身归属于哪个部件，**图页**的元件则指向它**关联的符号文档**里的部件。 取值即目标 `PART` 行的 `id`（`PART` 行只存在于 SYMBOL 文档，见 `TPart`）。 |
| groupId | `string` | ✓ | - | 分组编号；**两种「未成组」形态都表示未成组**： - **3.0 写盘时该键根本不存在**：写入端取 `model.combination?.id`，未成组即 `undefined`， 经 `JSON.stringify` 后整键被丢弃，消费方须**按可选键处理**； - **`""` 只出现在 2.0 迁移数据里**（2.0 → 3.0 转换腿原样带着它）。 |
| locked | `boolean` | ✓ | - | 是否锁定 |
| zIndex | `number \| null` | ✓ | - | 同层内的叠放次序：渲染排序键，数值越小越靠下（格式里没有高度语义） |
| yAxisDirection | `TYAxisDirection` |  | - | Y 轴方向标记：**仅 eprj3 本地文件格式会带**，读盘时被剥离。 取值：`up` **已按 Y 轴向上写出**（本地文件固定用它）、`down` Y 轴向下 （**字段缺失等价于它**，两者是同一件事）。完整语义见 `TYAxisDirection`。 ⚠️ 本基类被多个图元继承，**各自被翻转的字段不同**——完整对照表见 `TYAxisDirection`。 本基类直接覆盖的：`ATTR`/`TEXT`/`PIN`/`COMPONENT` 翻 `y`；`OBJ`/`TABLE` 翻 `startY`； `ARC` 翻 `startY`/`referY`/`endY`；`CIRCLE`/`ELLIPSE` 翻 `centerY` + 内嵌 `text.y`； `RECT` 翻 `dotY1`/`dotY2` + `text.y`；`MASK_REGION` 翻 `dotY1`/`dotY2`；`POLY` 翻 `points` 各项的 `y`；`BEZIER` 翻 `controls` 的奇数下标。 `rotation` / `isMirror` / `zIndex` 与所有幅值字段**不翻**。 |
| centerX | `number` | ✓ | - | 中点 centerX |
| centerY | `number` | ✓ | - | 中点 centerY |
| radiusX | `number` | ✓ | min: 0 | 水平半径 radiusX ⚠️ **真机存在负值**（样本 `"radiusX":2.5` 配 `"radiusY":-2.5`，来自 2.0 迁移）。 解码端一律取绝对值，负号无意义；**生成时写正数即可**。 |
| radiusY | `number` | ✓ | min: 0 | 垂直半径 radiusY ⚠️ **真机存在负值**（样本 `"radiusX":2.5` 配 `"radiusY":-2.5`，来自 2.0 迁移）。 解码端一律取绝对值，负号无意义；**生成时写正数即可**。 |
| rotation | `number` | ✓ | min: 0, max: 360 | 旋转角度（角度制） |
| text | `TSchText` |  | - | 3.3 添加文本字段。 注意：本图元的**旋转角写在 `text.rotation`**（顶层 rotation 已废弃或不存在）， 详见 TSchText.rotation 的说明 ⚠️ **这是写入端产出的「缩减文本」，不是完整的 `TSchText`**： - 实际只填 `value` / `color` / `fontSize` / `rotation` / `x` / `y` / `fontFamily` 等； - **`align` 与 `groupId` / `locked` / `zIndex` 恒为 `null`**（写入端就直接落 `null`）， 解码端**也不读 `align`**——不要照 `TSchText` 的必填口径去要求它们； - 另带一个 **`lineHeight`**（行高倍数，`null` = 主题默认）：它是**有意设计的扩展字段** （协议 `TSchText` 暂未收录，源码序列化时以扩展字段形式读写），解码端会读； - ⚠️ 内嵌 `text.rotation` **必须写数字，不能写 `null`**：解析判据是 `Number.isFinite(+data.text.rotation)`，而 `+null === 0` 也算有限值， 写 `null` 会把图形旋转**静默置 0**。 |
| strokeColor | `string \| null` | ✓ | - | 描边颜色：`"#RRGGBB"` 十六进制色值；**null 表示采用主题默认色** 注：本文件各示例中的该字段**一律为 null**，非空色的具体串格式未在示例中出现； 可参照同文件 `TSchPin.color` 的 `@pattern ^$\|^#[0-9A-Fa-f]{6}$`。 |
| strokeStyle | `EStrokeStyle \| null` | ✓ | default: null | 取值范围：SOLID（实线）、SHORT_DASH（短划线）、DOT（点线）、DOT_DASH（点划线） |
| fillColor | `string \| null` | ✓ | - | 填充颜色：`"#RRGGBB"` 十六进制色值；`""` 表示不填充（填充会自动闭合起始点与结束点）； null 表示采用主题默认 |
| strokeWidth | `number \| null` | ✓ | default: null | 宽度：null 表示采用主题默认线宽 |
| fillStyle | `ESchFillStyle \| null` | ✓ | default: null | 取值范围：NONE（无填充）、SOLID（实心填充）、GRID（网格）、HORIZONTAL_LINE（横线）、VERTICAL_LINE（竖线）、RHOMBIC（菱形网格）、LEFT_SLASH_LINE（左斜线）、RIGHT_SLASH_LINE（右斜线） |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-sch-ellipse.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `centerX`: 必需字段 |
| required | ERROR | `centerY`: 必需字段 |
| required | ERROR | `radiusX`: 必需字段 |
| required | ERROR | `radiusY`: 必需字段 |
| required | ERROR | `rotation`: 必需字段 |
| required | ERROR | `strokeColor`: 必需字段 |
| required | ERROR | `strokeStyle`: 必需字段 |
| required | ERROR | `fillColor`: 必需字段 |
| required | ERROR | `strokeWidth`: 必需字段 |
| required | ERROR | `fillStyle`: 必需字段 |
| enum | ERROR | `yAxisDirection`: 允许值: up, down |
| minimum | ERROR | `radiusX`: 最小值: 0 |
| minimum | ERROR | `radiusY`: 最小值: 0 |
| minimum | ERROR | `rotation`: 最小值: 0 |
| maximum | ERROR | `rotation`: 最大值: 360 |
| enum | ERROR | `strokeStyle`: 允许值: SOLID, SHORT_DASH, DOT, DOT_DASH, null |
| enum | ERROR | `fillStyle`: 允许值: NONE, SOLID, GRID, HORIZONTAL_LINE, VERTICAL_LINE, RHOMBIC, LEFT_SLASH_LINE, RIGHT_SLASH_LINE, null |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/SIMULATION/t-sch-ellipse.md)

