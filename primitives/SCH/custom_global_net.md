# TCustomGlobalNet

> 返回 [SCH 图元索引](../../documents/SCH.md)

## 定义

自定义全局网络

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| customName | `string` | ✓ | - | 自定义名称 |
| nlNet | `string` | ✓ | - | 网络名 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-custom-global-net.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `customName`: 必需字段 |
| required | ERROR | `nlNet`: 必需字段 |

### 引用关联

以下字段引用其他图元的 id：`nlNet`

nlNet 引用网络名称

## 示例

→ [查看示例](../../examples/SCH/t-custom-global-net.md)

