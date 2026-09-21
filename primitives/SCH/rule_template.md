# TRuleTemplate

> 返回 [SCH 图元索引](../../documents/SCH.md)

## 定义

设计规则模板

**id 为固定单例名 `RULE_TEMPLATE`**（与 `RULE` / `RULE_SELECTOR` 的数组 id 不同）；
模板名在载荷里（`name`）。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| name | `string` | ✓ | - | 模板名称 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-rule-template.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `name`: 必需字段 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/SCH/t-rule-template.md)

