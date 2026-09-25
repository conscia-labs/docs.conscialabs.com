---
title: Curate available models
description: Review organization models and choose preferred and fallback routes without managing provider infrastructure.
---

Organization Administration presents AI Models as the customer-facing unit of access. The **AI Models** page shows the models available to the organization, their public IDs, capabilities, availability, usage, rates, and safe provider information.

## Review the model catalogue

Use the filters to find models that are enabled, recommended, available through multiple providers, or require attention. A model needs an eligible primary route to be available for requests.

The platform catalogue is curated by Platform Administration. A model discovered or present in the catalogue is not automatically available to every organization. Model Access policies determine which people, groups, Apps, or API keys can use an organization model.

## Set route preferences

Open a model's operational view to choose:

- one preferred route; and
- at most one fallback route for the same model.

The preferred route is used when eligible. The configured fallback is the only alternate route for that model when a retryable failure occurs before output begins. Route preferences do not select a different model.

Organization Admins cannot assign provider configurations, activate provider infrastructure, change native provider targets, manage provider credentials, or change pricing. Those controls belong to Platform Administration.

## Keep public model IDs stable

Applications and Model Router rules use the public model ID. Provider-native model IDs and internal route identifiers are not organization-facing configuration values.
