---
title: Make your first AI Gateway request
description: Store a Conscia API key, discover an accessible model, and send your first request.
---

## Before you start

You need a Conscia-issued personal credential for direct developer calls or an [application credential](/gateway/integrations/apps/) for a service. You also need an organization-accessible AI Model. Upstream provider credentials are not required and should not be configured.

## 1. Store your credential

For a personal call, open Developer Portal → **API Keys**, create a key, and copy the secret when it is shown. For a service, follow [Connect an App](/gateway/integrations/apps/) and create an application credential. Secrets are displayed once. Store the value in an environment variable or a secret manager; never commit it or paste it into documentation, source control, or a shared terminal transcript.

```sh
export CONSCIA_API_KEY="your-conscia-api-key"
```

## 2. Copy the Gateway URL

Open **Quickstart** in the Developer Portal and copy the base URL for the API format you are using. Platform hosts use the `*.ai.conscialabs.com` domain, and the hostname can differ by platform. Do not invent a host or copy an upstream provider URL.

For OpenAI-compatible requests, set the `/v1` base URL:

```sh
export CONSCIA_BASE_URL="https://your-platform.ai.conscialabs.com/v1"
```

For Anthropic-compatible clients, use the Gateway origin shown by Quickstart and let the client add the documented versioned path. See [Connect a client](/gateway/integrations/) for the distinction.

## 3. Discover accessible models

The model list is scoped to the credential making the request. Use the public `id` returned by this call in later requests:

```sh
curl --fail-with-body --show-error --silent \
  -H "Authorization: Bearer ${CONSCIA_API_KEY:?Set CONSCIA_API_KEY first}" \
  "${CONSCIA_BASE_URL:?Set CONSCIA_BASE_URL from Developer Portal Quickstart}/models"
```

`--fail-with-body` makes HTTP error responses fail the command while retaining the response body for diagnosis.

Do not use provider-native model IDs, provider prefixes, aliases, or internal route IDs. Read [Choose an accessible model](/gateway/models/) and [Understand model compatibility](/gateway/model-compatibility/) if a model is visible in the catalog but unavailable for your client.

## 4. Send a first request

Replace `your-public-model-id` with the exact public model ID returned by `GET /v1/models`. This first example uses OpenAI Chat Completions; use a transport-specific guide when your client needs Responses or Anthropic Messages.

### cURL

```sh
curl --fail-with-body --show-error --silent \
  -X POST "${CONSCIA_BASE_URL:?Set CONSCIA_BASE_URL from Developer Portal Quickstart}/chat/completions" \
  -H "Authorization: Bearer ${CONSCIA_API_KEY:?Set CONSCIA_API_KEY first}" \
  -H "Content-Type: application/json" \
  -d '{"model":"your-public-model-id","messages":[{"role":"user","content":"Say hello."}]}'
```

### TypeScript

```ts
const apiKey = process.env.CONSCIA_API_KEY;
if (!apiKey) throw new Error('Set CONSCIA_API_KEY before running this example.');
const baseUrl = process.env.CONSCIA_BASE_URL;
if (!baseUrl) throw new Error('Set CONSCIA_BASE_URL from Developer Portal Quickstart.');

const response = await fetch(`${baseUrl}/chat/completions`, {
  method: 'POST',
  headers: {
    authorization: `Bearer ${apiKey}`,
    'content-type': 'application/json',
  },
  body: JSON.stringify({
    model: 'your-public-model-id',
    messages: [{ role: 'user', content: 'Say hello.' }],
  }),
});

if (!response.ok) {
  const details = await response.text();
  throw new Error(`Gateway request failed (${response.status}): ${details}`);
}

console.log(await response.json());
```

### Python

```python
import json
import os
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

api_key = os.environ.get("CONSCIA_API_KEY")
if not api_key:
    raise RuntimeError("Set CONSCIA_API_KEY before running this example.")
base_url = os.environ.get("CONSCIA_BASE_URL")
if not base_url:
    raise RuntimeError("Set CONSCIA_BASE_URL from Developer Portal Quickstart.")

request = Request(
    f"{base_url}/chat/completions",
    data=json.dumps({
        "model": "your-public-model-id",
        "messages": [{"role": "user", "content": "Say hello."}],
    }).encode(),
    headers={
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    },
    method="POST",
)

try:
    with urlopen(request) as response:
        if not 200 <= response.status < 300:
            raise RuntimeError(f"Gateway request failed ({response.status}).")
        print(response.read().decode())
except HTTPError as error:
    print(f"Gateway request failed ({error.code}): {error.read().decode()}")
    raise
except URLError as error:
    raise RuntimeError(f"Could not reach the Gateway: {error.reason}") from error
```

## 5. Verify the request

Open **Usage** in the Developer Portal to confirm that the request appears in your personal history. Organization administrators can inspect the same request in Organization Administration → **Usage**, including its outcome, tokens, pricing status, and sanitized request diagnostics.

If the request fails, keep the response status, `x-request-id`, `x-correlation-id`, approximate time, endpoint path, and public model ID. See [Troubleshoot AI Gateway requests](/gateway/troubleshooting/). Never send the credential, prompt, request body, or provider secret to support.
