# TPcbPad

> 返回 [FOOTPRINT 图元索引](../../documents/FOOTPRINT.md)

## 定义

焊盘

⚠️ **本类型的 `layerId`（继承自 `TPcbBase`）是封闭三选一**：只有 **顶层 / 底层 / 多层**
三个层号合法（编辑器只区分这三种）。
同一个 `layerId` 在 `LINE` / `POLY` 上表示**任意层号**，**在 `PAD` 上是三选一**——
不要把两者的取值域当成一样。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| partitionId | `string \| null` |  | - | 所属分区编号，为null表示无分区 |
| groupId | `string` | ✓ | - | 分组编号：相同值的图元属于同一组；**未分组时的取值见下**。 ⚠️ **未分组写的是数字 `0`**（不是字符串 `"0"`）——真实数据里 `"groupId":0` 出现 5 千余次，而 `"groupId":"0"` **一次都没有**；FOOTPRINT 文档下该字段**恒为 0**。 成组时才是字符串（组合 id）；未分组的判定是「`groupId` 为空或 FOOTPRINT 文档」，此时写**数字 0**。 ⚠️ 上方的类型 `string` 比实际形态窄（装不下数字 0）——**放宽类型会波及 pro-* 仓的 消费方，需跨仓协调后再改**，故此处暂以说明为准。本文件各 `@example` 里的 `"groupId":"0"` 也是同一问题，同理按“说明为准”处理。 |
| layerId | `number` | ✓ | - | 层编号 |
| locked | `boolean` | ✓ | - | 是否锁定 |
| zIndex | `number \| null` | ✓ | default: -1 | 同层内的叠放次序（渲染排序键，格式里没有高度语义）。 **它是独立字段，不由 id 推导**：3.0 里未设置时写盘为 **-1**（内部实现即 `_zIndex \|\| -1`；真实数据 `"zIndex":-1` 出现 4 千余次）。**例外**：`ATTR` / `META` 的默认体直接写 `null`。 「由 id 尾部数字推导」是 **2.0 的语义**（2.0 的 `getZIndex` + `idReg`；那个正则也 匹配不了 3.0 的随机 16 位十六进制 id）。**不要照它推导 3.0 的值。** ⚠️ **VIA 是个特例：3.0 写盘不会产出该键**——写盘端的 switch 里**没有** zIndex 分支 （虽然槽位表里有该槽位），取值为 `undefined` 时会被 JSON 序列化整个丢弃。 但**真机存量里仍能遇到 2.0 遗留的带 `zIndex` 的 VIA 行**（样本 15455 条 VIA 中 10404 条载荷含该键，其值恰好等于 id 尾部的数字——正是上面说的「2.0 语义」）。 **读盘时不要假设它不存在。** |
| netName | `string` | ✓ | - | NET，网络名称 |
| num | `string` | ✓ | - | 焊盘编号 |
| centerX | `number` | ✓ | - | 焊盘原点 X |
| centerY | `number` | ✓ | - | 焊盘原点 Y |
| padAngle | `number` | ✓ | - | 焊盘旋转角度（角度制） |
| hole | `THoleDef` | ✓ | - | 孔，null 表示无孔 |
| defaultPad | `TPadDef` | ✓ | - | 默认焊盘定义：各层通用的焊盘形状，结构为 TPadDef 的四个变体之一 （按 `padType` 区分：ELLIPSE 圆 / RECT 矩形 / OVAL 长圆 / POLYGON 多边形）。 需要按层给出不同形状时用下面的 `specialPad`。 |
| specialPad | `{ startLayer: number; endLayer: number; pad: TPadDef }[]` | ✓ | - | 特殊焊盘 |
| padOffsetX | `number` | ✓ | - | 孔偏移 X |
| padOffsetY | `number` | ✓ | - | 孔偏移 Y |
| relativeAngle | `number` | ✓ | - | 孔相对焊盘旋转角度（角度制） |
| plated | `boolean` | ✓ | - | plated 是否金属化孔壁 |
| padType | `EPadFuncType` | ✓ | - | 取值范围：NORMAL（普通焊盘）、TEST（测试点）、MARKER（标识点） |
| topSolderExpansion | `number \| null` | ✓ | - | 顶层阻焊扩展：null 为遵循规则 |
| bottomSolderExpansion | `number \| null` | ✓ | - | 底层阻焊扩展：null 为遵循规则 |
| topPasteExpansion | `number \| null` | ✓ | - | 顶层助焊扩展：null 为遵循规则 |
| bottomPasteExpansion | `number \| null` | ✓ | - | 底层助焊扩展：null 为遵循规则 |
| connectMode | `EPadConnect \| null` | ✓ | - | 取值范围：DIVERGENCE（热焊（发散））、DIRECT（直连）、NON_CONNECT（无连接） |
| spokeSpace | `number \| null` | ✓ | - | 热焊-发散间距：null 为遵循规则，其他数据定义同设计规则 |
| spokeWidth | `number \| null` | ✓ | - | 热焊-发散线宽：null 为遵循规则，其他数据定义同设计规则 |
| spokeAngle | `number \| null` | ✓ | - | 热焊-发散角度：null 为遵循规则，其他数据定义同设计规则 |
| unusedInnerLayers | `number[]` |  | - | 隐藏焊盘层（可选）：被隐藏焊盘的层数组 |
| padLen | `number` | ✓ | - | 引脚长度：**单位 mil**（写盘 ×10，编码为 `toFix(pad.padLen * 10, 4)`） |
| propagationDelay | `number` | ✓ | - | 传播延迟，3.3+ 新增：**单位 ps（皮秒）**。 表示信号经过本焊盘所引入的延迟，参与网络总延迟/等长分析。 默认 0 表示不额外贡献延迟。 |
| attrsMap | `{ [key: string]: any }` |  | - | 自定义属性 |
| refs | `string[]` |  | - | *反向**关联的图元编号：记录的是「哪些图元引用了本焊盘」 （与 TPcbFill/TPcbShell*.refs 的「本图元引用了谁」方向相反） |

