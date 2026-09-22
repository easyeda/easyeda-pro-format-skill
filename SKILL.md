---
name: easyeda-pro-format-skill
description: >-
  Generate EasyEDA Pro format data for schematic/PCB/symbol/footprint.
  Reads type definitions and JSON schemas, outputs to format/{type}_{timestamp}.txt.
  Trigger: "生成过孔的格式", "生成电阻元件的格式", "画导线的格式",
  "创建电容元件", "添加焊盘", "画圆形", "创建总线", "生成TBus的格式",
  "生成过孔", "创建矩形", "画多边形", "添加文字标注", "生成TSchText的格式",
  "生成TNetClass的格式", "生成EasyEDA格式", "生成嘉立创EDA格式",
  "generate via format", "create component", "draw wire", "add pad"
when_to_use: 当需要生成任何嘉立创EDA/EasyEDA Pro 格式数据时使用。包括原理图元素（TSchLine、TSchPin、TSchComponent 等）、PCB 元素（TPcbVia、TPcbPad、TPcbLine、TPcbPoly 等）、面板元素（TPanelPoly、TPanelString 等）、规则元素（TRuleSelector、TRule、TRuleTemplate 等）、元数据（TMFont、TMBlob、TMBoard 等）及其他类型定义中的格式。
argument-hint: <type> [field-values]
allowed-tools: Bash Read Write Edit Glob
license: MIT
metadata:
  author: EasyEDA
  version: 1.0.0
---

# 嘉立创 EDA 格式 SKILL 文档

---

## ⚠️ 核心流程（必须严格执行）

每当你生成格式数据后，**必须立即调用验证脚本**，验证通过才能返回结果。

**强制流程**：
```
1. 查询资料 → 2. 检查关联图元 → 3. 生成格式 → 4. 验证格式 → 5. 存档
                                                    ↓ 失败
                                              修复并重试（最多3次）
```

**每次生成后必须执行的检查清单**：
- [ ] 已查询 types-index.md 找到类型名
- [ ] 已进入文档层了解领域
- [ ] 已进入图元层查看字段定义和约束
- [ ] （可选）已查看示例层参考真实数据
- [ ] （可选）已查看 JSON Schema 了解约束
- [ ] 已检查是否需要生成关联图元
- [ ] 已生成格式数据（包括关联图元，如需）
- [ ] 关联图元的坐标和参数已自动推断（未询问用户）
- [ ] 已调用 `node validate.js` 验证所有生成的图元
- [ ] 验证结果 `valid: true`
- [ ] 已保存格式到文件
- [ ] 返回完整格式 + 验证结果

---

## 行数据格式

所有数据以行为单位，每行由外层数据和内层数据组成：

```
{type, id, ticket}||{实际数据}
```

**行终止符**：每行以 `|` 加换行（LF，**不是 CRLF**）结尾。`||` 是外壳/载荷分界，行尾的 `|` + 换行才是记录结束；载荷/外壳内不得出现「字面 `|` 紧跟字面换行」（JSON 序列化已保证不会）。

**外层数据**（最终一致性框架）：
- `type`: 图元类型名（如 LINE、PAD、VIA）
- `id`: 唯一标识。普通图元是 16 位十六进制随机串；单例原子（META / CANVAS / UNIVERSAL 等）直接用类型名；FONT 用字体键、BLOB 用内容哈希
- `ticket`: 逻辑时钟（递增整数）。**DOCHEAD 行没有 `id`**，外层只有 `type` 和 `ticket` —— `ticket` 由写入方决定，eprj3 保存路径会写（`ProConsistencyManager` 的 `JSON.stringify({ type: DOCHEAD, ticket })`，解析侧 `ProOuterParser` 也会读回来）

**内层数据**：具体图元的属性值，每种图元有对应的字段定义。

### 最终一致性（同一个数据出现多行时，哪一行算数）

存储是**只追加**的：增、删、改都是往日志里再写一行，所以同一个数据会有多行。由最终一致性框架判优，规则是：

1. **判优键是「文档 + 归一化 id」** —— `type` **不参与**比较；同一个 id 即使换了 type 也走同一条链竞争。
2. `ticket` 不同 → **保留 `ticket` 更大的那一行**。
3. `ticket` 相同 → 再比**文档头的 `client`**，**保留 `client` 字典序更大的那一行**。

> ⚠️ 第 3 条的**方向是「大者胜」**。老 2.0 文档写的是「`client` 标识更小的则保留」，**与实现相反**（实现见 `lc-protocol` 的 `3.0/consistency/utils/list.ts` 的 `compareFn` 及配套单测），**不要照老文档写**。

