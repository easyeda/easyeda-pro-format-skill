# TMSchComponent

> 返回 [SYMBOL 图元索引](../../documents/SYMBOL.md)

## 定义

元件

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| groupId | `string` | ✓ | - | 分组编号, 没有则为空 |
| locked | `boolean` | ✓ | - | 是否锁定 |
| zIndex | `number \| null` | ✓ | - | Z 轴高度 |
| yAxisDirection | `TYAxisDirection` |  | - | Y 轴方向标记：仅 eprj3 本地文件格式会带，读盘时被剥离；语义见 TYAxisDirection |
| partId | `string` | ✓ | - | 子库编号：默认 "" |
| x | `number` | ✓ | - | 位置 X |
| y | `number` | ✓ | - | 位置 Y |
| rotation | `number` | ✓ | min: 0, max: 360 | 旋转角度（角度制）：绕 位置 旋转 |
| isMirror | `boolean` | ✓ | - | 是否镜像 |
| attrs | `{ DeviceName: string; Devices: string; FootprintName: string; Footprints: string; SymbolName: string; Symbols: string; [key: string]: string }` | ✓ | - | 自定义属性 |

## 对象字段成员

以下字段的类型是内联对象，成员定义如下：

### `attrs`

自定义属性

| 成员 | 类型 | 必需 | 说明 |
|------|------|------|------|
| DeviceName | `string` | ✓ | 当前绑定文本器件（uuid 可空），v4 新增; `{ uuid: string; name: string; source: string }`的JSON.string序列化 |
| Devices | `string` | ✓ | 备选器件，v4 新增;`{ uuid: string; name: string; source: string }[]`的JSON.string序列化 |
| FootprintName | `string` | ✓ | 当前绑定文本封装（uuid 可空），v4 新增; `{ uuid: string; name: string; source: string }`的JSON.string序列化 |
| Footprints | `string` | ✓ | 备选封装，v4 新增;`{ uuid: string; name: string; source: string }[]`的JSON.string序列化 |
| SymbolName | `string` | ✓ | 当前绑定文本符号（uuid 可空），v4 新增; `{ uuid: string; name: string; source: string }`的JSON.string序列化 |
| Symbols | `string` | ✓ | 备选符号，v4 新增;`{ uuid: string; name: string; source: string }[]`的JSON.string序列化 |
| [key: string] | `string` |  | 其他自定义 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/tm-sch-component.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `partId`: 必需字段 |
| required | ERROR | `x`: 必需字段 |
| required | ERROR | `y`: 必需字段 |
| required | ERROR | `rotation`: 必需字段 |
| required | ERROR | `isMirror`: 必需字段 |
| required | ERROR | `attrs`: 必需字段 |
| enum | ERROR | `yAxisDirection`: 允许值: up, down |
| minimum | ERROR | `rotation`: 最小值: 0 |
| maximum | ERROR | `rotation`: 最大值: 360 |

### 父子图元

此图元包含以下子图元类型：

- 子图元类型: [TSchAttr](../../primitives/SCH_PAGE/attr.md)
- 子图元中的关联字段: `parentId` (指向父图元 id)
- 父图元中的引用字段: `id`

COMPONENT 下可绑定多个 ATTR，每个 ATTR 的 parentId 必须指向 COMPONENT 的 id

## 示例

→ [查看示例](../../examples/SYMBOL/tm-sch-component.md)

