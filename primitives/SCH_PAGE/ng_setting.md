# TNGSetting

> 返回 [SCH_PAGE 图元索引](../../documents/SCH_PAGE.md)

## 定义

仿真图页 - 仿真设置

载荷含 5 个字段：`acSetting` / `dcSetting` / `trSetting` / `currentSetting` / `startDisable`。
外壳的 `id` **固定为类型名 `NG_SETTING`**（同 CANVAS），不是随机 16 位十六进制。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| acSetting | `{ acAnalysisType: TAcAnalysisType; freMult: string; startFrequency: string; stopFrequency: string; compatMode?: TCompatMode }` | ✓ | - | 交流分析（AC）设置 |
| dcSetting | `{ dcSourceData1: TDCSourceData; dcSourceData2: TDCSourceData; sourceStatus: boolean; compatMode?: TCompatMode }` | ✓ | - | 直流扫描（DC）设置 |
| trSetting | `{ timeStep: string; stopTime: string; startTime: string; maxTimeStep: string; calcDcBiasPoint: boolean; compatMode?: TCompatMode }` | ✓ | - | 瞬态分析（TR）设置 |
| mcSetting | `TMCSetting` | ✓ | - | 蒙特卡洛分析设置 |
| wcSetting | `TWCSetting` | ✓ | - | 最坏情况分析设置 |
| currentSetting | `TCurrentSetting` | ✓ | - | 当前选中的仿真类型（取值见 TCurrentSetting：AC / DC / TR / MONTE CARLO / WORST CASE） |
| startDisable | `{ [key: string]: boolean }` | ✓ | - | 各仿真类型启动按钮的禁用状态：键为仿真类型（如 `DC` / `AC` / `tr`），值为 true 表示该类型禁止启动 |

## 对象字段成员

以下字段的类型是内联对象，成员定义如下：

### `acSetting`

交流分析（AC）设置

| 成员 | 类型 | 必需 | 说明 |
|------|------|------|------|
| acAnalysisType | `TAcAnalysisType` | ✓ | 扫描类型：DEC 十倍频程 / OCT 倍频程 / LIN 线性 |
| freMult | `string` | ✓ | 每档采样点数（**无量纲**，直接作为 `.ac` 的第 2 个参数），如 `10` ——配合 DEC 即每十倍频程 10 点 |
| startFrequency | `string` | ✓ | 起始频率：带单位的数值，如 `500`、`1k` |
| stopFrequency | `string` | ✓ | 终止频率：带单位的数值，如 `5G` |
| compatMode | `TCompatMode` |  | 兼容模式 |

### `dcSetting`

直流扫描（DC）设置

| 成员 | 类型 | 必需 | 说明 |
|------|------|------|------|
| dcSourceData1 | `TDCSourceData` | ✓ | 第一个扫描源：**`sourceStatus` 为 `true` 时只扫它**；为 `false` 时它参与双源嵌套扫描 |
| dcSourceData2 | `TDCSourceData` | ✓ | 第二个扫描源：只在 `sourceStatus` 为 `false`（双源嵌套）时参与扫描 |
| sourceStatus | `boolean` | ✓ | ⚠️ **极性容易记反**：`true` ⇒ **只扫 `dcSourceData1`**（命令里只出现 `d1.sourceName` / `startValue` / `stopValue` / `increment`）；`false` ⇒ **两源做嵌套扫描** （命令含 8 个参数，`dcSourceData1` 与 `dcSourceData2` 拼接）。 依据：仿真网表生成时 `DC` 分支的行为。 |
| compatMode | `TCompatMode` |  | 兼容模式 |

### `trSetting`

瞬态分析（TR）设置

| 成员 | 类型 | 必需 | 说明 |
|------|------|------|------|
| timeStep | `string` | ✓ | 仿真步长：带单位的数值，如 `5u` |
| stopTime | `string` | ✓ | 终止时间：带单位的数值，如 `25m` |
| startTime | `string` | ✓ | 起始时间：带单位的数值，通常为 `0` |
| maxTimeStep | `string` | ✓ | 最大步长：带单位的数值；为空表示不限制 |
| calcDcBiasPoint | `boolean` | ✓ |  |
| compatMode | `TCompatMode` |  | 兼容模式 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/tng-setting.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `acSetting`: 必需字段 |
| required | ERROR | `dcSetting`: 必需字段 |
| required | ERROR | `trSetting`: 必需字段 |
| required | ERROR | `mcSetting`: 必需字段 |
| required | ERROR | `wcSetting`: 必需字段 |
| required | ERROR | `currentSetting`: 必需字段 |
| required | ERROR | `startDisable`: 必需字段 |
| enum | ERROR | `currentSetting`: 允许值: AC, DC, TR, MONTE CARLO, WORST CASE |

### 内嵌结构

此图元包含以下内嵌结构：

- 内嵌类型: [TDCSourceData](../../primitives/SCH_PAGE/tdc-source-data.md)

## 示例

→ [查看示例](../../examples/SCH_PAGE/tng-setting.md)

