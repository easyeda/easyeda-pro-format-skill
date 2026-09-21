# TRule

> 返回 [PCB 图元索引](../../documents/PCB.md)

## 定义

设计规则

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| ruleType | `ERuleType` |  | - | 取值范围：SAFE（间距 - 安全间距）、OTHER（间距 - 其他间距）、CREEPAGE（间距 - 爬电间距）、TRACK（物理 - 导线）、BLIND（物理 - 盲埋孔）、RADIUS（物理 - 孔径）、DIFFER_ENTAIL（物理 - 差分对）、NET_LENGTH（物理 - 网络长度范围）、NET_LENGTH_TOLERANCE（物理 - 网络长度公差）、HEIGHT（物理 - 高度）、PLANE（平面 - 内电层）、COPPER（平面 - 铺铜）、PASTE（扩展 - 助焊）、SOLDER（扩展 - 阻焊）、AUTO_ROUTER（布线 - 自动布线）、DFM_ACUTE_ANGLE（制造-线路分析 - 锐角拐线）、DFM_HOLE_FALLS_ON_PAD（制造-线路分析 - 孔落在焊盘上）、DFM_BARE_TRACK_ENDS（制造-线路分析 - 裸线头）、DFM_PAD_RING_DEFECT（制造-线路分析 - 焊盘孔环）、DFM_TRACK_NECKDOWN（制造-线路分析 - 导线颈部收缩）、DFM_SHORT_CIRCUIT_DETECT（制造-线路分析 - 短路提示）、DFM_MIN_COPPER_WIDTH（制造-线路分析 - 最小铜箔宽度）、DFM_DISCONNECTED_VIAS（制造-钻孔分析 - 无连接过孔）、DFM_MIN_HOLE_SIZE（制造-钻孔分析 - 孔尺寸）、DFM_NPTH_2_COPPER（制造-钻孔分析 - NPTH孔到铜箔）、DFM_SOLDER_MASK_BRIDGE（制造-阻焊分析 - 阻焊桥）、DFM_SMASK_OPENING_COPPER（制造-阻焊分析 - 开窗露线）、DFM_PAD_NEGATIVE_OPENING（制造-阻焊分析 - 焊盘负开窗）、DFM_SILKSCREEN_2_HOLE（制造-丝印分析 - 丝印距孔）、DFM_SILKSCREEN_2_PAD（制造-丝印分析 - 丝印距焊盘）、DFM_SILKSCREEN_LINE_WIDTH（制造-丝印分析 - 丝印线条宽度） |
| ruleName | `string` |  | - | 规则名称：同 ruleType，写盘时移进行的 `id`，载荷里不含 |
| ruleState | `ERuleStatus` | ✓ | - | 取值范围：NORMAL（普通规则）、DEFAULT（默认规则） |
| ruleContext | `TRuleContext[ERuleType]` | ✓ | - | 规则内容：EDA 自己决定 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-rule.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `ruleState`: 必需字段 |
| required | ERROR | `ruleContext`: 必需字段 |
| enum | ERROR | `ruleType`: 允许值: SAFE, OTHER, CREEPAGE, TRACK, BLIND, RADIUS, DIFFER_ENTAIL, NET_LENGTH, NET_LENGTH_TOLERANCE, HEIGHT, PLANE, COPPER, PASTE, SOLDER, AUTO_ROUTER, DFM_ACUTE_ANGLE, DFM_HOLE_FALLS_ON_PAD, DFM_BARE_TRACK_ENDS, DFM_PAD_RING_DEFECT, DFM_TRACK_NECKDOWN, DFM_SHORT_CIRCUIT_DETECT, DFM_MIN_COPPER_WIDTH, DFM_DISCONNECTED_VIAS, DFM_MIN_HOLE_SIZE, DFM_NPTH_2_COPPER, DFM_SOLDER_MASK_BRIDGE, DFM_SMASK_OPENING_COPPER, DFM_PAD_NEGATIVE_OPENING, DFM_SILKSCREEN_2_HOLE, DFM_SILKSCREEN_2_PAD, DFM_SILKSCREEN_LINE_WIDTH |
| enum | ERROR | `ruleState`: 允许值: NORMAL, DEFAULT |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PCB/t-rule.md)

