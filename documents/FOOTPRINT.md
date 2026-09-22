# FOOTPRINT

> 返回 [SKILL.md](../SKILL.md) 入口文档

## 领域概述

封装页是嘉立创 EDA 格式中用于定义元件 PCB 封装的文档类型。它与 PCB 页共用一套图元。封装页包含封装的名称、描述、分类等元数据，以及焊盘、丝印、阻焊、铜箔等图元定义。封装创建后可在 PCB 设计中通过元件引用使用，支持多引脚、异形封装等复杂封装类型。
## 图元索引

| 类型 | 简述 | 图元 | 定义 |
|------|------|------|------|
| [TMFootprint](../primitives/FOOTPRINT/meta.md) | 封装 META 类型 | META | [详细](../primitives/FOOTPRINT/meta.md) |
| [TCanvas](../primitives/FOOTPRINT/canvas.md) | 画布配置 | CANVAS | [详细](../primitives/FOOTPRINT/canvas.md) |
| [TPcbBoard](../primitives/FOOTPRINT/board.md) | 板子（板框） | BOARD | [详细](../primitives/FOOTPRINT/board.md) |
| [TLayerWire](../primitives/FOOTPRINT/layer.md) | 层配置 | LAYER | [详细](../primitives/FOOTPRINT/layer.md) |
| [TLayerPhys](../primitives/FOOTPRINT/layer_phys.md) | 层物理特性配置 | LAYER_PHYS | [详细](../primitives/FOOTPRINT/layer_phys.md) |
| [TActiveLayer](../primitives/FOOTPRINT/active_layer.md) | 配置当前激活层 | ACTIVE_LAYER | [详细](../primitives/FOOTPRINT/active_layer.md) |
| [TPartition](../primitives/FOOTPRINT/partition.md) | 分区 | PARTITION | [详细](../primitives/FOOTPRINT/partition.md) |
| [TNet](../primitives/FOOTPRINT/net.md) | 配置网络信息 | NET | [详细](../primitives/FOOTPRINT/net.md) |
| [TPrimitive](../primitives/FOOTPRINT/primitive.md) | 图元配置 | PRIMITIVE | [详细](../primitives/FOOTPRINT/primitive.md) |
| [TPcbGroup](../primitives/FOOTPRINT/group.md) | 分组配置 | GROUP | [详细](../primitives/FOOTPRINT/group.md) |
| [TSilkOpts](../primitives/FOOTPRINT/silk_opts.md) | 丝印配置 | SILK_OPTS | [详细](../primitives/FOOTPRINT/silk_opts.md) |
| [TPreference](../primitives/FOOTPRINT/preference.md) | 偏好 | PREFERENCE | [详细](../primitives/FOOTPRINT/preference.md) |
| [TPcbVia](../primitives/FOOTPRINT/via.md) | 过孔 | VIA | [详细](../primitives/FOOTPRINT/via.md) |
| [TPcbPad](../primitives/FOOTPRINT/pad.md) | 焊盘 | PAD | [详细](../primitives/FOOTPRINT/pad.md) |
| [TPcbLine](../primitives/FOOTPRINT/line.md) | 直线 | LINE | [详细](../primitives/FOOTPRINT/line.md) |
| [TPcbArc](../primitives/FOOTPRINT/arc.md) | 圆弧线 | ARC | [详细](../primitives/FOOTPRINT/arc.md) |
| [TPcbObj](../primitives/FOOTPRINT/obj.md) | PCB 二进制内嵌对象 | OBJ | [详细](../primitives/FOOTPRINT/obj.md) |
| [TEQLenGrp](../primitives/FOOTPRINT/eqlen_grp.md) | 等长组 | EQLEN_GRP | [详细](../primitives/FOOTPRINT/eqlen_grp.md) |
| [TPcbPoly](../primitives/FOOTPRINT/poly.md) | 折线 | POLY | [详细](../primitives/FOOTPRINT/poly.md) |
| [TPcbFill](../primitives/FOOTPRINT/fill.md) | 填充 | FILL | [详细](../primitives/FOOTPRINT/fill.md) |
| [TLayerFill](../primitives/FOOTPRINT/layer_fill.md) | 层填充 | LAYER_FILL | [详细](../primitives/FOOTPRINT/layer_fill.md) |
| [TPcbRegion](../primitives/FOOTPRINT/region.md) | 区域 | REGION | [详细](../primitives/FOOTPRINT/region.md) |
| [TPcbPour](../primitives/FOOTPRINT/pour.md) | 覆铜边框 | POUR | [详细](../primitives/FOOTPRINT/pour.md) |
| [TPcbPoured](../primitives/FOOTPRINT/poured.md) | 覆铜结果 | POURED | [详细](../primitives/FOOTPRINT/poured.md) |
| [TPcbImage](../primitives/FOOTPRINT/image.md) | 图片 | IMAGE | [详细](../primitives/FOOTPRINT/image.md) |
| [TPcbTeardrop](../primitives/FOOTPRINT/teardrop.md) | 泪滴 | TEARDROP | [详细](../primitives/FOOTPRINT/teardrop.md) |
| [TPcbFpcFill](../primitives/FOOTPRINT/fpc_fill.md) | 柔性工艺补强板 | FPC_FILL | [详细](../primitives/FOOTPRINT/fpc_fill.md) |
| [TPcbShell](../primitives/FOOTPRINT/shell.md) | 外壳 | SHELL | [详细](../primitives/FOOTPRINT/shell.md) |
| [TPcbCrease](../primitives/FOOTPRINT/crease.md) | 侧面基准线（折痕） | CREASE | [详细](../primitives/FOOTPRINT/crease.md) |
| [TPcbShellCut](../primitives/FOOTPRINT/shellcut.md) | 外壳挖槽区域（废弃） | SHELLCUT | [详细](../primitives/FOOTPRINT/shellcut.md) |
| [TPcbShellEntity](../primitives/FOOTPRINT/shell_entity.md) | 外壳实体区域 | SHELL_ENTITY | [详细](../primitives/FOOTPRINT/shell_entity.md) |
| [TPcbBoss](../primitives/FOOTPRINT/boss.md) | 螺丝柱 | BOSS | [详细](../primitives/FOOTPRINT/boss.md) |
| [TPcbString](../primitives/FOOTPRINT/string.md) | PCB 文字 | STRING | [详细](../primitives/FOOTPRINT/string.md) |
| [TPcbDimension](../primitives/FOOTPRINT/dimension.md) | PCB 尺寸工具集 | DIMENSION | [详细](../primitives/FOOTPRINT/dimension.md) |
| [TPanelizeStamp](../primitives/FOOTPRINT/panelize_stamp.md) | 邮票孔参数 | PANELIZE_STAMP | [详细](../primitives/FOOTPRINT/panelize_stamp.md) |
| [TPanelizeSide](../primitives/FOOTPRINT/panelize_side.md) | 工艺边参数 | PANELIZE_SIDE | [详细](../primitives/FOOTPRINT/panelize_side.md) |
| [TPanelize](../primitives/FOOTPRINT/panelize.md) | 拼板 | PANELIZE | [详细](../primitives/FOOTPRINT/panelize.md) |
| [TMPcbComponent](../primitives/FOOTPRINT/component.md) | 器件实例（COMPONENT 图元的**线格式**） | COMPONENT | [详细](../primitives/FOOTPRINT/component.md) |
| [TFootprintNetWire](../primitives/FOOTPRINT/footprint_net.md) | 封装图元网络映射，component + primitive 作为唯一 key | FOOTPRINT_NET | [详细](../primitives/FOOTPRINT/footprint_net.md) |
| [TPadNetWire](../primitives/FOOTPRINT/pad_net.md) | 焊盘实例网络映射 | PAD_NET | [详细](../primitives/FOOTPRINT/pad_net.md) |
| [TPcbAttr](../primitives/FOOTPRINT/attr.md) | PCB 属性 | ATTR | [详细](../primitives/FOOTPRINT/attr.md) |
| [TPcbXNets](../primitives/FOOTPRINT/x_net.md) | 组内的 xNet | X_NET | [详细](../primitives/FOOTPRINT/x_net.md) |
| [TPcbXNetsGroup](../primitives/FOOTPRINT/x_net_group.md) | xNet 组 | X_NET_GROUP | [详细](../primitives/FOOTPRINT/x_net_group.md) |
| [TD3Attribute](../primitives/FOOTPRINT/d3_attribute.md) | 3d 右侧面板属性 | D3_ATTRIBUTE | [详细](../primitives/FOOTPRINT/d3_attribute.md) |

## Related Resources

- [返回 SKILL.md](../SKILL.md)
- [所有 primitives](../primitives/)
- [所有 examples](../examples/)

