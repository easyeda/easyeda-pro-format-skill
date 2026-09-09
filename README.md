# EasyEDA Pro Format Skill

简体中文 | [English](#english)

嘉立创EDA（EasyEDA）Pro 格式数据生成技能，供 Claude Code 等 AI Agent 使用。

根据类型定义和 JSON Schema，生成符合 EasyEDA Pro 格式的原理图 / PCB / 符号 / 封装数据，并通过内置验证脚本保证输出格式正确。

## 功能特性

- **全领域覆盖**：原理图（SCH_PAGE / SYMBOL）、PCB（PCB / FOOTPRINT）、面板（PANEL / PANEL_LIB）、仿真（SIMULATION）、规则与元数据等 13 个文档领域
- **渐进式资料加载**：类型索引 → 文档层 → 图元层 → 示例层 / JSON Schema，按需加载，避免上下文爆炸
- **关联图元自动推断**：生成主图元时自动推断并生成关联图元（父子、容器成员、内嵌结构、引用关联），无需用户干预
- **强制验证**：每次生成后必须调用 `validate.js` 校验，`valid: true` 才允许返回结果
- **自动存档**：验证通过后保存到 `format/{type}_{timestamp}.txt`

## 目录结构

```
easyeda-pro-format-skill/
├── SKILL.md           # Skill 主文档（核心流程、行数据格式、LLM 工作流）
├── types-index.md     # 全部图元类型索引（中文名 → 类型名 → 文档层路径）
├── validate.js        # 格式验证脚本（基于 ajv）
├── documents/         # 文档层：13 个领域的图元索引
├── primitives/        # 图元层：每种图元的字段定义、约束、关联图元说明
├── examples/          # 示例层：真实格式数据参考
├── schemas/           # JSON Schema：字段级约束定义
└── format/            # 生成结果的存档目录（运行时创建）
```

## 安装

### 方式一：全局安装（所有项目可用）

将本仓库克隆到 Claude Code 个人技能目录 `~/.claude/skills/`：

```bash
# macOS / Linux
git clone https://github.com/easyeda/easyeda-pro-format-skill.git \
  ~/.claude/skills/easyeda-pro-format-skill

# Windows (PowerShell)
git clone https://github.com/easyeda/easyeda-pro-format-skill.git `
  "$env:USERPROFILE\.claude\skills\easyeda-pro-format-skill"
```

> Windows 下对应路径为 `C:\Users\<用户名>\.claude\skills\easyeda-pro-format-skill`

### 方式二：项目级安装（仅当前项目可用）

克隆到项目根目录的 `.claude/skills/` 下：

```bash
git clone https://github.com/easyeda/easyeda-pro-format-skill.git \
  <你的项目>/.claude/skills/easyeda-pro-format-skill
```

### 方式三：手动复制

如果已下载本仓库（如 zip 包），直接将整个 `easyeda-pro-format-skill` 文件夹复制到上述任一 skills 目录即可。

> 注意：目录名需与技能名一致，即 `easyeda-pro-format-skill`，且 `SKILL.md` 必须位于该目录根部。

### 安装验证依赖

验证脚本依赖 `ajv` 和 `ajv-formats`，在技能目录内执行：

```bash
cd ~/.claude/skills/easyeda-pro-format-skill
npm install ajv ajv-formats
```

### 验证安装

重启 Claude Code 会话后，在对话中输入触发语，例如：

```
生成过孔的格式
```

或使用斜杠命令：

```
/easyeda-pro-format-skill 过孔
```

也可以直接运行验证脚本确认依赖正常：

```bash
node validate.js FONT '{"width":50,"height":40,"path":[[2,5,"L",2,35,48,35,48,5,2,5]]}'
```

输出 `{"valid": true, "errors": []}` 即安装成功。

## 使用方法

### 触发示例

以下任意描述都会触发本技能：

| 领域 | 触发语示例 |
|------|-----------|
| PCB | 「生成过孔」「添加焊盘」「画一段 PCB 走线」 |
| 原理图 | 「画导线的格式」「创建总线」「添加文字标注」 |
| 元件 | 「创建电阻元件」「创建电容元件」 |
| 格式查询 | 「生成 TBus 的格式」「生成 TSchText 的格式」 |
| 英文 | 「generate via format」「draw wire」「add pad」 |

### 验证脚本

```bash
node validate.js [--save] <type> '<json-data>'

# 示例
node validate.js FONT '{"width":50,"height":40,"path":[[2,5,"L",2,35,48,35,48,5,2,5]]}'
```

- `<type>`：图元类型名（如 `FONT`、`LINE`、`PAD`、`VIA`），详见 [types-index.md](types-index.md)
- `<json-data>`：图元属性 JSON
- `--save`：可选，验证通过后自动存档

### 工作流程

```
1. 查询资料 → 2. 检查关联图元 → 3. 生成格式 → 4. 验证格式 → 5. 存档
                                                    ↓ 失败
                                              修复并重试（最多3次）
```

生成的行数据格式为 `{type, id, ticket}||{实际数据}`，每个文档必须以 `DOCHEAD` 和 `CANVAS` 两行开头。完整规则见 [SKILL.md](SKILL.md)。

## 许可证

[MIT](LICENSE)

---

# English

简体中文 | [English](#english)

An EasyEDA (嘉立创EDA) Pro format data generation skill for AI agents such as Claude Code.

It generates schematic / PCB / symbol / footprint data conforming to the EasyEDA Pro format from type definitions and JSON Schemas, with a built-in validation script to guarantee correct output.

## Features

- **Full domain coverage**: 13 document domains including schematic (SCH_PAGE / SYMBOL), PCB (PCB / FOOTPRINT), panels (PANEL / PANEL_LIB), simulation, rules, and metadata
- **Progressive context loading**: type index → document layer → primitive layer → examples / JSON Schema, loaded on demand to avoid context explosion
- **Automatic related primitives**: related primitives (parent-child, container members, embedded structures, references) are inferred together with the main primitive — no user intervention needed
- **Mandatory validation**: every generation must be validated with `validate.js`; results may only be returned when `valid: true`
- **Automatic archiving**: validated results are saved to `format/{type}_{timestamp}.txt`

## Directory Structure

```
easyeda-pro-format-skill/
├── SKILL.md           # Main skill document (core workflow, line data format, LLM workflow)
├── types-index.md     # Index of all primitive types (Chinese name → type name → document path)
├── validate.js        # Format validation script (based on ajv)
├── documents/         # Document layer: primitive indexes for the 13 domains
├── primitives/        # Primitive layer: field definitions, constraints, related primitives
├── examples/          # Example layer: real format data for reference
├── schemas/           # JSON Schema: field-level constraints
└── format/            # Archive directory for generated output (created at runtime)
```

## Installation

### Option 1: Global installation (available in all projects)

Clone this repository into the Claude Code personal skills directory `~/.claude/skills/`:

```bash
# macOS / Linux
git clone https://github.com/easyeda/easyeda-pro-format-skill.git \
  ~/.claude/skills/easyeda-pro-format-skill

# Windows (PowerShell)
git clone https://github.com/easyeda/easyeda-pro-format-skill.git `
  "$env:USERPROFILE\.claude\skills\easyeda-pro-format-skill"
```

> On Windows this corresponds to `C:\Users\<username>\.claude\skills\easyeda-pro-format-skill`

### Option 2: Project-level installation (current project only)

Clone into `.claude/skills/` under the project root:

```bash
git clone https://github.com/easyeda/easyeda-pro-format-skill.git \
  <your-project>/.claude/skills/easyeda-pro-format-skill
```

### Option 3: Manual copy

If you downloaded the repository (e.g. as a zip archive), simply copy the whole `easyeda-pro-format-skill` folder into either of the skills directories above.

> Note: the directory name must match the skill name (`easyeda-pro-format-skill`), and `SKILL.md` must be located at the root of that directory.

### Install validation dependencies

The validation script depends on `ajv` and `ajv-formats`. Run inside the skill directory:

```bash
cd ~/.claude/skills/easyeda-pro-format-skill
npm install ajv ajv-formats
```

### Verify the installation

After restarting the Claude Code session, type a trigger phrase in the conversation, for example:

```
生成过孔的格式
```

Or use the slash command:

```
/easyeda-pro-format-skill 过孔
```

You can also run the validation script directly to confirm the dependencies work:

```bash
node validate.js FONT '{"width":50,"height":40,"path":[[2,5,"L",2,35,48,35,48,5,2,5]]}'
```

Output `{"valid": true, "errors": []}` means the installation succeeded.

## Usage

### Trigger examples

Any of the following descriptions triggers this skill:

| Domain | Example trigger phrases |
|--------|------------------------|
| PCB | 「生成过孔」 (generate via), 「添加焊盘」 (add pad), 「画一段 PCB 走线」 (draw a PCB trace) |
| Schematic | 「画导线的格式」 (draw wire), 「创建总线」 (create bus), 「添加文字标注」 (add text annotation) |
| Components | 「创建电阻元件」 (create resistor), 「创建电容元件」 (create capacitor) |
| Format lookup | 「生成 TBus 的格式」, 「生成 TSchText 的格式」 |
| English | 「generate via format」「draw wire」「add pad」 |

### Validation script

```bash
node validate.js [--save] <type> '<json-data>'

# Example
node validate.js FONT '{"width":50,"height":40,"path":[[2,5,"L",2,35,48,35,48,5,2,5]]}'
```

- `<type>`: primitive type name (e.g. `FONT`, `LINE`, `PAD`, `VIA`). See [types-index.md](types-index.md)
- `<json-data>`: primitive properties as JSON
- `--save`: optional, archive automatically after passing validation

### Workflow

```
1. Look up docs → 2. Check related primitives → 3. Generate format → 4. Validate → 5. Archive
                                                          ↓ failure
                                                    fix and retry (up to 3 times)
```

The generated line format is `{type, id, ticket}||{data}`, and every document must start with the `DOCHEAD` and `CANVAS` lines. See [SKILL.md](SKILL.md) for the complete rules.

## License

[MIT](LICENSE)
