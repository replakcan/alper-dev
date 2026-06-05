# Copilot Instructions

## Project Goal

This repository contains Alper's personal website MVP. The goal is to present a clear professional identity, selected work, and simple contact paths for recruiters, hiring managers, engineering peers, and other visitors.

Keep suggestions aligned with `docs/mvp.md`, `docs/architecture.md`, and `docs/pr-review-guidelines.md`.

## Tech Stack

- Next.js App Router with static export enabled.
- React and TypeScript for application code.
- Tailwind CSS for styling.
- AWS S3 for static file storage.
- AWS CloudFront as the public CDN and HTTPS entry point.
- Terraform for infrastructure.
- GitHub Actions for CI and S3 deployment.
- GitHub OIDC for AWS authentication.

## Static Export Constraints

The site must remain compatible with `output: 'export'` and S3 static hosting.

Do not suggest or add:

- API routes.
- Server Actions.
- Runtime server-side rendering.
- Request-time cookies, headers, redirects, rewrites, or request-dependent route handlers.
- Dynamic routes unless they are generated at build time with `generateStaticParams()`.
- `next/image` behavior that depends on the default Next.js image optimization server.

If image handling is needed, prefer static assets, a custom image loader, or unoptimized images.

## AWS And Deployment Constraints

CloudFront is the public entry point. The S3 bucket should remain private with public access blocked.

Keep these constraints:

- Use CloudFront Origin Access Control for S3 access.
- Do not expose the S3 bucket publicly.
- Do not hardcode AWS credentials, tokens, role ARNs, bucket names, account IDs, or secret values in source files.
- Use GitHub OIDC instead of long-lived AWS access keys.
- Keep IAM permissions least-privilege.
- Keep deployment focused on `aws s3 sync out s3://bucket --delete`.
- Do not add CloudFront invalidation, custom domains, Route 53, ACM certificates, preview environments, or multi-environment deployment unless a task explicitly asks for them.

## Code Style

- Follow the existing TypeScript, React, and Tailwind patterns.
- Keep changes small and scoped to the task.
- Use Prettier formatting and existing ESLint rules.
- Prefer clear, boring code over unnecessary abstractions.
- Keep documentation short, direct, and useful for both humans and AI reviewers.
- Do not commit generated output, Terraform state, local `.tfvars`, dependency folders, or secrets.

## Review Focus

When reviewing or suggesting changes, prioritize:

- Static export compatibility.
- Build, lint, formatting, and type-check safety.
- S3 private access and CloudFront-only public serving.
- GitHub Actions deployment behavior.
- Secret handling and Terraform state safety.
- Alignment with MVP scope.

Flag any suggestion that introduces backend/database requirements, authentication, CMS behavior, public S3 hosting, server-only Next.js features, or broad AWS permissions unless the task explicitly changes the project scope.
