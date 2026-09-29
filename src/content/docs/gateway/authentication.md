---
title: Authenticate requests
description: Use a Conscia personal or application credential with Bearer authentication.
---

## Choose a Conscia credential

Gateway supports two Conscia-issued credential types:

- Personal credentials belong to an individual user and are intended for that user's development tools and scripts.
- Application credentials belong to an organization application and are intended for services and deployed workloads.

Choose the type provided for your organization and application in the Developer Portal. Organization administrators manage application access, while individual developers manage their own personal credentials.

Send the credential with every request using the Bearer authentication scheme:

```http
Authorization: Bearer <CONSCIA_API_KEY>
```

Secrets appear once, when you create or rotate them. Store them in environment variables or a secret manager, and limit access to the people and services that need them. If a credential is exposed, revoke or rotate it promptly and create a replacement. Never paste it into a support request or source control.

Rotate or revoke credentials from the appropriate Developer Portal or organization-administration surface. Rotation creates replacement secret material; revocation disables the credential.

Gateway requests use Conscia credentials. Conscia manages upstream provider credentials, so callers do not supply them.
