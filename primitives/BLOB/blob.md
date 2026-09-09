# TMBlob

> 返回 [BLOB 图元索引](../../documents/BLOB.md)

## 定义

二进制数据 META 类型

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| filename | `string` | ✓ | - | 文件名 |
| content | `string` | ✓ | - | 二进制内容 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/tm-blob.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `filename`: 必需字段 |
| required | ERROR | `content`: 必需字段 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/BLOB/tm-blob.md)

