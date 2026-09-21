# THarnessEntry

> 返回 [SCH_PAGE 图元索引](../../documents/SCH_PAGE.md)

## 定义

线束入口

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| groupId | `string` | ✓ | - | 分组编号；**两种「未成组」形态都表示未成组**： - **3.0 写盘时该键根本不存在**：写入端取 `model.combination?.id`，未成组即 `undefined`， 经 `JSON.stringify` 后整键被丢弃，消费方须**按可选键处理**； - **`""` 只出现在 2.0 迁移数据里**（2.0 → 3.0 转换腿原样带着它）。 |
| locked | `boolean` | ✓ | - | 是否锁定 |
| zIndex | `number \| null` | ✓ | - | 同层内的叠放次序：渲染排序键，数值越小越靠下（格式里没有高度语义） |
| yAxisDirection | `TYAxisDirection` |  | - | Y 轴方向标记：**仅 eprj3 本地文件格式会带**，读盘时被剥离。 取值：`up` **已按 Y 轴向上写出**（本地文件固定用它）、`down` Y 轴向下 （**字段缺失等价于它**，两者是同一件事）。完整语义见 `TYAxisDirection`。 ⚠️ 本基类被多个图元继承，**各自被翻转的字段不同**——完整对照表见 `TYAxisDirection`。 本基类直接覆盖的：`ATTR`/`TEXT`/`PIN`/`COMPONENT` 翻 `y`；`OBJ`/`TABLE` 翻 `startY`； `ARC` 翻 `startY`/`referY`/`endY`；`CIRCLE`/`ELLIPSE` 翻 `centerY` + 内嵌 `text.y`； `RECT` 翻 `dotY1`/`dotY2` + `text.y`；`MASK_REGION` 翻 `dotY1`/`dotY2`；`POLY` 翻 `points` 各项的 `y`；`BEZIER` 翻 `controls` 的奇数下标。 `rotation` / `isMirror` / `zIndex` 与所有幅值字段**不翻**。 |
| x | `number` | ✓ | - | 入口位置 X |
| y | `number` | ✓ | - | 入口位置 Y |
| rotation | `number` | ✓ | min: 0, max: 360 | 文本旋转角度（角度制） |
| value | `string` | ✓ | - | 入口名称（显示的文本内容） |
| parentId | `string` | ✓ | pattern: ^[0-9a-f]{16}$ | 所属线束连接器的 id |
| harnessType | `string` | ✓ | - | 线束类型-可自定义 |
| color | `string \| null` | ✓ | - | 字体颜色：`"#RRGGBB"` 十六进制色值；null 表示采用主题默认色 |
| fillColor | `string \| null` | ✓ | - | 字体背景色：`"#RRGGBB"` 十六进制色值；null 表示无背景 / 采用主题默认 ⚠️ **语义随宿主而变**：只有 **TABLE 单元格**上的它才是真正的背景色； 在 TEXT / ATTR 上它与 `color` 同源（同一个颜色字段），且**解码端根本不读它** （只读 `color`），不要把它当独立字段依赖。 |
| fontFamily | `string \| null` | ✓ | - | 字体名称 |
| fontSize | `number \| null` | ✓ | - | 字体大小，与坐标等单位相同 |
| strikeout | `boolean \| null` | ✓ | - | 是否加删除线 |
| underline | `boolean \| null` | ✓ | - | 是否加下划线 |
| italic | `boolean \| null` | ✓ | - | 是否斜体 |
| fontWeight | `boolean \| null` | ✓ | - | 是否加粗 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-harness-entry.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `x`: 必需字段 |
| required | ERROR | `y`: 必需字段 |
| required | ERROR | `rotation`: 必需字段 |
| required | ERROR | `value`: 必需字段 |
| required | ERROR | `parentId`: 必需字段 |
| required | ERROR | `harnessType`: 必需字段 |
| required | ERROR | `color`: 必需字段 |
| required | ERROR | `fillColor`: 必需字段 |
| required | ERROR | `fontFamily`: 必需字段 |
| required | ERROR | `fontSize`: 必需字段 |
| required | ERROR | `strikeout`: 必需字段 |
| required | ERROR | `underline`: 必需字段 |
| required | ERROR | `italic`: 必需字段 |
| required | ERROR | `fontWeight`: 必需字段 |
| enum | ERROR | `yAxisDirection`: 允许值: up, down |
| minimum | ERROR | `rotation`: 最小值: 0 |
| maximum | ERROR | `rotation`: 最大值: 360 |
| pattern | ERROR | `parentId`: 匹配模式: ^[0-9a-f]{16}$ |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/SCH_PAGE/t-harness-entry.md)

