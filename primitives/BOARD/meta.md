# TMBoard

> 返回 [BOARD 图元索引](../../documents/BOARD.md)

## 定义

板子 META 类型

板子文档（`BOARD`）的 META 行，一行一条（`type:"META"`）：只承载**板子名称**与**排序层级**。
板子是工程里把原理图与 PCB 归到一起的单位，它本身不挂父级、也没有来源字段。

板子文档的 META 行 id 是**固定单例名** `META`（属**固定单例 id**，见 [TSingletonElementId](../REFERENCE/t-singleton-element-id.md)）。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| title | `string` | ✓ | - | 板子名称 |
| zIndex | `number` | ✓ | - | 表示排序层级 板子建议**写负数压底**（真机数据里出现过 `-1`），故本字段**不设下限**； 读取端须容忍 `-1`。 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/tm-board.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `title`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/BOARD/tm-board.md)

