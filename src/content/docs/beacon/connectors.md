---
title: Set up connectors in Beacon Work
description: Connect Marketplace MCP tools or add your own remote or local connector.
---

Connectors are MCP servers that provide tools to Beacon Work. A connector can come from an installed Marketplace plugin or be added for your own account.

## Connect a Marketplace connector

1. Install the plugin and select the connector in the install dialog. See [Install and manage plugins](/beacon/plugins/).
2. Open **Customize → Connectors**. Find the connector and choose **Connect**.
3. Follow the sign-in prompt. Depending on how the plugin is configured, enter a key or token, enter a username and password, or complete sign-in in your browser.
4. After connecting, Beacon reads the connector’s tools and shows its status and tool count on the connector card.

Connector credentials are kept encrypted on this Mac for your account; they are not stored in the plugin folder. When a connector uses a credential, Beacon sends it to the configured remote server or supplies it to the local connector process. Connect only to services and code you trust.

## Add a personal connector

1. Open **Customize → Connectors** and choose **Add connector**.
2. Enter a name for the connector.
3. For a remote server, enter its HTTPS server URL. Open **Advanced** to choose a transport (**Streamable HTTP** or **SSE (legacy)**), sign-in method, optional headers, and timeout.
4. For a local server, open **Advanced**, set **Transport** to **Local command**, enter the command, and put each argument on its own line.
5. Choose **Add**, then use **Connect** on the connector card if it needs credentials or OAuth sign-in.

Remote connectors support **None or OAuth**, **Bearer token**, and **Username and password** sign-in. With **None or OAuth**, Beacon can complete OAuth in your browser when the server requests it. For a server that does not register Beacon automatically, an advanced static OAuth client ID (and optional client secret) can be configured for a personal connector.

## Review and manage connector access

Open a connector’s card to review what it can do. You can turn off the whole connector or individual actions; an action that would otherwise run without asking can be set to **Always ask**. Beacon asks for approval before other connector tool calls. Review these choices before using the connector with a project.

From a personal connector’s menu, you can edit or remove it, change its key, sign in again, disconnect it, or turn it off. Changing a remote server’s origin clears its saved sign-in. Removing a connector deletes its saved credentials. A change to connector settings takes effect from a thread’s next message.

## Security: local connectors

A local connector runs on your Mac **outside the thread sandbox**, with your user permissions. It can read files you can access and reach the network. Only add a local command when you trust its code and understand what it does. Do not put passwords, API keys, or other secrets in the command, its arguments, or the project files; enter credentials through Beacon’s sign-in flow instead.

For a packaged connector’s MCP configuration and permission declarations, see [Build an MCP connector](/beacon/plugin-development/mcp-connectors/).
