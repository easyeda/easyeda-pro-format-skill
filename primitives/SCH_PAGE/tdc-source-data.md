# TDCSourceData

> 返回 [SCH_PAGE 图元索引](../../documents/SCH_PAGE.md)

## 定义

仿真图页 - 仿真设置源数据

注意：这是**内嵌结构**，不是数据流里的独立图元（随 `NG_SETTING` 的
`dcSetting.dcSourceData1/2` 字段一起写盘），因此这里不声明 primitiveType 标签。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| sourceName | `string` | ✓ | - | 扫描源名称：被扫描的独立源在网表中的名字 |
| startValue | `string` | ✓ | - | 扫描起始值：带单位的数值，如 `0`、`1m` |
| stopValue | `string` | ✓ | - | 扫描终止值：带单位的数值 |
| increment | `string` | ✓ | - | 迭代步长：带单位的数值 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/tdc-source-data.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `sourceName`: 必需字段 |
| required | ERROR | `startValue`: 必需字段 |
| required | ERROR | `stopValue`: 必需字段 |
| required | ERROR | `increment`: 必需字段 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/SCH_PAGE/tdc-source-data.md)

