# TMPcbComponent

> 返回 [FOOTPRINT 图元索引](../../documents/FOOTPRINT.md)

## 定义

器件实例（COMPONENT 图元的**线格式**）

**本类型描述的就是盘上的形状**：`attrs` 是**逐键 JSON 字符串**
（如 `{"DeviceName":"{\"uuid\":\"…\"}"}`）。解码后 `attrs` 会被还原成对象，
那个形态是 `TPcbComponent`（定义在 `type/public.ts`）——
**生成格式数据时用本类型**，不要用解码后的那个。

【联动增删·必须成组操作】COMPONENT 与其 ATTR、PAD_NET 是**同一生命周期**：
- **新增 COMPONENT 时必须一并写出它的 ATTR 与 PAD_NET**；
- **删除 COMPONENT 时必须一并删除它的 ATTR 与 PAD_NET**，只删 COMPONENT 会留下悬空引用，数据不合法。

id 由编辑器生成（随机 16 位十六进制），形态见 [TElementId](../REFERENCE/t-element-id.md)。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| partitionId | [TElementId](../REFERENCE/t-element-id.md) \| null |  | - | 所属分区编号，为null表示无分区：**值是 `PARTITION` 行的外壳 `id`**（图元 id，不是 uuid） |
| groupId | [TElementId](../REFERENCE/t-element-id.md) | ✓ | - | 分组编号：相同值的图元属于同一组；**未分组时的取值见下**。 ⚠️ **未分组写的是数字 `0`**（不是字符串 `"0"`）——真实数据里 `"groupId":0` 出现 5 千余次，而 `"groupId":"0"` **一次都没有**；FOOTPRINT 文档下该字段**恒为 0**。 成组时才是字符串（组合 id）；未分组的判定是「`groupId` 为空或 FOOTPRINT 文档」，此时写**数字 0**。 ⚠️ 上方的类型 `string` 比实际形态窄（装不下数字 0）——**放宽类型会波及 pro-* 仓的 消费方，需跨仓协调后再改**，故此处暂以说明为准。本文件各 `@example` 里的 `"groupId":"0"` 也是同一问题，同理按“说明为准”处理。 |
| layerId | number \| [ELayerCode](../REFERENCE/e-layer-code.md) | ✓ | - | 层编号。 **第几号是哪一层见 [ELayerCode](../REFERENCE/e-layer-code.md)** —— 那是层编号的枚举（`1` = 顶层、`47` = 孔层 …）， 里面逐条写了每个编号对应的**层类型字符串名**。 ⚠️ 类型写成 **`number \| ELayerCode`** 而不是单用枚举：实际数据里层号本来就是普通数字， 消费方大量按 `number` 传值，收紧成枚举会让那些构造点编译不过。 |
| locked | `boolean` | ✓ | - | 是否锁定：锁定后**不能拖拽、不能删除、不能用鼠标键盘调整大小、不能调整形状**。 实际是以**锁弹窗**（`ActionForLockedObjectsDialog`）拦截，用户可在弹窗里选 「解锁并继续」，所以不是硬禁止。 |
| zIndex | `number \| null` | ✓ | default: -1 | 同层内的叠放次序（渲染排序键，格式里没有高度语义）。 **它是独立字段，不由 id 推导**：3.0 里未设置时写盘为 **-1**（内部实现即 `_zIndex \|\| -1`；真实数据 `"zIndex":-1` 出现 4 千余次）。**例外**：`ATTR` / `META` 的默认体直接写 `null`。 「由 id 尾部数字推导」是 **2.0 的语义**（2.0 的 `getZIndex` + `idReg`；那个正则也 匹配不了 3.0 的随机 16 位十六进制 id）。**不要照它推导 3.0 的值。** ⚠️ **VIA 是个特例：3.0 写盘不会产出该键**——写盘端的 switch 里**没有** zIndex 分支 （虽然槽位表里有该槽位），取值为 `undefined` 时会被 JSON 序列化整个丢弃。 但**真机存量里仍能遇到 2.0 遗留的带 `zIndex` 的 VIA 行**（样本 15455 条 VIA 中 10404 条载荷含该键，其值恰好等于 id 尾部的数字——正是上面说的「2.0 语义」）。 **读盘时不要假设它不存在。** |
| x | `number` | ✓ | - | 位置 X（mil） |
| y | `number` | ✓ | - | 位置 Y（mil） |
| angle | `number` | ✓ | - | 旋转角度（角度制，**逆时针为正**） |
| attrs | `{ DeviceName: string; Devices: string; Footprints: string; 'Group ID'?: string; 'Channel ID'?: string; [key: string]: any }` | ✓ | - | 自定义属性,固定 3D Model 为 3D 模型的 uuid，此 uuid 代表 components 表中 doctype = 16 的一条记录,固定 3D Model Transform 为 3D 模型变换参数 ## `3D Model Transform` 的口径与矩阵算法 在器件里，它固定表示**该 3D 模型匹配此器件「在顶层 / 坐标 0,0 / 旋转角度 0」时所需的变换参数**。 共 9 个**逗号分隔**的参数，依次是 `sizeX`、`sizeY`、`sizeZ`、`rotZ`、`rotX`、`rotY`、 `offX`、`offY`、`offZ`。文档示例：`"20,10,0,0,15,45,0,0,20"`。 ⚠️ 解码时 **`sizeX/Y/Z` 与 `offX/Y/Z` 都除以 10**，且 `offX` / `offY` 还要再 **减去封装原点 `footprintOrigin`**；`rotZ` / `rotX` / `rotY` 是**度**，进矩阵时才转弧度。 由这 9 个参数生成变换矩阵（记模型自身包围盒的 XY 中点为 cx / cy、**最低 Z 为 cz**， 三个轴向宽度为 wx / wy / wz）： `translate(-cx, -cy, -cz)` → 逐轴 `scale(sizeX/wx, sizeY/wy, sizeZ/wz)` → `rotateZ(rotZ)` → `rotateX(rotX)` → `rotateY(rotY)` → `translate(offX, offY, offZ)`。 （**旋转轴序是硬编码的 Z → X → Y**，实现里没有 `rotateZXY` 这样一个函数。） ⚠️ 另外两处容易写错： - **`sizeZ = 0` 不等于「自动适应高度」**。只有 `sizeX` / `sizeY` / `sizeZ` **三者全为 0** （或压根没绑模型）时才回退到器件的 `HEIGHT` 属性作为 Z 高度。 ⚠️ **预置元件库里恰好恒为 `sizeZ = 0` 而 `sizeX/sizeY ≠ 0`**，此时不做任何高度适配： 模型加载成功时 Z 比例为 0，会被「只取正比例」的等比缩放过滤掉，实际只剩 X/Y 等比； 只有走到回退模型那条路才是 `scale(1, 1, 0.1)`。 - 值以 **`v2:` 前缀**开头时，载荷里是**直接存的矩阵**，**不套用**上面这套公式。 |
| footprintPrimitives | `boolean` | ✓ | default: true | 封装内图元，是否锁定, 默认为 true 锁定，3.3 版本新增字段 |
| specialColor | `string` |  | pattern: ^$\|^#[0-9A-Fa-f]{6}$ | 特殊颜色 |
| pinSwap | `boolean` |  | default: false | 是否启用引脚交换，3.4 版本新增，默认不启用 |
| pinSwapInfo | `{ [id: string]: { pinClass: string; differentialPairClass: string } }` |  | - | 引脚交换相关信息，3.4 版本新增 |
| layerIdReplacements | `Record<string, number>` |  | - | 层ID替换表(originLayerId -> layerIdToApply) |

