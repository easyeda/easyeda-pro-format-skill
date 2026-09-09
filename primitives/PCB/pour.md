# TPcbPour

> 返回 [PCB 图元索引](../../documents/PCB.md)

## 定义

覆铜边框

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| partitionId | `string | null` |  | - | 所属分区编号，为null表示无分区 |
| groupId | `string` | ✓ | - | 分组编号, 没有则为 0 不分组，非 0 为组标志，相同组标志的为一组 |
| layerId | `number` | ✓ | - | 层编号 |
| locked | `boolean` | ✓ | - | 是否锁定 |
| zIndex | `number | null` | ✓ | - | Z 轴高度, null 为默认 |
| netName | `string` | ✓ | - | NET，网络名称 |
| width | `number` | ✓ | - | 线宽 |
| name | `string` | ✓ | - | 覆铜名称 |
| order | `number` | ✓ | - | 覆铜优先级 |
| path | `any[][]` | ✓ | - | 请参考复杂多边形章节 |
| pourType | `TPourDef` | ✓ | - | 请参考覆铜类型 |
| keepIsland | `boolean` | ✓ | - | 是否保留孤岛 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-pcb-pour.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `layerId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `netName`: 必需字段 |
| required | ERROR | `width`: 必需字段 |
| required | ERROR | `name`: 必需字段 |
| required | ERROR | `order`: 必需字段 |
| required | ERROR | `path`: 必需字段 |
| required | ERROR | `pourType`: 必需字段 |
| required | ERROR | `keepIsland`: 必需字段 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PCB/t-pcb-pour.md)

