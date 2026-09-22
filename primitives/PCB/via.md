# TPcbVia

> 返回 [PCB 图元索引](../../documents/PCB.md)

## 定义

过孔

PCB / 封装域里的**过孔**，一行一条（`type:"VIA"`）：打通层与层，把不同层的铜连起来。

同为过孔，按**起止层**分为**通孔 / 盲孔 / 埋孔**三类（起止层由 `ruleName`
指向的设计规则决定）；另有一类用于加固的**缝合孔**。

⚠️ 它**不属于任何单一层**，所以本类型特意去掉了 `layerId` —— 它的「层」
是上面那条规则里的起始层与结束层。

id 由编辑器生成（随机 16 位十六进制），形态见 [TElementId](../REFERENCE/t-element-id.md)。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| groupId | [TElementId](../REFERENCE/t-element-id.md) | ✓ | - | 分组编号：相同值的图元属于同一组；**未分组时的取值见下**。 ⚠️ **未分组写的是数字 `0`**（不是字符串 `"0"`）——真实数据里 `"groupId":0` 出现 5 千余次，而 `"groupId":"0"` **一次都没有**；FOOTPRINT 文档下该字段**恒为 0**。 成组时才是字符串（组合 id）；未分组的判定是「`groupId` 为空或 FOOTPRINT 文档」，此时写**数字 0**。 ⚠️ 上方的类型 `string` 比实际形态窄（装不下数字 0）——**放宽类型会波及 pro-* 仓的 消费方，需跨仓协调后再改**，故此处暂以说明为准。本文件各 `@example` 里的 `"groupId":"0"` 也是同一问题，同理按“说明为准”处理。 |
| locked | `boolean` | ✓ | - | 是否锁定：锁定后**不能拖拽、不能删除、不能用鼠标键盘调整大小、不能调整形状**。 实际是以**锁弹窗**（`ActionForLockedObjectsDialog`）拦截，用户可在弹窗里选 「解锁并继续」，所以不是硬禁止。 |
| zIndex | `number \| null` | ✓ | default: -1 | 同层内的叠放次序（渲染排序键，格式里没有高度语义）。 **它是独立字段，不由 id 推导**：3.0 里未设置时写盘为 **-1**（内部实现即 `_zIndex \|\| -1`；真实数据 `"zIndex":-1` 出现 4 千余次）。**例外**：`ATTR` / `META` 的默认体直接写 `null`。 「由 id 尾部数字推导」是 **2.0 的语义**（2.0 的 `getZIndex` + `idReg`；那个正则也 匹配不了 3.0 的随机 16 位十六进制 id）。**不要照它推导 3.0 的值。** ⚠️ **VIA 是个特例：3.0 写盘不会产出该键**——写盘端的 switch 里**没有** zIndex 分支 （虽然槽位表里有该槽位），取值为 `undefined` 时会被 JSON 序列化整个丢弃。 但**真机存量里仍能遇到 2.0 遗留的带 `zIndex` 的 VIA 行**（样本 15455 条 VIA 中 10404 条载荷含该键，其值恰好等于 id 尾部的数字——正是上面说的「2.0 语义」）。 **读盘时不要假设它不存在。** |
| partitionId | [TElementId](../REFERENCE/t-element-id.md) \| null |  | - | 所属分区编号，为null表示无分区：**值是 `PARTITION` 行的外壳 `id`**（图元 id，不是 uuid） |
| netName | `string` | ✓ | - | NET，网络名称 |
| ruleName | `string` | ✓ | - | 过孔层类型：设计规则名称，定义过孔的开始层结束层 |
| centerX | `number` | ✓ | - | 坐标 X（mil） |
| centerY | `number` | ✓ | - | 坐标 Y（mil） |
| holeDiameter | `number` | ✓ | - | 孔直径（mil） |
| viaDiameter | `number` | ✓ | - | 焊盘直径（mil） |
| viaType | [EViaType](../REFERENCE/e-via-type.md) | ✓ | - | 取值范围：NORMAL（通孔(普通过孔)）、BLIND（盲埋孔）、SUTURE（缝合孔） |
| topSolderExpansion | `number \| null` | ✓ | - | 顶层阻焊扩展：null 为遵循规则 |
| bottomSolderExpansion | `number \| null` | ✓ | - | 底层阻焊扩展：null 为遵循规则 |
| unusedInnerLayers | `number[]` | ✓ | - | 隐藏焊盘层（可选）：被隐藏焊盘的层数组 |
| propagationDelay | `number` | ✓ | - | 传播延迟，3.3+ 新增：**单位 ps（皮秒）**。 表示信号经过本过孔所引入的延迟，参与网络总延迟/等长分析（与走线的传播延迟相加）。 默认 0 表示不额外贡献延迟。 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-pcb-via.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `netName`: 必需字段 |
| required | ERROR | `ruleName`: 必需字段 |
| required | ERROR | `centerX`: 必需字段 |
| required | ERROR | `centerY`: 必需字段 |
| required | ERROR | `holeDiameter`: 必需字段 |
| required | ERROR | `viaDiameter`: 必需字段 |
| required | ERROR | `viaType`: 必需字段 |
| required | ERROR | `topSolderExpansion`: 必需字段 |
| required | ERROR | `bottomSolderExpansion`: 必需字段 |
| required | ERROR | `unusedInnerLayers`: 必需字段 |
| required | ERROR | `propagationDelay`: 必需字段 |
| enum | ERROR | `viaType`: 允许值: NORMAL, BLIND, SUTURE |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PCB/t-pcb-via.md)

