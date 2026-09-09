# TRule

> 返回 [SCH 图元索引](../../documents/SCH.md)

## 定义

设计规则

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| ruleType | `ERuleType` | ✓ | - | 规则类型：EDA 自己决定 |
| ruleName | `string` | ✓ | - | 规则名称 |
| ruleState | `ERuleStatus` | ✓ | - | 规则状态：0 普通规则 1 默认规则 2 停用规则 |
| ruleContext | `TRuleContext[ERuleType]` | ✓ | - | 规则内容：EDA 自己决定 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-rule.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `ruleType`: 必需字段 |
| required | ERROR | `ruleName`: 必需字段 |
| required | ERROR | `ruleState`: 必需字段 |
| required | ERROR | `ruleContext`: 必需字段 |
| enum | ERROR | `ruleType`: 允许值: SAFE, OTHER, CREEPAGE, TRACK, BLIND, RADIUS, DIFFER_ENTAIL, NET_LENGTH, NET_LENGTH_TOLERANCE, HEIGHT, PLANE, COPPER, PASTE, SOLDER, AUTO_ROUTER, DFM_ACUTE_ANGLE, DFM_HOLE_FALLS_ON_PAD, DFM_BARE_TRACK_ENDS, DFM_PAD_RING_DEFECT, DFM_TRACK_NECKDOWN, DFM_SHORT_CIRCUIT_DETECT, DFM_MIN_COPPER_WIDTH, DFM_DISCONNECTED_VIAS, DFM_MIN_HOLE_SIZE, DFM_NPTH_2_COPPER, DFM_SOLDER_MASK_BRIDGE, DFM_SMASK_OPENING_COPPER, DFM_PAD_NEGATIVE_OPENING, DFM_SILKSCREEN_2_HOLE, DFM_SILKSCREEN_2_PAD, DFM_SILKSCREEN_LINE_WIDTH |
| enum | ERROR | `ruleState`: 允许值: NORMAL, DEFAULT |
| enum | ERROR | `ruleContext`: 允许值: SAFE, OTHER, CREEPAGE, TRACK, BLIND, RADIUS, DIFFER_ENTAIL, NET_LENGTH, NET_LENGTH_TOLERANCE, HEIGHT, PLANE, COPPER, PASTE, SOLDER, AUTO_ROUTER, DFM_ACUTE_ANGLE, DFM_HOLE_FALLS_ON_PAD, DFM_BARE_TRACK_ENDS, DFM_PAD_RING_DEFECT, DFM_TRACK_NECKDOWN, DFM_SHORT_CIRCUIT_DETECT, DFM_MIN_COPPER_WIDTH, DFM_DISCONNECTED_VIAS, DFM_MIN_HOLE_SIZE, DFM_NPTH_2_COPPER, DFM_SOLDER_MASK_BRIDGE, DFM_SMASK_OPENING_COPPER, DFM_PAD_NEGATIVE_OPENING, DFM_SILKSCREEN_2_HOLE, DFM_SILKSCREEN_2_PAD, DFM_SILKSCREEN_LINE_WIDTH |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/SCH/t-rule.md)

