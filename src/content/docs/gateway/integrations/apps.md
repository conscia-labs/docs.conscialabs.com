---
title: Connect an App to AI Gateway
description: Create an application credential for a service or deployed workload.
---

Use an App when a service, worker, or product runtime calls AI Gateway. Use a personal credential for a developer’s direct calls.

## 1. Create the App

An organization administrator creates Apps in **Organization Administration → Apps**. Give an integration its own App when it has a different owner, environment, policy, or incident boundary. Common environments include development, staging, and production.

An App identifies the software client; it does not grant model access by itself. Effective organization policies and allowances still determine model access and request limits.

## 2. Create an application credential

Open the App and create an application credential for the service environment. The secret appears once. Copy it immediately into the deployment’s secret manager and expose it to the service as an environment variable.

```sh
export CONSCIA_API_KEY="cag_app_your-prefix_your-secret"
```

Application credentials use the Bearer scheme. Keep the secret out of source control, logs, tickets, and client-side code. Conscia manages upstream provider credentials; they are not part of this setup.

## 3. Configure the service

Open **Quickstart** in the Developer Portal and copy the base URL for the platform used by the service. Platform hosts use the `*.ai.conscialabs.com` domain. Use the exact hostname shown for your platform.

Set the OpenAI-compatible base URL and a public model ID available to the application credential:

```sh
export CONSCIA_BASE_URL="https://your-platform.ai.conscialabs.com/v1"
export CONSCIA_MODEL="your-public-model-id"
```

When possible, discover models with the application credential. The returned list reflects that credential’s access:

```sh
curl --fail-with-body --show-error --silent \
  -H "Authorization: Bearer ${CONSCIA_API_KEY:?Set CONSCIA_API_KEY first}" \
  "${CONSCIA_BASE_URL:?Set CONSCIA_BASE_URL from Developer Portal Quickstart}/models"
```

## 4. Send requests from the service

Keep the credential on the server side. Gateway authenticates the App, applies its effective model access and allowance, and records usage for the organization and application.

Send bounded attribution metadata when the service needs to distinguish product-owned work. Treat it as untrusted reporting data: it cannot override the authenticated organization, App, credential, environment, policy, model, route, or pricing. Use safe values such as feature or workflow slugs. Never send prompts, credentials, secrets, or sensitive personal data.

```json
{
  "model": "your-public-model-id",
  "messages": [{ "role": "user", "content": "Say hello." }],
  "metadata": {
    "feature": "summarize",
    "workflow": "support-case"
  }
}
```

App credentials may supply up to 32 custom string fields. Metadata keys are limited to 64 characters, values to 256 characters, and the serialized object to 8 KiB. Organization Usage can show observed keys and filter or group by one key.

For client diagnostics, send `X-Conscia-Client-Name` as a lowercase slug of at most 64 characters and, optionally, `X-Conscia-Client-Version` with at most 64 printable characters. These headers identify the calling product in usage views; they do not authenticate the request.

```sh
curl --fail-with-body --show-error --silent \
  -X POST "${CONSCIA_BASE_URL:?Set CONSCIA_BASE_URL from Developer Portal Quickstart}/chat/completions" \
  -H "Authorization: Bearer ${CONSCIA_API_KEY:?Set CONSCIA_API_KEY first}" \
  -H "Content-Type: application/json" \
  -d '{"model":"'"${CONSCIA_MODEL:?Set CONSCIA_MODEL from GET /v1/models}"'","messages":[{"role":"user","content":"Say hello."}]}'
```

Use a public model ID returned by `GET /v1/models`. Where the request and organization support it, `model: "auto"` asks Gateway to select one eligible public model.

## Rotate or revoke the credential

Organization administrators can rotate or revoke an application credential from the App. Rotation returns replacement secret material once; update the deployment secret and roll the service. Revocation prevents the credential from authenticating. A disabled App also blocks its credentials.

Check the App’s usage and last-used information after deployment. If a request fails, keep the `x-request-id` and `x-correlation-id` response headers for diagnosis. Never send the credential, prompts, or request bodies to support.

See [Inspect Gateway usage](/gateway/usage/) for organization-level request, principal, App, environment, and attribution views.
