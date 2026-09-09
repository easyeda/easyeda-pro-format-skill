# TSchTable

> 返回 [SCH_PAGE 图元索引](../../documents/SCH_PAGE.md)

## 定义

表格

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| startX | `number` | ✓ | - | 左上角 X |
| startY | `number` | ✓ | - | 左上角 Y |
| rowSizes | `number[]` | ✓ | - | 行高 |
| colSizes | `number[]` | ✓ | - | 列宽 |
| rowLocked | `number[]` | ✓ | - | 行锁定 |
| colLocked | `number[]` | ✓ | - | 列锁定 |
| rotation | `number` | ✓ | min: 0, max: 360 | 旋转角度（角度制） |
| tableCell | `TTableCell[]` | ✓ | - | 表格单元格 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-sch-table.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `startX`: 必需字段 |
| required | ERROR | `startY`: 必需字段 |
| required | ERROR | `rowSizes`: 必需字段 |
| required | ERROR | `colSizes`: 必需字段 |
| required | ERROR | `rowLocked`: 必需字段 |
| required | ERROR | `colLocked`: 必需字段 |
| required | ERROR | `rotation`: 必需字段 |
| required | ERROR | `tableCell`: 必需字段 |
| minimum | ERROR | `rotation`: 最小值: 0 |
| maximum | ERROR | `rotation`: 最大值: 360 |

### 内嵌结构

此图元包含以下内嵌结构：

- 内嵌类型: [TTableCell](../../primitives/SCH_PAGE/table.md)
- 包含内嵌结构的字段: `tableCell`

tableCell 字段包含多个 TTableCell

## 示例

→ [查看示例](../../examples/SCH_PAGE/t-sch-table.md)

