# TPanelString

> 返回 [PANEL 图元索引](../../documents/PANEL.md)

## 定义

面板文字

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
| value | `string` | ✓ | - | 内容 |
| fontFamily | `string` | ✓ | - | 字体名称 |
| fontSize | `number` | ✓ | min: 0 | 字号 |
| fontWeight | `number` | ✓ | - | 字体粗细：以数字表达的布尔值（0 常规 / 1 加粗），解析时按真假处理 |
| italic | `boolean` | ✓ | - | 是否斜体 |
| underline | `boolean` | ✓ | - | 是否下划线 |
| strikeout | `boolean` | ✓ | - | 是否删除线 注：当前未启用——3.0 编辑器写盘恒为 false，解析端虽然会取到该值但不并入文本数据 |
| align | `EAlign` | ✓ | - | 取值范围：LEFT_BOTTOM（左底）、CENTER_BOTTOM（中底）、RIGHT_BOTTOM（右底）、LEFT_MIDDLE（左中）、CENTER_MIDDLE（中中）、RIGHT_MIDDLE（右中）、LEFT_TOP（左顶）、CENTER_TOP（中顶）、RIGHT_TOP（右顶） |
| strokeColor | `string` | ✓ | pattern: ^(#[0-9A-Fa-f]{6})\|(rgb\(\d{1,3},\d{1,3},\d{1,3}\))\|(cmyk\(\d{1,3},\d{1,3},\d{1,3},\d{1,3}\))\|$ | 颜色 |
| opacity | `number` | ✓ | min: 0, max: 1 | 不透明度：0 - 1 |
| matrix | `number[] \| null` | ✓ | - | 变换矩阵：口径同 `TPanelPoly.matrix` ⚠️ **STRING 同样没有 `x` / `y`，图元位置只在本矩阵的平移分量（第 5 / 6 元）里**—— 写纯平移用 `[1, 0, x, 0, 1, y]`（会经 Y 镜像共轭）；旋转 / 缩放也在矩阵中。 |
| strokes | `boolean` | ✓ | - | 是否变换描边 |
| path | `any[][]` | ✓ | - | 字形轮廓缓存：把文字的字形轮廓预先展开成路径，使解析端无需加载字体即可渲染。 注意这是**字体轮廓的缓存**，不是用户绘制的图形。 【结构】外层数组的每个元素是一条轮廓子路径，每条子路径是**扁平 SVG 指令 token 数组，且起始的 "M" 已被省略**——前两个数字即起点坐标，其后是 「指令名 + 该指令参数」的重复序列，参数个数由指令决定。 例：`[237.402, 1864.961, "A", 227.46, 227.46, 0, 1, 1, 529.921, 1527.953]` 等价于 `M 237.402 1864.961 A 227.46 227.46 0 1 1 529.921 1527.953`。 指令为绝对坐标指令（M / L / A / C / Q / Z），不使用相对坐标指令。 |
| transScope | `EPanelTransScope` |  | - | 取值范围：PRINT（打印）、COVER（遮盖）、PRINT&COVER（打印 + 遮盖） |
| transPrint | `number \| null` |  | - | 自定义打印层不透明度（可选）：被控制范围选中，默认 0.3，未选中，默认 0，范围 0~1 |
| transWhite | `number \| null` |  | - | 自定义遮盖层不透明度（可选）：被控制范围选中，默认 0.3，未选中，默认 0，范围 0~1 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-panel-string.json)

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
| required | ERROR | `value`: 必需字段 |
| required | ERROR | `fontFamily`: 必需字段 |
| required | ERROR | `fontSize`: 必需字段 |
| required | ERROR | `fontWeight`: 必需字段 |
| required | ERROR | `italic`: 必需字段 |
| required | ERROR | `underline`: 必需字段 |
| required | ERROR | `strikeout`: 必需字段 |
| required | ERROR | `align`: 必需字段 |
| required | ERROR | `strokeColor`: 必需字段 |
| required | ERROR | `opacity`: 必需字段 |
| required | ERROR | `matrix`: 必需字段 |
| required | ERROR | `strokes`: 必需字段 |
| required | ERROR | `path`: 必需字段 |
| minimum | ERROR | `layer`: 最小值: -1 |
| minimum | ERROR | `rotation`: 最小值: 0 |
| maximum | ERROR | `rotation`: 最大值: 360 |
| minimum | ERROR | `fontSize`: 最小值: 0 |
| enum | ERROR | `align`: 允许值: LEFT_BOTTOM, CENTER_BOTTOM, RIGHT_BOTTOM, LEFT_MIDDLE, CENTER_MIDDLE, RIGHT_MIDDLE, LEFT_TOP, CENTER_TOP, RIGHT_TOP |
| pattern | ERROR | `strokeColor`: 匹配模式: ^(#[0-9A-Fa-f]{6})\|(rgb\(\d{1,3},\d{1,3},\d{1,3}\))\|(cmyk\(\d{1,3},\d{1,3},\d{1,3},\d{1,3}\))\|$ |
| minimum | ERROR | `opacity`: 最小值: 0 |
| maximum | ERROR | `opacity`: 最大值: 1 |
| enum | ERROR | `transScope`: 允许值: PRINT, COVER, PRINT&COVER |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PANEL/t-panel-string.md)

