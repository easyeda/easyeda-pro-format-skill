# TEmbeddedDocUuid

> 返回 [REFERENCE 类型索引](../../documents/REFERENCE.md)

## 定义

文档 uuid —— **宿主内嵌文档**

⚠️ **本类型不是格式图元**（本目录都是这类 id 说明），它**不占任何一行数据**，也**没有字段用它当类型**。

形如 `<宿主 uuid>_<宿主内壳 id>`（宿主 uuid 即一个 [TDocUuid](./t-doc-uuid.md)；**单个下划线**，不会出现 `_$`）。
它是为宿主文档里的**某个图元**就地派生出来的文档 ——
例如 PCB 里把某个元件克隆成「自定义封装」时，就用「当前 PCB 的 uuid + 该元件的内壳 id」
当新文档的 uuid。好处是光看 uuid 就知道它挂在谁身上。

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-embedded-doc-uuid.json)

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/REFERENCE/t-embedded-doc-uuid.md)

