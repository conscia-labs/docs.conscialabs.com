---
title: Use Codex with AI Gateway
description: Configure Codex to use Conscia AI Gateway through the OpenAI Responses transport.
---

Codex can use Conscia AI Gateway through the OpenAI Responses transport. The Gateway authenticates the Conscia credential, applies the effective access and allowance, and selects an eligible provider route.

Use a personal credential when you are the direct caller. Use an [application credential](/gateway/integrations/apps/) when a service or deployed runtime calls the Gateway.

## Before you start

You need:

- a Conscia-issued credential;
- the Gateway base URL shown in Developer Portal → **Quickstart**;
- an accessible AI Model with an OpenAI Responses transport; and
- a Codex version whose compatibility status is shown in the Developer Portal for that model.

Do not configure an upstream provider credential. The Gateway manages provider credentials.

## Configure Codex

Keep the secret in the environment and configure the provider in `~/.codex/config.toml`. Replace the URL and model ID with the values shown in Quickstart and **AI Models**:

```sh
export CONSCIA_API_KEY="your-conscia-api-key"
```

```toml
model = "your-public-model-id"
model_provider = "conscia"

[model_providers.conscia]
name = "Conscia AI Gateway"
base_url = "https://your-platform.ai.conscialabs.com/v1"
env_key = "CONSCIA_API_KEY"
wire_api = "responses"
```

Use only the public model ID returned by `GET /v1/models` or shown in the Developer Portal. Provider-native IDs, provider prefixes, aliases, and internal route IDs are not Gateway model IDs.

The Responses transport is the maintained Codex configuration because it preserves the Gateway's supported tool-event and portable reasoning-continuation shape. The Gateway does not execute tools; the calling harness remains responsible for local tool execution and for sending caller-supplied results in a later request.

For the current Codex configuration format and precedence rules, see the [official Codex configuration reference](https://developers.openai.com/codex/config-reference/).

## Add usage correlation

To group requests from one long-lived Codex process, add a stable session header:

```toml
[model_providers.conscia]
http_headers = { "X-Conscia-Session-Id" = "codex-session-123" }
```

Add `http_headers` to the same provider table when you configure the session value. A wrapper that owns turn boundaries should add or update `X-Conscia-Activity-Id` for each user-visible run. See [Correlate usage by activity](/gateway/integrations/activity-correlation/) for identifier rules and the raw-request relationship.

## Check compatibility before choosing a model

The Developer Portal reports a per-model Codex status:

- **Supported** means the displayed Codex release passed Gateway conformance for the model's feature tier.
- **Limited** means the transport is compatible, but the pinned Codex release has not completed the qualification gate, or the full agent feature set is not available.
- **Unavailable** means the model is not accessible, is not declared for Responses, or has no qualified route profile.

Prefer a model marked **Supported** for production use. A model can be visible in the catalog and still be unavailable to the credential or transport you selected.

## Troubleshoot Codex requests

| Symptom | Check |
| --- | --- |
| `401` | Confirm `CONSCIA_API_KEY` is set, valid, and not revoked or expired. |
| `403` | Confirm the public model is allowed by the credential's effective policy. |
| `400` | Check the request feature against the model's Responses capabilities and compatibility status. |
| `503` | Check the model's route readiness and try again only when the route is available. |
| A model is missing | List models with the same credential and use the exact returned public ID. |

Keep `x-request-id` and `x-correlation-id` when escalating. Never share the credential, prompt, request body, prompt-cache key, or tool arguments.
