# TPcbXNets

> 返回 [FOOTPRINT 图元索引](../../documents/FOOTPRINT.md)

## 定义

组内的 xNet

xNet（旧名 xSignals）是为**逻辑等长**服务的概念：把被串接元件（电阻 / 电容等）
分割开的若干段网络当成**一条逻辑通路**来看待，从而能对它整体做长度约束。

本类型描述**一条** xNet，一行一条（`type:"X_NET"`）：它的连通路径（`xNet`，
含起点、终点与途经的全部节点）、长度规则 `netLengthPhysic` /
公差规则 `netLengthTolerancePhysics`，以及目标网络 `targetNet`。

⚠️ 它**不能脱离组存在**：`xNetsGroup` 必须指向一个已存在的 xNet 组
（见 [TPcbXNetsGroup](./x_net_group.md)），增删要成组操作。

id 由编辑器生成（随机 16 位十六进制），形态见 [TElementId](../REFERENCE/t-element-id.md)；
本类型的 `xNetsGroup` 所引用的 `X_NET_GROUP` 则是**键式 id**
（盘上是数组串 `["X_NET_GROUP", 组名]`，见 [TKeyedElementId](../REFERENCE/t-keyed-element-id.md)）。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| xNetsGroup | `string` | ✓ | - | 所属 xNet 组的组名：必须指向一个已存在的 X_NET_GROUP 【联动增删·必须成组操作】X_NET 不能脱离组存在—— **新增 X_NET 时必须确保其所属的 X_NET_GROUP 已写出； 删除 X_NET_GROUP 时必须把组内所有 X_NET 一并删除**（见 X_NET_GROUP 的说明）。 |
| name | `string` | ✓ | - | xNet名称 |
| netLengthPhysic | `string` | ✓ | - | 网络长度规则 --- 对应具体xNet规则的 |
| netLengthTolerancePhysics | `string` | ✓ | - | 网络长度公差规则 --- 对应具体xNet规则的 |
| targetNet | `string` | ✓ | - | 目标网络 |
| length | `number` | ✓ | - | xNet 路径长度。 ⚠️ **口径与同文件其它长度字段不同**：写读两腿都**原样搬运、不做 ×10 / ÷10**， 所以盘上这个值是**内部单位**（1 单位 = 10 mil = 0.01 inch = 0.254 mm）， 消费端展示时才 `* 10` 当 mil 用 —— **别按本文件默认的 mil 口径读它**。 例：盘上 `1000` = 10000 mil = 10 inch。 |
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

→ [查看示例](../../examples/FOOTPRINT/t-pcb-x-nets.md)

