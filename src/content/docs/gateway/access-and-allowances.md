---
title: Manage model access and allowances
description: See how model selection, access policies, and allowances shape Gateway requests.
---

Model access decides what a caller may use. Allowances limit how much they may use.

## Model access

Model access determines which public models and capabilities a caller may use. Gateway resolves it from the policies that apply to the organization, groups, user, App, and credential. A credential can narrow access, but it cannot expand access granted by the organization.

The Developer Portal shows the models available to your credential. Organization administrators manage organization model access and can review an App's effective access. A model in the broader catalog is not automatically available to every organization or credential.

Use a public model ID from the Developer Portal or `GET /v1/models`. Provider-native IDs and internal route IDs are not user-facing values.

## Allowances

An allowance sets a usage limit for a user or App. It can cap requests, tokens, or estimated cost over time windows of a minute, a day, a week, or a month.

Each caller has one effective allowance. A direct allowance takes precedence over a primary group allowance, which takes precedence over the organization default. If several group allowances apply and no primary group is selected, Gateway uses the most restrictive one. Credential settings can narrow capacity but cannot expand organization governance.

The Developer Portal shows your personal credential’s effective allowance, current usage, and reset time. Organization Administration shows the effective allowance for a person, group, App, or credential.

Usage history remains available after an allowance resets. A reset starts a new counter; it does not remove historical usage.

To group requests from coding tools, follow [Group usage by activity](/gateway/integrations/activity-correlation/). Activity groups are a convenience view; raw usage events remain authoritative.

## Access still applies after model selection

Choose an ID from [model discovery](/gateway/models/) and check its client and transport fit in [model compatibility](/gateway/model-compatibility/). Gateway still evaluates access policies and allowances for each request; `model: "auto"` does not bypass them.

## Diagnose a denied or limited request

- `403` indicates that the credential is not authorized for the requested model, capability, or operation.
- `400` indicates that the request shape or requested capability is not supported by the selected transport, model, or effective limits.
- `429` indicates that an applicable rate, token, budget, or quota limit has been exceeded.
- `503` can indicate that the Gateway, control plane, or eligible provider route is temporarily unavailable.

Check the model list, current allowance, and reset time in the Developer Portal. Ask an organization administrator to review the App, policy, or allowance when a service needs different access.

Use [Inspect Gateway usage](/gateway/usage/) to review request history, activity groups, breakdowns, and pricing health.
