# SCH_PAGE

> 返回 [SKILL.md](../SKILL.md) 入口文档

## 领域概述

原理图页是嘉立创 EDA 格式中用于绘制电路原理图的文档类型。它与符号页和仿真页共用一套图元属性系统，仅在个别字段上存在差异。原理图页包含电路元件符号、连接线路、网络标识等基础图元，用于描述电路的逻辑连接关系。
## 图元索引

| 类型 | 简述 | 图元 | 定义 |
|------|------|------|------|
| [TMSheet](../primitives/SCH_PAGE/meta.md) | 原理图页 META 类型 | META | [详细](../primitives/SCH_PAGE/meta.md) |
| [TSchLine](../primitives/SCH_PAGE/line.md) | 单线段 | LINE | [详细](../primitives/SCH_PAGE/line.md) |
| [TWire](../primitives/SCH_PAGE/wire.md) | 导线组 | WIRE | [详细](../primitives/SCH_PAGE/wire.md) |
| [TBus](../primitives/SCH_PAGE/bus.md) | 总线组 | BUS | [详细](../primitives/SCH_PAGE/bus.md) |
| [TSchGroup](../primitives/SCH_PAGE/group.md) | 原理图分组控制 | GROUP | [详细](../primitives/SCH_PAGE/group.md) |
| [TSchBezier](../primitives/SCH_PAGE/bezier.md) | 贝塞尔 | BEZIER | [详细](../primitives/SCH_PAGE/bezier.md) |
| [TSchText](../primitives/SCH_PAGE/text.md) | 文本 | TEXT | [详细](../primitives/SCH_PAGE/text.md) |
| [TSchPoly](../primitives/SCH_PAGE/poly.md) | 原理图多边形 | POLY | [详细](../primitives/SCH_PAGE/poly.md) |
| [TSchCircle](../primitives/SCH_PAGE/circle.md) | 圆 | CIRCLE | [详细](../primitives/SCH_PAGE/circle.md) |
| [TSchArc](../primitives/SCH_PAGE/arc.md) | 圆弧 | ARC | [详细](../primitives/SCH_PAGE/arc.md) |
| [TSchRect](../primitives/SCH_PAGE/rect.md) | 矩形 | RECT | [详细](../primitives/SCH_PAGE/rect.md) |
| [TSchPin](../primitives/SCH_PAGE/pin.md) | 标号 | PIN | [详细](../primitives/SCH_PAGE/pin.md) |
| [TSchObj](../primitives/SCH_PAGE/obj.md) | 原理图二进制内嵌对象 | OBJ | [详细](../primitives/SCH_PAGE/obj.md) |
| [TMSchComponent](../primitives/SCH_PAGE/component.md) | 元件（COMPONENT 图元的**线格式**） | COMPONENT | [详细](../primitives/SCH_PAGE/component.md) |
| [TSchEllipse](../primitives/SCH_PAGE/ellipse.md) | 椭圆 | ELLIPSE | [详细](../primitives/SCH_PAGE/ellipse.md) |
| [TSchTable](../primitives/SCH_PAGE/table.md) | 表格 | TABLE | [详细](../primitives/SCH_PAGE/table.md) |
| [TSchAttr](../primitives/SCH_PAGE/attr.md) | 原理图属性 | ATTR | [详细](../primitives/SCH_PAGE/attr.md) |
| [TPart](../primitives/SCH_PAGE/part.md) | 部件 | PART | [详细](../primitives/SCH_PAGE/part.md) |
| [TSchCanvas](../primitives/SCH_PAGE/canvas.md) | 画布配置信息 | CANVAS | [详细](../primitives/SCH_PAGE/canvas.md) |
| [TSchMaskRegion](../primitives/SCH_PAGE/mask_region.md) | 屏蔽区域 | MASK_REGION | [详细](../primitives/SCH_PAGE/mask_region.md) |
| [TNGSetting](../primitives/SCH_PAGE/ng_setting.md) | 仿真图页 - 仿真设置 | NG_SETTING | [详细](../primitives/SCH_PAGE/ng_setting.md) |

## Related Resources

- [返回 SKILL.md](../SKILL.md)
- [所有 primitives](../primitives/)
- [所有 examples](../examples/)

