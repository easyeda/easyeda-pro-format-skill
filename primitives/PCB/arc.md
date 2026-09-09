# TPcbArc

> 返回 [PCB 图元索引](../../documents/PCB.md)

## 定义

圆弧线

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| partitionId | `string | null` |  | - | 所属分区编号，为null表示无分区 |
| groupId | `string` | ✓ | - | 分组编号, 没有则为 0 不分组，非 0 为组标志，相同组标志的为一组 |
| layerId | `number` | ✓ | - | 层编号 |
| locked | `boolean` | ✓ | - | 是否锁定 |
| zIndex | `number | null` | ✓ | - | Z 轴高度, null 为默认 |
| netName | `string` | ✓ | - | NET，网络名称 |
| startX | `number` | ✓ | - | 开始 X |
| startY | `number` | ✓ | - | 开始 X |
| endX | `number` | ✓ | - | 结束 X |
| endY | `number` | ✓ | - | 结束 Y |
| angle | `number` | ✓ | - | 圆弧角，逆时针正，顺时针负 |
| width | `number` | ✓ | - | 线宽 |
| arcType | `EArcType` | ✓ | - | 圆弧类型：0 两点圆弧，1 中心圆弧 |
| specialColor | `string` |  | pattern: ^$|^#[0-9A-Fa-f]{6}$ | 特殊颜色 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-pcb-arc.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `layerId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `netName`: 必需字段 |
| required | ERROR | `startX`: 必需字段 |
| required | ERROR | `startY`: 必需字段 |
| required | ERROR | `endX`: 必需字段 |
| required | ERROR | `endY`: 必需字段 |
| required | ERROR | `angle`: 必需字段 |
| required | ERROR | `width`: 必需字段 |
| required | ERROR | `arcType`: 必需字段 |
| enum | ERROR | `arcType`: 允许值: DOT, CENT |
| pattern | ERROR | `specialColor`: 匹配模式: ^$|^#[0-9A-Fa-f]{6}$ |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PCB/t-pcb-arc.md)

