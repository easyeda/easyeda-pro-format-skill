# TCompositeElementId

> 返回 [REFERENCE 类型索引](../../documents/REFERENCE.md)

## 定义

图元 id（**复合**）—— `<父图元 id>` 与 `<子图元局部 id>` 直接拼起来

⚠️ **本类型不是格式图元**（本目录都是这类 id 说明），它**不占任何一行数据**，也**没有字段用它当类型** ——
它描述的是封装内那些**子图元行外壳自己的 `id`**。

## 怎么生成

**`<父图元 id>` + `<子图元局部 id>`，直接拼接、无分隔符**：
子图元自己带一个局部 id，写盘时把**父元件的 id 前缀**拼上去。
真机一对：`{"type":"COMPONENT",…,"id":"8b03d289a7c042ac"}` 配
`{"type":"ATTR",…,"id":"8b03d289a7c042acbfce15","parentId":"8b03d289a7c042ac"}`。

## 为什么这么拼

光看 id 就知道它挂在谁身上；**元件 id 变更时按前缀整体重写**即可。
代价是**不能按长度或字符集校验**：前缀换了、整条 id 跟着换。

它的**后半段**另有类型语义，见 [TLocalElementId](./t-local-element-id.md)；
不挂父前缀的普通图元 id 则是 [TElementId](./t-element-id.md) 那种随机 hex，两者别混着校验。

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-composite-element-id.json)

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/REFERENCE/t-composite-element-id.md)

