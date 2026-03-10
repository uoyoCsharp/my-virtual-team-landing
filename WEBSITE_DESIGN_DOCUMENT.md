# My-Virtual-TechTeam 官网详细设计文档 (UI/UX Design Specification)

## 1. 项目概述 (Project Overview)
**项目名称**：My-Virtual-TechTeam
**核心理念**：A virtual IT team made up of AI agents. (由AI Agent组成的虚拟IT团队，基于提示词工程构建)。
**核心受众**：软件工程师、架构师、技术经理、独立开发者。
**设计目标**：向开发者清晰展示多AI Agent协同工作的流畅体验，传达“高效、专业、现代化、未来感”的品牌印象，吸引开发者克隆仓库并尝试使用。

---

## 2. 设计系统与视觉风格 (Design System & Visual Identity)

### 2.1 整体风格原则
*   **Dark Mode First (暗黑模式为主)**：迎合开发者群体的审美习惯。
*   **Tech & Cyberpunk Elements (科技与赛博朋克元素)**：点缀霓虹色发光效果，体现AI与代码的结合。
*   **Glassmorphism (极简毛玻璃风格)**：卡片和浮层使用带环境光反射的半透明磨砂玻璃材质（backdrop-filter），增加空间感和高级感。
*   **Terminal Aesthetics (终端美学)**：关键动作和指令（如 `#init`, `#implement`）使用类似 IDE/Terminal 的代码块样式展示。

### 2.2 推荐色彩规范 (Color Palette)
*   **Background (主背景色)**：深邃黑，例如 `#0B0C10` 或 `#09090B`。
*   **Surface (卡片/面板底色)**：略亮的深灰底色，例如 `#1A1A1D` 或 `#18181B` (低透明度，结合毛玻璃效果)。
*   **Primary Accent (主强调色/品牌色)**：
    *   **AI 霓虹蓝**：`#00F0FF` 或 `#3B82F6` (用于主按钮、核心图标高亮、发光线条)。
    *   **矩阵绿 (可选辅助色)**：`#10B981` (用于表示成功、状态 Active 或 Terminal 文本)。
*   **Secondary Accent (次强调色)**：
    *   **电光紫**：`#8A2BE2` 或 `#8B5CF6` (与蓝色形成渐变，用于背景大光晕，增加科幻感)。
*   **Text (文本颜色)**：
    *   主标题/高对比度文本：纯白 `#FFFFFF` 或 极浅灰 `#F8FAFC`。
    *   正文/次要文本：浅灰 `#94A3B8` 或 `#C5C6C7`。

### 2.3 字体排印 (Typography)
*   **H1/H2 标题字体**：推荐使用无衬线几何字体，如 *Inter*, *Manrope*, 或 *Outfit*，字重偏粗（Bold/ExtraBold），可以带细微的字母间距缩窄。
*   **正文字体**：与标题保持一致，或普通的系统无衬线字体（如 *Roboto*, *San Francisco*），字重为 Regular/Medium。
*   **代码/指令字体 (Monospace)**：必须使用等宽编程字体，如 *Fira Code*, *JetBrains Mono*, 或 *Source Code Pro*。

---

## 3. 页面布局深度拆解 (Page Structure & Layout Breakdown)

本网站采用 **单页长图滚动 (Single Page Scroll)**，辅以吸顶导航栏。

### 3.1 导航栏 (Sticky Header)
*   **左侧品牌区**：清晰的文字 Logo `My-Virtual-TechTeam`，左侧可配一个由电路纹理或抽象人脑/AI芯片构成的极简 Icon。
*   **中间/右侧导航菜单**：Features, Workflow, Agents, Architecture。悬停时文字颜色由灰变白，底部出现主强调色的下划线动画。
*   **右侧操作区**：GitHub 徽章图标 (常驻) + 显眼的「Get Started」按钮 (填充主强调色，带细微的外发光 shadow)。
*   **滚动行为**：向下滚动时，导航栏背景变为毛玻璃材质并带有底部极细边框 (`border-b border-white/10`)。

### 3.2 第一屏：英雄区 (Hero Section)
*   **布局**：宽屏居中对齐 或 经典的“左文右图”布局。
*   **背景**：深色背景，点缀巨大但非常模糊的蓝紫色渐变圆形光晕 (`filter: blur(120px)`)，在缓慢呼吸或移动。
*   **文案区**：
    *   主标题 (H1, 渐变色填充)：*Unleash Your Potential with an AI Virtual Tech Team.*
    *   副标题 (H2/P)：*基于提示词工程构建的多架构AI Agent框架。将复杂的软件开发生命周期交由虚拟的 Analyst, Architect 和 Developer 协作完成。*
    *   双按钮：首选操作按钮「View on GitHub (带Star图标)」，次选操作按钮「Read the Docs (透明底，线框)」。
*   **视觉演示区 (Hero Visual)**：
    *   放置一个高品质的伪装成 VS Code 编辑器或 Terminal 窗口的动画UI。
    *   动画内容：模拟用户输入 `#init` ➔ 屏幕自动弹出并列印各 Agent 被唤醒的日志 ➔ 自动生成架构文件的过程。
    *   *设计要求*：使用代码语法高亮配色，节奏干脆，模拟真实的打字反馈感。

