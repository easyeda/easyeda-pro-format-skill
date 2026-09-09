# TPcbPad

> 返回 [PCB 图元索引](../../documents/PCB.md)

## 定义

焊盘

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| partitionId | `string | null` |  | - | 所属分区编号，为null表示无分区 |
| groupId | `string` | ✓ | - | 分组编号, 没有则为 0 不分组，非 0 为组标志，相同组标志的为一组 |
| layerId | `number` | ✓ | - | 层编号 |
| locked | `boolean` | ✓ | - | 是否锁定 |
| zIndex | `number | null` | ✓ | - | Z 轴高度, null 为默认 |
| netName | `string` | ✓ | - | NET，网络名称 |
| num | `string` | ✓ | - | 焊盘编号 |
| centerX | `number` | ✓ | - | 焊盘原点 X |
| centerY | `number` | ✓ | - | 焊盘原点 Y |
| padAngle | `number` | ✓ | - | 焊盘旋转角度（角度制） |
| hole | `THoleDef` | ✓ | - | 孔，null 表示无孔 |
| defaultPad | `TPadDef` | ✓ | - | 默认焊盘：参考焊盘 |
| specialPad | `{
		/** 开始层 */
		startLayer: number;
		/** 结束层 */
		endLayer: number;
		/** 参考焊盘 */
		pad: TPadDef;
	}[]` | ✓ | - | 特殊焊盘 |
| padOffsetX | `number` | ✓ | - | 孔偏移 X |
| padOffsetY | `number` | ✓ | - | 孔偏移 Y |
| relativeAngle | `number` | ✓ | - | 孔相对焊盘旋转角度（角度制） |
| plated | `boolean` | ✓ | - | plated 是否金属化孔壁 |
| padType | `EPadFuncType` | ✓ | - | 焊盘功能 |
| topSolderExpansion | `number | null` | ✓ | - | 顶层阻焊扩展：null 为遵循规则 |
| bottomSolderExpansion | `number | null` | ✓ | - | 底层阻焊扩展：null 为遵循规则 |
| topPasteExpansion | `number | null` | ✓ | - | 顶层助焊扩展：null 为遵循规则 |
| bottomPasteExpansion | `number | null` | ✓ | - | 底层助焊扩展：null 为遵循规则 |
| connectMode | `EPadConnect | null` | ✓ | - | 热焊-连接方式：null 为遵循规则，其他数据定义同设计规则 |
| spokeSpace | `number | null` | ✓ | - | 热焊-发散间距：null 为遵循规则，其他数据定义同设计规则 |
| spokeWidth | `number | null` | ✓ | - | 热焊-发散线宽：null 为遵循规则，其他数据定义同设计规则 |
| spokeAngle | `number | null` | ✓ | - | 热焊-发散角度：null 为遵循规则，其他数据定义同设计规则 |
| unusedInnerLayers | `number[]` |  | - | 隐藏焊盘层（可选）：被隐藏焊盘的层数组 |
| padLen | `number` | ✓ | - | 引脚长度 |
| propagationDelay | `number` | ✓ | - | 传播延迟，3.3 新增 |
| attrsMap | `{ [key: string]: any }` |  | - | 自定义属性 |
| refs | `string[]` |  | - | 关联的图元编号 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-pcb-pad.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `layerId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `netName`: 必需字段 |
| required | ERROR | `num`: 必需字段 |
| required | ERROR | `centerX`: 必需字段 |
| required | ERROR | `centerY`: 必需字段 |
| required | ERROR | `padAngle`: 必需字段 |
| required | ERROR | `hole`: 必需字段 |
| required | ERROR | `defaultPad`: 必需字段 |
| required | ERROR | `specialPad`: 必需字段 |
| required | ERROR | `padOffsetX`: 必需字段 |
| required | ERROR | `padOffsetY`: 必需字段 |
| required | ERROR | `relativeAngle`: 必需字段 |
| required | ERROR | `plated`: 必需字段 |
| required | ERROR | `padType`: 必需字段 |
| required | ERROR | `topSolderExpansion`: 必需字段 |
| required | ERROR | `bottomSolderExpansion`: 必需字段 |
| required | ERROR | `topPasteExpansion`: 必需字段 |
| required | ERROR | `bottomPasteExpansion`: 必需字段 |
| required | ERROR | `connectMode`: 必需字段 |
| required | ERROR | `spokeSpace`: 必需字段 |
| required | ERROR | `spokeWidth`: 必需字段 |
| required | ERROR | `spokeAngle`: 必需字段 |
| required | ERROR | `padLen`: 必需字段 |
| required | ERROR | `propagationDelay`: 必需字段 |
| enum | ERROR | `padType`: 允许值: NORMAL, TEST, MARKER |
| enum | ERROR | `connectMode`: 允许值: DIVERGENCE, DIRECT, NON_CONNECT |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PCB/t-pcb-pad.md)

