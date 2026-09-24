# Conscia Labs Documentation

Public, static product documentation for Conscia Labs, built with Astro and Starlight. The root is the documentation home; product URLs are scoped beneath their product path, beginning with AI Gateway at `/gateway/`.

## Requirements

- Node.js 24
- pnpm 12.3.4 or newer within the 12.x major line

## Local development

```sh
pnpm install
pnpm dev
```

Astro prints the local URL (normally `http://localhost:4321`). Use `pnpm check` to check TypeScript and content, `pnpm build` to generate the static site in `dist/`, `pnpm check:links` to check links in the generated site, and `pnpm preview` to serve the production build locally.

## Deployment

Pull requests run the content/type check, build the complete site, and validate generated internal links. Pushes to `main` build and deploy `dist/` to GitHub Pages using the `github-pages` environment. Pull requests do not deploy.

After enabling this repository, complete these steps in GitHub and DNS:

1. Set GitHub Pages source to **GitHub Actions**.
2. Create a DNS CNAME record for `docs.conscialabs.com` pointing to the GitHub Pages hostname shown in repository settings.
3. Verify the custom domain in GitHub Pages settings.
4. Enforce HTTPS in GitHub Pages settings once the certificate is ready.

The build includes `public/CNAME`, which GitHub Pages uses for the custom domain. The site is configured with `https://docs.conscialabs.com` as its canonical origin and has no repository-name base path.

## Content ownership and API contracts

Product repositories remain authoritative for product behavior and API contracts. This repository presents task-oriented public documentation and must not become a second, independently maintained source of product behavior.

The AI Gateway API reference is intentionally not generated yet. Integrate it by consuming a versioned artifact from the Gateway product repository or by exporting its authoritative OpenAPI contract through a reproducible build step. Record the artifact source, version, and generation command in this repository and run that integration in CI. Do not add a silently maintained or untracked OpenAPI copy.

## Visual identity source

The copied Conscia symbol and favicon assets and the adapted design tokens were inspected in the public [`conscia-labs` source repository](https://github.com/conscia-labs/conscia-labs) at commit `dc35efcc6cd376a787a03ea50a742bdaeabe64db` (2026-08-27). Reused assets are `conscia_symbol_black.svg`, `conscia_symbol_white.svg`, `public/favicon.svg`, and `public/favicon.ico`; the documentation theme adapts its Source Sans 3 family, ink/paper surfaces, violet, mint and cyan accents, border colors, focus behavior, and reduced-motion behavior. The website's preview gate and `noindex` behavior are not used.

Gateway product facts in the initial pages were cross-checked against the public [`conscia-ai-gateway` source repository](https://github.com/conscia-labs/conscia-ai-gateway) at commit `b1625ce3d515dff496b1dd41fa2b14ae55a340e4`. The Gateway repository and its generated contract remain authoritative for behavior, supported features, and API schemas; this docs repository does not silently copy that contract.
