# ELayerType

> 返回 [REFERENCE 类型索引](../../documents/REFERENCE.md)

## 定义

层类型（`LAYER` 行的 `layerType` 字段）

⚠️ **取值不在本仓定义** —— 它来自 **pro-pcb 的层类型枚举**，本类型只是把它搬进来单独成页，
方便查「**都有哪些层**」。本仓的字段声明为 **`string | ELayerType`**：实际数据里它就是
普通字符串，收紧成枚举会让消费方的构造点编译不过（联合写法让文档里能点进来，但不改可赋值性）。

**与层编号一一对应**：同一层还有个**数字编号**写法（`LAYER` 外壳 id 里的层号），
那套见 [ELayerCode](./e-layer-code.md)。两边逐条对照过，但**取值集合并不等大** —— 数字那套还多出
内层 `Inner1`~`Inner32`、飞线层 `Ratline`，以及一批**工具层**，那几类在字符串这套里没有。

⚠️ **成员名与取值常常不一样**（`TOPSILK` 的值是 `TOP_SILK`、`D3_MODEL` 的值是 `3D_MODEL`）
—— 生成数据时要写**取值**，不是成员名。

⚠️ 几条容易看错的：
- **底层信号层是 `BOTTOM`**（**不带前缀**），而底层丝印 / 阻焊 / 助焊 / 装配是 **`BOT_` 前缀**：
  `BOT_SILK` / `BOT_SOLDER_MASK` / `BOT_PASTE_MASK` / `BOT_ASSEMBLY`；
- **没有 `DRILL`**，钻孔相关的是 `DRILL_DRAWING`（钻孔图层）与 `HOLE`（孔层）；
- 3D 外壳相关的三个取值**以数字开头**（`3D_SHELL_*`），不是成员名那样的 `D3_SHELL_*`。

## 取值

| 取值 | 类型 | 说明 |
|------|------|------|
| `TOP` | string | 顶层 |
| `MULTI` | string | 多层 |
| `SIGNAL` | string | 信号层 |
| `PLANE` | string | 内电层 |
| `BOTTOM` | string | 底层 |
| `TOP_SILK` | string | 顶层丝印 |
| `BOT_SILK` | string | 底层丝印 |
| `TOP_SOLDER_MASK` | string | 顶层助焊 |
| `BOT_SOLDER_MASK` | string | 底层助焊 |
| `TOP_PASTE_MASK` | string | 顶层阻焊 |
| `BOT_PASTE_MASK` | string | 底层阻焊 |
| `DOCUMENT` | string | 文档 |
| `OUTLINE` | string | 边框 |
| `MECHANICAL` | string | 机械层 |
| `HOLE` | string | 孔层 |
| `TOP_ASSEMBLY` | string | 顶层装配层 |
| `BOT_ASSEMBLY` | string | 底层装配层 |
| `OTHER` | string | 其他层 |
| `CUSTOM` | string | 自定义层 |
| `COMPONENT_SHAPE` | string | 元件外形层 |
| `COMPONENT_MARKING` | string | 元件标识层 20210326后此类型层默认名称更改为元件标识层【关联coding#16148】 |
| `PIN_SOLDERING` | string | 引脚焊接层 |
| `PIN_FLOATING` | string | 引脚悬空层 |
| `COMPONENT_MODEL` | string | 元件模型层 |
| `3D_MODEL` | string | 3d模型层 |
| `3D_SHELL_OUTLINE` | string | 3d外壳层-边框 |
| `3D_SHELL_TOP` | string | 3d外壳层-顶层 |
| `3D_SHELL_BOTTOM` | string | 3d外壳层-底层 |
| `DRILL_DRAWING` | string | 钻孔图层 |
| `SUBSTRATE` | string | 基板 |
| `TOP_STIFFENER` | string | 顶层补强 |
| `BOTTOM_STIFFENER` | string | 底层补强 |
| `PARTITION` | string | 分区 |
| `ANALYSIS_OUT_LINE` | string | C++分析后的外形层 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/e-layer-type.json)

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/REFERENCE/e-layer-type.md)

