# TPanelString

> 返回 [PANEL_LIB 图元索引](../../documents/PANEL_LIB.md)

## 定义

面板文字

面板族（PANEL / PANEL_LIB）里的**文字图元**，一行一条（`type:"STRING"`）。
内容在 `value`，字体族 / 字号 / 粗斜体 / 下划线 / 对齐都在自身字段里；
文字颜色走 `strokeColor`（本类型没有独立的填充色字段）。

⚠️ 与 [TPanelPoly](./poly.md) 一样**没有 `x` / `y`**，位置只在 `matrix` 的平移分量里；`rotation` 是控制点角度。

`path` 是**字形轮廓的缓存**：把文字预先展开成路径，解析端**不加载字体也能渲染**。
注意它是字体轮廓、不是用户绘制的图形，轮廓环**不按字切分**（一个带内洞的字符本身就会占多个元素）。

行外壳的 `id` 口径同 [TPanelPoly](./poly.md)，也是 [TElementId](../REFERENCE/t-element-id.md) 的面板形态（`e` + 16 位小写十六进制、共 17 字符）。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| groupId | [TElementId](../REFERENCE/t-element-id.md) | ✓ | - | 分组编号：**无组合时写 `"0"`**（仅 2.0 转 3.0 转换腿产生的数据可能是**空串**）。 3.0 格式下是所属组合的 id，无组合时恒为 `"0"`； 2.0 位置化格式下是数字序号（非 0 为组标志，相同组标志的为一组）， 由此转换而来的数据是 `e<数字序号>` 形式。 |
| layer | number \| [EPanelLayer](../REFERENCE/e-panel-layer.md) | ✓ | min: -1 | 层：**第几号是哪一层见 [EPanelLayer](../REFERENCE/e-panel-layer.md)**（`1` 打印层、`3` 板框层、`99` 适应所有 …）。 辅助线恒落「辅助绘制层」；`99` 是**虚构层**，属于它的一律导出。 |
| locked | `boolean` | ✓ | - | 是否锁定：锁定后**不能拖拽、不能删除、不能用鼠标键盘调整大小、不能调整形状**， 命中即弹锁告警。⚠️ **已知例外**：`Ctrl` + 拖拽锚点改形那条路径没有锁检查 （需先勾选「锁定图元也可选」的过滤项才能触发）。 |
| zIndex | `number \| null` | ✓ | default: null | 叠放次序：越大越靠上。检测到重复值时会按图元顺序整体重编号（index+1）， 无重复时原样保留。 **缺省表示是 `null`**（不写 0），读取端把 `null` 当 0 处理。 ⚠️ `null` 与「下限 0」互斥，故本字段**不设下限**，只保留缺省标签。 |
| valid | `boolean` | ✓ | - | 是否生效 |
| visible | `boolean` | ✓ | - | 是否可见 |
| cover | `number \| null` | ✓ | - | 是否加盖遮盖层：0/1 的布尔开关（属性面板的 Cover），与透明度无关。 透明度见 transScope/transPrint/transWhite，遮盖颜色见 [TPanelCanvas](./canvas.md) 的 `coverColor` |
| name | `string` | ✓ | - | 名称 |
| rotation | `number` | ✓ | min: 0, max: 360 | 控制点旋转角度（角度制，**逆时针为正**） |
| value | `string` | ✓ | - | 内容 |
| fontFamily | `string` | ✓ | - | 字体名称 |
| fontSize | `number` | ✓ | min: 0 | 字号 单位：**0.01 inch** |
| fontWeight | `number` | ✓ | - | 字体粗细：以数字表达的布尔值（0 常规 / 1 加粗），解析时按真假处理 |
| italic | `boolean` | ✓ | - | 是否斜体 |
| underline | `boolean` | ✓ | - | 是否下划线 |
| strikeout | `boolean` | ✓ | - | 是否删除线 注：当前未启用——3.0 编辑器写盘恒为 false，解析端虽然会取到该值但不并入文本数据 |
| align | [EAlign](../REFERENCE/e-align.md) | ✓ | - | 取值范围：LEFT_BOTTOM（左底）、CENTER_BOTTOM（中底）、RIGHT_BOTTOM（右底）、LEFT_MIDDLE（左中）、CENTER_MIDDLE（中中）、RIGHT_MIDDLE（右中）、LEFT_TOP（左顶）、CENTER_TOP（中顶）、RIGHT_TOP（右顶） |
| strokeColor | `string` | ✓ | pattern: ^(#[0-9A-Fa-f]{6})\|(rgb\(\d{1,3},\d{1,3},\d{1,3}\))\|(cmyk\(\d{1,3},\d{1,3},\d{1,3},\d{1,3}\))\|$ | 颜色 |
| opacity | `number` | ✓ | min: 0, max: 1 | 不透明度：0 - 1 |
| matrix | `number[] \| null` | ✓ | - | 变换矩阵：口径同 [TPanelPoly](./poly.md) 的 `matrix` ⚠️ **STRING 同样没有 `x` / `y`，图元位置只在本矩阵的平移分量（第 5 / 6 元）里**—— 写纯平移用 `[1, 0, x, 0, 1, y]`（会经 Y 镜像共轭）；旋转 / 缩放也在矩阵中。 |
| strokes | `boolean` | ✓ | - | 是否变换描边 |
| path | [TPanelComplexPolygon](../REFERENCE/t-panel-complex-polygon.md) | ✓ | - | 字形轮廓缓存：把文字的字形轮廓预先展开成路径，使解析端无需加载字体即可渲染。 注意这是**字体轮廓的缓存**，不是用户绘制的图形；外层数组的每个元素是 **字形轮廓的一条轮廓环**（单条即 [TPanelSinglePolygon](../REFERENCE/t-panel-single-polygon.md)，整份即 [TPanelComplexPolygon](../REFERENCE/t-panel-complex-polygon.md)）， **不按字切分**——一个带内洞的字符本身就会占多个元素。 |
| transScope | [EPanelTransScope](../REFERENCE/e-panel-trans-scope.md) |  | - | 取值范围：PRINT（打印）、COVER（遮盖）、PRINT&COVER（打印 + 遮盖） |
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

→ [查看示例](../../examples/PANEL_LIB/t-panel-string.md)

