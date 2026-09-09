# TPcbTeardrop

> 返回 [FOOTPRINT 图元索引](../../documents/FOOTPRINT.md)

## 定义

泪滴

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| netName | `string` | ✓ | - | NET，网络名称 |
| path | `any[]` | ✓ | - | 简单多边形 |
| refs | `string[]` |  | - | 关联的图元编号 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-pcb-teardrop.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `netName`: 必需字段 |
| required | ERROR | `path`: 必需字段 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/FOOTPRINT/t-pcb-teardrop.md)

