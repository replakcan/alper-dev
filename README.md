This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Static Export for S3

This app is configured for static export so it can be hosted from AWS S3 behind CloudFront.

Run the production build to generate static files:

```bash
npm run build
```

Next.js writes the exported site to the `out/` directory. Upload the contents of `out/` to the S3 bucket used for static hosting.

Static export constraints:

- Do not add API routes or runtime server-side rendering.
- Do not use Server Actions.
- Do not use request-time server features such as cookies, headers, redirects, rewrites, or request-dependent route handlers.
- Dynamic routes must be generated at build time with `generateStaticParams()`.
- `next/image` cannot use the default Next.js image optimization server in static export. Use static image assets, a custom image loader, or `images: { unoptimized: true }` if `next/image` is added later.
