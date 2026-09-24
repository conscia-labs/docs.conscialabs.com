---
title: Connect a client to AI Gateway
description: Configure compatible SDKs and coding tools to use Conscia AI Gateway.
---

The Gateway exposes OpenAI-compatible and Anthropic-compatible API surfaces. Supported integration targets include OpenAI-compatible clients, Anthropic-compatible clients, Claude Code, Codex, and OpenCode.

Compatibility can vary by model and by the feature a client requests. Confirm the transport, model, and features your application needs against the current API contract. The client names here do not imply complete compatibility or certification for every version or feature.

## Base URLs

Copy the base URL for your platform from **Quickstart** in the Developer Portal. Platform hosts use the `*.ai.conscialabs.com` domain and may differ between platforms.

- OpenAI-compatible clients: `https://<platform>.ai.conscialabs.com/v1`
- Anthropic-compatible clients: `https://<platform>.ai.conscialabs.com` (use the client's documented path and do not append `/v1` unless that client requires it)

Use a Conscia-issued credential with Bearer authentication and an accessible public model ID. See [authentication](/gateway/authentication/) and [model discovery](/gateway/models/).

For a backend service or product runtime, follow [Connect an App](/gateway/integrations/apps/). Organization administrators create the App and its application credential; the service uses that credential for Gateway requests.

## API paths

Public transport paths include `POST /v1/responses`, `POST /v1/chat/completions`, `POST /v1/messages`, `POST /v1/messages/count_tokens`, and `POST /v1/embeddings`. Which operations and request features work depends on the model and client. Claude Code and the Anthropic Messages surface are Preview, and the Gateway does not execute client tools; consult the authoritative API contract for the current subset.