另有**未决（pend）/ 撤销（revoke）**机制会临时盖过上述结论（同一个 `(client, ticket)` 命中时只翻 pend 标志、不用新值覆盖；`revoke` 可让更小 ticket 的已决节点重新生效）。那是协同编辑的内部状态，生成静态格式数据时用不到。

### 删除怎么表达

- **删一条原子数据**：再写一行，并把**内层数据置为空字符串** —— `{"type":"…","id":"…","ticket":N}||`（`||` 之后为空）。**不是**把这一行从日志里抹掉。
- **删一个文档**：写一行 `{"type":"DELETE_DOC","ticket":N}||{"isDelete":true}`。它只是**加了个删除标识**，原文档数据仍留在日志里，因此**可以撤销**（再用 `{"isDelete":false}` 覆盖掉）。
- ⚠️ **两种删除的载荷不可互换**，必须按 type 分别给：
  - `DELETE_DOC` 发空串 ⇒ 会被判成「未删除」，把已删文档**复活**；它要的是 `{"isDelete":true}` / `{"isDelete":false}`。
  - `META` **绝不能**发空串 —— 消费方会直接取 `dataObj.title`，空串解析成 `null` 后抛异常、整批重放中止；删 META 走 `DELETE_DOC`。
  - `INSTANCE_ATTR` 的空串是**正确**载荷（语义就是「删掉这个属性」）。

## ⚠️ 类型名与文档类型前缀（校验必读）

**同名图元在不同文档类型下 schema 不同**：`LINE` 在原理图页是「导线」（有 lineGroup/strokeColor…），在 PCB 是「走线」（有 netName/layerId/width…）。校验时必须让校验器知道是哪种文档，否则会拿错 schema —— 表现为「缺一堆你用不到的字段」或「该报的错没报」。

**方式一（推荐）**：校验时用 `<文档类型>_<图元名>` 前缀名：

```bash
node validate.js PCB_LINE '{"netName":"+5V",...}'
node validate.js PANEL_POLY '{...}'
node validate.js BOARD_META '{"title":"Board1",...}'
```

**方式二**：用 `--doc` 显式指定文档类型（用裸名时更清晰）：

```bash
node validate.js LINE '{"netName":"+5V",...}' --doc PCB
```

**方式三**：直接用裸名 —— 会按 `SCH_PAGE > SCH > SYMBOL > PCB > 其他` 的优先级解析，**跨文档类型时解析结果不是你想要的**，仅在原理图类文档下可靠。

常用对照（完整清单见 `validate.js` 的 `TYPE_MAP`）：

| 文档类型 | 走线 / 导线 | 多边形 | 元件 | 圆弧 | 元数据 | 画布 |
|---------|------------|--------|------|------|--------|------|
| SCH_PAGE / SYMBOL | SCH_PAGE_LINE | SCH_PAGE_POLY | SCH_PAGE_COMPONENT | SCH_PAGE_ARC | SCH_PAGE_META | SCH_PAGE_CANVAS |
| PCB / FOOTPRINT | PCB_LINE | PCB_POLY | PCB_COMPONENT | PCB_ARC | PCB_META | PCB_CANVAS |
| PANEL / PANEL_LIB | PANEL_AUXLINE | PANEL_POLY | — | — | PANEL_META | PANEL_CANVAS |
| SIMULATION | SIMULATION_LINE | SIMULATION_POLY | SIMULATION_COMPONENT | SIMULATION_ARC | SIMULATION_META | SIMULATION_CANVAS |
| BOARD / CONFIG / DEVICE / SCH / SIMULATION_SCH | — | — | — | — | BOARD_META / CONFIG_META / SCH_META / SIMULATION_SCH_META … | — |

## 必填格式：DOCHEAD 和 CANVAS

**重要**: 生成任何图元格式时，**必须**首先包含 **DOCHEAD**；顺序为 DOCHEAD → CANVAS → 其他图元。**CANVAS 只对含画布的文档类型存在**（SCH_PAGE / SYMBOL / SIMULATION / PCB / FOOTPRINT / PANEL / PANEL_LIB，见下方对应表），FONT / BLOB / CONFIG / BOARD / DEVICE / SCH / SIMULATION_SCH 等文档没有 CANVAS，不要添加。

### DOCHEAD（文档头）

DOCHEAD 是每个文档的第一行，定义文档的类型和元数据。

**格式**:
```
{"type":"DOCHEAD","ticket":1}||{docType, client, uuid, updateTime, version}
```

