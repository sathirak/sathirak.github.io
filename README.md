# Grotto

Now then, this is my personal blog where I write about life, engineering, and whatever technical rabbit holes I fall into. Built with Next.js 16 because I'm all about that static site life (with dynamic flair when needed, of course).

## What's This?

A statically exported blog running on Next.js with MDX for content. I wanted something fast, minimal, and easy to write in—so MDX it is! No databases, no complex backend, just markdown files that compile to beautiful blog posts.

The design? Clean, gradient-heavy (teal → orange → yellow is my brand, don't @ me), and fully responsive. I'm a fan of that signature three-color gradient—it shows up everywhere from my name to loading states.

## Tech Stack

- **Next.js 16** - App Router, Server Components, static export
- **React 19** - Because staying current is fun
- **TypeScript** - Type safety keeps me sane
- **Tailwind CSS** - Utility-first styling (no inline styles here!)
- **MDX** - Markdown + React components = chef's kiss
- **Shiki** - Syntax highlighting that doesn't look like 2010
- **KaTeX** - For when I need to show off math equations
- **pnpm** - The package manager I swear by

## Project Structure

I'm using a module-based architecture that keeps things organized:

```
modules/
├── bio/        # About me page
├── devlog/     # Blog post components
├── home/       # Homepage stuff
├── layout/     # Global layout components
├── mdx/        # MDX customization (this is where the magic happens)
└── shared/     # Utilities like blog post parsing
```

The `app/` directory is just routing—actual logic lives in `modules/`. Check out [STYLEGUIDE.md](./STYLEGUIDE.md) for the full architectural breakdown (yes, there's a comprehensive style guide—I like consistency).

## Getting Started

```bash
# Install dependencies
pnpm install

# Run dev server (on port 4000 because 3000 is too mainstream)
pnpm dev

# Build for production
pnpm build
```

Then open [http://localhost:4000](http://localhost:4000) and you'll see the site!

## Writing Blog Posts

Blog posts live in `public/content/{slug}/main.mdx`. Each post folder contains:

- `main.mdx` - The post content with frontmatter metadata
- Any images/assets referenced in the post

The blog post parser automatically discovers and sorts posts by date. Just drop a new folder in `public/content/` and you're good to go!

## Design System

I spent way too much time perfecting the gradient system, so let me tell you about it:

- **Brand colors**: Teal (#14b8a6) → Orange (#f97316) → Yellow (#eab308)
- **Usage**: Headings, name, interactive states, loading placeholders
- **Exception**: The Abstract component uses emerald → amber → orange (intentionally different!)

All colors are defined as Tailwind tokens (`brand-primary`, `brand-secondary`, `brand-tertiary`) so they're consistent everywhere. No hardcoded hex values floating around—I learned that lesson the hard way.

See the full color system and usage patterns in [STYLEGUIDE.md](./STYLEGUIDE.md).

## Why Static Export?

I'm hosting this on GitHub Pages / Netlify / wherever-takes-my-fancy, and I don't need a server running 24/7 for a blog. Static export gives me:

- Fast load times (it's all pre-rendered HTML)
- Easy deployment (just upload the `out/` folder)
- No server costs (free hosting FTW)
- Great SEO (search engines love static HTML)

The tradeoff? No Server Actions or API routes, but I don't need those for a blog anyway.

## Contributing

Found a typo? Spot a bug? Feel free to open an issue or PR! I'm friendly, I promise :)

Just remember to check [STYLEGUIDE.md](./STYLEGUIDE.md) first if you're making code changes—it has all the patterns and conventions documented.

## Links

- **Live site**: [Your blog URL here]
- **My GitHub**: [github.com/sathirak](https://github.com/sathirak)
- **My LinkedIn**: [linkedin.com/in/sathirak](https://linkedin.com/in/sathirak)

---

Built with ☕ and probably too much time spent on gradient animations. Enjoy!

