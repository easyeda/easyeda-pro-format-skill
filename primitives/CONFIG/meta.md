# TMConfig

> 返回 [CONFIG 图元索引](../../documents/CONFIG.md)

## 定义

工程配置 META 类型

工程配置文档（`CONFIG`）的 META 行，一行一条（`type:"META"`）：只承载**默认原理图页**的指向
（`defaultSheet`，空串表示未设置）。它与同一份文档里的 [TUniversal](./universal.md) 一起构成工程设置。

工程配置文档的 META 行 id 是**固定单例名** `META`（属**固定单例 id**，见 [TSingletonElementId](../REFERENCE/t-singleton-element-id.md)）。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| defaultSheet | `string` | ✓ | pattern: ^$\|^[0-9a-f]{16}$ | 默认原理图页 ID：**空串合法**（真机存在 `{"defaultSheet":""}`，表示未设置默认图页） |

## JSON Schema

→ [查看 JSON Schema](../../schemas/tm-config.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `defaultSheet`: 必需字段 |
| pattern | ERROR | `defaultSheet`: 匹配模式: ^$\|^[0-9a-f]{16}$ |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/CONFIG/tm-config.md)

