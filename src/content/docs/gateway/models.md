---
title: Choose an accessible model
description: Find public model IDs available to your Conscia credential and use them in Gateway requests.
---

## Start with the credential-scoped catalog

Use the public model ID shown for your organization in the Developer Portal or returned by `GET /v1/models`. Availability is specific to the credential making the request, so discover the list with the credential you intend to use.

You can retrieve one accessible model with `GET /v1/models/{model_id}` when that operation is available on your platform. The response describes the model from the caller's perspective; it does not expose provider credentials or make an inaccessible model usable.

The Gateway accepts published, provider-neutral model IDs. Provider-native identifiers, provider prefixes, aliases, slash-qualified names, and internal routes are outside the user-facing API. Obtain IDs from the Developer Portal or the Gateway model endpoint.

## Check before you deploy

The Developer Portal model detail shows the information needed to choose a client:

- access status and lifecycle status;
- supported public transports;
- capabilities, context window, and maximum output;
- recommended coding harnesses and use cases;
- per-harness compatibility status and feature tier;
- organization notes and model advisories; and
- customer-facing rate information when available.

Use [Understand model compatibility](/gateway/model-compatibility/) to interpret **Supported**, **Limited**, and **Unavailable** harness statuses. A model can be present in a broad catalog but unavailable to your credential, transport, route, capability, or pricing policy.

## Let the Gateway select a model

Where a supported request offers it, `model: "auto"` asks the Gateway to select one eligible public model. Selection follows your organization's access, the request's supported capabilities, route readiness, and pricing requirements. It does not bypass policy, allowances, or capability checks.

Use an explicit public model ID when a workload requires a specific model, predictable behavior, or a transport-specific feature.

## Model availability is not provider access

Organization administrators curate AI Models and choose preferred and fallback provider routes within the organization's model configuration. Callers do not configure provider-native targets or provider credentials. A preferred route can be unavailable even when the public model remains visible; inspect the model detail and the returned request diagnostics before changing client configuration.
