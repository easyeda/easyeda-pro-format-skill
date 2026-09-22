# TFootprintNetWire

> 返回 [FOOTPRINT 图元索引](../../documents/FOOTPRINT.md)

## 定义

封装图元网络映射，component + primitive 作为唯一 key

**不是画布上的图元**，而是一张「**元件实例的封装内图元 ↔ 网络**」的映射表，
一行一条（`type:"FOOTPRINT_NET"`）。

键是 `componentId`（元件行 id）+ `primitiveId`（图元在封装内的**局部** id）——
两者拼起来才是该图元的完整 id（拼接约定与 [TPadNetWire](./pad_net.md) 的 `padId` 相同）。

与 [TPadNetWire](./pad_net.md) 同为网络映射表、只是对象不同：PAD_NET 以**焊盘**为对象，
本类型以**封装内图元**为对象。

【外层数据id构造】id 是**键式 id** —— 盘上是数组串
`["FOOTPRINT_NET", 元件 id, 封装内局部 id]`，三段各有含义（见 [TKeyedElementId](../REFERENCE/t-keyed-element-id.md)）：
**第 1 段** `"FOOTPRINT_NET"` 是固定前缀；**第 2、3 段**分别是 `componentId` 与 `primitiveId`。
⚠️ **这两段只存在于 id 里，载荷里不会再写一遍** —— 写盘时先把它们编进 id、再从载荷里删掉，
读盘时由解码端从 id 回填。**别按「16 位 hex」去认它的 id，它是个 JSON 数组串**。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| net | `string` | ✓ | - | 网络名称 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-footprint-net-wire.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `net`: 必需字段 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/FOOTPRINT/t-footprint-net-wire.md)

