---
title: Create and assign policies
description: Govern model access, allowances, and request restrictions in your organization.
---

Policies define the governance applied to people, groups, Apps, API keys, and the organization. The Policies page provides the policy inventory, assignments, effective-access inspection, and decision testing.

## Policy families

Use the family that matches the decision you need to make:

- **Model Access** grants or restricts public AI Models and their capabilities.
- **Allowance** sets the capacity available to a person or App. It can cover requests, tokens, estimated cost, and per-request token limits over supported time windows.
- **Request Restrictions** sets request requirements that a more specific assignment cannot weaken.

Model Access and Allowance are separate. Granting a model does not increase a caller's allowance. An allowance does not grant access to a model.

## Assign a policy

1. Open **Organization Administration → Policies**.
2. Create or open a policy.
3. Choose the policy family and configure its rules.
4. Assign it to the organization, a group, a person, an App, or an API key.
5. Use the decision inspector to review the effective result for a subject.

Policy assignments combine by family:

- Model Access grants combine across applicable policies.
- An explicit model-access deny wins over a grant.
- Restrictions narrow the result.
- One direct Allowance takes precedence over a primary group allowance, which takes precedence over the organization default.
- When several group allowances apply without a selected primary group, the most restrictive applicable allowance is used.

Credential settings can narrow effective access or capacity. They cannot expand organization governance.

## Review changes

Use the effective-access view for the affected person, group, App, or model after changing a policy. Confirm the public model IDs and capabilities that remain available. Review usage and allowance data after a change that affects capacity.
