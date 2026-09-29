---
title: Make your first AI Gateway request
description: Save a Conscia credential, find an accessible model, and send a request.
---

## Before you begin

For direct developer calls, use a Conscia-issued personal credential. For a service, use an [application credential](/gateway/integrations/apps/). You also need an AI Model that your organization makes available. Do not configure an upstream provider credential.

## 1. Store your credential

For a personal call, open Developer Portal → **API Keys**, create a key, and copy the secret when it appears. For a service, follow [Connect an App](/gateway/integrations/apps/) and create an application credential. Secrets appear once. Store the value in an environment variable or secret manager. Never commit it or paste it into documentation, source control, or a shared terminal transcript.

```sh
export CONSCIA_API_KEY="your-conscia-api-key"
```

## 2. Copy the Gateway URL

Open **Quickstart** in the Developer Portal and copy the base URL for the API format you are using. Platform hosts use the `*.ai.conscialabs.com` domain, and the hostname may differ by platform. Use the displayed host; do not invent one or copy an upstream provider URL.

For OpenAI-compatible requests, set the `/v1` base URL:

```sh
export CONSCIA_BASE_URL="https://your-platform.ai.conscialabs.com/v1"
```

For Anthropic-compatible clients, use the Gateway origin shown in Quickstart and let the client add its documented versioned path. See [Connect a client](/gateway/integrations/) for the distinction.

## 3. Discover accessible models

The model list is scoped to the credential making the request. Use the returned public `id` in later requests:

```sh
curl --fail-with-body --show-error --silent \
  -H "Authorization: Bearer ${CONSCIA_API_KEY:?Set CONSCIA_API_KEY first}" \
  "${CONSCIA_BASE_URL:?Set CONSCIA_BASE_URL from Developer Portal Quickstart}/models"
```

`--fail-with-body` makes HTTP errors fail the command while retaining the response body for diagnosis.

Use only public model IDs. Provider-native IDs, provider prefixes, aliases, and internal route IDs are not valid here. Read [Choose a model](/gateway/models/) and [Check model compatibility](/gateway/model-compatibility/) when a model appears in the catalog but is unavailable to your client.

## 4. Send a first request

Replace `your-public-model-id` with the exact public model ID returned by `GET /v1/models`. This example uses OpenAI Chat Completions. Choose a transport-specific guide when your client needs Responses or Anthropic Messages.

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

Open **Usage** in the Developer Portal and confirm that the request appears in your personal history. Organization administrators can inspect the same request in Organization Administration → **Usage**, including its outcome, tokens, pricing status, and sanitized request diagnostics.

If the request fails, record the response status, `x-request-id`, `x-correlation-id`, approximate time, endpoint path, and public model ID. See [Troubleshoot AI Gateway requests](/gateway/troubleshooting/). Never send the credential, prompt, request body, or provider secret to support.
