# TSchBusEntry

> 返回 [SYMBOL 图元索引](../../documents/SYMBOL.md)

## 定义

总线接入标识

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| order | `number` | ✓ | min: 0 | 顺序编号：在隶属的 BUS 里的顺序编号，可重复 |
| pointX | `number` | ✓ | - | 端点 X |
| pointY | `number` | ✓ | - | 端点 Y |
| rotation | `number` | ✓ | min: 0, max: 360 | 旋转角度（角度制）：绕 端点 旋转 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-sch-bus-entry.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `order`: 必需字段 |
| required | ERROR | `pointX`: 必需字段 |
| required | ERROR | `pointY`: 必需字段 |
| required | ERROR | `rotation`: 必需字段 |
| minimum | ERROR | `order`: 最小值: 0 |
| minimum | ERROR | `rotation`: 最小值: 0 |
| maximum | ERROR | `rotation`: 最大值: 360 |

### 容器成员

此图元作为容器，包含以下成员图元类型：

- 成员图元类型: [TSchLine](../../primitives/SCH_PAGE/line.md)
- 成员图元中的关联字段: `lineGroup` (指向容器 id)

BUSENTRY 包含 LINE，每个 LINE 的 lineGroup 必须指向 BUSENTRY 的 id

## 示例

→ [查看示例](../../examples/SYMBOL/t-sch-bus-entry.md)

