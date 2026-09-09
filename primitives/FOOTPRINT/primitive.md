# TPrimitive

> 返回 [FOOTPRINT 图元索引](../../documents/FOOTPRINT.md)

## 定义

图元配置

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| display | `boolean` | ✓ | - | 是否显示 |
| pick | `boolean` |  | - | 是否可拾取 |
| transparency | `number` |  | - | 透明度 |
| color | `string` |  | pattern: ^$|^#[0-9A-Fa-f]{6}$ | 颜色 |
| layerId | `number` |  | - | 层 id |
| viewMode | `EPrimitiveViewMode` |  | - | 视图模式 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-primitive.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `display`: 必需字段 |
| pattern | ERROR | `color`: 匹配模式: ^$|^#[0-9A-Fa-f]{6}$ |
| enum | ERROR | `viewMode`: 允许值: NORMAL, OUTLINE |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/FOOTPRINT/t-primitive.md)

