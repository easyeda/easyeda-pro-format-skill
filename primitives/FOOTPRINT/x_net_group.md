# TBaseXNetsGroup

> 返回 [FOOTPRINT 图元索引](../../documents/FOOTPRINT.md)

## 定义

xNet 组

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

→ [查看示例](../../examples/FOOTPRINT/t-base-x-nets-group.md)

