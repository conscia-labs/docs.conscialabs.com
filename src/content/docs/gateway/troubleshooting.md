---
title: Troubleshoot AI Gateway requests
description: Diagnose common HTTP errors and collect safe details for a Gateway request.
---

## Check the URL and credential first

First, confirm that the client uses the base URL for the intended public transport:

- OpenAI-compatible requests use the `/v1` base URL from Developer Portal → **Quickstart**.
- Anthropic-compatible clients use the Gateway origin and add the client's documented versioned path.

Next, confirm that the credential is a Conscia-issued personal or application credential, is active, and belongs to the expected organization and environment. Do not configure an upstream provider key.

## Check the HTTP status

| Status | What to check |
| --- | --- |
| `400` Bad Request | Validate the request JSON, required fields, parameter types, public model ID, and feature support for the selected transport and model. |
| `401` Unauthorized | Check that the `Authorization: Bearer` header is present and that the Conscia credential is valid and has not been revoked. Do not include its value in a support request. |
| `403` Forbidden | Check that the credential and organization are authorized for the requested model, capability, or operation. Ask an organization administrator to review effective access. |
| `404` Not Found | Check the public endpoint path or the model ID used with a model lookup. Inference requests should use an ID returned by the credential-scoped model list. |
| `413` Payload Too Large | Reduce the JSON request body. The default inference request limit is currently 16 MiB; the response includes `x-conscia-max-request-body-bytes` with the active limit. |
| `429` Too Many Requests | The organization rate, token, or budget limit was exceeded. Follow the returned retry guidance when present; do not assume a fixed limit or reset time. |
| `502` Bad Gateway | Provider execution failed. Preserve the diagnostic headers and inspect the model’s route and compatibility status before changing the request. |
| `503` Service Unavailable | Gateway, the control plane, or an eligible provider route is temporarily unavailable. Retry only when appropriate and preserve the diagnostic headers. |
| `504` Gateway Timeout | The provider execution deadline was exceeded. Retry according to your workload’s policy and keep the request identifiers. |
| Other `5xx` | Retry only when appropriate. If the issue persists, share the status and request/correlation ID with support. The response alone does not guarantee the cause. |

The Developer Portal’s common error guidance includes `INVALID_API_KEY`, `API_KEY_REVOKED`, `API_KEY_EXPIRED`, `MODEL_NOT_ALLOWED`, `CAPABILITY_NOT_ALLOWED`, `RATE_LIMIT_EXCEEDED`, `BUDGET_EXCEEDED`, `PROVIDER_UNAVAILABLE`, and `REQUEST_MALFORMED`. Start with the error code, then confirm the current credential, model, policy, allowance, and route state.

## Diagnose common request failures

| Symptom | Likely cause | Next action |
| --- | --- | --- |
| The model is absent from `GET /v1/models` | The credential cannot access it, or it is not currently available. | Use the same credential to list models, then ask an administrator to review access if needed. |
| The model is listed but a harness reports it as unavailable | The harness transport, capability, route profile, or qualification status does not match. | Read [model compatibility](/gateway/model-compatibility/) and the relevant harness guide. |
| A request feature returns `400` | The selected model or transport does not support the feature. | Remove the feature or choose a model with the required capability; another provider route may not add it. |
| A request reaches the Gateway but is denied | Effective model access, capability, allowance, or rate policy rejected it. | Review [access and allowances](/gateway/access-and-allowances/) and the request’s sanitized diagnostic details. |
| A model has no usable route | The route is inactive, unqualified, unavailable, outside the processing boundary, or incompletely priced. | Ask an organization administrator or platform operator to review model readiness; changing the provider-native model ID will not fix it. |

## Find request and correlation IDs

Record the `x-request-id` and `x-correlation-id` response headers, when present, with the approximate time and endpoint path. Applications may send `x-correlation-id` when they already have a safe correlation value. These IDs let operators locate the request without seeing its content.

For harness-level session and activity identifiers, see [Group usage by activity](/gateway/integrations/activity-correlation/). Do not use request IDs, prompts, credentials, or personal data as activity identifiers.

Developers can open a request from Developer Portal → **Usage** or paste its request ID into **Troubleshooting**. The personal lookup is scoped to requests attributed to the current organization membership. Organization administrators can inspect organization usage and open the raw request inside an activity group.

## Share diagnostics safely

Never share API keys, prompts, request bodies, cache keys, tool arguments, or other sensitive content with support. A safe support bundle contains:

- HTTP status and Gateway error code;
- `x-request-id` and `x-correlation-id`;
- session ID and activity ID, if you intentionally configured them;
- approximate timestamp and endpoint path;
- public model ID and transport; and
- a concise description of the observed behavior.

Redact credential prefixes, email addresses, organization or user identifiers, provider request IDs, and any personal data that is not needed for diagnosis.
