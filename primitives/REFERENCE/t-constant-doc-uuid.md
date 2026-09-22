# TConstantDocUuid

> 返回 [REFERENCE 类型索引](../../documents/REFERENCE.md)

## 定义

文档 uuid —— **常量文档**

⚠️ **本类型不是格式图元**（本目录都是这类 id 说明），它**不占任何一行数据**，也**没有字段用它当类型**。

**值就是类型名本身**，`FONT` / `CONFIG` / `BLOB` 三种。
这类文档全工程只有一份，不需要用随机 uuid 去区分，所以直接拿类型名当标识。

⚠️ **判别时不能看字符**：它既没有 `_` / `~` / `@` 这些标记、也不是 hex，
只能按**文档类型**认。

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-constant-doc-uuid.json)

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/REFERENCE/t-constant-doc-uuid.md)

