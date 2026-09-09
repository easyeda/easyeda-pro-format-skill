# TMBoard

> 返回 [BOARD 图元索引](../../documents/BOARD.md)

## 定义

板子 META 类型

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| title | `string` | ✓ | - | 板子名称 |
| zIndex | `number` | ✓ | min: 0 | 表示排序层级 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/tm-board.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `title`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| minimum | ERROR | `zIndex`: 最小值: 0 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/BOARD/tm-board.md)

