# 嘉立创EDA Pro 格式更新日志 / Format Update Log

本文件总结嘉立创EDA Pro 各代文件格式的变化，当前重点为 **V3**（lceda-pro-file-format-v3，2025.10.21 规范）与 **V4**（本仓库 `easyeda-pro-format-skill` 所载格式）的差异。后续每次格式大变更都会补充新条目（最新在最上）。

> This file summarizes the file-format changes between generations of EasyEDA Pro (JLCEDA Pro), focusing on the differences between **V3** (the lceda-pro-file-format-v3 spec, 2025.10.21) and **V4** (the format captured in this repository, `easyeda-pro-format-skill`). A new entry will be added here (newest first) for every major format change.
>
> V3 资料来源 / V3 source: easyeda-api-skill `format/` 文档（index.md、project/、schematic/、pcb/）；V4 依据 / V4 basis: 本仓库 SKILL.md、documents/、primitives/、schemas/、examples/。

---

## V3 → V4（V4 条目建立于 2026-09-22）

### 1. 总体架构：基本不变 / Overall Architecture: mostly unchanged

- **中文**：两者同构——工程数据以日志式增量存储；每行为 `{ "type": "...", "id": "...", "ticket": N }||{ 内层 key-value }|`，`||` 分隔外层（最终一致性框架）与内层（图元原子数据），行尾带 `|`；键名驼峰。平票规则：V3 规范写的是 DOCHEAD 的 `client` **小者保留**；V4 文档已明确判优细节并**修正了方向**——判优键是「文档 + 归一化 id」（`type` 不参与比较），ticket 大者胜，平票时 `client` **字典序大者胜**，并指出老 2.0 文档「小者保留」的写法与实现相反，不可照抄。
- **English**: Both generations share the same architecture — log-based incremental project storage; each line is `{ "type": "...", "id": "...", "ticket": N }||{ inner key-value data }|` where `||` splits the outer eventual-consistency frame from the inner primitive atom, lines end with `|`; keys are camelCase. Tie-break: the V3 spec says the **smaller** DOCHEAD `client` wins; V4 documents the full resolution and **corrects the direction** — the key is "document + normalized id" (`type` excluded), larger `ticket` wins, and on a tie the **lexicographically larger** `client` wins; the old 2.0 spec's "smaller wins" is the opposite of the implementation and must not be copied.

### 2. 文档头 DOCHEAD 与编辑头 / Document Head and Edit Head

- **中文**：V3 的 DOCHEAD 只有 `docType` / `uuid` / `client` 四字段；V4 增加 `updateTime`（毫秒时间戳）与 `version`（通常与 updateTime 相同）。外层方面：V3 示例的 DOCHEAD 行仅 `{ "type": "DOCHEAD" }`（连 ticket 也不带），V4 为 `{ "type":"DOCHEAD","ticket":1 }`（无 id，ticket 由写入方决定）；V4 还限定 `client` / `uuid` 均为 **16 位小写十六进制**。V4 新增 **EDIT_HEAD** 编辑头（`uuid` / `username` / `nickname` / `updateTime`），记录文档最后编辑者信息，V3 无对应结构。
- **English**: In V3 the DOCHEAD carries only `docType` / `uuid` / `client`; V4 adds `updateTime` (millisecond timestamp) and `version` (usually equal to updateTime). On the outer frame: V3's example DOCHEAD line is just `{ "type": "DOCHEAD" }` (no ticket at all), while V4 writes `{ "type":"DOCHEAD","ticket":1 }` (no id; the ticket is chosen by the writer); V4 also constrains `client` / `uuid` to **16 lowercase hex characters**. V4 introduces a new **EDIT_HEAD** block (`uuid` / `username` / `nickname` / `updateTime`) recording the last editor of a document — no counterpart exists in V3.

### 3. 文档类型 docType 扩充 / Document Types Expanded

