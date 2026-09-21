# TMDevice

> 返回 [DEVICE 图元索引](../../documents/DEVICE.md)

## 定义

器件 META 类型

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| title | `string` | ✓ | - | 名称 |
| source | `string` | ✓ | - | 来源：`<来源条目 uuid>\|<来源工程 uuid>` 两段式（工程库独有） 第 1 段是该条目在来源工程里的 uuid，第 2 段是**来源工程的 uuid** （真机形如 `"2eb7b89d891135ec\|bac6e37798284239bedae653a8874016"`）。 **工程内自建条目为空串**。 |
| tags | `string[]` | ✓ | - | 自定义分类 |
| images | `string[]` | ✓ | - | 图片链接 |
| attributes | `{ [key: string]: string }` | ✓ | - | 属性 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/tm-device.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `title`: 必需字段 |
| required | ERROR | `source`: 必需字段 |
| required | ERROR | `tags`: 必需字段 |
| required | ERROR | `images`: 必需字段 |
| required | ERROR | `attributes`: 必需字段 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/DEVICE/tm-device.md)

