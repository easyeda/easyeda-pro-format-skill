# TMPanelLib

> 返回 [PANEL_LIB 图元索引](../../documents/PANEL_LIB.md)

## 定义

面板库 META 类型

面板库文档（`PANEL_LIB`）的 META 行，一行一条（`type:"META"`）：只承载库条目元数据
（名称、库描述、分类标签），**没有 `source`**——面板库条目不记来源。

面板库文档的 META 行 id 是**固定单例名** `META`（属**固定单例 id**，见 [TSingletonElementId](../REFERENCE/t-singleton-element-id.md)）。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| title | `string` | ✓ | - | 名称 |
| description | `string` | ✓ | - | 库描述 |
| tags | `string[]` | ✓ | - | 自定义分类 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/tm-panel-lib.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `title`: 必需字段 |
| required | ERROR | `description`: 必需字段 |
| required | ERROR | `tags`: 必需字段 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PANEL_LIB/tm-panel-lib.md)

