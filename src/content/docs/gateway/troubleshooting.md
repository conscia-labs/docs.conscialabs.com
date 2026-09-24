---
title: Troubleshoot AI Gateway requests
description: Interpret common HTTP errors and collect safe diagnostics for a Gateway request.
---

## Check the HTTP status

| Status | What to check |
| --- | --- |
| `400` Bad Request | Validate the request JSON, required fields, parameter types, and feature support for the selected model. |
| `401` Unauthorized | Confirm that the `Authorization: Bearer` header is present and that the Conscia credential is valid and has not been revoked. Do not include its value in a support request. |
| `403` Forbidden | Check that the credential and organization are authorized for the requested operation or resource. Ask an organization administrator to review access. |
| `404` Not Found | Check the public endpoint path and whether the public model ID is available to this credential. |
| `402` Payment Required | The request exceeded an applicable organization budget or quota. Ask an organization administrator to review the effective budget, quota, or usage policy. |
| `429` Too Many Requests | The request exceeded an applicable rate limit. Reduce request frequency and follow any retry guidance returned by the service. Do not assume a particular limit. |
| `503` Service Unavailable | The Gateway or an eligible upstream route could not serve the request. Retry only when appropriate for your application and preserve the diagnostic headers. |
| Other `5xx` | Retry only when appropriate for your application. If the issue persists, share the status and request/correlation ID with support. The response alone does not guarantee the cause. |

## Find request and correlation IDs

Record the `x-request-id` and `x-correlation-id` response headers, when present, with the approximate time and endpoint path. Applications may send `x-correlation-id` when they already have a safe correlation value. These IDs let operators locate the request without its content.

## Share diagnostics safely

Never share API keys, prompts, request bodies, or other sensitive content with support. Share only the HTTP status, request or correlation ID, approximate timestamp, endpoint path, and a concise description of the observed behavior. Redact organization or user identifiers if they are not needed for diagnosis.
