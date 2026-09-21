# TPcbTeardrop

> 返回 [PCB 图元索引](../../documents/PCB.md)

## 定义

泪滴

【联动增删·必须成组操作】泪滴由 `refs` 指向它依附的焊盘/过孔/走线，是**从属数据**：
**被它引用的图元被删除时，必须把泪滴一并删除**（不能留下悬空的 refs）。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| groupId | `string` | ✓ | - | 分组编号：相同值的图元属于同一组；**未分组时的取值见下**。 ⚠️ **未分组写的是数字 `0`**（不是字符串 `"0"`）——真实数据里 `"groupId":0` 出现 5 千余次，而 `"groupId":"0"` **一次都没有**；FOOTPRINT 文档下该字段**恒为 0**。 成组时才是字符串（组合 id）；未分组的判定是「`groupId` 为空或 FOOTPRINT 文档」，此时写**数字 0**。 ⚠️ 上方的类型 `string` 比实际形态窄（装不下数字 0）——**放宽类型会波及 pro-* 仓的 消费方，需跨仓协调后再改**，故此处暂以说明为准。本文件各 `@example` 里的 `"groupId":"0"` 也是同一问题，同理按“说明为准”处理。 |
| locked | `boolean` | ✓ | - | 是否锁定 |
| layerId | `number` | ✓ | - | 层编号 |
| partitionId | `string \| null` |  | - | 所属分区编号，为null表示无分区 |
| netName | `string` | ✓ | - | NET，网络名称 |
| path | `any[]` | ✓ | - | 泪滴形状：**本身就是一个单多边形**（首尾自动闭合的一条不间断线），不是多边形的数组。 【单多边形结构】扁平数组：前两个数字是起点坐标，其后是 「指令名 + 该指令参数」的重复序列—— - `L` 直线：`x y L x y x y ...`，各点依次直线相连 - `ARC` 圆弧：`startX startY ARC angle endX endY`（angle 逆时针为正、顺时针为负） - `CARC` 中心圆弧：`startX startY CARC angle endX endY` - `C` 三阶贝塞尔：`x1 y1 C x2 y2 x3 y3 x4 y4 ...`，四个一组为一条曲线 泪滴解析走 `ParsePath`，**不支持** `["R", ...]` 矩形形态 （仅支持 `["CIRCLE", cx, cy, r]` 整圆与上述指令序列）。 |
| refs | `string[]` |  | - | *正向**关联的图元编号：记录的是「本图元引用了哪些图元」（如引用的基准线 id 放在首位）。 【联动增删·解引用不删对方】被引用的图元被删除时，本图元**保留**， 只把引用字段清空并重新上传（不是连带删除）。 |

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

