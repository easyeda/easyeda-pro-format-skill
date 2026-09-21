# TLayer

> 返回 [FOOTPRINT 图元索引](../../documents/FOOTPRINT.md)

## 定义

层配置

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| layerId | `number` |  | - | 层号。 与外壳 id `["LAYER", 层号]` 里的层号同值（**冗余**），但写盘体里确实会带该键。 ⚠️ 标为**可选**是为了不破坏既有构造点：本包的 `2.0To3.0/PcbTransform` 与 `FootprintTransform` 走的是 `encodeLayer(layerId, {…})`——层号走**独立形参**、 不在载荷对象里；解码端也靠交叉类型 `{ layerId: number } & TLayer` 补它。 标成必填会让这些点全部编译不过。 |
| layerType | `string` | ✓ | enum: CUSTOM, SIGNAL, PLANE, SUBSTRATE, TOP, TOP_SOLDER_MASK, TOP_SILK, TOP_PASTE_MASK, TOP_ASSEMBLY, PIN_SOLDERING, PIN_FLOATING, OUTLINE, MULTI, MECHANICAL, DOCUMENT, COMPONENT_SHAPE, COMPONENT_MODEL, COMPONENT_MARKING, BOT_SOLDER_MASK, BOT_SILK | 层类型, 是固定枚举值。 真机样本（PCB 文档的 `"layerType"`）里出现过的取值，按频次递减： `CUSTOM` / `SIGNAL` / `PLANE` / `SUBSTRATE` / `TOP` / `TOP_SOLDER_MASK` / `TOP_SILK` / `TOP_PASTE_MASK` / `TOP_ASSEMBLY` / `PIN_SOLDERING` / `PIN_FLOATING` / `OUTLINE` / `MULTI` / `MECHANICAL` / `DOCUMENT` / `COMPONENT_SHAPE` / `COMPONENT_MODEL` / `COMPONENT_MARKING` / `BOT_SOLDER_MASK` / `BOT_SILK` 等。 ⚠️ **底层系是 `BOT_` 前缀，不是 `BOTTOM_`**——底层丝印是 `BOT_SILK`、 底层阻焊是 `BOT_SOLDER_MASK`；**没有 `DRILL`**——钻孔/孔相关的是 `DRILL_DRAWING`（钻孔图层）与 `HOLE`（孔层）。 **完整取值以编辑器的层类型枚举为准**（该枚举不在本仓，上面只是真机样本见过的子集）。 ⚠️ 旧版本注释里列的 `GROUND` / `POWER` / `MIXED` / `JUMPER` / `DRC` / `BOARD_OUTLINE` / `MULTI_LAYER` **都不是合法取值**，已删除——它们是把别处的 同名概念误抄进来的。 |
| layerName | `string` | ✓ | - | 层别名，需要唯一 |
| use | `boolean` | ✓ | - | 是否使用 |
| show | `boolean` | ✓ | - | 是否显示 |
| locked | `boolean` | ✓ | - | 是否锁定 |
| activeColor | `string` | ✓ | pattern: ^$\|^#[0-9A-Fa-f]{6}$ | 激活颜色 |
| activateTransparency | `number` | ✓ | min: 0, max: 1 | 激活透明度 |
| inactiveColor | `string` | ✓ | pattern: ^$\|^#[0-9A-Fa-f]{6}$ | 非激活颜色 |
| inactiveTransparency | `number` | ✓ | min: 0, max: 1 | 非激活透明度 |
| is3D | `boolean` |  | - | 3.3 新增，是否是 3D 层。 ⚠️ **它不是写盘的体字段**，而是由外壳 id 的前缀派生：3D 层写盘时 id 为 `["LAYER_3D", 层号]`、普通层为 `["LAYER", 层号]`，编码时该字段会被 `delete`，解码时由 id 还原（id 前缀是 `"LAYER_3D"` 即为 3D 层）。 所以**生成数据时不要往载荷里写它**，改用 id 前缀表达。 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-layer.json)

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
| enum | ERROR | `layerType`: 允许值: CUSTOM, SIGNAL, PLANE, SUBSTRATE, TOP, TOP_SOLDER_MASK, TOP_SILK, TOP_PASTE_MASK, TOP_ASSEMBLY, PIN_SOLDERING, PIN_FLOATING, OUTLINE, MULTI, MECHANICAL, DOCUMENT, COMPONENT_SHAPE, COMPONENT_MODEL, COMPONENT_MARKING, BOT_SOLDER_MASK, BOT_SILK |
| pattern | ERROR | `activeColor`: 匹配模式: ^$\|^#[0-9A-Fa-f]{6}$ |
| minimum | ERROR | `activateTransparency`: 最小值: 0 |
| maximum | ERROR | `activateTransparency`: 最大值: 1 |
| pattern | ERROR | `inactiveColor`: 匹配模式: ^$\|^#[0-9A-Fa-f]{6}$ |
| minimum | ERROR | `inactiveTransparency`: 最小值: 0 |
| maximum | ERROR | `inactiveTransparency`: 最大值: 1 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/FOOTPRINT/t-layer.md)

