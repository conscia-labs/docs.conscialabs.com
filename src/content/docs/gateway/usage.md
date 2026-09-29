---
title: Inspect Gateway usage
description: Review personal and organization usage, investigate requests, and inspect activity and pricing records.
---

Usage is the operational record of what Gateway received and processed. Developers can inspect individual requests; organization administrators can review volume, failures, activity, and pricing.

Raw Gateway usage events are authoritative for customer usage attribution. Summaries, breakdowns, and activity groups are views derived from those events.

## Choose the right view

| View | Use it for | Who can see it |
| --- | --- | --- |
| Developer Portal → **Usage** | Your request history, tokens, outcomes, estimated cost, and request-level troubleshooting. | The current organization member, scoped to their membership and keys. |
| Organization Administration → **Usage** | Organization-wide overview, breakdowns, raw requests, activity groups, and pricing health. | Organization administrators with usage access. |
| Developer Portal → **AI Models** → a model → **Usage & pricing** | Usage and pricing context for one accessible model. | The current organization member. |

The data available to you depends on your organization role, credential, and effective permissions.

## Read the organization Usage page

Organization Usage has five views:

- **Overview**: request volume, successful and failed work, tokens, attributed cost, and daily token activity for the selected period.
- **Breakdown**: compare requests, outcomes, tokens, and attributed cost by a dimension such as AI Model, provider, principal, member, API key, App, operation, environment, or status.
- **Requests**: inspect raw usage events and filter by API, client name, operation, outcome, model, principal, and time range.
- **Activities**: inspect grouped requests from one user-visible activity or harness session. Open the group to review the raw requests inside it.
- **Pricing health**: find requests with incomplete or missing price attribution. These requests are not silently presented as fully priced.

Use a bounded date range when investigating a large period. Start with the overview, narrow the breakdown, then open a raw request or activity group to inspect the evidence.

## Understand a raw usage event

A raw request record may include:

- request ID and occurrence time;
- authenticated principal, credential, App, and environment;
- requested and selected public model IDs;
- request operation and public API protocol;
- declared client name and version, plus separately detected SDK information when available;
- session and activity identifiers;
- outcome, HTTP status, provider attempt count, fallback use, and latency;
- input, output, cached, cache-write, reasoning, image, or embedding units; and
- cost, pricing status, and whether the amount is estimated.

Usage views may include sanitized operational context for diagnosis. Provider-native model IDs and internal route identifiers are not caller configuration values. By default, usage metadata does not include prompts, responses, credentials, or raw provider errors.

## Understand activity groups

An activity group places related raw requests together:

```text
authenticated principal
    └── harness session
          └── user-visible activity
                ├── raw request
                ├── raw request (retry or follow-up)
                └── raw request
```

Activity groups are scoped to a principal. The same activity string sent by two different members or Apps does not merge their usage. Explicit `X-Conscia-Activity-Id` metadata produces an **Exact** relationship; a session or safe run attribution can produce **Linked**; a request without usable correlation metadata may appear as **Estimated**. See [Group usage by activity](/gateway/integrations/activity-correlation/) for client configuration.

If a group looks wrong, inspect its raw requests. The group is not a replacement for the authoritative events.

## Understand pricing health

Usage cost has one of these states:

- **Priced**: the request has complete attributable pricing.
- **Partial**: some pricing coverage exists, but the record is not fully priced.
- **Unpriced**: the request has no attributable customer cost.

Pricing health is an operational signal. Investigate a request with incomplete pricing instead of treating it as zero cost. Provider spend and customer billable cost are separate measurements; a provider attempt can be recorded even when the customer charge is incomplete.

## Investigate a failed request

1. Start in **Requests** or your personal **Usage** history.
2. Filter by the approximate time, model, outcome, API, or client.
3. Open the request using its request ID.
4. Compare the outcome, error code, model, allowance, and effective access.
5. If several raw requests belong to one turn, open the corresponding activity group.
6. Preserve `x-request-id` and `x-correlation-id` when contacting support.

Keep API keys, prompts, request bodies, cache keys, email addresses, and personal data out of a support bundle. See [Troubleshoot AI Gateway requests](/gateway/troubleshooting/) for the safe diagnostic checklist.

## Attribution is not authorization

Client names, client versions, session IDs, activity IDs, and App metadata help operators search and group records. They do not authenticate a caller, change model access, override the principal, affect routing, change an allowance, or change pricing.
