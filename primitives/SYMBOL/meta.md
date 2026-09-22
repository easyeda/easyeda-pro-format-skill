# TMSymbol

> 返回 [SYMBOL 图元索引](../../documents/SYMBOL.md)

## 定义

符号 META 类型

符号文档（`SYMBOL`）的 META 行，一行一条（`type:"META"`）：符号库条目的元数据
（名称、库描述、分类标签、来源），外加 `docType` 说明**这是哪一类符号**——
元件 / 复用模块 / 网络标识 / 网络端口 / 图纸符号 / 无电气符号 / 短接符。

符号文档的 META 行 id 是**固定单例名** `META`（属**固定单例 id**，见 [TSingletonElementId](../REFERENCE/t-singleton-element-id.md)）。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| title | `string` | ✓ | - | 名称 |
| description | `string` | ✓ | - | 库描述 |
| tags | `string[]` | ✓ | - | 自定义分类 |
| source | `string` | ✓ | - | 来源：`<来源条目 uuid>\|<来源工程 uuid>` 两段式（工程库独有） 第 2 段是**来源工程的 uuid**（不是库内路径），**工程内自建条目为空串**。 读取端拿它去哪查：按 `\|` 切开成 `[条目 uuid, 库标识]`，再用第 2 段当 **`path`（库标识）** 去那个库里按第 1 段取条目。 |
| docType | `number` | ✓ | - | 库类型（取值来自 `lc-editor-common` 的 `DOCTYPE`） 符号可用子集： - `2` PART 元件 - `17` BLOCK_SYMBOL 复用模块（块符号） - `18` NETFLAG 网络标识 - `19` NETPORT 网络端口 - `20` SHEET_SYMBOL 图纸符号 - `21` NONEELEC_SYMBOL 无电气符号 - `22` SHORT_SYMBOL 短接符 ⚠️ 符号与仿真页（`TMSimulation.docType`）**各自可用的子集不同**，不要互相套用。 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/tm-symbol.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `title`: 必需字段 |
| required | ERROR | `description`: 必需字段 |
| required | ERROR | `tags`: 必需字段 |
| required | ERROR | `source`: 必需字段 |
| required | ERROR | `docType`: 必需字段 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/SYMBOL/tm-symbol.md)

