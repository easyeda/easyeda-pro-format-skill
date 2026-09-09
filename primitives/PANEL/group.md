# TPanelGroup

> 返回 [PANEL 图元索引](../../documents/PANEL.md)

## 定义

面板分组控制

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| parentId | `string` | ✓ | - | 父级分组编号：为 0 则表示无父级 |
| title | `string` | ✓ | - | 分组名称：可选，根据实际需求处理 |
| visible | `boolean` | ✓ | - | 是否可见 |
| locked | `boolean` | ✓ | - | 是否锁定 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-panel-group.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `parentId`: 必需字段 |
| required | ERROR | `title`: 必需字段 |
| required | ERROR | `visible`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PANEL/t-panel-group.md)

