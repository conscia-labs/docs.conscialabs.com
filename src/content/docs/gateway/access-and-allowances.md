---
title: Understand model access and allowances
description: Learn how model selection, access policies, and usage allowances affect Gateway requests.
---

Model access and allowances control different parts of a Gateway request.

## Model access

Model access determines which public models and capabilities a caller may use. The effective result comes from the policies that apply to the organization, groups, user, App, and credential. A credential can narrow access, but it cannot expand access granted by the organization.

The Developer Portal shows the models available to your credential. Organization administrators manage organization model access and can review the effective access for an App. A model listed in the broader catalog is not automatically available to every organization or credential.

Use a public model ID from the Developer Portal or `GET /v1/models`. Provider-native IDs and internal routes are not user-facing values.

## Allowances

An allowance controls how much a user or App may consume. The Gateway can apply request, token, and estimated-cost allowances over minute, day, week, or month windows. The Developer Portal shows the allowance that applies to your personal credential and its reset time. Organization administrators manage organization and App governance.

Each caller has one effective allowance. A direct allowance takes precedence over a primary group allowance, which takes precedence over the organization default. When several group allowances apply without a selected primary group, the most restrictive applicable group allowance is used. Credential settings can narrow capacity but cannot expand organization governance.

Allowances can cover requests, tokens, and estimated cost over minute, day, week, or month windows. The Developer Portal shows the effective allowance, current usage, and reset time for a personal credential. Organization Administration can review the effective result for a person, group, App, or credential.

Usage history remains available after an allowance resets. A reset starts a new active counter; it does not remove historical usage.

For grouped usage investigation from coding tools, see [Correlate usage by activity](/gateway/integrations/activity-correlation/). Activity groups are a convenience view; raw usage events remain authoritative.

## Selecting a model

Use an explicit public model ID when your application requires a specific model:

```json
{
  "model": "your-public-model-id"
}
```

Use `model: "auto"` when the request and organization support Gateway-managed selection:

```json
{
  "model": "auto"
}
```

`auto` selects one eligible public model for the request. It does not bypass model access, capability restrictions, or allowances.

## When a request is denied or limited

- `403` indicates that the credential is not authorized for the requested model, capability, or operation.
- `400` indicates that the request shape or requested capability is not supported by the selected transport, model, or effective limits.
- `429` indicates that an applicable rate, token, budget, or quota limit has been exceeded.
- `503` can indicate that the Gateway, control plane, or eligible provider route is temporarily unavailable.

Review the model list, current allowance, and reset time in the Developer Portal. Ask an organization administrator to review the App, policy, or allowance when a service needs different access.

See [Inspect Gateway usage](/gateway/usage/) for request history, activity groups, breakdowns, and pricing health.
