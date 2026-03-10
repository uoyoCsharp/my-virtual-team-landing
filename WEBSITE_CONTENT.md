# My-Virtual-TechTeam 网站前端文案与内容指北 (Website Copy & Content Spec)

本文档为主页各个区块（Sections）的实际展示文案和内容素材，前端开发人员可直接复制并填充至网页对应的组件中。

---

## 0. 全局导航栏 (Header Navigation)
*   **Logo Text**: `My-Virtual-TechTeam`
*   **Menu Items**:
    *   `Features` (特性)
    *   `Workflow` (工作流)
    *   `Agents` (特工团队)
    *   `Architecture` (架构)
*   **Buttons**:
    *   `GitHub` (Icon, 链接至仓库)
    *   `Get Started` (主按钮, 跳转至快速开始锚点或文档首屏)

---

## 1. 首屏展示区 (Hero Section)
*前端注：文字需搭配极其流畅的渐变或透明度进入动画。右侧搭配终端打字动画。*

*   **大标题 (H1)**:
    > Unleash Your Potential with an AI Virtual Tech Team
    > *(释放你的开发潜能，打造你的私人AI技术团队)*
*   **副标题 (H2/Subtitle)**:
    > 基于提示词工程构建的多 Agent 协作框架。将复杂的软件生命周期拆解，交由虚拟的 Analyst, Architect 和 Developer 共同完成。体验像点外卖一样简单的软件开发。
*   **行动呼吁按钮 (CTA Buttons)**:
    *   主按钮 (Primary): `Quick Start`
    *   次按钮 (Secondary): `View on GitHub`
*   **右侧动效区域文案 (Terminal 打字机模拟内容)**:
    ```bash
    > 用户: #init
    [Conductor 启动] 初始化 My-Virtual-TechTeam 框架...
    [Conductor] 正在解析项目
    [Conductor] 上下文已准备就绪
    > 系统: 虚拟开发团队已集结完毕，等待分配任务...
    ```

---

## 1.5 极速下载与安装指南 (Quick Install)
*前端注：可以直接紧贴首屏下方，设计为一个醒目的代码块或横幅。重点突出不需要复杂依赖，一行 npx 命令直接搞定。*

