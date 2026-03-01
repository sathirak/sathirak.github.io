# Grotto Style Guide

> **Purpose**: This comprehensive guide documents all architectural decisions, design patterns, and coding standards for this blog website. It serves as the single source of truth for AI assistants and developers maintaining consistency.

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [Component Organization](#component-organization)
3. [Styling Standards](#styling-standards)
4. [Brand Identity](#brand-identity)
5. [Typography](#typography)
6. [MDX Customization](#mdx-customization)
7. [File Naming Conventions](#file-naming-conventions)
8. [Import Patterns](#import-patterns)
9. [Server vs Client Components](#server-vs-client-components)
10. [Adding New Features](#adding-new-features)
11. [Color Reference](#color-reference)
12. [Spacing & Layout](#spacing--layout)

---

## Project Structure

### Core Principle: Feature-Based Modules

The project follows a **module-based architecture** where each feature has its own isolated directory:

```
modules/
├── bio/pages/          # Bio page logic
├── devlog/             # Blog post components
│   ├── components/     # Feature-specific components
│   └── pages/          # Page-level components
├── home/               # Homepage components
│   ├── components/
│   └── pages/
├── layout/             # Global layout utilities
│   ├── components/     # Header, Footer, etc.
│   └── fonts.ts        # Font configuration
├── mdx/                # MDX customization
│   ├── components/     # Complex MDX components (Code, etc.)
│   ├── inline/         # HTML element overrides (h.tsx, p.tsx, etc.)
│   └── utils/          # MDX utilities
└── shared/             # Cross-module utilities
    └── utils/          # Shared utilities (blog.ts)
```

### Why This Structure?

- **Consistency**: Every feature follows the same `pages/` + `components/` pattern
- **Scalability**: New features fit naturally into the module system
- **Isolation**: Changes to one module don't affect others
- **Discoverability**: Clear where to find code for each feature

### The `app/` Directory

The `app/` directory follows Next.js 14+ App Router conventions and serves as a **thin routing layer**:

```
app/
├── page.tsx            # Route handler - imports from modules/home/pages/Home.tsx
├── layout.tsx          # Root layout with metadata
├── globals.css         # Global styles
├── bio/
│   └── page.tsx        # Route handler - imports from modules/bio/pages/Bio.tsx
└── devlog/
    └── [slug]/
        └── page.tsx    # Dynamic route - imports from modules/devlog/
```

**Pattern**: Each `app/*/page.tsx` should be a minimal wrapper (~10 lines) that:
1. Defines metadata
2. Imports the actual component from `modules/`
3. Returns that component

**Example**:
```tsx
// app/bio/page.tsx
import { Bio } from "@/modules/bio/pages/Bio";

export const metadata = {
  title: "Bio",
  description: "Learn more about Sathira",
};

export default function BioPage() {
  return <Bio />;
}
```

**✅ DO**: Keep `app/` pages minimal - route handlers only
**❌ DON'T**: Put business logic or extensive JSX in `app/` pages

---

## Component Organization

### Pages vs Components

Within each module:

- **`pages/`**: Page-level components that represent entire views
  - Example: `modules/home/pages/Home.tsx`
  - Export a component that renders the full page
  - Can import from the module's `components/` directory

- **`components/`**: Reusable, feature-specific components
  - Example: `modules/home/components/Card.tsx`, `CardGrid.tsx`
  - Used by page components or other components within the same module
  - Should be focused and single-purpose

### File Structure Template

Every module component file should follow this structure:

```tsx
// 1. Imports - external dependencies first, then internal
import type { ComponentProps } from "react";
import Link from "next/link";
import { MyUtilFunction } from "@/modules/shared/utils/helpers";

// 2. Type definitions
interface MyComponentProps {
  title: string;
  description?: string;
}

// 3. Component - use named exports
export const MyComponent = ({ title, description }: MyComponentProps) => {
  return (
    <div>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </div>
  );
};

// 4. No default exports for components (except in app/ pages)
```

---

## Styling Standards

### The Golden Rule: **Tailwind Only**

**✅ DO**: Use Tailwind utility classes for ALL styling
**❌ DON'T**: Use inline `style={{}}` props, CSS modules, or styled-components

### Exception

The **only** exception is the `ScrollGuide` component which uses animejs for complex animations requiring programmatic color transitions. Even then, initial styles should be Tailwind classes.

### Converting Styles to Tailwind

| Instead of...                        | Use...                          |
|--------------------------------------|---------------------------------|
| `style={{ display: 'flex' }}`        | `className="flex"`              |
| `style={{ padding: '1rem' }}`        | `className="p-4"`               |
| `style={{ color: '#14b8a6' }}`       | `className="text-brand-primary"` |
| `style={{ fontWeight: 600 }}`        | `className="font-semibold"`     |

### CSS Custom Properties

Global CSS variables are defined in `app/globals.css`:

```css
:root {
  --color-brand-primary: #14b8a6;
  --color-brand-secondary: #f97316;
  --color-brand-tertiary: #eab308;
  
  --color-scrollbar-track: #f1f1f1;
  --color-scrollbar-thumb: #e0e0e0;
  --color-scrollbar-thumb-hover: #d3d3d3;
}
```

These are **synced with Tailwind theme** but available for use in edge cases where Tailwind can't reach (like `::-webkit-scrollbar`).

---

## Brand Identity

### The Signature Gradient: Teal → Orange → Yellow

This is the **core brand identity** of the site. It appears in:

- Name/title text (Sathira heading)
- Link hover effects
- Loading placeholders
- Profile image backgrounds

### Brand Color System

Defined in `tailwind.config.ts`:

```typescript
colors: {
  brand: {
    primary: {
      DEFAULT: "#14b8a6",  // teal-500
      light: "#ccfbf1",     // teal-100
      hover: "#0d9488",     // teal-600
      dark: "#0f766e",      // teal-700
    },
    secondary: {
      DEFAULT: "#f97316",  // orange-500
      light: "#ffedd5",     // orange-100
      hover: "#ea580c",     // orange-600
      dark: "#c2410c",      // orange-700
    },
    tertiary: {
      DEFAULT: "#eab308",  // yellow-500
      light: "#fef9c3",     // yellow-100
      hover: "#ca8a04",     // yellow-600
      dark: "#a16207",      // yellow-700
    },
  },
}
```

### Usage Patterns

#### Main Brand Gradient (Full Intensity)
```tsx
className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-tertiary text-transparent bg-clip-text"
```
**Where**: Headings, name text

#### Light Brand Gradient (Subtle)
```tsx
className="bg-gradient-to-r from-brand-primary-light via-brand-secondary-light to-brand-tertiary-light"
```
**Where**: Backgrounds, loading states, image containers

#### Interactive States (Links)
```tsx
className="text-brand-primary hover:text-brand-secondary visited:text-brand-tertiary"
```
**Where**: MDX links, external links

#### Hover-Friendly Links (Bio/Footer)
```tsx
className="text-brand-primary-hover hover:text-brand-primary-dark"
```
**Where**: Social media links, footer links

### The Abstract Component Exception

**IMPORTANT**: The `Abstract` component intentionally uses a **different gradient**:

```tsx
// modules/mdx/inline/abstract.tsx
className="bg-gradient-to-r from-emerald-500 via-amber-500 to-orange-500"
```

This is **by design** to make the Abstract section visually distinct from regular brand elements. Do NOT change it to match the brand gradient.

**Reason**: Provides visual hierarchy and signals that an Abstract is special content, not part of the main narrative flow.

---

## Typography

### Font System

Fonts are configured in `modules/layout/fonts.ts`:

```typescript
import { Red_Hat_Mono, Red_Hat_Text } from "next/font/google";

export const redHatText = Red_Hat_Text({
  subsets: ["latin"],
});

export const redHatMono = Red_Hat_Mono({
  subsets: ["latin"],
});
```

### Font Usage

| Element | Font | How to Apply |
|---------|------|--------------|
| **Body text** | Monospace (default) | Automatically applied via `body { font-family: monospace; }` in globals.css |
| **Blog content** | Red Hat Text | `className={redHatText.className}` on blog post container |
| **Code blocks** | Red Hat Mono | Applied via MDX Code component |

### Typography Hierarchy

```tsx
// Page titles
<h1 className="text-2xl sm:text-3xl font-medium">

// Section headings
<h2 className="text-lg font-medium">

// Body text
<p className="text-base leading-relaxed">

// Small text (dates, metadata)
<time className="text-sm text-zinc-500">
```

### Responsive Typography

Use responsive breakpoints:
- `text-base sm:text-lg` - Scales up on small+ screens
- `text-2xl sm:text-3xl` - Larger scaling for headers

---

## MDX Customization

### How MDX Customization Works

MDX allows overriding default HTML element rendering. This project overrides many elements in `modules/mdx/inline/`:

```
modules/mdx/inline/
├── a.tsx           # Links
├── h.tsx           # Headings (h1-h6)
├── p.tsx           # Paragraphs
├── code.tsx        # Inline code
├── table.tsx       # Tables
├── abstract.tsx    # Custom Abstract component
└── ...
```

These are registered in `mdx-components.tsx` at the project root:

```tsx
import { A } from "@/modules/mdx/inline/a";
import { H1, H2, H3, H4, H5, H6 } from "@/modules/mdx/inline/h";
// ... more imports

export function useMDXComponents() {
  return {
    a: A,
    h1: H1,
    h2: H2,
    // ... etc
  };
}
```

### Creating a New MDX Component

1. **Create the component**:
   ```tsx
   // modules/mdx/inline/myElement.tsx
   import type { HTMLAttributes } from "react";
   
   export const MyElement = (props: HTMLAttributes<HTMLElement>) => (
     <div className="my-custom-styles" {...props} />
   );
   ```

2. **Register in `mdx-components.tsx`**:
   ```tsx
   import { MyElement } from "@/modules/mdx/inline/myElement";
   
   export function useMDXComponents() {
     return {
       // ... existing mappings
       myElement: MyElement,
     };
   }
   ```

3. **Use Tailwind only** - no inline styles in MDX components

### MDX Component Patterns

**Extend native HTML props**:
```tsx
export const A = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a className="text-brand-primary" {...props} />
);
```

**Handle external links**:
```tsx
export const A = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a
    target={props.href?.startsWith("http") ? "_blank" : undefined}
    rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
    {...props}
  />
);
```

---

## File Naming Conventions

### Components & Pages
- **Format**: PascalCase
- **Examples**: `Home.tsx`, `CardGrid.tsx`, `ScrollGuide.tsx`, `Bio.tsx`

### Utilities & Configuration
- **Format**: camelCase
- **Examples**: `fonts.ts`, `blog.ts`, `helpers.ts`

### Routes (in `app/` directory)
- **Format**: kebab-case for folder names, PascalCase for files
- **Examples**: `app/devlog/page.tsx`, `app/devlog/[slug]/page.tsx`

### MDX Components
- **Format**: lowercase (matches HTML element names)
- **Examples**: `a.tsx`, `p.tsx`, `h.tsx`, `table.tsx`
- **Exception**: Custom components use PascalCase (`Abstract.tsx`)

---

## Import Patterns

### Path Aliases

The project uses TypeScript path aliasing (`@/`) configured in `tsconfig.json`:

```typescript
// ✅ DO: Use path alias
import { Home } from "@/modules/home/pages/Home";
import { CardGrid } from "@/modules/home/components/CardGrid";
import { getAllBlogPosts } from "@/modules/shared/utils/blog";

// ❌ DON'T: Use relative paths for cross-module imports
import { Home } from "../../modules/home/pages/Home";
```

### Import Order

```tsx
// 1. External dependencies (React, Next.js, libraries)
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// 2. Type imports
import type { Metadata } from "next";

// 3. Internal modules (using @ alias)
import { Home } from "@/modules/home/pages/Home";
import { getAllBlogPosts } from "@/modules/shared/utils/blog";

// 4. Relative imports (within same module)
import { Card } from "./Card";
import { formatDate } from "../utils/date";

// 5. Styles (if any, though rare with Tailwind)
import "@/app/globals.css";
```

### Where to Import From

| What | Import From |
|------|-------------|
| Blog utilities | `@/modules/shared/utils/blog` |
| Font configuration | `@/modules/layout/fonts` |
| MDX inline components | `@/modules/mdx/inline/*` |
| Page components | `@/modules/*/pages/*` |
| Feature components | `@/modules/*/components/*` |

---

## Server vs Client Components

### Default: Server Components

By default, **all components are Server Components** in Next.js App Router. This is preferred for:
- Static content
- Data fetching
- SEO-optimized pages

### When to Use `"use client"`

Add `"use client"` directive **only when needed**:

1. **React hooks** (`useState`, `useEffect`, `useRef`, etc.)
   ```tsx
   "use client";
   import { useState } from "react";
   ```

2. **Browser APIs** (`window`, `document`, event listeners)
   ```tsx
   "use client";
   useEffect(() => {
     window.addEventListener("scroll", handleScroll);
   }, []);
   ```

3. **Animation libraries** (animejs, framer-motion)
   ```tsx
   "use client";
   import { animate } from "animejs";
   ```

### Client Components in This Project

- `modules/devlog/components/ScrollGuide.tsx` - Uses hooks and animejs
- `modules/home/components/Card.tsx` - Uses `useState` for image loading
- `modules/mdx/components/Code.tsx` - Uses `useState` for copy-to-clipboard

### Server Components (No Directive Needed)

- All page components in `modules/*/pages/`
- `modules/home/components/CardGrid.tsx` - Fetches blog posts
- `modules/layout/components/Header.tsx`, `Footer.tsx` - Static content

---

## Adding New Features

### Step-by-Step: Create a New Module

Let's say you want to add a **Projects** page:

#### 1. Create Module Structure

```bash
mkdir -p modules/projects/pages
mkdir -p modules/projects/components
```

#### 2. Create Page Component

```tsx
// modules/projects/pages/Projects.tsx
export const Projects = () => {
  return (
    <main className="flex flex-col items-center px-4 sm:px-0">
      <div className="w-full lg:w-3/4 mt-8 sm:mt-16">
        <h1 className="text-2xl sm:text-3xl font-medium">
          Projects
        </h1>
        <div className="space-y-8 my-12">
          {/* Project content */}
        </div>
      </div>
    </main>
  );
};
```

#### 3. Create App Route

```tsx
// app/projects/page.tsx
import { Projects } from "@/modules/projects/pages/Projects";

export const metadata = {
  title: "Projects",
  description: "My projects and work",
};

export default function ProjectsPage() {
  return <Projects />;
}
```

#### 4. Create Supporting Components

```tsx
// modules/projects/components/ProjectCard.tsx
interface ProjectCardProps {
  title: string;
  description: string;
  link: string;
}

export const ProjectCard = ({ title, description, link }: ProjectCardProps) => {
  return (
    <article className="border border-zinc-200 rounded-lg p-6">
      <h2 className="text-lg font-medium">{title}</h2>
      <p className="text-zinc-600 mt-2">{description}</p>
      <a
        href={link}
        className="text-brand-primary hover:text-brand-secondary mt-4 inline-block"
      >
        View Project →
      </a>
    </article>
  );
};
```

#### 5. Import in Page

```tsx
// modules/projects/pages/Projects.tsx
import { ProjectCard } from "@/modules/projects/components/ProjectCard";

export const Projects = () => {
  return (
    <main>
      {/* ... */}
      <ProjectCard
        title="My Cool Project"
        description="Description here"
        link="/projects/cool-project"
      />
    </main>
  );
};
```

---

## Color Reference

### Complete Brand Palette

```typescript
// Tailwind classes available via brand tokens

// PRIMARY (Teal)
bg-brand-primary          // #14b8a6
bg-brand-primary-light    // #ccfbf1
bg-brand-primary-hover    // #0d9488
bg-brand-primary-dark     // #0f766e

text-brand-primary
text-brand-primary-light
text-brand-primary-hover
text-brand-primary-dark

// SECONDARY (Orange)
bg-brand-secondary        // #f97316
bg-brand-secondary-light  // #ffedd5
bg-brand-secondary-hover  // #ea580c
bg-brand-secondary-dark   // #c2410c

// TERTIARY (Yellow)
bg-brand-tertiary         // #eab308
bg-brand-tertiary-light   // #fef9c3
bg-brand-tertiary-hover   // #ca8a04
bg-brand-tertiary-dark    // #a16207
```

### Semantic Color Usage

| Use Case | Color | Example Class |
|----------|-------|---------------|
| Primary text | Zinc 800-900 | `text-zinc-800` |
| Secondary text | Zinc 600 | `text-zinc-600` |
| Muted text | Zinc 500 | `text-zinc-500` |
| Borders | Zinc 200-300 | `border-zinc-200` |
| Backgrounds | White/Zinc 50 | `bg-white`, `bg-zinc-50` |
| Interactive elements | Brand colors | `text-brand-primary` |
| Hover states | Brand hover colors | `hover:text-brand-primary-hover` |

### Gradients

```tsx
// Main brand gradient (text)
className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-tertiary text-transparent bg-clip-text"

// Light brand gradient (backgrounds)
className="bg-gradient-to-r from-brand-primary-light via-brand-secondary-light to-brand-tertiary-light"

// Background with radial gradient
className="bg-gradient-to-br from-brand-primary-light via-brand-secondary-light to-brand-tertiary-light"

// Abstract gradient (special case - DO NOT use brand colors here)
className="bg-gradient-to-r from-emerald-500 via-amber-500 to-orange-500"
```

---

## Spacing & Layout

### Container Pattern

All pages follow this container structure:

```tsx
<main className="flex flex-col items-center px-4 sm:px-0">
  <div className="w-full lg:w-3/4 mt-8 sm:mt-16">
    {/* Page content */}
  </div>
</main>
```

**Why**:
- Horizontal padding on mobile (`px-4`)
- No padding on larger screens (content handled by width restriction)
- Max width of 75% on large screens (`lg:w-3/4`)
- Centers content (`items-center`)
- Responsive top margin

### Standard Spacing

| Element | Spacing | Tailwind Class |
|---------|---------|----------------|
| Section margin (mobile) | 2rem | `my-8` |
| Section margin (desktop) | 3rem | `sm:my-12` |
| Element gap (small) | 0.5-0.75rem | `gap-2 sm:gap-3` |
| Element gap (medium) | 1rem | `gap-4` |
| Element gap (large) | 2rem | `gap-8` |
| Heading margin bottom | 2-3rem | `mb-8 sm:mb-12` |
| Paragraph margin bottom | 1rem | `mb-4` |

### Responsive Breakpoints

Follow Tailwind's default breakpoints:

```css
sm: 640px   /* Tablet */
md: 768px   /* Small laptop */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
```

**Common pattern**:
```tsx
className="text-base sm:text-lg md:text-xl"  // Scale text
className="px-4 sm:px-6 lg:px-8"              // Scale padding
className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"  // Responsive grid
```

---

## Final Notes

### Maintaining Consistency

When making changes:

1. **Check this guide first** - Does a pattern already exist?
2. **Follow existing patterns** - When in doubt, mirror similar code
3. **Update this guide** - If you establish a new pattern, document it here
4. **Test responsively** - Always check mobile, tablet, and desktop views
5. **Validate brand colors** - Ensure you're using `brand-*` tokens, not hardcoded colors

### For AI Assistants

When asked to make changes:
- Reference this guide for architectural decisions
- Follow the module pattern religiously
- Use brand tokens instead of literal color values
- Keep `app/` pages minimal (route handlers only)
- Default to Server Components unless client features are needed
- Maintain Tailwind-only styling (no inline styles)

### Questions?

If this guide doesn't cover your use case:
1. Look at similar existing code
2. Choose the most consistent approach
3. Document your decision by updating this guide

---

**Last Updated**: March 2026
**Next.js Version**: 16.1.6
**React Version**: 19.2.4
