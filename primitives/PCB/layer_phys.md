# TLayerPhys

> 返回 [PCB 图元索引](../../documents/PCB.md)

## 定义

层物理特性配置

一行一条（`type:"LAYER_PHYS"`），**按层**描述它在**物理上**是什么：层材质、
芯板 / 介质层厚度、介电常数、损耗切线（阻抗与叠层计算要用），以及 `zIndex`。

⚠️ **`zIndex` 才是层的物理堆叠顺序** —— 3.0 把物理堆叠从层号与行序里拆了出来，
单放在本类型表达，别再从层号或 `LAYER` 行的先后顺序推断谁在谁上面（详见 [TLayerWire](./layer.md)）。

【外层数据id构造】id 是**数组串** `["LAYER_PHYS", 层号]`，层号沿用 [TLayerWire](./layer.md) 那一套层编号。
⚠️ **层号只存在于 id 里** —— 本类型的载荷**没有** `layerId` 字段，要拿层号必须解析 id。
（数组串是**键式 id**，见 [TKeyedElementId](../REFERENCE/t-keyed-element-id.md)。）

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| material | `string` | ✓ | - | 层材质 |
| thickness | `number` | ✓ | - | 芯板/介质层厚度：**盘值 = 内部厚度（mm）× 10，即盘上以 0.1 mm 为单位** （编码端 `toFix(thickness * 10, 3)`、解码端 `thickness / 10`）。 例：`1.4` = 0.14 mm（铜箔）、`12.6` = 1.26 mm（FR-4 芯板）。 ⚠️ 注意与文件其余长度字段的区别——那些是 mil，本字段是 mm 系。 |
| permittivity | `number` | ✓ | - | 介电常数 |
| lossTangent | `number` | ✓ | - | 损耗切线 |
| isKeepIsland | `boolean` | ✓ | - | 内电层是否保留孤岛 |
| zIndex | `number` | ✓ | - | 顺序大小 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-layer-phys.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `material`: 必需字段 |
| required | ERROR | `thickness`: 必需字段 |
| required | ERROR | `permittivity`: 必需字段 |
| required | ERROR | `lossTangent`: 必需字段 |
| required | ERROR | `isKeepIsland`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PCB/t-layer-phys.md)

