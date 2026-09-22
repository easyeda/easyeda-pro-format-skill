# TMSimulation

> 返回 [SIMULATION 图元索引](../../documents/SIMULATION.md)

## 定义

仿真页 META 类型

仿真页文档（`SIMULATION`）的 META 行，一行一条（`type:"META"`）：文档名、来源、排序，
外加 `docType`（NGSPICE / SIMULIDE 的仿真器类型）与 `simSchematic`（**所属仿真原理图**）。
它描述的是挂在那份仿真原理图下的一个具体分析图页。

⚠️ 本类型的 `zIndex` 是**原样透传**，不像其它文档那样把 0 / 缺省改写成 `null`。

仿真页文档的 META 行 id 是**固定单例名** `META`（属**固定单例 id**，见 [TSingletonElementId](../REFERENCE/t-singleton-element-id.md)）。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| docType | `number` | ✓ | - | 文档类型（取值来自 `lc-editor-common` 的 `DOCTYPE`） 仿真页可用子集： - `8` NGSPICE 仿真 NGSPICE 图页 - `9` SIMULIDE 仿真 SIMULIDE 图页 ⚠️ 仿真页与符号（`TMSymbol.docType`）**各自可用的子集不同**，不要互相套用。 |
| simSchematic | [TDocUuid](../REFERENCE/t-doc-uuid.md) | ✓ | - | 所属仿真原理图 |
| title | `string` | ✓ | - | 文档名称 |
| source | `string` | ✓ | - | 来源：`<来源条目 uuid>\|<来源工程 uuid>` 两段式（工程库独有） 第 2 段是**来源工程的 uuid**（不是库内路径），**工程内自建条目为空串**。 读取端拿它去哪查：按 `\|` 切开成 `[条目 uuid, 库标识]`，再用第 2 段当 **`path`（库标识）** 去那个库里按第 1 段取条目。 |
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

