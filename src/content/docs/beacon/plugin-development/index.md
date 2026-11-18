---
title: Build a Beacon Work plugin
description: Package skills, MCP connectors, and sub-agents into a plugin for the Beacon Marketplace.
---

A Beacon Work plugin is a folder that packages one or more extension components for the Marketplace. You can include skills, MCP connectors, and sub-agents; a plugin can also hold shared files those components use. Each package needs at least one component. Commands can be listed in a package, but Beacon Work does not install them yet, so build at least one skill, connector, or sub-agent for an installable plugin.

## Start with this folder structure

```text
my-plugin/
  .claude-plugin/
    plugin.json
  beacon-plugin.json       # optional Marketplace metadata and connector settings
  README.md                # optional description shown on the Marketplace item
  skills/
    project-brief/
      SKILL.md
  agents/
    reviewer.agent.md
  .mcp.json                # only if the plugin includes MCP connectors
  servers/                 # local connector code, if needed
```

The plugin manifest `.claude-plugin/plugin.json` requires a name, version, and description:

```json
{
  "name": "project-brief",
  "version": "1.0.0",
  "description": "Create a concise project brief from local project files."
}
```

Use a 2–63 character name of lowercase letters, numbers, and hyphens, starting with a letter or number; use a semantic version such as `1.0.0`; and keep the description between 1 and 300 characters. Optional `plugin.json` keys are `author`, `homepage`, `repository`, `license`, and `keywords`. Other keys are rejected. Connector configuration belongs in `.mcp.json` and `beacon-plugin.json`, not `plugin.json`.

`beacon-plugin.json` can provide Marketplace metadata:

```json
{
  "title": "Project Brief",
  "tags": ["planning", "writing"]
}
```

Its optional fields can also declare connector authentication and tools, dependencies on other Marketplace plugins, and required applications. See [Build an MCP connector](/beacon/plugin-development/mcp-connectors/) for connector declarations.

## Add plugin components

- [Build a skill](/beacon/plugin-development/skills/) — instructions the agent uses when a task matches the skill description.
- [Build an MCP connector](/beacon/plugin-development/mcp-connectors/) — remote or local server tools with explicit authentication and approval behavior.
- [Build a sub-agent](/beacon/plugin-development/sub-agents/) — a specialist instruction file at `agents/<name>.agent.md`.

A package can include supporting files under `servers/`, `scripts/`, `lib/`, `src/`, `assets/`, or `docs/`. Beacon excludes or rejects unsupported files, symbolic links, and plugin hooks. Keep the package to the documented structure; the Marketplace upload dialog lists files that will be included or left out before it sends anything.

## Upload and test your plugin

1. In Beacon Work, open **Marketplace → My uploads** and choose **Upload new item**.
2. Choose your plugin folder. Review the included and excluded files, names, sizes, and total before submitting.
3. Submit the upload. Beacon checks the package and shows its status in **My uploads**. Your upload is private until an administrator approves it; you can open and install your own pending item from **My uploads**.
4. Install your item and test its skills and agents in a test project folder. If it includes connectors, test their authentication and permissions in **Customize → Connectors**.
5. To share a revision, increase `version` in `plugin.json` and choose **Upload a new version**. Each new version is reviewed before it appears in Browse.

Beacon does not provide a general local plugin install command. Use the Marketplace upload and install flow rather than manually zipping the folder. For connector security and user setup, see [Set up connectors](/beacon/connectors/).
