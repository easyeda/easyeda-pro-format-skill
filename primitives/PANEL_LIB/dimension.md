# TPanelDimension

> 返回 [PANEL_LIB 图元索引](../../documents/PANEL_LIB.md)

## 定义

面板尺寸工具集

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| dimensionType | `string` | ✓ | - | 尺寸类型：
LENGTH-CONSTRAINT 长度约束,
LENGTH-MEASUREMENT 长度测量,
ANGLE-CONSTRAINT 角度约束,
ANGLE-MEASUREMENT 角度测量,
RADIUS-MEASUREMENT 半径测量,
ANGLE 游离角度,
LENGTH 游离长度 |
| unit | `string` | ✓ | - | 单位（预留）：mm cm inch mil 或 null 为跟随画布单位 |
| strokeWidth | `number` | ✓ | min: 0 | 线宽（预留，与画布尺寸无关） |
| accuracy | `number` | ✓ | - | 精度（预留） |
| controlDot | `number[]` | ✓ | - | 控制点 X1 Y1 X2 Y2 X3 Y3 ... 不同尺寸类型对控制点有不同的定义，LENGTH-XXXX 长度工具有 4 个控制点，ANGLE-XXXX 角度工具有 3 个控制点 |
| relationIds | `string[]` | ✓ | - | 关联图元Id |
| rotation | `number` | ✓ | min: 0, max: 360 | 旋转角度（角度制） |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-panel-dimension.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `dimensionType`: 必需字段 |
| required | ERROR | `unit`: 必需字段 |
| required | ERROR | `strokeWidth`: 必需字段 |
| required | ERROR | `accuracy`: 必需字段 |
| required | ERROR | `controlDot`: 必需字段 |
| required | ERROR | `relationIds`: 必需字段 |
| required | ERROR | `rotation`: 必需字段 |
| minimum | ERROR | `strokeWidth`: 最小值: 0 |
| minimum | ERROR | `rotation`: 最小值: 0 |
| maximum | ERROR | `rotation`: 最大值: 360 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PANEL_LIB/t-panel-dimension.md)

