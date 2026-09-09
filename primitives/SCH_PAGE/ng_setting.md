# TNGSetting

> 返回 [SCH_PAGE 图元索引](../../documents/SCH_PAGE.md)

## 定义

仿真图页 - 仿真设置

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| acSetting | `{
		acAnalysisType: string;
		freMult: string;
		startFrequency: string;
		stopFrequency: string;
	}` | ✓ | - |  |
| dcSetting | `{
		dcSourceData1: TDCSourceData;
		dcSourceData2: TDCSourceData;
		sourceStatus: boolean;
	}` | ✓ | - |  |
| trSetting | `{
		timeStep: string;
		stopTime: string;
		startTime: string;
		maxTimeStep: string;
	}` | ✓ | - |  |
| currentSetting | `'AC' | 'DC' | 'TR'` | ✓ | - |  |
| startDisable | `{ [key: string]: boolean }` | ✓ | - |  |

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

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/SCH_PAGE/tng-setting.md)

