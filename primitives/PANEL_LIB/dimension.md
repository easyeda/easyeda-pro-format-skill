# TPanelDimension

> 返回 [PANEL_LIB 图元索引](../../documents/PANEL_LIB.md)

## 定义

面板尺寸工具集

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| layer | `number` | ✓ | min: -1 | 层 取值（面板层枚举）： - `1` 打印层（PRINT_LAYER） - `2` 透明控制层（OPACITY_LAYER） - `3` 板框层（BOARD_LAYER） - `4` 板框挖空/挖孔层（BOARD_HOLE） - `5` 背胶挖空层（GLUE_HOLE） - `6` 灯光层（LIGHT_LAYER） - `7` 鼓包层（BUN） - `8` 辅助绘制层（ASSIST，辅助线恒落此层） - `99` 适应所有（APPLY_ALL，虚构层，属于此层的一律导出） 枚举中另有 `-1` 图页-边界层（BOUNDARY_LAYER）。 |
| locked | `boolean` | ✓ | - | 是否锁定 |
| zIndex | `number \| null` | ✓ | default: null | 叠放次序：越大越靠上。检测到重复值时会按图元顺序整体重编号（index+1）， 无重复时原样保留。 **缺省表示是 `null`**（不写 0），读取端把 `null` 当 0 处理。 ⚠️ `null` 与「下限 0」互斥，故本字段**不设下限**，只保留缺省标签。 |
| valid | `boolean` | ✓ | - | 是否生效 |
| visible | `boolean` | ✓ | - | 是否可见 |
| cover | `number \| null` | ✓ | - | 是否加盖遮盖层：0/1 的布尔开关（属性面板的 Cover），与透明度无关。 透明度见 transScope/transPrint/transWhite，遮盖颜色见 TPanelCanvas.coverColor |
| name | `string` | ✓ | - | 名称 |
| dimensionType | `string` | ✓ | enum: LENGTH-CONSTRAINT, LENGTH-MEASUREMENT, ANGLE-CONSTRAINT, ANGLE-MEASUREMENT, RADIUS-MEASUREMENT, ANGLE, LENGTH | 尺寸类型： LENGTH-CONSTRAINT 长度约束, LENGTH-MEASUREMENT 长度测量, ANGLE-CONSTRAINT 角度约束, ANGLE-MEASUREMENT 角度测量, RADIUS-MEASUREMENT 半径测量, ANGLE 游离角度, LENGTH 游离长度 注：目前编辑器只实现了 LENGTH-CONSTRAINT / LENGTH-MEASUREMENT / RADIUS-MEASUREMENT / ANGLE / LENGTH 五种，ANGLE-CONSTRAINT 与 ANGLE-MEASUREMENT 尚无消费代码。 |
| unit | `string` | ✓ | - | 单位（预留，当前未启用）：写盘恒为空串，解析时不读取。 画布显示单位是另一套配置，与本字段无关。 |
| strokeWidth | `number` | ✓ | min: 0 | 线宽（预留，当前未启用）：写盘恒为 0，解析时不读取 |
| accuracy | `number` | ✓ | - | 精度（预留，当前未启用）：写盘恒为 0，解析时不读取 |
| controlDot | `number[]` | ✓ | - | 控制点 X1 Y1 X2 Y2 X3 Y3 ... 扁平数组，点数随尺寸类型而异： LENGTH-CONSTRAINT / LENGTH-MEASUREMENT / ANGLE / LENGTH 各 4 个点， RADIUS-MEASUREMENT 为 3 个点 |
| relationIds | `string[]` | ✓ | - | 关联图元 id 列表，**基数随尺寸类型变化**： LENGTH-CONSTRAINT / LENGTH-MEASUREMENT 为 `[起点图元 id, 终点图元 id]`（2 个）； RADIUS-MEASUREMENT 为 `[椭圆 id]`（1 个）； ANGLE（游离角度）/ LENGTH（游离长度）为 `[]`。 |
| rotation | `number` | ✓ | min: 0, max: 360 | 旋转角度（角度制） |

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

→ [查看示例](../../examples/PANEL_LIB/t-panel-dimension.md)

