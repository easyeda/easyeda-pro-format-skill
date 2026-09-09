# TLayerFill

> 返回 [PCB 图元索引](../../documents/PCB.md)

## 定义

层填充

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| fill | `StrictOmit<TPcbFill & { id: string }, 'layerId' | 'fillStyle'>[]` | ✓ | - |  |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-layer-fill.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `fill`: 必需字段 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PCB/t-layer-fill.md)

