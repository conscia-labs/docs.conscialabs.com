---
title: Make your first AI Gateway request
description: Store a Conscia API key, discover an accessible model, and send your first request.
---

## 1. Store your API key

Obtain a Conscia-issued credential for your application. Secrets are displayed once. Store the value in an environment variable or a secret manager; never commit it or paste it into documentation, source control, or a shared terminal transcript.

```sh
export CONSCIA_API_KEY="your-conscia-api-key"
```

## 2. Discover accessible models

Open **Quickstart** in the Developer Portal and copy the base URL for your platform. Platform base URLs use the `*.ai.conscialabs.com` domain, and the hostname can differ by platform. Replace `your-platform` below with the hostname shown in Quickstart. The model list is scoped to your credential. Use its public `id` in later requests.

Set the base URL from Quickstart for this shell session:

```sh
export CONSCIA_BASE_URL="https://your-platform.ai.conscialabs.com/v1"
```

```sh
curl --fail-with-body --show-error --silent \
  -H "Authorization: Bearer ${CONSCIA_API_KEY:?Set CONSCIA_API_KEY first}" \
  "${CONSCIA_BASE_URL:?Set CONSCIA_BASE_URL from Developer Portal Quickstart}/models"
```

`--fail-with-body` makes HTTP error responses fail the command while retaining the response body for diagnosis.

## 3. Send a first request

Replace `your-public-model-id` with a public model ID returned by `GET /v1/models`. Use the OpenAI-compatible base URL from **Quickstart** (`https://<platform>.ai.conscialabs.com/v1`) and replace the platform placeholder with your platform hostname.

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
