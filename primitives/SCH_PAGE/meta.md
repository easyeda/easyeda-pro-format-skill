# TMSheet

> 返回 [SCH_PAGE 图元索引](../../documents/SCH_PAGE.md)

## 定义

原理图页 META 类型

原理图页文档（`SCH_PAGE`）的 META 行，一行一条（`type:"META"`）：文档名、来源、排序，
外加 `schematic`——它**属于哪份原理图**（原理图是容器，图页是其中具体的一页）。

⚠️ 本类型的 `zIndex` 是**原样透传**，不像其它文档那样把 0 / 缺省改写成 `null`。

原理图页文档的 META 行 id 是**固定单例名** `META`（属**固定单例 id**，见 [TSingletonElementId](../REFERENCE/t-singleton-element-id.md)）。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| schematic | [TDocUuid](../REFERENCE/t-doc-uuid.md) | ✓ | - | 所属原理图 |
| title | `string` | ✓ | - | 文档名称 |
| source | `string` | ✓ | - | 来源：`<来源条目 uuid>\|<来源工程 uuid>` 两段式（工程库独有） 第 2 段是**来源工程的 uuid**（不是库内路径），**工程内自建条目为空串**。 读取端拿它去哪查：按 `\|` 切开成 `[条目 uuid, 库标识]`，再用第 2 段当 **`path`（库标识）** 去那个库里按第 1 段取条目。 |
| zIndex | `number \| null` | ✓ | - | 排序大小：**可以是 `null`**（`null` 表示「未设置」，是正常取值而非缺字段） ⚠️ **写侧差异**：原理图 / 仿真原理图 / PCB / 面板写盘时对 0 或缺省一律写 `null` （`zIndex: data.zIndex \|\| null`）；只有原理图页与仿真页是原样透传。 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/tm-sheet.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `schematic`: 必需字段 |
| required | ERROR | `title`: 必需字段 |
| required | ERROR | `source`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/SCH_PAGE/tm-sheet.md)

