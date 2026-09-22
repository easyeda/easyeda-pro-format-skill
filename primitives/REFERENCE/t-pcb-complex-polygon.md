# TPcbComplexPolygon

> 返回 [REFERENCE 类型索引](../../documents/REFERENCE.md)

## 定义

PCB 复杂多边形

⚠️ **本类型不是图元、不占任何一行数据**：它是**含洞 / 多环图形的路径字段类型**
（`BOARD` / `FILL` / `REGION` / `POUR` / `IMAGE` / `SHELL` 等），盘上不存在独立记录。

**定义**：若干**单多边形**（[TPcbSinglePolygon](./t-pcb-single-polygon.md)）组成的数组。
它配合**填充规则**把多个环组合成一个区域，用来表达 `与` / `非` 这类**布尔运算**的结果，
最常见的用途就是**带洞的多边形**（板框挖孔、覆铜避让区域等）。

## 填充规则
格式里**没有这个字段**，实现里也不是单一口径：
- **做布尔运算 / 合并多边形**时显式传 `NONZERO`（`Simplify(NONZERO, …)`、`mergePolyline`）；
- **判断「点是否在这个多环图形内」**时用的是**奇偶规则**（跨子环做 `result = !result`）。

两种规则在「外轮廓顺时针 + 内洞逆时针」的规范写法下结果一致，所以差别通常不可观测；
但**别把它当成「处处 nonzero」**。
（⚠️ 2.0 文档把该规则拼成 `nonezero` 是笔误，实现的枚举名是 `NONZERO`。）

## 同一份结构，各图元读法不同——两个维度，且现有实现里两者一一对应

**1. 数组里多个元素的含义**（各字段注释里分别标注）：
- **【外轮廓 + 内洞】**：首个子路径是外轮廓，其后每个子路径都是内洞
  （`BOARD` / `PARTITION` / `REGION` / `POUR` / `SHELL` / `SHELLCUT` / `SHELL_ENTITY`）；
- **【并列】**：各子路径是**彼此独立**的多边形，**不是**内外嵌套关系
  （`FILL` / `IMAGE` / `FPC_FILL` / `TPourFill.path`）。

**2. 读取端是否消费全部子路径**：与第 1 条一一对应——
【外轮廓 + 内洞】那一档**只取首个子路径**（解码器的 `finish()` 执行 `path = path[0]`），
【并列】那一档**整份解析**。

⚠️ 边界：`path = path[0]` **只发生在 `finish()`（首次装载）**；增量更新的 `load()`
路径不裁剪、会遍历全部子路径。也就是说**后续内洞现在不会被渲染**，
写数据时仍按约定把环写全，但别指望它们会被用上。

## 方向约定
各子路径按约定书写：**外轮廓顺时针、内洞逆时针**（服务于上面的填充规则）。

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-pcb-complex-polygon.json)

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/REFERENCE/t-pcb-complex-polygon.md)

