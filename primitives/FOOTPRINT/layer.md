# TLayer

> 返回 [FOOTPRINT 图元索引](../../documents/FOOTPRINT.md)

## 定义

层配置

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| layerType | `string` | ✓ | - | 层类型, 是固定枚举值 |
| layerName | `string` | ✓ | - | 层别名，需要唯一 |
| use | `boolean` | ✓ | - | 是否使用 |
| show | `boolean` | ✓ | - | 是否显示 |
| locked | `boolean` | ✓ | - | 是否锁定 |
| activeColor | `string` | ✓ | pattern: ^$|^#[0-9A-Fa-f]{6}$ | 激活颜色 |
| activateTransparency | `number` | ✓ | min: 0, max: 1 | 激活透明度 |
| inactiveColor | `string` | ✓ | pattern: ^$|^#[0-9A-Fa-f]{6}$ | 非激活颜色 |
| inactiveTransparency | `number` | ✓ | min: 0, max: 1 | 非激活透明度 |
| is3D | `boolean` |  | - | 3.3 新增，是否是 3D 层 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-layer.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `layerType`: 必需字段 |
| required | ERROR | `layerName`: 必需字段 |
| required | ERROR | `use`: 必需字段 |
| required | ERROR | `show`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `activeColor`: 必需字段 |
| required | ERROR | `activateTransparency`: 必需字段 |
| required | ERROR | `inactiveColor`: 必需字段 |
| required | ERROR | `inactiveTransparency`: 必需字段 |
| pattern | ERROR | `activeColor`: 匹配模式: ^$|^#[0-9A-Fa-f]{6}$ |
| minimum | ERROR | `activateTransparency`: 最小值: 0 |
| maximum | ERROR | `activateTransparency`: 最大值: 1 |
| pattern | ERROR | `inactiveColor`: 匹配模式: ^$|^#[0-9A-Fa-f]{6}$ |
| minimum | ERROR | `inactiveTransparency`: 最小值: 0 |
| maximum | ERROR | `inactiveTransparency`: 最大值: 1 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/FOOTPRINT/t-layer.md)

