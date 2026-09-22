# TActiveLayer

> 返回 [PCB 图元索引](../../documents/PCB.md)

## 定义

配置当前激活层

一份文档里**只有一条**（`type:"ACTIVE_LAYER"`）：记住**上次停留在哪一层**（`layerId`），
打开文档时据此恢复。

⚠️ 它只是一条**状态记录**，不描述层的任何属性：层的类型 / 别名 / 颜色在 [TLayerWire](./layer.md)，
物理堆叠在 [TLayerPhys](./layer_phys.md)；本类型里只有「哪一层」这一个数，别拿它当层定义用。

id 是**固定单例名** `"ACTIVE_LAYER"`（这类**固定单例 id** 见 [TSingletonElementId](../REFERENCE/t-singleton-element-id.md)）。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| layerId | number \| [ELayerCode](../REFERENCE/e-layer-code.md) | ✓ | - | 层序号：**第几号是哪一层见 [ELayerCode](../REFERENCE/e-layer-code.md)**（`1` = 顶层、`47` = 孔层 …）。 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-active-layer.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `layerId`: 必需字段 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PCB/t-active-layer.md)

