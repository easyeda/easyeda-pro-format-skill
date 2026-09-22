# TPcbShell

> 返回 [FOOTPRINT 图元索引](../../documents/FOOTPRINT.md)

## 定义

外壳

3D 外壳域里的**外壳轮廓**，一行一条（`type:"SHELL"`）：为这块 PCB 描述一个能生成
出来的**立体外壳**，用于 3D 预览与外壳下单。

`shellType` 分**推盖**与**上下壳**两类，两者用到的附加字段不同：推盖用 `direction`
（推盖方向），上下壳用 `bottomHeight` / `topInnerHeight` / `bottomInnerHeight`。

⚠️ 它**不属于任何一层**（本类型去掉了 `layerId`）；外壳的平面轮廓由 `path` 给出。

id 由编辑器生成（随机 16 位十六进制），形态见 [TElementId](../REFERENCE/t-element-id.md)。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| groupId | [TElementId](../REFERENCE/t-element-id.md) | ✓ | - | 分组编号：相同值的图元属于同一组；**未分组时的取值见下**。 ⚠️ **未分组写的是数字 `0`**（不是字符串 `"0"`）——真实数据里 `"groupId":0` 出现 5 千余次，而 `"groupId":"0"` **一次都没有**；FOOTPRINT 文档下该字段**恒为 0**。 成组时才是字符串（组合 id）；未分组的判定是「`groupId` 为空或 FOOTPRINT 文档」，此时写**数字 0**。 ⚠️ 上方的类型 `string` 比实际形态窄（装不下数字 0）——**放宽类型会波及 pro-* 仓的 消费方，需跨仓协调后再改**，故此处暂以说明为准。本文件各 `@example` 里的 `"groupId":"0"` 也是同一问题，同理按“说明为准”处理。 |
| locked | `boolean` | ✓ | - | 是否锁定：锁定后**不能拖拽、不能删除、不能用鼠标键盘调整大小、不能调整形状**。 实际是以**锁弹窗**（`ActionForLockedObjectsDialog`）拦截，用户可在弹窗里选 「解锁并继续」，所以不是硬禁止。 |
| zIndex | `number \| null` | ✓ | default: -1 | 同层内的叠放次序（渲染排序键，格式里没有高度语义）。 **它是独立字段，不由 id 推导**：3.0 里未设置时写盘为 **-1**（内部实现即 `_zIndex \|\| -1`；真实数据 `"zIndex":-1` 出现 4 千余次）。**例外**：`ATTR` / `META` 的默认体直接写 `null`。 「由 id 尾部数字推导」是 **2.0 的语义**（2.0 的 `getZIndex` + `idReg`；那个正则也 匹配不了 3.0 的随机 16 位十六进制 id）。**不要照它推导 3.0 的值。** ⚠️ **VIA 是个特例：3.0 写盘不会产出该键**——写盘端的 switch 里**没有** zIndex 分支 （虽然槽位表里有该槽位），取值为 `undefined` 时会被 JSON 序列化整个丢弃。 但**真机存量里仍能遇到 2.0 遗留的带 `zIndex` 的 VIA 行**（样本 15455 条 VIA 中 10404 条载荷含该键，其值恰好等于 id 尾部的数字——正是上面说的「2.0 语义」）。 **读盘时不要假设它不存在。** |
| partitionId | [TElementId](../REFERENCE/t-element-id.md) \| null |  | - | 所属分区编号，为null表示无分区：**值是 `PARTITION` 行的外壳 `id`**（图元 id，不是 uuid） |
| shellType | [E3DShellOutlineType](../REFERENCE/e3d-shell-outline-type.md) | ✓ | - | 取值范围：DRAWER（推盖）、T&B（上下壳） |
| shellHeight | `number` | ✓ | - | 外壳高度（mil） |
| pcbHeight | `number` | ✓ | - | PCB 高度（mil） |
| strokeWidth | `number` | ✓ | - | 线宽（弃用）（mil） |
| path | [TPcbComplexPolygon](../REFERENCE/t-pcb-complex-polygon.md) | ✓ | - | 3D 外壳外轮廓（**复杂多边形**，即 [TPcbComplexPolygon](../REFERENCE/t-pcb-complex-polygon.md)）：外层数组的每个元素是一条子路径， 每个元素本身又是一个单多边形（[TPcbSinglePolygon](../REFERENCE/t-pcb-single-polygon.md)）。 读法为 **【外轮廓 + 内洞】**，且**只取首个子路径** （解码器的 `finish()` 会执行 `path = path[0]`，后续内洞当前不会被使用）。 |
| thickness | `number` | ✓ | - | 外壳厚度（mil） |
| direction | [E3DShellPushCoverDir](../REFERENCE/e3d-shell-push-cover-dir.md) |  | - | 取值范围：X_AXIS_POSITIVE（X轴正向）、X_AXIS_NEGATIVE（X轴负向）、Y_AXIS_POSITIVE（Y轴正向）、Y_AXIS_NEGATIVE（Y轴负向） |
| bottomHeight | `number` |  | - | 上下壳 - 下壳高度（mil） |
| topInnerHeight | `number` |  | - | 上下壳 - 上壳内壁高度（mil） |
| bottomInnerHeight | `number` |  | - | 上下壳 - 下壳内壁高度（mil） |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-pcb-shell.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `shellType`: 必需字段 |
| required | ERROR | `shellHeight`: 必需字段 |
| required | ERROR | `pcbHeight`: 必需字段 |
| required | ERROR | `strokeWidth`: 必需字段 |
| required | ERROR | `path`: 必需字段 |
| required | ERROR | `thickness`: 必需字段 |
| enum | ERROR | `shellType`: 允许值: DRAWER, T&B |
| enum | ERROR | `direction`: 允许值: X_AXIS_POSITIVE, X_AXIS_NEGATIVE, Y_AXIS_POSITIVE, Y_AXIS_NEGATIVE |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/FOOTPRINT/t-pcb-shell.md)

