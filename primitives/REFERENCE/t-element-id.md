# TElementId

> 返回 [REFERENCE 类型索引](../../documents/REFERENCE.md)

## 定义

图元 id（**普通形态**）—— 本文档内某一行的 `id`

⚠️ **本类型不是格式图元**（本目录都是这类 id 说明），它**不占任何一行数据**。

即行外壳 `{"type":…,"id":…,"ticket":…}` 里的那个 `id`，**文档内唯一**。
引用**本文档里的一行**时存的就是它；要引用**另一份文档**里的东西请用 [TDocUuid](./t-doc-uuid.md)。

## 普通形态长什么样

**随机 16 位小写十六进制**（编辑器新建图元时生成）。真机如
`"16b7c4a1e9d2b6f8"`、`"8b7c91be5468b266"`、`"31ee47e9fc35d6f0"`。
面板域**必带 `e` 前缀、共 17 字符**（如 `"e79b342e010515f9e"`）。

## 拿到一个 id，怎么判断它属于哪一类

1. **就是 16 位 `[0-9a-f]`**（面板是 `e` + 16 位）→ 本类型（普通形态），**多数图元都是它**；
2. **以 `[` 开头** → **键式 id**，见 [TKeyedElementId](./t-keyed-element-id.md)；
3. **是类型名、或含下划线 / 大写字母** → **固定单例 id**，见 [TSingletonElementId](./t-singleton-element-id.md)；
4. **明显更长、且以某个图元 id 为前缀** → **复合 id**（封装内子图元），见 [TCompositeElementId](./t-composite-element-id.md)
   （它的后半段另有语义，见 [TLocalElementId](./t-local-element-id.md)）。

⚠️ **别把「16 位 hex」当成校验规则**：2.0 迁移数据的 id 是 `ie0` / `ie1` / `e3`
这类**短串**，固定单例与键式 id 也都不符合 —— 按长度或字符集硬校验存量数据一定会误判。

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-element-id.json)

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/REFERENCE/t-element-id.md)

