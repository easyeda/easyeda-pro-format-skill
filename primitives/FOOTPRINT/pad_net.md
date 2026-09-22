# TPadNetWire

> 返回 [FOOTPRINT 图元索引](../../documents/FOOTPRINT.md)

## 定义

焊盘实例网络映射

**不是画布上的图元**，而是一张「**器件实例的焊盘 ↔ 网络**」的映射表，一行一条
（`type:"PAD_NET"`）：用 `componentId`（元件行 id）+ `padNum`（焊盘编号）+
`padId`（焊盘在封装内的局部 id）定位到具体焊盘，再给出它属于哪个网络（`padNet`）。

引脚长度 `padLen` 与传播延迟 `propagationDelay` 也记在这里，供等长 / 时序分析用。

【联动增删·必须成组操作】它与 `COMPONENT`、`ATTR` 同属一个生命周期：
**新增 COMPONENT 时要一并写出它的 PAD_NET，删除 COMPONENT 时要一并删除**
（详见 [TMPcbComponent](./component.md) 的说明）。

【外层数据id构造】id 是**键式 id** —— 盘上是数组串
`["PAD_NET", 元件 id, 焊盘编号, 封装内局部 id]`，四段各有含义（见 [TKeyedElementId](../REFERENCE/t-keyed-element-id.md)）：
**第 1 段** `"PAD_NET"` 是固定前缀；**第 2~4 段**分别是 `componentId` / `padNum` / `padId`
（`padId` 可为空串）。
⚠️ **这三段只存在于 id 里，载荷里不会再写一遍** —— 写盘时先把它们编进 id、再从载荷里删掉，
读盘时由解码端从 id 回填。**别按「16 位 hex」去认它的 id，它是个 JSON 数组串**。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| partitionId | [TElementId](../REFERENCE/t-element-id.md) \| null |  | - | 所属分区编号，为null表示无分区：**值是 `PARTITION` 行的外壳 `id`**（图元 id，不是 uuid） |
| padNet | `string` | ✓ | - | 网络名 |
| padLen | `number` | ✓ | - | 引脚长度（mil） |
| propagationDelay | `number` | ✓ | - | 传播延迟，3.3+ 新增：**单位 ps（皮秒）**。 表示该焊盘（网络节点）对所属网络总延迟的贡献，与 `padLen` 一起参与等长/时序分析。 默认 0 表示不额外贡献延迟。 |
| attrsMap | `{ [key: string]: any }` |  | - | 自定义属性 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-pad-net-wire.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `padNet`: 必需字段 |
| required | ERROR | `padLen`: 必需字段 |
| required | ERROR | `propagationDelay`: 必需字段 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/FOOTPRINT/t-pad-net-wire.md)