**字段说明**:
| 字段 | 类型 | 必需 | 说明 |
|------|------|------|------|
| docType | string | ✓ | 文档类型，如 `SCH_PAGE`、`PCB`、`SYMBOL`、`FOOTPRINT` |
| client | string | ✓ | 客户端 ID - **16 位小写十六进制**（如 `1f0f511a4641034c`），用户可指定，否则 AI 推断 |
| uuid | string | ✓ | 文档唯一标识 - **16 位小写十六进制**，用户可指定，否则 AI 推断 |
| updateTime | number | - | 更新时间戳（毫秒）- 用户可指定，否则 AI 推断（当前时间） |
| version | string | - | 版本号 - 用户可指定，否则 AI 推断（通常与 updateTime 相同） |

**用户字段指定规则**：
- 如果用户在请求中提供了 `client`、`uuid`、`updateTime`、`version`，使用用户指定的值（`client` / `uuid` 仍需满足 16 位小写十六进制）
- 如果用户未提供，AI 推断合理的默认值：
  - `client`: 生成 16 位小写十六进制字符
  - `uuid`: 生成 16 位小写十六进制字符
  - `updateTime`: 使用当前时间戳（毫秒）
  - `version`: 与 `updateTime` 相同

**示例（SCH_PAGE）**:
```json
{"type":"DOCHEAD","ticket":1}||{"docType":"SCH_PAGE","client":"1f0f511a4641034c","uuid":"81ace96648894616","updateTime":1777537222142,"version":"1777537222142"}|
```

**示例（用户指定 client，同样必须是 16 位小写十六进制）**:
```json
{"type":"DOCHEAD","ticket":1}||{"docType":"SCH_PAGE","client":"a1b2c3d4e5f60718","uuid":"81ace96648894616","updateTime":1777537222142,"version":"1777537222142"}|
```

**示例（PCB）**:
```json
{"type":"DOCHEAD","ticket":1}||{"docType":"PCB","client":"1f0f511a4641034c","uuid":"81ace96648894616","updateTime":1777537222142,"version":"1777537222142"}|
```

### CANVAS（画布配置）

CANVAS 是每个文档的第二行，定义画布的原点和配置信息。根据文档类型不同，CANVAS 的格式有所差异。

#### SCH_PAGE / SYMBOL 画布（简化版）

**格式**:
```
{"type":"CANVAS","ticket":1,"id":"CANVAS"}||{originX, originY}
```

**字段说明**:
| 字段 | 类型 | 必需 | 说明 |
|------|------|------|------|
| originX | number | ✓ | 画布原点 X |
| originY | number | ✓ | 画布原点 Y |

**示例**:
```json
{"type":"CANVAS","ticket":1,"id":"CANVAS"}||{"originX":0,"originY":0}
```

#### PCB / FOOTPRINT 画布（完整版）

**格式**:
```
{"type":"CANVAS","ticket":1,"id":"CANVAS"}||{originX, originY, unit, gridXSize, gridYSize, ...}
```

**字段说明**:
| 字段 | 类型 | 必需 | 说明 |
|------|------|------|------|
| originX | number | ✓ | 画布原点 X |
| originY | number | ✓ | 画布原点 Y |
| unit | string | ✓ | 显示单位（如 "mm", "mil"） |
| gridXSize | number | ✓ | 网格尺寸 X |
| gridYSize | number | ✓ | 网格尺寸 Y |
| snapXSize | number | ✓ | 栅格尺寸 X |
| snapYSize | number | ✓ | 栅格尺寸 Y |
| altSnapXSize | number | ✓ | Alt 栅格尺寸 X |
| altSnapYSize | number | ✓ | Alt 栅格尺寸 Y |
| gridType | EGridType | ✓ | 网格类型（如 "GRID"） |
| multiGridType | EGridType | ✓ | 加粗网格类型 |
| multiGridRatio | number | ✓ | 加粗网格倍数 |
| highlightValue | number | ✓ | 高亮亮度值 |
| layerBrightness | ELayerBrightness | ✓ | 图层亮度（如 "NORMAL"） |

**示例（PCB / FOOTPRINT）**:
```json
{"type":"CANVAS","ticket":1,"id":"CANVAS"}||{"originX":0,"originY":0,"unit":"mm","gridXSize":10,"gridYSize":10,"snapXSize":1,"snapYSize":1,"altSnapXSize":0.1,"altSnapYSize":0.1,"gridType":"NONE","multiGridType":"NONE","multiGridRatio":10,"highlightValue":0.5,"layerBrightness":"NORMAL"}
```

**示例（PANEL / PANEL_LIB，字段与上面的网格画布完全不同）**:
```json
{"type":"CANVAS","ticket":1,"id":"CANVAS"}||{"material":"acrylic","thickness":"0.8mm","print":"Bottom Side","craft":"Transparent","desc":"","coverColor":"white","width":"393mm","height":"579mm","originX":0,"originY":0,"orderWidth":"393mm","orderHeight":"579mm","backgroundColor":""}
```

