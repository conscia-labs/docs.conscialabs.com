---
title: Authenticate with a Conscia credential
description: Use Conscia-issued personal or application credentials with Bearer authentication.
---

## Use a Conscia-issued credential

The Gateway accepts two Conscia-issued credential types:

- Personal credentials belong to an individual user and are intended for that user's development tools and scripts.
- Application credentials belong to an organization application and are intended for services and deployed workloads.

Use the credential type provided for your organization and application in the Developer Portal. Organization administrators manage application access; individual developers manage their own personal credentials.

Send it with each request using the Bearer authentication scheme:

```http
Authorization: Bearer <CONSCIA_API_KEY>
```

Secrets are displayed once when created or rotated. Put them in environment variables or a secret manager and restrict access to the people and services that need them. If a credential is exposed, revoke or rotate it promptly and create a replacement; do not paste it into support requests or source control.

Credentials can be rotated or revoked from the appropriate Developer Portal or organization-administration surface. Rotation creates replacement secret material; revocation disables the credential.

Gateway requests use Conscia credentials. Upstream provider credentials are managed by Conscia and are not supplied by callers.