*   **区块标题**: Start Building in Seconds (只需几秒，立刻开箱即用)
*   **正文描述**: 开箱即用，通过 `npx degit` 直接将整个 AI 虚拟团队项目脚手架引入你的本地工作区，告别繁重的配置。
*   **代码输入框 (带一键复制，右上角放置 GitHub 仓库链接：https://github.com/uoyoCsharp/My-Virtual-TechTeam)**:
    ```bash
    # 使用 npx 快速下载仓库模板到你的项目文件夹
    npx degit uoyoCsharp/My-Virtual-TechTeam <your-project-name>
    cd <your-project-name>
    ```

---

## 2. 核心特性 (Core Features - 9宫格卡片内容)
*前端注：每一项对应一个 Bento (网格) 卡片，建议每张卡片含有一个矢量 Icon、粗体标题和简短的描述灰色正文。*

1.  **卡片 1：角色分离 (Role Separation)**
    *   *Title*: 🎭 明确的职责边界
    *   *Description*: 告别单一的“大语言模型”混乱输出。每个 Agent 拥有精准设定的角色定位与边界，专注于自己最擅长的环节。
2.  **卡片 2：平台无关 (Platform Agnostic)**
    *   *Title*: 🌐 跨平台运行
    *   *Description*: 核心框架基于纯文本和提示词工程，完美适配 GitHub Copilot，并计划支持 Claude Code 等主流 AI 编程助手。
3.  **卡片 3：统一资源索引 (Unified Registry)**
    *   *Title*: 📂 集中式大脑
    *   *Description*: 通过 `registry.yaml` 统一管理所有 AI 资源、上下文、历史记录和工具集，大模型首选的系统入口。
4.  **卡片 4：上下文契约 (Context Contract)**
    *   *Title*: 🤝 智能上下文契约
    *   *Description*: 每个特工明确声明前置依赖。确保 AI 在分析和编码时获得精确的上下文，杜绝“幻觉”和错误推断。
5.  **卡片 5：数据分层引擎 (Data Tiering)**
    *   *Title*: 🗄️ 冷热温数据分层
    *   *Description*: 创新的状态管理（State/Context/History），优化极长的上下文窗口使用效率，让 AI 记忆既快又准。
6.  **卡片 6：语义知识库 (Semantic Index)**
    *   *Title*: 🧠 语义化知识索取
    *   *Description*: 项目特定的代码规范和业务知识按语义索引，各领域特工仅在需要时按需精确加载，节省 Token 成本。
7.  **卡片 7：半自动协作 (Semi-automation)**
    *   *Title*: ⚙️ 人机协同控制流
    *   *Description*: 非完全盲目的全自动运行。提供阶段性的确认工作流，由开发者主导确认设计方案，再向下流转代码生成。
8.  **卡片 8：模块化技能 (Modular Skills)**
    *   *Title*: 🧩 热插拔技能树
    *   *Description*: 根据开发任务动态挂载各种专业技能（Skills），让你的团队能随时“学会”使用特定 API 或排查复杂错误。
9.  **卡片 9：语言无关性 (Language Agnostic)**
    *   *Title*: 🌍 任意语言支持
    *   *Description*: 无论你是写 TypeScript、Python、C# 还是 Rust，由 AI 组成的团队都能无缝切换语言栈和技术栈。

---

## 3. 智能工作流流转图 (The Workflow)
*前端注：以时间轴或节点树的形式，表现 `#` 指令如何触发流水线。*

*   **区块标题**: Seamless Development Lifecycle (丝滑的开发全生命周期)
*   **内容节点**:
    *   **Phase 1: `#analyze`**
        *   行动：提取业务概念，分析 PRD 文档。
        *   输出：结构化的需求拆解与验收标准。
    *   **Phase 2: `#design`**
        *   行动：制定技术栈，规划系统/模块架构。
        *   输出：可验证的架构蓝图与数据库/API设计。
    *   **Phase 3: `#implement`**
        *   行动：根据架构设计，落实业务代码。
        *   输出：业务领域代码，严格遵守上下文契约。
    *   **Phase 4: `#review`**
        *   行动：深入代码内部，执行静态与规范检查。
        *   输出：重构建议与质量改进报告。
    *   **Phase 5: `#test`**
        *   行动：针对核心业务路径设计测试用例。
        *   输出：高覆盖率的单元测试/集成测试代码。

---

## 4. 你的专属 AI 特工团队 (Meet the Agents)
*前端注：可使用轮播图或悬浮卡片展示虚拟团队阵容。重点突出指令触发词。*

*   **群像标题**: Your Dedicated Specialists (你麾下的专属专家)
*   **角色 1：Conductor (指挥官)**
    *   *Tagline*: 掌控全局，任务调度器。
    *   *Commands*: `#init`, `#status`, `#config`
    *   *Desc*: 框架的核心入口，负责解析用户意图，唤醒相应特工并监控流转状态。
*   **角色 2：Analyst (分析师)**
    *   *Tagline*: 洞察业务，需求拆解器。
    *   *Commands*: `#analyze`, `#analyze-code`
    *   *Desc*: 擅长阅读长篇文档或庞杂的既有代码，将其转化为开发可落实的业务域概念（Domain Concepts）。
*   **角色 3：Architect (架构师)**
    *   *Tagline*: 构筑基石，系统设计师。
    *   *Commands*: `#design`
    *   *Desc*: 基于分析结果，拍板技术选型，设计严谨的系统分层架构方案与接口契约。
*   **角色 4：Developer (开发者)**
    *   *Tagline*: 手起刀落，代码实现者。
    *   *Commands*: `#implement`, `#fix`, `#refactor`
    *   *Desc*: 完美遵循架构师蓝图，不偏离上下文，撰写优雅、符合最佳实践的生产级代码。
*   **角色 5：Reviewer (审查员)**
    *   *Tagline*: 质量门神，代码质检员。
    *   *Commands*: `#review`
    *   *Desc*: 用极其严苛的标准检查 Developer 提交的代码，查找逻辑漏洞、安全隐患与不优雅的坏味道。
*   **角色 6：Tester (测试员)**
    *   *Tagline*: 未雨绸缪，安全防线的铸造者。
    *   *Commands*: `#test`
    *   *Desc*: 探索边缘用例（Edge Cases），编写自动化测试脚本，把关最后一公里的代码可靠性。

---

## 5. 核心命令指南 (Commands Reference)
*前端注：可采用“左侧选项卡 + 右侧命令说明与模拟输出”的布局，或者用带有高亮徽章（Badge）的列表展示。目的是让新用户快速掌握所有的命令用途。*

*   **区块标题**: Master Your Commands (掌握指挥官的魔杖)
*   **正文描述**: 通过极简的 `#` 前置指令，你可以随时打断工作流，或者唤醒某个领域的专属 AI 特工为你解决疑难杂症。
*   **具体内容 (按照工作流分类)**:

    1.  **🚀 系统与流程管理 (System & Workflow)**
        *   `#init`：**项目初始化**。为你的空白仓库快速注入 `My-Virtual-TechTeam` 的结构和基础配置。
        *   `#status`：**状态巡场**。随时查看当前开发流程卡在哪一步，谁在负责什么任务。
        *   `#config`：**框架配置**。调出交互式面板修改框架默认配置，或切换使用的 LLM 模型。
        *   `#sync-context`：**上下文同步**。强制更新 AI 的工作区记忆，确保它阅读的是最新代码。
        *   `#cleanup`：**快速清理**。一键清理 AI 对话积累的历史记录和冗余工件（Artifacts）。

    2.  **🕵️‍♂️ 需求与架构层 (Analysis & Design)**
        *   `#analyze`：**需求分析**。把长篇产品文档丢给 Analyst，它会提炼出核心业务域与开发可行性。
        *   `#analyze-code`：**代码逆向分析**。接盘旧代码库的利器，让 AI 为你梳理屎山代码的逻辑架构。
        *   `#design`：**技术蓝图设计**。交给 Architect 输出技术选型与模块拆分，确保不走弯路。

    3.  **💻 开发与质量层 (Implementation & Quality)**
        *   `#implement`：**代码落地**。基于架构蓝图，让 Developer 开始成片、符合规范地输出业务代码。
        *   `#fix` / `#refactor`：**智能修复与重构**。带着上下文修复特定 Bug，或者翻新腐坏的代码结构。
        *   `#review`：**代码审查**。拉取门神 Reviewer 对刚写的代码进行无情抨击与漏洞排查。
        *   `#test`：**单元测试生成**。让 Tester 针对边缘条件与核心路径，自动输出自动化测试脚本。

---

## 6. 底部行动呼吁 & 页脚 (Footer & Final CTA)

*   **巨幅横幅文案 (Banner)**:
    > Ready to hire your AI Tech Team?
    > *(准备好雇佣你的 AI 技术团队了吗？)*
*   **操作指引文案**:
    > Clone the repo, open in VS Code, and type `#init` to start.
    > *(克隆仓库，在编辑器内打开并输入 `#init` 即可发号施令。)*
*   **快速复制命令框**:
    ```bash
    git clone https://github.com/uoyoCsharp/My-Virtual-TechTeam.git
    ```
*   **大按钮**:
    *   `Star on GitHub` (带一个醒目的 ★ 星星图标)
*   **页脚信息 (Copyright & Links)**:
    *   © 2026 My-Virtual-TechTeam. Licensed under MIT.
    *   Links: [GitHub Repo] • [Documentation] • [Report an Issue]
