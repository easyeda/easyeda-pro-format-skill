# SCH

> 返回 [SKILL.md](../SKILL.md) 入口文档

## 领域概述

SCH 是嘉立创 EDA 格式中的原理图文档类型，与 PCB 页关联。SCH 文档包含原理图的元数据（名称、来源、所属板子、排序），其设计规则结构与 PCB 页相同。SCH 文档支持差分对定义、网络类配置等功能，用于管理高速差分信号和网络分类规则。
## 图元索引

| 类型 | 简述 | 图元 | 定义 |
|------|------|------|------|
| [TMSchematic](../primitives/SCH/meta.md) | 原理图 META 类型 | META | [详细](../primitives/SCH/meta.md) |
| [TRuleTemplate](../primitives/SCH/rule_template.md) | 设计规则模板 | RULE_TEMPLATE | [详细](../primitives/SCH/rule_template.md) |
| [TRuleWire](../primitives/SCH/rule.md) | 设计规则 | RULE | [详细](../primitives/SCH/rule.md) |
| [TRuleSelectorWire](../primitives/SCH/rule_selector.md) | 规则选择器 | RULE_SELECTOR | [详细](../primitives/SCH/rule_selector.md) |
| [TDifferentialPairWire](../primitives/SCH/differential_pair.md) | 差分对 | DIFFERENTIAL_PAIR | [详细](../primitives/SCH/differential_pair.md) |
| [TNetClassWire](../primitives/SCH/net_class.md) | 网络类（**线格式**） | NET_CLASS | [详细](../primitives/SCH/net_class.md) |
| [TEQLenNetGrpWire](../primitives/SCH/eql_net_grp.md) | 等长网络组（**线格式**） | EQL_NET_GRP | [详细](../primitives/SCH/eql_net_grp.md) |

## Related Resources

- [返回 SKILL.md](../SKILL.md)
- [所有 primitives](../primitives/)
- [所有 examples](../examples/)

