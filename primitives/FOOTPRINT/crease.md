# TPcbCrease

> 返回 [FOOTPRINT 图元索引](../../documents/FOOTPRINT.md)

## 定义

侧面基准线（折痕）

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| partitionId | `string | null` |  | - | 所属分区编号，为null表示无分区 |
| groupId | `string` | ✓ | - | 分组编号, 没有则为 0 不分组，非 0 为组标志，相同组标志的为一组 |
| layerId | `number` | ✓ | - | 层编号 |
| locked | `boolean` | ✓ | - | 是否锁定 |
| zIndex | `number | null` | ✓ | - | Z 轴高度, null 为默认 |
| startX | `number` | ✓ | - | 起始 X |
| startY | `number` | ✓ | - | 起始 Y |
| endX | `number` | ✓ | - | 结束 X |
| endY | `number` | ✓ | - | 结束 Y |
| angle | `number` | ✓ | - | 折叠角度 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-pcb-crease.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `layerId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `startX`: 必需字段 |
| required | ERROR | `startY`: 必需字段 |
| required | ERROR | `endX`: 必需字段 |
| required | ERROR | `endY`: 必需字段 |
| required | ERROR | `angle`: 必需字段 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/FOOTPRINT/t-pcb-crease.md)

