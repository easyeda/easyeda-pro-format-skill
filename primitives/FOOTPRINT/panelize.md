# TPanelize

> 返回 [FOOTPRINT 图元索引](../../documents/FOOTPRINT.md)

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
| horizontalSize | `TPanelizeSide` | ✓ | - | 工艺边参数 - 水平（方向由本字段位置表达；解码端会注入 `direction: 0`， 但**真实样本里没有该键**、读盘别依赖它——详见 TPanelizeSide 的说明） |
| verticalSize | `TPanelizeSide` | ✓ | - | 工艺边参数 - 垂直（方向由本字段位置表达；解码端会注入 `direction: 1`， 但**真实样本里没有该键**、读盘别依赖它——详见 TPanelizeSide 的说明） |
| mirrorBoard | `boolean \| undefined` | ✓ | - | 阴阳板 |
| mirrorEvenRow | `boolean \| undefined` | ✓ | - | 偶数行翻面 |
| mirrorEvenCol | `boolean \| undefined` | ✓ | - | 偶数列翻面 |
| evenRowRotation | `number \| undefined` | ✓ | - | 偶数行角度 |
| evenColRotation | `number \| undefined` | ✓ | - | 偶数列角度 |
| showVCutIndicator | `boolean \| undefined` | ✓ | - | v割标识 |
| vCutLayer | `number \| undefined` | ✓ | - | 层 |
| markPosition | `Array<Array<number>>` |  | - | mark 点位置：**最多 4 个**（按 左上、右上、左下、右下 的顺序存放）。 每个元素是 **4 个数**，依次表示该 mark 点中心到最外侧 bbox 的 **`[到上边, 到右边, 到下边, 到左边]`** 四个距离。 |
| positionHolePosition | `Array<Array<number>>` |  | - | 定位孔位置：结构同 `markPosition`（最多 4 个，每个 4 个数 = `[到上边, 到右边, 到下边, 到左边]` 四个距离），只是承载的是定位孔而非 mark 点。 |
| panelizeVersion | `EPanelizeVersion` | ✓ | - | 取值范围：1.0（拼板版本 1.0）、1.1（拼板版本 1.1；拼板版本 1.1（当前默认值，与 pro2 同值，两个成员是有意保留的别名）） |

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
| enum | ERROR | `panelizeVersion`: 允许值: 1.0, 1.1 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/FOOTPRINT/t-panelize.md)

