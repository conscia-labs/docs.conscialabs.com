# Contributing to Conscia Labs documentation

Write for developers and organization administrators who need to complete a task. Choose direct titles, keep steps short, and use safe examples.

## URLs and products

Keep URLs explicitly product-scoped. AI Gateway pages live under `src/content/docs/gateway/` and `/gateway/`. For another product, create a sibling directory such as `src/content/docs/c-code/`, add its landing page and navigation group, and keep its pages under `/c-code/`. Keep product-specific pages out of the documentation root.

## Content boundaries

- Keep internal architecture, audits, work plans, secrets, and private operational runbooks out of the public site.
- Support every product claim with an authoritative product or API source. Do not guess at limits, pricing, guarantees, provider support, or compatibility.
- Use placeholders in examples; never include real API keys or sensitive request content.
- Keep public documentation indexable. Do not add a preview gate or blanket `noindex` metadata.

## Content ownership and API contracts

Product repositories are authoritative for product behavior and API contracts. Use this repository to explain those products to external users, and link to maintained sources when a fact is uncertain.

Generate the AI Gateway API reference from the Gateway product's authoritative OpenAPI contract. Integrate a versioned contract artifact or reproducible export in CI, and make its source and version visible. Do not silently maintain an untracked copy or hand-edit a duplicate schema here.

## Local workflow

Use Node.js 24 and pnpm 12.3.4 or a later 12.x release. Run `pnpm check`, `pnpm build`, and `pnpm check:links` before opening a pull request.
