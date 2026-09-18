/**
 * 格式验证脚本
 *
 * 用法: node validate.js [--doc <docType>] <type> <json-data>
 *       node validate.js [--doc <docType>] '<外层JSON>||<内层JSON>|'
 *
 * 同名图元在不同文档类型下 schema 不同，跨文档类型请用前缀名或 --doc：
 *   node validate.js PCB_LINE '{"netName":"+5V",...}'
 *   node validate.js LINE '{"netName":"+5V",...}' --doc PCB
 */

// 检查依赖（ajv 随产物一起提供，见同目录 node_modules/）
let Ajv, addFormats;
try {
  Ajv = require("ajv");
} catch (error) {
  console.error("错误: 缺少依赖 ajv");
  console.error("该依赖不随产物分发，请在产物目录下执行: npm install ajv ajv-formats");
  process.exit(1);
}
try {
  // 可选依赖：只有 schema 用到 format 关键字时才需要
  addFormats = require("ajv-formats");
} catch (error) {
  addFormats = null;
}

const fs = require("fs");
const path = require("path");

// 外层 Schema（元数据：type, id, ticket）
const OUTER_SCHEMA = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "EasyEDA Outer Metadata",
  "description": "外层数据结构（最终一致性框架元数据）",
  "type": "object",
  "required": ["type"],
  "properties": {
    "type": {
      "type": "string",
      "description": "图元类型名"
    },
    "id": {
      "type": "string",
      "description": "唯一标识。普通图元是 16 位十六进制随机串；单例原子（META / CANVAS / UNIVERSAL 等）直接用原子类型名；FONT 用字体键、BLOB 用内容哈希，故此处不限定格式"
    },
    "ticket": {
      "type": "integer",
      "minimum": 0,
      "description": "逻辑时钟，用于冲突解决"
    }
  },
  // DOCHEAD 行只有 type，没有 id / ticket
  "if": { "properties": { "type": { "const": "DOCHEAD" } } },
  "then": {},
  "else": { "required": ["type", "id", "ticket"] }
};

// 类型到 schema 文件的映射
const TYPE_TO_SCHEMA = {
  "e-stroke-style": require("./schemas/e-stroke-style.json"),
  "e-panel-trans-scope": require("./schemas/e-panel-trans-scope.json"),
  "eh-align": require("./schemas/eh-align.json"),
  "ev-align": require("./schemas/ev-align.json"),
  "e-align": require("./schemas/e-align.json"),
  "e-sch-fill-style": require("./schemas/e-sch-fill-style.json"),
  "e-pin-shape": require("./schemas/e-pin-shape.json"),
  "e-grid-type": require("./schemas/e-grid-type.json"),
  "e-routing-mode": require("./schemas/e-routing-mode.json"),
  "e-pad-shape-type": require("./schemas/e-pad-shape-type.json"),
  "et-hole-type": require("./schemas/et-hole-type.json"),
  "t-pour-type": require("./schemas/t-pour-type.json"),
  "e-unused-pad-range": require("./schemas/e-unused-pad-range.json"),
  "e-path-optimization": require("./schemas/e-path-optimization.json"),
  "e-push-via-optimization": require("./schemas/e-push-via-optimization.json"),
  "e-current-path-optimization": require("./schemas/e-current-path-optimization.json"),
  "e-routing-conner": require("./schemas/e-routing-conner.json"),
  "e-via-type": require("./schemas/e-via-type.json"),
  "e-pad-func-type": require("./schemas/e-pad-func-type.json"),
  "e-pad-connect": require("./schemas/e-pad-connect.json"),
  "e-arc-type": require("./schemas/e-arc-type.json"),
  "e-poly-type": require("./schemas/e-poly-type.json"),
  "e-pcb-fill-style": require("./schemas/e-pcb-fill-style.json"),
  "e-region-type": require("./schemas/e-region-type.json"),
  "e-prohibit-type": require("./schemas/e-prohibit-type.json"),
  "e-fpc-material": require("./schemas/e-fpc-material.json"),
  "e3d-shell-outline-type": require("./schemas/e3d-shell-outline-type.json"),
  "e3d-shell-push-cover-dir": require("./schemas/e3d-shell-push-cover-dir.json"),
  "e-entity-type": require("./schemas/e-entity-type.json"),
  "e-entity-belong": require("./schemas/e-entity-belong.json"),
  "e-slot-option": require("./schemas/e-slot-option.json"),
  "e-specification": require("./schemas/e-specification.json"),
  "e-dimension-type": require("./schemas/e-dimension-type.json"),
  "e-unit-name": require("./schemas/e-unit-name.json"),
  "e-rule-type": require("./schemas/e-rule-type.json"),
  "e-rule-status": require("./schemas/e-rule-status.json"),
  "e-show-status": require("./schemas/e-show-status.json"),
  "e-track-connect": require("./schemas/e-track-connect.json"),
  "e-auto-routing-corner": require("./schemas/e-auto-routing-corner.json"),
  "e-auto-routing-via-quantity": require("./schemas/e-auto-routing-via-quantity.json"),
  "e-auto-routing-priority": require("./schemas/e-auto-routing-priority.json"),
  "e-both-end-shape": require("./schemas/e-both-end-shape.json"),
  "e-layer-brightness": require("./schemas/e-layer-brightness.json"),
  "e-primitive-view-mode": require("./schemas/e-primitive-view-mode.json"),
  "e-panelize-version": require("./schemas/e-panelize-version.json"),
  "e-header-type": require("./schemas/e-header-type.json"),
  "t-user": require("./schemas/t-user.json"),
  "t-doc-head": require("./schemas/t-doc-head.json"),
  "t-edit-head": require("./schemas/t-edit-head.json"),
  "tm-font": require("./schemas/tm-font.json"),
  "tm-blob": require("./schemas/tm-blob.json"),
  "tm-board": require("./schemas/tm-board.json"),
  "tm-config": require("./schemas/tm-config.json"),
  "tm-device": require("./schemas/tm-device.json"),
  "tm-component": require("./schemas/tm-component.json"),
  "tm-footprint": require("./schemas/tm-footprint.json"),
  "tm-symbol": require("./schemas/tm-symbol.json"),
  "tm-panel-lib": require("./schemas/tm-panel-lib.json"),
  "tm-document": require("./schemas/tm-document.json"),
  "tm-simulation": require("./schemas/tm-simulation.json"),
  "tm-schematic": require("./schemas/tm-schematic.json"),
  "tm-sim-schematic": require("./schemas/tm-sim-schematic.json"),
  "tm-panel": require("./schemas/tm-panel.json"),
  "tm-sheet": require("./schemas/tm-sheet.json"),
  "tm-pcb": require("./schemas/tm-pcb.json"),
  "t-trn-ctrl": require("./schemas/t-trn-ctrl.json"),
  "t-panel-base": require("./schemas/t-panel-base.json"),
  "t-panel-poly": require("./schemas/t-panel-poly.json"),
  "t-panel-string": require("./schemas/t-panel-string.json"),
  "t-panel-dimension": require("./schemas/t-panel-dimension.json"),
  "t-aux-line": require("./schemas/t-aux-line.json"),
  "t-panel-group": require("./schemas/t-panel-group.json"),
  "t-panel-canvas": require("./schemas/t-panel-canvas.json"),
  "e-panel-data-type": require("./schemas/e-panel-data-type.json"),
  "t-pcb-base": require("./schemas/t-pcb-base.json"),
  "t-canvas": require("./schemas/t-canvas.json"),
  "t-pcb-board": require("./schemas/t-pcb-board.json"),
  "t-layer": require("./schemas/t-layer.json"),
  "t-layer-phys": require("./schemas/t-layer-phys.json"),
  "t-active-layer": require("./schemas/t-active-layer.json"),
  "t-partition": require("./schemas/t-partition.json"),
  "t-net": require("./schemas/t-net.json"),
  "t-primitive": require("./schemas/t-primitive.json"),
  "t-pcb-group": require("./schemas/t-pcb-group.json"),
  "t-silk-opts": require("./schemas/t-silk-opts.json"),
  "t-preference": require("./schemas/t-preference.json"),
  "t-pcb-via": require("./schemas/t-pcb-via.json"),
  "t-hole-def": require("./schemas/t-hole-def.json"),
  "t-pad-def": require("./schemas/t-pad-def.json"),
  "t-pcb-pad": require("./schemas/t-pcb-pad.json"),
  "t-pcb-line": require("./schemas/t-pcb-line.json"),
  "t-pcb-arc": require("./schemas/t-pcb-arc.json"),
  "t-pcb-obj": require("./schemas/t-pcb-obj.json"),
  "teq-len-grp": require("./schemas/teq-len-grp.json"),
  "t-pcb-poly": require("./schemas/t-pcb-poly.json"),
  "t-pcb-fill": require("./schemas/t-pcb-fill.json"),
  "t-layer-fill": require("./schemas/t-layer-fill.json"),
  "t-pcb-region": require("./schemas/t-pcb-region.json"),
  "t-pour-def": require("./schemas/t-pour-def.json"),
  "t-pcb-pour": require("./schemas/t-pcb-pour.json"),
  "t-pour-fill": require("./schemas/t-pour-fill.json"),
  "t-pcb-poured": require("./schemas/t-pcb-poured.json"),
  "t-pcb-image": require("./schemas/t-pcb-image.json"),
  "t-pcb-teardrop": require("./schemas/t-pcb-teardrop.json"),
  "t-pcb-fpc-fill": require("./schemas/t-pcb-fpc-fill.json"),
  "t-pcb-shell": require("./schemas/t-pcb-shell.json"),
  "t-pcb-crease": require("./schemas/t-pcb-crease.json"),
  "t-pcb-shell-cut": require("./schemas/t-pcb-shell-cut.json"),
  "t-pcb-shell-entity": require("./schemas/t-pcb-shell-entity.json"),
  "t-pcb-boss": require("./schemas/t-pcb-boss.json"),
  "t-pcb-string": require("./schemas/t-pcb-string.json"),
  "t-pcb-dimension": require("./schemas/t-pcb-dimension.json"),
  "t-panelize-stamp": require("./schemas/t-panelize-stamp.json"),
  "t-panelize-side": require("./schemas/t-panelize-side.json"),
  "t-panelize": require("./schemas/t-panelize.json"),
  "tm-pcb-component": require("./schemas/tm-pcb-component.json"),
  "t-pcb-component": require("./schemas/t-pcb-component.json"),
  "t-footprint-net": require("./schemas/t-footprint-net.json"),
  "t-pad-net": require("./schemas/t-pad-net.json"),
  "t-pcb-attr": require("./schemas/t-pcb-attr.json"),
  "t-pcb-x-net-node": require("./schemas/t-pcb-x-net-node.json"),
  "t-pcb-x-nets": require("./schemas/t-pcb-x-nets.json"),
  "t-base-x-nets-group": require("./schemas/t-base-x-nets-group.json"),
  "t-pcb-x-nets-group": require("./schemas/t-pcb-x-nets-group.json"),
  "td3attribute": require("./schemas/td3attribute.json"),
  "e-pcb-data-type": require("./schemas/e-pcb-data-type.json"),
  "t-universal": require("./schemas/t-universal.json"),
  "e-setting-type": require("./schemas/e-setting-type.json"),
  "e-relevance-display-row-type": require("./schemas/e-relevance-display-row-type.json"),
  "e-relevance-belong-sch-page": require("./schemas/e-relevance-belong-sch-page.json"),
  "e-relevance-location": require("./schemas/e-relevance-location.json"),
  "t-rule-context": require("./schemas/t-rule-context.json"),
  "t-rule-template": require("./schemas/t-rule-template.json"),
  "t-rule": require("./schemas/t-rule.json"),
  "t-rule-selector": require("./schemas/t-rule-selector.json"),
  "t-dot": require("./schemas/t-dot.json"),
  "ty-axis-direction": require("./schemas/ty-axis-direction.json"),
  "font-style-base": require("./schemas/font-style-base.json"),
  "t-font-style": require("./schemas/t-font-style.json"),
  "t-table-font-style": require("./schemas/t-table-font-style.json"),
  "t-line-style": require("./schemas/t-line-style.json"),
  "t-sch-base": require("./schemas/t-sch-base.json"),
  "t-sch-line": require("./schemas/t-sch-line.json"),
  "t-sch-bus-entry": require("./schemas/t-sch-bus-entry.json"),
  "t-wire": require("./schemas/t-wire.json"),
  "t-bus": require("./schemas/t-bus.json"),
  "t-sch-group": require("./schemas/t-sch-group.json"),
  "t-sch-bezier": require("./schemas/t-sch-bezier.json"),
  "t-sch-text": require("./schemas/t-sch-text.json"),
  "t-sch-poly": require("./schemas/t-sch-poly.json"),
  "t-sch-circle": require("./schemas/t-sch-circle.json"),
  "t-sch-arc": require("./schemas/t-sch-arc.json"),
  "t-sch-rect": require("./schemas/t-sch-rect.json"),
  "t-sch-pin": require("./schemas/t-sch-pin.json"),
  "t-sch-obj": require("./schemas/t-sch-obj.json"),
  "tm-sch-component": require("./schemas/tm-sch-component.json"),
  "t-sch-component": require("./schemas/t-sch-component.json"),
  "t-sch-ellipse": require("./schemas/t-sch-ellipse.json"),
  "t-table-cell": require("./schemas/t-table-cell.json"),
  "t-sch-table": require("./schemas/t-sch-table.json"),
  "t-sch-attr": require("./schemas/t-sch-attr.json"),
  "t-part": require("./schemas/t-part.json"),
  "t-sch-canvas": require("./schemas/t-sch-canvas.json"),
  "t-sch-mask-region": require("./schemas/t-sch-mask-region.json"),
  "tdc-source-data": require("./schemas/tdc-source-data.json"),
  "tng-setting": require("./schemas/tng-setting.json"),
  "e-sch-data-type": require("./schemas/e-sch-data-type.json"),
  "t-differential-pair": require("./schemas/t-differential-pair.json"),
  "t-net-class": require("./schemas/t-net-class.json"),
  "teq-len-net-grp": require("./schemas/teq-len-net-grp.json"),
  "e-schematic-type": require("./schemas/e-schematic-type.json"),
};

