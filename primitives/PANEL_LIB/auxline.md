# TAuxLine

> 返回 [PANEL_LIB 图元索引](../../documents/PANEL_LIB.md)

## 定义

辅助线

原子类型取数据流里的实际取值（EPanelDataType.AUX_LINE 的值是 "AUXLINE"，
枚举成员名里的下划线不进数据流）。

⚠️ 本类型继承自 `TPanelBase` 的 `layer` 字段**解析端不读取**：写盘侧虽然照写，
但辅助线恒落在辅助层（**ASSIST = 8**），解码后不会被还原成载荷里写的值。

行外壳的 `id` 是 [TElementId](../REFERENCE/t-element-id.md) 的面板形态（`e` + 16 位小写十六进制、共 17 字符）。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| groupId | [TElementId](../REFERENCE/t-element-id.md) | ✓ | - | 分组编号：**无组合时写 `"0"`**（仅 2.0 转 3.0 转换腿产生的数据可能是**空串**）。 3.0 格式下是所属组合的 id，无组合时恒为 `"0"`； 2.0 位置化格式下是数字序号（非 0 为组标志，相同组标志的为一组）， 由此转换而来的数据是 `e<数字序号>` 形式。 |
| layer | number \| [EPanelLayer](../REFERENCE/e-panel-layer.md) | ✓ | min: -1 | 层：**第几号是哪一层见 [EPanelLayer](../REFERENCE/e-panel-layer.md)**（`1` 打印层、`3` 板框层、`99` 适应所有 …）。 辅助线恒落「辅助绘制层」；`99` 是**虚构层**，属于它的一律导出。 |
| locked | `boolean` | ✓ | - | 是否锁定：锁定后**不能拖拽、不能删除、不能用鼠标键盘调整大小、不能调整形状**， 命中即弹锁告警。⚠️ **已知例外**：`Ctrl` + 拖拽锚点改形那条路径没有锁检查 （需先勾选「锁定图元也可选」的过滤项才能触发）。 |
| zIndex | `number \| null` | ✓ | default: null | 叠放次序：越大越靠上。检测到重复值时会按图元顺序整体重编号（index+1）， 无重复时原样保留。 **缺省表示是 `null`**（不写 0），读取端把 `null` 当 0 处理。 ⚠️ `null` 与「下限 0」互斥，故本字段**不设下限**，只保留缺省标签。 |
| visible | `boolean` | ✓ | - | 是否可见 |
| cover | `number \| null` | ✓ | - | 是否加盖遮盖层：0/1 的布尔开关（属性面板的 Cover），与透明度无关。 透明度见 transScope/transPrint/transWhite，遮盖颜色见 [TPanelCanvas](./canvas.md) 的 `coverColor` |
| name | `string` | ✓ | - | 名称 |
| x | `number` | ✓ | - | X（0.01 inch） |
| y | `number` | ✓ | - | Y（0.01 inch） |
| rotation | `number` | ✓ | min: 0, max: 360 | 旋转角度（角度制，⚠️ **顺时针为正**） ⚠️ 面板里**两套方向相反**：本字段与 `TPanelDimension.rotation` 是**顺时针**， 而 `POLY` / `STRING` 的 `rotation` 是**逆时针**。不要按同一口径读。 另外本字段**兼作类型判别值**：`0` / `180` / `360` = 水平，`90` / `270` = 垂直。 |
| strokeWidth | `number` | ✓ | min: 0 | 线宽（预留，非画布尺寸) 单位：**0.01 inch** |
| strokeStyle | [EStrokeStyle](../REFERENCE/e-stroke-style.md) \| null | ✓ | default: null | 取值范围：SOLID（实线）、SHORT_DASH（短划线）、DOT（点线）、DOT_DASH（点划线） |
| color | `string` | ✓ | pattern: ^(#[0-9A-Fa-f]{6})\|(rgb\(\d{1,3},\d{1,3},\d{1,3}\))\|(cmyk\(\d{1,3},\d{1,3},\d{1,3},\d{1,3}\))\|$ | 颜色 |
| length | `number` | ✓ | min: 0 | 长度：同时充当**点/线的判别值**——辅助点为 `0`，辅助线为 `100`（按图元类型写死） |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-aux-line.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `layer`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `visible`: 必需字段 |
| required | ERROR | `cover`: 必需字段 |
| required | ERROR | `name`: 必需字段 |
| required | ERROR | `x`: 必需字段 |
| required | ERROR | `y`: 必需字段 |
| required | ERROR | `rotation`: 必需字段 |
| required | ERROR | `strokeWidth`: 必需字段 |
| required | ERROR | `strokeStyle`: 必需字段 |
| required | ERROR | `color`: 必需字段 |
| required | ERROR | `length`: 必需字段 |
| minimum | ERROR | `layer`: 最小值: -1 |
| minimum | ERROR | `rotation`: 最小值: 0 |
| maximum | ERROR | `rotation`: 最大值: 360 |
| minimum | ERROR | `strokeWidth`: 最小值: 0 |
| enum | ERROR | `strokeStyle`: 允许值: SOLID, SHORT_DASH, DOT, DOT_DASH, null |
| pattern | ERROR | `color`: 匹配模式: ^(#[0-9A-Fa-f]{6})\|(rgb\(\d{1,3},\d{1,3},\d{1,3}\))\|(cmyk\(\d{1,3},\d{1,3},\d{1,3},\d{1,3}\))\|$ |
| minimum | ERROR | `length`: 最小值: 0 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PANEL_LIB/t-aux-line.md)

