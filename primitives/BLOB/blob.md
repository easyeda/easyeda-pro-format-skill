# TMBlob

> 返回 [BLOB 图元索引](../../documents/BLOB.md)

## 定义

二进制数据 META 类型

【id 规则 —— **内容寻址**】id = **`sha256(content)` 的十六进制，64 字符**；
**哈希对象是 `content` 原文（data URL 字符串），不是解码后的二进制**
（见 `sha256Hash(content)`）。

由此推出三条实用性质：
- **同一份内容必得同一个 id** —— 盘上不会为同一张图存两份；
- **改一个字节 id 就变** —— 要换图就写一条**新 id 的新行**，旧行按普通原子删除（置空串）；
- 别的图元引用它时**存的就是这个 id**，引用形态两种：**外链** `blob:<id>`、
  或把整个 `data:` 串**内嵌**在字段里（见各图元 `path` / `fillColor` 的 `@pattern`）。

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

