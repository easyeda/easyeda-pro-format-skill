# TMFootprint

> 返回 [FOOTPRINT 图元索引](../../documents/FOOTPRINT.md)

## 定义

封装 META 类型

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| title | `string` | ✓ | - | 名称 |
| description | `string` | ✓ | - | 库描述 |
| tags | `string[]` | ✓ | - | 自定义分类 |
| source | `string` | ✓ | - | 来源：`<来源条目 uuid>\|<来源工程 uuid>` 两段式（工程库独有） 第 2 段是**来源工程的 uuid**（不是库内路径），**工程内自建条目为空串**。 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/tm-footprint.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `title`: 必需字段 |
| required | ERROR | `description`: 必需字段 |
| required | ERROR | `tags`: 必需字段 |
| required | ERROR | `source`: 必需字段 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/FOOTPRINT/tm-footprint.md)

