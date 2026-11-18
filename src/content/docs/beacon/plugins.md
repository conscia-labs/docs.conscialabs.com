---
title: Install and manage plugins in Beacon Work
description: Browse the Beacon Marketplace, select plugin components, and manage installed plugins.
---

Beacon Work plugins are installed through the Marketplace. A plugin may include skills, sub-agents, and MCP connectors. You can select which installable parts to add.

## Install a plugin

1. Sign in to Beacon Work and open **Marketplace** in the sidebar.
2. In **Browse**, open a plugin and review its description, publisher, version, included components, and permissions.
3. Choose **Install**. In the install dialog, select the skills, agents, and connectors you want, then choose **Install selected**.
   - Skills and agents are selected by default.
   - Connectors are not selected by default. Select a connector only if you intend to connect and use it.
   - Commands may be listed in a package, but Beacon Work does not install them yet.
4. If the plugin offers optional locked libraries, decide whether to download them. If you skip them, you can use **Download libraries** from **Installed** later when available.
5. To authenticate a selected connector, open **Customize → Connectors** and choose **Connect**. See [Set up connectors](/beacon/connectors/).

> Locked library downloads currently use Beacon-managed runtimes for Apple silicon Macs. On other computers, a plugin can install without its optional libraries.

Browse shows approved Marketplace versions. If you upload your own plugin, you can install it from **My uploads** while it is awaiting approval; other people can browse it after an administrator approves it.

## Manage installed plugins

Open **Marketplace → Installed** to see installed plugins.

- Use the switch to enable or disable a plugin. The change takes effect when a thread starts its next message; a running turn finishes with the version it started with.
- Choose **Update** when Beacon Work offers an approved update. Each new version submitted by an uploader is reviewed before it appears in Browse.
- Choose **Remove** and confirm to uninstall a plugin. Removing it does not delete your project folders or their files.
- If the plugin includes a connector, use **Customize** to open **Customize → Connectors** and review its connection and permissions.

## Review permissions and trust

Marketplace versions are checked before upload and reviewed before they are made available to other users. Review the publisher and the permissions shown in the item and install dialog before installing. A plugin’s skills and agents add instructions for Beacon’s agent; a connector provides tools that can reach a remote service or run local code.

**Important:** A local MCP connector runs outside the thread sandbox with your Mac account’s permissions. It can read local files and access the network. Install connectors only when you trust their source. Beacon asks before connector actions that are not approved as read-only, and you can turn off a connector or require approval for an action in its connector panel.

To publish your own extension, see the [plugin development guide](/beacon/plugin-development/).
