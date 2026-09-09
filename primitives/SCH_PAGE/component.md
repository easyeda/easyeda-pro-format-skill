# TMSchComponent

> 返回 [SCH_PAGE 图元索引](../../documents/SCH_PAGE.md)

## 定义

元件

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| partId | `string` | ✓ | - | 子库编号：默认 "" |
| x | `number` | ✓ | - | 位置 X |
| y | `number` | ✓ | - | 位置 Y |
| rotation | `number` | ✓ | min: 0, max: 360 | 旋转角度（角度制）：绕 位置 旋转 |
| isMirror | `boolean` | ✓ | - | 是否镜像 |
| attrs | `{
		/** 当前绑定文本器件（uuid 可空），v4 新增; `{ uuid: string; name: string; source: string }`的JSON.string序列化 */
		DeviceName: string;
		/** 备选器件，v4 新增;`{ uuid: string; name: string; source: string }[]`的JSON.string序列化 */
		Devices: string;
		/** 当前绑定文本封装（uuid 可空），v4 新增; `{ uuid: string; name: string; source: string }`的JSON.string序列化 */
		FootprintName: string;
		/** 备选封装，v4 新增;`{ uuid: string; name: string; source: string }[]`的JSON.string序列化 */
		Footprints: string;
		/** 当前绑定文本符号（uuid 可空），v4 新增; `{ uuid: string; name: string; source: string }`的JSON.string序列化 */
		SymbolName: string;
		/** 备选符号，v4 新增;`{ uuid: string; name: string; source: string }[]`的JSON.string序列化 */
		Symbols: string;
		/** 其他自定义 */
		[key: string]: string;
	}` | ✓ | - | 自定义属性 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/tm-sch-component.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `partId`: 必需字段 |
| required | ERROR | `x`: 必需字段 |
| required | ERROR | `y`: 必需字段 |
| required | ERROR | `rotation`: 必需字段 |
| required | ERROR | `isMirror`: 必需字段 |
| required | ERROR | `attrs`: 必需字段 |
| minimum | ERROR | `rotation`: 最小值: 0 |
| maximum | ERROR | `rotation`: 最大值: 360 |

### 父子图元

此图元包含以下子图元类型：

- 子图元类型: [TSchAttr](../../primitives/SCH_PAGE/attr.md)
- 子图元中的关联字段: `parentId` (指向父图元 id)
- 父图元中的引用字段: `id`

COMPONENT 下可绑定多个 ATTR，每个 ATTR 的 parentId 必须指向 COMPONENT 的 id

## 示例

→ [查看示例](../../examples/SCH_PAGE/tm-sch-component.md)

