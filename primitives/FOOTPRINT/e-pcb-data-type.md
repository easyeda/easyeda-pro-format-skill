# EPcbDataType

> 返回 [FOOTPRINT 图元索引](../../documents/FOOTPRINT.md)

## 定义

PCB 数据类型枚举

## 取值

| 取值 | 类型 | 说明 |
|------|------|------|
| `META` | string | 基本信息 |
| `CANVAS` | string | 画布配置 |
| `D3_ATTRIBUTE` | string | 3D 面板属性 |
| `LAYER` | string | 层 |
| `LAYER_3D` | string | 3D 层 |
| `LAYER_PHYS` | string | 层物理特性 |
| `ACTIVE_LAYER` | string | 激活层 |
| `PARTITION` | string | 分区 |
| `NET` | string | 网络 |
| `PRIMITIVE` | string | 图元配置 |
| `GROUP` | string | 分组控制 |
| `SILK_OPTS` | string | 丝印配置 |
| `PREFERENCE` | string | 偏好 |
| `VIA` | string | 过孔 |
| `PAD` | string | 焊盘 |
| `LINE` | string | 直线 |
| `ARC` | string | 圆弧线 |
| `OBJ` | string | 二进制内嵌对象 |
| `EQLEN_GRP` | string | 等长组 |
| `POLY` | string | 折线 |
| `FILL` | string | 填充 |
| `LAYER_FILL` | string | 层填充 |
| `REGION` | string | 区域 |
| `POUR` | string | 覆铜边框 |
| `POURED` | string | 覆铜结果 |
| `IMAGE` | string | 图片 |
| `TEARDROP` | string | 泪滴 |
| `FPC_FILL` | string | 柔性工艺补强板 |
| `SHELL` | string | 外壳 |
| `CREASE` | string | 侧面基准线（折痕） |
| `SHELLCUT` | string | 外壳挖槽区域（**已废弃**：当前版本写盘已停用，被 SHELL_ENTITY 取代，仅保留解析兼容） |
| `SHELL_ENTITY` | string | 外壳实体区域 |
| `BOSS` | string | 螺丝柱 |
| `STRING` | string | 文字 |
| `ATTR` | string | 属性 |
| `DIMENSION` | string | 尺寸工具集 |
| `COMPONENT` | string | 元件 |
| `PAD_NET` | string | 焊盘网络映射 |
| `FOOTPRINT_NET` | string | 封装内图元网络映射 |
| `RULE_TEMPLATE` | string | 设计规则模板 |
| `RULE` | string | 设计规则 |
| `RULE_SELECTOR` | string | 设计规则选择器 |
| `PANELIZE` | string | 拼板 |
| `BOARD` | string | 板子，一个 PCB 只有一个该类型图元 #39359 【layout】支持板框内外不同颜色 |
| `X_NET_GROUP` | string | xNet 组 #135141 【拓斯达】【致远电子】支持信号逻辑等长xSignals（已更名为 xNet） |
| `X_NET` | string | X_NET #135141 【拓斯达】【致远电子】支持信号逻辑等长xSignals（已更名为 xNet） |
| `ELE_PLACEHOLDER` | string | 占位符：**3.0 侧没有正式写入点、也没有读取语义**，纯粹占位—— 它只在 **2.0 → 3.0 转换**时被写出来凑数（转换腿写 `{ dataType, max }`，id 形如 `placeholder1`），读取端一律**显式跳过**（对应分支是空的 `break;`）。 格式文档生成器也会跳过它。 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/e-pcb-data-type.json)

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/FOOTPRINT/e-pcb-data-type.md)

