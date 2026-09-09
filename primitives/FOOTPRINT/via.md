# TPcbVia

> 返回 [FOOTPRINT 图元索引](../../documents/FOOTPRINT.md)

## 定义

过孔

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| netName | `string` | ✓ | - | NET，网络名称 |
| ruleName | `string` | ✓ | - | 过孔层类型：设计规则名称，定义过孔的开始层结束层 |
| centerX | `number` | ✓ | - | 坐标 X |
| centerY | `number` | ✓ | - | 坐标 Y |
| holeDiameter | `number` | ✓ | - | 孔直径 |
| viaDiameter | `number` | ✓ | - | 焊盘直径 |
| viaType | `EViaType` | ✓ | - | 过孔类型 |
| topSolderExpansion | `number | null` | ✓ | - | 顶层阻焊扩展：null 为遵循规则 |
| bottomSolderExpansion | `number | null` | ✓ | - | 底层阻焊扩展：null 为遵循规则 |
| unusedInnerLayers | `number[]` | ✓ | - | 隐藏焊盘层（可选）：被隐藏焊盘的层数组 |
| propagationDelay | `number` | ✓ | - | 传播延迟，3.3 新增 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-pcb-via.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `netName`: 必需字段 |
| required | ERROR | `ruleName`: 必需字段 |
| required | ERROR | `centerX`: 必需字段 |
| required | ERROR | `centerY`: 必需字段 |
| required | ERROR | `holeDiameter`: 必需字段 |
| required | ERROR | `viaDiameter`: 必需字段 |
| required | ERROR | `viaType`: 必需字段 |
| required | ERROR | `topSolderExpansion`: 必需字段 |
| required | ERROR | `bottomSolderExpansion`: 必需字段 |
| required | ERROR | `unusedInnerLayers`: 必需字段 |
| required | ERROR | `propagationDelay`: 必需字段 |
| enum | ERROR | `viaType`: 允许值: NORMAL, BLIND, SUTURE |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/FOOTPRINT/t-pcb-via.md)

