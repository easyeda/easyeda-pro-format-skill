# TPcbXNets

> 返回 [PCB 图元索引](../../documents/PCB.md)

## 定义

组内的 xNet

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| xNetsGroup | `string` | ✓ | - | 所属 xNet 组的组名：必须指向一个已存在的 X_NET_GROUP 【联动增删·必须成组操作】X_NET 不能脱离组存在—— **新增 X_NET 时必须确保其所属的 X_NET_GROUP 已写出； 删除 X_NET_GROUP 时必须把组内所有 X_NET 一并删除**（见 X_NET_GROUP 的说明）。 |
| name | `string` | ✓ | - | xNet名称 |
| netLengthPhysic | `string` | ✓ | - | 网络长度规则 --- 对应具体xNet规则的 |
| netLengthTolerancePhysics | `string` | ✓ | - | 网络长度公差规则 --- 对应具体xNet规则的 |
| targetNet | `string` | ✓ | - | 目标网络 |
| length | `number` | ✓ | - | xNet 路径长度 |
| xNet | `{ start: TPcbXNetNode; end: TPcbXNetNode; nodes: TPcbXNetNode[] }` | ✓ | - | xNet的连通路径 |

## 对象字段成员

以下字段的类型是内联对象，成员定义如下：

### `xNet`

xNet的连通路径

| 成员 | 类型 | 必需 | 说明 |
|------|------|------|------|
| start | `TPcbXNetNode` | ✓ | 起点 |
| end | `TPcbXNetNode` | ✓ | 终点 |
| nodes | `TPcbXNetNode[]` | ✓ | 所有联通节点顺序<焊盘、过孔、器件> |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-pcb-x-nets.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `xNetsGroup`: 必需字段 |
| required | ERROR | `name`: 必需字段 |
| required | ERROR | `netLengthPhysic`: 必需字段 |
| required | ERROR | `netLengthTolerancePhysics`: 必需字段 |
| required | ERROR | `targetNet`: 必需字段 |
| required | ERROR | `length`: 必需字段 |
| required | ERROR | `xNet`: 必需字段 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PCB/t-pcb-x-nets.md)

