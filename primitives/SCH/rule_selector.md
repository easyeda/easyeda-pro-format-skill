# TRuleSelectorWire

> 返回 [SCH 图元索引](../../documents/SCH.md)

## 定义

规则选择器

【外层数据id构造】id 是**键式 id** —— 盘上是数组串 `["RULE_SELECTOR", 选择器标识]`，
两段各有含义（见 [TKeyedElementId](../REFERENCE/t-keyed-element-id.md)）：**第 1 段** `"RULE_SELECTOR"` 是固定前缀；
**第 2 段**标出这条选择器**选的是哪一类对象**，由本类型的字段 `ruleSelect` 提供
（示例：`["NET","GND"]`）—— 它是一串标识，**不是任何行的 id**。
⚠️ 与 [TRuleWire](./rule.md)（`RULE`）同理：**写盘时 `ruleSelect` 会从载荷里删掉**（只存在于 id），读盘时再由 id 还原。

本类型与 [TRuleWire](./rule.md) 配套：`ruleSelect` 说明规则作用在哪些对象上，
`ruleKeyValue` 按规则类型指向 [TRuleWire](./rule.md) 的 `ruleName`。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| ruleOrder | `number` | ✓ | min: 0 | 优先级：数值越小，优先级越高 注：该字段同时被当作「规则选择器类型」使用（外部转换器按它取最小值选规则）， 两种语义并存，消费时需留意。 |
| ruleKeyValue | { [key in [ERuleType](../REFERENCE/e-rule-type.md)]?: string \| (string \| null)[] } | ✓ | - | 规则选择表：Key 为规则类（ERuleType 的取值），Value 为所选规则名。 每个规则类下通常只能选择一个规则，因此 Value 多为字符串； 但**网络长度公差**是特例——它用数组额外携带目标网络，即 `[规则名, 目标网络]`，读取时取数组首元素作为规则名。 ⚠️ 该数组的**第 2 项（目标网络）可以为 `null`**（配对编码器会写 `null`）， 故元素类型放宽为 `string \| null`。 |
| copperValue | { [[ERuleType](../REFERENCE/e-rule-type.md).COPPER]?: string \| null } | ✓ | - | 铺铜规则(选择值) |
| innerPlaneValue | { [[ERuleType](../REFERENCE/e-rule-type.md).PLANE]?: string \| null } | ✓ | - | 内电层规则(选择值) |
| parent | `(string \| number \| (string \| number)[])[]` |  | - | 父选择器：**只在 PCB 侧写出**，写法为——普通选择器写 `null`（不是 `undefined`）， `DIFF_PAIR` 选择器则写**所属组名**（字符串）。 SCH 侧为手写对象、**不写该字段**。 ⚠️ 「PCB 一定带它」**不成立**：历史数据里 535 条 PCB `RULE_SELECTOR` **全部没有**该键， 读取端必须容忍整体缺省。 ⚠️ 声明类型是数组成员，`DIFF_PAIR` 写组名字符串的情形与之不符，读取端请按实际数据放宽。 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-rule-selector-wire.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `ruleOrder`: 必需字段 |
| required | ERROR | `ruleKeyValue`: 必需字段 |
| required | ERROR | `copperValue`: 必需字段 |
| required | ERROR | `innerPlaneValue`: 必需字段 |
| minimum | ERROR | `ruleOrder`: 最小值: 0 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/SCH/t-rule-selector-wire.md)

