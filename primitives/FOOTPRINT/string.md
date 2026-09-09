# TPcbString

> 返回 [FOOTPRINT 图元索引](../../documents/FOOTPRINT.md)

## 定义

PCB 文字

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| partitionId | `string | null` |  | - | 所属分区编号，为null表示无分区 |
| groupId | `string` | ✓ | - | 分组编号, 没有则为 0 不分组，非 0 为组标志，相同组标志的为一组 |
| layerId | `number` | ✓ | - | 层编号 |
| locked | `boolean` | ✓ | - | 是否锁定 |
| zIndex | `number | null` | ✓ | - | Z 轴高度, null 为默认 |
| x | `number` | ✓ | - | 位置 X |
| y | `number` | ✓ | - | 位置 Y |
| text | `string` | ✓ | - | 内容 |
| fontFamily | `string` | ✓ | - | 字体名称 |
| fontSize | `number` | ✓ | min: 1 | 字号 |
| strokeWidth | `number` | ✓ | min: 0 | 粗细 |
| bold | `boolean` | ✓ | - | 是否加粗 |
| italic | `boolean` | ✓ | - | 是否斜体 |
| origin | `EAlign` | ✓ | - | 对齐模式 0 左顶 1 中顶 2 右顶 3 左中 4 中中 5 右中 6 左底 7 中底 8 右底 |
| angle | `number` | ✓ | min: 0 | 旋转角度（角度制） |
| reverse | `boolean` | ✓ | - | 是否反相扩展 |
| expansion | `number` | ✓ | - | 反相扩展尺寸：反相扩展区域的尺寸，支持负数 |
| mirror | `boolean` | ✓ | - | 是否镜像，一般来说 ，当一个文字出现在底层，这里也需要相应调整成 1 |
| specialColor | `string` |  | pattern: ^$|^#[0-9A-Fa-f]{6}$ | 特殊颜色 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-pcb-string.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `layerId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `x`: 必需字段 |
| required | ERROR | `y`: 必需字段 |
| required | ERROR | `text`: 必需字段 |
| required | ERROR | `fontFamily`: 必需字段 |
| required | ERROR | `fontSize`: 必需字段 |
| required | ERROR | `strokeWidth`: 必需字段 |
| required | ERROR | `bold`: 必需字段 |
| required | ERROR | `italic`: 必需字段 |
| required | ERROR | `origin`: 必需字段 |
| required | ERROR | `angle`: 必需字段 |
| required | ERROR | `reverse`: 必需字段 |
| required | ERROR | `expansion`: 必需字段 |
| required | ERROR | `mirror`: 必需字段 |
| minimum | ERROR | `fontSize`: 最小值: 1 |
| minimum | ERROR | `strokeWidth`: 最小值: 0 |
| enum | ERROR | `origin`: 允许值: LEFT_BOTTOM, CENTER_BOTTOM, RIGHT_BOTTOM, LEFT_MIDDLE, CENTER_MIDDLE, RIGHT_MIDDLE, LEFT_TOP, CENTER_TOP, RIGHT_TOP |
| minimum | ERROR | `angle`: 最小值: 0 |
| pattern | ERROR | `specialColor`: 匹配模式: ^$|^#[0-9A-Fa-f]{6}$ |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/FOOTPRINT/t-pcb-string.md)

