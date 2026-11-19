---
title: AI Gateway API reference
description: Find public endpoints, headers, limits, and the source OpenAPI contract.
---

Use the Gateway product's OpenAPI contract for exact request and response schemas. This page maps the public surface and points to the maintained contract; it does not duplicate those schemas.

For exact schemas, parameters, response formats, and feature compatibility, use the [authoritative OpenAPI contract](https://github.com/conscia-labs/conscia-ai-gateway/blob/900f7f29a0c2f4cee8208fc3aa4dc538dc62fb76/packages/contracts/openapi/ai-gateway.openapi.yaml). These docs were refreshed against Gateway commit `900f7f29a0c2f4cee8208fc3aa4dc538dc62fb76`; check the product repository for changes after that baseline.

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

Model lists are scoped to the calling credential. A public path does not grant access to a model or capability.

## Common request headers

Inference requests may include these optional diagnostic headers:

| Header | Contract |
| --- | --- |
| `X-Conscia-Client-Name` | Lowercase slug, maximum 64 characters. |
| `X-Conscia-Client-Version` | Maximum 64 printable characters; ignored without a valid client name. |
| `X-Conscia-Session-Id` | `A-Za-z0-9._:-`, maximum 128 characters. |
| `X-Conscia-Activity-Id` | `A-Za-z0-9._:-`, maximum 128 characters. |

Treat these headers as untrusted diagnostic metadata. They do not affect authentication, authorization, model routing, policy, quotas, rate limits, pricing, or billing. See [Connect a client](/gateway/integrations/) and [Group usage by activity](/gateway/integrations/activity-correlation/).

Anthropic Messages requests require `anthropic-version: 2023-06-01`. The Gateway accepts the `beta` query parameter for Claude Code compatibility; beta behavior is derived from validated request fields.

## Request limits and errors

The default inference JSON body limit is currently 16 MiB. A `413` response includes `x-conscia-max-request-body-bytes` with the active limit. `400` means the request is malformed or unsupported. `401` means authentication failed; `403` means access was denied. `429` means a limit was reached. `502` signals a provider execution failure. `503` means the service is temporarily unavailable; `504` means the provider deadline elapsed.

Use [Troubleshoot AI Gateway requests](/gateway/troubleshooting/) for recovery guidance. A status code alone doesn’t show how billing or provider execution behaved. Check the error code and request diagnostics.
