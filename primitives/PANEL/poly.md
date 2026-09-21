# TPanelPoly

> 返回 [PANEL 图元索引](../../documents/PANEL.md)

## 定义

面板多边形

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| groupId | `string` | ✓ | - | 分组编号：**无组合时写 `"0"`**（仅 2.0 转 3.0 转换腿产生的数据可能是**空串**）。 3.0 格式下是所属组合的 id，无组合时恒为 `"0"`； 2.0 位置化格式下是数字序号（非 0 为组标志，相同组标志的为一组）， 由此转换而来的数据是 `e<数字序号>` 形式。 |
| layer | `number` | ✓ | min: -1 | 层 取值（面板层枚举）： - `1` 打印层（PRINT_LAYER） - `2` 透明控制层（OPACITY_LAYER） - `3` 板框层（BOARD_LAYER） - `4` 板框挖空/挖孔层（BOARD_HOLE） - `5` 背胶挖空层（GLUE_HOLE） - `6` 灯光层（LIGHT_LAYER） - `7` 鼓包层（BUN） - `8` 辅助绘制层（ASSIST，辅助线恒落此层） - `99` 适应所有（APPLY_ALL，虚构层，属于此层的一律导出） 枚举中另有 `-1` 图页-边界层（BOUNDARY_LAYER）。 |
| locked | `boolean` | ✓ | - | 是否锁定 |
| zIndex | `number \| null` | ✓ | default: null | 叠放次序：越大越靠上。检测到重复值时会按图元顺序整体重编号（index+1）， 无重复时原样保留。 **缺省表示是 `null`**（不写 0），读取端把 `null` 当 0 处理。 ⚠️ `null` 与「下限 0」互斥，故本字段**不设下限**，只保留缺省标签。 |
| valid | `boolean` | ✓ | - | 是否生效 |
| visible | `boolean` | ✓ | - | 是否可见 |
| cover | `number \| null` | ✓ | - | 是否加盖遮盖层：0/1 的布尔开关（属性面板的 Cover），与透明度无关。 透明度见 transScope/transPrint/transWhite，遮盖颜色见 TPanelCanvas.coverColor |
| name | `string` | ✓ | - | 名称 |
| rotation | `number` | ✓ | min: 0, max: 360 | 控制点旋转角度（角度制） |
| strokeWidth | `number` | ✓ | min: 0 | 线宽 |
| strokeStyle | `EStrokeStyle \| null` | ✓ | default: null | 取值范围：SOLID（实线）、SHORT_DASH（短划线）、DOT（点线）、DOT_DASH（点划线） |
| strokeColor | `string` | ✓ | pattern: ^(#[0-9A-Fa-f]{6})\|(rgb\(\d{1,3},\d{1,3},\d{1,3}\))\|(cmyk\(\d{1,3},\d{1,3},\d{1,3},\d{1,3}\))\|$ | 描边颜色 |
| fillColor | `string` | ✓ | pattern: ^$\|^(#[0-9A-Fa-f]{6})\|(rgb\(\d{1,3},\d{1,3},\d{1,3}\))\|(cmyk\(\d{1,3},\d{1,3},\d{1,3},\d{1,3}\))$\|^(data:)\|(blob:) | 填充 1.无填充模式："" 2.颜色模式：#FF00FF 3.图片内嵌模式：data,base64,xxxxaaa134234 4.图片外部引用模式：blob:hashid |
| opacity | `number` | ✓ | min: 0, max: 1 | 不透明度：0 - 1 |
| autoClose | `boolean` | ✓ | - | 是否自动闭合首尾端点 |
| ploys | `any[][]` | ✓ | - | 复杂多边形路径：外层数组的每个元素是一条子路径（首环为外轮廓，后续为内洞）。 **首元素是形态标记**，决定这一条怎么解释；解析端也只在外层长度为 1 时按首元素分派： - `'R'` —— 矩形：`["R", 0, 0, 1, 1, rx, ry, 0, 0]` - `'ELLIPSE'` —— 椭圆：`["ELLIPSE", 0, 0, 1, 1, 0, 0]` - `'M'` —— 圆弧：`["M", x1, -y1, "A"\|"CA", rx, ry, angle, large, sweep, x2, -y2]`， 第 4 个 token 为 `'A'` 表示两点弧、`'CA'` 表示中心弧 - **既非 `'R'` 也非 `'ELLIPSE'`/`'M'`** —— 复杂多边形：此时首元素才是坐标， 即**起始的 "M" 已被省略**，前两个数字为起点坐标，其后是 「指令名 + 该指令参数」的重复序列。例： `[237.402, 1864.961, "A", 227.46, 227.46, 0, 1, 1, 529.921, 1527.953]` 等价于 `M 237.402 1864.961 A 227.46 227.46 0 1 1 529.921 1527.953`。 指令为绝对坐标指令（M / L / A / C / Q / Z），不使用相对坐标指令。 |
| displayFill | `boolean` | ✓ | - | 是否显示填充：**必填**，写盘恒写出（写入的是**图元自己的值**，用户可在属性面板切换， 并非写盘端取常量赋值） |
| displayStroke | `boolean` | ✓ | - | 是否显示描边：**必填**，写盘恒写出（同 displayFill：值随图元、用户可切换） |
| matrix | `number[] \| null` | ✓ | - | 变换矩阵：6 元仿射 `[a, b, c, d, e, f]`，**Y 轴镜像空间**下的矩阵 （写盘时按 Y 镜像做共轭：`MIRROR_Y · matrix · MIRROR_Y`）； `[1, 0, 0, 0, 1, 0]` 为单位阵。 ⚠️ **POLY 没有 `x` / `y` 字段，图元位置只能由本矩阵承载**：位置即矩阵的 **平移分量（第 5 / 6 元）**；写纯平移用 `[1, 0, x, 0, 1, y]`（注意写出后会经上述 Y 镜像共轭）。 旋转 / 缩放同样都在矩阵里；`rotation` 是**控制点角度**，不是图元位置。 |
| transScope | `EPanelTransScope` |  | - | 取值范围：PRINT（打印）、COVER（遮盖）、PRINT&COVER（打印 + 遮盖） |
| transPrint | `number \| null` |  | - | 自定义打印层不透明度（可选）：被控制范围选中，默认 0.3，未选中，默认 0，范围 0~1 |
| transWhite | `number \| null` |  | - | 自定义遮盖层不透明度（可选）：被控制范围选中，默认 0.3，未选中，默认 0，范围 0~1 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-panel-poly.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `layer`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `valid`: 必需字段 |
| required | ERROR | `visible`: 必需字段 |
| required | ERROR | `cover`: 必需字段 |
| required | ERROR | `name`: 必需字段 |
| required | ERROR | `rotation`: 必需字段 |
| required | ERROR | `strokeWidth`: 必需字段 |
| required | ERROR | `strokeStyle`: 必需字段 |
| required | ERROR | `strokeColor`: 必需字段 |
| required | ERROR | `fillColor`: 必需字段 |
| required | ERROR | `opacity`: 必需字段 |
| required | ERROR | `autoClose`: 必需字段 |
| required | ERROR | `ploys`: 必需字段 |
| required | ERROR | `displayFill`: 必需字段 |
| required | ERROR | `displayStroke`: 必需字段 |
| required | ERROR | `matrix`: 必需字段 |
| minimum | ERROR | `layer`: 最小值: -1 |
| minimum | ERROR | `rotation`: 最小值: 0 |
| maximum | ERROR | `rotation`: 最大值: 360 |
| minimum | ERROR | `strokeWidth`: 最小值: 0 |
| enum | ERROR | `strokeStyle`: 允许值: SOLID, SHORT_DASH, DOT, DOT_DASH, null |
| pattern | ERROR | `strokeColor`: 匹配模式: ^(#[0-9A-Fa-f]{6})\|(rgb\(\d{1,3},\d{1,3},\d{1,3}\))\|(cmyk\(\d{1,3},\d{1,3},\d{1,3},\d{1,3}\))\|$ |
| pattern | ERROR | `fillColor`: 匹配模式: ^$\|^(#[0-9A-Fa-f]{6})\|(rgb\(\d{1,3},\d{1,3},\d{1,3}\))\|(cmyk\(\d{1,3},\d{1,3},\d{1,3},\d{1,3}\))$\|^(data:)\|(blob:) |
| minimum | ERROR | `opacity`: 最小值: 0 |
| maximum | ERROR | `opacity`: 最大值: 1 |
| enum | ERROR | `transScope`: 允许值: PRINT, COVER, PRINT&COVER |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PANEL/t-panel-poly.md)