### 3.3 第二屏：核心特性 (Features - The "Why")
*   **标题**：*Why My-Virtual-TechTeam?*
*   **布局**：3行 × 3列 的网格卡片 (Bento Box/Grid Layout)。
*   **卡片设计**：面板背景色 `#18181B`，圆角 (`border-radius: 12px` 或更高)，1px 的精细边框 (`border: 1px solid rgba(255,255,255,0.05)`)。
*   **交互动效**：鼠标悬停 (Hover) 时，边框颜色渐变高亮（光效追随鼠标指针/Spotlight 效果），卡片略微上浮。
*   **内容装配 (各带一个线性科技感Icon)**：
    1.  🎭 Role Separation (角色分离)
    2.  🌐 Platform Agnostic (平台无关)
    3.  📂 Unified Registry (统一资源注册表)
    4.  🤝 Context Contract (智能上下文契约)
    5.  🗄️ Data Tiering (数据冷热分层存储)
    6.  🧠 Semantic Index (语义知识库索引)
    7.  ⚙️ Semi-automatic Workflows (半自动工作流控制)
    8.  🧩 Modular Skills (技能模块化热插拔)
    9.  🌍 Language Agnostic (无视编程语言限制)

### 3.4 第三屏：智能工作流 (The Workflow)
*   **标题**：*Seamless Development Lifecycle*
*   **设计核心**：用可视化线条或连接路径串联起开发阶段。一条高亮的“光流”穿过这些步骤。
*   **内容流转**：
    *   (节点 1) `#analyze` ➔ Analyst 处理需求
    *   (节点 2) `#design` ➔ Architect 生成设计
    *   (节点 3) `#implement` ➔ Developer 实现代码
    *   (节点 4) `#review` ➔ Reviewer 审查质量
    *   (节点 5) `#test` ➔ Tester 输出测试
*   *设计重点*：每个节点旁边可以带有一个小型的代码 Snippet 卡片，展示该阶段实际发生的输入输出样例。

### 3.5 第四屏：角色矩阵 (Meet the Agents)
*   **标题**：*Your Dedicated Specialists*
*   **布局**：大尺寸的横向滚动卡片组 (Carousel) 或者纵横交错的画廊布局。
*   **角色刻画**：不要使用真实的拟人照片。建议使用**2D/3D的抽象几何图形、多面体或精美的极简徽章**来代表每个角色（例如：Conductor 是多面体核心；Architect 是带有蓝图网格的几何体；Reviewer 是带有扫描射线的护盾等）。
*   **文案展示**：点击或悬停时，展示该角色的专属职能、常用命令（如 Developer 对应 `#implement`, `#fix`）。

### 3.6 第五屏：架构透视 (Architecture)
*   **标题**：*Clean, Modular Under the Hood*
*   **布局**：左文右图。
*   **左侧文案**：解释 `.ai-agents` 的平台无关性核心，并说明如何通过 `registry.yaml` 统合一切资源。
*   **右侧视觉体**：
    *   一幅精美的目录树代码块UI。
    *   对特定文件夹如 `agents/`, `skills/`, `workspace/` 进行连线标注（Tooltip指示器），解释其作用。

### 3.7 第六屏：最终呼吁 (Bottom CTA)
*   **布局**：被限制在中央区域的大尺寸 Banner。
*   **背景**：强烈的渐变色或星空/线条粒子背景，吸引全部注意力。
*   **文案**：*Ready to scale your productivity? Start building with your AI Tech Team today.*
*   **操作**：
    *   提供一个带有复制按钮的代码输入框：
        `git clone https://github.com/uoyoCsharp/My-Virtual-TechTeam.git`
    *   大尺寸的「View Documentation / Get Started」按钮。

### 3.8 页脚 (Footer)
*   **极简**：顶部有一条极细的分隔线。
*   **左侧**：Logo, Copyright © 2026, MIT License。
*   **右侧**：指向 GitHub 仓库、文档页、提交 Issue 等关联链接的并排列表。

---

## 4. 给开发与动效团队的实现建议 (Implementation Notes)
1.  **推荐前端栈**：Next.js + Tailwind CSS (用于快速搭建暗黑模式与毛玻璃原子类)。
2.  **动画库**：Framer Motion 或 GSAP。第一屏的 Terminal 动画和打字机效果可以使用 `typewriter-effect` 等轻量库实现。
3.  **高级交互细节**：
    *   在网格卡片区添加由鼠标触发的 Spotlight 光晕效果（利用 CSS 自定义属性追踪 `clientX` / `clientY`）。
    *   代码段必须支持 Syntax Highlighting (推荐 Prism.js 或 Shiki) 以及 Copy-to-Clipboard 功能。

## 5. 设计资产清单需求 (Assets Required from Design Team)
*   [ ] 1x 主 Logo (横向，适应暗背景)。
*   [ ] 1x Favicon。
*   [ ] 6x 抽象角色徽章/Icon (对应 Conductor, Analyst, Architect, Developer, Reviewer, Tester)。
*   [ ] 9x 特性相关的精简线性图标 (SVG)。
*   [ ] 1x Hero 区代码命令行运行动效设计图或 Lottie 动画文件。
