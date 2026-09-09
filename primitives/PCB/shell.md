# TPcbShell

> 返回 [PCB 图元索引](../../documents/PCB.md)

## 定义

外壳

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| shellType | `E3DShellOutlineType` | ✓ | - | 外壳类型 T&B 上下壳 DRAWER 推盖 CLAM 翻盖 |
| shellHeight | `number` | ✓ | - | 外壳高度 |
| pcbHeight | `number` | ✓ | - | PCB 高度 |
| strokeWidth | `number` | ✓ | - | 线宽（弃用） |
| path | `any[][]` | ✓ | - | 参考复杂多边形 |
| thickness | `number` | ✓ | - | 外壳厚度 |
| direction | `E3DShellPushCoverDir` |  | - | 推盖 - 推盖方向 |
| bottomHeight | `number` |  | - | 上下壳 - 下壳高度 |
| topInnerHeight | `number` |  | - | 上下壳 - 上壳内壁高度 |
| bottomInnerHeight | `number` |  | - | 上下壳 - 下壳内壁高度 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-pcb-shell.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `shellType`: 必需字段 |
| required | ERROR | `shellHeight`: 必需字段 |
| required | ERROR | `pcbHeight`: 必需字段 |
| required | ERROR | `strokeWidth`: 必需字段 |
| required | ERROR | `path`: 必需字段 |
| required | ERROR | `thickness`: 必需字段 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PCB/t-pcb-shell.md)

