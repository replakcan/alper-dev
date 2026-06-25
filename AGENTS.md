<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Styling

- Use plain CSS and colocated CSS Modules (`*.module.css`) for component and layout styles.
- Keep `app/globals.css` limited to global resets, shared design tokens, and document-level styles.
- Do not add Tailwind CSS utilities or Tailwind-dependent styling packages.
