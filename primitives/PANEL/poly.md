# TPanelPoly

> 返回 [PANEL 图元索引](../../documents/PANEL.md)

## 定义

面板多边形

面板族（PANEL / PANEL_LIB）里的**面状图形**，一行一条（`type:"POLY"`）。
面板上按层铺开的图形（板框、挖孔 / 挖空、灯光、鼓包等）都由它表达，
归属哪一层由 `layer` 决定（层的取值见 `TPanelBase`）。

外形是**复杂多边形** `ploys`：**首环为外轮廓、后续各环为内洞**，故一个图元就能画出带孔的形状；
描边与填充可分别用 `displayStroke` / `displayFill` 开关，填充除纯色外还支持**图片内嵌**与**外部引用**。

⚠️ 本类型**没有 `x` / `y`**，位置、旋转、缩放全在 `matrix` 里；`rotation` 只是控制点角度。

行外壳的 `id` 是 [TElementId](../REFERENCE/t-element-id.md) 的**面板形态**：`e` 前缀 + 16 位小写十六进制、共 17 字符。

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
| strokeWidth | `number` | ✓ | min: 0 | 线宽 单位：**0.01 inch** |
| strokeStyle | [EStrokeStyle](../REFERENCE/e-stroke-style.md) \| null | ✓ | default: null | 取值范围：SOLID（实线）、SHORT_DASH（短划线）、DOT（点线）、DOT_DASH（点划线） |
| strokeColor | `string` | ✓ | pattern: ^(#[0-9A-Fa-f]{6})\|(rgb\(\d{1,3},\d{1,3},\d{1,3}\))\|(cmyk\(\d{1,3},\d{1,3},\d{1,3},\d{1,3}\))\|$ | 描边颜色 |
| fillColor | `string` | ✓ | pattern: ^$\|^(#[0-9A-Fa-f]{6})\|(rgb\(\d{1,3},\d{1,3},\d{1,3}\))\|(cmyk\(\d{1,3},\d{1,3},\d{1,3},\d{1,3}\))$\|^(data:)\|(blob:) | 填充 1.无填充模式："" 2.颜色模式：#FF00FF 3.图片内嵌模式：data,base64,xxxxaaa134234 4.图片外部引用模式：blob:hashid |
| opacity | `number` | ✓ | min: 0, max: 1 | 不透明度：0 - 1 |
| autoClose | `boolean` | ✓ | - | 是否自动闭合首尾端点 |
| ploys | [TPanelComplexPolygon](../REFERENCE/t-panel-complex-polygon.md) | ✓ | - | 复杂多边形路径：外层数组的每个元素是一条子路径（单条即 [TPanelSinglePolygon](../REFERENCE/t-panel-single-polygon.md)， 整份即 [TPanelComplexPolygon](../REFERENCE/t-panel-complex-polygon.md)），**首环为外轮廓、后续各环为内洞**。 |
| displayFill | `boolean` | ✓ | - | 是否显示填充：**必填**，写盘恒写出（写入的是**图元自己的值**，用户可在属性面板切换， 并非写盘端取常量赋值） |
| displayStroke | `boolean` | ✓ | - | 是否显示描边：**必填**，写盘恒写出（同 displayFill：值随图元、用户可切换） |
| matrix | `number[] \| null` | ✓ | - | 变换矩阵：6 元仿射 `[a, b, c, d, e, f]`，**Y 轴镜像空间**下的矩阵 （写盘时按 Y 镜像做共轭：`MIRROR_Y · matrix · MIRROR_Y`）； `[1, 0, 0, 0, 1, 0]` 为单位阵。 ⚠️ **POLY 没有 `x` / `y` 字段，图元位置只能由本矩阵承载**：位置即矩阵的 **平移分量（第 5 / 6 元）**；写纯平移用 `[1, 0, x, 0, 1, y]`（注意写出后会经上述 Y 镜像共轭）。 旋转 / 缩放同样都在矩阵里；`rotation` 是**控制点角度**，不是图元位置。 |
| transScope | [EPanelTransScope](../REFERENCE/e-panel-trans-scope.md) |  | - | 取值范围：PRINT（打印）、COVER（遮盖）、PRINT&COVER（打印 + 遮盖） |
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

