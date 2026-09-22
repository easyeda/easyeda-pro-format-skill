# TNetClassWire

> 返回 [SIMULATION_SCH 图元索引](../../documents/SIMULATION_SCH.md)

## 定义

网络类（**线格式**）

【外层数据id构造】id 是**数组串** `["NET_CLASS", 名称]`，两段各有含义：

- **第 1 段** `"NET_CLASS"` —— 固定前缀，标出这是哪一种记录；
- **第 2 段** —— **网络类的名字**，即用户在工程里给这一组网络起的名字
  （属性面板上显示、可以改的那个文本，**不是任何 id**）。
  它**不在本类型里**：写盘时被编码进 id、读盘时再从 id 还原成解码后形态的 `name`
  （见 `TNetClass`）。所以**载荷里看不到名字，不要以为是漏写**。

⚠️ 它是**键式 id** —— 盘上是数组串（见 [TKeyedElementId](../REFERENCE/t-keyed-element-id.md)），
不要按 16 位 hex 去校验。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| nets | `string[]` | ✓ | - | 网络组：网络名称数组（值为网络名，不是图元 id） |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-net-class-wire.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `nets`: 必需字段 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/SIMULATION_SCH/t-net-class-wire.md)

