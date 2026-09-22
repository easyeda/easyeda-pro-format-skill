# PCB

> 返回 [SKILL.md](../SKILL.md) 入口文档

## 领域概述

PCB 页是嘉立创 EDA 格式中用于 PCB 版图设计的文档类型。PCB 页和封装页共用一套图元。PCB 页包含复杂的层系统（信号层、内电层、机械层、文档层等），支持焊盘、过孔、铜箔、阻焊、丝印等 PCB 专用图元。层配置包括层类型、显示颜色、透明度等参数，支持多层板设计（最多 32 个内层、30 个自定义层、31 个基板层）。
## 图元索引

| 类型 | 简述 | 图元 | 定义 |
|------|------|------|------|
| [TMPcb](../primitives/PCB/meta.md) | PCB META 类型 | META | [详细](../primitives/PCB/meta.md) |
| [TCanvas](../primitives/PCB/canvas.md) | 画布配置 | CANVAS | [详细](../primitives/PCB/canvas.md) |
| [TPcbBoard](../primitives/PCB/board.md) | 板子（板框） | BOARD | [详细](../primitives/PCB/board.md) |
| [TLayerWire](../primitives/PCB/layer.md) | 层配置 | LAYER | [详细](../primitives/PCB/layer.md) |
| [TLayerPhys](../primitives/PCB/layer_phys.md) | 层物理特性配置 | LAYER_PHYS | [详细](../primitives/PCB/layer_phys.md) |
| [TActiveLayer](../primitives/PCB/active_layer.md) | 配置当前激活层 | ACTIVE_LAYER | [详细](../primitives/PCB/active_layer.md) |
| [TPartition](../primitives/PCB/partition.md) | 分区 | PARTITION | [详细](../primitives/PCB/partition.md) |
| [TNet](../primitives/PCB/net.md) | 配置网络信息 | NET | [详细](../primitives/PCB/net.md) |
| [TPrimitive](../primitives/PCB/primitive.md) | 图元配置 | PRIMITIVE | [详细](../primitives/PCB/primitive.md) |
| [TPcbGroup](../primitives/PCB/group.md) | 分组配置 | GROUP | [详细](../primitives/PCB/group.md) |
| [TSilkOpts](../primitives/PCB/silk_opts.md) | 丝印配置 | SILK_OPTS | [详细](../primitives/PCB/silk_opts.md) |
| [TPreference](../primitives/PCB/preference.md) | 偏好 | PREFERENCE | [详细](../primitives/PCB/preference.md) |
| [TPcbVia](../primitives/PCB/via.md) | 过孔 | VIA | [详细](../primitives/PCB/via.md) |
| [TPcbPad](../primitives/PCB/pad.md) | 焊盘 | PAD | [详细](../primitives/PCB/pad.md) |
| [TPcbLine](../primitives/PCB/line.md) | 直线 | LINE | [详细](../primitives/PCB/line.md) |
| [TPcbArc](../primitives/PCB/arc.md) | 圆弧线 | ARC | [详细](../primitives/PCB/arc.md) |
| [TPcbObj](../primitives/PCB/obj.md) | PCB 二进制内嵌对象 | OBJ | [详细](../primitives/PCB/obj.md) |
| [TEQLenGrp](../primitives/PCB/eqlen_grp.md) | 等长组 | EQLEN_GRP | [详细](../primitives/PCB/eqlen_grp.md) |
| [TPcbPoly](../primitives/PCB/poly.md) | 折线 | POLY | [详细](../primitives/PCB/poly.md) |
| [TPcbFill](../primitives/PCB/fill.md) | 填充 | FILL | [详细](../primitives/PCB/fill.md) |
| [TLayerFill](../primitives/PCB/layer_fill.md) | 层填充 | LAYER_FILL | [详细](../primitives/PCB/layer_fill.md) |
| [TPcbRegion](../primitives/PCB/region.md) | 区域 | REGION | [详细](../primitives/PCB/region.md) |
| [TPcbPour](../primitives/PCB/pour.md) | 覆铜边框 | POUR | [详细](../primitives/PCB/pour.md) |
| [TPcbPoured](../primitives/PCB/poured.md) | 覆铜结果 | POURED | [详细](../primitives/PCB/poured.md) |
| [TPcbImage](../primitives/PCB/image.md) | 图片 | IMAGE | [详细](../primitives/PCB/image.md) |
| [TPcbTeardrop](../primitives/PCB/teardrop.md) | 泪滴 | TEARDROP | [详细](../primitives/PCB/teardrop.md) |
| [TPcbFpcFill](../primitives/PCB/fpc_fill.md) | 柔性工艺补强板 | FPC_FILL | [详细](../primitives/PCB/fpc_fill.md) |
| [TPcbShell](../primitives/PCB/shell.md) | 外壳 | SHELL | [详细](../primitives/PCB/shell.md) |
| [TPcbCrease](../primitives/PCB/crease.md) | 侧面基准线（折痕） | CREASE | [详细](../primitives/PCB/crease.md) |
| [TPcbShellCut](../primitives/PCB/shellcut.md) | 外壳挖槽区域（废弃） | SHELLCUT | [详细](../primitives/PCB/shellcut.md) |
| [TPcbShellEntity](../primitives/PCB/shell_entity.md) | 外壳实体区域 | SHELL_ENTITY | [详细](../primitives/PCB/shell_entity.md) |
| [TPcbBoss](../primitives/PCB/boss.md) | 螺丝柱 | BOSS | [详细](../primitives/PCB/boss.md) |
| [TPcbString](../primitives/PCB/string.md) | PCB 文字 | STRING | [详细](../primitives/PCB/string.md) |
| [TPcbDimension](../primitives/PCB/dimension.md) | PCB 尺寸工具集 | DIMENSION | [详细](../primitives/PCB/dimension.md) |
| [TPanelizeStamp](../primitives/PCB/panelize_stamp.md) | 邮票孔参数 | PANELIZE_STAMP | [详细](../primitives/PCB/panelize_stamp.md) |
| [TPanelizeSide](../primitives/PCB/panelize_side.md) | 工艺边参数 | PANELIZE_SIDE | [详细](../primitives/PCB/panelize_side.md) |
| [TPanelize](../primitives/PCB/panelize.md) | 拼板 | PANELIZE | [详细](../primitives/PCB/panelize.md) |
| [TMPcbComponent](../primitives/PCB/component.md) | 器件实例（COMPONENT 图元的**线格式**） | COMPONENT | [详细](../primitives/PCB/component.md) |
| [TFootprintNetWire](../primitives/PCB/footprint_net.md) | 封装图元网络映射，component + primitive 作为唯一 key | FOOTPRINT_NET | [详细](../primitives/PCB/footprint_net.md) |
| [TPadNetWire](../primitives/PCB/pad_net.md) | 焊盘实例网络映射 | PAD_NET | [详细](../primitives/PCB/pad_net.md) |
| [TPcbAttr](../primitives/PCB/attr.md) | PCB 属性 | ATTR | [详细](../primitives/PCB/attr.md) |
| [TPcbXNets](../primitives/PCB/x_net.md) | 组内的 xNet | X_NET | [详细](../primitives/PCB/x_net.md) |
| [TPcbXNetsGroup](../primitives/PCB/x_net_group.md) | xNet 组 | X_NET_GROUP | [详细](../primitives/PCB/x_net_group.md) |
| [TD3Attribute](../primitives/PCB/d3_attribute.md) | 3d 右侧面板属性 | D3_ATTRIBUTE | [详细](../primitives/PCB/d3_attribute.md) |
| [TRuleTemplate](../primitives/PCB/rule_template.md) | 设计规则模板 | RULE_TEMPLATE | [详细](../primitives/PCB/rule_template.md) |
| [TRuleWire](../primitives/PCB/rule.md) | 设计规则 | RULE | [详细](../primitives/PCB/rule.md) |
| [TRuleSelectorWire](../primitives/PCB/rule_selector.md) | 规则选择器 | RULE_SELECTOR | [详细](../primitives/PCB/rule_selector.md) |

## Related Resources

- [返回 SKILL.md](../SKILL.md)
- [所有 primitives](../primitives/)
- [所有 examples](../examples/)

