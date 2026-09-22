# TMFont

> 返回 [FONT 图元索引](../../documents/FONT.md)

## 定义

字体缓存

【外层数据id构造】id **必须**是一个 **8 槽 JSON 数组**，缺一不可：
`[text, fontFamily, fontSize, thickness, bold?1:0, italic?1:0, reverse?1:0, expansion]`
（见 `getFontId`）；其中**第 4 槽 `thickness` 生成时写 10**。
id 形如 `["CN1","仿宋",59.05512,10,0,0,0,0]`（8 槽一次排开）。
⚠️ 该槽**读取端不得依赖恒为 10**：历史 / 异构数据里存在其它值
（真机同一份 FONT 文档里就有 `8`，如 `["+","default",3.937,8,0,0,0,0]`）。

【落盘形态】写盘端**只写 `width` / `height` / `path` 三个字段**；
其余 8 个是**字体键的槽位**，解析时**由 id 反解填充**
（`parseFontId(id)` + `Object.assign(itemObj, data)`）。

【长度单位不统一，按字段看】本类型的字段口径**互不相同**：
- `width` / `height` —— **mil**（写盘时内部值 ×10）；
- `fontSize` —— **内部单位 / 0.01 inch 口径**（1 单位 = 10 mil = 0.254 mm）。
  **与文字元素的关系**：`= 该文字元素格式 `fontSize`（STRING/ATTR/DIMENSION，mil）的 1/10`。
  写盘端把内部渲染值（px）原样透传到槽 3，而文字元素在写盘时把内部值 ×10 进格式，
  所以槽 3 数值 = 文字元素格式 fontSize ÷ 10（两侧各自自洽，读回也是这个值，别重复换算）。
- `path` —— **原样搬运**，不做换算。

【行数据外壳】每条数据是一行，形如 `{"type":..., "id":..., "ticket":...}||{...}`：
前半段是通用外壳（`type` 取数据流里的类型取值，`ticket` 是逻辑时钟），后半段才是本类型描述的内容；
外壳还可能带 `client` / `firstTicket` / `pend` / `num` 等可选键（**真机 FONT 行就带 `client`**），
读取端**透传即可**。**行终止符是 `|` 加换行（LF，不是 CRLF）**：`||` 是外壳/载荷分界，
行尾的 `|`+换行才是记录结束。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| text | `string` |  | - | 被缓存的文字内容（**字体键第 1 槽**，共 8 槽）：写盘时进 id，盘上载荷不含本字段， 解析时由 id 反解填充 |
| fontFamily | `string` |  | - | 字体名称（**字体键第 2 槽**，共 8 槽），如 `"仿宋"`、`"default"` |
| fontSize | `number` |  | - | 字号（**字体键第 3 槽**，共 8 槽；**内部单位 / 0.01 inch 口径**，与 width/height 不同） |
| thickness | `number` |  | - | 笔画粗细（**字体键第 4 槽**，共 8 槽）：生成时该槽写 10； ⚠️ **读取端不得依赖该槽恒为 10**——历史 / 异构数据里存在其它值（真机见过 `8`） |
| bold | `boolean` |  | - | 是否加粗（**字体键第 5 槽**，共 8 槽；写盘按 `bold?1:0` 取值） |
| italic | `boolean` |  | - | 是否斜体（**字体键第 6 槽**，共 8 槽；写盘按 `italic?1:0` 取值） |
| reverse | `boolean` |  | - | 是否反相扩展（**字体键第 7 槽**，共 8 槽；写盘按 `reverse?1:0` 取值） |
| expansion | `number` |  | - | 反相扩展尺寸（**字体键第 8 槽**，共 8 槽）：支持负数。 ⚠️ **口径与同类型的 `width` / `height` 不同**：这一槽是**内部单位** （1 单位 = 10 mil = 0.01 inch），写读两腿都**不做 ×10 / ÷10**， 与第 3 槽 `fontSize` 同口径 —— **别按 mil 读它**。 |
| width | `number` | ✓ | min: 0 | 字形包围盒宽（**单位为 mil**——写盘时内部值 ×10，与 `path` 的口径不同） |
| height | `number` | ✓ | min: 0 | 字形包围盒高（**单位为 mil**，同 width） |
| path | [TPcbComplexPolygon](../REFERENCE/t-pcb-complex-polygon.md) | ✓ | - | 字形轮廓（**复杂多边形** [TPcbComplexPolygon](../REFERENCE/t-pcb-complex-polygon.md)，即若干**单多边形** [TPcbSinglePolygon](../REFERENCE/t-pcb-single-polygon.md) 组成的数组）：外层数组是**整段文本**的全部轮廓环， **不按字切分**——一个带内洞的字符本身就会占多个元素；首环为外轮廓、后续各环为内洞。 该字段是**字体缓存**：解析端可据此直接还原文字轮廓，无需加载字体文件。 ## 缓存的是什么状态下的字形 **为了跨设备一致**，这里存的是字形**自身坐标系下的原始轮廓**： **不含平移 / 旋转 / 镜像 / 缩放，也不含对齐偏移** （对齐靠字号原点在元素矩阵里施加，位置 / 旋转 / 镜像另存于文字元素自身）， 因此**不随平移 / 旋转 / 镜像（含顶层移到下层）刷新**。 这一点由本类型的 **id 结构**保证：字体键的 8 槽里没有任何变换分量（见上方 id 构造）。 ⚠️ **但字号没有被归一化**：`fontSize` 就是 id 的第 3 槽， 路径是该字号下的**实际尺寸**（内部单位），同一段文字不同字号各有一份缓存。 （2.0 面板的 `FONT_CACHE` 记录**没有字号槽**，所以那边才需要「固定在字号 1」； 本类型不要照那条口径理解。） ⚠️ **`width` / `height` 不是由路径算出来的**：它们是随载荷一起写盘的字形包围盒（mil）。 因此**不要假设路径坐标落在 `[0, width] × [0, height]` 内**。 只有载荷缺宽高时，才会用**折线真实 bbox** 兜底修补（不是按 0..width 公式取）。 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/tm-font.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `width`: 必需字段 |
| required | ERROR | `height`: 必需字段 |
| required | ERROR | `path`: 必需字段 |
| minimum | ERROR | `width`: 最小值: 0 |
| minimum | ERROR | `height`: 最小值: 0 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/FONT/tm-font.md)

