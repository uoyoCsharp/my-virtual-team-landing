# Project: my-virtual-team-landing

## Overview

A marketing landing page for "My Virtual Tech Team" (MVTT) — an AI-agent framework that provides specialized skills covering the full software development lifecycle from requirements analysis to tested code. The site is a single-page React application built with React 19, TypeScript, Vite 6, and Tailwind CSS 4. Content is fully internationalized (English and Chinese) via i18next, and all display text is driven by translation JSON files rather than hardcoded strings. The page is deployed on Vercel.

## Core Terms

| Term | Meaning |
|------|---------|
| MVTT | My Virtual Tech Team — the product being marketed |
| AI skills | Specialized automated agent capabilities (analyze, design, implement, test, etc.) |
| Persistent context | Workspace state and knowledge that survives across agent sessions |
| `/mvt-*` commands | CLI-style slash commands that invoke specific skills (e.g., `/mvt-analyze`, `/mvt-design`) |
| Session | A single development conversation with state tracked in `session.yaml` |
| Active change | A tracked work item with its own plan and artifacts |
| Change ID | Unique identifier for a tracked change (e.g., `chg-001`) |
| `.ai-agents/` | The framework's workspace directory containing config, registry, and artifacts |
| `@uoyo/mvtt` | The npm package name for the MVTT framework |

## Module Structure

### Section Components (`src/components/`)

| Path | Responsibility | Depends On |
|------|---------------|------------|
| `Navbar.tsx` | Fixed top navigation with mobile hamburger menu and language toggle | `ui/Logo`, `ui/button`, `@iconify/react`, `react-i18next` |
| `HeroSection.tsx` | Above-the-fold hero with animated floating elements, version badge, CTA buttons | `ui/button`, `ui/CopyButton`, `reactbits/*`, `hooks/useNpmVersion`, `framer-motion` |
| `ProblemSection.tsx` | Three-column problem statement cards with hover effects | `ui/SectionLabel`, `react-i18next`, `framer-motion` |
| `PersistentSection.tsx` | Features list + animated file tree visualization showing the `.ai-agents/` structure | `ui/SectionLabel`, `react-i18next`, `framer-motion` |
| `WorkflowSection.tsx` | Sticky scroll-driven workflow animation showing 6 development states | `ui/SectionLabel`, `react-i18next`, `framer-motion` |
| `SkillsSection.tsx` | Categorized skill cards with glare hover effect (workflow + utility categories) | `ui/SectionLabel`, `reactbits/GlareHover`, `lib/utils`, `react-i18next` |
| `RecipesSection.tsx` | Common workflow recipes shown as command chains | `ui/SectionLabel`, `lib/utils`, `react-i18next` |
| `WhoIsForSection.tsx` | Target audience (fit vs. not-fit) list | `ui/SectionLabel`, `react-i18next`, `framer-motion` |
| `FAQSection.tsx` | Accordion-style FAQ with animated expand/collapse | `ui/SectionLabel`, `react-i18next`, `framer-motion` |
| `InstallCTASection.tsx` | Install instructions with terminal mockup and command grid | `ui/button`, `react-i18next`, `framer-motion` |
| `Footer.tsx` | Simple footer with logo and license text | `ui/Logo`, `react-i18next` |

### UI Primitives (`src/components/ui/`)

| Path | Responsibility |
|------|---------------|
| `button.tsx` | Polymorphic button with variants (amber, outline, ghost, dark) and sizes via `class-variance-authority` |
| `CopyButton.tsx` | Clipboard copy button with visual feedback using `navigator.clipboard` |
| `Logo.tsx` | Brand logo combining an SVG image with styled "mvtt." text |
| `SectionLabel.tsx` | Reusable amber-colored section label with alignment support |

### Visual Effects (`src/components/reactbits/`)

| Path | Responsibility |
|------|---------------|
| `BlurText.tsx` | Intersection-triggered blur-in animation per word or character using Framer Motion |
| `ClickSpark.tsx` | Canvas-based spark particle burst on click |
| `GlareHover.tsx` | CSS-driven glare/reflection effect on hover with configurable color and size |
| `GradientText.tsx` | Animated gradient text cycling through configurable colors using Framer Motion |
| `ShinyText.tsx` | CSS shimmer animation on text |

