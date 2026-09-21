# TD3Attribute

> 返回 [FOOTPRINT 图元索引](../../documents/FOOTPRINT.md)

## 定义

3d 右侧面板属性

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| materials | `string` | ✓ | - | 基板材质 |
| silkTechnology | `string` | ✓ | - | 丝印工艺 |
| backgroundColor | `string` | ✓ | pattern: ^$\|^#[0-9A-Fa-f]{6}$ | 背景颜色 |
| boardColor | `string` | ✓ | pattern: ^$\|^#[0-9A-Fa-f]{6}$ | 板子颜色 |
| sprayColor | `string` | ✓ | pattern: ^$\|^#[0-9A-Fa-f]{6}$ | 焊盘喷镀 |
| layerExpose | `number` | ✓ | - | 层发散 |
| substrateHeight | `number` | ✓ | - | PCB 距外壳底面的高度：**单位为 mm**。 ⚠️ 读写两端都**不做 ×10 / ÷10 换算**（编码 `D3AttributeEncode` 原样返回、 解码 `D3AttributeDecode` 直接取用），盘上的值就是 mm 值（例 `1.6` = 1.6 mm）。 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/td3attribute.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `materials`: 必需字段 |
| required | ERROR | `silkTechnology`: 必需字段 |
| required | ERROR | `backgroundColor`: 必需字段 |
| required | ERROR | `boardColor`: 必需字段 |
| required | ERROR | `sprayColor`: 必需字段 |
| required | ERROR | `layerExpose`: 必需字段 |
| required | ERROR | `substrateHeight`: 必需字段 |
| pattern | ERROR | `backgroundColor`: 匹配模式: ^$\|^#[0-9A-Fa-f]{6}$ |
| pattern | ERROR | `boardColor`: 匹配模式: ^$\|^#[0-9A-Fa-f]{6}$ |
| pattern | ERROR | `sprayColor`: 匹配模式: ^$\|^#[0-9A-Fa-f]{6}$ |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/FOOTPRINT/td3attribute.md)

