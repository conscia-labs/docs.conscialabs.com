---
title: Use OpenCode with AI Gateway
description: Set up OpenCode with Conscia AI Gateway through the OpenAI Responses transport.
---

OpenCode connects to Conscia AI Gateway through the OpenAI Responses transport. Gateway handles credential validation, effective policy, model selection, provider routing, and usage recording. OpenCode executes tools locally.

Use a personal credential for direct developer use or an [application credential](/gateway/integrations/apps/) for a service runtime. Keep OpenAI and other upstream-provider credentials out of this configuration.

## Configure the credential

Store the Conscia secret in OpenCode’s environment service:

```sh
opencode service set env CONSCIA_API_KEY
```

Enter the credential when prompted. Keep it out of `opencode.jsonc`, source control, and support logs.

## Configure OpenCode

Save this configuration globally at `~/.config/opencode/opencode.jsonc` or locally as `opencode.jsonc`. Replace the base URL and model ID with the values shown in Developer Portal → **Quickstart** and **AI Models**:

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "model": "conscia/gateway-model",
  "providers": {
    "conscia": {
      "name": "Conscia AI Gateway",
      "env": ["CONSCIA_API_KEY"],
      "package": "@opencode/ai/providers/openai/responses",
      "settings": {
        "baseURL": "https://your-platform.ai.conscialabs.com/v1"
      },
      "models": {
        "gateway-model": {
          "modelID": "your-public-model-id",
          "name": "Your model name"
        }
      }
    }
  }
}
```

This example matches the OpenCode v2.0.12 configuration baseline. If the Developer Portal generates a different example, use that one. The Responses transport preserves portable reasoning continuation and tool-call events.

Use only the public model ID returned by `GET /v1/models` or shown in the Developer Portal. Provider-native IDs, provider prefixes, slash-qualified IDs, and aliases are not valid `modelID` values.

For current provider configuration fields, see OpenCode’s [provider documentation](https://opencode.ai/v2/docs/providers/).

## Add usage correlation

Static provider headers can carry a session identifier:

```jsonc
{
  "providers": {
    "conscia": {
      "headers": {
        "X-Conscia-Session-Id": "opencode-session-123"
      }
    }
  }
}
```

Per-activity identifiers require an OpenCode plugin or wrapper. The plugin must own the current user-visible run boundary and set `X-Conscia-Activity-Id` in the `http.request` hook:

```ts
import { Plugin } from "@opencode/plugin";

let currentActivityId: string | undefined;

export default Plugin.define({
  id: "conscia-activity-headers",
  async setup(ctx) {
    // The wrapper updates currentActivityId at each user-visible run.
    await ctx.session.hook("http.request", (event) => {
      if (currentActivityId) {
        event.request.headers.set("X-Conscia-Activity-Id", currentActivityId);
      }
    }
    }, { providerID: "conscia" });
  },
});
```

`event.sessionID` is a session-level value. Do not use it as a per-turn activity ID unless the integration intentionally defines the OpenCode session as its activity boundary. See [Group usage by activity](/gateway/integrations/activity-correlation/) and OpenCode’s [plugin hook documentation](https://opencode.ai/v2/docs/build/plugins).

## Supported behavior and cache keys

The Responses transport supports text requests, streaming, client-side function tools, and qualified reasoning continuation. Gateway does not execute tools or retain pending tool calls; OpenCode must execute a requested tool and send the result in a later stateless request.

OpenCode may send `prompt_cache_key` and `store: false`. Gateway treats the cache key as an optional cache-affinity hint, derives an opaque organization/principal/model-scoped value before forwarding it to a provider, and does not use it as identity, authorization, attribution, response storage, or a durable cache-hit guarantee. Gateway does not store responses, and `store: true` is unsupported.

## Troubleshoot OpenCode

| Symptom | Check |
| --- | --- |
| `Cannot find package '@opencode/ai'` | Check that the configured OpenCode release bundles the package path shown above. |
| The provider appears but the model does not | Check that the top-level model is `conscia/gateway-model` and that `modelID` is the exact public Conscia ID. |
| `401` | Re-run the environment-service command after rotating the credential and check that the service can read `CONSCIA_API_KEY`. |
| `403` | Check that the public model is available through the credential’s effective policy. |
| `400` for `prompt_cache_key` or `store` | The Gateway deployment may predate OpenCode compatibility support; check the deployed Gateway version. |
| `503` | Check model route readiness and retry only when the route is available. |

Keep `x-request-id` and `x-correlation-id` when escalating. Never share the credential, cache key, prompt, request body, or tool content.
