# TPartition

> 返回 [FOOTPRINT 图元索引](../../documents/FOOTPRINT.md)

## 定义

分区

PCB 域的**分区**，一行一条（`type:"PARTITION"`）：把一块 PCB 划分为若干区域，
每个区域对应一份**独立的子 PCB 文档**，用来按模块拆分设计 ——
子图可以单独打开编辑，也可以再合回主图。

图元通过各自的 `partitionId` 认领所属分区；分区这一侧则靠 `fileUuid` 认领子图
（子文档的文档头 `uuid` 与它相等时，才说明「本图是那个分区的子图」）。

id 由编辑器生成（随机 16 位十六进制），形态见 [TElementId](../REFERENCE/t-element-id.md)。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| name | `string` | ✓ | - | 分区名称 |
| fileUuid | [TDocUuid](../REFERENCE/t-doc-uuid.md) | ✓ | - | 子图 UUID：**= 该分区对应的那个子 PCB 文档的文档头 `uuid`**。 分区时现生成一个 uuid 去建子文档，再把它写到这里；读取端靠它**认领分区**—— **当本文档的文档头 `uuid` 等于某个 `PARTITION.fileUuid` 时，才算「本图是那个分区的子图」**。 【联动增删】分区与子图成对存在：**删除分区时会连带删除对应的子 PCB 文档** （需用户确认）；反过来子 PCB 文档被删除时，分区保留、本字段被清空并重传。 |
| path | [TPcbComplexPolygon](../REFERENCE/t-pcb-complex-polygon.md) | ✓ | - | 分区形状（**复杂多边形**，即 [TPcbComplexPolygon](../REFERENCE/t-pcb-complex-polygon.md)）：外层数组的每个元素是一条子路径， 每个元素本身又是一个单多边形（[TPcbSinglePolygon](../REFERENCE/t-pcb-single-polygon.md)）。 读法为 **【外轮廓 + 内洞】**，且**只取首个子路径** （解码器的 `finish()` 会执行 `path = path[0]`，后续内洞当前不会被使用）。 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-partition.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `name`: 必需字段 |
| required | ERROR | `fileUuid`: 必需字段 |
| required | ERROR | `path`: 必需字段 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/FOOTPRINT/t-partition.md)

