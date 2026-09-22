# TLayerWire

> 返回 [FOOTPRINT 图元索引](../../documents/FOOTPRINT.md)

## 定义

层配置

⚠️ **不要从层号、也不要从 `LAYER` 行的先后顺序推断层在物理上的堆叠位置**：
3.0 把物理堆叠拆到了 **`LAYER_PHYS`** 里单独表达（其 `zIndex` 才是堆叠顺序），
本类型只描述每一层自身的类型 / 别名 / 颜色等属性。
（2.0 的位置化格式里确实是「`SIGNAL` / `PLANE` / `SUBSTRATE` 的出现顺序隐含物理堆叠顺序」，
那条口径在 3.0 已不适用，**别照它解析**。）
层的数量不受限制。

## 封装（FOOTPRINT）的层

封装文档与 PCB **共用同一套层机制**，只是常用的层不同；`layerType` 的取值集合是同一套
（见下方 `layerType` 字段）。除此之外封装还有 **5 个专用层**——
这 5 个层在 **PCB 文档里同样存在**，那边的含义是「封装内部的层」，用于**覆盖封装内图元**：

| 层号 | `layerType` | 含义 |
| ---- | ----------- | ---- |
| 48 | `COMPONENT_SHAPE` | 元件轮廓（元件外形显示） |
| 49 | `COMPONENT_MARKING` | 元件标记（元件标识信息） |
| 50 | `PIN_SOLDERING` | 引脚焊接层 |
| 51 | `PIN_FLOATING` | 浮动引脚层 |
| 52 | `COMPONENT_MODEL` | 元件模型层 |

⚠️ 实现把 **48 / 49 / 50 / 51** 这四个层归为「**只能有 `REGION` / `LINE`**」的层
（属性面板据此过滤可选层）——往这几层放别的图元，在编辑器里选不中。

旧 2.0 文档另有一条口径可参考：封装「能采用的图元有限」，且**绝不应出现
`DEVICE` / `FOOTPRINT` / `COMPONENT` 图元**（封装不得再调用封装、以免递归定义）。

【外层数据id构造】id 是**数组串** `["LAYER", 层号]` —— 层号就是本类型的字段 `layerId`
（两边各有一份，**冗余**）。⚠️ 3D 层的 id 前缀是 `LAYER_3D` 而非 `LAYER`
—— 3D 与否**不在载荷里**，解码后由 [TLayerWire](./layer.md) 的 `is3D` 字段体现。
这种**数组串**是**键式 id**（见 [TKeyedElementId](../REFERENCE/t-keyed-element-id.md)）；
同族的数组串 id 还有 [TLayerPhys](./layer_phys.md) 的 `["LAYER_PHYS", 层号]`、[TLayerFill](./layer_fill.md) 的
`["LAYER_FILL", 层号]`、[TSilkOpts](./silk_opts.md) 的 `["SILK_OPTS", 层号]`。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| layerId | number \| [ELayerCode](../REFERENCE/e-layer-code.md) |  | - | 层号。 与外壳 id `["LAYER", 层号]` 里的层号同值（**冗余**），但写盘体里确实会带该键。 **第几号是哪一层见 [ELayerCode](../REFERENCE/e-layer-code.md)** —— 那是层编号的枚举（`1` = 顶层、`47` = 孔层 …）。 ⚠️ 标为**可选**是为了不破坏既有构造点：本包的 `2.0To3.0/PcbTransform` 与 `FootprintTransform` 走的是 `encodeLayer(layerId, {…})`——层号走**独立形参**、 不在载荷对象里；解码端也靠交叉类型 `{ layerId: number } & TLayer` 补它。 标成必填会让这些点全部编译不过。 |
| layerType | string \| [ELayerType](../REFERENCE/e-layer-type.md) | ✓ | - | 层类型, 是固定枚举值。 **PCB 与封装文档共用同一套取值**（见类型说明里的「封装的层」一节）。 **取值表见 [ELayerType](../REFERENCE/e-layer-type.md)** —— 那里把每一层的**字符串名与中文含义**列全了（该枚举不在本仓 定义，来自 pro-pcb）。字段类型写成 **`string \| ELayerType`** 而不是单用枚举：实际数据里 它就是普通字符串，收紧成枚举会让消费方的构造点编译不过。同一层的**数字编号**见 [ELayerCode](../REFERENCE/e-layer-code.md)。 ⚠️ 几条最容易看错的： - **底层信号层是 `BOTTOM`**（**不带前缀**）；而底层丝印 / 阻焊 / 助焊 / 装配是 **`BOT_` 前缀**： `BOT_SILK` / `BOT_SOLDER_MASK` / `BOT_PASTE_MASK` / `BOT_ASSEMBLY`； - **没有 `DRILL`** —— 钻孔相关的是 `DRILL_DRAWING`（钻孔图层）与 `HOLE`（孔层）； - 3D 外壳相关的三个取值**以数字开头**（`3D_SHELL_OUTLINE` / `3D_SHELL_TOP` / `3D_SHELL_BOTTOM`）。 ⚠️ 旧版本注释里列的 `GROUND` / `POWER` / `MIXED` / `JUMPER` / `DRC` / `BOARD_OUTLINE` / `MULTI_LAYER` **都不是合法取值**，已删除——它们是把别处的 同名概念误抄进来的。 |
| layerName | `string` | ✓ | - | 层别名，需要唯一 |
| use | `boolean` | ✓ | - | 是否使用 |
| show | `boolean` | ✓ | - | 是否显示 |
| locked | `boolean` | ✓ | - | 是否锁定 |
| activeColor | `string` | ✓ | pattern: ^$\|^#[0-9A-Fa-f]{6}$ | 激活颜色 |
| activateTransparency | `number` | ✓ | min: 0, max: 1 | 激活透明度 |
| inactiveColor | `string` | ✓ | pattern: ^$\|^#[0-9A-Fa-f]{6}$ | 非激活颜色 |
| inactiveTransparency | `number` | ✓ | min: 0, max: 1 | 非激活透明度 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-layer-wire.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `layerType`: 必需字段 |
| required | ERROR | `layerName`: 必需字段 |
| required | ERROR | `use`: 必需字段 |
| required | ERROR | `show`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `activeColor`: 必需字段 |
| required | ERROR | `activateTransparency`: 必需字段 |
| required | ERROR | `inactiveColor`: 必需字段 |
| required | ERROR | `inactiveTransparency`: 必需字段 |
| pattern | ERROR | `activeColor`: 匹配模式: ^$\|^#[0-9A-Fa-f]{6}$ |
| minimum | ERROR | `activateTransparency`: 最小值: 0 |
| maximum | ERROR | `activateTransparency`: 最大值: 1 |
| pattern | ERROR | `inactiveColor`: 匹配模式: ^$\|^#[0-9A-Fa-f]{6}$ |
| minimum | ERROR | `inactiveTransparency`: 最小值: 0 |
| maximum | ERROR | `inactiveTransparency`: 最大值: 1 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/FOOTPRINT/t-layer-wire.md)

