# PCB

> 返回 [SKILL.md](../SKILL.md) 入口文档

## 领域概述

PCB 页是嘉立创 EDA 格式中用于 PCB 版图设计的文档类型。PCB 页和封装页共用一套图元。PCB 页包含复杂的层系统（信号层、内电层、机械层、文档层等），支持焊盘、过孔、铜箔、阻焊、丝印等 PCB 专用图元。层配置包括层类型、显示颜色、透明度等参数，支持多层板设计（最多 32 个内层、30 个自定义层、31 个基板层）。
## 图元索引

| 类型 | 简述 | 定义 |
|------|------|------|
| TMPcb | META | [详细](../primitives/PCB/meta.md) |
| TCanvas | CANVAS | [详细](../primitives/PCB/canvas.md) |
| TPcbBoard | BOARD | [详细](../primitives/PCB/board.md) |
| TLayer | LAYER | [详细](../primitives/PCB/layer.md) |
| TLayerPhys | LAYER_PHYS | [详细](../primitives/PCB/layer_phys.md) |
| TActiveLayer | ACTIVE_LAYER | [详细](../primitives/PCB/active_layer.md) |
| TPartition | PARTITION | [详细](../primitives/PCB/partition.md) |
| TNet | NET | [详细](../primitives/PCB/net.md) |
| TPrimitive | PRIMITIVE | [详细](../primitives/PCB/primitive.md) |
| TPcbGroup | GROUP | [详细](../primitives/PCB/group.md) |
| TSilkOpts | SILK_OPTS | [详细](../primitives/PCB/silk_opts.md) |
| TPreference | PREFERENCE | [详细](../primitives/PCB/preference.md) |
| TPcbVia | VIA | [详细](../primitives/PCB/via.md) |
| TPcbPad | PAD | [详细](../primitives/PCB/pad.md) |
| TPcbLine | LINE | [详细](../primitives/PCB/line.md) |
| TPcbArc | ARC | [详细](../primitives/PCB/arc.md) |
| TPcbObj | OBJ | [详细](../primitives/PCB/obj.md) |
| TEQLenGrp | EQLEN_GRP | [详细](../primitives/PCB/eqlen_grp.md) |
| TPcbPoly | POLY | [详细](../primitives/PCB/poly.md) |
| TPcbFill | FILL | [详细](../primitives/PCB/fill.md) |
| TLayerFill | LAYER_FILL | [详细](../primitives/PCB/layer_fill.md) |
| TPcbRegion | REGION | [详细](../primitives/PCB/region.md) |
| TPcbPour | POUR | [详细](../primitives/PCB/pour.md) |
| TPcbPoured | POURED | [详细](../primitives/PCB/poured.md) |
| TPcbImage | IMAGE | [详细](../primitives/PCB/image.md) |
| TPcbTeardrop | TEARDROP | [详细](../primitives/PCB/teardrop.md) |
| TPcbFpcFill | FPC_FILL | [详细](../primitives/PCB/fpc_fill.md) |
| TPcbShell | SHELL | [详细](../primitives/PCB/shell.md) |
| TPcbCrease | CREASE | [详细](../primitives/PCB/crease.md) |
| TPcbShellCut | SHELLCUT | [详细](../primitives/PCB/shellcut.md) |
| TPcbShellEntity | SHELL_ENTITY | [详细](../primitives/PCB/shell_entity.md) |
| TPcbBoss | BOSS | [详细](../primitives/PCB/boss.md) |
| TPcbString | STRING | [详细](../primitives/PCB/string.md) |
| TPcbDimension | DIMENSION | [详细](../primitives/PCB/dimension.md) |
| TPanelizeStamp | PANELIZE_STAMP | [详细](../primitives/PCB/panelize_stamp.md) |
| TPanelizeSide | PANELIZE_SIDE | [详细](../primitives/PCB/panelize_side.md) |
| TPanelize | PANELIZE | [详细](../primitives/PCB/panelize.md) |
| TMPcbComponent | COMPONENT | [详细](../primitives/PCB/component.md) |
| TFootprintNet | FOOTPRINT_NET | [详细](../primitives/PCB/footprint_net.md) |
| TPadNet | PAD_NET | [详细](../primitives/PCB/pad_net.md) |
| TPcbAttr | ATTR | [详细](../primitives/PCB/attr.md) |
| TPcbXNets | X_NET | [详细](../primitives/PCB/x_net.md) |
| TBaseXNetsGroup | X_NET_GROUP | [详细](../primitives/PCB/x_net_group.md) |
| TD3Attribute | D3_ATTRIBUTE | [详细](../primitives/PCB/d3_attribute.md) |
| EPcbDataType |  | [详细](../primitives/PCB/e-pcb-data-type.md) |
| TRuleTemplate | RULE_TEMPLATE | [详细](../primitives/PCB/rule_template.md) |
| TRule | RULE | [详细](../primitives/PCB/rule.md) |
| TRuleSelector | RULE_SELECTOR | [详细](../primitives/PCB/rule_selector.md) |

## Related Resources

- [返回 SKILL.md](../SKILL.md)
- [所有 primitives](../primitives/)
- [所有 examples](../examples/)

