# TTableCell

> 返回 [SCH_PAGE 图元索引](../../documents/SCH_PAGE.md)

## 定义

表格单元格

注意：这是**内嵌结构**，不是数据流里的独立图元（表格的原子类型 TABLE 见 TSchTable），
因此这里不声明 primitiveType 标签。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| id | `string` | ✓ | pattern: ^[0-9a-f]{16}$ | 唯一编号 |
| value | `string` | ✓ | - | 内容 |
| rowIndex | `number` | ✓ | min: 0 | 行 |
| columnIndex | `number` | ✓ | min: 0 | 列 |
| rowSpan | `number` | ✓ | min: 1 | 跨行数：本单元格纵向占多少行（其高度 = 连续 rowSpan 行的高度之和） |
| colSpan | `number` | ✓ | min: 1 | 跨列数：本单元格横向占多少列（其宽度 = 连续 colSpan 列的宽度之和） |
| topStyle | `TLineStyle` | ✓ | - | 边框线形样式（上） |
| rightStyle | `TLineStyle` | ✓ | - | 边框线形样式（右） |
| bottomStyle | `TLineStyle` | ✓ | - | 边框线形样式（下） |
| leftStyle | `TLineStyle` | ✓ | - | 边框线形样式（左） |
| fontStyle | `TTableFontStyle` | ✓ | - | 字体样式 |
| lineHeight | `number \| null` | ✓ | min: 0 | 行高倍数：相对字号的倍数（默认 1.2），实际行高 = lineHeight × fontSize；null 表示用主题默认 （**写入端未设置时即产出 `null`**，判空一律用 `== null`） |
| zIndex | `number \| null` | ✓ | - | 单元格独立层序：控制同一表格内各单元格的叠放次序 |

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

→ [查看示例](../../examples/SCH_PAGE/t-table-cell.md)

