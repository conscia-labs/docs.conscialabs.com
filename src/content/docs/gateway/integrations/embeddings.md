---
title: Create text embeddings
description: Use the OpenAI-compatible embeddings endpoint when your organization has enabled embeddings.
---

AI Gateway exposes synchronous text embeddings at `POST /v1/embeddings`. The Gateway returns vectors but does not store them or provide chunking, vector search, retrieval, or RAG orchestration. Those responsibilities remain with your application.

## Before you start

Embeddings require all of the following:

1. Your organization has the Embeddings feature enabled.
2. Your effective policy allows the Embeddings operation.
3. Your credential can access an embedding-capable public model.
4. The selected route is operational and priced for embeddings.

The feature and model grant are separate. Enabling the operation does not grant a model, and granting a model does not enable the operation.

## Send an embedding request

Use the OpenAI-compatible base URL from Developer Portal → **Quickstart**. Use `model: "auto"` when your policy provides an automatic embedding model, or use an accessible public embedding model ID:

```sh
curl --fail-with-body --show-error --silent \
  -X POST "${CONSCIA_BASE_URL:?Set the OpenAI-compatible /v1 base URL}/embeddings" \
  -H "Authorization: Bearer ${CONSCIA_API_KEY:?Set CONSCIA_API_KEY first}" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "your-public-embedding-model-id",
    "input": ["Text to embed"]
  }'
```

The current v1 provider baseline is Amazon Bedrock Titan Text Embeddings V2. Confirm the available public model and dimensions in the Developer Portal because organization access and route availability are credential-scoped.

Supported input is a string or string array. The current contract returns float vectors and supports dimensions `256`, `512`, or `1024` when the selected model and route support them. Vector storage and retrieval are outside the Gateway contract.

## Usage and errors

Embedding usage is recorded separately from chat or response inference. A request can be denied when the operation is disabled, the model is not allowed, the route is not priced, or an allowance or rate limit is exceeded.

Keep `x-request-id` and `x-correlation-id` for diagnosis. See [Troubleshoot AI Gateway requests](/gateway/troubleshooting/) before escalating. Do not send API keys, input text, or vectors to support.
