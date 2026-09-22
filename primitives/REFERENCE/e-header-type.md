# EHeaderType

> 返回 [REFERENCE 类型索引](../../documents/REFERENCE.md)

## 定义

文件头类型枚举

原声明在 `type/public.ts`，2026-09-18 迁到这里：format-skill 生成器按 glob 收类型、不沿
import 递归，放在 public.ts 下收不到（会连带 DOCHEAD 校验失效）。public.ts 仍原样 re-export，
对外 API 不变。这里也顺带取代了本文件里那份缺 DOCHEAD / EDIT_HEAD 的过期副本。

## 取值

| 取值 | 类型 | 说明 |
|------|------|------|
| `DOCHEAD` | string | 文档头标识 |
| `EDIT_HEAD` | string | 编辑头标识 |
| `SCH` | string | 原理图 |
| `SCH_PAGE` | string | 原理图页 |
| `PCB` | string | PCB |
| `PANEL` | string | 面板 |
| `PANEL_LIB` | string | 面板库 |
| `SYMBOL` | string | 符号 |
| `FOOTPRINT` | string | 封装 |
| `DEVICE` | string | 器件 |
| `BLOB` | string | 二进制数据 |
| `INSTANCE` | string | 实例属性 |
| `CONFIG` | string | 配置文件 |
| `BOARD` | string | 板子 |
| `FONT` | string | 字体 |
| `VARIANT` | string | 变体 |
| `COMPONENT_GROUP` | string | 元件分组 |
| `COMPONENT_GROUP_DATA` | string | 元件分组属性 |
| `SIMULATION` | string | 仿真页 |
| `SIMULATION_SCH` | string | 仿真原理图 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/e-header-type.json)

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/REFERENCE/e-header-type.md)

