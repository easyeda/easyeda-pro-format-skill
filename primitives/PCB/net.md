# TNet

> 返回 [PCB 图元索引](../../documents/PCB.md)

## 定义

配置网络信息

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| netType | `string \| null` | ✓ | - | 网络类型：null 为无类型 |
| specialColor | `string \| null` | ✓ | pattern: ^$\|^#[0-9A-Fa-f]{6}$ | 特殊颜色：null 为无特殊颜色 |
| retLine | `boolean` | ✓ | - | 是否显示飞线 |
| differentialName | `string \| null` | ✓ | - | 差分对名称：null 为非差分对 |
| isPositiveNet | `boolean` | ✓ | - | 是否差分对正极 |
| equalLengthGroupName | `string \| null` | ✓ | - | 等长组名称：null 为非等长组 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-net.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `netType`: 必需字段 |
| required | ERROR | `specialColor`: 必需字段 |
| required | ERROR | `retLine`: 必需字段 |
| required | ERROR | `differentialName`: 必需字段 |
| required | ERROR | `isPositiveNet`: 必需字段 |
| required | ERROR | `equalLengthGroupName`: 必需字段 |
| pattern | ERROR | `specialColor`: 匹配模式: ^$\|^#[0-9A-Fa-f]{6}$ |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PCB/t-net.md)

