# TMSymbol

> 返回 [SYMBOL 图元索引](../../documents/SYMBOL.md)

## 定义

符号 META 类型

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| title | `string` | ✓ | - | 名称 |
| description | `string` | ✓ | - | 库描述 |
| tags | `string[]` | ✓ | - | 自定义分类 |
| source | `string` | ✓ | - | 来源：`<来源条目 uuid>\|<来源工程 uuid>` 两段式（工程库独有） 第 2 段是**来源工程的 uuid**（不是库内路径），**工程内自建条目为空串**。 |
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

