# TLayerPhys

> 返回 [PCB 图元索引](../../documents/PCB.md)

## 定义

层物理特性配置

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| material | `string` | ✓ | - | 层材质 |
| thickness | `number` | ✓ | - | 芯板/介质层厚度：**盘值 = 内部厚度（mm）× 10，即盘上以 0.1 mm 为单位** （编码端 `toFix(thickness * 10, 3)`、解码端 `thickness / 10`）。 例：`1.4` = 0.14 mm（铜箔）、`12.6` = 1.26 mm（FR-4 芯板）。 ⚠️ 注意与文件其余长度字段的区别——那些是 mil，本字段是 mm 系。 |
| permittivity | `number` | ✓ | - | 介电常数 |
| lossTangent | `number` | ✓ | - | 损耗切线 |
| isKeepIsland | `boolean` | ✓ | - | 内电层是否保留孤岛 |
| zIndex | `number` | ✓ | - | 顺序大小 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-layer-phys.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `material`: 必需字段 |
| required | ERROR | `thickness`: 必需字段 |
| required | ERROR | `permittivity`: 必需字段 |
| required | ERROR | `lossTangent`: 必需字段 |
| required | ERROR | `isKeepIsland`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PCB/t-layer-phys.md)

