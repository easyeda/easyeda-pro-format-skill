# TRuleSelector

> 返回 [PCB 图元索引](../../documents/PCB.md)

## 定义

规则选择器

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| ruleSelect | `(string \| number \| (string \| number)[])[]` |  | - | 选择器：`[选择类型, 取值...]` 数组，选择类型如 `'NET'` / `'NET_CLASS'` / `'DIFF_PAIR'` / `'REGION'` / `'POUR'` 等；网络与网络之间的规则则是 「两个选择器数组」的数组，故元素类型含嵌套数组 ⚠️ **不是载荷字段**：写盘时它被移进行的 `id` —— `id` 为 `["RULE_SELECTOR", ruleSelect]`，载荷里**不含**本字段。 解析端会从 id 里把它取回来再注入，故运行时对象上有该字段，但**生成数据时不要写进载荷**。 |
| ruleOrder | `number` | ✓ | min: 0 | 优先级：数值越小，优先级越高 注：该字段同时被当作「规则选择器类型」使用（外部转换器按它取最小值选规则）， 两种语义并存，消费时需留意。 |
| ruleKeyValue | `{ [key in ERuleType]?: string \| (string \| null)[] }` | ✓ | - | 规则选择表：Key 为规则类（ERuleType 的取值），Value 为所选规则名。 每个规则类下通常只能选择一个规则，因此 Value 多为字符串； 但**网络长度公差**是特例——它用数组额外携带目标网络，即 `[规则名, 目标网络]`，读取时取数组首元素作为规则名。 ⚠️ 该数组的**第 2 项（目标网络）可以为 `null`**（配对编码器会写 `null`）， 故元素类型放宽为 `string \| null`。 |
| copperValue | `{ [ERuleType.COPPER]?: string \| null }` | ✓ | - | 铺铜规则(选择值) |
| innerPlaneValue | `{ [ERuleType.PLANE]?: string \| null }` | ✓ | - | 内电层规则(选择值) |
| parent | `(string \| number \| (string \| number)[])[]` |  | - | 父选择器：**只在 PCB 侧写出**，写法为——普通选择器写 `null`（不是 `undefined`）， `DIFF_PAIR` 选择器则写**所属组名**（字符串）。 SCH 侧为手写对象、**不写该字段**。 ⚠️ 「PCB 一定带它」**不成立**：历史数据里 535 条 PCB `RULE_SELECTOR` **全部没有**该键， 读取端必须容忍整体缺省。 ⚠️ 声明类型是数组成员，`DIFF_PAIR` 写组名字符串的情形与之不符，读取端请按实际数据放宽。 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-rule-selector.json)

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

→ [查看示例](../../examples/PCB/t-rule-selector.md)

