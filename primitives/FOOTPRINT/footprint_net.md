# TFootprintNet

> 返回 [FOOTPRINT 图元索引](../../documents/FOOTPRINT.md)

## 定义

封装图元网络映射，component + primitive 作为唯一 key

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| componentId | `string` | ✓ | - | 元件 id |
| primitiveId | `string` | ✓ | - | 封装内图元 id |
| net | `string` | ✓ | - | 网络名称 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-footprint-net.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `componentId`: 必需字段 |
| required | ERROR | `primitiveId`: 必需字段 |
| required | ERROR | `net`: 必需字段 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/FOOTPRINT/t-footprint-net.md)