### Infrastructure (`src/`)

| Path | Responsibility |
|------|---------------|
| `main.tsx` | Application entry point — mounts React app with StrictMode |
| `App.tsx` | Root component — arranges all sections in page order with global layout wrapper |
| `i18n.ts` | i18next initialization with language detection, English/Chinese resources, and HTML lang attribute sync |
| `index.css` | Tailwind CSS v4 entry with custom theme variables and animation keyframes |
| `lib/utils.ts` | `cn()` helper combining `clsx` and `tailwind-merge` for conditional class merging |
| `hooks/useNpmVersion.ts` | Custom hook fetching latest package version from npm registry with in-memory caching (5 min TTL) |

### Content Layer

| Path | Responsibility |
|------|---------------|
| `locales/en/translation.json` | English translations for all section content |
| `locales/zh/translation.json` | Chinese (Simplified) translations for all section content |

## Layer Structure

```
App (layout shell)
  ├── Section Components (Navbar, HeroSection, ProblemSection, ...)
  │     ├── UI Primitives (Button, Logo, SectionLabel, CopyButton)
  │     ├── ReactBits Effects (BlurText, GlareHover, GradientText, ClickSpark, ShinyText)
  │     ├── Hooks (useNpmVersion)
  │     └── i18n (react-i18next useTranslation)
  ├── lib/utils (cn)
  └── locales (translation JSON)
```

**Import rules:**
- Section components may import UI primitives, ReactBits effects, hooks, and `lib/utils`.
- UI primitives may import `lib/utils` and Radix primitives (`@radix-ui/react-slot`).
- ReactBits effects are self-contained (no internal project imports beyond their own CSS).
- Hooks may use React builtins only — no project-internal imports.
- `lib/utils` has zero project-internal imports.
- No section component imports another section component.
- The locales layer is consumed only by section components via `react-i18next`.

## Key Business Rules

- **Content-driven rendering**: All UI text comes from i18n translation files. Section components call `useTranslation()` and never hardcode display strings.
- **Version badge**: The `useNpmVersion` hook fetches `@uoyo/mvtt` version from `https://registry.npmjs.org/@uoyo/mvtt/latest` with a 5-minute in-memory cache. On failure, the badge renders silently without a version string.
- **Scroll-driven workflow animation**: `WorkflowSection` uses Framer Motion's `useScroll` with sticky positioning to drive a 6-state animation that maps scroll progress to visual state transitions.
- **Language persistence**: Language choice is detected via browser detector and persisted; switching calls `i18n.changeLanguage()` which updates the HTML `lang` attribute.
- **Mobile navigation**: The hamburger menu opens an overlay nav that closes on link click.
- **FAQ accordion**: Single-open accordion — opening one item closes the previously open item. First item is open by default.
- **Animate-once pattern**: All section components use `useInView` with `{ once: true }` to trigger entrance animations exactly once when the section scrolls into view.

## API Overview

### External API (consumed at runtime)

| Endpoint | Method | Purpose | Consumer |
|----------|--------|---------|----------|
| `https://registry.npmjs.org/@uoyo/mvtt/latest` | GET | Fetch latest package version | `useNpmVersion` hook → `HeroSection` badge |

### Internal Component Interfaces (public props)

| Component | Key Props |
|-----------|-----------|
| `Button` | `variant: "amber" \| "outline" \| "ghost" \| "dark"`, `size: "default" \| "sm" \| "lg" \| "icon"`, `asChild?: boolean` |
| `CopyButton` | `text: string`, `className?: string`, `children?: ReactNode` |
| `Logo` | `className?: string` |
| `SectionLabel` | `children: ReactNode`, `align?: "left" \| "center"` |
| `BlurText` | `text?: string`, `animateBy: "words" \| "chars"`, `direction: "top" \| "bottom"`, `delay`, `stepDuration`, etc. |
| `GlareHover` | `glareColor`, `glareOpacity`, `glareSize`, `borderRadius`, `playOnce`, etc. |
| `GradientText` | `colors?: string[]`, `animationSpeed?: number`, `showBorder?: boolean` |
| `ClickSpark` | `sparkColor`, `sparkSize`, `sparkRadius`, `sparkCount`, `duration`, etc. |
| `ShinyText` | `speed?: number` |
