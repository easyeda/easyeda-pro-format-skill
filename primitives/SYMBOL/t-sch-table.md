# TTableCell

> 返回 [SYMBOL 图元索引](../../documents/SYMBOL.md)

## 定义

表格单元格

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| id | `string` | ✓ | pattern: ^[0-9a-f]{16}$ | 唯一编号 |
| value | `string` | ✓ | - | 内容 |
| rowIndex | `number` | ✓ | min: 0 | 行 |
| columnIndex | `number` | ✓ | min: 0 | 列 |
| rowSpan | `number` | ✓ | min: 1 | 宽度（占多少列） |
| colSpan | `number` | ✓ | min: 1 | 高度（占多少行） |
| topStyle | `TLineStyle` | ✓ | - | 边框线形样式（上） |
| rightStyle | `TLineStyle` | ✓ | - | 边框线形样式（右） |
| bottomStyle | `TLineStyle` | ✓ | - | 边框线形样式（下） |
| leftStyle | `TLineStyle` | ✓ | - | 边框线形样式（左） |
| fontStyle | `TTableFontStyle` | ✓ | - | 字体样式 |
| lineHeight | `number` | ✓ | min: 0 | 行间距 |
| zIndex | `number | null` | ✓ | - | Z 轴高度 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-table-cell.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `id`: 必需字段 |
| required | ERROR | `value`: 必需字段 |
| required | ERROR | `rowIndex`: 必需字段 |
| required | ERROR | `columnIndex`: 必需字段 |
| required | ERROR | `rowSpan`: 必需字段 |
| required | ERROR | `colSpan`: 必需字段 |
| required | ERROR | `topStyle`: 必需字段 |
| required | ERROR | `rightStyle`: 必需字段 |
| required | ERROR | `bottomStyle`: 必需字段 |
| required | ERROR | `leftStyle`: 必需字段 |
| required | ERROR | `fontStyle`: 必需字段 |
| required | ERROR | `lineHeight`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| pattern | ERROR | `id`: 匹配模式: ^[0-9a-f]{16}$ |
| minimum | ERROR | `rowIndex`: 最小值: 0 |
| minimum | ERROR | `columnIndex`: 最小值: 0 |
| minimum | ERROR | `rowSpan`: 最小值: 1 |
| minimum | ERROR | `colSpan`: 最小值: 1 |
| minimum | ERROR | `lineHeight`: 最小值: 0 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/SYMBOL/t-table-cell.md)

