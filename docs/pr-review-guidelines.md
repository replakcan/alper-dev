# Pull Request Review Guidelines

## Review Priorities

Reviewers should prioritize correctness, security, deployment safety, and static hosting compatibility.

Check changes in this order:

- The app still builds and exports as a static site.
- The change does not introduce runtime server dependencies.
- AWS infrastructure remains private-by-default and least-privilege.
- Deployment workflows do not expose credentials or unsafe permissions.
- Documentation stays aligned with the MVP and architecture documents.
- UI and content changes remain appropriate for a focused personal website MVP.

## Static Export Rules

The site must stay compatible with Next.js static export and S3 hosting.

Flag PRs that add or rely on:

- API routes.
- Server Actions.
- Runtime server-side rendering.
- Request-time cookies, headers, redirects, rewrites, or request-dependent route handlers.
- Dynamic routes without build-time generation through `generateStaticParams()`.
- `next/image` usage that depends on the default Next.js image optimization server.

If images are added with `next/image`, confirm they use static-export-compatible behavior such as static assets, a custom loader, or unoptimized images.

## AWS And Deployment Rules

CloudFront should remain the public entry point. The S3 bucket should remain private with public access blocked.

Review AWS and deployment changes for:

- S3 bucket public access settings.
- CloudFront origin configuration and Origin Access Control usage.
- Default root object remaining `index.html`.
- Basic `403` and `404` behavior for static hosting.
- Deployment workflow running only on pushes to `main`.
- Static build running before S3 sync.
- S3 sync using `--delete` so removed files are deleted from the bucket.
- GitHub Actions using OIDC instead of long-lived AWS access keys.
- IAM permissions staying limited to what deployment needs.

CloudFront invalidation, custom domains, Route 53, ACM certificates, preview environments, and multi-environment deployment are out of scope unless a task explicitly adds them.

## Security Concerns

Flag any PR that:

- Hardcodes AWS credentials, tokens, secrets, account-specific private values, or local environment values.
- Commits Terraform state files, `.terraform/`, `.tfvars`, build output, or dependency folders.
- Broadens IAM permissions beyond the deployment need without a clear reason.
- Allows public S3 access for website objects.
- Weakens GitHub OIDC trust conditions.
- Documents secret values instead of secret names or Terraform output commands.

Secret names may be documented. Secret values should not be committed.

## What Should Be Flagged

Reviewers should leave comments for:

- Broken acceptance criteria.
- Behavior that conflicts with `docs/mvp.md` or `docs/architecture.md`.
- Missing tests or checks for risky changes.
- Build, lint, type-check, or formatting failures.
- Infrastructure changes that are not reflected in documentation.
- Deployment changes that could fail silently or leave stale files in S3.
- Any new backend, database, authentication, CMS, or dynamic runtime dependency.

Prefer concrete comments that reference the file, line, risk, and expected fix.

## AI-Assisted Review Expectations

AI-assisted review should act as a careful first-pass reviewer, not as final approval.

AI reviewers should:

- Check the PR against this document, the MVP document, and the architecture document.
- Focus on static export compatibility, deployment safety, AWS permissions, and secret handling.
- Call out assumptions when the impact cannot be proven from the diff.
- Avoid suggesting out-of-scope architecture expansion.
- Avoid approving changes that require manual verification without clearly saying what must be verified.
- Prefer small, actionable findings over broad style feedback.

Human reviewers are still responsible for final judgment, especially for infrastructure, security, and production deployment changes.
