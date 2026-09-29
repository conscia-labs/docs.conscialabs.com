---
title: AI Gateway API reference
description: Map the public AI Gateway transport surface and find the authoritative contract.
---

The authoritative AI Gateway API reference comes from the Gateway product's OpenAPI contract. This page is a task-oriented map of the current public surface; it does not hand-maintain request or response schemas.

Use the [authoritative OpenAPI contract](https://github.com/conscia-labs/conscia-ai-gateway/blob/900f7f29a0c2f4cee8208fc3aa4dc538dc62fb76/packages/contracts/openapi/ai-gateway.openapi.yaml) for exact schemas, parameters, response formats, and feature compatibility. The public docs were refreshed against Gateway commit `900f7f29a0c2f4cee8208fc3aa4dc538dc62fb76`; check the product repository for changes after that baseline.

## Public endpoints

| Method and path | Purpose | Authentication |
| --- | --- | --- |
| `GET /v1/models` | List models available to the calling credential. Supports capability and cursor filters. | Bearer credential or Anthropic API-key header. |
| `GET /v1/models/{model_id}` | Retrieve one model available to the calling credential. | Bearer credential or Anthropic API-key header. |
| `POST /v1/responses` | OpenAI Responses-compatible text and function-tool subset. | Bearer credential. |
| `POST /v1/chat/completions` | OpenAI Chat Completions-compatible subset. | Bearer credential. |
| `POST /v1/messages` | Anthropic Messages-compatible subset. | Bearer credential or Anthropic API-key header. |
| `POST /v1/messages/count_tokens` | Anthropic-compatible token count; provider-native when available, otherwise estimated. | Bearer credential or Anthropic API-key header. |
| `POST /v1/embeddings` | Synchronous text embeddings. | Bearer credential. |

The model list is credential-scoped. A path being public does not grant access to a model or capability.

## Common request headers

Inference requests can include these optional diagnostic headers:

| Header | Contract |
| --- | --- |
| `X-Conscia-Client-Name` | Lowercase slug, maximum 64 characters. |
| `X-Conscia-Client-Version` | Maximum 64 printable characters; ignored without a valid client name. |
| `X-Conscia-Session-Id` | `A-Za-z0-9._:-`, maximum 128 characters. |
| `X-Conscia-Activity-Id` | `A-Za-z0-9._:-`, maximum 128 characters. |

These headers are untrusted diagnostic metadata. They do not affect authentication, authorization, model routing, policy, quotas, rate limits, pricing, or billing. See [Connect a client](/gateway/integrations/) and [Correlate usage by activity](/gateway/integrations/activity-correlation/).

Anthropic Messages requests require `anthropic-version: 2023-06-01`. The Gateway accepts the `beta` query parameter for Claude Code compatibility; beta behavior is derived from validated request fields.

## Request limits and errors

The current default inference JSON body limit is 16 MiB. A `413` response includes `x-conscia-max-request-body-bytes` with the active limit. Public inference endpoints use status codes to distinguish malformed or unsupported requests (`400`), authentication (`401`), access (`403`), limits (`429`), provider execution failures (`502`), temporary unavailability (`503`), and provider deadlines (`504`).

See [Troubleshoot AI Gateway requests](/gateway/troubleshooting/) for recovery guidance. Do not rely on a status code alone to infer billing or provider behavior; inspect the returned error code and request diagnostics.

## Contract maintenance

The Gateway product repository remains the source of truth. At the time of this documentation update, its checked-in contract is `packages/contracts/openapi/ai-gateway.openapi.yaml` at commit `900f7f29a0c2f4cee8208fc3aa4dc538dc62fb76`. Integrate the generated API reference here by consuming a versioned contract artifact or a reproducible export from that repository during the docs build. The source, version, and generation process must be visible in this repository and in CI. Do not maintain an untracked or manually copied OpenAPI file here.

Until that generated reference is integrated, use the product contract for exact schemas, parameters, response formats, and feature compatibility.
