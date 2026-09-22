# TMPanel

> 返回 [PANEL 图元索引](../../documents/PANEL.md)

## 定义

面板 META 类型

面板文档（`PANEL`）的 META 行，一行一条（`type:"META"`）：只有文档名与排序。
面板是独立文档，既不挂板子、也不记来源（故本类型不继承 `TMDocument`）。

面板文档的 META 行 id 是**固定单例名** `META`（属**固定单例 id**，见 [TSingletonElementId](../REFERENCE/t-singleton-element-id.md)）。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| title | `string` | ✓ | - | 文档名称 |
| zIndex | `number \| null` | ✓ | - | 排序大小：**可以是 `null`** ⚠️ 本类型**不继承 `TMDocument`**，故在此单独说明写侧规则：面板写盘时对 0 或缺省 **一律写 `null`**（`zIndex: data.zIndex \|\| null`），读取端须容忍 `null`； 正因为 `null` 是缺省表示，本字段**不设下限**。 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/tm-panel.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `title`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PANEL/tm-panel.md)

