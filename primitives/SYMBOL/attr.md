# TSchAttr

> 返回 [SYMBOL 图元索引](../../documents/SYMBOL.md)

## 定义

原理图属性

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| partId | `string` |  | - | 所属部件编号（**可选**，真机存在整键缺失的 COMPONENT）： **符号页**上表示自身归属于哪个部件，**图页**的元件则指向它**关联的符号文档**里的部件。 取值即目标 `PART` 行的 `id`（`PART` 行只存在于 SYMBOL 文档，见 `TPart`）。 |
| groupId | `string` | ✓ | - | 分组编号；**两种「未成组」形态都表示未成组**： - **3.0 写盘时该键根本不存在**：写入端取 `model.combination?.id`，未成组即 `undefined`， 经 `JSON.stringify` 后整键被丢弃，消费方须**按可选键处理**； - **`""` 只出现在 2.0 迁移数据里**（2.0 → 3.0 转换腿原样带着它）。 |
| locked | `boolean` | ✓ | - | 是否锁定 |
| zIndex | `number \| null` | ✓ | - | 同层内的叠放次序：渲染排序键，数值越小越靠下（格式里没有高度语义） |
| yAxisDirection | `TYAxisDirection` |  | - | Y 轴方向标记：**仅 eprj3 本地文件格式会带**，读盘时被剥离。 取值：`up` **已按 Y 轴向上写出**（本地文件固定用它）、`down` Y 轴向下 （**字段缺失等价于它**，两者是同一件事）。完整语义见 `TYAxisDirection`。 ⚠️ 本基类被多个图元继承，**各自被翻转的字段不同**——完整对照表见 `TYAxisDirection`。 本基类直接覆盖的：`ATTR`/`TEXT`/`PIN`/`COMPONENT` 翻 `y`；`OBJ`/`TABLE` 翻 `startY`； `ARC` 翻 `startY`/`referY`/`endY`；`CIRCLE`/`ELLIPSE` 翻 `centerY` + 内嵌 `text.y`； `RECT` 翻 `dotY1`/`dotY2` + `text.y`；`MASK_REGION` 翻 `dotY1`/`dotY2`；`POLY` 翻 `points` 各项的 `y`；`BEZIER` 翻 `controls` 的奇数下标。 `rotation` / `isMirror` / `zIndex` 与所有幅值字段**不翻**。 |
| parentId | `string` | ✓ | - | 宿主图元的**标识**：**这条属性挂在哪一个图元上**。 ## 怎么用它 本字段的值永远是「**某个图元的 id**」，拿它去找 `id` 相等的那条记录即可。 但**具体是哪种图元、去找哪一行，取决于这条属性所在的位置**（与 PCB 侧只有一种情况不同）： \| 本条属性挂在… \| 本字段的值是 \| 去哪儿找 \| \| --- \| --- \| --- \| \| **图页**上的元件（最常见） \| 该元件的行 `id` \| `type:"COMPONENT"` 里 `id` 相等的那条 \| \| **符号页**、且宿主是符号本体 \| 宿主的 **`partId`**（**不是**它的行 `id`） \| 该**符号文档**里 `type:"PART"` 且 `id` 相等的那条（**PART 行的 `id` 就是 `partId`**；PART 行只存在于 SYMBOL 文档） \| \| **符号页**的引脚（`Pin Name` / `Pin Number` / `Pin Type` / `NO_CONNECT`） \| 该 `PIN` 行的 `id` \| `type:"PIN"` 里 `id` 相等的那条——**引脚在符号页就是独立一行**，这几个属性正是写在这种行上的（真机上 `{"type":"ATTR",…,"parentId":"ie1","key":"Pin Name",…}` 与 `{"type":"PIN","ticket":7,"id":"ie1"}` **成对出现**） \| \| **图页**上元件的引脚 \| 运行时**派生**的引脚 id（形如 `ie90-7fd7c300f6d8ee1b`） \| **盘上没有对应行**——该 id 由模板按 `${符号id}${item.id}` 拼出，别去盘上找 \| \| **导线 / 总线组**（`NET` / `Relevance`） \| 该组的行 `id` \| `type:"WIRE"` / `type:"BUS"` \| \| **矩形 / 圆 / 椭圆**（`Relevance`） \| 该图元的行 `id` \| 对应图元类型 \| \| **图纸 / 标题栏设置**（`Title Block` / `Border` / `SheetNumber` / `Revision` / `CompanyName`…） \| 该**图框元件**的行 `id` \| `type:"COMPONENT"` 里 `id` 相等的那条——真机上这些属性**全挂在同一个图框元件**上（`{"type":"ATTR",…,"parentId":"ie11","key":"Title Block",…}` 对 `{"type":"COMPONENT","ticket":104273,"id":"ie11","firstTicket":13}`），**不是文件级** \| \| **文件级**（悬浮网络标签等） \| 空串 `""` **或** 根 id `"$$root"` \| 不指向任何具体图元 \| ⚠️ **符号页那一行是最大的坑**：同样一套 `Device` / `Symbol` 属性，在图页里本字段指向 `COMPONENT` 的行 id，在符号页里却指向 `PART`（走的是宿主的 `partId` 字段）。 依据：解码时按宿主是否为符号本体分派。 ## ⚠️ 不是什么 - **不是位号**（那是 `key:"Designator"` 那条的 `value`） - **不是器件 / 符号 uuid**（那是 `key:"Device"` / `key:"Symbol"` 那条的 `value`） ## 边界 **文件级属性用空串或 `$$root`，两种都会出现** —— 旧注释说的「`""` 表示属于当前块」 只说对了一半：编码端直接写宿主的 id，而根模型的 id 是字面量 `$$root`， 解码端两者都接受。 |
| key | `string` | ✓ | - | 属性键（与 `value` 一起构成键值对）。 ## 与 PCB 侧的两点关键差异 - **空串在这里会被拒收**：原理图的一致性校验明确要求 `key` 非空 （`Attr` 分支 `if (!data.key) return false;`）。PCB 侧没有这条检查。 - 取值集合以原理图语义为主，与 PCB 侧只有**部分重叠**。 ## 这是一个**开放集合** 写入端不设白名单，自定义 key 合法。下面列的是**会用的值**，不是**允许的值**。 ## 常用（括号内为实测出现量级） - `NET` —— 网络名（最多） - `Device` / `Name` / `Symbol` / `Designator` / `Unique ID` —— 器件 / 名称 / 符号 / 位号 / 唯一 ID - `Value` / `Footprint` / `Description` / `Manufacturer Part` / `Supplier Part` —— 值 / 封装 / 描述 / 制造商编号 / 供应商编号 - `Global Net Name` —— 全局网络名 - `_NETLABEL_` —— 悬浮网络标签 - `NO_CONNECT` —— 非连接标识 - `Relevance` —— 关联元素（导线 / 图形 / 网络标识） - `Pin Name` / `Pin Number` / `Pin Type` —— 引脚名 / 号 / 类型（宿主为引脚） - `Origin Footprint` —— 源封装名 - `Reuse Block` / `Group ID` / `Channel ID` / `Multi-Part Group` —— 复用块 / 分组 / 通道 / 多部件分组 - `Add into BOM` / `Convert to PCB` —— 加入 BOM / 转 PCB - `3D Model` / `3D Model Title` / `3D Model Transform` —— 3D 模型相关 ## 仅原理图侧出现的成套键 - **图框/标题栏**：`Title Block`、`Border`、`Title Block Position`、`Width`、`Height`、 `Region Start`、`X Region Count`、`Y Region Count`、`Blade Width`、`Color` - **图纸变量**（`@` 前缀）：`@Create Date`、`@Project Name`、`@Page No`、 `@Schematic Name`、`@Board Name` 等 - **标题栏文本**：`CompanyName`、`DrawnBy`、`CheckedBy`、`ApprovedBy`、`Address1`…`Address4`、 `SheetNumber`、`SheetTotal`、`DocumentNumber`、`Revision` 等 - **器件模板属性**：`Manufacturer`、`Datasheet`、`Tolerance`、`Temperature Coefficient`、 `Voltage Rated`、`LCSC Part Name` 等（由器件库带出） |
| value | `string` | ✓ | - | 属性 Value |
| keyVisible | `boolean` | ✓ | - | 是否显示 Key |
| valueVisible | `boolean` | ✓ | - | 是否显示 Value |
| x | `number \| null` | ✓ | - | 位置 X：未显示过的属性位置固定为 null |
| y | `number \| null` | ✓ | - | 位置 Y：未显示过的属性位置固定为 null |
| rotation | `number` | ✓ | min: 0, max: 360 | 旋转角度（角度制），绕 位置 旋转 |
| version | `'2.0'` |  | - | 表示来自 2.0 版本 |
| color | `string \| null` | ✓ | - | 字体颜色：`"#RRGGBB"` 十六进制色值；null 表示采用主题默认色 |
| fillColor | `string \| null` | ✓ | - | 字体背景色：`"#RRGGBB"` 十六进制色值；null 表示无背景 / 采用主题默认 ⚠️ **语义随宿主而变**：只有 **TABLE 单元格**上的它才是真正的背景色； 在 TEXT / ATTR 上它与 `color` 同源（同一个颜色字段），且**解码端根本不读它** （只读 `color`），不要把它当独立字段依赖。 |
| fontFamily | `string \| null` | ✓ | - | 字体名称 |
| fontSize | `number \| null` | ✓ | - | 字体大小，与坐标等单位相同 |
| strikeout | `boolean \| null` | ✓ | - | 是否加删除线 |
| underline | `boolean \| null` | ✓ | - | 是否加下划线 |
| italic | `boolean \| null` | ✓ | - | 是否斜体 |
| fontWeight | `boolean \| null` | ✓ | - | 是否加粗 |
| align | `EAlign` | ✓ | - | 取值范围：LEFT_BOTTOM（左底）、CENTER_BOTTOM（中底）、RIGHT_BOTTOM（右底）、LEFT_MIDDLE（左中）、CENTER_MIDDLE（中中）、RIGHT_MIDDLE（右中）、LEFT_TOP（左顶）、CENTER_TOP（中顶）、RIGHT_TOP（右顶） |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-sch-attr.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `parentId`: 必需字段 |
| required | ERROR | `key`: 必需字段 |
| required | ERROR | `value`: 必需字段 |
| required | ERROR | `keyVisible`: 必需字段 |
| required | ERROR | `valueVisible`: 必需字段 |
| required | ERROR | `x`: 必需字段 |
| required | ERROR | `y`: 必需字段 |
| required | ERROR | `rotation`: 必需字段 |
| required | ERROR | `color`: 必需字段 |
| required | ERROR | `fillColor`: 必需字段 |
| required | ERROR | `fontFamily`: 必需字段 |
| required | ERROR | `fontSize`: 必需字段 |
| required | ERROR | `strikeout`: 必需字段 |
| required | ERROR | `underline`: 必需字段 |
| required | ERROR | `italic`: 必需字段 |
| required | ERROR | `fontWeight`: 必需字段 |
| required | ERROR | `align`: 必需字段 |
| enum | ERROR | `yAxisDirection`: 允许值: up, down |
| minimum | ERROR | `rotation`: 最小值: 0 |
| maximum | ERROR | `rotation`: 最大值: 360 |
| enum | ERROR | `version`: 允许值: 2.0 |
| enum | ERROR | `align`: 允许值: LEFT_BOTTOM, CENTER_BOTTOM, RIGHT_BOTTOM, LEFT_MIDDLE, CENTER_MIDDLE, RIGHT_MIDDLE, LEFT_TOP, CENTER_TOP, RIGHT_TOP |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/SYMBOL/t-sch-attr.md)

