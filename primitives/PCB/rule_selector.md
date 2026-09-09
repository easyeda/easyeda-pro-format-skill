# TRuleSelector

> 返回 [PCB 图元索引](../../documents/PCB.md)

## 定义

规则选择器

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| ruleSelect | `(string | number | (string | number)[])[]` | ✓ | - | 选择器 |
| ruleOrder | `number` | ✓ | min: 0 | 优先级：数值越小，优先级越高 |
| ruleKeyValue | `{ [key in ERuleType]?: string | string[] }` | ✓ | - | 规则，Key 为 规则类，Value 为 规则名称，每个规则类下只能选择一个规则 |
| copperValue | `{ [ERuleType.COPPER]?: string }` | ✓ | - | 铺铜规则(选择值) |
| innerPlaneValue | `{ [ERuleType.PLANE]?: string }` | ✓ | - | 内电层规则(选择值) |
| parent | `(string | number | (string | number)[])[]` |  | - | 父选择器 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-rule-selector.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `ruleSelect`: 必需字段 |
| required | ERROR | `ruleOrder`: 必需字段 |
| required | ERROR | `ruleKeyValue`: 必需字段 |
| required | ERROR | `copperValue`: 必需字段 |
| required | ERROR | `innerPlaneValue`: 必需字段 |
| minimum | ERROR | `ruleOrder`: 最小值: 0 |
| enum | ERROR | `ruleKeyValue`: 允许值: SAFE, OTHER, CREEPAGE, TRACK, BLIND, RADIUS, DIFFER_ENTAIL, NET_LENGTH, NET_LENGTH_TOLERANCE, HEIGHT, PLANE, COPPER, PASTE, SOLDER, AUTO_ROUTER, DFM_ACUTE_ANGLE, DFM_HOLE_FALLS_ON_PAD, DFM_BARE_TRACK_ENDS, DFM_PAD_RING_DEFECT, DFM_TRACK_NECKDOWN, DFM_SHORT_CIRCUIT_DETECT, DFM_MIN_COPPER_WIDTH, DFM_DISCONNECTED_VIAS, DFM_MIN_HOLE_SIZE, DFM_NPTH_2_COPPER, DFM_SOLDER_MASK_BRIDGE, DFM_SMASK_OPENING_COPPER, DFM_PAD_NEGATIVE_OPENING, DFM_SILKSCREEN_2_HOLE, DFM_SILKSCREEN_2_PAD, DFM_SILKSCREEN_LINE_WIDTH |
| enum | ERROR | `copperValue`: 允许值: SAFE, OTHER, CREEPAGE, TRACK, BLIND, RADIUS, DIFFER_ENTAIL, NET_LENGTH, NET_LENGTH_TOLERANCE, HEIGHT, PLANE, COPPER, PASTE, SOLDER, AUTO_ROUTER, DFM_ACUTE_ANGLE, DFM_HOLE_FALLS_ON_PAD, DFM_BARE_TRACK_ENDS, DFM_PAD_RING_DEFECT, DFM_TRACK_NECKDOWN, DFM_SHORT_CIRCUIT_DETECT, DFM_MIN_COPPER_WIDTH, DFM_DISCONNECTED_VIAS, DFM_MIN_HOLE_SIZE, DFM_NPTH_2_COPPER, DFM_SOLDER_MASK_BRIDGE, DFM_SMASK_OPENING_COPPER, DFM_PAD_NEGATIVE_OPENING, DFM_SILKSCREEN_2_HOLE, DFM_SILKSCREEN_2_PAD, DFM_SILKSCREEN_LINE_WIDTH |
| enum | ERROR | `innerPlaneValue`: 允许值: SAFE, OTHER, CREEPAGE, TRACK, BLIND, RADIUS, DIFFER_ENTAIL, NET_LENGTH, NET_LENGTH_TOLERANCE, HEIGHT, PLANE, COPPER, PASTE, SOLDER, AUTO_ROUTER, DFM_ACUTE_ANGLE, DFM_HOLE_FALLS_ON_PAD, DFM_BARE_TRACK_ENDS, DFM_PAD_RING_DEFECT, DFM_TRACK_NECKDOWN, DFM_SHORT_CIRCUIT_DETECT, DFM_MIN_COPPER_WIDTH, DFM_DISCONNECTED_VIAS, DFM_MIN_HOLE_SIZE, DFM_NPTH_2_COPPER, DFM_SOLDER_MASK_BRIDGE, DFM_SMASK_OPENING_COPPER, DFM_PAD_NEGATIVE_OPENING, DFM_SILKSCREEN_2_HOLE, DFM_SILKSCREEN_2_PAD, DFM_SILKSCREEN_LINE_WIDTH |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PCB/t-rule-selector.md)

