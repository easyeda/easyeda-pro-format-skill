# TUniversal

> 返回 [CONFIG 图元索引](../../documents/CONFIG.md)

## 定义

通用设置

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| allowLibRename | `boolean` | ✓ | - | 是否工程库重名 |
| defaultNetName | `boolean` | ✓ | - | 原理图 - 是否默认网络名 |
| wireMultipleNet | `boolean` | ✓ | - | 原理图 - 是否导线多网络 |
| netFlagCrossLayerConnection | `boolean` | ✓ | - | 原理图 - 是否网络标识跨层连接 |
| netLabelCrossPageConnection | `boolean` | ✓ | - | 原理图 - 是否网络标识跨页连接 |
| busGenerateNetClass | `boolean` | ✓ | - | 原理图 - 是否网络标识总线生成网络类 |
| relevanceDisplayRow | `ERelevanceDisplayRowType` | ✓ | - | 取值范围：SINGLE（单行显示）、MULTIPLE（多行显示） |
| relevanceBelongSchPage | `ERelevanceBelongSchPage` | ✓ | - | 取值范围：NONE（不显示）、NAME（名称）、NUMBER（序号） |
| relevanceLocation | `ERelevanceLocation` | ✓ | - | 取值范围：NONE（不显示）、ZONE（区域） |
| multipartCrossLayer | `boolean` | ✓ | - | 多部件跨层 |
| nonElectronicAddIntoBom | `boolean` |  | - | 无电气标识 - 允许加入BOM |
| nonElectronicUpdatePcb | `boolean` |  | - | 无电气标识 - 允许更新PCB |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-universal.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `allowLibRename`: 必需字段 |
| required | ERROR | `defaultNetName`: 必需字段 |
| required | ERROR | `wireMultipleNet`: 必需字段 |
| required | ERROR | `netFlagCrossLayerConnection`: 必需字段 |
| required | ERROR | `netLabelCrossPageConnection`: 必需字段 |
| required | ERROR | `busGenerateNetClass`: 必需字段 |
| required | ERROR | `relevanceDisplayRow`: 必需字段 |
| required | ERROR | `relevanceBelongSchPage`: 必需字段 |
| required | ERROR | `relevanceLocation`: 必需字段 |
| required | ERROR | `multipartCrossLayer`: 必需字段 |
| enum | ERROR | `relevanceDisplayRow`: 允许值: SINGLE, MULTIPLE |
| enum | ERROR | `relevanceBelongSchPage`: 允许值: NONE, NAME, NUMBER |
| enum | ERROR | `relevanceLocation`: 允许值: NONE, ZONE |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/CONFIG/t-universal.md)