## 对象字段成员

以下字段的类型是内联对象，成员定义如下：

### `attrs`

自定义属性,固定 3D Model 为 3D 模型的 uuid，此 uuid 代表 components 表中 doctype = 16 的一条记录,固定 3D Model Transform 为 3D 模型变换参数

## `3D Model Transform` 的口径与矩阵算法

在器件里，它固定表示**该 3D 模型匹配此器件「在顶层 / 坐标 0,0 / 旋转角度 0」时所需的变换参数**。
共 9 个**逗号分隔**的参数，依次是 `sizeX`、`sizeY`、`sizeZ`、`rotZ`、`rotX`、`rotY`、
`offX`、`offY`、`offZ`。文档示例：`"20,10,0,0,15,45,0,0,20"`。

⚠️ 解码时 **`sizeX/Y/Z` 与 `offX/Y/Z` 都除以 10**，且 `offX` / `offY` 还要再
**减去封装原点 `footprintOrigin`**；`rotZ` / `rotX` / `rotY` 是**度**，进矩阵时才转弧度。

由这 9 个参数生成变换矩阵（记模型自身包围盒的 XY 中点为 cx / cy、**最低 Z 为 cz**，
三个轴向宽度为 wx / wy / wz）：
`translate(-cx, -cy, -cz)` → 逐轴 `scale(sizeX/wx, sizeY/wy, sizeZ/wz)` →
`rotateZ(rotZ)` → `rotateX(rotX)` → `rotateY(rotY)` → `translate(offX, offY, offZ)`。
（**旋转轴序是硬编码的 Z → X → Y**，实现里没有 `rotateZXY` 这样一个函数。）

