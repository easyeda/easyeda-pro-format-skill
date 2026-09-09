/**
 * 格式验证脚本
 *
 * 用法: node validate.js [--save] <type> <json-data>
 * 示例: node validate.js LINE '{"startX":100,"startY":200}'
 */

// 检查依赖
let Ajv, addFormats;
try {
  Ajv = require("ajv");
  addFormats = require("ajv-formats");
} catch (error) {
  console.error("错误: 验证脚本需要 ajv 和 ajv-formats 依赖");
  console.error("请运行: npm install ajv ajv-formats");
  process.exit(1);
}

const fs = require("fs");
const path = require("path");

// 外层 Schema（元数据：type, id, ticket）
const OUTER_SCHEMA = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "EasyEDA Outer Metadata",
  "description": "外层数据结构（最终一致性框架元数据）",
  "type": "object",
  "required": ["type", "id", "ticket"],
  "properties": {
    "type": {
      "type": "string",
      "description": "图元类型名"
    },
    "id": {
      "type": "string",
      "pattern": "^[a-f0-9]{16}$",
      "description": "文档内唯一标识（16位十六进制字符串）"
    },
    "ticket": {
      "type": "integer",
      "minimum": 0,
      "description": "逻辑时钟，用于冲突解决"
    }
  }
};

// 类型到 schema 文件的映射
const TYPE_TO_SCHEMA = {
  "font-cache": require("./schemas/font-cache.json"),
  "version": require("./schemas/version.json"),
  "old-font-style": require("./schemas/old-font-style.json"),
  "compute": require("./schemas/compute.json"),
  "strict-omit": require("./schemas/strict-omit.json"),
  "merge": require("./schemas/merge.json"),
  "t-select-props": require("./schemas/t-select-props.json"),
  "doctype": require("./schemas/doctype.json"),
  "t-base-history": require("./schemas/t-base-history.json"),
  "t-history": require("./schemas/t-history.json"),
  "tp-config": require("./schemas/tp-config.json"),
  "tp-board": require("./schemas/tp-board.json"),
  "tp-schematic": require("./schemas/tp-schematic.json"),
  "tp-sim-schematic": require("./schemas/tp-sim-schematic.json"),
  "tp-component": require("./schemas/tp-component.json"),
  "tp-symbol": require("./schemas/tp-symbol.json"),
  "tp-footprint": require("./schemas/tp-footprint.json"),
  "tp-document": require("./schemas/tp-document.json"),
  "tp-panel": require("./schemas/tp-panel.json"),
  "tp-panel-lib": require("./schemas/tp-panel-lib.json"),
  "tp-sheet": require("./schemas/tp-sheet.json"),
  "tp-simulation": require("./schemas/tp-simulation.json"),
  "tp-pcb": require("./schemas/tp-pcb.json"),
  "tp-device": require("./schemas/tp-device.json"),
  "t-instance-attr": require("./schemas/t-instance-attr.json"),
  "tp-instance": require("./schemas/tp-instance.json"),
  "tp-blob": require("./schemas/tp-blob.json"),
  "tb-font": require("./schemas/tb-font.json"),
  "tp-font": require("./schemas/tp-font.json"),
  "t-component-group-data": require("./schemas/t-component-group-data.json"),
  "t-variant": require("./schemas/t-variant.json"),
  "t-component-group": require("./schemas/t-component-group.json"),
  "t-project": require("./schemas/t-project.json"),
  "i-transform": require("./schemas/i-transform.json"),
  "t-encode-result": require("./schemas/t-encode-result.json"),
  "t-name-source-uuid": require("./schemas/t-name-source-uuid.json"),
  "t-alt-attrs": require("./schemas/t-alt-attrs.json"),
  "attributes": require("./schemas/attributes.json"),
  "t-result": require("./schemas/t-result.json"),
  "t-placeholder": require("./schemas/t-placeholder.json"),
  "t-user": require("./schemas/t-user.json"),
  "t-update-component": require("./schemas/t-update-component.json"),
  "t-out-data": require("./schemas/t-out-data.json"),
  "t-doc-head": require("./schemas/t-doc-head.json"),
  "t-edit-head": require("./schemas/t-edit-head.json"),
  "t-pcb-components-on-parse": require("./schemas/t-pcb-components-on-parse.json"),
  "t-project-ft-attrs": require("./schemas/t-project-ft-attrs.json"),
  "t-sch-components-on-parse": require("./schemas/t-sch-components-on-parse.json"),
  "t-attr-key": require("./schemas/t-attr-key.json"),
  "e-header-type": require("./schemas/e-header-type.json"),
  "e-atom-type": require("./schemas/e-atom-type.json"),
  "i-stream-writer": require("./schemas/i-stream-writer.json"),
  "r-related": require("./schemas/r-related.json"),
  "t-extract": require("./schemas/t-extract.json"),
  "tr-flow-parse": require("./schemas/tr-flow-parse.json"),
  "t-flow-parse-props": require("./schemas/t-flow-parse-props.json"),
  "t-extract-canvas-props": require("./schemas/t-extract-canvas-props.json"),
  "e-reuse-item-type": require("./schemas/e-reuse-item-type.json"),
  "t-line": require("./schemas/t-line.json"),
  "e-operation": require("./schemas/e-operation.json"),
  "shape-type": require("./schemas/shape-type.json"),
  "writer": require("./schemas/writer.json"),
  "reader": require("./schemas/reader.json"),
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
  "ascii": require("./schemas/ascii.json"),
  "iterator": require("./schemas/iterator.json"),
  "iterable": require("./schemas/iterable.json"),
  "log-formatter": require("./schemas/log-formatter.json"),
  "log-writter": require("./schemas/log-writter.json"),
  "loglevel": require("./schemas/loglevel.json"),
  "st_lexer": require("./schemas/st_lexer.json"),
  "st_parser": require("./schemas/st_parser.json"),
  "stat": require("./schemas/stat.json"),
  "fmt_stat": require("./schemas/fmt_stat.json"),
  "t-list-value": require("./schemas/t-list-value.json"),
  "t-link-list": require("./schemas/t-link-list.json"),
  "t-topic": require("./schemas/t-topic.json"),
  "e-linked-list": require("./schemas/e-linked-list.json"),
  "t-get-for-cache": require("./schemas/t-get-for-cache.json"),
  "t-get-revoke-publish": require("./schemas/t-get-revoke-publish.json"),
  "t-revoke": require("./schemas/t-revoke.json"),
  "t-change-props": require("./schemas/t-change-props.json"),
  "t-revoke-props": require("./schemas/t-revoke-props.json"),
  "t-get-canvas-ids": require("./schemas/t-get-canvas-ids.json"),
  "t-compress-props": require("./schemas/t-compress-props.json"),
  "t-flow-compress-props": require("./schemas/t-flow-compress-props.json"),
};

