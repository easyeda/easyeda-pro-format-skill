# TPrimitive

> 返回 [PCB 图元索引](../../documents/PCB.md)

## 定义

图元配置

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| display | `boolean` | ✓ | - | 是否显示 |
| pick | `boolean` |  | - | 是否可拾取 |
| transparency | `number` |  | - | 透明度 |
| color | `string` |  | pattern: ^$\|^#[0-9A-Fa-f]{6}$ | 颜色 |
| layerId | `number` |  | - | 层 id。 ⚠️ **它在盘上以两种形态出现**——PCB 侧写盘时会把它**推进外壳 id** （id 变成 `["PRIMITIVE", 图元名, 层号]`）并从载荷里 `delete`（编码端 `encodePrimitive`：层号非空时推进 id 并删除载荷键）；FOOTPRINT 侧则**留在载荷里**。 所以 PCB 数据里载荷不出现该键、层号要去 id 的第三段读。 |
| viewMode | `EPrimitiveViewMode` |  | - | 取值范围：NORMAL（正常视图）、OUTLINE（轮廓视图） |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-primitive.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `display`: 必需字段 |
| pattern | ERROR | `color`: 匹配模式: ^$\|^#[0-9A-Fa-f]{6}$ |
| enum | ERROR | `viewMode`: 允许值: NORMAL, OUTLINE |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PCB/t-primitive.md)

