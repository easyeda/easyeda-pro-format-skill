# TEQLenGrp

> 返回 [FOOTPRINT 图元索引](../../documents/FOOTPRINT.md)

## 定义

等长组

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| name | `string` | ✓ | - | 等长组名称 |
| sort | `number` | ✓ | - | 排序 |
| pads | `[string, string][]` | ✓ | - | 焊盘对数组：**每项是「一对」焊盘**（不是单个焊盘），两个串构成这一对等长关系的两端。 每个串的格式是 **`位号:编号`**，例：`["U1:1","U2:1"]` 表示 U1 的 1 脚与 U2 的 1 脚等长。 |

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

→ [查看示例](../../examples/FOOTPRINT/teq-len-grp.md)

