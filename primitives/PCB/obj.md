# TPcbObj

> 返回 [PCB 图元索引](../../documents/PCB.md)

## 定义

PCB 二进制内嵌对象

## 字段

| 字段 | 类型 | 必需 | 约束 | 说明 |
|------|------|------|------|------|
| partitionId | `string | null` |  | - | 所属分区编号，为null表示无分区 |
| groupId | `string` | ✓ | - | 分组编号, 没有则为 0 不分组，非 0 为组标志，相同组标志的为一组 |
| layerId | `number` | ✓ | - | 层编号 |
| locked | `boolean` | ✓ | - | 是否锁定 |
| zIndex | `number | null` | ✓ | - | Z 轴高度, null 为默认 |
| fileName | `string` | ✓ | - | 文件名 |
| startX | `number` | ✓ | - | 左上 X |
| startY | `number` | ✓ | - | 左上 Y |
| width | `number` | ✓ | - | 宽 |
| height | `number` | ✓ | - | 高 |
| angle | `number` | ✓ | - | 旋转角度（角度制），绕 左上 点 |
| mirror | `boolean` | ✓ | - | 原始图片是否水平镜像，镜像以原始图片 BBox 中点进行水平镜像 |
| path | `string` | ✓ | - | 二进制数据 1.一般格式，与 Data Urls 完全兼容 data:[<mediatype>][;base64],<data> 2.BLOB 引用格式 blob:hashid |
| specialColor | `string` |  | pattern: ^$|^#[0-9A-Fa-f]{6}$ | 特殊颜色 |

## JSON Schema

→ [查看 JSON Schema](../../schemas/t-pcb-obj.json)

## 校验规则

| 规则 | 级别 | 说明 |
|------|------|------|
| required | ERROR | `groupId`: 必需字段 |
| required | ERROR | `layerId`: 必需字段 |
| required | ERROR | `locked`: 必需字段 |
| required | ERROR | `zIndex`: 必需字段 |
| required | ERROR | `fileName`: 必需字段 |
| required | ERROR | `startX`: 必需字段 |
| required | ERROR | `startY`: 必需字段 |
| required | ERROR | `width`: 必需字段 |
| required | ERROR | `height`: 必需字段 |
| required | ERROR | `angle`: 必需字段 |
| required | ERROR | `mirror`: 必需字段 |
| required | ERROR | `path`: 必需字段 |
| pattern | ERROR | `specialColor`: 匹配模式: ^$|^#[0-9A-Fa-f]{6}$ |

## 关联图元

_无关联图元_

## 示例

→ [查看示例](../../examples/PCB/t-pcb-obj.md)

