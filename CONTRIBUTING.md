# Contributing to Conscia Labs documentation

Write for developers and organization administrators who need to complete a task. Use direct, task-oriented titles, short steps, and safe examples.

## URLs and products

Keep URLs explicitly product-scoped. AI Gateway pages live under `src/content/docs/gateway/` and `/gateway/`. To add another product, create a sibling directory such as `src/content/docs/c-code/`, add its landing page and navigation group, and keep its pages under `/c-code/`. Do not place product-specific pages at the documentation root.

## Content boundaries

- Do not publish internal architecture, audits, work plans, secrets, or private operational runbooks.
- Do not make claims unsupported by an authoritative product or API source. Do not guess at limits, pricing, guarantees, provider support, or compatibility.
- Never include real API keys or sensitive request content in examples.
- Keep public documentation indexable; do not add a preview gate or blanket `noindex` metadata.

## Content ownership and API contracts

Product repositories remain authoritative for product behavior and API contracts. Documentation here explains those products for external users and should point back to maintained sources when facts are uncertain.

The AI Gateway API reference must be generated from the Gateway product's authoritative OpenAPI contract. Integrate a versioned contract artifact or reproducible export in CI and make its source and version visible. Do not silently maintain an untracked copy or hand-edit a duplicate schema in this repository.

## Local workflow

Use Node.js 24 and pnpm 12.3.4 or newer within the 12.x major line. Run `pnpm check`, `pnpm build`, and `pnpm check:links` before opening a pull request.