- **中文**：V3 的 docType 为 11 种（`PROJECT_CONFIG`、`BOARD`、`SCH`、`SCH_PAGE`、`PCB`、`PANEL`、`SYMBOL`、`FOOTPRINT`、`DEVICE`、`BLOB`、`INSTANCE`，变体/分组另见 VARIANT、COMPONENT_GROUP）。V4 的 `t-doc-head` 枚举扩至 **20 种**：`PROJECT_CONFIG` 更名为 `CONFIG`，新增 `EDIT_HEAD`、`PANEL_LIB`（面板库）、`FONT`（字体）、`VARIANT`、`COMPONENT_GROUP` / `COMPONENT_GROUP_DATA`（元件分组及属性）、`SIMULATION`（仿真页）、`SIMULATION_SCH`（仿真原理图）。
- **English**: V3 defines 11 docTypes (`PROJECT_CONFIG`, `BOARD`, `SCH`, `SCH_PAGE`, `PCB`, `PANEL`, `SYMBOL`, `FOOTPRINT`, `DEVICE`, `BLOB`, `INSTANCE`, with VARIANT and COMPONENT_GROUP documented separately). V4's `t-doc-head` enum grows to **20 values**: `PROJECT_CONFIG` is renamed `CONFIG`, and `EDIT_HEAD`, `PANEL_LIB` (panel library), `FONT`, `VARIANT`, `COMPONENT_GROUP` / `COMPONENT_GROUP_DATA`, `SIMULATION` (simulation page) and `SIMULATION_SCH` (simulation schematic) are added.

### 4. 画布 CANVAS / Canvas

- **中文**：两者均为 DOCHEAD 之后的独立 CANVAS 行，字段大体一致（原理图仅 `originX`/`originY`；PCB 含 `unit`、网格/栅格/Alt 栅格尺寸、`gridType`、`multiGridType`/`multiGridRatio` 等）。差别：V3 的 CANVAS 外层**省略 id**（单例行），V4 固定写 `"id":"CANVAS"`、`ticket:1`；V4 明确 PCB 画布字段全集并包含 `highlightValue`、`layerBrightness`，且 `unit` 仅接受小写字面量 `mm` / `mil`（大写会导致整条 CANVAS 被解码端丢弃）。
- **English**: In both generations CANVAS is a standalone line right after DOCHEAD with largely the same fields (schematic: only `originX`/`originY`; PCB: `unit`, grid/snap/alt-snap sizes, `gridType`, `multiGridType`/`multiGridRatio`, etc.). Differences: V3 **omits the outer id** (singleton row), while V4 always writes `"id":"CANVAS"` with `ticket:1`; V4 documents the full PCB canvas field set including `highlightValue` and `layerBrightness`, and `unit` accepts only lowercase `mm` / `mil` — uppercase values cause the whole CANVAS row to be dropped by the decoder.

### 5. 坐标单位与 Y 轴方向 / Units and Y-Axis Direction

- **中文**：V3 规定**全局统一 0.01 inch**（PCB 与原理图相同，canvas 的 `unit` 仅是显示单位）。V4 的 **PCB 坐标改为 mil**，网格/栅格尺寸写盘时 ×10、读盘 ÷10；原理图沿用 0.01 inch 量级（V4 文档未重述，示例坐标量级与 API 单位一致）。此外 V4（eprj3 本地工程格式）新增 **`yAxisDirection`** 标记（`up`/`down`）：本地文件固定 Y 轴向上写出，并按图元类型给出逐字段翻转对照表（`rotation`、`isMirror`、`zIndex` 及幅值字段不翻转）——V3 无此机制。
- **English**: V3 mandates a **global unit of 0.01 inch** (same for PCB and schematic; the canvas `unit` is display-only). V4 switches **PCB coordinates to mil**, with grid/snap sizes stored ×10 on write and ÷10 on read; the schematic keeps the 0.01-inch scale (not restated in V4 docs, but consistent with example magnitudes and the API units). In addition, V4 (for the eprj3 folder-based local project format) introduces the **`yAxisDirection`** flag (`up`/`down`): local files are always written with the Y axis pointing up, together with a per-primitive, per-field flip table (`rotation`, `isMirror`, `zIndex` and magnitude fields are never flipped) — V3 has no such mechanism.

