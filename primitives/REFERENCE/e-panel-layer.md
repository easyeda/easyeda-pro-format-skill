# EPanelLayer

> 返回 [REFERENCE 类型索引](../../documents/REFERENCE.md)

## 定义

面板图元的所在层（面板图元 `layer` 字段的取值）

⚠️ **取值不在本仓定义** —— 它来自 pro-panel 的层枚举，本类型只是搬进来单独成页，
方便查「第几号是哪一层」。本仓字段声明为 **`number | EPanelLayer`**：实际数据里它就是
普通数字，收紧成枚举会让消费方的构造点编译不过。

⚠️ **`99` 是虚构层**：它不代表某一层，而是「**适应所有**」——属于此层的一律导出。

## 取值

| 取值 | 类型 | 说明 |
|------|------|------|
| `-1` | number | 图页-边界层 |
| `1` | number | 打印层 |
| `2` | number | 透明控制 |
| `3` | number | 板框层 |
| `4` | number | 板框挖空（挖孔层） |
| `5` | number | 背胶挖空 |
| `6` | number | 灯光层 |
| `7` | number | 鼓包层 |
| `8` | number | 辅助绘制层 |
| `99` | number | 适应所有（虚构层）：属于此层的一律导出 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/e-panel-layer.json)

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/REFERENCE/e-panel-layer.md)

