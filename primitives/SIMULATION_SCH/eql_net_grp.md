# TEQLenNetGrpWire

> 返回 [SIMULATION_SCH 图元索引](../../documents/SIMULATION_SCH.md)

## 定义

等长网络组（**线格式**）

【外层数据id构造】id 是**键式 id** —— 盘上是数组串 `["EQL_NET_GRP", 名称]`，
两段各有含义（与 [TNetClassWire](./net_class.md) 同理，见 [TKeyedElementId](../REFERENCE/t-keyed-element-id.md)）：

- **第 1 段** `"EQL_NET_GRP"` —— 固定前缀，标出这是哪一种记录；
- **第 2 段** —— **等长网络组的名字**，即用户在工程里给这一组网络起的名字
  （属性面板上显示、可以改的那个文本，**不是任何 id**）。
  它**不在本类型里**：写盘时被编码进 id、读盘时再从 id 还原成解码后形态的 `name`。
  所以**载荷里看不到名字，不要以为是漏写**。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| nets | `string[]` | ✓ | - | 网络组：网络名称数组（值为网络名，不是图元 id） |

## JSON Schema

→ [查看 JSON Schema](../../schemas/teq-len-net-grp-wire.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `nets`: 必需字段 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/SIMULATION_SCH/teq-len-net-grp-wire.md)

