# TPanelizeSide

> 返回 [PCB 图元索引](../../documents/PCB.md)

## 定义

工艺边参数

⚠️ **不要往示例里补 `direction`**：真实样本的 `horizontalSize` / `verticalSize` 里都没有该键，
区分水平/垂直靠的是它在 PANELIZE 里的**位置**（`horizontalSize` 还是 `verticalSize`）。
解码端会自己往里注入一个 `direction` 字段（水平注入 `0`、垂直注入 `1`），
所以**读盘时不要依赖这个键**。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| on | `boolean` | ✓ | - | 是否启用（不启用则不使用工艺边） |
| sideHeight | `number` | ✓ | - | 工艺边高度 |
| positionHoleDiameter | `number` | ✓ | - | 定位孔直径（0 表示无定位孔） |
| markDiameter | `number` | ✓ | - | Mark 点直径（0 表示不启用 Mark 点） |
| markExpansion | `number` | ✓ | - | Mark 点阻焊扩展 |
| borderRadius | `number \| undefined` | ✓ | - | 工艺边圆角半径 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-panelize-side.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `on`: 必需字段 |
| required | ERROR | `sideHeight`: 必需字段 |
| required | ERROR | `positionHoleDiameter`: 必需字段 |
| required | ERROR | `markDiameter`: 必需字段 |
| required | ERROR | `markExpansion`: 必需字段 |
| required | ERROR | `borderRadius`: 必需字段 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PCB/t-panelize-side.md)

