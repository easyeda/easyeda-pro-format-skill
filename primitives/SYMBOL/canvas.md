# TSchCanvas

> 返回 [SYMBOL 图元索引](../../documents/SYMBOL.md)

## 定义

画布配置信息

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| originX | `number` | ✓ | - | 画布原点 X |
| originY | `number` | ✓ | - | 画布原点 Y |
| yAxisDirection | `TYAxisDirection` |  | - | Y 轴方向标记：**仅 eprj3 本地文件格式会带**，读盘时被剥离。 取值：`up` **已按 Y 轴向上写出**（本地文件固定用它）、`down` Y 轴向下 （**字段缺失等价于它**，两者是同一件事）。完整语义见 `TYAxisDirection`。 本类型（`CANVAS`）翻转的字段是 **`originY`**（`originX` 不动）。 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-sch-canvas.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `originX`: 必需字段 |
| required | ERROR | `originY`: 必需字段 |
| enum | ERROR | `yAxisDirection`: 允许值: up, down |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/SYMBOL/t-sch-canvas.md)

