# TBus

> 返回 [SCH_PAGE 图元索引](../../documents/SCH_PAGE.md)

## 定义

总线组

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| busEntry | `{ [id: string]: TSchBusEntry }` | ✓ | - |  |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-bus.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `busEntry`: 必需字段 |

### 容器成员

此图元作为容器，包含以下成员图元类型：

- 成员图元类型: [TSchLine](../../primitives/SCH_PAGE/line.md)
- 成员图元中的关联字段: `lineGroup` (指向容器 id)

BUS 包含多个 LINE，每个 LINE 的 lineGroup 必须指向 BUS 的 id

## 示例

→ [查看示例](../../examples/SCH_PAGE/t-bus.md)

