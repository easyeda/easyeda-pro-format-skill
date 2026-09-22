# TRuleWire

> 返回 [SCH 图元索引](../../documents/SCH.md)

## 定义

设计规则

【外层数据id构造】id 是**键式 id** —— 盘上是数组串 `["RULE", 规则类型, 规则名]`
（见 [TKeyedElementId](../REFERENCE/t-keyed-element-id.md)），由本类型的
`ruleType` 与 `ruleName` **两个字段**按这个顺序拼成。
⚠️ **写盘时这两个字段会从载荷里删掉**（只存在于 id），读盘时再从 id 还原回来——
所以**载荷里看不到它们，不要以为是漏写**。

本类型与 [TRuleSelectorWire](./rule_selector.md) 配套：规则内容在本类型的 `ruleContext`，而该规则作用在哪些对象上
由 [TRuleSelectorWire](./rule_selector.md) 的 `ruleSelect` 决定，`TRuleSelector.ruleKeyValue` 再按规则类型指向本类型的 `ruleName`。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| ruleState | [ERuleStatus](../REFERENCE/e-rule-status.md) | ✓ | - | 取值范围：NORMAL（普通规则）、DEFAULT（默认规则） |
| ruleContext | TRuleContext[[ERuleType](../REFERENCE/e-rule-type.md)] | ✓ | - | 规则内容：EDA 自己决定 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-rule-wire.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `ruleState`: 必需字段 |
| required | ERROR | `ruleContext`: 必需字段 |
| enum | ERROR | `ruleState`: 允许值: NORMAL, DEFAULT |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/SCH/t-rule-wire.md)

