# Dan Carlo Magpantay — Mobile Software Engineer Portfolio

A responsive personal portfolio for Dan Carlo Magpantay, focused on Android development, commercial POS systems, integrations, and maintainable software. The content is grounded in Dan Carlo's resume and an existing portfolio project.

## Technology

- React and TypeScript with strict type checking
- Vite for local development and production builds
- Tailwind CSS and custom theme styles
- Motion for React for restrained, reduced-motion-aware transitions
- Lucide React icons
- ESLint and Prettier

This is a static, single-page site. Section navigation uses native anchor links, so it does not need a router or server API.

## Features

- Light and dark themes, with the choice saved in the browser
- Responsive navigation and layouts for phone, tablet, and desktop screens
- About, skills, professional experience, featured project, education, certifications, and contact sections
- Optimized local portrait and downloadable resume
- Android-inspired orbital details, project scan feedback, and restrained card and navigation motion
- Copy-email action and direct GitHub, LinkedIn, and email links
- Semantic headings, keyboard focus styles, image descriptions, and reduced-motion support
- Page title, description, Open Graph metadata, favicon, and `robots.txt`

The featured project is **Coffeetect**. The commercial POS work is described in the experience section because public screenshots and repository links were not provided. The site has no contact form; its email action opens the visitor's mail app.

## Project structure

```text
public/                  Resume, portrait, favicon, robots.txt
src/
  app/                   Page composition
  components/layout/     Header and footer
  components/ui/         Shared presentation components
  data/                  Editable portfolio content
  hooks/                 Theme state and persistence
  sections/              One component per page section
  styles/                Theme tokens and responsive styles
  types/                 Portfolio content contracts
```

Portfolio facts live in `src/data`. Sections render that data and own their presentation. Shared UI elements and the theme hook stay separate from the section content. This keeps content updates small without adding routing or state-management dependencies to a single page.

## Run locally

Use Node.js 22.12 or newer. The `.nvmrc` file selects Node 22 when using [nvm](https://github.com/nvm-sh/nvm).

```bash
nvm install
nvm use
npm ci
npm run dev
```

Open the local URL printed by Vite. If nvm is unavailable, install a compatible Node.js version first, then run `npm ci` and `npm run dev`.

## Commands

| Command                | Purpose                                               |
| ---------------------- | ----------------------------------------------------- |
| `npm run dev`          | Start the development server                          |
| `npm run typecheck`    | Check TypeScript                                      |
| `npm run lint`         | Run ESLint                                            |
| `npm run format:check` | Check Prettier formatting                             |
| `npm run format`       | Format source files                                   |
| `npm run build`        | Type-check and create the production build in `dist/` |
| `npm run preview`      | Preview the production build locally                  |

Before sharing a change, run:

```bash
npm run typecheck
npm run lint
npm run format:check
npm run build
```

## Update portfolio content

| Content                                         | File                     |
| ----------------------------------------------- | ------------------------ |
| Name, title, introduction, email, social links  | `src/data/profile.ts`    |
| Skill categories and technology names           | `src/data/skills.ts`     |
| Jobs, dates, locations, logos, and technologies | `src/data/experience.ts` |
| Featured projects, features, images, and links  | `src/data/projects.ts`   |
| Degree and certifications                       | `src/data/education.ts`  |
| Downloadable resume                             | `public/resume.pdf`      |
| Portrait                                        | `public/profile.webp`    |
| Page title and social sharing metadata          | `index.html`             |

The portrait is derived from Dan Carlo's older portfolio photo and optimized as WebP. The Coffeetect logo is stored locally in `public/coffeetect.jpeg`. The JIMAC and Open iT logos were supplied by Dan Carlo and are stored in `public/`. The project card shows a labeled fallback if its image is unavailable.

Keep public claims aligned with the resume or another source Dan Carlo has approved. Avoid adding confidential POS screenshots, client details, or unsupported metrics.

## Deployment preparation

The site builds to `dist/` and can be hosted as static files. For Vercel, import the repository as a Vite project, use `npm run build` as the build command, and use `dist` as the output directory. Set the project Node.js version to one that satisfies `package.json` (`22.12.0` or newer). Vercel documents its [Vite deployment workflow](https://vercel.com/docs/frameworks/frontend/vite).

Before a public launch:

1. Review all portfolio copy, links, and the PDF for current accuracy.
2. Check the page in desktop and mobile browsers, including theme switching, navigation, project links, resume download, and copy-email behavior.
3. After choosing the production domain, set an absolute Open Graph image URL and add a sitemap with that domain. A sitemap is not included yet because no public domain has been chosen.
