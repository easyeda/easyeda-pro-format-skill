# TMPcb

> 返回 [PCB 图元索引](../../documents/PCB.md)

## 定义

PCB META 类型

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| board | `string` | ✓ | - | 所属板子 |
| parent | `string` | ✓ | - | 父 PCB |
| title | `string` | ✓ | - | 文档名称 |
| source | `string` | ✓ | - | 来源的 uuid(工程库独有) |
| zIndex | `number` | ✓ | - | 排序大小 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/tm-pcb.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `board`: 必需字段 |
| required | ERROR | `parent`: 必需字段 |
| required | ERROR | `title`: 必需字段 |
| required | ERROR | `source`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PCB/tm-pcb.md)