### 6. 布尔与颜色编码 / Boolean and Color Encoding

- **中文**：V3 规范约定布尔用 `1`/`0`（其自身示例存在 `true`/`false` 混用）；V4 统一为 JSON 布尔 `true`/`false`（Schema 以 `type: boolean` 强约束）。颜色方面 V3 仅 `"#RRGGBB"`、透明用 `""`；V4 在原理图侧引入 **`null` 表示主题默认色**（`""` 仍表示不填充），PCB/面板侧扩展支持 `rgb(r,g,b)`、`cmyk(...)`、`data:` base64 内嵌图片与 `blob:` 外部引用。
- **English**: V3 specifies booleans as `1`/`0` (though its own examples mix in `true`/`false`); V4 unifies on JSON booleans `true`/`false` (enforced by `type: boolean` in the schemas). For colors, V3 only allows `"#RRGGBB"` with `""` for transparent; V4 adds **`null` meaning "use theme default"** on the schematic side (`""` still means "no fill"), and on the PCB/panel side accepts `rgb(r,g,b)`, `cmyk(...)`, inline `data:` base64 images, and `blob:` external references.

### 7. 原子类型与删除机制 / Atom Types and Deletion

- **中文**：删除机制一致——原子删除将内层置为空串 `||""`，文档删除追加 `DELETE_DOC` 标记行（`{ "isDelete": true }`），日志保留记录、克隆工程可清除。V4 进一步明确了易错点：`META` **绝不能**用空串删除（消费方直接取 `dataObj.title`，空串解析为 null 会抛异常并中止整批重放，删 META 走 `DELETE_DOC`）；`INSTANCE_ATTR` 的空串即「删除该属性」的正确载荷；`DELETE_DOC` 的载荷必须是 `isDelete` 对象（发空串会被判成未删除而"复活"文档）。V4 还将 `DELETE_DOC` 及更多控制行纳入 **`e-atom-type` 枚举体系**：在 V3 已有的 `META` / `META_CREATE` / `META_MODIFY` / `INSTANCE_ATTR` 之外，新增 `META_SORT`、`META_Z_INDEX`、`VARIANT_GROUPED`、`GROUP_INDEX`、`GROUP_DATA`、`ELE_PLACEHOLDER`、`META_PLACEHOLDER` 等，元数据控制面明显扩展。
- **English**: Deletion works the same way — an atom is deleted by setting its inner data to the empty string `||""`, and a document is deleted by appending a `DELETE_DOC` marker row (`{ "isDelete": true }`); records stay in the log and can be purged by cloning the project. V4 additionally spells out the pitfalls: `META` must **never** be deleted with an empty string (consumers read `dataObj.title` directly; a null from an empty string throws and aborts the whole replay — use `DELETE_DOC` for META); an empty string **is** the correct payload for `INSTANCE_ATTR` (meaning "remove this attribute"); and the `DELETE_DOC` payload must be an `isDelete` object (an empty string is judged "not deleted" and would resurrect the document). V4 also folds `DELETE_DOC` and more control rows into the **`e-atom-type` enum**: beyond V3's `META` / `META_CREATE` / `META_MODIFY` / `INSTANCE_ATTR`, it adds `META_SORT`, `META_Z_INDEX`, `VARIANT_GROUPED`, `GROUP_INDEX`, `GROUP_DATA`, `ELE_PLACEHOLDER`, `META_PLACEHOLDER`, etc., notably expanding the metadata control surface.

### 8. 图元类型差异 / Primitive Type Differences

