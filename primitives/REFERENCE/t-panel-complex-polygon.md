# TPanelComplexPolygon

> 返回 [REFERENCE 类型索引](../../documents/REFERENCE.md)

## 定义

面板复杂多边形

⚠️ **本类型不是图元、不占任何一行数据**：它是 `TPanelPoly.ploys` 与
`TPanelString.path` 这两个字段的类型，盘上不存在独立记录。

**定义**：若干**单多边形**（[TPanelSinglePolygon](./t-panel-single-polygon.md)）组成的数组。
配合填充规则把多个环组合成一个区域，用于表达 `与` / `非` 这类**布尔运算**，
最常见的是**带洞的多边形**。

## 填充规则
格式里**没有这个字段**；pro-panel 全仓也没有任何 `fill-rule` 相关代码，
即**走 SVG / Canvas 的默认值 `nonzero`**（其布尔运算模块另外显式传 `NONZERO`）。
（⚠️ 2.0 文档把该规则拼成 `nonezero` 是笔误。）

## 同一份结构，各图元读法不同
- **`TPanelPoly.ploys`**：各环**一起按填充规则合成一个图形**——实现里
  **没有「首环 = 外轮廓」的特判**，洞由**环绕方向**决定，与「第几个环」无关；
- **`TPanelString.path`**：各元素是**字形轮廓的一条轮廓环**，一个带内洞的字符
  本身就会占多个元素，**不按字切分**。

各字段的注释里另标了该字段特有的语义，以字段自己的说明为准。

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-panel-complex-polygon.json)

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/REFERENCE/t-panel-complex-polygon.md)

