---
title: Build an MCP connector for Beacon Work
description: Declare a remote or local MCP server in a plugin and configure its authentication and tool approvals.
---

An MCP connector gives Beacon Work access to server tools. Declare each one in both `.mcp.json` and `beacon-plugin.json`. Beacon rejects the plugin if either file omits it.

## Choose a server type

| Choose… | When… |
| --- | --- |
| A remote server | The MCP service is already reachable over a fixed HTTPS URL. Configure no authentication, a user-supplied API key, or the remote server’s OAuth flow. |
| A local server | The plugin should include the server code and run it on the user’s Mac. Review its access carefully: local servers run outside the thread sandbox. |

## Configure a remote server

Use a fixed HTTPS URL and choose Streamable HTTP (`http`) or legacy SSE (`sse`) in `.mcp.json`:

```json
{
  "mcpServers": {
    "knowledge": {
      "type": "http",
      "url": "https://mcp.example.com/mcp"
    }
  }
}
```

Declare the connector and its tool permissions in `beacon-plugin.json`:

```json
{
  "title": "Project Knowledge",
  "connectors": {
    "knowledge": {
      "auth": "none",
      "tools": ["search", "get_record"],
      "readTools": ["search", "get_record"]
    }
  }
}
```

`tools` must list every tool the server provides. `readTools` must be a subset and should contain only tools that cannot change or send data. A listed read-only tool can run without asking; other connector tool calls require approval. Users can turn off actions or make them always ask in **Customize → Connectors**.

### Add user-supplied API keys

Do not put a real key or token in the plugin. Declare a field in `beacon-plugin.json`, then use its placeholder in `.mcp.json`:

```json
{
  "connectors": {
    "knowledge": {
      "auth": "key",
      "fields": [
        { "name": "TOKEN", "label": "API token", "secret": true }
      ],
      "tools": ["search", "update_record"],
      "readTools": ["search"]
    }
  }
}
```

```json
{
  "mcpServers": {
    "knowledge": {
      "type": "http",
      "url": "https://mcp.example.com/mcp",
      "headers": { "Authorization": "Bearer ${TOKEN}" }
    }
  }
}
```

The user enters the secret through Beacon Work’s connector flow. Beacon keeps it encrypted on that Mac and fills in the placeholder when a thread starts the connector. Each declared field must be used, and a connector’s header or environment value can contain at most one placeholder.

### Use remote OAuth

For a remote connector that supports OAuth, set `"auth": "oauth"` in `beacon-plugin.json`; do not set an `Authorization` header or an OAuth server in the plugin. Beacon opens the remote server’s sign-in flow when the user chooses **Connect**.

## Package a local server

A local connector runs code included in the plugin on the user’s Mac. Put its source in `servers/`, `scripts/`, `lib/`, or `src/`, and use only `python` or `bun` as the command. For example:

```json
{
  "mcpServers": {
    "notes": {
      "command": "bun",
      "args": ["${CLAUDE_PLUGIN_ROOT}/servers/notes.ts"]
    }
  }
}
```

Use a `.py` file with `python`, or a `.ts`, `.tsx`, `.js`, `.jsx`, `.mjs`, or `.cjs` file with `bun`. Beacon refuses launch methods that download code at runtime, including `npx`, `uvx`, and `bun x`; include the server code in the package instead.

**Security boundary:** local MCP servers run outside the thread sandbox with the user’s Mac permissions. They can read files available to that user and access the network. Keep the server small, review its behavior, and explain clearly what it accesses before sharing the plugin.

### Configure local OAuth

A local server that needs OAuth must declare a public client ID, HTTPS authorization and token endpoints, and the required scopes in `beacon-plugin.json`:

```json
{
  "connectors": {
    "graph": {
      "auth": "oauth",
      "clientId": "YOUR_PUBLIC_CLIENT_ID",
      "server": {
        "authorizationEndpoint": "https://login.example.com/authorize",
        "tokenEndpoint": "https://login.example.com/token",
        "scopes": ["offline_access", "Mail.Read"]
      },
      "tools": ["mail_list"],
      "readTools": ["mail_list"]
    }
  }
}
```

Set `${OAUTH_TOKEN}` in the connector’s `env` in `.mcp.json`:

```json
{
  "mcpServers": {
    "graph": {
      "command": "bun",
      "args": ["${CLAUDE_PLUGIN_ROOT}/servers/graph.ts"],
      "env": { "OAUTH_TOKEN": "${OAUTH_TOKEN}" }
    }
  }
}
```

Register `http://127.0.0.1/callback` as the public client’s redirect URI. Beacon signs the user in and keeps the grant encrypted. It supplies a fresh access token to the local connector. Never include a user’s refresh token or a client secret in the plugin. For a remote OAuth server, use the remote flow above. Local OAuth is advanced. Test browser sign-in with the Beacon Work build you plan to use.

## Validate connector declarations

- Every `.mcp.json` connector name must also appear under `beacon-plugin.json.connectors`, and vice versa.
- Use only fixed HTTPS URLs for remote connectors; put credentials in declared placeholders, not the URL.
- Keep `readTools` limited to truly read-only tools.
- Remember that connector selections are off by default in the install dialog; users can choose them separately from skills and agents.
- Connector grouping with optional `capabilities` is version-sensitive. The current product does not publish a minimum Beacon Work version for it; verify target-version support before using it.

For a user’s sign-in and permission steps, see [Set up connectors in Beacon Work](/beacon/connectors/).
