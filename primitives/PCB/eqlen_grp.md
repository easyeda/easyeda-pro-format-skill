# TEQLenGrp

> 返回 [PCB 图元索引](../../documents/PCB.md)

## 定义

等长组

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| name | `string` | ✓ | - | 等长组名称 |
| sort | `number` | ✓ | - | 排序 |
| pads | `[string, string][]` | ✓ | - | 用 `位号:焊盘编号` 标识焊盘的数组 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/teq-len-grp.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `name`: 必需字段 |
| required | ERROR | `sort`: 必需字段 |
| required | ERROR | `pads`: 必需字段 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PCB/teq-len-grp.md)

