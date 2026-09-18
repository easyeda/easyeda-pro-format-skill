# TWire

> 返回 [SYMBOL 图元索引](../../documents/SYMBOL.md)

## 定义

导线组

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| groupId | `string` | ✓ | - | 分组编号, 没有则为空 |
| locked | `boolean` | ✓ | - | 是否锁定 |
| zIndex | `number \| null` | ✓ | - | Z 轴高度 |
| yAxisDirection | `TYAxisDirection` |  | - | Y 轴方向标记：仅 eprj3 本地文件格式会带，读盘时被剥离；语义见 TYAxisDirection |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-wire.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| enum | ERROR | `yAxisDirection`: 允许值: up, down |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/SYMBOL/t-wire.md)

