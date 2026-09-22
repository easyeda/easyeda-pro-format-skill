# TPcbBoard

> 返回 [FOOTPRINT 图元索引](../../documents/FOOTPRINT.md)

## 定义

板子（板框）

PCB / 封装域里**整块板的外形**，一行一条（`type:"BOARD"`）：
它给出板框轮廓，也就是「这块板长什么样」。

⚠️ 它是本域少见的**固定单例**图元：id 写死成 `"BOARD"`，一份文档里**只有一条**
（这类 id 的写法见 [TSingletonElementId](../REFERENCE/t-singleton-element-id.md)）。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| path | [TPcbComplexPolygon](../REFERENCE/t-pcb-complex-polygon.md) | ✓ | - | 板框外形（**复杂多边形**，即 [TPcbComplexPolygon](../REFERENCE/t-pcb-complex-polygon.md)）：外层数组的每个元素是一条子路径， 每个元素本身又是一个单多边形（[TPcbSinglePolygon](../REFERENCE/t-pcb-single-polygon.md)）。 读法为 **【外轮廓 + 内洞】**，且**只取首个子路径** （解码器的 `finish()` 会执行 `path = path[0]`，后续内洞当前不会被使用）。 本图元的 id 是**固定单例名** `"BOARD"`（这类**固定单例 id** 见 [TSingletonElementId](../REFERENCE/t-singleton-element-id.md)）。 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-pcb-board.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `path`: 必需字段 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/FOOTPRINT/t-pcb-board.md)

