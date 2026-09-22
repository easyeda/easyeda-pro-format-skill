# TYAxisDirection

> 返回 [REFERENCE 类型索引](../../documents/REFERENCE.md)

## 定义

原子 data 里的 Y 轴方向标记（**仅 eprj3 本地文件格式使用**）。

---

## ⚠️ 先明确：这是**两套坐标系**之间的标记

| 取值 | 指哪套坐标系 | y 增大的方向 | 谁在用 |
| ---- | ------------ | ------------ | ------ |
| `down` | **屏幕坐标系**（图形学惯例） | **向下** —— 原点在左上，y 越大越靠近屏幕底部 | 编辑器内部、云端。**云格式一律是它**，也是本字段的默认语义 |
| `up` | **笛卡尔坐标系**（数学惯例） | **向上** —— y 越大越靠上 | **只有** eprj3 本地文件夹工程：插件、JS API `eda.*`、库源体系都按 Y 向上理解坐标 |

它标的是「**这组坐标数字用的是哪套坐标系**」，**不是**图元在屏幕上的朝向，
也与 `rotation` / `isMirror` 无关。

同一个几何形状在两套坐标系下的**数字互为相反数**（只翻 y、x 不变）：
所以「写 eprj3 本地文件」= 把屏幕坐标的 y 取反成笛卡尔坐标、再打上 `up`；
「读回来」= 再取反回屏幕坐标、同时把本字段剥掉 —— **翻两次必然回到原样**。

## 取值

- `up` —— **笛卡尔坐标系（Y 向上）**。本行的坐标已按 Y 向上写出，即**已经翻转过**。
  写 eprj3 本地文件时**一律写它**。
- `down` —— **屏幕坐标系（Y 向下）**，即编辑器内部与云端的常态语义。
  ⚠️ **字段缺失等价于 `down`**（云格式 / 云端 / 缓存 / 实时同步 / 改动前的老本地文件
  都不带这个字段）。所以「读到 `down`」和「根本没这个字段」是**同一件事**，
  不要用「有没有该字段」去区分这两种情况。

该字段的加/去与坐标翻转由实现侧的翻转表负责（`addUpAndFlipY` / `stripUpAndFlipY`），
**业务层不该感知它**（读盘时就被剥离了）。
实现只认字面量 `'up'`：读到别的值（或已被剥过的行）一律按云格式处理、不翻也不删。

---

## 哪些字段会被翻转（**生成数据时照这张表写/读**）

背景：eprj3 文件夹工程是唯一面向外部可读的载体（插件、JS API、库源体系都按
**Y 向上**理解坐标），而编辑器内部与云端一律是 **Y 向下**。写本地文件时把 y 取反、
同时打上本字段；读回时再取反一次并剥掉本字段。

**只有原理图族参与**（`SCH` / `SCH_PAGE` / `SIM_SCH` / `SIMULATION` / `SYMBOL`）。
`FOOTPRINT` / `DEVICE` / `BLOB` / `PCB` 段**整段原样透传**——PCB 的 y 语义自 2.0 起
就与 3.0 一致，从未取反，不在该转换范围内。

| 图元 | 翻转的字段 |
| ---- | ---------- |
| `ATTR` / `TEXT` / `PIN` / `COMPONENT` | `y` |
| `CANVAS` | `originY` |
| `LINE` | `startY`、`endY` |
| `ARC` | `startY`、`referY`、`endY` |
| `OBJ` / `TABLE` | `startY` |
| `CIRCLE` / `ELLIPSE` | `centerY`，以及**内嵌 `text.y`** |
| `RECT` / `MASK_REGION` | `dotY1`、`dotY2`（`RECT` 另有内嵌 `text.y`） |
| `POLY` | `points` 数组里**每个元素**的 `y` |
| `BEZIER` | `controls` 数组的**奇数下标**（即每个点的 y 分量） |
| `BUSENTRY` | `pointY` |
| `BUS` | `busEntry` 里**每个接入点**的 `pointY` |

**以下内容一律不翻转**：
- **整个图元不带坐标的**：`META` / `GROUP` / `WIRE` / `PART` / `NG_SETTING` /
  `ELE_PLACEHOLDER` —— 这类行**原样透传**（连 JSON 解析都不做，因此也不会带本字段）。
  ⚠️ 注意 `WIRE` 不翻，但它的成员 `LINE` 是翻的；`PART` 不翻，真机上它多出的
  `BBOX` 同样透传不管。
- **非坐标的字段**：`rotation`、`isMirror`、`zIndex`，以及**所有幅值字段**
  （`height` / `radius` / `radiusX` / `radiusY` / `length` / `expandHeight` /
  `rowSizes` / `colSizes` / `lineHeight`）。它们不是坐标值，两边对称地不碰才能保证
  「翻转两次回到原样」。

⚠️ 判别规则是 **（文档类型, 图元类型）双键**，不是只看图元名：`POLY` 在原理图域是
`points`（点数组）、在封装域是 `path`（路径串），**同名不同义**，只按图元名分派会把
封装的多边形也翻掉且不报错。

## 取值

| 取值 | 类型 | 说明 |
|------|------|------|
| `up` | string |  |
| `down` | string |  |

## JSON Schema

→ [查看 JSON Schema](../../schemas/ty-axis-direction.json)

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/REFERENCE/ty-axis-direction.md)

