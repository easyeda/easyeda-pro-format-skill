# TSchObj

> 返回 [SYMBOL 图元索引](../../documents/SYMBOL.md)

## 定义

原理图二进制内嵌对象

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| partId | `string` |  | - | 部件编号；符号页专属，表示归属于某部件下, 非符号忽略该字段 |
| groupId | `string` | ✓ | - | 分组编号, 没有则为空 |
| locked | `boolean` | ✓ | - | 是否锁定 |
| zIndex | `number | null` | ✓ | - | Z 轴高度 |
| fileName | `string` | ✓ | - | 文件名 |
| startX | `number` | ✓ | - | 左上角 X |
| startY | `number` | ✓ | - | 左上角 Y |
| width | `number` | ✓ | min: 0 | 宽 |
| height | `number` | ✓ | min: 0 | 高 |
| rotation | `number` | ✓ | min: 0, max: 360 | 旋转角度（角度制）：绕左上角旋转 |
| isMirror | `boolean` | ✓ | - | 是否镜像 |
| content | `string` | ✓ | pattern: ^(data:)|(blob:) | 二进制数据，有两种模式一般格式，1.遵循 Data Urls 规范 data:[<mediatype>][;base64],<data> 2.BLOB引用模式，blob:hashid |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-sch-obj.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `fileName`: 必需字段 |
| required | ERROR | `startX`: 必需字段 |
| required | ERROR | `startY`: 必需字段 |
| required | ERROR | `width`: 必需字段 |
| required | ERROR | `height`: 必需字段 |
| required | ERROR | `rotation`: 必需字段 |
| required | ERROR | `isMirror`: 必需字段 |
| required | ERROR | `content`: 必需字段 |
| minimum | ERROR | `width`: 最小值: 0 |
| minimum | ERROR | `height`: 最小值: 0 |
| minimum | ERROR | `rotation`: 最小值: 0 |
| maximum | ERROR | `rotation`: 最大值: 360 |
| pattern | ERROR | `content`: 匹配模式: ^(data:)|(blob:) |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/SYMBOL/t-sch-obj.md)

