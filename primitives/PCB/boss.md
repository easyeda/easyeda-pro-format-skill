# TPcbBoss

> 返回 [PCB 图元索引](../../documents/PCB.md)

## 定义

螺丝柱

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| partitionId | `string | null` |  | - | 所属分区编号，为null表示无分区 |
| groupId | `string` | ✓ | - | 分组编号, 没有则为 0 不分组，非 0 为组标志，相同组标志的为一组 |
| layerId | `number` | ✓ | - | 层编号 |
| locked | `boolean` | ✓ | - | 是否锁定 |
| zIndex | `number | null` | ✓ | - | Z 轴高度, null 为默认 |
| centerX | `number` | ✓ | - | 中心 X |
| centerY | `number` | ✓ | - | 中心 Y |
| specification | `ESpecification | null` | ✓ | - | 螺丝型号："M2" "M3" 等，或者 null 表示自定义 |
| depth | `number` | ✓ | - | 螺丝柱高度 |
| thickness | `number` | ✓ | - | 螺丝柱壁厚 |
| holeDiameter | `number` | ✓ | - | 螺丝柱通孔直径 |
| counterBore | `{
		/**沉头孔高度 */
		height: number;
		/**沉头孔直径 */
		diameter: number;
	} | null` | ✓ | - | 沉头所需参数 当此参数为 null 时表示不需要沉头 |
| stiffener | `{
		/** 加强筋上端宽度 */
		topWidth: number;
		/** 加强筋下端宽度 */
		bottomWidth: number;
		/** 加强筋高度 */
		height: number;
		/** 加强筋厚度 */
		stiffThickness: number;
	} | null` | ✓ | - | 加强筋所需参数，当此参数为 null 时表示不需要加强筋 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-pcb-boss.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `layerId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `centerX`: 必需字段 |
| required | ERROR | `centerY`: 必需字段 |
| required | ERROR | `specification`: 必需字段 |
| required | ERROR | `depth`: 必需字段 |
| required | ERROR | `thickness`: 必需字段 |
| required | ERROR | `holeDiameter`: 必需字段 |
| required | ERROR | `counterBore`: 必需字段 |
| required | ERROR | `stiffener`: 必需字段 |
| enum | ERROR | `specification`: 允许值: M2, M3, M4, M5, M6 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PCB/t-pcb-boss.md)

