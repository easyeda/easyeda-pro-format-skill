# TSingletonElementId

> 返回 [REFERENCE 类型索引](../../documents/REFERENCE.md)

## 定义

图元 id（**固定单例**）—— 只有一条记录的图元，id 写死成一个名字

⚠️ **本类型不是格式图元**（本目录都是这类 id 说明），它**不占任何一行数据**，也**没有字段用它当类型** ——
它描述的是那些图元**行外壳自己的 `id`**。

## 怎么生成

**不生成**：这类图元在一份文档里只有一条，不需要区分，于是 id 直接用
**类型名本身、或类型名加后缀**，由写盘端**写死**。所以整份数据里它的值恒定。

## 已知取值

| id | 谁的行外壳用 | 说明 |
| -- | ------------ | ---- |
| `META` | 各文档的 `META` 行 | 原理图 / PCB / 面板 / 符号 / 封装 … 都是它 |
| `CANVAS` | `CANVAS` 行 | PCB / 封装 / 图页 / 符号域的画布配置 |
| `BOARD` | 板子行 | |
| `ACTIVE_LAYER` | 当前激活层 | |
| `PREFERENCE` | 偏好设置 | |
| `PANELIZE` | 拼板设置 | |
| `RULE_TEMPLATE` | 规则模板 | 与 `RULE` / `RULE_SELECTOR` 的键式 id 不同 |
| `D3_ATTRIBUTE` | 3D 属性 | |
| `UNIVERSAL` | 通用设置 | 工程内只有一条 |
| `NG_SETTING` | 仿真设置 | |

⚠️ 判别时**不能按字符集猜**：它既不是 hex、也不含 `[`，只能按**图元类型**认
—— 随机 hex 的普通图元 id 与它是两回事，别混着校验。

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-singleton-element-id.json)

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/REFERENCE/t-singleton-element-id.md)

