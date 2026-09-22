# REFERENCE

> 返回 [SKILL.md](../SKILL.md) 入口文档

## 领域概述

**本目录里的东西不是格式图元**，而是各类**定义性参考**：某种**标识（id / uuid）怎么写**、以及**各域的类型枚举有哪些取值**。它们都不占任何一行数据，也**不要照着它们生成数据行**；之所以成页，只是为了给各图元页的字段「类型」列和 @see 一个可跳转的落点 —— 枚举页同时也是该枚举**取值的权威清单**。
## 类型索引

| 类型 | 简述 | 定义 |
|------|------|------|
| [EStrokeStyle](../primitives/REFERENCE/e-stroke-style.md) | 线型 | [详细](../primitives/REFERENCE/e-stroke-style.md) |
| [EPanelTransScope](../primitives/REFERENCE/e-panel-trans-scope.md) | 透明度控制范围 | [详细](../primitives/REFERENCE/e-panel-trans-scope.md) |
| [EHAlign](../primitives/REFERENCE/eh-align.md) | 水平对齐模式 | [详细](../primitives/REFERENCE/eh-align.md) |
| [EVAlign](../primitives/REFERENCE/ev-align.md) | 垂直对齐模式 | [详细](../primitives/REFERENCE/ev-align.md) |
| [EAlign](../primitives/REFERENCE/e-align.md) | 对齐模式 | [详细](../primitives/REFERENCE/e-align.md) |
| [ESchFillStyle](../primitives/REFERENCE/e-sch-fill-style.md) | 填充样式 | [详细](../primitives/REFERENCE/e-sch-fill-style.md) |
| [EPinShape](../primitives/REFERENCE/e-pin-shape.md) | 引脚形状 | [详细](../primitives/REFERENCE/e-pin-shape.md) |
| [EGridType](../primitives/REFERENCE/e-grid-type.md) | 网格类型 | [详细](../primitives/REFERENCE/e-grid-type.md) |
| [ERoutingMode](../primitives/REFERENCE/e-routing-mode.md) | 布线模式 | [详细](../primitives/REFERENCE/e-routing-mode.md) |
| [EPadShapeType](../primitives/REFERENCE/e-pad-shape-type.md) | 焊盘形状类型 | [详细](../primitives/REFERENCE/e-pad-shape-type.md) |
| [ETHoleType](../primitives/REFERENCE/et-hole-type.md) | 孔类型 | [详细](../primitives/REFERENCE/et-hole-type.md) |
| [TPourType](../primitives/REFERENCE/t-pour-type.md) | 覆铜类型 | [详细](../primitives/REFERENCE/t-pour-type.md) |
| [EUnusedPadRange](../primitives/REFERENCE/e-unused-pad-range.md) | 移除未使用焊盘的范围 | [详细](../primitives/REFERENCE/e-unused-pad-range.md) |
| [EPathOptimization](../primitives/REFERENCE/e-path-optimization.md) | 被推挤导线路径优化 | [详细](../primitives/REFERENCE/e-path-optimization.md) |
| [EPushViaOptimization](../primitives/REFERENCE/e-push-via-optimization.md) | 推挤过孔 | [详细](../primitives/REFERENCE/e-push-via-optimization.md) |
| [ECurrentPathOptimization](../primitives/REFERENCE/e-current-path-optimization.md) | 当前导线路径优化 | [详细](../primitives/REFERENCE/e-current-path-optimization.md) |
| [ERoutingConner](../primitives/REFERENCE/e-routing-conner.md) | 布线拐角模式 | [详细](../primitives/REFERENCE/e-routing-conner.md) |
| [EViaType](../primitives/REFERENCE/e-via-type.md) | 过孔类型 | [详细](../primitives/REFERENCE/e-via-type.md) |
| [EPadFuncType](../primitives/REFERENCE/e-pad-func-type.md) | 焊盘功能类型 | [详细](../primitives/REFERENCE/e-pad-func-type.md) |
| [EPadConnect](../primitives/REFERENCE/e-pad-connect.md) | 焊盘 - 连接方式 | [详细](../primitives/REFERENCE/e-pad-connect.md) |
| [EArcType](../primitives/REFERENCE/e-arc-type.md) | 圆弧类型 | [详细](../primitives/REFERENCE/e-arc-type.md) |
| [EPolyType](../primitives/REFERENCE/e-poly-type.md) | 折线类型 | [详细](../primitives/REFERENCE/e-poly-type.md) |
| [EPcbFillStyle](../primitives/REFERENCE/e-pcb-fill-style.md) | PCB 填充类型 | [详细](../primitives/REFERENCE/e-pcb-fill-style.md) |
| [ERegionType](../primitives/REFERENCE/e-region-type.md) | 区域类型 | [详细](../primitives/REFERENCE/e-region-type.md) |
| [EProhibitType](../primitives/REFERENCE/e-prohibit-type.md) | 区域禁止类型 | [详细](../primitives/REFERENCE/e-prohibit-type.md) |
| [EFpcMaterial](../primitives/REFERENCE/e-fpc-material.md) | 柔性工艺补强板材质 | [详细](../primitives/REFERENCE/e-fpc-material.md) |
| [E3DShellOutlineType](../primitives/REFERENCE/e3d-shell-outline-type.md) | 3D 外壳类型 | [详细](../primitives/REFERENCE/e3d-shell-outline-type.md) |
| [E3DShellPushCoverDir](../primitives/REFERENCE/e3d-shell-push-cover-dir.md) | 3D 外壳推盖时的方向 | [详细](../primitives/REFERENCE/e3d-shell-push-cover-dir.md) |
| [EEntityType](../primitives/REFERENCE/e-entity-type.md) | 实体区域类型 | [详细](../primitives/REFERENCE/e-entity-type.md) |
| [EEntityBelong](../primitives/REFERENCE/e-entity-belong.md) | 实体归属 | [详细](../primitives/REFERENCE/e-entity-belong.md) |
| [ESlotOption](../primitives/REFERENCE/e-slot-option.md) | 挖槽选项 | [详细](../primitives/REFERENCE/e-slot-option.md) |
| [ESpecification](../primitives/REFERENCE/e-specification.md) | 螺丝型号 | [详细](../primitives/REFERENCE/e-specification.md) |
| [EDimensionType](../primitives/REFERENCE/e-dimension-type.md) | 尺寸类型 | [详细](../primitives/REFERENCE/e-dimension-type.md) |
| [EUnitName](../primitives/REFERENCE/e-unit-name.md) | 单位 | [详细](../primitives/REFERENCE/e-unit-name.md) |
| [ERuleType](../primitives/REFERENCE/e-rule-type.md) | 设计规则类型 | [详细](../primitives/REFERENCE/e-rule-type.md) |
| [ERuleStatus](../primitives/REFERENCE/e-rule-status.md) | 规则状态 | [详细](../primitives/REFERENCE/e-rule-status.md) |
| [EShowStatus](../primitives/REFERENCE/e-show-status.md) | 安全间距 - 显示状态 | [详细](../primitives/REFERENCE/e-show-status.md) |
| [ETrackConnect](../primitives/REFERENCE/e-track-connect.md) | 规则 - 导线-连接方式 | [详细](../primitives/REFERENCE/e-track-connect.md) |
| [EAutoRoutingCorner](../primitives/REFERENCE/e-auto-routing-corner.md) | 自动布线 - 拐角 | [详细](../primitives/REFERENCE/e-auto-routing-corner.md) |
| [EAutoRoutingViaQuantity](../primitives/REFERENCE/e-auto-routing-via-quantity.md) | 自动布线 - 过孔数量 | [详细](../primitives/REFERENCE/e-auto-routing-via-quantity.md) |
| [EAutoRoutingPriority](../primitives/REFERENCE/e-auto-routing-priority.md) | 自动布线 - 效果优先级 | [详细](../primitives/REFERENCE/e-auto-routing-priority.md) |
| [EBothEndShape](../primitives/REFERENCE/e-both-end-shape.md) | 折线两端的点的形状 | [详细](../primitives/REFERENCE/e-both-end-shape.md) |
| [ELayerBrightness](../primitives/REFERENCE/e-layer-brightness.md) | 图层亮度类型 | [详细](../primitives/REFERENCE/e-layer-brightness.md) |
| [EPrimitiveViewMode](../primitives/REFERENCE/e-primitive-view-mode.md) | 图元-视图模式 | [详细](../primitives/REFERENCE/e-primitive-view-mode.md) |
| [EPanelizeVersion](../primitives/REFERENCE/e-panelize-version.md) | 拼板的版本字段 | [详细](../primitives/REFERENCE/e-panelize-version.md) |
| [EHeaderType](../primitives/REFERENCE/e-header-type.md) | 文件头类型枚举 | [详细](../primitives/REFERENCE/e-header-type.md) |
| [ELayerCode](../primitives/REFERENCE/e-layer-code.md) | 层编号（`LAYER` 行的 `layerId`，以及各处按层索引的「层号」） | [详细](../primitives/REFERENCE/e-layer-code.md) |
| [ELayerType](../primitives/REFERENCE/e-layer-type.md) | 层类型（`LAYER` 行的 `layerType` 字段） | [详细](../primitives/REFERENCE/e-layer-type.md) |
| [EPanelLayer](../primitives/REFERENCE/e-panel-layer.md) | 面板图元的所在层（面板图元 `layer` 字段的取值） | [详细](../primitives/REFERENCE/e-panel-layer.md) |
| [TDocUuid](../primitives/REFERENCE/t-doc-uuid.md) | 文档 uuid —— **普通文档** | [详细](../primitives/REFERENCE/t-doc-uuid.md) |
| [TConstantDocUuid](../primitives/REFERENCE/t-constant-doc-uuid.md) | 文档 uuid —— **常量文档** | [详细](../primitives/REFERENCE/t-constant-doc-uuid.md) |
| [TEmbeddedDocUuid](../primitives/REFERENCE/t-embedded-doc-uuid.md) | 文档 uuid —— **宿主内嵌文档** | [详细](../primitives/REFERENCE/t-embedded-doc-uuid.md) |
| [TInstanceDocUuid](../primitives/REFERENCE/t-instance-doc-uuid.md) | 文档 uuid —— **实例属性文档** | [详细](../primitives/REFERENCE/t-instance-doc-uuid.md) |
| [TGroupDataDocUuid](../primitives/REFERENCE/t-group-data-doc-uuid.md) | 文档 uuid —— **分组数据文档** | [详细](../primitives/REFERENCE/t-group-data-doc-uuid.md) |
| [TElementId](../primitives/REFERENCE/t-element-id.md) | 图元 id（**普通形态**）—— 本文档内某一行的 `id` | [详细](../primitives/REFERENCE/t-element-id.md) |
| [TSingletonElementId](../primitives/REFERENCE/t-singleton-element-id.md) | 图元 id（**固定单例**）—— 只有一条记录的图元，id 写死成一个名字 | [详细](../primitives/REFERENCE/t-singleton-element-id.md) |
| [TKeyedElementId](../primitives/REFERENCE/t-keyed-element-id.md) | 图元 id（**键式**）—— 盘上是 JSON 数组串，id 里带着区分记录的键 | [详细](../primitives/REFERENCE/t-keyed-element-id.md) |
| [TCompositeElementId](../primitives/REFERENCE/t-composite-element-id.md) | 图元 id（**复合**）—— `<父图元 id>` 与 `<子图元局部 id>` 直接拼起来 | [详细](../primitives/REFERENCE/t-composite-element-id.md) |
| [TLocalElementId](../primitives/REFERENCE/t-local-element-id.md) | 局部图元 id —— **复合 id 去掉父前缀后的那一段** | [详细](../primitives/REFERENCE/t-local-element-id.md) |
| [TPartId](../primitives/REFERENCE/t-part-id.md) | PART id —— 指向**某条 `PART` 行**的图元 id | [详细](../primitives/REFERENCE/t-part-id.md) |
| [EPanelDataType](../primitives/REFERENCE/e-panel-data-type.md) | 数据类型 | [详细](../primitives/REFERENCE/e-panel-data-type.md) |
| [EPcbDataType](../primitives/REFERENCE/e-pcb-data-type.md) | PCB 数据类型枚举 | [详细](../primitives/REFERENCE/e-pcb-data-type.md) |
| [TPcbSinglePolygon](../primitives/REFERENCE/t-pcb-single-polygon.md) | PCB 单多边形 | [详细](../primitives/REFERENCE/t-pcb-single-polygon.md) |
| [TPcbComplexPolygon](../primitives/REFERENCE/t-pcb-complex-polygon.md) | PCB 复杂多边形 | [详细](../primitives/REFERENCE/t-pcb-complex-polygon.md) |
| [TPanelSinglePolygon](../primitives/REFERENCE/t-panel-single-polygon.md) | 面板单多边形 | [详细](../primitives/REFERENCE/t-panel-single-polygon.md) |
| [TPanelComplexPolygon](../primitives/REFERENCE/t-panel-complex-polygon.md) | 面板复杂多边形 | [详细](../primitives/REFERENCE/t-panel-complex-polygon.md) |
| [ESettingType](../primitives/REFERENCE/e-setting-type.md) | 工程设置的数据类型值 | [详细](../primitives/REFERENCE/e-setting-type.md) |
| [ERelevanceDisplayRowType](../primitives/REFERENCE/e-relevance-display-row-type.md) | 关联显示方式 | [详细](../primitives/REFERENCE/e-relevance-display-row-type.md) |
| [ERelevanceBelongSchPage](../primitives/REFERENCE/e-relevance-belong-sch-page.md) | 关联所在图页 | [详细](../primitives/REFERENCE/e-relevance-belong-sch-page.md) |
| [ERelevanceLocation](../primitives/REFERENCE/e-relevance-location.md) | 关联所在位置 | [详细](../primitives/REFERENCE/e-relevance-location.md) |
| [TYAxisDirection](../primitives/REFERENCE/ty-axis-direction.md) | 原子 data 里的 Y 轴方向标记（**仅 eprj3 本地文件格式使用**）。 | [详细](../primitives/REFERENCE/ty-axis-direction.md) |
| [TSchBusEntry](../primitives/REFERENCE/t-sch-bus-entry.md) | 总线接入标识 | [详细](../primitives/REFERENCE/t-sch-bus-entry.md) |
| [TTableCell](../primitives/REFERENCE/t-table-cell.md) | 表格单元格 | [详细](../primitives/REFERENCE/t-table-cell.md) |
| [TDCSourceData](../primitives/REFERENCE/tdc-source-data.md) | 仿真图页 - 仿真设置源数据 | [详细](../primitives/REFERENCE/tdc-source-data.md) |
| [ESchDataType](../primitives/REFERENCE/e-sch-data-type.md) | 原理图数据类型枚举 | [详细](../primitives/REFERENCE/e-sch-data-type.md) |
| [ESchematicType](../primitives/REFERENCE/e-schematic-type.md) | 原理图数据类型枚举 | [详细](../primitives/REFERENCE/e-schematic-type.md) |

## Related Resources

- [返回 SKILL.md](../SKILL.md)
- [所有 primitives](../primitives/)
- [所有 examples](../examples/)

