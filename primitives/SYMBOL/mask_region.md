# TSchMaskRegion

> 返回 [SYMBOL 图元索引](../../documents/SYMBOL.md)

## 定义

屏蔽区域

**原理图族里的一块矩形屏蔽区域**，一行一条（`type:"MASK_REGION"`）：
以 (dotX1, dotY1) 与 (dotX2, dotY2) 为对角的一个矩形区域；
区域内绘制一个「三角标」（固定底 6 单位、高 6 单位的三角形）标示该屏蔽区。

区域尺寸另受 `maskExpand` 控制：按**扩展尺寸**（取 `expandWidth` / `expandHeight`）还是
退到**三角标默认尺寸**绘制，两态的区别见该字段说明。

本行的 `id` 由编辑器生成（随机 16 位小写十六进制），图元 id 的几类形态与判别见 [TElementId](../REFERENCE/t-element-id.md)。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| groupId | [TElementId](../REFERENCE/t-element-id.md) | ✓ | - | 分组编号；**两种「未成组」形态都表示未成组**： - **3.0 写盘时该键根本不存在**：写入端取 `model.combination?.id`，未成组即 `undefined`， 经 `JSON.stringify` 后整键被丢弃，消费方须**按可选键处理**； - **`""` 只出现在 2.0 迁移数据里**（2.0 → 3.0 转换腿原样带着它）。 |
| locked | `boolean` | ✓ | - | 是否锁定。 ⚠️ **原理图侧目前只是数据字段**：pro-sch 里没有任何按它拦截拖拽 / 删除 / 改大小 / 改形状的实现（连「锁定 / 解锁」命令本身都是空实现，只 publish 属性面板刷新）。 那四条行为特征只在 **PCB / 面板**侧落实。生成数据时照常写入本字段， 但**不要指望原理图端会因为它而禁止操作**。 |
| zIndex | `number \| null` | ✓ | - | 同层内的叠放次序：渲染排序键，数值越小越靠下（格式里没有高度语义） |
| yAxisDirection | [TYAxisDirection](../REFERENCE/ty-axis-direction.md) |  | - | Y 轴方向标记：**仅 eprj3 本地文件格式会带**，读盘时被剥离。 取值：`up` = **笛卡尔坐标系（Y 向上）**，本行坐标已按它写出（本地文件固定用它），`down` = **屏幕坐标系（Y 向下）**（编辑器内部与云端的常态） ——**字段缺失等价于它**，两者是同一件事；两套坐标系下同一个形状的 y **互为相反数**。完整语义见 [TYAxisDirection](../REFERENCE/ty-axis-direction.md)。 ⚠️ 本基类被多个图元继承，**各自被翻转的字段不同**——完整对照表见 [TYAxisDirection](../REFERENCE/ty-axis-direction.md)。 本基类直接覆盖的：`ATTR`/`TEXT`/`PIN`/`COMPONENT` 翻 `y`；`OBJ`/`TABLE` 翻 `startY`； `ARC` 翻 `startY`/`referY`/`endY`；`CIRCLE`/`ELLIPSE` 翻 `centerY` + 内嵌 `text.y`； `RECT` 翻 `dotY1`/`dotY2` + `text.y`；`MASK_REGION` 翻 `dotY1`/`dotY2`；`POLY` 翻 `points` 各项的 `y`；`BEZIER` 翻 `controls` 的奇数下标。 `rotation` / `isMirror` / `zIndex` 与所有幅值字段**不翻**。 |
| maskExpand | `boolean` | ✓ | default: true | 是否按扩展尺寸绘制屏蔽区域： - `true`：区域范围取 `expandWidth` / `expandHeight`，即 dotX2 = dotX1 + expandWidth、 dotY2 = dotY1 + expandHeight - `false`：退化为默认三角形尺寸（区域退到「三角边长 6 + 描边宽 ×2 + 间隔 4」推算的大小） |
| dotX1 | `number` | ✓ | - | 点 1 X：区域左上角 X |
| dotY1 | `number` | ✓ | - | 点 1 Y：区域左上角 Y |
| dotX2 | `number` | ✓ | - | 点 2 X：区域右下角 X |
| dotY2 | `number` | ✓ | - | 点 2 Y：区域右下角 Y |
| expandWidth | `number \| null` | ✓ | - | 展开宽度：maskExpand 为 true 时区域的宽；可空，null 表示未设置（缺省为 null）（0.01 inch） |
| expandHeight | `number \| null` | ✓ | - | 展开高度：maskExpand 为 true 时区域的高；可空，null 表示未设置（缺省为 null）（0.01 inch） |
| strokeColor | `string \| null` | ✓ | - | 描边颜色：`"#RRGGBB"` 十六进制色值；**null 表示采用主题默认色** 注：本文件各示例中的该字段**一律为 null**，非空色的具体串格式未在示例中出现； 可参照同文件 `TSchPin.color` 的 `@pattern ^$\|^#[0-9A-Fa-f]{6}$`。 |
| strokeStyle | [EStrokeStyle](../REFERENCE/e-stroke-style.md) \| null | ✓ | default: null | 取值范围：SOLID（实线）、SHORT_DASH（短划线）、DOT（点线）、DOT_DASH（点划线） |
| fillColor | `string \| null` | ✓ | - | 填充颜色：`"#RRGGBB"` 十六进制色值；`""` 表示不填充（填充会自动闭合起始点与结束点）； null 表示采用主题默认 |
| strokeWidth | `number \| null` | ✓ | default: null | 宽度：null 表示采用主题默认线宽 单位：**0.01 inch** |
| fillStyle | [ESchFillStyle](../REFERENCE/e-sch-fill-style.md) \| null | ✓ | default: null | 取值范围：NONE（无填充）、SOLID（实心填充）、GRID（网格）、HORIZONTAL_LINE（横线）、VERTICAL_LINE（竖线）、RHOMBIC（菱形网格）、LEFT_SLASH_LINE（左斜线）、RIGHT_SLASH_LINE（右斜线） |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-sch-mask-region.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `maskExpand`: 必需字段 |
| required | ERROR | `dotX1`: 必需字段 |
| required | ERROR | `dotY1`: 必需字段 |
| required | ERROR | `dotX2`: 必需字段 |
| required | ERROR | `dotY2`: 必需字段 |
| required | ERROR | `expandWidth`: 必需字段 |
| required | ERROR | `expandHeight`: 必需字段 |
| required | ERROR | `strokeColor`: 必需字段 |
| required | ERROR | `strokeStyle`: 必需字段 |
| required | ERROR | `fillColor`: 必需字段 |
| required | ERROR | `strokeWidth`: 必需字段 |
| required | ERROR | `fillStyle`: 必需字段 |
| enum | ERROR | `yAxisDirection`: 允许值: up, down |
| enum | ERROR | `strokeStyle`: 允许值: SOLID, SHORT_DASH, DOT, DOT_DASH, null |
| enum | ERROR | `fillStyle`: 允许值: NONE, SOLID, GRID, HORIZONTAL_LINE, VERTICAL_LINE, RHOMBIC, LEFT_SLASH_LINE, RIGHT_SLASH_LINE, null |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/SYMBOL/t-sch-mask-region.md)

