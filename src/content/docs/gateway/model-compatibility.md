---
title: Understand model compatibility
description: Choose a public model and transport that your credential, client, and Gateway route can support.
---

An AI Model is usable only when access, lifecycle, transport, capability, route readiness, and pricing all line up. Seeing a model in a catalog does not guarantee that every credential, API, or coding harness can use it.

## Start in the Developer Portal

Open **AI Models** and inspect the model detail before configuring a client. The portal can show:

- access status: **Available**, **Needs access**, **Denied**, or **Unavailable**;
- lifecycle status such as Available, Preview, Deprecated, Disabled, or Archived;
- public model ID, context window, maximum output, modalities, and capabilities;
- supported public transports: OpenAI Responses, OpenAI Chat Completions, Anthropic Messages, or Embeddings where applicable;
- organization recommendations for use cases and coding harnesses;
- compatibility status and feature tier for Codex, Claude Code, and OpenCode; and
- organization notes, advisories, and customer-facing rate information when available.

The same credential-scoped model list is available through `GET /v1/models`. Use the exact returned `id` in a request. Use `GET /v1/models/{model_id}` to inspect one accessible model when that operation is available on your platform.

If the portal shows **Needs access**, use its access-request action when available or ask an organization administrator to review the model-access policy. **Denied** means the current effective policy does not authorize the model; **Unavailable** means the model or route cannot currently serve the requested context.

## Interpret harness compatibility

| Status | Meaning |
| --- | --- |
| Supported | The transport and displayed feature tier are compatible, and the certified harness version passed Gateway conformance. |
| Limited | The transport is compatible, but the pinned harness version has not completed qualification, or the complete agent feature set is not supported. |
| Unavailable | The model is not accessible, is not declared for the transport, lacks conversational capability, or has no qualified route profile. |

The feature tier indicates the evidence-backed level of support:

- **Text**: text requests are supported.
- **Agent**: text, streaming, and client tool transport are supported by the qualified profile.
- **Reasoning**: the agent profile also exposes portable reasoning continuation.

Treat **Limited** as a compatibility signal, not as a promise that every client feature will work. Read the harness-specific guide and the model's organization advisory before using it in production.

## Public model IDs and `auto`

Public model IDs are provider-neutral values selected by Conscia. Do not construct them from provider names, provider-native IDs, aliases, slash-qualified names, or internal route IDs.

Use an explicit public model ID when a workload requires a specific model. Use `model: "auto"` only on a supported transport when the organization has configured automatic selection. `auto` selects one eligible public model; it does not bypass model access, capability checks, allowances, route readiness, or pricing requirements.

## When a model is visible but unusable

Check these in order:

1. The credential can see the model in `GET /v1/models`.
2. The model's access status is **Available**.
3. The requested API transport appears in the model detail.
4. The requested capability, such as chat, tools, reasoning, or embeddings, is enabled.
5. The harness compatibility status is not **Unavailable**.
6. The route is operational and has complete customer pricing.

An organization administrator can review effective model access and route readiness. Provider-native route configuration remains a platform concern; callers use the public model ID and transport reported for their credential.