### 生成顺序和规则

**生成顺序**：
1. DOCHEAD（第1行）- 固定 type 为 "DOCHEAD"
2. CANVAS（第2行，**仅下面列出的文档类型有**）- 固定 ticket 为 1，id 为 "CANVAS"
3. 其他图元（从第3行开始）- ticket 从 2 开始递增

**文档类型与 CANVAS 类型对应表**:
| 文档类型 | CANVAS 类型 | CANVAS 格式 | 校验用类型名 |
|---------|-------------|-------------|-------------|
| SCH_PAGE | TSchCanvas | 简化版（仅 originX, originY） | SCH_PAGE_CANVAS |
| SYMBOL | TSchCanvas | 简化版（仅 originX, originY） | SYMBOL_CANVAS |
| SIMULATION | TSchCanvas | 简化版（仅 originX, originY） | SIMULATION_CANVAS |
| PCB | TCanvas | 完整版 | PCB_CANVAS |
| FOOTPRINT | TCanvas | 完整版 | FOOTPRINT_CANVAS |
| PANEL | TPanelCanvas | 面板画布（材质/厚度/印刷/颜色…） | PANEL_CANVAS |
| PANEL_LIB | TPanelCanvas | 面板画布（材质/厚度/印刷/颜色…） | PANEL_LIB_CANVAS |

**没有 CANVAS 的文档类型**：FONT、BLOB、CONFIG、BOARD、DEVICE、SCH、SIMULATION_SCH —— 这些文档只有 DOCHEAD + 图元，不要塞 CANVAS 行。

## LLM 工作流

### 生成任务接收

当收到格式生成请求时（如"生成过孔的格式"、"创建一个电阻元件"、"画一条导线"）：

1. **理解请求**：识别用户想要生成的图元类型（如过孔/元件/导线）和具体的参数需求
2. **查找类型**（第一步，必须执行）：
   - 根据用户的中文描述（如"过孔"、"元件"、"导线"）在 types-index.md 中搜索
   - 找到对应的类型名称（如 TPcbVia、TSchComponent、TSchLine）和文档层路径
3. **渐进式加载资料**（按需加载，避免一次读取过多文件）：
   - 进入文档层：读取对应领域的文档（如 documents/PCB.md）
     → 文档层包含该领域所有图元的索引
   - 进入图元层：从索引中选择具体图元，读取其定义（如 primitives/PCB/via.md）
     → 图元层包含字段定义、JSON Schema 约束、关联图元说明
   - （可选）进入示例层：如需参考真实数据，按图元层提供的链接读取（如 examples/PCB/t-pcb-via.md）
   - （可选）查看 Schema：图元层提供 JSON Schema 链接，按需读取
4. **检查关联图元**：
   - 查看图元层的"关联图元"部分（父子图元、容器成员、内嵌结构、引用关联）
   - 如有关联图元说明，必须生成关联图元
   - 关联字段的值必须正确指向主图元
   - ⚠️ 不要询问用户：根据主图元的坐标和属性自动推断关联图元
5. **生成格式**：
   - 优先使用用户提供的字段值
   - 如果用户未提供但字段有默认值，使用默认值
   - 如果没有默认值，根据文档约束推断合理值
   - 同时验证用户提供的属性值（如有冲突可调整）
   - 如果需要，同时生成关联图元（每行一个图元格式）
   - ⚠️ 关联图元的坐标和参数由 AI 自动推断，不要询问用户
6. **验证格式**：
   - 对每个生成的图元调用验证脚本校验
   - 主图元和所有关联图元都必须通过验证
7. **存档**：
   - 验证通过后，保存所有格式到文件
   - 每行格式保存为一个文件，或多个格式保存为一个文件

**⚠️ 重要**：
- 不要跳过查询资料步骤，必须先收集足够的信息再生成格式！
- 有关联图元时必须一起生成，不能只生成主图元！
- 关联图元的坐标和参数由 AI 自动生成，不要询问用户！

### 关联图元示例（DOCHEAD + CANVAS + TBus + LINE + ATTR）

以下是一个完整的 SCH_PAGE 文件示例（代码块内每行均可直接复制）：

包含文件头、画布、BUS 图元及其关联图元（4 条 LINE 和 1 个 ATTR）：

