# TPcbShellEntity

> 返回 [FOOTPRINT 图元索引](../../documents/FOOTPRINT.md)

## 定义

外壳实体区域

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| partitionId | `string | null` |  | - | 所属分区编号，为null表示无分区 |
| groupId | `string` | ✓ | - | 分组编号, 没有则为 0 不分组，非 0 为组标志，相同组标志的为一组 |
| layerId | `number` | ✓ | - | 层编号 |
| locked | `boolean` | ✓ | - | 是否锁定 |
| zIndex | `number | null` | ✓ | - | Z 轴高度, null 为默认 |
| type | `EEntityType` | ✓ | - | 类型 |
| entityBelong | `EEntityBelong` |  | - | 实体 - 归属 |
| slotOptions | `ESlotOption[]` |  | - | 挖槽 - 选项 |
| depth | `number` | ✓ | - | 深度 |
| strokeWidth | `number` | ✓ | - | 线宽 |
| path | `any[][]` | ✓ | - | 参考复杂多边形 |
| refs | `string[]` |  | - | 关联的图元编号 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-pcb-shell-entity.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `layerId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `type`: 必需字段 |
| required | ERROR | `depth`: 必需字段 |
| required | ERROR | `strokeWidth`: 必需字段 |
| required | ERROR | `path`: 必需字段 |
| enum | ERROR | `type`: 允许值: SLOT, ENTITY |
| enum | ERROR | `entityBelong`: 允许值: AUTO, UPPER_SHELLS, LOWER_SHELLS |
| enum | ERROR | `slotOptions`: 允许值: OUTLINE, SCREW_PILLAR, ENTITY |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/FOOTPRINT/t-pcb-shell-entity.md)