⚠️ 另外两处容易写错：
- **`sizeZ = 0` 不等于「自动适应高度」**。只有 `sizeX` / `sizeY` / `sizeZ` **三者全为 0**
  （或压根没绑模型）时才回退到器件的 `HEIGHT` 属性作为 Z 高度。
  ⚠️ **预置元件库里恰好恒为 `sizeZ = 0` 而 `sizeX/sizeY ≠ 0`**，此时不做任何高度适配：
  模型加载成功时 Z 比例为 0，会被「只取正比例」的等比缩放过滤掉，实际只剩 X/Y 等比；
  只有走到回退模型那条路才是 `scale(1, 1, 0.1)`。
- 值以 **`v2:` 前缀**开头时，载荷里是**直接存的矩阵**，**不套用**上面这套公式。

| 成员 | 类型 | 必需 | 说明 |
|------|------|------|------|
| DeviceName | `string` | ✓ | 当前绑定文本器件（uuid 可为空），v4 新增; `{ uuid: string; name: string; source: string }`的JSON.string序列化。 ⚠️ 它与下面的 `Devices` / `Footprints` 都是**与器件（封装）默认值做差后**才写进来的： 取值与默认值一致时**整项都不写**，因此**三者都可以缺省**（示例里的 `attrs` 就是 `{}`）。 类型上目前声明为必需 `string`，比实际形态窄——**是否放宽为可选需跨仓协调**。 |
| Devices | `string` | ✓ | 备选器件，v4 新增; `{ uuid: string; name: string; source: string }[]`的JSON.string序列化 |
| Footprints | `string` | ✓ | 备选封装，v4 新增; `{ uuid: string; name: string; source: string }[]`的JSON.string序列化 |
| Group ID | `string` |  | 分组 ID |
| Channel ID | `string` |  | 通道 ID |
| [key: string] | `any` |  | 其他自定义 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/tm-pcb-component.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `layerId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `x`: 必需字段 |
| required | ERROR | `y`: 必需字段 |
| required | ERROR | `angle`: 必需字段 |
| required | ERROR | `attrs`: 必需字段 |
| required | ERROR | `footprintPrimitives`: 必需字段 |
| pattern | ERROR | `specialColor`: 匹配模式: ^$\|^#[0-9A-Fa-f]{6}$ |

### 父子图元

此图元包含以下子图元类型：

- 子图元类型: [TPcbAttr](../../primitives/PCB/attr.md)
- 子图元中的关联字段: `parentId` (指向父图元 id)
- 父图元中的引用字段: `id`

COMPONENT 下可绑定多个 ATTR，每个 ATTR 的 parentId 必须指向 COMPONENT 的 id; 原理图必须有 key 为 'Symbol' 属性指向符号, value 值为符号的 uuid

## 示例

→ [查看示例](../../examples/FOOTPRINT/tm-pcb-component.md)

