# TPcbPoly

> 返回 [PCB 图元索引](../../documents/PCB.md)

## 定义

折线

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
| path | `any[]` | ✓ | - | 请参考单多边形 |
| polyType | `EPolyType` | ✓ | - | 折线类型：0 普通 1 板框 |
| specialColor | `string` |  | pattern: ^$|^#[0-9A-Fa-f]{6}$ | 特殊颜色 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-pcb-poly.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `layerId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `netName`: 必需字段 |
| required | ERROR | `width`: 必需字段 |
| required | ERROR | `path`: 必需字段 |
| required | ERROR | `polyType`: 必需字段 |
| enum | ERROR | `polyType`: 允许值: NORMAL, BOARD_OUTLINE |
| pattern | ERROR | `specialColor`: 匹配模式: ^$|^#[0-9A-Fa-f]{6}$ |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PCB/t-pcb-poly.md)

