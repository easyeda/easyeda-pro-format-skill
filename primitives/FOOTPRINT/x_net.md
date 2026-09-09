# TPcbXNets

> 返回 [FOOTPRINT 图元索引](../../documents/FOOTPRINT.md)

## 定义

组内的 xNet

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| xNetsGroup | `string` | ✓ | - | xNet 组 id |
| name | `string` | ✓ | - | xNet名称 |
| netLengthPhysic | `string` | ✓ | - | 网络长度规则  --- 对应具体xNet规则的 |
| netLengthTolerancePhysics | `string` | ✓ | - | 网络长度公差规则  --- 对应具体xNet规则的 |
| targetNet | `string` | ✓ | - | 目标网络 |
| length | `number` | ✓ | - | xNet 路径长度 |
| xNet | `{
		/** 起点 */
		start: TPcbXNetNode;
		/** 终点 */
		end: TPcbXNetNode;
		/** 所有联通节点顺序<焊盘、过孔、器件> */
		nodes: TPcbXNetNode[];
	}` | ✓ | - | xNet的连通路径 |

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

