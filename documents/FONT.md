# FONT

> 返回 [SKILL.md](../SKILL.md) 入口文档

## 领域概述

FONT 是嘉立创 EDA 格式中的字体缓存文档类型，用于存储渲染后的文字路径数据。字体路径全工程共用，避免重复计算相同的文字渲染结果。FONT 数据包含文字的宽度、高度和路径信息（参考 PCB 复杂多边形定义），其 ID 是一个 JSON 数组，包含文字内容、字体名称、字号、粗细、是否加粗、是否斜体、是否反相扩展等参数。
## 图元索引

| 类型 | 简述 | 定义 |
|------|------|------|
| TMFont | FONT | [详细](../primitives/FONT/font.md) |

## Related Resources

- [返回 SKILL.md](../SKILL.md)
- [所有 primitives](../primitives/)
- [所有 examples](../examples/)

