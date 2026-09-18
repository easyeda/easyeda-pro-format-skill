# TMPcbComponent

> 返回 [PCB 图元索引](../../documents/PCB.md)

## 定义

器件实例

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| partitionId | `string \| null` |  | - | 所属分区编号，为null表示无分区 |
| groupId | `string` | ✓ | - | 分组编号, 没有则为 0 不分组，非 0 为组标志，相同组标志的为一组 |
| layerId | `number` | ✓ | - | 层编号 |
| locked | `boolean` | ✓ | - | 是否锁定 |
| zIndex | `number \| null` | ✓ | default: null | Z 轴高度, null 为默认 |
| x | `number` | ✓ | - | 位置 X |
| y | `number` | ✓ | - | 位置 Y |
| angle | `number` | ✓ | - | 旋转角度（角度制） |
| attrs | `{ DeviceName: string; Devices: string; Footprints: string; 'Group ID'?: string; 'Channel ID'?: string; [key: string]: any }` | ✓ | - | 自定义属性,固定 3D Model 为 3D 模型的 uuid，此 uuid 代表 components 表中 doctype = 16 的一条记录,固定 3D Model Transform 为 3D 模型变换参数 |
| footprintPrimitives | `boolean` | ✓ | default: true | 封装内图元，是否锁定, 默认为 true 锁定，3.3 版本新增字段 |
| specialColor | `string` |  | pattern: ^$\|^#[0-9A-Fa-f]{6}$ | 特殊颜色 |
| pinSwap | `boolean` |  | default: false | 是否启用引脚交换，3.4 版本新增，默认不启用 |
| pinSwapInfo | `{ [id: string]: { pinClass: string; differentialPairClass: string } }` |  | - | 引脚交换相关信息，3.4 版本新增 |
| layerIdReplacements | `Record<string, number>` |  | - | 层ID替换表(originLayerId -> layerIdToApply) |

## 对象字段成员

以下字段的类型是内联对象，成员定义如下：

### `attrs`

自定义属性,固定 3D Model 为 3D 模型的 uuid，此 uuid 代表 components 表中 doctype = 16 的一条记录,固定 3D Model Transform 为 3D 模型变换参数

| 成员 | 类型 | 必需 | 说明 |
|------|------|------|------|
| DeviceName | `string` | ✓ | 当前绑定文本器件（uuid 可为空），v4 新增; `{ uuid: string; name: string; source: string }`的JSON.string序列化 |
| Devices | `string` | ✓ | 备选器件，v4 新增; `{ uuid: string; name: string; source: string }[]`的JSON.string序列化 |
| Footprints | `string` | ✓ | 备选封装，v4 新增; `{ uuid: string; name: string; source: string }[]`的JSON.string序列化 |
| Group ID | `string` |  | 分组 ID |
| Channel ID | `string` |  | 通道 ID |
| [key: string] | `any` |  | 其他自定义 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/tm-pcb-component.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `layerId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `x`: 必需字段 |
| required | ERROR | `y`: 必需字段 |
| required | ERROR | `angle`: 必需字段 |
| required | ERROR | `attrs`: 必需字段 |
| required | ERROR | `footprintPrimitives`: 必需字段 |
| pattern | ERROR | `specialColor`: 匹配模式: ^$\|^#[0-9A-Fa-f]{6}$ |

### 父子图元

此图元包含以下子图元类型：

- 子图元类型: [TPcbAttr](../../primitives/PCB/attr.md)
- 子图元中的关联字段: `parentId` (指向父图元 id)
- 父图元中的引用字段: `id`

COMPONENT 下可绑定多个 ATTR，每个 ATTR 的 parentId 必须指向 COMPONENT 的 id; 原理图必须有 key 为 'Symbol' 属性指向符号, value 值为符号的 uuid

## 示例

→ [查看示例](../../examples/PCB/tm-pcb-component.md)

