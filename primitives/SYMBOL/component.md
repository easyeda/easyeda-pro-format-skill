# TMSchComponent

> 返回 [SYMBOL 图元索引](../../documents/SYMBOL.md)

## 定义

元件（COMPONENT 图元的**线格式**）

**本类型描述的就是盘上的形状**：`attrs` 里的 6 个固定键（`DeviceName` / `Devices` /
`SymbolName` / `Symbols` / `FootprintName` / `Footprints`）都是**逐键 JSON 字符串**。
解码后 `attrs` 会被还原成对象，那个形态是 `TSchComponent`——
**生成格式数据时用本类型**，不要用解码后的那个。

【联动增删·必须成组操作】COMPONENT 与其 ATTR 是**同一生命周期**：
**新增 COMPONENT 时必须一并写出它的 ATTR；删除 COMPONENT 时必须一并删除它的 ATTR**，
只删 COMPONENT 会留下悬空引用。（PCB 侧同构，另有 PAD_NET 一并处理。）

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| groupId | `string` | ✓ | - | 分组编号；**两种「未成组」形态都表示未成组**： - **3.0 写盘时该键根本不存在**：写入端取 `model.combination?.id`，未成组即 `undefined`， 经 `JSON.stringify` 后整键被丢弃，消费方须**按可选键处理**； - **`""` 只出现在 2.0 迁移数据里**（2.0 → 3.0 转换腿原样带着它）。 |
| locked | `boolean` | ✓ | - | 是否锁定 |
| zIndex | `number \| null` | ✓ | - | 同层内的叠放次序：渲染排序键，数值越小越靠下（格式里没有高度语义） |
| yAxisDirection | `TYAxisDirection` |  | - | Y 轴方向标记：**仅 eprj3 本地文件格式会带**，读盘时被剥离。 取值：`up` **已按 Y 轴向上写出**（本地文件固定用它）、`down` Y 轴向下 （**字段缺失等价于它**，两者是同一件事）。完整语义见 `TYAxisDirection`。 ⚠️ 本基类被多个图元继承，**各自被翻转的字段不同**——完整对照表见 `TYAxisDirection`。 本基类直接覆盖的：`ATTR`/`TEXT`/`PIN`/`COMPONENT` 翻 `y`；`OBJ`/`TABLE` 翻 `startY`； `ARC` 翻 `startY`/`referY`/`endY`；`CIRCLE`/`ELLIPSE` 翻 `centerY` + 内嵌 `text.y`； `RECT` 翻 `dotY1`/`dotY2` + `text.y`；`MASK_REGION` 翻 `dotY1`/`dotY2`；`POLY` 翻 `points` 各项的 `y`；`BEZIER` 翻 `controls` 的奇数下标。 `rotation` / `isMirror` / `zIndex` 与所有幅值字段**不翻**。 |
| partId | `string` | ✓ | - | 所属部件编号：指向**关联符号文档**里的 `PART` 行 id（`PART` 行只存在于 SYMBOL 文档， 见 `TPart` 的说明）——取值就是那个符号文档里 `key:"Symbol"` 属性值所标识文档中的 PART 行。 ⚠️ 旧注释说「符号页专属 / 默认 `""`」不准确：**图页元件也用本字段**（真机 SCH 文档的 COMPONENT 带 `partId:"-1"`）。协议类型上它是必填，但**真机存在整键缺失的 COMPONENT**， 读取时按可空处理。 |
| x | `number` | ✓ | - | 位置 X |
| y | `number` | ✓ | - | 位置 Y |
| rotation | `number` | ✓ | min: 0, max: 360 | 旋转角度（角度制）：绕 位置 旋转 |
| isMirror | `boolean` | ✓ | - | 是否镜像 |
| attrs | `{ DeviceName: string; Devices: string; FootprintName: string; Footprints: string; SymbolName: string; Symbols: string; [key: string]: string }` | ✓ | - | 自定义属性 |

## 对象字段成员

以下字段的类型是内联对象，成员定义如下：

### `attrs`

自定义属性

| 成员 | 类型 | 必需 | 说明 |
|------|------|------|------|
| DeviceName | `string` | ✓ | 当前绑定文本器件（uuid 可空），v4 新增; `{ uuid: string; name: string; source: string }`的JSON.string序列化 |
| Devices | `string` | ✓ | 备选器件，v4 新增;`{ uuid: string; name: string; source: string }[]`的JSON.string序列化 |
| FootprintName | `string` | ✓ | 当前绑定文本封装（uuid 可空），v4 新增; `{ uuid: string; name: string; source: string }`的JSON.string序列化 |
| Footprints | `string` | ✓ | 备选封装，v4 新增;`{ uuid: string; name: string; source: string }[]`的JSON.string序列化 |
| SymbolName | `string` | ✓ | 当前绑定文本符号（uuid 可空），v4 新增; `{ uuid: string; name: string; source: string }`的JSON.string序列化 |
| Symbols | `string` | ✓ | 备选符号，v4 新增;`{ uuid: string; name: string; source: string }[]`的JSON.string序列化 |
| [key: string] | `string` |  | 其他自定义 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/tm-sch-component.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `partId`: 必需字段 |
| required | ERROR | `x`: 必需字段 |
| required | ERROR | `y`: 必需字段 |
| required | ERROR | `rotation`: 必需字段 |
| required | ERROR | `isMirror`: 必需字段 |
| required | ERROR | `attrs`: 必需字段 |
| enum | ERROR | `yAxisDirection`: 允许值: up, down |
| minimum | ERROR | `rotation`: 最小值: 0 |
| maximum | ERROR | `rotation`: 最大值: 360 |

### 父子图元

此图元包含以下子图元类型：

- 子图元类型: [TSchAttr](../../primitives/SCH_PAGE/attr.md)
- 子图元中的关联字段: `parentId` (指向父图元 id)
- 父图元中的引用字段: `id`

COMPONENT 下可绑定多个 ATTR，每个 ATTR 的 parentId 必须指向 COMPONENT 的 id

## 示例

→ [查看示例](../../examples/SYMBOL/tm-sch-component.md)

