# TPcbDimension

> 返回 [FOOTPRINT 图元索引](../../documents/FOOTPRINT.md)

## 定义

PCB 尺寸工具集

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| partitionId | `string | null` |  | - | 所属分区编号，为null表示无分区 |
| groupId | `string` | ✓ | - | 分组编号, 没有则为 0 不分组，非 0 为组标志，相同组标志的为一组 |
| layerId | `number` | ✓ | - | 层编号 |
| locked | `boolean` | ✓ | - | 是否锁定 |
| zIndex | `number | null` | ✓ | - | Z 轴高度, null 为默认 |
| type | `EDimensionType` | ✓ | - | 尺寸类型： RADIUS 半径 LENGTH 长度 ANGLE 角度 |
| unit | `EUnitName` | ✓ | - | 单位 mm cm inch mil |
| strokeWidth | `number` | ✓ | - | 线宽 |
| precision | `number` | ✓ | min: 0 | 精度 |
| textFollow | `boolean` | ✓ | - | 文字是否跟随：1 工具自动决定文字的位置 0 永远采用 ATTR 的位置 |
| coords | `number[]` | ✓ | - | 坐标集 X1 Y1 X2 Y2 X3 Y3 ... 不同尺寸类型对坐标有不同的定义 |
| text | `TPcbString` | ✓ | - | 文本 |
| specialColor | `string` |  | pattern: ^$|^#[0-9A-Fa-f]{6}$ | 特殊颜色 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-pcb-dimension.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `layerId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `type`: 必需字段 |
| required | ERROR | `unit`: 必需字段 |
| required | ERROR | `strokeWidth`: 必需字段 |
| required | ERROR | `precision`: 必需字段 |
| required | ERROR | `textFollow`: 必需字段 |
| required | ERROR | `coords`: 必需字段 |
| required | ERROR | `text`: 必需字段 |
| enum | ERROR | `type`: 允许值: LENGTH, RADIUS, ANGLE |
| enum | ERROR | `unit`: 允许值: mil, inch, cm, mm |
| minimum | ERROR | `precision`: 最小值: 0 |
| pattern | ERROR | `specialColor`: 匹配模式: ^$|^#[0-9A-Fa-f]{6}$ |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/FOOTPRINT/t-pcb-dimension.md)

