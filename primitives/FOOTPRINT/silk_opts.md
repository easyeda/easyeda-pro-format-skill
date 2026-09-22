# TSilkOpts

> 返回 [FOOTPRINT 图元索引](../../documents/FOOTPRINT.md)

## 定义

丝印配置

一行一条（`type:"SILK_OPTS"`），**按层**给出这层丝印的配色：`defaultColor` 丝印色与
`baseColor` 底色。

它的用途是**彩色丝印工艺** —— 底色与丝印色配合，决定该层丝印在成品上呈现的两色效果；
单色丝印用不到它。

【外层数据id构造】id 是**数组串** `["SILK_OPTS", 层号]`，层号与 [TLayerWire](./layer.md) 的 `layerId` 是同一套层编号。
（数组串是**键式 id**，见 [TKeyedElementId](../REFERENCE/t-keyed-element-id.md)。）

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| defaultColor | `string` | ✓ | pattern: ^$\|^#[0-9A-Fa-f]{6}$ | 默认颜色 |
| baseColor | `string` | ✓ | pattern: ^$\|^#[0-9A-Fa-f]{6}$ | 底色 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-silk-opts.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `defaultColor`: 必需字段 |
| required | ERROR | `baseColor`: 必需字段 |
| pattern | ERROR | `defaultColor`: 匹配模式: ^$\|^#[0-9A-Fa-f]{6}$ |
| pattern | ERROR | `baseColor`: 匹配模式: ^$\|^#[0-9A-Fa-f]{6}$ |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/FOOTPRINT/t-silk-opts.md)