// 原始类型名到 schema 文件名的映射
const TYPE_MAP = {
  "ACTIVE_LAYER": "t-active-layer",  // TActiveLayer
  "active_layer": "t-active-layer",  // TActiveLayer
  "ARC": "t-sch-arc",  // TSchArc
  "arc": "t-sch-arc",  // TSchArc
  "ATTR": "t-sch-attr",  // TSchAttr
  "attr": "t-sch-attr",  // TSchAttr
  "AUX_LINE": "t-aux-line",  // TAuxLine
  "aux_line": "t-aux-line",  // TAuxLine
  "AUXLINE": "t-aux-line",  // TAuxLine（面板数据类型枚举中的正式名称）
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
  "BOARD_META": "tm-board",  // TMBoard
  "board_meta": "tm-board",  // TMBoard
  "CONFIG_META": "tm-config",  // TMConfig
  "config_meta": "tm-config",  // TMConfig
  "DEVICE_META": "tm-device",  // TMDevice
  "device_meta": "tm-device",  // TMDevice
  "FOOTPRINT_META": "tm-footprint",  // TMFootprint
  "footprint_meta": "tm-footprint",  // TMFootprint
  "PANEL_META": "tm-panel",  // TMPanel
  "panel_meta": "tm-panel",  // TMPanel
  "PANEL_LIB_META": "tm-panel-lib",  // TMPanelLib
  "panel_lib_meta": "tm-panel-lib",  // TMPanelLib
  "PCB_META": "tm-pcb",  // TMPcb
  "pcb_meta": "tm-pcb",  // TMPcb
  "SCH_META": "tm-schematic",  // TMSchematic
  "sch_meta": "tm-schematic",  // TMSchematic
  "SIMULATION_META": "tm-simulation",  // TMSimulation
  "simulation_meta": "tm-simulation",  // TMSimulation
  "SIMULATION_SCH_META": "tm-sim-schematic",  // TMSimSchematic
  "simulation_sch_meta": "tm-sim-schematic",  // TMSimSchematic
  "SYMBOL_META": "tm-symbol",  // TMSymbol
  "symbol_meta": "tm-symbol",  // TMSymbol
  "NET": "t-net",  // TNet
  "net": "t-net",  // TNet
  "NET_CLASS": "t-net-class",  // TNetClass
  "net_class": "t-net-class",  // TNetClass
  "NG_SETTING": "tng-setting",  // TNGSetting
  "ng_setting": "tng-setting",  // TNGSetting
  "OBJ": "t-sch-obj",  // TSchObj
  "obj": "t-sch-obj",  // TSchObj
  "PCB_ARC": "t-pcb-arc",  // TPcbArc
  "pcb_arc": "t-pcb-arc",  // TPcbArc
  "PCB_ATTR": "t-pcb-attr",  // TPcbAttr
  "pcb_attr": "t-pcb-attr",  // TPcbAttr
  "PCB_CANVAS": "t-canvas",  // TCanvas
  "pcb_canvas": "t-canvas",  // TCanvas
  "PCB_COMPONENT": "tm-pcb-component",  // TMPcbComponent
  "pcb_component": "tm-pcb-component",  // TMPcbComponent
  "PCB_GROUP": "t-pcb-group",  // TPcbGroup
  "pcb_group": "t-pcb-group",  // TPcbGroup
  "PCB_LINE": "t-pcb-line",  // TPcbLine
  "pcb_line": "t-pcb-line",  // TPcbLine
  "PCB_OBJ": "t-pcb-obj",  // TPcbObj
  "pcb_obj": "t-pcb-obj",  // TPcbObj
  "PCB_POLY": "t-pcb-poly",  // TPcbPoly
  "pcb_poly": "t-pcb-poly",  // TPcbPoly
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
  "PANEL_CANVAS": "t-panel-canvas",  // TPanelCanvas
  "panel_canvas": "t-panel-canvas",  // TPanelCanvas
  "PANEL_DIMENSION": "t-panel-dimension",  // TPanelDimension
  "panel_dimension": "t-panel-dimension",  // TPanelDimension
  "PANEL_GROUP": "t-panel-group",  // TPanelGroup
  "panel_group": "t-panel-group",  // TPanelGroup
  "PANEL_POLY": "t-panel-poly",  // TPanelPoly
  "panel_poly": "t-panel-poly",  // TPanelPoly
  "PANEL_STRING": "t-panel-string",  // TPanelString
  "panel_string": "t-panel-string",  // TPanelString
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
};

