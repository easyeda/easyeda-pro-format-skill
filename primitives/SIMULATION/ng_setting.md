# TNGSetting

> 返回 [SIMULATION 图元索引](../../documents/SIMULATION.md)

## 定义

仿真图页 - 仿真设置

**仿真图页专有的仿真设置**，一个仿真页只有一行（`type:"NG_SETTING"`）：把 AC / DC / TR 三类分析的
参数、当前选中的分析类型（`currentSetting`）以及各分析启动按钮的禁用状态收在一处。

载荷含 5 个字段：`acSetting` / `dcSetting` / `trSetting` / `currentSetting` / `startDisable`。
⚠️ 参数取值是**带单位的字符串**（如 `500`、`5G`、`25m`）而不是数字；`dcSetting.sourceStatus`
的极性也容易记反（见字段说明）。
外壳的 `id` **固定为类型名 `NG_SETTING`**（同 CANVAS），不是随机 16 位十六进制；
这类固定单例 id 的形态与判别见 [TSingletonElementId](../REFERENCE/t-singleton-element-id.md)。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| acSetting | `{ acAnalysisType: string; freMult: string; startFrequency: string; stopFrequency: string }` | ✓ | - | 交流分析（AC）设置 |
| dcSetting | { dcSourceData1: [TDCSourceData](../REFERENCE/tdc-source-data.md); dcSourceData2: [TDCSourceData](../REFERENCE/tdc-source-data.md); sourceStatus: boolean } | ✓ | - | 直流扫描（DC）设置 |
| trSetting | `{ timeStep: string; stopTime: string; startTime: string; maxTimeStep: string }` | ✓ | - | 瞬态分析（TR）设置 |
| currentSetting | `'AC' \| 'DC' \| 'TR'` | ✓ | - | 当前选中的仿真类型，同上三个分组一一对应 |
| startDisable | `{ [key: string]: boolean }` | ✓ | - | 各仿真类型启动按钮的禁用状态：键为仿真类型（如 `DC` / `AC` / `tr`），值为 true 表示该类型禁止启动 |

## 对象字段成员

以下字段的类型是内联对象，成员定义如下：

### `acSetting`

交流分析（AC）设置

| 成员 | 类型 | 必需 | 说明 |
|------|------|------|------|
| acAnalysisType | `string` | ✓ | 扫描类型：DEC 十倍频程 / OCT 倍频程 / LIN 线性 |
| freMult | `string` | ✓ | 每档采样点数（**无量纲**，直接作为 `.ac` 的第 2 个参数），如 `10` ——配合 DEC 即每十倍频程 10 点 |
| startFrequency | `string` | ✓ | 起始频率：带单位的数值，如 `500`、`1k` |
| stopFrequency | `string` | ✓ | 终止频率：带单位的数值，如 `5G` |

### `dcSetting`

直流扫描（DC）设置

| 成员 | 类型 | 必需 | 说明 |
|------|------|------|------|
| dcSourceData1 | `TDCSourceData` | ✓ | 第一个扫描源：**`sourceStatus` 为 `true` 时只扫它**；为 `false` 时它参与双源嵌套扫描 |
| dcSourceData2 | `TDCSourceData` | ✓ | 第二个扫描源：只在 `sourceStatus` 为 `false`（双源嵌套）时参与扫描 |
| sourceStatus | `boolean` | ✓ | ⚠️ **极性容易记反**：`true` ⇒ **只扫 `dcSourceData1`**（命令里只出现 `d1.sourceName` / `startValue` / `stopValue` / `increment`）；`false` ⇒ **两源做嵌套扫描** （命令含 8 个参数，`dcSourceData1` 与 `dcSourceData2` 拼接）。 依据：仿真网表生成时 `DC` 分支的行为。 |

### `trSetting`

瞬态分析（TR）设置

| 成员 | 类型 | 必需 | 说明 |
|------|------|------|------|
| timeStep | `string` | ✓ | 仿真步长：带单位的数值，如 `5u` |
| stopTime | `string` | ✓ | 终止时间：带单位的数值，如 `25m` |
| startTime | `string` | ✓ | 起始时间：带单位的数值，通常为 `0` |
| maxTimeStep | `string` | ✓ | 最大步长：带单位的数值；为空表示不限制 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/tng-setting.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `acSetting`: 必需字段 |
| required | ERROR | `dcSetting`: 必需字段 |
| required | ERROR | `trSetting`: 必需字段 |
| required | ERROR | `currentSetting`: 必需字段 |
| required | ERROR | `startDisable`: 必需字段 |
| enum | ERROR | `currentSetting`: 允许值: AC, DC, TR |

### 内嵌结构

此图元包含以下内嵌结构：

- 内嵌类型: [TDCSourceData](../../primitives/REFERENCE/tdc-source-data.md)

## 示例

→ [查看示例](../../examples/SIMULATION/tng-setting.md)

