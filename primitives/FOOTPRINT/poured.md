# TPcbPoured

> 返回 [FOOTPRINT 图元索引](../../documents/FOOTPRINT.md)

## 定义

覆铜结果

【联动增删·必须成组操作】POURED 是 POUR 的**计算结果**，靠 id 挂在其父 POUR 下
（id 形如 `["POURED", <POUR 的 id>]`）：
- **有 POUR 才写 POURED**；**删除 POUR 时必须一并删除它的 POURED**，否则残留悬空记录。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| pourFill | `TPourFill[]` | ✓ | - |  |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-pcb-poured.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `pourFill`: 必需字段 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/FOOTPRINT/t-pcb-poured.md)

