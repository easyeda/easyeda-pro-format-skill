# TNet

> 返回 [PCB 图元索引](../../documents/PCB.md)

## 定义

配置网络信息

一行一条（`type:"NET"`），是**按网络名**给网络挂附加设置的地方：网络类型、特殊颜色、
是否显示飞线、差分对、等长组。

⚠️ 它只承载**网络级的附加设置**，**不描述网络的连接关系** —— 某条网络连了哪些图元，
要看各图元自己的网络名，或 [TPadNetWire](./pad_net.md)。且各设置**大多可缺省**：`netType` / `specialColor` /
`differentialName` / `equalLengthGroupName` 为 `null` 都表示「没设」，别当成「没有」。

【外层数据id构造】id 是**数组串** `["NET", 网络名]`，两段各有含义：
**第 1 段** `"NET"` 是固定前缀；**第 2 段**是**网络的名字**（如 `"GND"`、`"VCC"`），
即工程里那条网络自己的名称文本，**不是任何图元的 id**。
数组串是**键式 id**（见 [TKeyedElementId](../REFERENCE/t-keyed-element-id.md)）。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| netType | `string \| null` | ✓ | - | 网络类型：null 为无类型 |
| specialColor | `string \| null` | ✓ | pattern: ^$\|^#[0-9A-Fa-f]{6}$ | 特殊颜色：null 为无特殊颜色 |
| retLine | `boolean` | ✓ | - | 是否显示飞线 |
| differentialName | `string \| null` | ✓ | - | 差分对名称：null 为非差分对 |
| isPositiveNet | `boolean` | ✓ | - | 是否差分对正极 |
| equalLengthGroupName | `string \| null` | ✓ | - | 等长组名称：null 为非等长组 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-net.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `netType`: 必需字段 |
| required | ERROR | `specialColor`: 必需字段 |
| required | ERROR | `retLine`: 必需字段 |
| required | ERROR | `differentialName`: 必需字段 |
| required | ERROR | `isPositiveNet`: 必需字段 |
| required | ERROR | `equalLengthGroupName`: 必需字段 |
| pattern | ERROR | `specialColor`: 匹配模式: ^$\|^#[0-9A-Fa-f]{6}$ |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PCB/t-net.md)

