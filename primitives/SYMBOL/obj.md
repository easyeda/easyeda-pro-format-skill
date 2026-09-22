# TSchObj

> 返回 [SYMBOL 图元索引](../../documents/SYMBOL.md)

## 定义

原理图二进制内嵌对象

**内嵌在画布上的图片 / 附件**，一行一条（`type:"OBJ"`）：由 `fileName`、左上角 `startX` / `startY`、
`width` / `height`、旋转与镜像定位，`content` 存二进制数据本体或指向它的引用。

`content` 按前缀分两种口径：`data:<mediatype>;base64,...` 是**内联**（Data URL 形态）；
`blob:<hash>` 是**引用**——二进制本体**不在这行里**，而在**全工程共用**的 BLOB 文档中，
那份文档的 id 就是这个 hash。⚠️ 引用模式下少了 BLOB 文档，本行就只剩一个悬空引用。

本行的 `id` 由编辑器生成（随机 16 位小写十六进制），图元 id 的几类形态与判别见 [TElementId](../REFERENCE/t-element-id.md)。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| partId | [TPartId](../REFERENCE/t-part-id.md) |  | - | 所属部件编号（**可选**，真机存在整键缺失的 COMPONENT）： **符号页**上表示自身归属于哪个部件，**图页**的元件则指向它**关联的符号文档**里的部件。 取值即目标 `PART` 行的 `id`（`PART` 行只存在于 SYMBOL 文档，见 [TPart](./part.md)）。 |
| groupId | [TElementId](../REFERENCE/t-element-id.md) | ✓ | - | 分组编号；**两种「未成组」形态都表示未成组**： - **3.0 写盘时该键根本不存在**：写入端取 `model.combination?.id`，未成组即 `undefined`， 经 `JSON.stringify` 后整键被丢弃，消费方须**按可选键处理**； - **`""` 只出现在 2.0 迁移数据里**（2.0 → 3.0 转换腿原样带着它）。 |
| locked | `boolean` | ✓ | - | 是否锁定。 ⚠️ **原理图侧目前只是数据字段**：pro-sch 里没有任何按它拦截拖拽 / 删除 / 改大小 / 改形状的实现（连「锁定 / 解锁」命令本身都是空实现，只 publish 属性面板刷新）。 那四条行为特征只在 **PCB / 面板**侧落实。生成数据时照常写入本字段， 但**不要指望原理图端会因为它而禁止操作**。 |
| zIndex | `number \| null` | ✓ | - | 同层内的叠放次序：渲染排序键，数值越小越靠下（格式里没有高度语义） |
| yAxisDirection | [TYAxisDirection](../REFERENCE/ty-axis-direction.md) |  | - | Y 轴方向标记：**仅 eprj3 本地文件格式会带**，读盘时被剥离。 取值：`up` = **笛卡尔坐标系（Y 向上）**，本行坐标已按它写出（本地文件固定用它），`down` = **屏幕坐标系（Y 向下）**（编辑器内部与云端的常态） ——**字段缺失等价于它**，两者是同一件事；两套坐标系下同一个形状的 y **互为相反数**。完整语义见 [TYAxisDirection](../REFERENCE/ty-axis-direction.md)。 ⚠️ 本基类被多个图元继承，**各自被翻转的字段不同**——完整对照表见 [TYAxisDirection](../REFERENCE/ty-axis-direction.md)。 本基类直接覆盖的：`ATTR`/`TEXT`/`PIN`/`COMPONENT` 翻 `y`；`OBJ`/`TABLE` 翻 `startY`； `ARC` 翻 `startY`/`referY`/`endY`；`CIRCLE`/`ELLIPSE` 翻 `centerY` + 内嵌 `text.y`； `RECT` 翻 `dotY1`/`dotY2` + `text.y`；`MASK_REGION` 翻 `dotY1`/`dotY2`；`POLY` 翻 `points` 各项的 `y`；`BEZIER` 翻 `controls` 的奇数下标。 `rotation` / `isMirror` / `zIndex` 与所有幅值字段**不翻**。 |
| fileName | `string` | ✓ | - | 文件名 |
| startX | `number` | ✓ | - | 左上角 X（0.01 inch） |
| startY | `number` | ✓ | - | 左上角 Y（0.01 inch） |
| width | `number` | ✓ | min: 0 | 宽 单位：**0.01 inch** |
| height | `number` | ✓ | min: 0 | 高 单位：**0.01 inch** |
| rotation | `number` | ✓ | min: 0, max: 360 | 旋转角度（角度制，**逆时针为正**）：绕左上角旋转 |
| isMirror | `boolean` | ✓ | - | 是否镜像 |
| content | `string` | ✓ | pattern: ^(data:\|blob:) | 二进制数据，有两种模式一般格式，1.遵循 Data Urls 规范 data:[<mediatype>][;base64],<data> 2.BLOB引用模式，blob:hashid |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-sch-obj.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `fileName`: 必需字段 |
| required | ERROR | `startX`: 必需字段 |
| required | ERROR | `startY`: 必需字段 |
| required | ERROR | `width`: 必需字段 |
| required | ERROR | `height`: 必需字段 |
| required | ERROR | `rotation`: 必需字段 |
| required | ERROR | `isMirror`: 必需字段 |
| required | ERROR | `content`: 必需字段 |
| enum | ERROR | `yAxisDirection`: 允许值: up, down |
| minimum | ERROR | `width`: 最小值: 0 |
| minimum | ERROR | `height`: 最小值: 0 |
| minimum | ERROR | `rotation`: 最小值: 0 |
| maximum | ERROR | `rotation`: 最大值: 360 |
| pattern | ERROR | `content`: 匹配模式: ^(data:\|blob:) |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/SYMBOL/t-sch-obj.md)

