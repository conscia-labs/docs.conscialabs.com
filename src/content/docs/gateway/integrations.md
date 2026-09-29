---
title: Connect a client to AI Gateway
description: Set up compatible SDKs, coding tools, and services to use Conscia AI Gateway.
---

AI Gateway supports OpenAI-compatible and Anthropic-compatible API surfaces. Choose the transport your client expects, then check that the model supports it.

| Client or workload | Recommended guide | Public transport |
| --- | --- | --- |
| Codex | [Use Codex with AI Gateway](/gateway/integrations/codex/) | OpenAI Responses |
| Claude Code | [Use Claude Code with AI Gateway](/gateway/integrations/claude-code/) | Anthropic Messages |
| OpenCode | [Use OpenCode with AI Gateway](/gateway/integrations/opencode/) | OpenAI Responses |
| Backend service or product runtime | [Connect an App](/gateway/integrations/apps/) | OpenAI Chat Completions, OpenAI Responses, or Anthropic Messages as supported by the model |
| Embedding workload | [Create text embeddings](/gateway/integrations/embeddings/) | OpenAI Embeddings |

Compatibility can vary by model and feature. Before deploying, check the transport, model, and features your application needs against [model compatibility](/gateway/model-compatibility/). The client names in this table do not imply complete compatibility or certification for every version or feature.

## Base URLs

Copy your platform’s base URL from **Quickstart** in the Developer Portal. Platform hosts use the `*.ai.conscialabs.com` domain, and the hostname may differ between platforms.

- OpenAI-compatible clients: `https://<platform>.ai.conscialabs.com/v1`
- Anthropic-compatible clients: `https://<platform>.ai.conscialabs.com` (use the client's documented path and do not append `/v1` unless that client requires it)

Authenticate with a Conscia-issued credential and Bearer authentication, then choose a public model ID available to that credential. See [authentication](/gateway/authentication/), [model discovery](/gateway/models/), and [model compatibility](/gateway/model-compatibility/).

For a backend service or product runtime, follow [Connect an App](/gateway/integrations/apps/). An organization administrator creates the App and application credential; the service uses that credential for Gateway requests.

## Client attribution headers

Clients may send these optional diagnostic headers:

| Header | Rules |
| --- | --- |
| `X-Conscia-Client-Name` | Lowercase slug using letters, digits, `.`, `_`, or `-`; maximum 64 characters. |
| `X-Conscia-Client-Version` | Maximum 64 printable characters; used only when the client name is valid. |
| `X-Conscia-Session-Id` | Stable harness-session value; maximum 128 characters and limited to `A-Za-z0-9._:-`. |
| `X-Conscia-Activity-Id` | User-visible turn or run value; maximum 128 characters and limited to `A-Za-z0-9._:-`. |

Treat these values as untrusted diagnostic metadata. They do not authenticate the caller or change model access, routing, policy, allowances, rate limits, pricing, or billing. See [Group usage by activity](/gateway/integrations/activity-correlation/) for session and activity boundaries.

## Tools and stateless continuation

Qualified transports pass supported function-tool definitions, tool calls, and caller-supplied results through the Gateway. The Gateway does not execute tools, receive tool credentials, retain pending tool calls, or authorize side effects. The calling application or harness must execute each tool locally, validate its arguments, apply its own authorization, and send the result in a later request.

## API paths

Public transport paths include:

- `GET /v1/models` and `GET /v1/models/{model_id}` for the credential-scoped model catalog;
- `POST /v1/responses` for the supported OpenAI Responses subset;
- `POST /v1/chat/completions` for the supported OpenAI Chat Completions subset;
- `POST /v1/messages` and `POST /v1/messages/count_tokens` for the Anthropic Messages surface; and
- `POST /v1/embeddings` for synchronous text embeddings.

Available operations and request features depend on the model, transport, and qualified route. Check the [API reference](/gateway/api/) and the model details in the Developer Portal before relying on a feature. The Anthropic Messages surface and Claude Code integration are still in Preview in the current production capability set.
