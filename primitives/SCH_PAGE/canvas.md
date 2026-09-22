# TSchCanvas

> 返回 [SCH_PAGE 图元索引](../../documents/SCH_PAGE.md)

## 定义

画布配置信息

**画布配置**，一个文档只有一行（`type:"CANVAS"`）：目前只记录**画布原点** `originX` / `originY`。

原点是**网格与标尺的相位基准**，也是**属性面板显示坐标的零点**（显示值 = 图元坐标 − 原点）。
⚠️ **它不是「图元坐标的平移量」**：图元存的是**绝对坐标**，改原点**不会**搬动图元，
读盘时也不要拿它去平移图元。真机样本里两个字段恒为 `0`。

外壳的 `id` **固定为类型名 `CANVAS`**（同 NG_SETTING），**不是**随机 16 位十六进制——
这类固定单例 id 的形态与判别见 [TSingletonElementId](../REFERENCE/t-singleton-element-id.md)。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| originX | `number` | ✓ | - | 画布原点 X：**绝对坐标里的一个基准锚点**——**网格与标尺的相位基准**， 也是**属性面板显示坐标的零点**（显示值 = 图元坐标 − 原点）。 单位 **0.01 inch**（与图元坐标同口径，读写都**不 ×10**）。 ⚠️ **它不是「图元坐标的平移量」**：图元存的是**绝对坐标**， 改原点**不会**搬动图元。**读盘时不要拿它去平移图元。** 真机样本里恒为 `0`。 |
| originY | `number` | ✓ | - | 画布原点 Y：含义、单位与 `originX` 相同。 ⚠️ **本域内部 Y 轴向下，所以 originY 增大 = 向下**； 又因为原理图族参与 eprj3 本地格式的 Y 翻转，**写本地文件时 `originY` 会被取反 并带上 `yAxisDirection:"up"`**（`originX` 不动），读盘时已剥离还原。 真机样本里恒为 `0`。 |
| yAxisDirection | [TYAxisDirection](../REFERENCE/ty-axis-direction.md) |  | - | Y 轴方向标记：**仅 eprj3 本地文件格式会带**，读盘时被剥离。 取值：`up` = **笛卡尔坐标系（Y 向上）**，本行坐标已按它写出（本地文件固定用它），`down` = **屏幕坐标系（Y 向下）**（编辑器内部与云端的常态） ——**字段缺失等价于它**，两者是同一件事；两套坐标系下同一个形状的 y **互为相反数**。完整语义见 [TYAxisDirection](../REFERENCE/ty-axis-direction.md)。 本类型（`CANVAS`）翻转的字段是 **`originY`**（`originX` 不动）。 |

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

→ [查看示例](../../examples/SCH_PAGE/t-sch-canvas.md)

