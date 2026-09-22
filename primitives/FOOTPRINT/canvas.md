# TCanvas

> 返回 [FOOTPRINT 图元索引](../../documents/FOOTPRINT.md)

## 定义

画布配置

一份文档里**只有一条**（`type:"CANVAS"`）：描述这块画布**怎么看** —— 原点、显示单位、
网格与栅格尺寸、网格类型、高亮亮度、图层亮度。它**不描述任何图元**，
也**不改变图元数据的单位口径**（各字段的单位见字段说明）。

⚠️ 最常见的误用是拿 `originX` / `originY` 去**平移图元**：图元存的是**绝对坐标**，
原点只是「网格相位 / 相机对准点 / 坐标显示零点」三件事的共同基准，改它**不会搬动图元**。

⚠️ `unit` **只影响显示**，且取值是**小写字面量** `mm` / `mil` —— 写成大写会让整条 CANVAS
被丢弃；同理各尺寸字段恒为 mil，不随 `unit` 变。

id 是**固定单例名** `"CANVAS"`（这类**固定单例 id** 见 [TSingletonElementId](../REFERENCE/t-singleton-element-id.md)）。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| originX | `number` | ✓ | - | 画布原点 X：它是**绝对坐标里的一个基准锚点**，同时充当三件事—— **网格与标尺的相位基准**、**打开文档时相机对准的点**、 以及**属性面板显示坐标的零点**（显示值 = 图元坐标 − 原点）。 单位 **mil**（= 内部值 ×10，与本图元坐标同口径；**与 `unit` 字段无关**—— `unit` 只影响显示）。本域内部 Y 轴向上，故 **originY 增大 = 向上**。 ⚠️ **它绝不是「图元坐标的平移量」**：图元存的是**绝对坐标**， 改原点**不会**搬动图元（唯一会跟着动的是 FOOTPRINT 文档里的**隐藏属性**， 保持它们的相对偏移）。**读盘时不要拿 originX/originY 去平移图元。** 真机几乎恒为 `0`（本机语料 1864 条 CANVAS 里 1858 条是 0）。 |
| originY | `number` | ✓ | - | 画布原点 Y：含义、单位与注意事项同 `originX`（**本域 Y 向上，增大 = 向上**）。 真机几乎恒为 `0`。 |
| unit | `string` | ✓ | enum: mm, mil | 显示单位。取值是**小写字面量 `mm` / `mil`**，其它值（含大写 `MM` / `MIL`）会导致 整条 CANVAS 被丢弃——解码端按小写比较，真机样本只有 `"mil"` / `"mm"`、无一大写。 **不要照枚举成员名写成大写。** 注：**它只影响显示，不改变任何数值字段的单位口径** —— `originX` / `originY`、 `gridXSize` / `snapXSize` 这些在本格式里恒为 mil，不随 `unit` 变。 |
| gridXSize | `number` | ✓ | - | 网格尺寸 X（**mil**；写盘 ×10、读盘 ÷10，与本图元坐标同口径）。 ⚠️ **存量里有不按此口径写的记录**：本机语料中约 250 条 `unit:"mm"` 的 CANVAS 里， `snapXSize` 形如 `0.03937` / `1.574803` —— 数值上恰好是「**把 mm 值当 inch 写**」的结果 （写入方不是本仓的编码器）。**遇到这类数值请结合 `unit` 判断**，别一律按 mil 硬读。 |
| gridYSize | `number` | ✓ | - | 网格尺寸 Y（**mil**；写盘 ×10、读盘 ÷10）。口径与坑同 `gridXSize` |
| snapXSize | `number` | ✓ | - | 栅格尺寸 X（**mil**；写盘 ×10、读盘 ÷10）。口径与坑同 `gridXSize` |
| snapYSize | `number` | ✓ | - | 栅格尺寸 Y（**mil**；写盘 ×10、读盘 ÷10）。口径与坑同 `gridXSize` |
| altSnapXSize | `number` | ✓ | - | Alt 栅格尺寸 X。 ⚠️ **口径与 `gridXSize` / `snapXSize` 不同**：它写读都**不做 ×10/÷10**， 单位是 `unit` 字段所指定的**显示单位**。**不要按上面几个字段的换算方式来算它。** ⚠️ **缺省时回退成该层 `gridXSize` ÷10 后的内部值**（取不到值时回退成 `gridXSize / 10`）， 与**显式赋值时用的原始盘值**口径**不一致**。**生成数据时请显式写上**，不要依赖缺省。 |
| altSnapYSize | `number` | ✓ | - | Alt 栅格尺寸 Y。口径同 `altSnapXSize`（不做 ×10/÷10，单位随 `unit`； **缺省时同样回退为 `gridYSize` ÷10 后的内部值**）。 |
| gridType | [EGridType](../REFERENCE/e-grid-type.md) | ✓ | - | 取值范围：NONE（无）、GRID（网格）、OUTLETS（网点） |
| multiGridType | [EGridType](../REFERENCE/e-grid-type.md) | ✓ | - | 取值范围：NONE（无）、GRID（网格）、OUTLETS（网点） |
| multiGridRatio | `number` | ✓ | - | 加粗网格倍数。 合法取值 ≥ 1；**小于 1 时会被强制成 5**（`getGridRatio` 兜底）。 负值或 NaN 会导致整条 CANVAS 被丢弃。 |
| highlightValue | `number` | ✓ | - | 高亮亮度值：**0 ~ 0.99 的比例**（不是百分比、不是 0~100）。 大于 0.99 会被夹到 0.99；默认 0.5。 |
| layerBrightness | [ELayerBrightness](../REFERENCE/e-layer-brightness.md) | ✓ | - | 取值范围：NORMAL（正常亮度）、INACTIVE_GRAY（非激活层置灰）、INACTIVE_HIDDEN（非激活层隐藏） |

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

→ [查看示例](../../examples/FOOTPRINT/t-canvas.md)

