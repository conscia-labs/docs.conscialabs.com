---
title: Choose an accessible model
description: Find public model IDs available to your Conscia credential and use them in Gateway requests.
---

## Use public model IDs

Use the public model ID shown for your organization in the Developer Portal or returned by `GET /v1/models`. You can retrieve one model's details with `GET /v1/models/{model_id}` when that operation is available on your platform. Availability is specific to the credential making the request, so discover the list with the credential you intend to use.

The Gateway accepts published, provider-neutral model IDs. Provider-native identifiers, provider prefixes, aliases, and internal routes are outside the user-facing API. Obtain IDs from the Developer Portal or the Gateway model endpoint.

## Let the Gateway select a model

Where a supported request offers it, `model: "auto"` asks the Gateway to select one eligible public model. Selection follows your organization's access and the request's supported capabilities. Check the Developer Portal and API contract for availability. Select a public model ID when your application requires a specific model.
