# TPcbShell

> 返回 [PCB 图元索引](../../documents/PCB.md)

## 定义

外壳

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| groupId | `string` | ✓ | - | 分组编号, 没有则为 0 不分组，非 0 为组标志，相同组标志的为一组 |
| locked | `boolean` | ✓ | - | 是否锁定 |
| zIndex | `number \| null` | ✓ | default: null | Z 轴高度, null 为默认 |
| partitionId | `string \| null` |  | - | 所属分区编号，为null表示无分区 |
| shellType | `E3DShellOutlineType` | ✓ | - | 取值范围：DRAWER（推盖）、T&B（上下壳） |
| shellHeight | `number` | ✓ | - | 外壳高度 |
| pcbHeight | `number` | ✓ | - | PCB 高度 |
| strokeWidth | `number` | ✓ | - | 线宽（弃用） |
| path | `any[][]` | ✓ | - | 参考复杂多边形 |
| thickness | `number` | ✓ | - | 外壳厚度 |
| direction | `E3DShellPushCoverDir` |  | - | 取值范围：X_AXIS_POSITIVE（X轴正向）、X_AXIS_NEGATIVE（X轴负向）、Y_AXIS_POSITIVE（Y轴正向）、Y_AXIS_NEGATIVE（Y轴负向） |
| bottomHeight | `number` |  | - | 上下壳 - 下壳高度 |
| topInnerHeight | `number` |  | - | 上下壳 - 上壳内壁高度 |
| bottomInnerHeight | `number` |  | - | 上下壳 - 下壳内壁高度 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-pcb-shell.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `shellType`: 必需字段 |
| required | ERROR | `shellHeight`: 必需字段 |
| required | ERROR | `pcbHeight`: 必需字段 |
| required | ERROR | `strokeWidth`: 必需字段 |
| required | ERROR | `path`: 必需字段 |
| required | ERROR | `thickness`: 必需字段 |
| enum | ERROR | `shellType`: 允许值: DRAWER, T&B |
| enum | ERROR | `direction`: 允许值: X_AXIS_POSITIVE, X_AXIS_NEGATIVE, Y_AXIS_POSITIVE, Y_AXIS_NEGATIVE |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PCB/t-pcb-shell.md)

