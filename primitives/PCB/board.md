# TPcbBoard

> 返回 [PCB 图元索引](../../documents/PCB.md)

## 定义

板子

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| path | `any[][]` | ✓ | - | 板框外形（**复杂多边形**）：外层数组的每个元素是一条子路径。 【复杂多边形结构】首个子路径是**外轮廓**，其后的每个子路径都是**内洞**； 只有一条子路径时外层数组长度为 1。各子路径的方向按约定 （外轮廓顺时针、内洞逆时针）书写。 ⚠️ 实际读取时**只取首个子路径**（各解码器的 finish() 都会执行 `path = path[0]`），后续内洞当前不会被使用。 【单多边形结构】每条子路径本身是扁平数组：前两个数字是起点坐标，其后是 「指令名 + 该指令参数」的重复序列—— - `L` 直线：`x y L x y x y ...`，各点依次直线相连 - `ARC` 圆弧：`startX startY ARC angle endX endY`（angle 逆时针为正、顺时针为负） - `CARC` 中心圆弧：`startX startY CARC angle endX endY` - `C` 三阶贝塞尔：`x1 y1 C x2 y2 x3 y3 x4 y4 ...`，四个一组为一条曲线 子路径也可整体写成与其它模式互斥的两种独立形态之一： - `["R", x, y, width, height, rot, cornerRadius]` 矩形（x/y 为左上角） —— 共 **7 个元素**，末位是**圆角半径**（不是 `isCCW`/`round`）。 编码为 `['R', x*10, y*10, w*10, h*10, rot°, radius*10]`；解码时 `cornerRadius = info[6] / 10`。 - `["CIRCLE", cx, cy, r]` 整圆 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-pcb-board.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `path`: 必需字段 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PCB/t-pcb-board.md)

