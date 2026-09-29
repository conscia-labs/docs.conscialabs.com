---
title: Group usage by activity
description: Add session and activity identifiers to Codex, Claude Code, and OpenCode usage.
---

Activity correlation helps operators investigate usage from a long-lived coding harness. It does not change how the Gateway authenticates or serves requests.

## What activity correlation means

Send these two diagnostic headers when you want to group related requests:

| Header | Meaning |
| --- | --- |
| `X-Conscia-Session-Id` | Stable for one long-lived Codex, Claude Code, or OpenCode process. |
| `X-Conscia-Activity-Id` | Stable for one user-visible turn, task, or run. |

One activity can contain multiple model or provider calls. A single coding turn might produce a primary model call, a retry, a tool-related follow-up, or a summarization call. The activity identifier lets operators investigate those calls together.

Raw usage events remain authoritative. Activity groups are a convenience view built from those events; they do not replace, rewrite, or override the raw records.

Treat both identifiers as untrusted diagnostic metadata. Never put secrets, prompts, request bodies, email addresses, or other personal data in them. They do not affect authentication, authorization, model routing, policy, quotas, rate limits, pricing, or billing.

### Confidence levels

The usage view can describe the quality of an activity relationship as:

- **Exact**: a valid session and activity identifier directly associate the raw request with an activity.
- **Linked**: the request is connected using available trusted request or principal context, but the explicit activity metadata is incomplete.
- **Estimated**: the activity view infers a likely grouping from timing or related metadata. Inspect the raw requests before relying on it for an investigation.

When credentials are shared or several sessions run concurrently, give each process a distinct session identifier and each user-visible run a distinct activity identifier. Without that separation, attribution can be ambiguous even when requests succeed.

Product and service clients can also send `X-Conscia-Client-Name` and `X-Conscia-Client-Version` to make the calling client easier to filter in Usage. A client name must be a lowercase slug of at most 64 characters. The version is accepted only with a valid name and is also limited to 64 characters. These headers are diagnostic only.

## How activity groups appear

Organization Administration → **Usage** shows grouped activities alongside the raw requests that contributed to them. Developer Portal → **Usage** stays scoped to the current member’s request history. The terms describe different levels of one flow:

| Level | What it represents |
| --- | --- |
| Harness session | One long-lived client process, such as a Codex, Claude Code, or OpenCode process. |
| User-visible activity | One turn, task, or run that a person experiences as a unit. |
| Raw model request | One individual request sent to a model or provider. |

Conceptually:

```text
harness session
    └── user-visible activity
          ├── raw model request
          ├── raw model request (retry or follow-up)
          └── raw model request
```

Open an activity to inspect its raw requests. Use those records as the source of truth when a group is missing, contains unexpected requests, or has a linked or estimated confidence level.

## Configure Codex

Configure the Conscia provider in `~/.codex/config.toml` or the applicable user-level Codex configuration:

```toml
[model_providers.conscia]
http_headers = { "X-Conscia-Session-Id" = "codex-session-123" }
```

Keep the session identifier stable for the lifetime of the Codex process. A wrapper or integration that owns turn boundaries should update `X-Conscia-Activity-Id` for each user-visible run. Give unrelated turns different activity identifiers.

See the [official Codex configuration reference](https://developers.openai.com/codex/config-reference/) for the current configuration format and precedence rules.

## Configure Claude Code

Claude Code can send custom headers through `ANTHROPIC_CUSTOM_HEADERS`:

```sh
export ANTHROPIC_CUSTOM_HEADERS=$'X-Conscia-Session-Id: claude-session-123\nX-Conscia-Activity-Id: activity-456'
```

Keep `X-Conscia-Session-Id` stable while Claude Code runs. Rotate `X-Conscia-Activity-Id` for each user-visible turn or task. Custom-header support depends on the Claude Code version and configuration, so confirm the behavior with the version your organization deploys. See Anthropic’s [Claude Code gateway documentation](https://code.claude.com/docs/en/llm-gateway) for the supported gateway configuration surface.

## Configure OpenCode

For a static session header, add this provider header to `opencode.jsonc`:

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

Per-activity identifiers require an OpenCode plugin or wrapper. This example assumes that the surrounding integration supplies a safe activity ID for the current user-visible run; the hook adds it to outgoing HTTP requests.

```ts
import { Plugin } from "@opencode/plugin";

let currentActivityId: string | undefined;

export default Plugin.define({
  id: "conscia-activity-headers",
  async setup(ctx) {
    await ctx.session.hook("http.request", (event) => {
      if (currentActivityId) {
        event.request.headers.set("X-Conscia-Activity-Id", currentActivityId);
      }
    }, { providerID: "conscia" });
  },
});
```

The surrounding wrapper must update `currentActivityId` at the boundary of each user-visible run. `event.sessionID` is a session-level value; do not use it as a per-turn activity ID unless the integration intentionally defines it that way. See OpenCode’s [plugin hook documentation](https://opencode.ai/v2/docs/build/plugins) and [provider header documentation](https://opencode.ai/v2/docs/providers/) for the current hook and configuration shapes.

## Troubleshoot and operate safely

- Keep identifier values to `A-Z`, `a-z`, `0-9`, `.`, `_`, `:`, and `-`, with a maximum length of 128 characters.
- Give unrelated user turns different activity IDs.
- Never use prompt text, API keys, email addresses, or provider request IDs as identifiers.
- Requests still work when identifiers are absent or invalid, but the usage view may show them as ungrouped or estimated.
- When multiple users share one credential, principal-scoped grouping still applies. Explicit identifiers help distinguish concurrent work.
- When contacting support, provide the `x-request-id` and `x-correlation-id` response headers, session ID, activity ID, approximate time, and endpoint path. Redact credentials, prompt text, request bodies, personal data, and other secrets.

For a complete usage investigation workflow, see [Inspect Gateway usage](/gateway/usage/). For general request diagnosis, see [Troubleshoot AI Gateway requests](/gateway/troubleshooting/). For usage, access, and allowance context, see [Manage model access and allowances](/gateway/access-and-allowances/).
