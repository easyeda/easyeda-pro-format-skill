# TSilkOpts

> 返回 [PCB 图元索引](../../documents/PCB.md)

## 定义

丝印配置

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| defaultColor | `string` | ✓ | pattern: ^$\|^#[0-9A-Fa-f]{6}$ | 默认颜色 |
| baseColor | `string` | ✓ | pattern: ^$\|^#[0-9A-Fa-f]{6}$ | 底色 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-silk-opts.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `defaultColor`: 必需字段 |
| required | ERROR | `baseColor`: 必需字段 |
| pattern | ERROR | `defaultColor`: 匹配模式: ^$\|^#[0-9A-Fa-f]{6}$ |
| pattern | ERROR | `baseColor`: 匹配模式: ^$\|^#[0-9A-Fa-f]{6}$ |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PCB/t-silk-opts.md)