## 对象字段成员

以下字段的类型是内联对象，成员定义如下：

### `specialPad`

特殊焊盘

| 成员 | 类型 | 必需 | 说明 |
|------|------|------|------|
| startLayer | `number` | ✓ | 开始层 |
| endLayer | `number` | ✓ | 结束层 |
| pad | `TPadDef` | ✓ | 该层区间的焊盘定义：结构见 TPadDef，覆盖 startLayer 到 endLayer 这几层 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-pcb-pad.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `layerId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `netName`: 必需字段 |
| required | ERROR | `num`: 必需字段 |
| required | ERROR | `centerX`: 必需字段 |
| required | ERROR | `centerY`: 必需字段 |
| required | ERROR | `padAngle`: 必需字段 |
| required | ERROR | `hole`: 必需字段 |
| required | ERROR | `defaultPad`: 必需字段 |
| required | ERROR | `specialPad`: 必需字段 |
| required | ERROR | `padOffsetX`: 必需字段 |
| required | ERROR | `padOffsetY`: 必需字段 |
| required | ERROR | `relativeAngle`: 必需字段 |
| required | ERROR | `plated`: 必需字段 |
| required | ERROR | `padType`: 必需字段 |
| required | ERROR | `topSolderExpansion`: 必需字段 |
| required | ERROR | `bottomSolderExpansion`: 必需字段 |
| required | ERROR | `topPasteExpansion`: 必需字段 |
| required | ERROR | `bottomPasteExpansion`: 必需字段 |
| required | ERROR | `connectMode`: 必需字段 |
| required | ERROR | `spokeSpace`: 必需字段 |
| required | ERROR | `spokeWidth`: 必需字段 |
| required | ERROR | `spokeAngle`: 必需字段 |
| required | ERROR | `padLen`: 必需字段 |
| required | ERROR | `propagationDelay`: 必需字段 |
| enum | ERROR | `padType`: 允许值: NORMAL, TEST, MARKER |
| enum | ERROR | `connectMode`: 允许值: DIVERGENCE, DIRECT, NON_CONNECT, null |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/FOOTPRINT/t-pcb-pad.md)

