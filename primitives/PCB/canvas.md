# TCanvas

> 返回 [PCB 图元索引](../../documents/PCB.md)

## 定义

画布配置

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| originX | `number` | ✓ | - | 画布原点 X（单位同本图元坐标口径，即 mil） |
| originY | `number` | ✓ | - | 画布原点 Y（单位同本图元坐标口径，即 mil） |
| unit | `string` | ✓ | enum: mm, mil | 显示单位。取值是**小写字面量 `mm` / `mil`**，其它值（含大写 `MM` / `MIL`）会导致 整条 CANVAS 被丢弃——解码端按小写比较，真机样本只有 `"mil"` / `"mm"`、无一大写。 **不要照枚举成员名写成大写。** |
| gridXSize | `number` | ✓ | - | 网格尺寸 X（mil；写盘 ×10、读盘 ÷10） |
| gridYSize | `number` | ✓ | - | 网格尺寸 Y（mil；写盘 ×10、读盘 ÷10） |
| snapXSize | `number` | ✓ | - | 栅格尺寸 X（mil；写盘 ×10、读盘 ÷10） |
| snapYSize | `number` | ✓ | - | 栅格尺寸 Y（mil；写盘 ×10、读盘 ÷10） |
| altSnapXSize | `number` | ✓ | - | Alt 栅格尺寸 X。 ⚠️ **口径与 `gridXSize` / `snapXSize` 不同**：它写读都**不做 ×10/÷10**， 单位是 `unit` 字段所指定的**显示单位**。**不要按上面几个字段的换算方式来算它。** ⚠️ **缺省时回退成该层 `gridXSize` ÷10 后的内部值**（取不到值时回退成 `gridXSize / 10`）， 与**显式赋值时用的原始盘值**口径**不一致**。**生成数据时请显式写上**，不要依赖缺省。 |
| altSnapYSize | `number` | ✓ | - | Alt 栅格尺寸 Y。口径同 `altSnapXSize`（不做 ×10/÷10，单位随 `unit`； **缺省时同样回退为 `gridYSize` ÷10 后的内部值**）。 |
| gridType | `EGridType` | ✓ | - | 取值范围：NONE（无）、GRID（网格）、OUTLETS（网点） |
| multiGridType | `EGridType` | ✓ | - | 取值范围：NONE（无）、GRID（网格）、OUTLETS（网点） |
| multiGridRatio | `number` | ✓ | - | 加粗网格倍数。 合法取值 ≥ 1；**小于 1 时会被强制成 5**（`getGridRatio` 兜底）。 负值或 NaN 会导致整条 CANVAS 被丢弃。 |
| highlightValue | `number` | ✓ | - | 高亮亮度值：**0 ~ 0.99 的比例**（不是百分比、不是 0~100）。 大于 0.99 会被夹到 0.99；默认 0.5。 |
| layerBrightness | `ELayerBrightness` | ✓ | - | 取值范围：NORMAL（正常亮度）、INACTIVE_GRAY（非激活层置灰）、INACTIVE_HIDDEN（非激活层隐藏） |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-canvas.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `originX`: 必需字段 |
| required | ERROR | `originY`: 必需字段 |
| required | ERROR | `unit`: 必需字段 |
| required | ERROR | `gridXSize`: 必需字段 |
| required | ERROR | `gridYSize`: 必需字段 |
| required | ERROR | `snapXSize`: 必需字段 |
| required | ERROR | `snapYSize`: 必需字段 |
| required | ERROR | `altSnapXSize`: 必需字段 |
| required | ERROR | `altSnapYSize`: 必需字段 |
| required | ERROR | `gridType`: 必需字段 |
| required | ERROR | `multiGridType`: 必需字段 |
| required | ERROR | `multiGridRatio`: 必需字段 |
| required | ERROR | `highlightValue`: 必需字段 |
| required | ERROR | `layerBrightness`: 必需字段 |
| enum | ERROR | `unit`: 允许值: mm, mil |
| enum | ERROR | `gridType`: 允许值: NONE, GRID, OUTLETS |
| enum | ERROR | `multiGridType`: 允许值: NONE, GRID, OUTLETS |
| enum | ERROR | `layerBrightness`: 允许值: NORMAL, INACTIVE_GRAY, INACTIVE_HIDDEN |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PCB/t-canvas.md)

