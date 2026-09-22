# TLocalElementId

> 返回 [REFERENCE 类型索引](../../documents/REFERENCE.md)

## 定义

局部图元 id —— **复合 id 去掉父前缀后的那一段**

⚠️ **本类型不是格式图元**（本目录都是这类 id 说明），它**不占任何一行数据**。

封装内的子图元（焊盘、封装图元）在盘上被拆成两段写：
**父元件 id + 子图元局部 id** —— 外壳 `id` 属 [TCompositeElementId](./t-composite-element-id.md)，
本类型只是它的后半段。存局部 id 的字段**不能单独用来定位**，
必须先和它同一条记录里的父元件 id **拼回去**才是完整 id。

例：`PAD_NET.padId` / `FOOTPRINT_NET.primitiveId` 存的是局部段，
完整 id = 同记录里的 `componentId` + 本段——写盘端就是这么从子图元自身的 id
里把父前缀剥掉得到的。

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-local-element-id.json)

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/REFERENCE/t-local-element-id.md)

