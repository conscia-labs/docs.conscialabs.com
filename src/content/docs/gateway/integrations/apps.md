---
title: Connect an App to AI Gateway
description: Create an application credential and use it from a service or deployed workload.
---

Use an App when a service, worker, or product runtime calls AI Gateway. Use a personal credential when a developer is the direct caller.

## 1. Create the App

An organization administrator creates Apps in **Organization Administration → Apps**. Create a separate App when an integration has a different owner, environment, policy, or incident boundary. Common environments include development, staging, and production.

The App identifies the software client. It does not provide model access by itself. Model access and request limits still come from the effective organization policies and allowances.

## 2. Create an application credential

Open the App and create an application credential for the service environment. The secret is shown once. Copy it immediately into the deployment's secret manager and expose it to the service as an environment variable.

```sh
export CONSCIA_API_KEY="cag_app_your-prefix_your-secret"
```

Application credentials use the Bearer scheme. Do not put the secret in source control, logs, tickets, or client-side code. Upstream provider credentials are managed by Conscia and are not part of this setup.

## 3. Configure the service

Open **Quickstart** in the Developer Portal and copy the base URL for the platform used by the service. Platform hosts use the `*.ai.conscialabs.com` domain. Use the exact hostname shown for your platform.

Set the OpenAI-compatible base URL and a public model ID available to the application credential:

```sh
export CONSCIA_BASE_URL="https://your-platform.ai.conscialabs.com/v1"
export CONSCIA_MODEL="your-public-model-id"
```

Discover models with the application credential when possible. The returned list reflects the access available to that credential:

```sh
curl --fail-with-body --show-error --silent \
  -H "Authorization: Bearer ${CONSCIA_API_KEY:?Set CONSCIA_API_KEY first}" \
  "${CONSCIA_BASE_URL:?Set CONSCIA_BASE_URL from Developer Portal Quickstart}/models"
```

## 4. Send requests from the service

Keep the credential on the server side. The Gateway authenticates the App, applies its effective model access and allowance, and records usage for the organization and application.

```sh
curl --fail-with-body --show-error --silent \
  -X POST "${CONSCIA_BASE_URL:?Set CONSCIA_BASE_URL from Developer Portal Quickstart}/chat/completions" \
  -H "Authorization: Bearer ${CONSCIA_API_KEY:?Set CONSCIA_API_KEY first}" \
  -H "Content-Type: application/json" \
  -d '{"model":"'"${CONSCIA_MODEL:?Set CONSCIA_MODEL from GET /v1/models}"'","messages":[{"role":"user","content":"Say hello."}]}'
```

Use a public model ID returned by `GET /v1/models`. You can use `model: "auto"` where the request and organization support it; the Gateway then selects one eligible public model.

## Rotate or revoke the credential

Organization administrators can rotate or revoke an application credential from the App. Rotation returns replacement secret material once, so update the deployment secret and roll the service. Revocation prevents the credential from authenticating. A disabled App also prevents its credentials from authenticating.

Check the App's usage and last-used information after deployment. If a request fails, keep the `x-request-id` and `x-correlation-id` response headers for diagnosis. Never send the credential, prompts, or request bodies to support.
