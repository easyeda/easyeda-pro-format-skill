# TPartition

> 返回 [PCB 图元索引](../../documents/PCB.md)

## 定义

分区

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| name | `string` | ✓ | - | 分区名称 |
| fileUuid | `string` | ✓ | - | 子图 UUID |
| path | `any[][]` | ✓ | - | 分区形状 - 复杂多边形 |

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

→ [查看示例](../../examples/PCB/t-partition.md)

