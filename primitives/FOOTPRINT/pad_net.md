# TPadNet

> 返回 [FOOTPRINT 图元索引](../../documents/FOOTPRINT.md)

## 定义

焊盘实例网络映射

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| partitionId | `string | null` |  | - | 所属分区编号，为null表示无分区 |
| componentId | `string` | ✓ | - | 所属器件实例编号 |
| padNum | `string` | ✓ | - | 焊盘编号 |
| padNet | `string` | ✓ | - | 网络名 |
| padId | `string` | ✓ | - | 封装内焊盘 ID（可选） |
| padLen | `number` | ✓ | - | 引脚长度 |
| propagationDelay | `number` | ✓ | - | 传播延迟，3.4 新增 |
| attrsMap | `{ [key: string]: any }` |  | - | 自定义属性 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-pad-net.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `componentId`: 必需字段 |
| required | ERROR | `padNum`: 必需字段 |
| required | ERROR | `padNet`: 必需字段 |
| required | ERROR | `padId`: 必需字段 |
| required | ERROR | `padLen`: 必需字段 |
| required | ERROR | `propagationDelay`: 必需字段 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/FOOTPRINT/t-pad-net.md)

