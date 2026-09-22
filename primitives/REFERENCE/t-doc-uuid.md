# TDocUuid

> 返回 [REFERENCE 类型索引](../../documents/REFERENCE.md)

## 定义

文档 uuid —— **普通文档**

⚠️ **本类型不是格式图元**（本目录都是这类 id 说明），它**不占任何一行数据**。

**16 位小写十六进制**，编辑器新建文档时随机生成（或由云端下发）。
普通文档（原理图 / 图页 / PCB / 面板 / 符号 / 封装 / 器件 / 板子 …）都用它。
拿它去**工程库 / 缓存里取那份文档**。

⚠️ **别与图元 id 混为一谈**：图元 id 标识「文档里的一行」，文档 uuid 标识「哪一份文档」。

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-doc-uuid.json)

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/REFERENCE/t-doc-uuid.md)

