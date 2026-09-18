# TPcbTeardrop

> 返回 [PCB 图元索引](../../documents/PCB.md)

## 定义

泪滴

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| groupId | `string` | ✓ | - | 分组编号, 没有则为 0 不分组，非 0 为组标志，相同组标志的为一组 |
| locked | `boolean` | ✓ | - | 是否锁定 |
| layerId | `number` | ✓ | - | 层编号 |
| partitionId | `string \| null` |  | - | 所属分区编号，为null表示无分区 |
| netName | `string` | ✓ | - | NET，网络名称 |
| path | `any[]` | ✓ | - | 简单多边形 |
| refs | `string[]` |  | - | 关联的图元编号 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-pcb-teardrop.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `layerId`: 必需字段 |
| required | ERROR | `netName`: 必需字段 |
| required | ERROR | `path`: 必需字段 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PCB/t-pcb-teardrop.md)

