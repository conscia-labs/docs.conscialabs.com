# Conscia Labs Documentation

This repository contains the public, static documentation site for Conscia Labs. It is built with Astro and Starlight. The root is the documentation home, and each product has its own URL path; AI Gateway starts at `/gateway/`.

## Requirements

- Node.js 24
- pnpm 12.3.4 or newer within the 12.x major line

## Local development

```sh
pnpm install
pnpm dev
```

Astro prints the local URL, normally `http://localhost:4321`. Run `pnpm check` for TypeScript and content checks, `pnpm build` to generate the static site in `dist/`, `pnpm check:links` to validate links in that build, and `pnpm preview` to serve the production build locally.

## Deployment

Pull requests run the content and type checks, build the complete site, and validate generated internal links. Pushes to `main` build and deploy `dist/` to GitHub Pages through the `github-pages` environment. Pull requests do not deploy.

After enabling the repository, configure GitHub Pages and DNS:

1. Set GitHub Pages source to **GitHub Actions**.
2. Create a DNS CNAME record for `docs.conscialabs.com` pointing to the GitHub Pages hostname shown in repository settings.
3. Verify the custom domain in GitHub Pages settings.
4. Enforce HTTPS in GitHub Pages settings once the certificate is ready.

The build includes `public/CNAME`, which GitHub Pages uses for the custom domain. The site is configured with `https://docs.conscialabs.com` as its canonical origin and has no repository-name base path.

## Content ownership and API contracts

Product repositories are the source of truth for product behavior and API contracts. This repository presents task-oriented public documentation; it should not become a second, independently maintained source of product behavior.

The AI Gateway API reference is not generated here yet. Add it by consuming a versioned artifact from the Gateway product repository or exporting its authoritative OpenAPI contract through a reproducible build step. Record the artifact source, version, and generation command in this repository, then run the integration in CI. Do not add an untracked or silently maintained copy of the OpenAPI contract.

## Visual identity source

We inspected the copied Conscia symbol, favicon assets, and adapted design tokens in the public [`conscia-labs` source repository](https://github.com/conscia-labs/conscia-labs) at commit `dc35efcc6cd376a787a03ea50a742bdaeabe64db` (2026-08-27). Reused assets include `conscia_symbol_black.svg`, `conscia_symbol_white.svg`, `public/favicon.svg`, and `public/favicon.ico`. The documentation theme adapts the Source Sans 3 family, ink and paper surfaces, violet, mint and cyan accents, border colors, focus behavior, and reduced-motion behavior. This site does not use the source website’s preview gate or `noindex` behavior.

We cross-checked Gateway product facts in the refreshed pages against the public [`conscia-ai-gateway` source repository](https://github.com/conscia-labs/conscia-ai-gateway) at commit `900f7f29a0c2f4cee8208fc3aa4dc538dc62fb76` (the Gateway development baseline when this refresh began). That repository, its generated contract, product capability matrix, and qualification evidence remain authoritative for behavior, supported features, and API schemas. This docs repository does not silently copy the contract.
