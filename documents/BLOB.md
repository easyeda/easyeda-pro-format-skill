# BLOB

> 返回 [SKILL.md](../SKILL.md) 入口文档

## 领域概述

BLOB 是嘉立创 EDA 格式中的二进制数据文档类型，目前仅用于存储图片数据。BLOB 数据全工程共用，对应图页中只记录数据的 UUID，避免重复存储。BLOB 文件存储图片的文件名和 base64 编码的内容（如 data:image/svg+xml;base64,...）。
## 图元索引

| 类型 | 简述 | 定义 |
|------|------|------|
| TMBlob | BLOB | [详细](../primitives/BLOB/blob.md) |

## Related Resources

- [返回 SKILL.md](../SKILL.md)
- [所有 primitives](../primitives/)
- [所有 examples](../examples/)

