# TLayerFill

> 返回 [PCB 图元索引](../../documents/PCB.md)

## 定义

层填充

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| fill | `StrictOmit<TPcbFill & { id: string }, 'layerId' \| 'fillStyle'>[]` | ✓ | - | 本层的内电层填充列表：每一项是一块填充多边形（字段表同 TPcbFill，另多一个 `id`）。 ⚠️ **盘上每一项仍然带 `layerId` 与 `fillStyle`**：写盘的 key 表里就有这两个键 （编码 keys 含 `layerId` 与 `fillStyle`），值取自该填充自身的所属层与其类型 （内电层填充恒为 `"PLANE"`）。 类型上的 `StrictOmit` 只是**输入侧的写法**（喂数据时这两项由所属层统一决定、不必逐项填）， **不要据此认为盘上没有它们**。 |

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

