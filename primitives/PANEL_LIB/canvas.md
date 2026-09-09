# TPanelCanvas

> 返回 [PANEL_LIB 图元索引](../../documents/PANEL_LIB.md)

## 定义

编辑器附加信息

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| originX | `number` | ✓ | - | 画布原点 X |
| originY | `number` | ✓ | - | 画布原点 Y |
| width | `string` | ✓ | - | 宽 |
| height | `string` | ✓ | - | 高 |
| material | `string` | ✓ | - | 材质 |
| thickness | `string` | ✓ | - | 厚度 |
| print | `string` | ✓ | - | 打印方式 |
| craft | `string` | ✓ | - | 表面工艺 |
| desc | `string` | ✓ | - | 描述 |
| coverColor | `string` | ✓ | pattern: ^(#[0-9A-Fa-f]{6})|(rgb\(\d{1,3},\d{1,3},\d{1,3}\))|(cmyk\(\d{1,3},\d{1,3},\d{1,3},\d{1,3}\))|$ | 遮盖颜色 |
| backgroundColor | `string` | ✓ | pattern: ^(#[0-9A-Fa-f]{6})|(rgb\(\d{1,3},\d{1,3},\d{1,3}\))|(cmyk\(\d{1,3},\d{1,3},\d{1,3},\d{1,3}\))|$ | 背景颜色 |
| orderWidth | `string` | ✓ | - | 下单板框最大宽度 |
| orderHeight | `string` | ✓ | - | 下单板框最大高度 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-panel-canvas.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `originX`: 必需字段 |
| required | ERROR | `originY`: 必需字段 |
| required | ERROR | `width`: 必需字段 |
| required | ERROR | `height`: 必需字段 |
| required | ERROR | `material`: 必需字段 |
| required | ERROR | `thickness`: 必需字段 |
| required | ERROR | `print`: 必需字段 |
| required | ERROR | `craft`: 必需字段 |
| required | ERROR | `desc`: 必需字段 |
| required | ERROR | `coverColor`: 必需字段 |
| required | ERROR | `backgroundColor`: 必需字段 |
| required | ERROR | `orderWidth`: 必需字段 |
| required | ERROR | `orderHeight`: 必需字段 |
| pattern | ERROR | `coverColor`: 匹配模式: ^(#[0-9A-Fa-f]{6})|(rgb\(\d{1,3},\d{1,3},\d{1,3}\))|(cmyk\(\d{1,3},\d{1,3},\d{1,3},\d{1,3}\))|$ |
| pattern | ERROR | `backgroundColor`: 匹配模式: ^(#[0-9A-Fa-f]{6})|(rgb\(\d{1,3},\d{1,3},\d{1,3}\))|(cmyk\(\d{1,3},\d{1,3},\d{1,3},\d{1,3}\))|$ |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PANEL_LIB/t-panel-canvas.md)

