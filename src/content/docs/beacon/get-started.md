---
title: Get started with Beacon Work
description: Sign in to Beacon Work, choose a starting mode, and send your first message.
---

Sign in to Beacon Work, choose **Discuss** to explore files or **Work** to make changes, and send a message. Beacon Cloud handles sign-in and access.

:::tip[What success looks like]
After your first message, Beacon creates a local thread in the selected Workspace—or in your default thread folder if you choose **No workspace**.
:::

## What you need

- Use a Mac. Beacon Work currently supports macOS.
- Ask your Beacon administrator for the current Beacon Work installer and to confirm that your account has access.
- Sign in with your organization’s Microsoft account. Beacon checks your Beacon Cloud access when the app starts.

## Sign in to Beacon Work

1. Open Beacon Work and choose **Sign in**. Your browser opens the organization sign-in page.
2. Complete sign-in and return to the app. If Beacon Cloud cannot be reached, choose **Retry**. If you see that you do not have access to Beacon Work, ask your administrator to grant access, then choose **Check again**.
3. Follow the welcome screens to choose your appearance and starting mode. Enter a first message to begin, or skip the welcome and start from the main screen later.

## Send your first message

1. Choose **New thread**.
2. Choose **Discuss** to ask questions and explore files without editing them, or **Work** when you want Beacon to make changes in the thread’s folder. Beacon asks before actions that need access outside the folder or before connector actions that require approval.
3. Choose a Workspace if you want the thread to use one of its folders. Otherwise, the first message creates a thread in the default folder (usually `~/Beacon/<title>`). See [projects and Workspaces](/beacon/projects/).
4. Enter your message and send it. Later messages continue the thread.

## Connect to AI Gateway if prompted

In the usual setup, Beacon Work uses your Beacon sign-in to obtain Gateway access. You do not paste an API key into the app. If Beacon asks you to connect to Gateway, choose **Connect to Gateway** on the New thread screen or in **Settings → This computer**, then complete the browser sign-in it opens. When connected through Beacon, Settings shows **Connected with your Beacon sign-in**; a browser-based fallback shows **Connected with your Gateway account**.

## Choose the right Beacon client

Beacon Code is a separate terminal client that starts Claude Code. These guides cover Beacon Work’s desktop experience; its Workspaces, Marketplace, and connectors are not Beacon Code setup steps. If your organization provides Beacon Code, use the setup instructions supplied for that client.

## If sign-in or access fails

- **Beacon Cloud unavailable:** choose **Retry** when the app offers it, and check your network connection.
- **No Beacon Work access:** ask your Beacon administrator to confirm your entitlement, then use **Check again**.
- **Gateway connection needed:** choose **Connect to Gateway** and complete the browser flow. Beacon Work does not ask you to enter a Gateway key.

Continue with [projects and Workspaces](/beacon/projects/), [connectors](/beacon/connectors/), or [plugins](/beacon/plugins/).
