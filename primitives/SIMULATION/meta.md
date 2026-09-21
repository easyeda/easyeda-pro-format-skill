# TMSimulation

> 返回 [SIMULATION 图元索引](../../documents/SIMULATION.md)

## 定义

仿真页 META 类型

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| docType | `number` | ✓ | - | 文档类型（取值来自 `lc-editor-common` 的 `DOCTYPE`） 仿真页可用子集： - `8` NGSPICE 仿真 NGSPICE 图页 - `9` SIMULIDE 仿真 SIMULIDE 图页 ⚠️ 仿真页与符号（`TMSymbol.docType`）**各自可用的子集不同**，不要互相套用。 |
| simSchematic | `string` | ✓ | - | 所属仿真原理图 |
| title | `string` | ✓ | - | 文档名称 |
| source | `string` | ✓ | - | 来源：`<来源条目 uuid>\|<来源工程 uuid>` 两段式（工程库独有） 第 2 段是**来源工程的 uuid**（不是库内路径），**工程内自建条目为空串**。 |
| zIndex | `number \| null` | ✓ | - | 排序大小：**可以是 `null`**（`null` 表示「未设置」，是正常取值而非缺字段） ⚠️ **写侧差异**：原理图 / 仿真原理图 / PCB / 面板写盘时对 0 或缺省一律写 `null` （`zIndex: data.zIndex \|\| null`）；只有原理图页与仿真页是原样透传。 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/tm-simulation.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `docType`: 必需字段 |
| required | ERROR | `simSchematic`: 必需字段 |
| required | ERROR | `title`: 必需字段 |
| required | ERROR | `source`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/SIMULATION/tm-simulation.md)