```json
{"type":"DOCHEAD","ticket":1}||{"docType":"SCH_PAGE","client":"1f0f511a4641034c","uuid":"81ace96648894616","updateTime":1777537222142,"version":"1777537222142"}|
{"type":"CANVAS","ticket":1,"id":"CANVAS"}||{"originX":0,"originY":0}|
{"type":"BUS","ticket":35,"id":"917cf8401f113481"}||{"busEntry":{},"zIndex":6,"groupId":"","locked":false}|
{"type":"LINE","ticket":36,"id":"899f254f57c290ca"}||{"fillColor":null,"fillStyle":null,"strokeColor":null,"strokeStyle":null,"strokeWidth":null,"startX":600,"startY":-570,"endX":680,"endY":-570,"lineGroup":"917cf8401f113481"}|
{"type":"LINE","ticket":37,"id":"0cbf6fa91e809769"}||{"fillColor":null,"fillStyle":null,"strokeColor":null,"strokeStyle":null,"strokeWidth":null,"startX":680,"startY":-570,"endX":680,"endY":-500,"lineGroup":"917cf8401f113481"}|
{"type":"LINE","ticket":38,"id":"133a0ef467701da4"}||{"fillColor":null,"fillStyle":null,"strokeColor":null,"strokeStyle":null,"strokeWidth":null,"startX":680,"startY":-500,"endX":505,"endY":-500,"lineGroup":"917cf8401f113481"}|
{"type":"LINE","ticket":39,"id":"e7c73f80b9a41723"}||{"fillColor":null,"fillStyle":null,"strokeColor":null,"strokeStyle":null,"strokeWidth":null,"startX":505,"startY":-500,"endX":505,"endY":-565,"lineGroup":"917cf8401f113481"}|
{"type":"ATTR","ticket":40,"id":"fd36cf31312bbfcd"}||{"x":592.5,"y":-500,"rotation":0,"color":null,"fontFamily":null,"fontSize":null,"fontWeight":null,"italic":null,"underline":null,"align":"LEFT_BOTTOM","value":"BUS[0:5]","keyVisible":false,"valueVisible":true,"key":"NET","fillColor":null,"parentId":"917cf8401f113481","zIndex":4,"groupId":"","locked":false,"strikeout":null}
```

> 上面代码块里每行末尾的 `|` 是行分隔符：除最后一行外每行都要有，最后一行不要。

要点：
- DOCHEAD 定义文档类型和元数据
- CANVAS 定义画布原点坐标
- 同一组的图元用 id 互相引用：LINE 的 `lineGroup`、ATTR 的 `parentId` 都指向 BUS 的 id
- 后生成的图元 ticket 更大
- 每行格式末尾需要 `|` 分隔符（最后一行除外）

### 🔍 验证步骤（核心流程）

生成格式后**必须立即执行验证**：

**步骤 1**：调用验证脚本
```bash
# 用「文档类型_图元名」前缀名（推荐，跨文档类型的同名图元必须这样写）
node ./validate.js PCB_LINE '{"netName":"+5V",...}'
# 或用 --doc 指定文档类型
node ./validate.js LINE '{"netName":"+5V",...}' --doc PCB
```

**步骤 2**：检查验证结果
```json
{
  "valid": true,
  "errors": []
}
```
- 如果 `valid: true` 且 `errors: []` → 验证通过，保存格式到文件
- 如果 `valid: false` → 验证失败，需要修复

**步骤 3**：保存格式到文件（验证通过后必须执行）
```bash
# 保存到 format 目录
# 格式：{外层JSON}||{内层JSON}
# 示例：{"type":"LINE","id":"abc123","ticket":0}||{"startX":100,"startY":200}
```
保存规则：
- 保存目录：`./format`（与 SKILL.md 同目录）
- 文件名格式：`{type}_{timestamp}.txt`
- 文件内容：多个图元格式用换行分隔，每行格式末尾带 `|`（最后一行除外）
- 注：文件格式为文本格式

**重要格式规则**：
- 每个图元格式字符串末尾需要添加 `|` 分隔符（最后一个图元除外）
- 例如：使用 backticks 包裹的格式字符串末尾需要添加 | 分隔符
- 最后一个图元格式字符串末尾**不需要**添加 `|`

**步骤 4**：如果验证失败
1. 解析 `errors` 数组中的错误信息
2. 根据 `field` 和 `message` 修复对应字段
3. 重新调用验证脚本
4. 最多重试 3 次

⚠️ **重要**：不要跳过验证和保存步骤，不要假设生成结果正确！

**验证命令示例**：
```bash
node ./validate.js FONT '{"width":50,"height":40,"path":[[2,5,"L",2,35,48,35,48,5,2,5]]}'
```

## JSON Schemas

- [schemas/](schemas/) - 验证 schemas 目录

