# TGroupDataDocUuid

> 返回 [REFERENCE 类型索引](../../documents/REFERENCE.md)

## 定义

文档 uuid —— **分组数据文档**

⚠️ **本类型不是格式图元**（本目录都是这类 id 说明），它**不占任何一行数据**，也**没有字段用它当类型**。

形如 `<instancePath>@<groupUuid>` —— 用 `@` 把两段拼起来：

| 段 | 是什么 | 值从哪来 |
| -- | ------ | -------- |
| `@` **前** | **实例路径** —— 就是 [TInstanceDocUuid](./t-instance-doc-uuid.md) 那种标识 | 这份分组数据作用的那个实例页路径 |
| `@` **后** | **元件分组文档（`COMPONENT_GROUP`）的 uuid** | 新建元件分组时现生成的一枚随机 uuid |

一个组合对 = **一个实例路径 × 一个元件分组**；用在变体 / 装配变量族上。

## 为什么这么拼

因为读取端要能**光看文档标识就反推它属于哪个原理图**：
先 `split('@')` 取出后半段的元件分组 uuid，再去那份元件分组的 `META.schematicId` 拿到原理图 uuid
—— `.evar` 文件的路径解析、以及「按原理图作用域整文件嵌入」都依赖这一步。

⚠️ 按 `@` 切分是安全的：**前半段的实例路径本身不含 `@`**（它只用 `_$` 与 `~`）。

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-group-data-doc-uuid.json)

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/REFERENCE/t-group-data-doc-uuid.md)