// 已知文档类型（--doc 的合法取值）
const DOC_TYPES = {
  "BLOB": true,
  "BOARD": true,
  "CONFIG": true,
  "DEVICE": true,
  "FONT": true,
  "FOOTPRINT": true,
  "PANEL": true,
  "PANEL_LIB": true,
  "PCB": true,
  "SCH": true,
  "SCH_PAGE": true,
  "SIMULATION": true,
  "SIMULATION_SCH": true,
  "SYMBOL": true,
};

// --doc 路径专用：<文档类型>_<图元名> → schema（键统一小写，查表时已 toLowerCase）
const DOC_TYPE_MAP = {
  "font_font": "tm-font",  // TMFont
  "blob_blob": "tm-blob",  // TMBlob
  "board_meta": "tm-board",  // TMBoard
  "config_meta": "tm-config",  // TMConfig
  "device_meta": "tm-device",  // TMDevice
  "footprint_meta": "tm-footprint",  // TMFootprint
  "symbol_meta": "tm-symbol",  // TMSymbol
  "panel_lib_meta": "tm-panel-lib",  // TMPanelLib
  "simulation_meta": "tm-simulation",  // TMSimulation
  "sch_meta": "tm-schematic",  // TMSchematic
  "simulation_sch_meta": "tm-sim-schematic",  // TMSimSchematic
  "panel_meta": "tm-panel",  // TMPanel
  "sch_page_meta": "tm-sheet",  // TMSheet
  "pcb_meta": "tm-pcb",  // TMPcb
  "panel_poly": "t-panel-poly",  // TPanelPoly
  "panel_lib_poly": "t-panel-poly",  // TPanelPoly
  "panel_string": "t-panel-string",  // TPanelString
  "panel_lib_string": "t-panel-string",  // TPanelString
  "panel_dimension": "t-panel-dimension",  // TPanelDimension
  "panel_lib_dimension": "t-panel-dimension",  // TPanelDimension
  "panel_auxline": "t-aux-line",  // TAuxLine
  "panel_lib_auxline": "t-aux-line",  // TAuxLine
  "panel_group": "t-panel-group",  // TPanelGroup
  "panel_lib_group": "t-panel-group",  // TPanelGroup
  "panel_canvas": "t-panel-canvas",  // TPanelCanvas
  "panel_lib_canvas": "t-panel-canvas",  // TPanelCanvas
  "panel_e-panel-data-type": "e-panel-data-type",  // EPanelDataType
  "panel_lib_e-panel-data-type": "e-panel-data-type",  // EPanelDataType
  "pcb_canvas": "t-canvas",  // TCanvas
  "footprint_canvas": "t-canvas",  // TCanvas
  "pcb_board": "t-pcb-board",  // TPcbBoard
  "footprint_board": "t-pcb-board",  // TPcbBoard
  "pcb_layer": "t-layer",  // TLayer
  "footprint_layer": "t-layer",  // TLayer
  "pcb_layer_phys": "t-layer-phys",  // TLayerPhys
  "footprint_layer_phys": "t-layer-phys",  // TLayerPhys
  "pcb_active_layer": "t-active-layer",  // TActiveLayer
  "footprint_active_layer": "t-active-layer",  // TActiveLayer
  "pcb_partition": "t-partition",  // TPartition
  "footprint_partition": "t-partition",  // TPartition
  "pcb_net": "t-net",  // TNet
  "footprint_net": "t-net",  // TNet
  "pcb_primitive": "t-primitive",  // TPrimitive
  "footprint_primitive": "t-primitive",  // TPrimitive
  "pcb_group": "t-pcb-group",  // TPcbGroup
  "footprint_group": "t-pcb-group",  // TPcbGroup
  "pcb_silk_opts": "t-silk-opts",  // TSilkOpts
  "footprint_silk_opts": "t-silk-opts",  // TSilkOpts
  "pcb_preference": "t-preference",  // TPreference
  "footprint_preference": "t-preference",  // TPreference
  "pcb_via": "t-pcb-via",  // TPcbVia
  "footprint_via": "t-pcb-via",  // TPcbVia
  "pcb_pad": "t-pcb-pad",  // TPcbPad
  "footprint_pad": "t-pcb-pad",  // TPcbPad
  "pcb_line": "t-pcb-line",  // TPcbLine
  "footprint_line": "t-pcb-line",  // TPcbLine
  "pcb_arc": "t-pcb-arc",  // TPcbArc
  "footprint_arc": "t-pcb-arc",  // TPcbArc
  "pcb_obj": "t-pcb-obj",  // TPcbObj
  "footprint_obj": "t-pcb-obj",  // TPcbObj
  "pcb_eqlen_grp": "teq-len-grp",  // TEQLenGrp
  "footprint_eqlen_grp": "teq-len-grp",  // TEQLenGrp
  "pcb_poly": "t-pcb-poly",  // TPcbPoly
  "footprint_poly": "t-pcb-poly",  // TPcbPoly
  "pcb_fill": "t-pcb-fill",  // TPcbFill
  "footprint_fill": "t-pcb-fill",  // TPcbFill
  "pcb_layer_fill": "t-layer-fill",  // TLayerFill
  "footprint_layer_fill": "t-layer-fill",  // TLayerFill
  "pcb_region": "t-pcb-region",  // TPcbRegion
  "footprint_region": "t-pcb-region",  // TPcbRegion
  "pcb_pour": "t-pcb-pour",  // TPcbPour
  "footprint_pour": "t-pcb-pour",  // TPcbPour
  "pcb_poured": "t-pcb-poured",  // TPcbPoured
  "footprint_poured": "t-pcb-poured",  // TPcbPoured
  "pcb_image": "t-pcb-image",  // TPcbImage
  "footprint_image": "t-pcb-image",  // TPcbImage
  "pcb_teardrop": "t-pcb-teardrop",  // TPcbTeardrop
  "footprint_teardrop": "t-pcb-teardrop",  // TPcbTeardrop
  "pcb_fpc_fill": "t-pcb-fpc-fill",  // TPcbFpcFill
  "footprint_fpc_fill": "t-pcb-fpc-fill",  // TPcbFpcFill
  "pcb_shell": "t-pcb-shell",  // TPcbShell
  "footprint_shell": "t-pcb-shell",  // TPcbShell
  "pcb_crease": "t-pcb-crease",  // TPcbCrease
  "footprint_crease": "t-pcb-crease",  // TPcbCrease
  "pcb_shellcut": "t-pcb-shell-cut",  // TPcbShellCut
  "footprint_shellcut": "t-pcb-shell-cut",  // TPcbShellCut
  "pcb_shell_entity": "t-pcb-shell-entity",  // TPcbShellEntity
  "footprint_shell_entity": "t-pcb-shell-entity",  // TPcbShellEntity
  "pcb_boss": "t-pcb-boss",  // TPcbBoss
  "footprint_boss": "t-pcb-boss",  // TPcbBoss
  "pcb_string": "t-pcb-string",  // TPcbString
  "footprint_string": "t-pcb-string",  // TPcbString
  "pcb_dimension": "t-pcb-dimension",  // TPcbDimension
  "footprint_dimension": "t-pcb-dimension",  // TPcbDimension
  "pcb_panelize_stamp": "t-panelize-stamp",  // TPanelizeStamp
  "footprint_panelize_stamp": "t-panelize-stamp",  // TPanelizeStamp
  "pcb_panelize_side": "t-panelize-side",  // TPanelizeSide
  "footprint_panelize_side": "t-panelize-side",  // TPanelizeSide
  "pcb_panelize": "t-panelize",  // TPanelize
  "footprint_panelize": "t-panelize",  // TPanelize
  "pcb_component": "tm-pcb-component",  // TMPcbComponent
  "footprint_component": "tm-pcb-component",  // TMPcbComponent
  "pcb_footprint_net": "t-footprint-net",  // TFootprintNet
  "footprint_footprint_net": "t-footprint-net",  // TFootprintNet
  "pcb_pad_net": "t-pad-net",  // TPadNet
  "footprint_pad_net": "t-pad-net",  // TPadNet
  "pcb_attr": "t-pcb-attr",  // TPcbAttr
  "footprint_attr": "t-pcb-attr",  // TPcbAttr
  "pcb_x_net": "t-pcb-x-nets",  // TPcbXNets
  "footprint_x_net": "t-pcb-x-nets",  // TPcbXNets
  "pcb_x_net_group": "t-base-x-nets-group",  // TBaseXNetsGroup
  "footprint_x_net_group": "t-base-x-nets-group",  // TBaseXNetsGroup
  "pcb_d3_attribute": "td3attribute",  // TD3Attribute
  "footprint_d3_attribute": "td3attribute",  // TD3Attribute
  "pcb_e-pcb-data-type": "e-pcb-data-type",  // EPcbDataType
  "footprint_e-pcb-data-type": "e-pcb-data-type",  // EPcbDataType
  "config_universal": "t-universal",  // TUniversal
  "config_e-setting-type": "e-setting-type",  // ESettingType
  "pcb_rule_template": "t-rule-template",  // TRuleTemplate
  "sch_rule_template": "t-rule-template",  // TRuleTemplate
  "pcb_rule": "t-rule",  // TRule
  "sch_rule": "t-rule",  // TRule
  "pcb_rule_selector": "t-rule-selector",  // TRuleSelector
  "sch_rule_selector": "t-rule-selector",  // TRuleSelector
  "sch_page_line": "t-sch-line",  // TSchLine
  "symbol_line": "t-sch-line",  // TSchLine
  "simulation_line": "t-sch-line",  // TSchLine
  "sch_page_busentry": "t-sch-bus-entry",  // TSchBusEntry
  "symbol_busentry": "t-sch-bus-entry",  // TSchBusEntry
  "simulation_busentry": "t-sch-bus-entry",  // TSchBusEntry
  "sch_page_wire": "t-wire",  // TWire
  "symbol_wire": "t-wire",  // TWire
  "simulation_wire": "t-wire",  // TWire
  "sch_page_bus": "t-bus",  // TBus
  "symbol_bus": "t-bus",  // TBus
  "simulation_bus": "t-bus",  // TBus
  "sch_page_group": "t-sch-group",  // TSchGroup
  "symbol_group": "t-sch-group",  // TSchGroup
  "simulation_group": "t-sch-group",  // TSchGroup
  "sch_page_bezier": "t-sch-bezier",  // TSchBezier
  "symbol_bezier": "t-sch-bezier",  // TSchBezier
  "simulation_bezier": "t-sch-bezier",  // TSchBezier
  "sch_page_text": "t-sch-text",  // TSchText
  "symbol_text": "t-sch-text",  // TSchText
  "simulation_text": "t-sch-text",  // TSchText
  "sch_page_poly": "t-sch-poly",  // TSchPoly
  "symbol_poly": "t-sch-poly",  // TSchPoly
  "simulation_poly": "t-sch-poly",  // TSchPoly
  "sch_page_circle": "t-sch-circle",  // TSchCircle
  "symbol_circle": "t-sch-circle",  // TSchCircle
  "simulation_circle": "t-sch-circle",  // TSchCircle
  "sch_page_arc": "t-sch-arc",  // TSchArc
  "symbol_arc": "t-sch-arc",  // TSchArc
  "simulation_arc": "t-sch-arc",  // TSchArc
  "sch_page_rect": "t-sch-rect",  // TSchRect
  "symbol_rect": "t-sch-rect",  // TSchRect
  "simulation_rect": "t-sch-rect",  // TSchRect
  "sch_page_pin": "t-sch-pin",  // TSchPin
  "symbol_pin": "t-sch-pin",  // TSchPin
  "simulation_pin": "t-sch-pin",  // TSchPin
  "sch_page_obj": "t-sch-obj",  // TSchObj
  "symbol_obj": "t-sch-obj",  // TSchObj
  "simulation_obj": "t-sch-obj",  // TSchObj
  "sch_page_component": "tm-sch-component",  // TMSchComponent
  "symbol_component": "tm-sch-component",  // TMSchComponent
  "simulation_component": "tm-sch-component",  // TMSchComponent
  "sch_page_ellipse": "t-sch-ellipse",  // TSchEllipse
  "symbol_ellipse": "t-sch-ellipse",  // TSchEllipse
  "simulation_ellipse": "t-sch-ellipse",  // TSchEllipse
  "sch_page_t-table-cell": "t-table-cell",  // TTableCell
  "symbol_t-table-cell": "t-table-cell",  // TTableCell
  "simulation_t-table-cell": "t-table-cell",  // TTableCell
  "sch_page_table": "t-sch-table",  // TSchTable
  "symbol_table": "t-sch-table",  // TSchTable
  "simulation_table": "t-sch-table",  // TSchTable
  "sch_page_attr": "t-sch-attr",  // TSchAttr
  "symbol_attr": "t-sch-attr",  // TSchAttr
  "simulation_attr": "t-sch-attr",  // TSchAttr
  "sch_page_part": "t-part",  // TPart
  "symbol_part": "t-part",  // TPart
  "simulation_part": "t-part",  // TPart
  "sch_page_canvas": "t-sch-canvas",  // TSchCanvas
  "symbol_canvas": "t-sch-canvas",  // TSchCanvas
  "simulation_canvas": "t-sch-canvas",  // TSchCanvas
  "sch_page_mask_region": "t-sch-mask-region",  // TSchMaskRegion
  "symbol_mask_region": "t-sch-mask-region",  // TSchMaskRegion
  "simulation_mask_region": "t-sch-mask-region",  // TSchMaskRegion
  "sch_page_ng_setting": "tng-setting",  // TNGSetting
  "symbol_ng_setting": "tng-setting",  // TNGSetting
  "simulation_ng_setting": "tng-setting",  // TNGSetting
  "sch_differential_pair": "t-differential-pair",  // TDifferentialPair
  "simulation_sch_differential_pair": "t-differential-pair",  // TDifferentialPair
  "sch_net_class": "t-net-class",  // TNetClass
  "simulation_sch_net_class": "t-net-class",  // TNetClass
  "sch_eql_net_grp": "teq-len-net-grp",  // TEQLenNetGrp
  "simulation_sch_eql_net_grp": "teq-len-net-grp",  // TEQLenNetGrp
  "sch_e-schematic-type": "e-schematic-type",  // ESchematicType
  "simulation_sch_e-schematic-type": "e-schematic-type",  // ESchematicType
};

