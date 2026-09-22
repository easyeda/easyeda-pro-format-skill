# TPcbSinglePolygon

> 返回 [REFERENCE 类型索引](../../documents/REFERENCE.md)

## 定义

PCB 单多边形

⚠️ **本类型不是图元、不占任何一行数据**——它是 `BOARD` / `POLY` / `FILL` / `REGION` /
`POUR` / `IMAGE` / `TEARDROP` 等图元的**路径字段的类型**。盘上并不存在「一条
[TPcbSinglePolygon](./t-pcb-single-polygon.md) 记录」，读到 `path` 时按下面的结构解释即可。

**定义**：一条**首尾重合、不间断的线**所描述的区域。
首尾若不重合，读写端都会把它**自动闭合**。

【设计动机】SVG 的 `path` 是对多边形很好的抽象，但 PCB 用不到其中的相对坐标等能力，
且有条件设计一种**更容易解析**的形式，所以仿造 SVG path 造了这一套表达。
本体系内 `POLY` / `REGION` / `POUR` 三者**支持互相转换**
（`POLY` 保留「绘制时连续的一条线」的概念，正是为了这种互转）。

【线格式】扁平数组。**前两个数字是起点坐标**，其后是「指令名 + 该指令参数」的重复序列：
- `L` 直线：`x y L x y x y ...`，各点依次直线相连
- `ARC` 圆弧：`startX startY ARC angle endX endY`（angle 逆时针为正、顺时针为负）
- `CARC` 中心圆弧：`startX startY CARC angle endX endY`
- `C` 三阶贝塞尔：`x1 y1 C x2 y2 x3 y3 x4 y4 ...`，四个一组为一条曲线

⚠️ **`C` 的支持面比另外三个窄**：轮廓解码器（各 `*Decode` 走的
`parseShapeModel` → 指令循环）**只认 `L` / `ARC` / `CARC`**，遇到 `C` 直接抛错；
只有走 `ParsePath` 的路径（如焊盘）才解得了 `C`。
写 `C` 之前请确认目标图元的那条解析路径支持它。

也可以整体写成下面两种**与上述指令序列互斥**的独立形态：
- `["R", x, y, width, height, rot, cornerRadius]` 矩形（x/y 为左上角）
  —— 共 **7 个元素**，末位是**圆角半径**（**不是** 2.0 文档写的 `isCCW` / `round`）。
  编码为 `['R', x*10, y*10, w*10, h*10, rot°, radius*10]`；解码时 `cornerRadius = info[6] / 10`。
- `["CIRCLE", cx, cy, r]` 整圆（**没有** 2.0 文档里的 `isCCW` 末位参数）

⚠️ **各图元对这两种独立形态的支持面并不一致**，以各字段自己的说明为准
（例如泪滴、多边形焊盘都不支持 `["R", …]`）。

坐标与长度单位同 PCB 域：**1 mil**（见 `TPcbBase`）。

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-pcb-single-polygon.json)

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/REFERENCE/t-pcb-single-polygon.md)

