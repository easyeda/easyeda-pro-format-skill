# TCanvas

> 返回 [PCB 图元索引](../../documents/PCB.md)

## 定义

画布配置

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| originX | `number` | ✓ | - | 画布原点 X |
| originY | `number` | ✓ | - | 画布原点 Y |
| unit | `string` | ✓ | - | 显示单位（不会影响格式里数据的单位） |
| gridXSize | `number` | ✓ | - | 网格尺寸 X |
| gridYSize | `number` | ✓ | - | 网格尺寸 Y |
| snapXSize | `number` | ✓ | - | 栅格尺寸 X |
| snapYSize | `number` | ✓ | - | 栅格尺寸 Y |
| altSnapXSize | `number` | ✓ | - | Alt 栅格尺寸 X |
| altSnapYSize | `number` | ✓ | - | Alt 栅格尺寸 Y |
| gridType | `EGridType` | ✓ | - | 网格类型 |
| multiGridType | `EGridType` | ✓ | - | 加粗网格类型 |
| multiGridRatio | `number` | ✓ | - | 加粗网格倍数：number |
| highlightValue | `number` | ✓ | - | 高亮亮度值 |
| layerBrightness | `ELayerBrightness` | ✓ | - | 图层亮度,3.3 版本新增 |

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
| enum | ERROR | `gridType`: 允许值: NONE, GRID, OUTLETS |
| enum | ERROR | `multiGridType`: 允许值: NONE, GRID, OUTLETS |
| enum | ERROR | `layerBrightness`: 允许值: NORMAL, INACTIVE_GRAY, INACTIVE_HIDDEN |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PCB/t-canvas.md)

