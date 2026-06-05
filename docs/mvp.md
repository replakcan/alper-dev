# MVP Document

## Project Goal

Build a personal website for Alper that presents a clear professional identity, highlights selected work, and provides simple ways for visitors to learn more or get in touch.

## Target Users

- Recruiters, hiring managers, and technical interviewers reviewing Alper's profile.
- Engineering peers or collaborators looking for project context.
- Visitors who want a quick overview of skills, work, and contact links.

## MVP Scope

The MVP is a static website with a small, focused set of pages and content areas:

- Home page with a short introduction and primary navigation.
- About section or page covering background, interests, and current focus.
- Projects section or page listing selected work with concise descriptions and relevant links.
- Contact section or page with external profile links and a contact path.
- Shared layout, styling, and reusable UI structure for future content.

## Out of Scope

- Blog, CMS, admin panel, or dynamic content editing.
- Authentication, user accounts, comments, or form submissions that require a backend.
- API routes, Server Actions, runtime server-side rendering, or request-time personalization.
- Full design system documentation or long-term roadmap.
- S3 bucket creation, CloudFront setup, or automated deployment pipeline.

## Tech Stack

- Next.js App Router with static export enabled.
- React and TypeScript for application code.
- Tailwind CSS for styling.
- ESLint, Prettier, TypeScript checks, and GitHub Actions for quality checks.
- Static assets served from the exported build output.

## Deployment Approach

The app is built with `output: 'export'`, which generates static files in the `out/` directory when `npm run build` runs. The contents of `out/` are intended to be uploaded to an AWS S3 bucket configured for static hosting, with CloudFront in front of S3 for CDN delivery, HTTPS, caching, and custom domain support.

The site must remain compatible with static hosting. It should not depend on API routes, Server Actions, runtime server-side rendering, or other request-time server features. If `next/image` is introduced, image handling must remain static-export compatible by using static assets, a custom loader, or unoptimized images.

## MVP Acceptance Criteria

- The project builds successfully with `npm run build`.
- The build generates a static `out/` directory.
- The home page communicates who the site is for and what Alper does.
- MVP pages or sections for About, Projects, and Contact are present.
- Navigation works without server-side routing dependencies.
- The app remains compatible with S3 static hosting behind CloudFront.
- Quality checks pass with linting, formatting, type checking, and build verification.
