# TPcbRegion

> 返回 [PCB 图元索引](../../documents/PCB.md)

## 定义

区域

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| partitionId | `string \| null` |  | - | 所属分区编号，为null表示无分区 |
| groupId | `string` | ✓ | - | 分组编号, 没有则为 0 不分组，非 0 为组标志，相同组标志的为一组 |
| layerId | `number` | ✓ | - | 层编号 |
| locked | `boolean` | ✓ | - | 是否锁定 |
| zIndex | `number \| null` | ✓ | default: null | Z 轴高度, null 为默认 |
| width | `number` | ✓ | - | 线宽 |
| prohibitType | `EProhibitType[]` | ✓ | - | 禁止类型，可同时存在多个（取值与含义见 EProhibitType） 旧格式遗留的编号（不是当前取值，解析时需兼容）： 1 布线与放置填充区域、2 元件、3 过孔、4 覆铜与内电层、 5 布线、6 放置填充区域、7 覆铜、8 内电层 |
| path | `any[][]` | ✓ | - | 请参考复杂多边形章节 |
| name | `string` | ✓ | - | 名称（可选） |
| regionType | `ERegionType` | ✓ | - | 取值范围：PROHIBIT（禁止区域）、CONSTRAINT（约束区域） |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-pcb-region.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `layerId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `width`: 必需字段 |
| required | ERROR | `prohibitType`: 必需字段 |
| required | ERROR | `path`: 必需字段 |
| required | ERROR | `name`: 必需字段 |
| required | ERROR | `regionType`: 必需字段 |
| enum | ERROR | `regionType`: 允许值: PROHIBIT, CONSTRAINT |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PCB/t-pcb-region.md)

