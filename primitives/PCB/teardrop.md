# TPcbTeardrop

> 返回 [PCB 图元索引](../../documents/PCB.md)

## 定义

泪滴

**行为约定**：当它关联的图元（焊盘 / 多边形焊盘 / 走线 / 圆弧走线 / 过孔）被
**修改或删除**时，EDA 会**自动把泪滴删掉**（`TearService` 监听这些图元的
MODIFY / DELETE 后派发删除；`keepTear` 为真时除外）。

⚠️ 2.0 文档里的「泪滴**不可选中、不可直接操作**」**在 3.0 不成立**：
泪滴默认可拾取、有专门的选中右键菜单，也会被顶点控制点工具当成普通多边形处理。

【联动增删·必须成组操作】泪滴由 `refs` 指向它依附的焊盘/过孔/走线，是**从属数据**：
**被它引用的图元被删除时，必须把泪滴一并删除**（不能留下悬空的 refs）。

id 由编辑器生成（随机 16 位十六进制），形态见 [TElementId](../REFERENCE/t-element-id.md)。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| groupId | [TElementId](../REFERENCE/t-element-id.md) | ✓ | - | 分组编号：相同值的图元属于同一组；**未分组时的取值见下**。 ⚠️ **未分组写的是数字 `0`**（不是字符串 `"0"`）——真实数据里 `"groupId":0` 出现 5 千余次，而 `"groupId":"0"` **一次都没有**；FOOTPRINT 文档下该字段**恒为 0**。 成组时才是字符串（组合 id）；未分组的判定是「`groupId` 为空或 FOOTPRINT 文档」，此时写**数字 0**。 ⚠️ 上方的类型 `string` 比实际形态窄（装不下数字 0）——**放宽类型会波及 pro-* 仓的 消费方，需跨仓协调后再改**，故此处暂以说明为准。本文件各 `@example` 里的 `"groupId":"0"` 也是同一问题，同理按“说明为准”处理。 |
| locked | `boolean` | ✓ | - | 是否锁定：锁定后**不能拖拽、不能删除、不能用鼠标键盘调整大小、不能调整形状**。 实际是以**锁弹窗**（`ActionForLockedObjectsDialog`）拦截，用户可在弹窗里选 「解锁并继续」，所以不是硬禁止。 |
| layerId | number \| [ELayerCode](../REFERENCE/e-layer-code.md) | ✓ | - | 层编号。 **第几号是哪一层见 [ELayerCode](../REFERENCE/e-layer-code.md)** —— 那是层编号的枚举（`1` = 顶层、`47` = 孔层 …）， 里面逐条写了每个编号对应的**层类型字符串名**。 ⚠️ 类型写成 **`number \| ELayerCode`** 而不是单用枚举：实际数据里层号本来就是普通数字， 消费方大量按 `number` 传值，收紧成枚举会让那些构造点编译不过。 |
| partitionId | [TElementId](../REFERENCE/t-element-id.md) \| null |  | - | 所属分区编号，为null表示无分区：**值是 `PARTITION` 行的外壳 `id`**（图元 id，不是 uuid） |
| netName | `string` | ✓ | - | NET，网络名称 |
| path | [TPcbSinglePolygon](../REFERENCE/t-pcb-single-polygon.md) | ✓ | - | 泪滴形状：**本身就是一个单多边形**（[TPcbSinglePolygon](../REFERENCE/t-pcb-single-polygon.md)，首尾自动闭合的一条不间断线）， 不是多边形的数组。 泪滴解析走 `ParsePath`，**不支持** `["R", ...]` 矩形形态 （仅支持 `["CIRCLE", cx, cy, r]` 整圆与指令序列）。 |
| refs | [TElementId](../REFERENCE/t-element-id.md)[] |  | - | **正向**关联的图元编号：记录的是「本图元引用了哪些图元」（如引用的基准线 id 放在首位）。 【联动增删·解引用不删对方】被引用的图元被删除时，本图元**保留**， 只把引用字段清空并重新上传（不是连带删除）。 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-pcb-teardrop.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `layerId`: 必需字段 |
| required | ERROR | `netName`: 必需字段 |
| required | ERROR | `path`: 必需字段 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PCB/t-pcb-teardrop.md)

