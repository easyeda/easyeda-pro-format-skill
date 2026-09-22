# TPanelDimension

> 返回 [PANEL 图元索引](../../documents/PANEL.md)

## 定义

面板尺寸工具集

面板族（PANEL / PANEL_LIB）里的**尺寸标注 / 约束图元**，一行一条（`type:"DIMENSION"`）：
把两点之间或两个图元之间的长度、角度、半径量出来显示在画布上。
具体是哪一种由 `dimensionType` 决定；几何由扁平的控制点数组 `controlDot` 表达（点数随类型而异），
被标注的对象记在 `relationIds` 里——约束类正是靠这份关联把两端的图元绑定在一起。

⚠️ 本类型**没有分组字段**（`groupId` 已被省略），尺寸工具不参与组合。
⚠️ 删掉被标注的图元时会被一并删除的只有 `LENGTH-CONSTRAINT` / `LENGTH-MEASUREMENT`；
`RADIUS-MEASUREMENT` 不在级联扫描范围内，删掉椭圆会**留下悬空的半径标注**。

行外壳的 `id` 是 [TElementId](../REFERENCE/t-element-id.md) 的面板形态（`e` + 16 位小写十六进制、共 17 字符）；
`relationIds` 里存的关联标识同属这一族。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| layer | number \| [EPanelLayer](../REFERENCE/e-panel-layer.md) | ✓ | min: -1 | 层：**第几号是哪一层见 [EPanelLayer](../REFERENCE/e-panel-layer.md)**（`1` 打印层、`3` 板框层、`99` 适应所有 …）。 辅助线恒落「辅助绘制层」；`99` 是**虚构层**，属于它的一律导出。 |
| locked | `boolean` | ✓ | - | 是否锁定：锁定后**不能拖拽、不能删除、不能用鼠标键盘调整大小、不能调整形状**， 命中即弹锁告警。⚠️ **已知例外**：`Ctrl` + 拖拽锚点改形那条路径没有锁检查 （需先勾选「锁定图元也可选」的过滤项才能触发）。 |
| zIndex | `number \| null` | ✓ | default: null | 叠放次序：越大越靠上。检测到重复值时会按图元顺序整体重编号（index+1）， 无重复时原样保留。 **缺省表示是 `null`**（不写 0），读取端把 `null` 当 0 处理。 ⚠️ `null` 与「下限 0」互斥，故本字段**不设下限**，只保留缺省标签。 |
| valid | `boolean` | ✓ | - | 是否生效 |
| visible | `boolean` | ✓ | - | 是否可见 |
| cover | `number \| null` | ✓ | - | 是否加盖遮盖层：0/1 的布尔开关（属性面板的 Cover），与透明度无关。 透明度见 transScope/transPrint/transWhite，遮盖颜色见 [TPanelCanvas](./canvas.md) 的 `coverColor` |
| name | `string` | ✓ | - | 名称 |
| dimensionType | `string` | ✓ | enum: LENGTH-CONSTRAINT, LENGTH-MEASUREMENT, ANGLE-CONSTRAINT, ANGLE-MEASUREMENT, RADIUS-MEASUREMENT, ANGLE, LENGTH | 尺寸类型： LENGTH-CONSTRAINT 长度约束, LENGTH-MEASUREMENT 长度测量, ANGLE-CONSTRAINT 角度约束, ANGLE-MEASUREMENT 角度测量, RADIUS-MEASUREMENT 半径测量, ANGLE 游离角度, LENGTH 游离长度 注：目前编辑器只实现了 LENGTH-CONSTRAINT / LENGTH-MEASUREMENT / RADIUS-MEASUREMENT / ANGLE / LENGTH 五种，ANGLE-CONSTRAINT 与 ANGLE-MEASUREMENT 尚无消费代码。 |
| unit | `string` | ✓ | - | 单位（预留，当前未启用）：写盘恒为空串，解析时不读取。 画布显示单位是另一套配置，与本字段无关。 |
| strokeWidth | `number` | ✓ | min: 0 | 线宽（预留，当前未启用）：写盘恒为 0，解析时不读取 单位：**0.01 inch** |
| accuracy | `number` | ✓ | - | 精度（预留，当前未启用）：写盘恒为 0，解析时不读取 |
| controlDot | `number[]` | ✓ | - | 控制点 X1 Y1 X2 Y2 X3 Y3 ... 扁平数组，点数随尺寸类型而异： LENGTH-CONSTRAINT / LENGTH-MEASUREMENT / ANGLE / LENGTH 各 4 个点， RADIUS-MEASUREMENT 为 3 个点 |
| relationIds | `string[]` | ✓ | - | 关联图元 id 列表，**基数随尺寸类型变化**： LENGTH-CONSTRAINT / LENGTH-MEASUREMENT 为 `[起点图元 id, 终点图元 id]`（2 个）； RADIUS-MEASUREMENT 为 `[椭圆 id]`（1 个）； ANGLE（游离角度）/ LENGTH（游离长度）为 `[]`。 |
| rotation | `number` | ✓ | min: 0, max: 360 | 旋转角度（角度制，⚠️ **顺时针为正**） ⚠️ 面板里**两套方向相反**：本字段与 `TAuxLine.rotation` 是**顺时针**， 而 `POLY` / `STRING` 的 `rotation` 是**逆时针**。不要按同一口径读。 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-panel-dimension.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `layer`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `valid`: 必需字段 |
| required | ERROR | `visible`: 必需字段 |
| required | ERROR | `cover`: 必需字段 |
| required | ERROR | `name`: 必需字段 |
| required | ERROR | `dimensionType`: 必需字段 |
| required | ERROR | `unit`: 必需字段 |
| required | ERROR | `strokeWidth`: 必需字段 |
| required | ERROR | `accuracy`: 必需字段 |
| required | ERROR | `controlDot`: 必需字段 |
| required | ERROR | `relationIds`: 必需字段 |
| required | ERROR | `rotation`: 必需字段 |
| minimum | ERROR | `layer`: 最小值: -1 |
| enum | ERROR | `dimensionType`: 允许值: LENGTH-CONSTRAINT, LENGTH-MEASUREMENT, ANGLE-CONSTRAINT, ANGLE-MEASUREMENT, RADIUS-MEASUREMENT, ANGLE, LENGTH |
| minimum | ERROR | `strokeWidth`: 最小值: 0 |
| minimum | ERROR | `rotation`: 最小值: 0 |
| maximum | ERROR | `rotation`: 最大值: 360 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PANEL/t-panel-dimension.md)

