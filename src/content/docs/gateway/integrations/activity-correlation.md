---
title: Correlate usage by activity
description: Configure session and activity identifiers for Codex, Claude Code, and OpenCode usage.
---

Activity correlation gives operators a useful way to investigate usage from a long-lived coding harness without changing how the Gateway authenticates or serves a request.

## What activity correlation means

The Gateway accepts two diagnostic headers:

| Header | Meaning |
| --- | --- |
| `X-Conscia-Session-Id` | Stable for one long-lived Codex, Claude Code, or OpenCode process. |
| `X-Conscia-Activity-Id` | Stable for one user-visible turn, task, or run. |

One activity can contain multiple model or provider calls. For example, a single coding turn might produce a primary model call, a retry, a tool-related follow-up, or a summarization call. The activity identifier lets those calls be investigated together.

Raw usage events remain authoritative. Activity groups are an investigative/read-model convenience built from those events; they do not replace, rewrite, or override the raw records.

Treat both identifiers as untrusted diagnostic metadata. Never put secrets, prompts, request bodies, email addresses, or other personal data in them. They do not affect authentication, authorization, model routing, policy, quotas, rate limits, pricing, or billing.

### Confidence levels

The usage view can describe the quality of an activity relationship as:

- **Exact**: a valid session and activity identifier directly associate the raw request with an activity.
- **Linked**: the request is connected using available trusted request or principal context, but the explicit activity metadata is incomplete.
- **Estimated**: the activity view infers a likely grouping from timing or related metadata. Inspect the raw requests before relying on it for an investigation.

If credentials are shared, or several sessions run concurrently, give each process a distinct session identifier and each user-visible run a distinct activity identifier. Otherwise, attribution can be ambiguous even when the requests succeed.

## How activity groups appear

Organization usage exposes grouped activities alongside the raw requests that contributed to them. The terms describe different levels of the same flow:

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

Operators can open an activity and inspect the raw requests inside it. Use the raw records as the source of truth when a group is missing, contains unexpected requests, or has a linked or estimated confidence level.

## Configure Codex

Configure the Conscia provider in `~/.codex/config.toml` (or the applicable user-level Codex configuration):

```toml
[model_providers.conscia]
http_headers = { "X-Conscia-Session-Id" = "codex-session-123" }
```

Keep the session identifier stable for the lifetime of the Codex process. A wrapper or integration responsible for turn boundaries should update `X-Conscia-Activity-Id` for each user-visible run. Do not reuse one activity identifier for unrelated turns.

See the [official Codex configuration reference](https://developers.openai.com/codex/config-reference/) for the current configuration format and precedence rules.

## Configure Claude Code

Claude Code can send custom headers through `ANTHROPIC_CUSTOM_HEADERS`:

```sh
export ANTHROPIC_CUSTOM_HEADERS=$'X-Conscia-Session-Id: claude-session-123\nX-Conscia-Activity-Id: activity-456'
```

Keep `X-Conscia-Session-Id` stable while Claude Code runs. Rotate `X-Conscia-Activity-Id` for each user-visible turn or task. Support for custom headers depends on the Claude Code version and configuration in use; confirm the behavior with the version deployed by your organization. See Anthropic's [Claude Code gateway documentation](https://code.claude.com/docs/en/llm-gateway) for the supported gateway configuration surface.

## Configure OpenCode

For a static session header, add the provider header to `opencode.jsonc`:

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

Per-activity identifiers require an OpenCode plugin or wrapper. The following is illustrative: the surrounding integration supplies a safe activity ID for the current user-visible run, and the hook adds it to outgoing HTTP requests.

```ts
const activityIdForCurrentRun = () => process.env.CONSCIA_ACTIVITY_ID;

export const ConsciaActivityHeaders = async ({ session }) => {
  await session.hook("http.request", (event) => {
    const activityId = activityIdForCurrentRun();
    if (activityId) {
      event.request.headers.set("X-Conscia-Activity-Id", activityId);
    }
  });
};
```

Update `CONSCIA_ACTIVITY_ID` at the boundary of each user-visible run. `event.sessionID` is a session-level value; do not automatically treat it as a per-turn activity ID unless the integration intentionally defines it that way. See OpenCode's [plugin hook documentation](https://opencode.ai/v2/docs/build/plugins) and [provider header documentation](https://opencode.ai/v2/docs/providers/) for the current hook and configuration shapes.

## Troubleshoot and operate safely

- Identifier values may contain only `A-Z`, `a-z`, `0-9`, `.`, `_`, `:`, and `-`, and may be at most 128 characters long.
- Do not reuse one activity ID across unrelated user turns.
- Do not use prompt text, API keys, emails, or provider request IDs as identifiers.
- If identifiers are absent or invalid, requests still work. They may appear as ungrouped or estimated activity records.
- If multiple users share one credential, principal-scoped grouping still applies, but explicit identifiers are strongly recommended so concurrent work is distinguishable.
- When contacting support, provide the `x-request-id` and `x-correlation-id` response headers, the session ID, the activity ID, the approximate time, and the endpoint path. Redact credentials, prompt text, request bodies, personal data, and other secrets.

For general request diagnosis, see [Troubleshoot AI Gateway requests](/gateway/troubleshooting/). For usage, access, and allowance context, see [Understand model access and allowances](/gateway/access-and-allowances/).
