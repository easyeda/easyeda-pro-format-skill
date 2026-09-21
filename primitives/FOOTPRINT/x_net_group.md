# TPcbXNetsGroup

> 返回 [FOOTPRINT 图元索引](../../documents/FOOTPRINT.md)

## 定义

xNet 组

【联动增删·必须成组操作】X_NET_GROUP 与其组内的 X_NET 是**同一生命周期**：
**新增组时必须一并写出组内的 X_NET；删除 X_NET_GROUP 时必须把组内所有 X_NET 一并删除**
（组内 xNet 清空后才能删组），否则留下悬空的 X_NET。

> `@docType` / `@primitiveType` 写在非导出类型 `TBaseXNetsGroup` 上，对外暴露的内存类型是 `TPcbXNetsGroup`。本页的字段与 JSON Schema 描述的是**线格式**（以标签所在类型 `TBaseXNetsGroup` 为准）。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| netLengthPhysic | `string` | ✓ | - | 网络长度规则 --- 对应组的 |
| netLengthTolerancePhysics | `string` | ✓ | - | 网络长度公差规则 --- 对应组的 |
| targetNet | `string` | ✓ | - | 目标网络 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-base-x-nets-group.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `netLengthPhysic`: 必需字段 |
| required | ERROR | `netLengthTolerancePhysics`: 必需字段 |
| required | ERROR | `targetNet`: 必需字段 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/FOOTPRINT/t-pcb-x-nets-group.md)

