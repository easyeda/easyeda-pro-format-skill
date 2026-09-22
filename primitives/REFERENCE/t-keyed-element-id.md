# TKeyedElementId

> 返回 [REFERENCE 类型索引](../../documents/REFERENCE.md)

## 定义

图元 id（**键式**）—— 盘上是 JSON 数组串，id 里带着区分记录的键

⚠️ **本类型不是格式图元**（本目录都是这类 id 说明），它**不占任何一行数据**，也**没有字段用它当类型** ——
它描述的是那些图元**行外壳自己的 `id`**。

## 怎么生成

写成 **`["<类型名>", <键 1>, <键 2>…]`** 这样的 JSON 数组串 ——
一份文档里同一类型可能有多条记录，靠这几个键区分开。

**每一段是什么、由哪几个字段拼成，写在那个类型自己的「【外层数据id构造】」一节里**，这里不重复。
目前有：`LAYER` / `LAYER_3D` / `LAYER_PHYS` / `LAYER_FILL` / `SILK_OPTS` / `NET` /
`PRIMITIVE` / `POURED` / `RULE` / `RULE_SELECTOR` / `X_NET_GROUP`，
以及原理图域的 `DIFFERENTIAL_PAIR` / `NET_CLASS` / `EQL_NET_GRP`。

⚠️ **最要命的一点：有几段的来源字段「只进 id、不进载荷」** —— 光读载荷看不到，必须解析 id 才知道：
`LAYER_PHYS` / `LAYER_FILL` 的**层号**、`RULE` 的**规则类型与规则名**、
`RULE_SELECTOR` 的**选择器标识**、`X_NET_GROUP` 的**组名**。

⚠️ 也因为如此，这类值里**会带 `[` / `]` / 引号**，不是 hex，别按字符集校验。

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-keyed-element-id.json)

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/REFERENCE/t-keyed-element-id.md)

