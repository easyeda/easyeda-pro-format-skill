# TPcbPoured

> 返回 [PCB 图元索引](../../documents/PCB.md)

## 定义

覆铜结果

**为什么要把覆铜结果单独落盘**：对一块较大的 PCB，每次打开都重算覆铜是不现实的，
所以把计算结果缓存成独立文档。

结果里每一段路径分**填充**与**描边**两类用途：
- **填充**：一般对应实心填充的填充部分；
- **描边**：一般对应热焊盘、网格覆铜，以及实心填充「制造优化」模式下的描边等。

【外层数据id构造】id 是**键式 id** —— 盘上是数组串 `["POURED", 覆铜边框 id]`，
两段各有含义（见 [TKeyedElementId](../REFERENCE/t-keyed-element-id.md)）：
**第 1 段** `"POURED"` 是固定前缀；**第 2 段**是**它所属那条覆铜边框（`POUR` 行）的图元 id**
（[TPcbPour](./pour.md) 的外壳 `id`，普通形态的随机 hex）。所以每条覆铜结果都**挂在它的父 POUR 名下**。

【联动增删·必须成组操作】POURED 是 POUR（[TPcbPour](./pour.md)）的**计算结果**，靠上面那个 id 挂在其父 POUR 下：
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

→ [查看示例](../../examples/PCB/t-pcb-poured.md)

