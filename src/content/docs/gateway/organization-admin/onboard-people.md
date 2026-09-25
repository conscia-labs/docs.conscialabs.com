---
title: Onboard people to your organization
description: Invite people, assign organization roles, and prepare their Gateway access.
---

## Invite a person

1. Open **Organization Administration → People**.
2. Select **Invite person**.
3. Enter the person's email address.
4. Choose an organization role: **Owner**, **Admin**, or **Member**.
5. Send the invitation.

The invitation email is queued for delivery and expires. If the address already belongs to a Conscia user, accepting the invitation connects that identity to the organization. Organization membership remains separate from any platform role.

Use the lowest role that fits the person's responsibility:

- **Owner** has full organization authority, including membership management.
- **Admin** manages organization configuration and access without owner-only authority.
- **Member** can use the AI capabilities granted through groups and policies.

Grant Owner only to people responsible for organization governance and administrator access.

## Give a person access

After the invitation is accepted:

1. Add the person to the groups that match their work.
2. Review the policies assigned to those groups.
3. Add direct policies only when group-based governance is not suitable.
4. Review the person's effective model access and allowance.
5. Ask the person to create a personal API key in the Developer Portal when they need direct access.

Removing a person ends organization access, revokes active personal API keys, removes group membership and direct policy assignments, and revokes pending invitations. The person's identity outside the organization is unchanged.
