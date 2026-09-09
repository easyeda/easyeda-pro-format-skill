# TMConfig

> 返回 [CONFIG 图元索引](../../documents/CONFIG.md)

## 定义

工程配置 META 类型

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| defaultSheet | `string` | ✓ | pattern: ^[0-9a-f]{16}$ | 默认原理图页 ID |

## JSON Schema

→ [查看 JSON Schema](../../schemas/tm-config.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `defaultSheet`: 必需字段 |
| pattern | ERROR | `defaultSheet`: 匹配模式: ^[0-9a-f]{16}$ |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/CONFIG/tm-config.md)

