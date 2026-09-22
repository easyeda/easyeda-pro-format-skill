# 更新日志

本项目所有显著变更记录在此文件中。

格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，版本号遵循 [语义化版本 2.0.0](https://semver.org/lang/zh-CN/)。

## [1.2.1] - 2026-09-22

### 新增

- 新增 `format-updatelog.md`：中英双语的格式更新日志，首条为嘉立创EDA Pro V3（2025.10.21 规范）与 V4 格式的对比总结（文档头、docType、坐标单位、布尔/颜色编码、图元类型等 10 个主题）；后续格式大变更将补充新条目

## [1.2.0] - 2026-09-21

### 变更

- 完善双语 README 与 SKILL.md 的流程及格式说明（`bee647f`）
- 新增 Schema：`tmc-setting.json`、`twc-setting.json`，大幅扩充 `tng-setting.json`
- 更新 `types-index.md` 类型索引与 `validate.js` 类型映射
- 补充各领域文档层与图元层的详细描述，修正示例数据，新增 `t-pcb-x-nets-group` 等示例

## [1.1.0] - 2026-09-18

### 新增

- 新增 FONT 文档域：`documents/FONT.md` 与示例 `examples/FONT/tm-font.md`（`12a027e`）
- 扩充 SIMULATION、CONFIG 领域文档与示例（`e-setting-type` 等）
- 新增 `ty-axis-direction` 等 Schema

### 变更

- 全面刷新 `types-index.md`（中文名 → 类型名 → 文档路径索引）
- 大幅扩展 `validate.js` 校验逻辑
- 更新多个 JSON Schema（`t-sch-table`、`t-table-cell`、`tm-sch-component` 等）
- 修正 PCB / FOOTPRINT / SYMBOL 等领域大量示例数据的格式

## [1.0.1] - 2026-09-09

### 修复（`b2170ff`）

- 去重 7 个 Schema 中导致 Ajv 元校验失败的 `enum` / `required` 重复项：`t-panelize`、`e-panelize-version`、`version`、`ascii`、`tp-panel`、`tp-panel-lib`、`tp-simulation`
- `validate.js` 为 `ajv.compile()` 增加异常保护：Schema 非法时返回结构化错误而非崩溃
- `validate.js` 的 `TYPE_MAP` 补充缺失图元类型别名：`AUXLINE`、`FONT`、`PCB_*` / `PANEL_*` 域前缀、各文档类型的 META 行
- README 校验脚本示例恢复为与 SKILL.md 一致的用法

## [1.0.0] - 2026-09-09

### 首次发布（`b8b0efe`、`1ab893a`）

- 收录技能全量内容：`SKILL.md`、`types-index.md`、`documents/`（13 个领域）、`primitives/`、`examples/`、`schemas/`（252 个 JSON Schema）
- `validate.js` 格式验证脚本（基于 ajv），附 `package.json` 与 `.gitignore`
- 双语 README（简体中文 / English），MIT 许可证
