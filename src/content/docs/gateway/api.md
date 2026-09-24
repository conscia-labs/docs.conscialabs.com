---
title: AI Gateway API reference
description: Learn where the authoritative AI Gateway API reference will be published.
---

The authoritative AI Gateway API reference comes from the Gateway product's OpenAPI contract. This page lists the current transport paths and does not define request or response schemas.

Public transport paths include:

- `POST /v1/responses`
- `POST /v1/chat/completions`
- `POST /v1/messages`
- `POST /v1/messages/count_tokens` (Preview)
- `POST /v1/embeddings`
- `GET /v1/models`
- `GET /v1/models/{model_id}`

## Contract integration follow-up

The Gateway product repository remains the source of truth. At the time of this documentation update, its checked-in contract is `packages/contracts/openapi/ai-gateway.openapi.yaml`; the repository HEAD inspected for these product facts is `b1625ce3d515dff496b1dd41fa2b14ae55a340e4`. Integrate the generated API reference here by consuming a versioned contract artifact or a reproducible export from that repository during the docs build. The source, version, and generation process must be visible in this repository and in CI. Do not maintain an untracked or manually copied OpenAPI file here.

Use the product contract for exact schemas, parameters, response formats, and feature compatibility until the generated reference is integrated here.
