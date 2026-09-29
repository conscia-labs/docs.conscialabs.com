---
title: Use Claude Code with AI Gateway
description: Set up Claude Code with Conscia AI Gateway through the Anthropic Messages transport.
---

Claude Code connects to Conscia AI Gateway through the Anthropic Messages transport. This integration is Preview until the deployed Claude Code version and representative live-provider qualification gates have passed.

Use a personal credential for a developer’s direct calls or an [application credential](/gateway/integrations/apps/) for a service runtime. Keep Anthropic and other upstream-provider credentials out of these settings.

## Before you begin

You need:

- a Conscia-issued credential;
- the Anthropic-compatible Gateway origin shown in Developer Portal → **Quickstart**;
- an accessible AI Model declared for `anthropic.messages`; and
- a Claude Code version that supports the configuration variables used below.

## Configure Claude Code

Set the Gateway origin, credential, and public model ID. The Anthropic client adds the versioned `/v1` request paths:

```sh
export CONSCIA_API_KEY="your-conscia-api-key"
export ANTHROPIC_BASE_URL="https://your-platform.ai.conscialabs.com"
export ANTHROPIC_AUTH_TOKEN="$CONSCIA_API_KEY"
export ANTHROPIC_MODEL="your-public-model-id"
export CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY=1
```

Use `ANTHROPIC_API_KEY` instead of `ANTHROPIC_AUTH_TOKEN` if you prefer. Claude Code sends the two variables through different authentication headers; if both are present, their credential values must match.

Use the public model ID shown in the Developer Portal or returned by `GET /v1/models`. Claude Code’s model picker may filter IDs to names containing `claude` or `anthropic`; set `ANTHROPIC_MODEL` explicitly when the accessible public ID does not match that filter.

For provider and Gateway behavior that can change with Claude Code releases, see Anthropic’s [Claude Code gateway documentation](https://code.claude.com/docs/en/llm-gateway).

## Add usage correlation

Claude Code can send custom headers in versions that expose `ANTHROPIC_CUSTOM_HEADERS`:

```sh
export ANTHROPIC_CUSTOM_HEADERS=$'X-Conscia-Session-Id: claude-session-123\nX-Conscia-Activity-Id: activity-456'
```

Keep the session identifier stable for one long-lived Claude Code process. Rotate the activity identifier for each user-visible turn or task. See [Group usage by activity](/gateway/integrations/activity-correlation/) for safe identifier values and confidence levels.

## Supported behavior

The Gateway transport supports text and system blocks, streaming, client function tools and results, stop sequences, prompt-cache markers, and enabled or adaptive thinking when the selected route exposes the capability. Claude Code executes tools locally; Gateway passes the tool request and later result through the Messages exchange.

Gateway may remove optimization-only fields when a selected provider cannot honor them. The transport does not support media, documents, provider-hosted tools, containers, citations, or structured-output constraints. Gateway rejects a request when removing a field would change tool or conversation correctness.

`POST /v1/messages/count_tokens` returns a provider-native count when the selected route exposes one. Otherwise, it returns a conservative estimate and sets `x-conscia-token-count-estimated: true`.

## Troubleshoot Claude Code

| Symptom | Check |
| --- | --- |
| `401 authentication_error` | Check that the Conscia credential is present, valid, and not duplicated with a different value in the two auth variables. |
| `403 permission_error` | Check that the requested public model is allowed by the effective policy. |
| A model is missing from the picker | Set `ANTHROPIC_MODEL` explicitly to the exact public model ID. |
| `400` for a feature | Check the model's Anthropic Messages compatibility and the unsupported-feature list above. |
| Token count is approximate | Inspect `x-conscia-token-count-estimated`; an estimate is expected when the route has no native tokenizer. |

Keep `x-request-id` and `x-correlation-id` when escalating. Never share the credential, prompt, request body, or tool content.