- **中文**：外层 type 命名风格一致（全大写，个别含下划线）。主要差异：① V3 PCB 圆弧分 `ARC`（两点）与 `CARC`（圆心）两种外层类型，V4 统一为 `ARC` 并以 `arcType` 字段（`DOT` 两点 / `CENT` 中心）区分；② V3 PCB 数据类型中的 `ITEM_ORDER`、`CONNECT`、`PROP`、`REUSE_BLOCK` 未出现在 V4 的 `e-pcb-data-type` 枚举中（移除、更名或内嵌，V4 文档未说明）；③ V4 新增 `X_NET` / `X_NET_GROUP`（xNet 信号逻辑等长）、`D3_ATTRIBUTE`（3D 属性）等外层类型；④ 尺寸标注类型两者一致（`LENGTH` / `RADIUS` / `ANGLE`）。
- **English**: The outer-type naming style is unchanged (all caps, a few with underscores). Key differences: (1) V3 PCB arcs use two outer types, `ARC` (two-point) and `CARC` (center-based); V4 unifies them into a single `ARC` discriminated by the `arcType` field (`DOT` two-point / `CENT` center). (2) The V3 PCB types `ITEM_ORDER`, `CONNECT`, `PROP` and `REUSE_BLOCK` do not appear in V4's `e-pcb-data-type` enum (removed, renamed, or internalized — V4 docs do not say). (3) V4 adds outer types such as `X_NET` / `X_NET_GROUP` (xNet logical length matching) and `D3_ATTRIBUTE` (3D attributes). (4) Dimension types are identical in both (`LENGTH` / `RADIUS` / `ANGLE`).

### 9. 新增文档域：仿真与面板库 / New Domains: Simulation and Panel Library

- **中文**：V4 新增 **SIMULATION**（仿真页）与 **SIMULATION_SCH**（仿真原理图）两个文档域，复用原理图图元体系（BUS、WIRE、PART、SCH 图形图元等均有对应示例），并新增 `tdc-source-data`（仿真源数据）图元；同时补齐 **PANEL_LIB**（面板库）域及其图元/示例。META 行在 V4 按文档类型由 `tm-*` Schema 家族（`tm-sheet`、`tm-pcb`、`tm-schematic`、`tm-simulation` 等）分别定义，外层 type 仍为 `META`。
- **English**: V4 adds two new document domains — **SIMULATION** (simulation page) and **SIMULATION_SCH** (simulation schematic) — reusing the schematic primitive set (BUS, WIRE, PART and the SCH drawing primitives all have examples), plus a new `tdc-source-data` (simulation source data) primitive; the **PANEL_LIB** (panel library) domain is also completed with its primitives and examples. In V4 the META row is defined per document type by the `tm-*` schema family (`tm-sheet`, `tm-pcb`, `tm-schematic`, `tm-simulation`, …), while the outer type remains `META`.

### 10. 校验工具提示 / Validation Notes

- **中文**：本仓库 `validate.js` 已按 V4 类型全集建立校验映射；因 LINE / POLY / ARC / META 等外层名在不同文档域指向不同 Schema，校验时可用域前缀别名（`PCB_LINE`、`PANEL_POLY`、`PCB_META` 等）或小写 kebab Schema 名（`t-pcb-line`）精确指定目标 Schema。
- **English**: This repository's `validate.js` maps the full V4 type set; because outer names like LINE / POLY / ARC / META resolve to different schemas per document domain, use the domain-prefixed aliases (`PCB_LINE`, `PANEL_POLY`, `PCB_META`, …) or the lowercase kebab-case schema names (`t-pcb-line`) to target a schema precisely.

---

## 更新记录 / Update History

| 日期 / Date | 条目 / Entry | 说明 / Note |
|---|---|---|
| 2026-09-22 | V3 → V4 | 初版：基于 V3（2025.10.21）规范与本仓库 V4 格式资料对比总结 / Initial entry: comparison of the V3 (2025.10.21) spec against the V4 format in this repository |
| 2026-09-22 | V3 → V4（修订） | 依据刷新后的 SKILL.md：修正平票判优方向（client 大者胜）、补充 DOCHEAD 外层 ticket 与 16 位十六进制约束、细化删除语义易错点 / Revision per the refreshed SKILL.md: tie-break direction corrected (larger client wins), DOCHEAD outer ticket and 16-hex constraints added, deletion pitfalls refined |
