# TNetClass

> 返回 [SIMULATION_SCH 图元索引](../../documents/SIMULATION_SCH.md)

## 定义

网络类

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| name | `string` | ✓ | - | 名称 |
| nets | `string[]` | ✓ | - | 网络组 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-net-class.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `name`: 必需字段 |
| required | ERROR | `nets`: 必需字段 |

### 引用关联

以下字段引用其他图元的 id：`nets`

nets 字段包含多个网络名称

## 示例

→ [查看示例](../../examples/SIMULATION_SCH/t-net-class.md)

