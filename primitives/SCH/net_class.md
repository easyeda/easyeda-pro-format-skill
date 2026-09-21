# TNetClass

> 返回 [SCH 图元索引](../../documents/SCH.md)

## 定义

网络类

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| name | `string` | ✓ | - | 名称：**写盘端编码进外壳 `id`、不写进载荷**（id 形如 `["NET_CLASS","AAS"]`）； 解析端从 id 还原后运行时对象才有它。 |
| nets | `string[]` | ✓ | - | 网络组：网络名称数组（值为网络名，不是图元 id） |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-net-class.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `name`: 必需字段 |
| required | ERROR | `nets`: 必需字段 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/SCH/t-net-class.md)

