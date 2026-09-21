# TPreference

> 返回 [PCB 图元索引](../../documents/PCB.md)

## 定义

偏好

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| startTrackWidthFollowLast | `boolean` | ✓ | - | 起始布线是否跟随上次设置 |
| lastTrackWidth | `number` | ✓ | - | 上次布线宽度 |
| startViaSizeFollowLast | `boolean` | ✓ | - | 起始打孔尺寸是否跟随上次设置 |
| lastViaInnerDiameter | `number` | ✓ | - | 上次打孔内径 |
| lastViaDiameter | `number` | ✓ | - | 上次打孔外径 |
| snap | `boolean` | ✓ | - | 是否自动吸附 |
| routingMode | `ERoutingMode` | ✓ | - | 取值范围：NONE（无）、PUSH（推挤）、SURROUND（环绕）、OBSTRUCT（阻挡）、SURROUND&PUSH（环绕并推挤） |
| routingCorner | `ERoutingConner` | ✓ | - | 取值范围：L45（线条 45 度）、L90（线条 90 度）、L（线条自由角度）、R45（圆弧 45 度）、R90（圆弧 90 度）、R（圆弧自由角度） |
| removeLoop | `boolean` | ✓ | - | 布线是否自动移除回路 |
| rotatingObject | `boolean` | ✓ | - | 是否单对象旋转 |
| trackFollow | `boolean \| null` | ✓ | - | 导线是否跟随封装移动。 ⚠️ **真实数据里 `null` 是常态**（工程文件里 `"trackFollow":null` 出现数十次， `false` 只有个位数），`null` 表示未设置、按默认处理，所以类型放宽为可空。 |
| stretchTrackMinCorner | `number` | ✓ | - | 拉伸导线最小拐角比率（比线宽） |
| preferenceConfig | `string` | ✓ | - | 层堆叠偏好来源 |
| realTimeUpdateUnusedLayers | `boolean` | ✓ | - | 是否自动移除未使用焊盘 |
| unusedPadRange | `EUnusedPadRange` | ✓ | - | 取值范围：ALL（所有）、PAD（仅焊盘）、VIA（仅过孔） |
| pushVia | `EPushViaOptimization` | ✓ | - | 取值范围：OPTIMIZA_OPEN（开启）、OPTIMIZA_NONE（关闭） |
| pathOptimization4BePushed | `EPathOptimization` | ✓ | - | 取值范围：NONE（无）、SINGLE（单段）、ALL（整段） |
| currentPathOptimization4BePushed | `ECurrentPathOptimization` | ✓ | - | 取值范围：OPTIMIZA_STRONG（强优化）、OPTIMIZA_WEAK（弱优化）、OPTIMIZA_NONE（不优化） |
| removeCircuitsContainingVias | `boolean` | ✓ | - | 移除有过孔的回路 |
| removeAntenna | `boolean` | ✓ | - | 移除天线 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-preference.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `startTrackWidthFollowLast`: 必需字段 |
| required | ERROR | `lastTrackWidth`: 必需字段 |
| required | ERROR | `startViaSizeFollowLast`: 必需字段 |
| required | ERROR | `lastViaInnerDiameter`: 必需字段 |
| required | ERROR | `lastViaDiameter`: 必需字段 |
| required | ERROR | `snap`: 必需字段 |
| required | ERROR | `routingMode`: 必需字段 |
| required | ERROR | `routingCorner`: 必需字段 |
| required | ERROR | `removeLoop`: 必需字段 |
| required | ERROR | `rotatingObject`: 必需字段 |
| required | ERROR | `trackFollow`: 必需字段 |
| required | ERROR | `stretchTrackMinCorner`: 必需字段 |
| required | ERROR | `preferenceConfig`: 必需字段 |
| required | ERROR | `realTimeUpdateUnusedLayers`: 必需字段 |
| required | ERROR | `unusedPadRange`: 必需字段 |
| required | ERROR | `pushVia`: 必需字段 |
| required | ERROR | `pathOptimization4BePushed`: 必需字段 |
| required | ERROR | `currentPathOptimization4BePushed`: 必需字段 |
| required | ERROR | `removeCircuitsContainingVias`: 必需字段 |
| required | ERROR | `removeAntenna`: 必需字段 |
| enum | ERROR | `routingMode`: 允许值: NONE, PUSH, SURROUND, OBSTRUCT, SURROUND&PUSH |
| enum | ERROR | `routingCorner`: 允许值: L45, L90, L, R45, R90, R |
| enum | ERROR | `unusedPadRange`: 允许值: ALL, PAD, VIA |
| enum | ERROR | `pushVia`: 允许值: OPTIMIZA_OPEN, OPTIMIZA_NONE |
| enum | ERROR | `pathOptimization4BePushed`: 允许值: NONE, SINGLE, ALL |
| enum | ERROR | `currentPathOptimization4BePushed`: 允许值: OPTIMIZA_STRONG, OPTIMIZA_WEAK, OPTIMIZA_NONE |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PCB/t-preference.md)

