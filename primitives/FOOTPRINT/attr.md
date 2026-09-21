# TPcbAttr

> 返回 [FOOTPRINT 图元索引](../../documents/FOOTPRINT.md)

## 定义

PCB 属性

挂在元件（`COMPONENT`）下的一条键值属性，如位号、器件名、封装名等。
字段语义见 `key` / `value` / `parentId` 各自的说明。

## 外壳 `id` 是**合成 id**

**本图元的 id 由「父元件 id」+「属性自身局部 id」直接拼接而成，中间没有分隔符**
（`<父元件 globalIndex><局部 id>`）。真实数据形如
`"id":"8b03d289a7c042acbfce15"` 配 `"parentId":"8b03d289a7c042ac"`。
依据：解码端在元件 id 变更时要按前缀重写属性 id（`set index()` 做**前缀替换**）；
同一拼接约定也见于 `PAD_NET` 的焊盘完整 id、多边形子图元等。
⚠️ 所以**本图元的 id 不能当成随机的 16 位十六进制**，它的前缀承载归属关系。

## 分组字段的拼法有两种

⚠️ 与其它 PCB 图元（`groupId`）不同，ATTR 的分组键当前写盘用**大写 `groupID`**。
**但历史数据里 `groupId` 也存在**——实测同一份数据里两种拼法共存（大写那批值恒为数字
`0`，小写那批多为 `""`）。
**读取端两种都要收。**

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| partitionId | `string \| null` |  | - | 所属分区编号，为null表示无分区 |
| groupId | `string` | ✓ | - | 分组编号：相同值的图元属于同一组；**未分组时的取值见下**。 ⚠️ **未分组写的是数字 `0`**（不是字符串 `"0"`）——真实数据里 `"groupId":0` 出现 5 千余次，而 `"groupId":"0"` **一次都没有**；FOOTPRINT 文档下该字段**恒为 0**。 成组时才是字符串（组合 id）；未分组的判定是「`groupId` 为空或 FOOTPRINT 文档」，此时写**数字 0**。 ⚠️ 上方的类型 `string` 比实际形态窄（装不下数字 0）——**放宽类型会波及 pro-* 仓的 消费方，需跨仓协调后再改**，故此处暂以说明为准。本文件各 `@example` 里的 `"groupId":"0"` 也是同一问题，同理按“说明为准”处理。 |
| layerId | `number` | ✓ | - | 层编号 |
| locked | `boolean` | ✓ | - | 是否锁定 |
| zIndex | `number \| null` | ✓ | default: -1 | 同层内的叠放次序（渲染排序键，格式里没有高度语义）。 **它是独立字段，不由 id 推导**：3.0 里未设置时写盘为 **-1**（内部实现即 `_zIndex \|\| -1`；真实数据 `"zIndex":-1` 出现 4 千余次）。**例外**：`ATTR` / `META` 的默认体直接写 `null`。 「由 id 尾部数字推导」是 **2.0 的语义**（2.0 的 `getZIndex` + `idReg`；那个正则也 匹配不了 3.0 的随机 16 位十六进制 id）。**不要照它推导 3.0 的值。** ⚠️ **VIA 是个特例：3.0 写盘不会产出该键**——写盘端的 switch 里**没有** zIndex 分支 （虽然槽位表里有该槽位），取值为 `undefined` 时会被 JSON 序列化整个丢弃。 但**真机存量里仍能遇到 2.0 遗留的带 `zIndex` 的 VIA 行**（样本 15455 条 VIA 中 10404 条载荷含该键，其值恰好等于 id 尾部的数字——正是上面说的「2.0 语义」）。 **读盘时不要假设它不存在。** |
| parentId | `string` | ✓ | - | 宿主元件的**行标识**：本字段的值 **= 某条 `type:"COMPONENT"` 记录的外壳 `id`**。 ## 怎么用它 把所有 `type:"COMPONENT"` 的行捞出来，**哪一条的 `id` 等于本字段，哪一条就是宿主元件**。 一句话：它是**指向另一条数据行的 `id` 的外键**，不是任何"名字"。 真实的一对（注意两行的 id 关系）： ``` {"type":"COMPONENT","ticket":190967,"id":"8b03d289a7c042ac"}\|\|{…} {"type":"ATTR","ticket":190969,"id":"8b03d289a7c042acbfce15"}\|\|{"parentId":"8b03d289a7c042ac",…} ``` ↑ 指向上面那条 COMPONENT 的 id ## ⚠️ 不是什么（三个最容易混的） - **不是位号**。位号是 `key:"Designator"` 那条属性的 **`value`**（如 `"C4"`）。 - **不是器件 uuid**。器件 uuid 是 `key:"Device"` 那条属性的 **`value`**。 - **不是封装 uuid**。封装 uuid 是 `key:"Footprint"` 那条属性的 **`value`**。 本字段与这三者无关 —— 它永远指向**元件的行 id**。 ## 两个边界情况 - **空串 `""` = 游离属性**：不挂任何元件，由封装模板自带（编码端硬编码 `parentId: ''`，用于封装里预置的 `Designator` / `Footprint` 等）。 这类属性解码后不会被任何元件收纳。 - **PCB 文档内**的元件属性如此：实测 3 千余条 ATTR 中，非空 `parentId` 命中某个 `COMPONENT` 的 id（编码端取 `attr.getParent().globalIndex`；解码端用 `componentMap.get(attr.parentIndex)` 把属性挂回元件）。 - ⚠️ **但同一份文件里，原理图 / 符号域的 ATTR 同名字段另有其父**：样本里 762 个不同的 非空 `parentId` 只有 494 个等于某条 `COMPONENT` 的 id，另外约 268 个指向 **原理图域的 `PIN` / `PART` / `WIRE`**。 **不要把两侧的 `parentId` 当成同一种东西**，解析时必须按所在文档域区分。 ## 与"合成 id"的关系 本行的**外壳 `id` 通常以本字段为前缀**（`<parentId><局部 id>`，见上方类型说明）。 ⚠️ 但这不是绝对的：老数据里也存在**独立的随机 16 位十六进制** id。无论哪种写法， `parentId` 的含义都不变。 |
| x | `number \| null` | ✓ | - | 位置 X：未显示过的属性位置固定为 null |
| y | `number \| null` | ✓ | - | 位置 Y：未显示过的属性位置固定为 null |
| key | `string` | ✓ | - | 属性键（决定这条属性"是什么"）。**与 `value` 一起构成键值对**。 ## 这是一个**开放集合**，不是封闭枚举 自定义 key 是合法的：写入端不设白名单，属性面板会显示盘上出现的**任何** key （`ComponentModel.addAttribute()` 直接 `attrs[key] = attribute`）。所以下面这份清单 是「**会用的值**」，不是「**允许的值**」。 ## 必要（元件上通常都该有） - `Designator` —— 位号。自动编号、位号角标、BOM 都靠它 - `Device` —— 器件 - `Footprint` —— 封装 - `Symbol` —— 符号 uuid。**原理图侧必须有**（本文件 `TMPcbComponent` 的 `@relation` 写明「原理图必须有 key 为 'Symbol' 属性指向符号, value 值为符号的 uuid」） ## 常用 - `Name` —— 名称 - `Value` / `Comment` / `Manufacturer Part` —— 值 / 注释 / 制造商编号 - `3D Model` / `3D Model Title` / `3D Model Transform` —— 3D 模型（模型/标题/变换矩阵） - `Unique ID` —— 唯一 ID - `Add into BOM` —— 是否加入 BOM - `Reuse Block` / `Group ID` / `Channel ID` —— 复用块 / 分组 / 通道 - `Relevance` —— 相关性（真机出现过） - `Global Net Name` —— 全局网络名（真机出现过） ## 自定义或导入产生的示例 - `FootprintDescription` —— 实测来自 Altium 导入，非编辑器主动写入 ## ⚠️ 两条硬约束 - **空串 `""` 不是属性**。写盘时 `key` 为空会退化成普通文本图元（编码端按 `key ? 'ATTR' : 'STRING'` 分派），解码端也要求 `key != ''` 才认作属性。 想要一条普通文字请用 `STRING`，不要写空 key 的 ATTR。 - 值区分**大小写与空格**（`Add into BOM`、`3D Model Title` 含空格），照抄即可。 注：编辑器里那个名为 `ATTR` 的枚举表覆盖的是**全部图元**的属性名，**不是**本字段的 取值表，别照它取全集。 |
| value | `string` | ✓ | - | Value |
| keyVisible | `boolean` | ✓ | - | 是否显示 Key |
| valueVisible | `boolean` | ✓ | - | 是否显示 Value |
| fontFamily | `string \| null` | ✓ | - | 字体名称 |
| fontSize | `number \| null` | ✓ | - | 字号 |
| strokeWidth | `number` | ✓ | - | 粗细 |
| bold | `boolean` | ✓ | - | 是否加粗。 ⚠️ **写盘恒为数字 `0`**（编码器直接 `return 0`，不是布尔），解码端解构后 **从不赋值**该字段 —— 当前版本它**恒为 0、读出来等于未启用**。 |
| italic | `boolean \| null` | ✓ | - | 是否斜体；null 表示未指定（沿用默认/继承），与 TPcbString.italic 的不可空布尔不同。 ⚠️ 但它**写盘恒为数字 `0`**（编码器直接 `return 0`）、解码端解构后**从不赋值**， 所以上面那个 `null` 语义在当前版本**不会出现**，盘上见到的总是 `0`。 |
| origin | `EAlign` | ✓ | - | 取值范围：LEFT_BOTTOM（左底）、CENTER_BOTTOM（中底）、RIGHT_BOTTOM（右底）、LEFT_MIDDLE（左中）、CENTER_MIDDLE（中中）、RIGHT_MIDDLE（右中）、LEFT_TOP（左顶）、CENTER_TOP（中顶）、RIGHT_TOP（右顶） |
| angle | `number` | ✓ | - | 旋转角度（角度制） |
| reverse | `boolean` | ✓ | - | 是否反相扩展 |
| expansion | `number` | ✓ | - | 反相扩展尺寸：反相扩展区域的尺寸，支持负数 |
| mirror | `boolean` | ✓ | - | 是否镜像，一般来说，当一个文字出现在底层，这里也需要相应调整成 1 |
| specialColor | `string` |  | pattern: ^$\|^#[0-9A-Fa-f]{6}$ | 特殊颜色。**不是可以随便填的自由字段**：只在**顶层 / 底层丝印层** （`layerId` 为 TopSilk / BottomSilk）**且模型带有丝印色**（`silkColor != null`）时 才会写出，否则**恒为 `null`**。**生成数据时不要指望它一定落盘。** |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-pcb-attr.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `layerId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `parentId`: 必需字段 |
| required | ERROR | `x`: 必需字段 |
| required | ERROR | `y`: 必需字段 |
| required | ERROR | `key`: 必需字段 |
| required | ERROR | `value`: 必需字段 |
| required | ERROR | `keyVisible`: 必需字段 |
| required | ERROR | `valueVisible`: 必需字段 |
| required | ERROR | `fontFamily`: 必需字段 |
| required | ERROR | `fontSize`: 必需字段 |
| required | ERROR | `strokeWidth`: 必需字段 |
| required | ERROR | `bold`: 必需字段 |
| required | ERROR | `italic`: 必需字段 |
| required | ERROR | `origin`: 必需字段 |
| required | ERROR | `angle`: 必需字段 |
| required | ERROR | `reverse`: 必需字段 |
| required | ERROR | `expansion`: 必需字段 |
| required | ERROR | `mirror`: 必需字段 |
| enum | ERROR | `origin`: 允许值: LEFT_BOTTOM, CENTER_BOTTOM, RIGHT_BOTTOM, LEFT_MIDDLE, CENTER_MIDDLE, RIGHT_MIDDLE, LEFT_TOP, CENTER_TOP, RIGHT_TOP |
| pattern | ERROR | `specialColor`: 匹配模式: ^$\|^#[0-9A-Fa-f]{6}$ |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/FOOTPRINT/t-pcb-attr.md)

