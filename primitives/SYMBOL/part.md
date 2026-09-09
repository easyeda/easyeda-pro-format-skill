# TPart

> 返回 [SYMBOL 图元索引](../../documents/SYMBOL.md)

## 定义

部件

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| title | `string` | ✓ | - | 名称 |
| DeviceName | `{ uuid: string; name: string; source: string }` |  | - | 当前绑定的器件(目前为空用不上)，v4 新增 |
| FootprintName | `{ uuid: string; name: string; source: string }` |  | - | 当前绑定文本封装（uuid 可空），v4 新增 |
| Footprints | `{ uuid: string; name: string; source: string }[]` |  | - | 备选封装，v4 新增 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-part.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `title`: 必需字段 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/SYMBOL/t-part.md)

