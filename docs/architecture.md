# Architecture

## Overview

This project is an MVP personal website built as a static site. The application is authored with Next.js, React, TypeScript, and Tailwind CSS, then exported to static files and served from AWS.

The architecture intentionally avoids a runtime backend, database, authentication system, CMS, or server-rendered request handling. The MVP content is small, mostly public, and can be generated at build time.

## Runtime Architecture

At runtime, visitors access the site through CloudFront. CloudFront serves cached static assets and fetches missing files from a private S3 bucket through Origin Access Control (OAC).

```text
Visitor
  |
  v
CloudFront distribution
  |
  v
Private S3 bucket
  |
  v
Static HTML, CSS, JavaScript, fonts, and public assets
```

AWS services used:

- Amazon S3 stores the exported static site files.
- Amazon CloudFront is the public entry point, CDN, HTTPS endpoint, and cache layer.
- AWS IAM provides the GitHub Actions deployment role and OIDC trust.

The S3 bucket is private and blocks public access. CloudFront is the only intended public serving layer.

## Build Architecture

The Next.js app is configured for static export with `output: 'export'`. Running `npm run build` generates the static website in the `out/` directory.

```text
Next.js source
  |
  v
npm run build
  |
  v
out/
  |
  v
Static deploy artifact
```

The build output contains route HTML, JavaScript bundles, CSS, fonts, and public assets. These files are enough to serve the MVP without a Node.js server.

## CI/CD Architecture

The CI workflow runs on pull requests and pushes to `main`. It verifies formatting, linting, type checking, and the static build.

The deployment workflow runs only on pushes to `main`. It builds the static site, assumes an AWS IAM role through GitHub OIDC, and syncs the generated `out/` directory to S3.

```text
Push to main
  |
  v
GitHub Actions deploy workflow
  |
  v
npm ci
  |
  v
npm run build
  |
  v
Assume AWS role with GitHub OIDC
  |
  v
aws s3 sync out s3://bucket --delete
  |
  v
CloudFront serves updated static files
```

The sync step uses `--delete`, so files removed from the build output are also removed from S3. AWS access keys are not hardcoded; deployment uses the IAM role ARN, region, and bucket name provided through GitHub secrets.

CloudFront invalidation is not part of the MVP deployment flow. Cached content may remain visible until CloudFront cache entries expire.

## Static Export Constraints

The app must stay compatible with static hosting:

- Do not add API routes.
- Do not use Server Actions.
- Do not use runtime server-side rendering.
- Do not rely on request-time cookies, headers, redirects, rewrites, or request-dependent route handlers.
- Generate dynamic routes at build time with `generateStaticParams()` if dynamic routes are added.
- Keep image handling compatible with static export. If `next/image` is added, use static assets, a custom loader, or unoptimized images.

These constraints keep the site deployable as files in S3 and serveable through CloudFront without a running application server.

## Why No Backend or Database

The MVP goal is to present Alper's professional identity, selected work, and contact paths. This content can be stored in the repository, built into static pages, and deployed as static assets.

A backend or database would add operational complexity without supporting an MVP requirement. Features that usually require server-side infrastructure, such as authentication, comments, admin editing, dynamic forms, or a CMS, are out of scope.
