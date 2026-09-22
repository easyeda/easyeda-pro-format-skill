# TRuleTemplate

> 返回 [PCB 图元索引](../../documents/PCB.md)

## 定义

设计规则模板

**id 为固定单例名 `RULE_TEMPLATE`**（属**固定单例 id**，见 [TSingletonElementId](../REFERENCE/t-singleton-element-id.md)；
与 `RULE` / `RULE_SELECTOR` 的数组串 id 不同，那两者是**键式 id**，见 [TKeyedElementId](../REFERENCE/t-keyed-element-id.md)）；
模板名在载荷里（`name`）。

## 它与其他设计规则是什么关系

「规则模板」在逻辑上**有三种可能的理解方式**，实现方必须择一，**本格式采用的是第 3 种**：
1. 模板是其他设计规则的**基版**，其他规则是对模板的覆盖；
2. 模板与其他设计规则**互斥**——有模板时其他规则只是暂存、不产生任何效果；
3. **模板只是一个「来源于哪个模板」的标识，不影响其他实际规则的效力**（当前选型）。

即：读到 `RULE_TEMPLATE` 时，**不要据此推演实际规则内容或覆盖关系**——
它只是一条命名记录，实际效力一律看 `RULE` / `RULE_SELECTOR` 各自的数据。

⚠️ **有一条例外**：模板名会被用作**兼容旧文件的一次性迁移开关**——
`SafeSpacingDecode` 在读到「8 行」版的安全间距表、且模板名命中内置的
JLCPCB 系统模板集合时，会把表中两个间距值强制改写成 `11.811`。
所以「完全不影响规则内容」并不严格成立；该例外**只对旧版间距表生效**。

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

→ [查看示例](../../examples/PCB/t-rule-template.md)