const TYPE_MAP = {
  "ACTIVE_LAYER": "t-active-layer",  // TActiveLayer
  "active_layer": "t-active-layer",  // TActiveLayer
  "ARC": "t-sch-arc",  // TSchArc
  "arc": "t-sch-arc",  // TSchArc
  "ATTR": "t-sch-attr",  // TSchAttr
  "attr": "t-sch-attr",  // TSchAttr
  "AUXLINE": "t-aux-line",  // TAuxLine
  "auxline": "t-aux-line",  // TAuxLine
  "BEZIER": "t-sch-bezier",  // TSchBezier
  "bezier": "t-sch-bezier",  // TSchBezier
  "BLOB": "tm-blob",  // TMBlob
  "blob": "tm-blob",  // TMBlob
  "BOARD": "t-pcb-board",  // TPcbBoard
  "board": "t-pcb-board",  // TPcbBoard
  "BOSS": "t-pcb-boss",  // TPcbBoss
  "boss": "t-pcb-boss",  // TPcbBoss
  "BUS": "t-bus",  // TBus
  "bus": "t-bus",  // TBus
  "BUSENTRY": "t-sch-bus-entry",  // TSchBusEntry
  "busentry": "t-sch-bus-entry",  // TSchBusEntry
  "CANVAS": "t-sch-canvas",  // TSchCanvas
  "canvas": "t-sch-canvas",  // TSchCanvas
  "CIRCLE": "t-sch-circle",  // TSchCircle
  "circle": "t-sch-circle",  // TSchCircle
  "COMPONENT": "tm-sch-component",  // TMSchComponent
  "component": "tm-sch-component",  // TMSchComponent
  "CREASE": "t-pcb-crease",  // TPcbCrease
  "crease": "t-pcb-crease",  // TPcbCrease
  "D3_ATTRIBUTE": "td3attribute",  // TD3Attribute
  "d3_attribute": "td3attribute",  // TD3Attribute
  "DIFFERENTIAL_PAIR": "t-differential-pair",  // TDifferentialPair
  "differential_pair": "t-differential-pair",  // TDifferentialPair
  "DIMENSION": "t-pcb-dimension",  // TPcbDimension
  "dimension": "t-pcb-dimension",  // TPcbDimension
  "ELLIPSE": "t-sch-ellipse",  // TSchEllipse
  "ellipse": "t-sch-ellipse",  // TSchEllipse
  "EQL_NET_GRP": "teq-len-net-grp",  // TEQLenNetGrp
  "eql_net_grp": "teq-len-net-grp",  // TEQLenNetGrp
  "EQLEN_GRP": "teq-len-grp",  // TEQLenGrp
  "eqlen_grp": "teq-len-grp",  // TEQLenGrp
  "FILL": "t-pcb-fill",  // TPcbFill
  "fill": "t-pcb-fill",  // TPcbFill
  "FONT": "tm-font",  // TMFont
  "font": "tm-font",  // TMFont
  "FOOTPRINT_NET": "t-footprint-net",  // TFootprintNet
  "footprint_net": "t-footprint-net",  // TFootprintNet
  "FPC_FILL": "t-pcb-fpc-fill",  // TPcbFpcFill
  "fpc_fill": "t-pcb-fpc-fill",  // TPcbFpcFill
  "GROUP": "t-sch-group",  // TSchGroup
  "group": "t-sch-group",  // TSchGroup
  "IMAGE": "t-pcb-image",  // TPcbImage
  "image": "t-pcb-image",  // TPcbImage
  "LAYER": "t-layer",  // TLayer
  "layer": "t-layer",  // TLayer
  "LAYER_FILL": "t-layer-fill",  // TLayerFill
  "layer_fill": "t-layer-fill",  // TLayerFill
  "LAYER_PHYS": "t-layer-phys",  // TLayerPhys
  "layer_phys": "t-layer-phys",  // TLayerPhys
  "LINE": "t-sch-line",  // TSchLine
  "line": "t-sch-line",  // TSchLine
  "MASK_REGION": "t-sch-mask-region",  // TSchMaskRegion
  "mask_region": "t-sch-mask-region",  // TSchMaskRegion
  "META": "tm-sheet",  // TMSheet
  "meta": "tm-sheet",  // TMSheet
  "NET": "t-net",  // TNet
  "net": "t-net",  // TNet
  "NET_CLASS": "t-net-class",  // TNetClass
  "net_class": "t-net-class",  // TNetClass
  "NG_SETTING": "tng-setting",  // TNGSetting
  "ng_setting": "tng-setting",  // TNGSetting
  "OBJ": "t-sch-obj",  // TSchObj
  "obj": "t-sch-obj",  // TSchObj
  "PAD": "t-pcb-pad",  // TPcbPad
  "pad": "t-pcb-pad",  // TPcbPad
  "PAD_NET": "t-pad-net",  // TPadNet
  "pad_net": "t-pad-net",  // TPadNet
  "PANELIZE": "t-panelize",  // TPanelize
  "panelize": "t-panelize",  // TPanelize
  "PANELIZE_SIDE": "t-panelize-side",  // TPanelizeSide
  "panelize_side": "t-panelize-side",  // TPanelizeSide
  "PANELIZE_STAMP": "t-panelize-stamp",  // TPanelizeStamp
  "panelize_stamp": "t-panelize-stamp",  // TPanelizeStamp
  "PART": "t-part",  // TPart
  "part": "t-part",  // TPart
  "PARTITION": "t-partition",  // TPartition
  "partition": "t-partition",  // TPartition
  "PIN": "t-sch-pin",  // TSchPin
  "pin": "t-sch-pin",  // TSchPin
  "POLY": "t-sch-poly",  // TSchPoly
  "poly": "t-sch-poly",  // TSchPoly
  "POUR": "t-pcb-pour",  // TPcbPour
  "pour": "t-pcb-pour",  // TPcbPour
  "POURED": "t-pcb-poured",  // TPcbPoured
  "poured": "t-pcb-poured",  // TPcbPoured
  "PREFERENCE": "t-preference",  // TPreference
  "preference": "t-preference",  // TPreference
  "PRIMITIVE": "t-primitive",  // TPrimitive
  "primitive": "t-primitive",  // TPrimitive
  "RECT": "t-sch-rect",  // TSchRect
  "rect": "t-sch-rect",  // TSchRect
  "REGION": "t-pcb-region",  // TPcbRegion
  "region": "t-pcb-region",  // TPcbRegion
  "RULE": "t-rule",  // TRule
  "rule": "t-rule",  // TRule
  "RULE_SELECTOR": "t-rule-selector",  // TRuleSelector
  "rule_selector": "t-rule-selector",  // TRuleSelector
  "RULE_TEMPLATE": "t-rule-template",  // TRuleTemplate
  "rule_template": "t-rule-template",  // TRuleTemplate
  "SHELL": "t-pcb-shell",  // TPcbShell
  "shell": "t-pcb-shell",  // TPcbShell
  "SHELL_ENTITY": "t-pcb-shell-entity",  // TPcbShellEntity
  "shell_entity": "t-pcb-shell-entity",  // TPcbShellEntity
  "SHELLCUT": "t-pcb-shell-cut",  // TPcbShellCut
  "shellcut": "t-pcb-shell-cut",  // TPcbShellCut
  "SILK_OPTS": "t-silk-opts",  // TSilkOpts
  "silk_opts": "t-silk-opts",  // TSilkOpts
  "STRING": "t-pcb-string",  // TPcbString
  "string": "t-pcb-string",  // TPcbString
  "TABLE": "t-sch-table",  // TSchTable
  "table": "t-sch-table",  // TSchTable
  "TEARDROP": "t-pcb-teardrop",  // TPcbTeardrop
  "teardrop": "t-pcb-teardrop",  // TPcbTeardrop
  "TEXT": "t-sch-text",  // TSchText
  "text": "t-sch-text",  // TSchText
  "UNIVERSAL": "t-universal",  // TUniversal
  "universal": "t-universal",  // TUniversal
  "VIA": "t-pcb-via",  // TPcbVia
  "via": "t-pcb-via",  // TPcbVia
  "WIRE": "t-wire",  // TWire
  "wire": "t-wire",  // TWire
  "X_NET": "t-pcb-x-nets",  // TPcbXNets
  "x_net": "t-pcb-x-nets",  // TPcbXNets
  "X_NET_GROUP": "t-base-x-nets-group",  // TBaseXNetsGroup
  "x_net_group": "t-base-x-nets-group",  // TBaseXNetsGroup
  "BLOB_BLOB": "tm-blob",  // TMBlob
  "blob_blob": "tm-blob",  // TMBlob
  "BOARD_META": "tm-board",  // TMBoard
  "board_meta": "tm-board",  // TMBoard
  "CONFIG_E-SETTING-TYPE": "e-setting-type",  // ESettingType
  "config_e-setting-type": "e-setting-type",  // ESettingType
  "CONFIG_META": "tm-config",  // TMConfig
  "config_meta": "tm-config",  // TMConfig
  "CONFIG_UNIVERSAL": "t-universal",  // TUniversal
  "config_universal": "t-universal",  // TUniversal
  "DEVICE_META": "tm-device",  // TMDevice
  "device_meta": "tm-device",  // TMDevice
  "FONT_FONT": "tm-font",  // TMFont
  "font_font": "tm-font",  // TMFont
  "FOOTPRINT_ACTIVE_LAYER": "t-active-layer",  // TActiveLayer
  "footprint_active_layer": "t-active-layer",  // TActiveLayer
  "FOOTPRINT_ARC": "t-pcb-arc",  // TPcbArc
  "footprint_arc": "t-pcb-arc",  // TPcbArc
  "FOOTPRINT_ATTR": "t-pcb-attr",  // TPcbAttr
  "footprint_attr": "t-pcb-attr",  // TPcbAttr
  "FOOTPRINT_BOARD": "t-pcb-board",  // TPcbBoard
  "footprint_board": "t-pcb-board",  // TPcbBoard
  "FOOTPRINT_BOSS": "t-pcb-boss",  // TPcbBoss
  "footprint_boss": "t-pcb-boss",  // TPcbBoss
  "FOOTPRINT_CANVAS": "t-canvas",  // TCanvas
  "footprint_canvas": "t-canvas",  // TCanvas
  "FOOTPRINT_COMPONENT": "tm-pcb-component",  // TMPcbComponent
  "footprint_component": "tm-pcb-component",  // TMPcbComponent
  "FOOTPRINT_CREASE": "t-pcb-crease",  // TPcbCrease
  "footprint_crease": "t-pcb-crease",  // TPcbCrease
  "FOOTPRINT_D3_ATTRIBUTE": "td3attribute",  // TD3Attribute
  "footprint_d3_attribute": "td3attribute",  // TD3Attribute
  "FOOTPRINT_DIMENSION": "t-pcb-dimension",  // TPcbDimension
  "footprint_dimension": "t-pcb-dimension",  // TPcbDimension
  "FOOTPRINT_E-PCB-DATA-TYPE": "e-pcb-data-type",  // EPcbDataType
  "footprint_e-pcb-data-type": "e-pcb-data-type",  // EPcbDataType
  "FOOTPRINT_EQLEN_GRP": "teq-len-grp",  // TEQLenGrp
  "footprint_eqlen_grp": "teq-len-grp",  // TEQLenGrp
  "FOOTPRINT_FILL": "t-pcb-fill",  // TPcbFill
  "footprint_fill": "t-pcb-fill",  // TPcbFill
  "FOOTPRINT_FOOTPRINT_NET": "t-footprint-net",  // TFootprintNet
  "footprint_footprint_net": "t-footprint-net",  // TFootprintNet
  "FOOTPRINT_FPC_FILL": "t-pcb-fpc-fill",  // TPcbFpcFill
  "footprint_fpc_fill": "t-pcb-fpc-fill",  // TPcbFpcFill
  "FOOTPRINT_GROUP": "t-pcb-group",  // TPcbGroup
  "footprint_group": "t-pcb-group",  // TPcbGroup
  "FOOTPRINT_IMAGE": "t-pcb-image",  // TPcbImage
  "footprint_image": "t-pcb-image",  // TPcbImage
  "FOOTPRINT_LAYER": "t-layer",  // TLayer
  "footprint_layer": "t-layer",  // TLayer
  "FOOTPRINT_LAYER_FILL": "t-layer-fill",  // TLayerFill
  "footprint_layer_fill": "t-layer-fill",  // TLayerFill
  "FOOTPRINT_LAYER_PHYS": "t-layer-phys",  // TLayerPhys
  "footprint_layer_phys": "t-layer-phys",  // TLayerPhys
  "FOOTPRINT_LINE": "t-pcb-line",  // TPcbLine
  "footprint_line": "t-pcb-line",  // TPcbLine
  "FOOTPRINT_META": "tm-footprint",  // TMFootprint
  "footprint_meta": "tm-footprint",  // TMFootprint
  "FOOTPRINT_OBJ": "t-pcb-obj",  // TPcbObj
  "footprint_obj": "t-pcb-obj",  // TPcbObj
  "FOOTPRINT_PAD": "t-pcb-pad",  // TPcbPad
  "footprint_pad": "t-pcb-pad",  // TPcbPad
  "FOOTPRINT_PAD_NET": "t-pad-net",  // TPadNet
  "footprint_pad_net": "t-pad-net",  // TPadNet
  "FOOTPRINT_PANELIZE": "t-panelize",  // TPanelize
  "footprint_panelize": "t-panelize",  // TPanelize
  "FOOTPRINT_PANELIZE_SIDE": "t-panelize-side",  // TPanelizeSide
  "footprint_panelize_side": "t-panelize-side",  // TPanelizeSide
  "FOOTPRINT_PANELIZE_STAMP": "t-panelize-stamp",  // TPanelizeStamp
  "footprint_panelize_stamp": "t-panelize-stamp",  // TPanelizeStamp
  "FOOTPRINT_PARTITION": "t-partition",  // TPartition
  "footprint_partition": "t-partition",  // TPartition
  "FOOTPRINT_POLY": "t-pcb-poly",  // TPcbPoly
  "footprint_poly": "t-pcb-poly",  // TPcbPoly
  "FOOTPRINT_POUR": "t-pcb-pour",  // TPcbPour
  "footprint_pour": "t-pcb-pour",  // TPcbPour
  "FOOTPRINT_POURED": "t-pcb-poured",  // TPcbPoured
  "footprint_poured": "t-pcb-poured",  // TPcbPoured
  "FOOTPRINT_PREFERENCE": "t-preference",  // TPreference
  "footprint_preference": "t-preference",  // TPreference
  "FOOTPRINT_PRIMITIVE": "t-primitive",  // TPrimitive
  "footprint_primitive": "t-primitive",  // TPrimitive
  "FOOTPRINT_REGION": "t-pcb-region",  // TPcbRegion
  "footprint_region": "t-pcb-region",  // TPcbRegion
  "FOOTPRINT_SHELL": "t-pcb-shell",  // TPcbShell
  "footprint_shell": "t-pcb-shell",  // TPcbShell
  "FOOTPRINT_SHELL_ENTITY": "t-pcb-shell-entity",  // TPcbShellEntity
  "footprint_shell_entity": "t-pcb-shell-entity",  // TPcbShellEntity
  "FOOTPRINT_SHELLCUT": "t-pcb-shell-cut",  // TPcbShellCut
  "footprint_shellcut": "t-pcb-shell-cut",  // TPcbShellCut
  "FOOTPRINT_SILK_OPTS": "t-silk-opts",  // TSilkOpts
  "footprint_silk_opts": "t-silk-opts",  // TSilkOpts
  "FOOTPRINT_STRING": "t-pcb-string",  // TPcbString
  "footprint_string": "t-pcb-string",  // TPcbString
  "FOOTPRINT_TEARDROP": "t-pcb-teardrop",  // TPcbTeardrop
  "footprint_teardrop": "t-pcb-teardrop",  // TPcbTeardrop
  "FOOTPRINT_VIA": "t-pcb-via",  // TPcbVia
  "footprint_via": "t-pcb-via",  // TPcbVia
  "FOOTPRINT_X_NET": "t-pcb-x-nets",  // TPcbXNets
  "footprint_x_net": "t-pcb-x-nets",  // TPcbXNets
  "FOOTPRINT_X_NET_GROUP": "t-base-x-nets-group",  // TBaseXNetsGroup
  "footprint_x_net_group": "t-base-x-nets-group",  // TBaseXNetsGroup
  "PANEL_AUXLINE": "t-aux-line",  // TAuxLine
  "panel_auxline": "t-aux-line",  // TAuxLine
  "PANEL_CANVAS": "t-panel-canvas",  // TPanelCanvas
  "panel_canvas": "t-panel-canvas",  // TPanelCanvas
  "PANEL_DIMENSION": "t-panel-dimension",  // TPanelDimension
  "panel_dimension": "t-panel-dimension",  // TPanelDimension
  "PANEL_E-PANEL-DATA-TYPE": "e-panel-data-type",  // EPanelDataType
  "panel_e-panel-data-type": "e-panel-data-type",  // EPanelDataType
  "PANEL_GROUP": "t-panel-group",  // TPanelGroup
  "panel_group": "t-panel-group",  // TPanelGroup
  "PANEL_LIB_AUXLINE": "t-aux-line",  // TAuxLine
  "panel_lib_auxline": "t-aux-line",  // TAuxLine
  "PANEL_LIB_CANVAS": "t-panel-canvas",  // TPanelCanvas
  "panel_lib_canvas": "t-panel-canvas",  // TPanelCanvas
  "PANEL_LIB_DIMENSION": "t-panel-dimension",  // TPanelDimension
  "panel_lib_dimension": "t-panel-dimension",  // TPanelDimension
  "PANEL_LIB_E-PANEL-DATA-TYPE": "e-panel-data-type",  // EPanelDataType
  "panel_lib_e-panel-data-type": "e-panel-data-type",  // EPanelDataType
  "PANEL_LIB_GROUP": "t-panel-group",  // TPanelGroup
  "panel_lib_group": "t-panel-group",  // TPanelGroup
  "PANEL_LIB_META": "tm-panel-lib",  // TMPanelLib
  "panel_lib_meta": "tm-panel-lib",  // TMPanelLib
  "PANEL_LIB_POLY": "t-panel-poly",  // TPanelPoly
  "panel_lib_poly": "t-panel-poly",  // TPanelPoly
  "PANEL_LIB_STRING": "t-panel-string",  // TPanelString
  "panel_lib_string": "t-panel-string",  // TPanelString
  "PANEL_META": "tm-panel",  // TMPanel
  "panel_meta": "tm-panel",  // TMPanel
  "PANEL_POLY": "t-panel-poly",  // TPanelPoly
  "panel_poly": "t-panel-poly",  // TPanelPoly
  "PANEL_STRING": "t-panel-string",  // TPanelString
  "panel_string": "t-panel-string",  // TPanelString
  "PCB_ACTIVE_LAYER": "t-active-layer",  // TActiveLayer
  "pcb_active_layer": "t-active-layer",  // TActiveLayer
  "PCB_ARC": "t-pcb-arc",  // TPcbArc
  "pcb_arc": "t-pcb-arc",  // TPcbArc
  "PCB_ATTR": "t-pcb-attr",  // TPcbAttr
  "pcb_attr": "t-pcb-attr",  // TPcbAttr
  "PCB_BOARD": "t-pcb-board",  // TPcbBoard
  "pcb_board": "t-pcb-board",  // TPcbBoard
  "PCB_BOSS": "t-pcb-boss",  // TPcbBoss
  "pcb_boss": "t-pcb-boss",  // TPcbBoss
  "PCB_CANVAS": "t-canvas",  // TCanvas
  "pcb_canvas": "t-canvas",  // TCanvas
  "PCB_COMPONENT": "tm-pcb-component",  // TMPcbComponent
  "pcb_component": "tm-pcb-component",  // TMPcbComponent
  "PCB_CREASE": "t-pcb-crease",  // TPcbCrease
  "pcb_crease": "t-pcb-crease",  // TPcbCrease
  "PCB_D3_ATTRIBUTE": "td3attribute",  // TD3Attribute
  "pcb_d3_attribute": "td3attribute",  // TD3Attribute
  "PCB_DIMENSION": "t-pcb-dimension",  // TPcbDimension
  "pcb_dimension": "t-pcb-dimension",  // TPcbDimension
  "PCB_E-PCB-DATA-TYPE": "e-pcb-data-type",  // EPcbDataType
  "pcb_e-pcb-data-type": "e-pcb-data-type",  // EPcbDataType
  "PCB_EQLEN_GRP": "teq-len-grp",  // TEQLenGrp
  "pcb_eqlen_grp": "teq-len-grp",  // TEQLenGrp
  "PCB_FILL": "t-pcb-fill",  // TPcbFill
  "pcb_fill": "t-pcb-fill",  // TPcbFill
  "PCB_FOOTPRINT_NET": "t-footprint-net",  // TFootprintNet
  "pcb_footprint_net": "t-footprint-net",  // TFootprintNet
  "PCB_FPC_FILL": "t-pcb-fpc-fill",  // TPcbFpcFill
  "pcb_fpc_fill": "t-pcb-fpc-fill",  // TPcbFpcFill
  "PCB_GROUP": "t-pcb-group",  // TPcbGroup
  "pcb_group": "t-pcb-group",  // TPcbGroup
  "PCB_IMAGE": "t-pcb-image",  // TPcbImage
  "pcb_image": "t-pcb-image",  // TPcbImage
  "PCB_LAYER": "t-layer",  // TLayer
  "pcb_layer": "t-layer",  // TLayer
  "PCB_LAYER_FILL": "t-layer-fill",  // TLayerFill
  "pcb_layer_fill": "t-layer-fill",  // TLayerFill
  "PCB_LAYER_PHYS": "t-layer-phys",  // TLayerPhys
  "pcb_layer_phys": "t-layer-phys",  // TLayerPhys
  "PCB_LINE": "t-pcb-line",  // TPcbLine
  "pcb_line": "t-pcb-line",  // TPcbLine
  "PCB_META": "tm-pcb",  // TMPcb
  "pcb_meta": "tm-pcb",  // TMPcb
  "PCB_NET": "t-net",  // TNet
  "pcb_net": "t-net",  // TNet
  "PCB_OBJ": "t-pcb-obj",  // TPcbObj
  "pcb_obj": "t-pcb-obj",  // TPcbObj
  "PCB_PAD": "t-pcb-pad",  // TPcbPad
  "pcb_pad": "t-pcb-pad",  // TPcbPad
  "PCB_PAD_NET": "t-pad-net",  // TPadNet
  "pcb_pad_net": "t-pad-net",  // TPadNet
  "PCB_PANELIZE": "t-panelize",  // TPanelize
  "pcb_panelize": "t-panelize",  // TPanelize
  "PCB_PANELIZE_SIDE": "t-panelize-side",  // TPanelizeSide
  "pcb_panelize_side": "t-panelize-side",  // TPanelizeSide
  "PCB_PANELIZE_STAMP": "t-panelize-stamp",  // TPanelizeStamp
  "pcb_panelize_stamp": "t-panelize-stamp",  // TPanelizeStamp
  "PCB_PARTITION": "t-partition",  // TPartition
  "pcb_partition": "t-partition",  // TPartition
  "PCB_POLY": "t-pcb-poly",  // TPcbPoly
  "pcb_poly": "t-pcb-poly",  // TPcbPoly
  "PCB_POUR": "t-pcb-pour",  // TPcbPour
  "pcb_pour": "t-pcb-pour",  // TPcbPour
  "PCB_POURED": "t-pcb-poured",  // TPcbPoured
  "pcb_poured": "t-pcb-poured",  // TPcbPoured
  "PCB_PREFERENCE": "t-preference",  // TPreference
  "pcb_preference": "t-preference",  // TPreference
  "PCB_PRIMITIVE": "t-primitive",  // TPrimitive
  "pcb_primitive": "t-primitive",  // TPrimitive
  "PCB_REGION": "t-pcb-region",  // TPcbRegion
  "pcb_region": "t-pcb-region",  // TPcbRegion
  "PCB_RULE": "t-rule",  // TRule
  "pcb_rule": "t-rule",  // TRule
  "PCB_RULE_SELECTOR": "t-rule-selector",  // TRuleSelector
  "pcb_rule_selector": "t-rule-selector",  // TRuleSelector
  "PCB_RULE_TEMPLATE": "t-rule-template",  // TRuleTemplate
  "pcb_rule_template": "t-rule-template",  // TRuleTemplate
  "PCB_SHELL": "t-pcb-shell",  // TPcbShell
  "pcb_shell": "t-pcb-shell",  // TPcbShell
  "PCB_SHELL_ENTITY": "t-pcb-shell-entity",  // TPcbShellEntity
  "pcb_shell_entity": "t-pcb-shell-entity",  // TPcbShellEntity
  "PCB_SHELLCUT": "t-pcb-shell-cut",  // TPcbShellCut
  "pcb_shellcut": "t-pcb-shell-cut",  // TPcbShellCut
  "PCB_SILK_OPTS": "t-silk-opts",  // TSilkOpts
  "pcb_silk_opts": "t-silk-opts",  // TSilkOpts
  "PCB_STRING": "t-pcb-string",  // TPcbString
  "pcb_string": "t-pcb-string",  // TPcbString
  "PCB_TEARDROP": "t-pcb-teardrop",  // TPcbTeardrop
  "pcb_teardrop": "t-pcb-teardrop",  // TPcbTeardrop
  "PCB_VIA": "t-pcb-via",  // TPcbVia
  "pcb_via": "t-pcb-via",  // TPcbVia
  "PCB_X_NET": "t-pcb-x-nets",  // TPcbXNets
  "pcb_x_net": "t-pcb-x-nets",  // TPcbXNets
  "PCB_X_NET_GROUP": "t-base-x-nets-group",  // TBaseXNetsGroup
  "pcb_x_net_group": "t-base-x-nets-group",  // TBaseXNetsGroup
  "SCH_DIFFERENTIAL_PAIR": "t-differential-pair",  // TDifferentialPair
  "sch_differential_pair": "t-differential-pair",  // TDifferentialPair
  "SCH_E-SCHEMATIC-TYPE": "e-schematic-type",  // ESchematicType
  "sch_e-schematic-type": "e-schematic-type",  // ESchematicType
  "SCH_EQL_NET_GRP": "teq-len-net-grp",  // TEQLenNetGrp
  "sch_eql_net_grp": "teq-len-net-grp",  // TEQLenNetGrp
  "SCH_META": "tm-schematic",  // TMSchematic
  "sch_meta": "tm-schematic",  // TMSchematic
  "SCH_NET_CLASS": "t-net-class",  // TNetClass
  "sch_net_class": "t-net-class",  // TNetClass
  "SCH_PAGE_ARC": "t-sch-arc",  // TSchArc
  "sch_page_arc": "t-sch-arc",  // TSchArc
  "SCH_PAGE_ATTR": "t-sch-attr",  // TSchAttr
  "sch_page_attr": "t-sch-attr",  // TSchAttr
  "SCH_PAGE_BEZIER": "t-sch-bezier",  // TSchBezier
  "sch_page_bezier": "t-sch-bezier",  // TSchBezier
  "SCH_PAGE_BUS": "t-bus",  // TBus
  "sch_page_bus": "t-bus",  // TBus
  "SCH_PAGE_BUSENTRY": "t-sch-bus-entry",  // TSchBusEntry
  "sch_page_busentry": "t-sch-bus-entry",  // TSchBusEntry
  "SCH_PAGE_CANVAS": "t-sch-canvas",  // TSchCanvas
  "sch_page_canvas": "t-sch-canvas",  // TSchCanvas
  "SCH_PAGE_CIRCLE": "t-sch-circle",  // TSchCircle
  "sch_page_circle": "t-sch-circle",  // TSchCircle
  "SCH_PAGE_COMPONENT": "tm-sch-component",  // TMSchComponent
  "sch_page_component": "tm-sch-component",  // TMSchComponent
  "SCH_PAGE_ELLIPSE": "t-sch-ellipse",  // TSchEllipse
  "sch_page_ellipse": "t-sch-ellipse",  // TSchEllipse
  "SCH_PAGE_GROUP": "t-sch-group",  // TSchGroup
  "sch_page_group": "t-sch-group",  // TSchGroup
  "SCH_PAGE_LINE": "t-sch-line",  // TSchLine
  "sch_page_line": "t-sch-line",  // TSchLine
  "SCH_PAGE_MASK_REGION": "t-sch-mask-region",  // TSchMaskRegion
  "sch_page_mask_region": "t-sch-mask-region",  // TSchMaskRegion
  "SCH_PAGE_META": "tm-sheet",  // TMSheet
  "sch_page_meta": "tm-sheet",  // TMSheet
  "SCH_PAGE_NG_SETTING": "tng-setting",  // TNGSetting
  "sch_page_ng_setting": "tng-setting",  // TNGSetting
  "SCH_PAGE_OBJ": "t-sch-obj",  // TSchObj
  "sch_page_obj": "t-sch-obj",  // TSchObj
  "SCH_PAGE_PART": "t-part",  // TPart
  "sch_page_part": "t-part",  // TPart
  "SCH_PAGE_PIN": "t-sch-pin",  // TSchPin
  "sch_page_pin": "t-sch-pin",  // TSchPin
  "SCH_PAGE_POLY": "t-sch-poly",  // TSchPoly
  "sch_page_poly": "t-sch-poly",  // TSchPoly
  "SCH_PAGE_RECT": "t-sch-rect",  // TSchRect
  "sch_page_rect": "t-sch-rect",  // TSchRect
  "SCH_PAGE_T-TABLE-CELL": "t-table-cell",  // TTableCell
  "sch_page_t-table-cell": "t-table-cell",  // TTableCell
  "SCH_PAGE_TABLE": "t-sch-table",  // TSchTable
  "sch_page_table": "t-sch-table",  // TSchTable
  "SCH_PAGE_TEXT": "t-sch-text",  // TSchText
  "sch_page_text": "t-sch-text",  // TSchText
  "SCH_PAGE_WIRE": "t-wire",  // TWire
  "sch_page_wire": "t-wire",  // TWire
  "SCH_RULE": "t-rule",  // TRule
  "sch_rule": "t-rule",  // TRule
  "SCH_RULE_SELECTOR": "t-rule-selector",  // TRuleSelector
  "sch_rule_selector": "t-rule-selector",  // TRuleSelector
  "SCH_RULE_TEMPLATE": "t-rule-template",  // TRuleTemplate
  "sch_rule_template": "t-rule-template",  // TRuleTemplate
  "SIMULATION_ARC": "t-sch-arc",  // TSchArc
  "simulation_arc": "t-sch-arc",  // TSchArc
  "SIMULATION_ATTR": "t-sch-attr",  // TSchAttr
  "simulation_attr": "t-sch-attr",  // TSchAttr
  "SIMULATION_BEZIER": "t-sch-bezier",  // TSchBezier
  "simulation_bezier": "t-sch-bezier",  // TSchBezier
  "SIMULATION_BUS": "t-bus",  // TBus
  "simulation_bus": "t-bus",  // TBus
  "SIMULATION_BUSENTRY": "t-sch-bus-entry",  // TSchBusEntry
  "simulation_busentry": "t-sch-bus-entry",  // TSchBusEntry
  "SIMULATION_CANVAS": "t-sch-canvas",  // TSchCanvas
  "simulation_canvas": "t-sch-canvas",  // TSchCanvas
  "SIMULATION_CIRCLE": "t-sch-circle",  // TSchCircle
  "simulation_circle": "t-sch-circle",  // TSchCircle
  "SIMULATION_COMPONENT": "tm-sch-component",  // TMSchComponent
  "simulation_component": "tm-sch-component",  // TMSchComponent
  "SIMULATION_ELLIPSE": "t-sch-ellipse",  // TSchEllipse
  "simulation_ellipse": "t-sch-ellipse",  // TSchEllipse
  "SIMULATION_GROUP": "t-sch-group",  // TSchGroup
  "simulation_group": "t-sch-group",  // TSchGroup
  "SIMULATION_LINE": "t-sch-line",  // TSchLine
  "simulation_line": "t-sch-line",  // TSchLine
  "SIMULATION_MASK_REGION": "t-sch-mask-region",  // TSchMaskRegion
  "simulation_mask_region": "t-sch-mask-region",  // TSchMaskRegion
  "SIMULATION_META": "tm-simulation",  // TMSimulation
  "simulation_meta": "tm-simulation",  // TMSimulation
  "SIMULATION_NG_SETTING": "tng-setting",  // TNGSetting
  "simulation_ng_setting": "tng-setting",  // TNGSetting
  "SIMULATION_OBJ": "t-sch-obj",  // TSchObj
  "simulation_obj": "t-sch-obj",  // TSchObj
  "SIMULATION_PART": "t-part",  // TPart
  "simulation_part": "t-part",  // TPart
  "SIMULATION_PIN": "t-sch-pin",  // TSchPin
  "simulation_pin": "t-sch-pin",  // TSchPin
  "SIMULATION_POLY": "t-sch-poly",  // TSchPoly
  "simulation_poly": "t-sch-poly",  // TSchPoly
  "SIMULATION_RECT": "t-sch-rect",  // TSchRect
  "simulation_rect": "t-sch-rect",  // TSchRect
  "SIMULATION_SCH_DIFFERENTIAL_PAIR": "t-differential-pair",  // TDifferentialPair
  "simulation_sch_differential_pair": "t-differential-pair",  // TDifferentialPair
  "SIMULATION_SCH_E-SCHEMATIC-TYPE": "e-schematic-type",  // ESchematicType
  "simulation_sch_e-schematic-type": "e-schematic-type",  // ESchematicType
  "SIMULATION_SCH_EQL_NET_GRP": "teq-len-net-grp",  // TEQLenNetGrp
  "simulation_sch_eql_net_grp": "teq-len-net-grp",  // TEQLenNetGrp
  "SIMULATION_SCH_META": "tm-sim-schematic",  // TMSimSchematic
  "simulation_sch_meta": "tm-sim-schematic",  // TMSimSchematic
  "SIMULATION_SCH_NET_CLASS": "t-net-class",  // TNetClass
  "simulation_sch_net_class": "t-net-class",  // TNetClass
  "SIMULATION_T-TABLE-CELL": "t-table-cell",  // TTableCell
  "simulation_t-table-cell": "t-table-cell",  // TTableCell
  "SIMULATION_TABLE": "t-sch-table",  // TSchTable
  "simulation_table": "t-sch-table",  // TSchTable
  "SIMULATION_TEXT": "t-sch-text",  // TSchText
  "simulation_text": "t-sch-text",  // TSchText
  "SIMULATION_WIRE": "t-wire",  // TWire
  "simulation_wire": "t-wire",  // TWire
  "SYMBOL_ARC": "t-sch-arc",  // TSchArc
  "symbol_arc": "t-sch-arc",  // TSchArc
  "SYMBOL_ATTR": "t-sch-attr",  // TSchAttr
  "symbol_attr": "t-sch-attr",  // TSchAttr
  "SYMBOL_BEZIER": "t-sch-bezier",  // TSchBezier
  "symbol_bezier": "t-sch-bezier",  // TSchBezier
  "SYMBOL_BUS": "t-bus",  // TBus
  "symbol_bus": "t-bus",  // TBus
  "SYMBOL_BUSENTRY": "t-sch-bus-entry",  // TSchBusEntry
  "symbol_busentry": "t-sch-bus-entry",  // TSchBusEntry
  "SYMBOL_CANVAS": "t-sch-canvas",  // TSchCanvas
  "symbol_canvas": "t-sch-canvas",  // TSchCanvas
  "SYMBOL_CIRCLE": "t-sch-circle",  // TSchCircle
  "symbol_circle": "t-sch-circle",  // TSchCircle
  "SYMBOL_COMPONENT": "tm-sch-component",  // TMSchComponent
  "symbol_component": "tm-sch-component",  // TMSchComponent
  "SYMBOL_ELLIPSE": "t-sch-ellipse",  // TSchEllipse
  "symbol_ellipse": "t-sch-ellipse",  // TSchEllipse
  "SYMBOL_GROUP": "t-sch-group",  // TSchGroup
  "symbol_group": "t-sch-group",  // TSchGroup
  "SYMBOL_LINE": "t-sch-line",  // TSchLine
  "symbol_line": "t-sch-line",  // TSchLine
  "SYMBOL_MASK_REGION": "t-sch-mask-region",  // TSchMaskRegion
  "symbol_mask_region": "t-sch-mask-region",  // TSchMaskRegion
  "SYMBOL_META": "tm-symbol",  // TMSymbol
  "symbol_meta": "tm-symbol",  // TMSymbol
  "SYMBOL_NG_SETTING": "tng-setting",  // TNGSetting
  "symbol_ng_setting": "tng-setting",  // TNGSetting
  "SYMBOL_OBJ": "t-sch-obj",  // TSchObj
  "symbol_obj": "t-sch-obj",  // TSchObj
  "SYMBOL_PART": "t-part",  // TPart
  "symbol_part": "t-part",  // TPart
  "SYMBOL_PIN": "t-sch-pin",  // TSchPin
  "symbol_pin": "t-sch-pin",  // TSchPin
  "SYMBOL_POLY": "t-sch-poly",  // TSchPoly
  "symbol_poly": "t-sch-poly",  // TSchPoly
  "SYMBOL_RECT": "t-sch-rect",  // TSchRect
  "symbol_rect": "t-sch-rect",  // TSchRect
  "SYMBOL_T-TABLE-CELL": "t-table-cell",  // TTableCell
  "symbol_t-table-cell": "t-table-cell",  // TTableCell
  "SYMBOL_TABLE": "t-sch-table",  // TSchTable
  "symbol_table": "t-sch-table",  // TSchTable
  "SYMBOL_TEXT": "t-sch-text",  // TSchText
  "symbol_text": "t-sch-text",  // TSchText
  "SYMBOL_WIRE": "t-wire",  // TWire
  "symbol_wire": "t-wire",  // TWire
  "AUX_LINE": "t-aux-line",  // TAuxLine
  "aux_line": "t-aux-line",  // TAuxLine
  "DOCHEAD": "t-doc-head",  // TDocHead
  "dochead": "t-doc-head",  // TDocHead
};

