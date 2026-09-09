# TPanelize

> 返回 [PCB 图元索引](../../documents/PCB.md)

## 定义

拼板

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| on | `boolean` | ✓ | - | 是否启用 |
| row | `number` | ✓ | - | 行数 |
| column | `number` | ✓ | - | 列数 |
| rowSpacing | `number` | ✓ | - | 行距 |
| columnSpacing | `number` | ✓ | - | 列距 |
| onlyOutline | `boolean` | ✓ | - | 是否只拼边框 |
| horizontalStamp | `TPanelizeStamp` | ✓ | - | 邮票孔参数 - 水平 |
| verticalStamp | `TPanelizeStamp` | ✓ | - | 邮票孔参数 - 垂直 |
| horizontalSize | `TPanelizeSide` | ✓ | - | 工艺边参数 - 水平 |
| verticalSize | `TPanelizeSide` | ✓ | - | 工艺边参数 - 垂直 |
| mirrorBoard | `boolean | undefined` | ✓ | - | 阴阳板 |
| mirrorEvenRow | `boolean | undefined` | ✓ | - | 偶数行翻面 |
| mirrorEvenCol | `boolean | undefined` | ✓ | - | 偶数列翻面 |
| evenRowRotation | `number | undefined` | ✓ | - | 偶数行角度 |
| evenColRotation | `number | undefined` | ✓ | - | 偶数列角度 |
| showVCutIndicator | `boolean | undefined` | ✓ | - | v割标识 |
| vCutLayer | `number | undefined` | ✓ | - | 层 |
| markPosition | `Array<Array<number>>` |  | - | mark点位置 [左上，右上，左下，右下]四个mark点中心与最外侧bbox上右下左的距离 |
| positionHolePosition | `Array<Array<number>>` |  | - | 定位点位置  [左上，右上，左下，右下]四个mark点中心与最外侧bbox上右下左的距离 |
| panelizeVersion | `EPanelizeVersion` | ✓ | - | 拼板版本，默认字段 EPanelizeVersion.pro （新产生的都是最新版本）; 主要作用是要区分不同时期的拼板交互效果和输出的gerber差异 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-panelize.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `on`: 必需字段 |
| required | ERROR | `row`: 必需字段 |
| required | ERROR | `column`: 必需字段 |
| required | ERROR | `rowSpacing`: 必需字段 |
| required | ERROR | `columnSpacing`: 必需字段 |
| required | ERROR | `onlyOutline`: 必需字段 |
| required | ERROR | `horizontalStamp`: 必需字段 |
| required | ERROR | `verticalStamp`: 必需字段 |
| required | ERROR | `horizontalSize`: 必需字段 |
| required | ERROR | `verticalSize`: 必需字段 |
| required | ERROR | `mirrorBoard`: 必需字段 |
| required | ERROR | `mirrorEvenRow`: 必需字段 |
| required | ERROR | `mirrorEvenCol`: 必需字段 |
| required | ERROR | `evenRowRotation`: 必需字段 |
| required | ERROR | `evenColRotation`: 必需字段 |
| required | ERROR | `showVCutIndicator`: 必需字段 |
| required | ERROR | `vCutLayer`: 必需字段 |
| required | ERROR | `panelizeVersion`: 必需字段 |
| enum | ERROR | `panelizeVersion`: 允许值: 1.0, 1.1, 1.1 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PCB/t-panelize.md)

