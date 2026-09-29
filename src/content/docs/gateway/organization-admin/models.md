---
title: Curate available models
description: Review organization models and choose preferred and fallback routes without managing provider infrastructure.
---

In Organization Administration, AI Models are the customer-facing unit of access. The **AI Models** page shows each model’s public ID, capabilities, availability, usage, rates, transport compatibility, and safe provider information.

## Review the model catalogue

Use the filters to find models that are enabled, recommended, available through multiple providers, or require attention. For requests, a model needs an eligible primary route, a supported public transport, complete customer pricing, and the required processing-boundary review.

Platform Administration curates the platform catalogue. A discovered or catalogued model is not automatically available to every organization. Model Access policies determine which people, groups, Apps, or API keys can use an organization model.

## Set route preferences

Open a model's operational view to choose:

- one preferred route; and
- at most one fallback route for the same model.

Gateway uses the preferred route when it is eligible. The configured fallback is the only alternate route for that model when a retryable failure occurs before output begins. Route preferences do not select a different model.

Organization Admins cannot assign provider configurations, activate provider infrastructure, change native provider targets, manage provider credentials, or change pricing. Platform Administration owns those controls. If a model is visible but unavailable, inspect its availability, transport, capability, route, pricing, and processing status before changing an organization policy.

## Keep public model IDs stable

Applications and Model Router rules use the public model ID. Provider-native model IDs and internal route identifiers are not organization-facing configuration values.
