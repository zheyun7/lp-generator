
  # Project: SaaS Landing Page Generator — FUSION MODE

  ## 自主执行规则
  - 完全自主模式，不等待任何确认
  - 遇到任何决策，自行判断，不要停下来
  - 遇到 build 报错，分析根本原因并修复，最多尝试 3 种方案
  - 每完成一个阶段，立即继续下一个阶段
  - 全部完成后写 DONE.md

  ## 项目目标
  将 LP Generator（后端产品）与 FlowAI（视觉质量）融合为一个产品。
  保留：API 路由、Supabase、中间件、表单逻辑
  替换：所有 landing 组件升级为 FlowAI 级视觉质量

  ## 技术栈（不得更改）
  - Next.js 15 (App Router) + TypeScript
  - Tailwind CSS v4 (CSS-based config)
  - framer-motion（已安装）
  - lucide-react（已安装）
  - next-themes（已安装，但未使用）
  - @headlessui/react（已安装，用于 Accordion）
  - Supabase（已配置）

  ## 参考源
  FlowAI 高质量组件位于：
  D:\hb\work\p-2\tailwind-landing-page-template-main\src\components\sections\
  D:\hb\work\p-2\tailwind-landing-page-template-main\src\components\ui\
  D:\hb\work\p-2\tailwind-landing-page-template-main\src\lib\
  可以直接阅读这些文件作为视觉参考。

  ## 项目结构
  app/
    (default)/page.tsx        # 主页表单（需改进UI）
    p/[slug]/page.tsx         # 动态落地页（替换组件引用）
    api/pages/route.ts        # POST: 创建页面（不动）
    api/pages/[slug]/route.ts # GET: 读取页面（不动）
  components/
    landing/                  # 重写所有组件为 FlowAI 质量
      HeroSection.tsx
      FeaturesSection.tsx
      HowItWorksSection.tsx   # 新增
      PricingSection.tsx
      FAQSection.tsx
      CTASection.tsx
      Footer.tsx
      NavBar.tsx              # 新增
  lib/
    types.ts                  # 补充缺失类型
    colors.ts                 # 重写为CSS变量方案
    utils.ts                  # 补全 cn() 函数
    supabase.ts               # 不动

  ## 完成标准
  - npm run build 零报错零警告
  - 所有 Section 组件有 framer-motion 入场动画
  - 颜色主题正确切换（5种颜色可选）
  - 支持深色/浅色模式
  - 移动端响应式正常
  - 生成的落地页视觉达到 FlowAI 级别
  - 主表单页面 UI 改进
  - DONE.md 总结报告
  