/**
 * 验证外层数据（元数据：type, id, ticket）
 * @param {object} outerData - 外层数据
 * @returns {{valid: boolean, errors: Array<{field: string, message: string, severity: string}>}}
 */
function validateOuter(outerData) {
  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);
  const validate = ajv.compile(OUTER_SCHEMA);

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
 * @param {string} type - 图元类型（如 LINE, VIA）
 * @param {object} data - 待验证的数据
 * @returns {{valid: boolean, errors: Array<{field: string, message: string, severity: string}>}}
 */
function validateFormat(type, data) {
  // DOCHEAD 特殊处理：使用内联 schema
  if (type.toUpperCase() === "DOCHEAD") {
    const docHeadSchema = {
      "type": "object",
      "required": ["docType", "uuid", "client"],
      "properties": {
        "docType": { "type": "string" },
        "uuid": { "type": "string", "pattern": "^[a-f0-9]{16}$" },
        "client": { "type": "string", "pattern": "^[a-f0-9]{16}$" },
        "updateTime": { "type": "number" },
        "version": { "type": "string" }
      }
    };
    const ajv = new Ajv({ allErrors: true, strict: false });
    addFormats(ajv);
    const validate = ajv.compile(docHeadSchema);

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

  const schemaKey = TYPE_MAP[type.toLowerCase()] || type.toLowerCase();
  const schema = TYPE_TO_SCHEMA[schemaKey];

  if (!schema) {
    return {
      valid: false,
      errors: [{ field: "type", message: "Unknown type: " + type, severity: "ERROR" }]
    };
  }

  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);
  let validate;
  try {
    validate = ajv.compile(schema);
  } catch (e) {
    return {
      valid: false,
      errors: [{ field: "type", message: "Invalid schema for type " + type + ": " + e.message, severity: "ERROR" }]
    };
  }

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

// 命令行接口
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error("Usage: node validate.js <type> <json-data>");
    console.error("Example: node validate.js LINE '{\"startX\":100,\"startY\":200}'");
    process.exit(1);
  }

  const type = args[0];
  const jsonStr = args.slice(1).join(" ");

  let data;
  try {
    data = JSON.parse(jsonStr);
  } catch (e) {
    console.error("Error: Invalid JSON data");
    process.exit(1);
  }

  const result = validateFormat(type, data);
  console.log(JSON.stringify(result, null, 2));
  process.exit(result.valid ? 0 : 1);
}

module.exports = { validateFormat, validateOuter };
