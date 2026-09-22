# TPart

> 返回 [SCH_PAGE 图元索引](../../documents/SCH_PAGE.md)

## 定义

部件

**本行的外壳 id 就是 `partId`**：`TMSchComponent.partId` 必须指向它，
用于从多部件（多 PART）的符号里选出具体部件。

⚠️ **PART 行只存在于 SYMBOL 文档**——真机 SCH 文档里**一个 PART 行都没有**
（只有 symbol-consistency-manager 实现了 `onPart`）。所以表页 COMPONENT 的 `partId`
指向的是「它 `key:"Symbol"` 属性值所标识的那个**符号文档**」里的 PART 行
（样本里 `"Symbol"` → `412ca47752bc0af4`，正是那个含 `{"type":"PART",…,"id":"-1"}`
的 SYMBOL 文档的文档头 uuid），**不要去图页文档里找**。

⚠️ 真机载荷里会多出一个**类型定义之外**的 `BBOX` 字段（透传字段），**不要当坏数据**。

本行的外壳 `id` **就是 `partId`**（元件靠它选中具体部件）。
现行写盘端新建 PART 行时生成的是**随机 uuid**（16 位十六进制）；
`-1`、`TPS16417DRCR.1` 这类**短串**见诸 **2.0 迁移数据**，不是现行写侧的产物
—— 所以**别按「16 位 hex」硬校验**。图元 id 的几类形态与判别见 [TElementId](../REFERENCE/t-element-id.md)。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| title | `string` | ✓ | - | 名称 |
| DeviceName | `{ uuid: string; name: string; source: string }` |  | - | 当前绑定的器件(目前为空用不上)，v4 新增。 三元组的口径与 `TNameSourceUuid`（`type/public.ts`）一致 —— 那个类型收不进来（它在 format 目录之外，而 format 目录不能反向 import 它、会成环）， 故此处就地展开同一份说明。 |
| FootprintName | `{ uuid: string; name: string; source: string }` |  | - | 当前绑定文本封装（uuid 可空），v4 新增。三元组口径同上 |
| Footprints | `{ uuid: string; name: string; source: string }[]` |  | - | 备选封装，v4 新增。三元组口径同上 |

## 对象字段成员

以下字段的类型是内联对象，成员定义如下：

### `DeviceName`

当前绑定的器件(目前为空用不上)，v4 新增。

三元组的口径与 `TNameSourceUuid`（`type/public.ts`）一致 ——
那个类型收不进来（它在 format 目录之外，而 format 目录不能反向 import 它、会成环），
故此处就地展开同一份说明。

| 成员 | 类型 | 必需 | 说明 |
|------|------|------|------|
| uuid | `string` | ✓ | 绑定的 uuid（可空） |
| name | `string` | ✓ | 名称 |
| source | `string` | ✓ | 来源：`<来源条目 uuid>\|<来源工程 uuid>`，或空串（工程内自建条目）。 ⚠️ 第 2 段是**来源工程的 uuid**（32 位十六进制），**不是路径**。 |

### `FootprintName`

当前绑定文本封装（uuid 可空），v4 新增。三元组口径同上

| 成员 | 类型 | 必需 | 说明 |
|------|------|------|------|
| uuid | `string` | ✓ | 绑定的 uuid（可空） |
| name | `string` | ✓ | 名称 |
| source | `string` | ✓ | 来源：`<来源条目 uuid>\|<来源工程 uuid>`，或空串（工程内自建条目）。 ⚠️ 第 2 段是**来源工程的 uuid**（32 位十六进制），**不是路径**。 |

### `Footprints`

备选封装，v4 新增。三元组口径同上

| 成员 | 类型 | 必需 | 说明 |
|------|------|------|------|
| uuid | `string` | ✓ | 绑定的 uuid（可空） |
| name | `string` | ✓ | 名称 |
| source | `string` | ✓ | 来源：`<来源条目 uuid>\|<来源工程 uuid>`，或空串（工程内自建条目）。 ⚠️ 第 2 段是**来源工程的 uuid**（32 位十六进制），**不是路径**。 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-part.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `title`: 必需字段 |

### 父子图元

此图元包含以下子图元类型：

- 子图元类型: [TMSchComponent](../../primitives/SCH_PAGE/component.md)
- 子图元中的关联字段: `partId` (指向父图元 id)
- 父图元中的引用字段: `id`

COMPONENT 通过 partId 指向某个 PART 的 id（该 PART 行在其关联的 SYMBOL 文档里），用于从多部件符号中选出具体部件

## 示例

→ [查看示例](../../examples/SCH_PAGE/t-part.md)

