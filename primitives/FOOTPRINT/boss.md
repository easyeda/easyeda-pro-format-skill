# TPcbBoss

> 返回 [FOOTPRINT 图元索引](../../documents/FOOTPRINT.md)

## 定义

螺丝柱

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| partitionId | `string \| null` |  | - | 所属分区编号，为null表示无分区 |
| groupId | `string` | ✓ | - | 分组编号：相同值的图元属于同一组；**未分组时的取值见下**。 ⚠️ **未分组写的是数字 `0`**（不是字符串 `"0"`）——真实数据里 `"groupId":0` 出现 5 千余次，而 `"groupId":"0"` **一次都没有**；FOOTPRINT 文档下该字段**恒为 0**。 成组时才是字符串（组合 id）；未分组的判定是「`groupId` 为空或 FOOTPRINT 文档」，此时写**数字 0**。 ⚠️ 上方的类型 `string` 比实际形态窄（装不下数字 0）——**放宽类型会波及 pro-* 仓的 消费方，需跨仓协调后再改**，故此处暂以说明为准。本文件各 `@example` 里的 `"groupId":"0"` 也是同一问题，同理按“说明为准”处理。 |
| layerId | `number` | ✓ | - | 层编号 |
| locked | `boolean` | ✓ | - | 是否锁定 |
| zIndex | `number \| null` | ✓ | default: -1 | 同层内的叠放次序（渲染排序键，格式里没有高度语义）。 **它是独立字段，不由 id 推导**：3.0 里未设置时写盘为 **-1**（内部实现即 `_zIndex \|\| -1`；真实数据 `"zIndex":-1` 出现 4 千余次）。**例外**：`ATTR` / `META` 的默认体直接写 `null`。 「由 id 尾部数字推导」是 **2.0 的语义**（2.0 的 `getZIndex` + `idReg`；那个正则也 匹配不了 3.0 的随机 16 位十六进制 id）。**不要照它推导 3.0 的值。** ⚠️ **VIA 是个特例：3.0 写盘不会产出该键**——写盘端的 switch 里**没有** zIndex 分支 （虽然槽位表里有该槽位），取值为 `undefined` 时会被 JSON 序列化整个丢弃。 但**真机存量里仍能遇到 2.0 遗留的带 `zIndex` 的 VIA 行**（样本 15455 条 VIA 中 10404 条载荷含该键，其值恰好等于 id 尾部的数字——正是上面说的「2.0 语义」）。 **读盘时不要假设它不存在。** |
| centerX | `number` | ✓ | - | 中心 X |
| centerY | `number` | ✓ | - | 中心 Y |
| specification | `ESpecification \| null` | ✓ | - | 取值范围：M2（M2 螺丝）、M3（M3 螺丝）、M4（M4 螺丝）、M5（M5 螺丝）、M6（M6 螺丝） |
| depth | `number` | ✓ | - | 螺丝柱高度 |
| thickness | `number` | ✓ | - | 螺丝柱壁厚 |
| holeDiameter | `number` | ✓ | - | 螺丝柱通孔直径 |
| counterBore | `{ height: number; diameter: number } \| null` | ✓ | - | 沉头所需参数 当此参数为 null 时表示不需要沉头 |
| stiffener | `{ topWidth: number; bottomWidth: number; height: number; stiffThickness: number } \| null` | ✓ | - | 加强筋所需参数，当此参数为 null 时表示不需要加强筋 |

## 对象字段成员

以下字段的类型是内联对象，成员定义如下：

### `counterBore`

沉头所需参数 当此参数为 null 时表示不需要沉头

| 成员 | 类型 | 必需 | 说明 |
|------|------|------|------|
| height | `number` | ✓ | 沉头孔高度 |
| diameter | `number` | ✓ | 沉头孔直径 |

### `stiffener`

加强筋所需参数，当此参数为 null 时表示不需要加强筋

| 成员 | 类型 | 必需 | 说明 |
|------|------|------|------|
| topWidth | `number` | ✓ | 加强筋上端宽度 |
| bottomWidth | `number` | ✓ | 加强筋下端宽度 |
| height | `number` | ✓ | 加强筋高度 |
| stiffThickness | `number` | ✓ | 加强筋厚度 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-pcb-boss.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `layerId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `centerX`: 必需字段 |
| required | ERROR | `centerY`: 必需字段 |
| required | ERROR | `specification`: 必需字段 |
| required | ERROR | `depth`: 必需字段 |
| required | ERROR | `thickness`: 必需字段 |
| required | ERROR | `holeDiameter`: 必需字段 |
| required | ERROR | `counterBore`: 必需字段 |
| required | ERROR | `stiffener`: 必需字段 |
| enum | ERROR | `specification`: 允许值: M2, M3, M4, M5, M6, null |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/FOOTPRINT/t-pcb-boss.md)

