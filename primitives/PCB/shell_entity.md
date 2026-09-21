# TPcbShellEntity

> 返回 [PCB 图元索引](../../documents/PCB.md)

## 定义

外壳实体区域

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| partitionId | `string \| null` |  | - | 所属分区编号，为null表示无分区 |
| groupId | `string` | ✓ | - | 分组编号：相同值的图元属于同一组；**未分组时的取值见下**。 ⚠️ **未分组写的是数字 `0`**（不是字符串 `"0"`）——真实数据里 `"groupId":0` 出现 5 千余次，而 `"groupId":"0"` **一次都没有**；FOOTPRINT 文档下该字段**恒为 0**。 成组时才是字符串（组合 id）；未分组的判定是「`groupId` 为空或 FOOTPRINT 文档」，此时写**数字 0**。 ⚠️ 上方的类型 `string` 比实际形态窄（装不下数字 0）——**放宽类型会波及 pro-* 仓的 消费方，需跨仓协调后再改**，故此处暂以说明为准。本文件各 `@example` 里的 `"groupId":"0"` 也是同一问题，同理按“说明为准”处理。 |
| layerId | `number` | ✓ | - | 层编号 |
| locked | `boolean` | ✓ | - | 是否锁定 |
| zIndex | `number \| null` | ✓ | default: -1 | 同层内的叠放次序（渲染排序键，格式里没有高度语义）。 **它是独立字段，不由 id 推导**：3.0 里未设置时写盘为 **-1**（内部实现即 `_zIndex \|\| -1`；真实数据 `"zIndex":-1` 出现 4 千余次）。**例外**：`ATTR` / `META` 的默认体直接写 `null`。 「由 id 尾部数字推导」是 **2.0 的语义**（2.0 的 `getZIndex` + `idReg`；那个正则也 匹配不了 3.0 的随机 16 位十六进制 id）。**不要照它推导 3.0 的值。** ⚠️ **VIA 是个特例：3.0 写盘不会产出该键**——写盘端的 switch 里**没有** zIndex 分支 （虽然槽位表里有该槽位），取值为 `undefined` 时会被 JSON 序列化整个丢弃。 但**真机存量里仍能遇到 2.0 遗留的带 `zIndex` 的 VIA 行**（样本 15455 条 VIA 中 10404 条载荷含该键，其值恰好等于 id 尾部的数字——正是上面说的「2.0 语义」）。 **读盘时不要假设它不存在。** |
| type | `EEntityType` | ✓ | - | 取值范围：SLOT（挖槽）、ENTITY（实体） |
| entityBelong | `EEntityBelong` |  | - | 取值范围：AUTO（自动）、UPPER_SHELLS（上壳）、LOWER_SHELLS（下壳） |
| slotOptions | `ESlotOption[]` |  | - | 挖槽 - 选项。 取值：`OUTLINE` 外壳边框、`SCREW_PILLAR` 螺丝柱、`ENTITY` 实体。 内部的位标志 `Outline=4` / `ScrewPillar=8` / `Entity=16` 会被映射成这三个字符串。 |
| depth | `number` | ✓ | - | 深度 |
| strokeWidth | `number` | ✓ | - | 线宽 |
| path | `any[][]` | ✓ | - | 3D 实体轮廓（**复杂多边形**）：外层数组的每个元素是一条子路径。 【复杂多边形结构】首个子路径是**外轮廓**，其后的每个子路径都是**内洞**； 只有一条子路径时外层数组长度为 1。各子路径的方向按约定 （外轮廓顺时针、内洞逆时针）书写。 ⚠️ 实际读取时**只取首个子路径**（各解码器的 finish() 都会执行 `path = path[0]`），后续内洞当前不会被使用。 【单多边形结构】每条子路径本身是扁平数组：前两个数字是起点坐标，其后是 「指令名 + 该指令参数」的重复序列—— - `L` 直线：`x y L x y x y ...`，各点依次直线相连 - `ARC` 圆弧：`startX startY ARC angle endX endY`（angle 逆时针为正、顺时针为负） - `CARC` 中心圆弧：`startX startY CARC angle endX endY` - `C` 三阶贝塞尔：`x1 y1 C x2 y2 x3 y3 x4 y4 ...`，四个一组为一条曲线 子路径也可整体写成与其它模式互斥的两种独立形态之一： - `["R", x, y, width, height, rot, cornerRadius]` 矩形（x/y 为左上角） —— 共 **7 个元素**，末位是**圆角半径**（不是 `isCCW`/`round`）。 编码为 `['R', x*10, y*10, w*10, h*10, rot°, radius*10]`；解码时 `cornerRadius = info[6] / 10`。 - `["CIRCLE", cx, cy, r]` 整圆 |
| refs | `string[]` |  | - | *正向**关联的图元编号：记录的是「本图元引用了哪些图元」（如引用的基准线 id 放在首位）。 【联动增删·解引用不删对方】被引用的图元被删除时，本图元**保留**， 只把引用字段清空并重新上传（不是连带删除）。 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-pcb-shell-entity.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `layerId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `type`: 必需字段 |
| required | ERROR | `depth`: 必需字段 |
| required | ERROR | `strokeWidth`: 必需字段 |
| required | ERROR | `path`: 必需字段 |
| enum | ERROR | `type`: 允许值: SLOT, ENTITY |
| enum | ERROR | `entityBelong`: 允许值: AUTO, UPPER_SHELLS, LOWER_SHELLS |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PCB/t-pcb-shell-entity.md)