/**
 * 解析 schema 文件名
 *
 * 给了 docType（--doc 写法）就先查 DOC_TYPE_MAP，保证按「文档类型 + 裸图元名」解析；
 * 否则查 TYPE_MAP（裸名 / 前缀名两种写法）。
 */
function resolveSchemaKey(type, docType) {
  const lower = type.toLowerCase();
  if (docType) {
    const scoped = DOC_TYPE_MAP[String(docType).toLowerCase() + "_" + lower];
    if (scoped) return scoped;
  }
  return TYPE_MAP[lower] || lower;
}

/**
 * 图元是否登记在指定文档类型下
 *
 * 直接给 schema 文件名（如 t-net）是允许的写法，所以也认。
 */
function isRegisteredPair(type, docType) {
  const lower = type.toLowerCase();
  if (DOC_TYPE_MAP[String(docType).toLowerCase() + "_" + lower]) return true;
  return Boolean(TYPE_TO_SCHEMA[lower]);
}

/**
 * 验证外层数据（元数据：type, id, ticket）
 * @param {object} outerData - 外层数据
 * @returns {{valid: boolean, errors: Array<{field: string, message: string, severity: string}>}}
 */
function validateOuter(outerData) {
  const validate = compileSchema("__outer__", OUTER_SCHEMA);

  if (validate(outerData)) {
    return { valid: true, errors: [] };
  }

  const errors = [];
  for (const error of validate.errors) {
    errors.push({
      field: error.instancePath.replace(/^\//, "") || error.params.missingProperty || "root",
      message: error.message,
      severity: "ERROR"
    });
  }

  return { valid: false, errors };
}

/**
 * 验证格式
 * @param {string} type - 图元类型（如 LINE、PCB_LINE、PAD、VIA）
 * @param {object} data - 待验证的数据
 * @param {string} [docType] - 文档类型（配合 --doc，按裸图元名查表时用）
 * @returns {{valid: boolean, errors: Array<{field: string, message: string, severity: string}>}}
 */
function validateFormat(type, data, docType) {
  if (typeof type !== "string") {
    return {
      valid: false,
      errors: [{ field: "type", message: "type 必须是字符串", severity: "ERROR" }]
    };
  }

  const schemaKey = resolveSchemaKey(type, docType);
  const schema = TYPE_TO_SCHEMA[schemaKey];

  if (!schema) {
    return {
      valid: false,
      errors: [{ field: "type", message: "Unknown type: " + type, severity: "ERROR" }]
    };
  }

  const validate = compileSchema(schemaKey, schema);

  if (validate(data)) {
    return { valid: true, errors: [] };
  }

  const errors = [];
  for (const error of validate.errors) {
    errors.push({
      field: error.instancePath.replace(/^\//, "") || error.params.missingProperty || "root",
      message: error.message,
      severity: "ERROR"
    });
  }

  return { valid: false, errors };
}

/**
 * 编译 schema（按 key 缓存，重复校验同一类型不重复编译）
 */
const COMPILED = new Map();
function compileSchema(schemaKey, schema) {
  let validate = COMPILED.get(schemaKey);
  if (!validate) {
    const ajv = new Ajv({ allErrors: true, strict: false });
    if (addFormats) addFormats(ajv);
    validate = ajv.compile(schema);
    COMPILED.set(schemaKey, validate);
  }
  return validate;
}

// 命令行接口
if (require.main === module) {
  const argv = process.argv.slice(2);
  let docType = null;
  const args = [];
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--doc") {
      docType = argv[++i];
      continue;
    }
    args.push(argv[i]);
  }

  const printUsage = () => {
    console.error("Usage: node validate.js [--doc <docType>] <type> <json-data>");
    console.error("       node validate.js [--doc <docType>] '<外层JSON>||<内层JSON>'");
    console.error("");
    console.error("  --doc <docType>  指定文档类型（SCH_PAGE / PCB / PANEL / …），");
    console.error("                   等价于把类型写成 <docType>_<type>，如 PCB_LINE");
    console.error("  传整行（含 ||）时会同时校验外层 {type,id,ticket}");
    console.error("");
    console.error("Example: node validate.js PCB_LINE '{\"netName\":\"+5V\",...}'");
    console.error("         node validate.js LINE '{...}' --doc PCB");
    process.exit(1);
  };

  // 允许两种入参：<type> <data> 或 直接给一整行 <外层>||<内层>
  let type = null;
  let raw = null;
  if (args.length >= 2) {
    type = args[0];
    raw = args.slice(1).join(" ");
  } else if (args.length === 1 && args[0].includes("||")) {
    raw = args[0];
  } else {
    printUsage();
  }

  // 行尾的 | 是行分隔符，不属于 JSON
  const input = raw.replace(/\|+$/, "");
  const sepIndex = input.indexOf("||");
  let outer = null;
  let data;
  try {
    if (sepIndex >= 0) {
      outer = JSON.parse(input.slice(0, sepIndex));
      data = JSON.parse(input.slice(sepIndex + 2));
      if (!type && outer && typeof outer.type === "string") type = outer.type;
    } else {
      data = JSON.parse(input);
    }
  } catch (e) {
    console.error("Error: 数据不是合法 JSON — " + e.message);
    if (sepIndex < 0) {
      console.error("提示：整行数据要用 <外层JSON>||<内层JSON> 的形式（外层含 type / id / ticket）");
    }
    process.exit(1);
  }

  if (!type) {
    console.error("Error: 没有解析出图元类型，请用 <type> 参数或在外层 JSON 里给出 type");
    printUsage();
  }

  if (docType && !DOC_TYPES[String(docType).toUpperCase()]) {
    console.error("Error: 未知的文档类型: " + docType);
    console.error("已知文档类型: " + Object.keys(DOC_TYPES).sort().join(", "));
    process.exit(1);
  }

  if (docType && !isRegisteredPair(type, docType)) {
    console.error("警告: " + docType + " 下未登记图元 \"" + type + "\"，已回退到裸名规则解析为 schema " + resolveSchemaKey(type, docType) + "；若文档类型写错请核对。");
  }

  const result = validateFormat(type, data, docType);
  const outerResult = outer ? validateOuter(outer) : null;

  const output = {
    valid: result.valid && (outerResult ? outerResult.valid : true),
    type: type,
    schema: resolveSchemaKey(type, docType),
    errors: [].concat(outerResult ? outerResult.errors : [], result.errors)
  };
  console.log(JSON.stringify(output, null, 2));
  process.exit(output.valid ? 0 : 1);
}

module.exports = { validateFormat, validateOuter };
