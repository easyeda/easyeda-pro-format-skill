# TPcbFill

> 返回 [PCB 图元索引](../../documents/PCB.md)

## 定义

填充

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
| fillStyle | `EPcbFillStyle` | ✓ | - | 填充模式：0 实心填充 1 网格填充 2 内电层填充 |
| path | `any[]` | ✓ | - | * 对于单次画的多边形，这里只有一个单多边形
* 对于组合模式画的多边形，这里才有多个单多边形 |
| isBridgingCopper | `boolean` |  | - | 是否是桥接铜 |
| networkList | `string[]` |  | - | 桥接网络 |
| refs | `string[]` |  | - | 关联的图元编号 |
| specialColor | `string` |  | pattern: ^$|^#[0-9A-Fa-f]{6}$ | 特殊颜色 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-pcb-fill.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `layerId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `netName`: 必需字段 |
| required | ERROR | `width`: 必需字段 |
| required | ERROR | `fillStyle`: 必需字段 |
| required | ERROR | `path`: 必需字段 |
| enum | ERROR | `fillStyle`: 允许值: SOLID, GRID, PLANE |
| pattern | ERROR | `specialColor`: 匹配模式: ^$|^#[0-9A-Fa-f]{6}$ |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PCB/t-pcb-fill.md)

