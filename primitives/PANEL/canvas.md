# TPanelCanvas

> 返回 [PANEL 图元索引](../../documents/PANEL.md)

## 定义

编辑器附加信息

【常见取值与缺省来源】编辑器在文档里**没有** CANVAS 记录时按一张缺省表补全
（`pro-panel` 的 `DefaultHead`）：
`material:'acrylic'`、`thickness:'0.8mm'`、`print:'Bottom Side'`、`craft:'Transparent'`、
`coverColor:'white'`、`width:'393mm'`、`height:'579mm'`、`desc:''`。
⚠️ 注意 `coverColor` 缺省是**字符串色名 `"white"`**，不是颜色码——读取端不要假设本类型的
字段必为颜色码或纯数值。

本类型是**单例记录**（行外壳 `id` 恒为 `"CANVAS"`），属**固定单例 id**，见 [TSingletonElementId](../REFERENCE/t-singleton-element-id.md)。

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| originX | `number` | ✓ | - | 画布原点 X：**绝对坐标里的一个基准锚点**——**网格与标尺的相位基准**、 **打开面板时视图居中的点**，也是**属性面板显示坐标的零点**。 与图元坐标同一口径，单位 **0.01 inch**（100DPI 下的 1px）。本域内部是 **SVG 坐标系（Y 向下）**，默认原点落在**材料框左下角**。 ⚠️ **它不是「图元坐标的平移量」**：图元坐标是**绝对坐标**，改原点不搬图元。 注：本类型**不继承 `TPanelBase`**，故其上那个通用约定块不覆盖本类型； 本类型的尺寸字段（width/height/thickness 等）另行以**带单位字符串**表达。 |
| originY | `number` | ✓ | - | 画布原点 Y：含义与单位同 `originX`（**0.01 inch**；内部 Y 向下，增大 = 向下）。 ⚠️ **同一个面板文档有两条序列化路径，`originY` 的符号相反**： 3.0 的 CANVAS 原子是**原样**；而**面板 2.0 压缩串**（PANEL_LIB 落盘 / 导入走这条） 写读两端都会**取负**。对比或换算前先分清拿到的是哪一种。 另外**新建面板时这两个键可能根本不存在**（写盘时 `undefined` 被整键丢弃）， 读取端按 `0` 兜底。 |
| width | `string` | ✓ | - | 画布宽度：**带单位的字符串**（如 `"393mm"`），不是纯数值 |
| height | `string` | ✓ | - | 画布高度：**带单位的字符串**（如 `"579mm"`），不是纯数值 |
| material | `string` | ✓ | - | 材质 |
| thickness | `string` | ✓ | - | 板材厚度：**带单位的字符串**（如 `"0.8mm"`），不是纯数值 |
| print | `string` | ✓ | - | 打印方式 |
| craft | `string` | ✓ | - | 表面工艺 |
| desc | `string` | ✓ | - | 描述 |
| coverColor | `string` | ✓ | pattern: ^(#[0-9A-Fa-f]{6})\|(rgb\(\d{1,3},\d{1,3},\d{1,3}\))\|(cmyk\(\d{1,3},\d{1,3},\d{1,3},\d{1,3}\))\|$ | 遮盖颜色：缺省是**字符串色名 `"white"`**（见本类型开头的缺省表），不是颜色码 |
| backgroundColor | `string` | ✓ | pattern: ^(#[0-9A-Fa-f]{6})\|(rgb\(\d{1,3},\d{1,3},\d{1,3}\))\|(cmyk\(\d{1,3},\d{1,3},\d{1,3},\d{1,3}\))\|$ | 背景颜色 |
| orderWidth | `string` | ✓ | - | 下单板框最大宽度：**带单位的字符串**（如 `"393mm"`），由板框层与画布求交后的包围盒换算得到 |
| orderHeight | `string` | ✓ | - | 下单板框最大高度：**带单位的字符串**（如 `"579mm"`） |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-panel-canvas.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `originX`: 必需字段 |
| required | ERROR | `originY`: 必需字段 |
| required | ERROR | `width`: 必需字段 |
| required | ERROR | `height`: 必需字段 |
| required | ERROR | `material`: 必需字段 |
| required | ERROR | `thickness`: 必需字段 |
| required | ERROR | `print`: 必需字段 |
| required | ERROR | `craft`: 必需字段 |
| required | ERROR | `desc`: 必需字段 |
| required | ERROR | `coverColor`: 必需字段 |
| required | ERROR | `backgroundColor`: 必需字段 |
| required | ERROR | `orderWidth`: 必需字段 |
| required | ERROR | `orderHeight`: 必需字段 |
| pattern | ERROR | `coverColor`: 匹配模式: ^(#[0-9A-Fa-f]{6})\|(rgb\(\d{1,3},\d{1,3},\d{1,3}\))\|(cmyk\(\d{1,3},\d{1,3},\d{1,3},\d{1,3}\))\|$ |
| pattern | ERROR | `backgroundColor`: 匹配模式: ^(#[0-9A-Fa-f]{6})\|(rgb\(\d{1,3},\d{1,3},\d{1,3}\))\|(cmyk\(\d{1,3},\d{1,3},\d{1,3},\d{1,3}\))\|$ |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PANEL/t-panel-canvas.md)

