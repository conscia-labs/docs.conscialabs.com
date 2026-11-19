---
title: Build a Beacon Work plugin
description: Package skills, MCP connectors, and sub-agents into a plugin for the Beacon Marketplace.
---

Package skills, MCP connectors, or sub-agents for the Beacon Marketplace. Start with a folder and its manifest. Add at least one installable component, then upload and test it. You can include shared files too. Beacon Work doesn’t install commands listed in a plugin yet.

## Create the plugin folder

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

`beacon-plugin.json` can also declare connector authentication and tools, plugin dependencies, and required applications. The [MCP connector guide](/beacon/plugin-development/mcp-connectors/) explains those settings.

## Choose a component

<div class="conscia-path-grid">
  <article class="conscia-path-card">
    <h3><a href="/beacon/plugin-development/skills/">Skill</a></h3>
    <p>Use a skill when you want Beacon’s agent to follow reusable instructions for a matching task.</p>
  </article>
  <article class="conscia-path-card">
    <h3><a href="/beacon/plugin-development/mcp-connectors/">MCP connector</a></h3>
    <p>Add tools from a remote service or a local server, with authentication and approval behavior declared in the plugin.</p>
  </article>
  <article class="conscia-path-card">
    <h3><a href="/beacon/plugin-development/sub-agents/">Sub-agent</a></h3>
    <p>Use a sub-agent when a task benefits from a focused specialist with its own instructions.</p>
  </article>
</div>

A package can include supporting files under `servers/`, `scripts/`, `lib/`, `src/`, `assets/`, or `docs/`. Beacon excludes or rejects unsupported files, symbolic links, and plugin hooks. Keep the package to the documented structure; the Marketplace upload dialog lists files that will be included or left out before it sends anything.

## Upload, install, and test

1. In Beacon Work, open **Marketplace → My uploads** and choose **Upload new item**.
2. Choose your plugin folder. Review the included and excluded files, names, sizes, and total before submitting.
3. Submit the upload. Beacon checks the package and shows its status in **My uploads**. Your upload is private until an administrator approves it; you can open and install your own pending item from **My uploads**.
4. Install your item and test its skills and agents in a test project folder. If it includes connectors, test their authentication and permissions in **Customize → Connectors**.
5. To share a revision, increase `version` in `plugin.json` and choose **Upload a new version**. Each new version is reviewed before it appears in Browse.

Beacon Work doesn’t support a general local install command. Upload the folder through Marketplace, then install it there. To connect a plugin’s MCP server, follow [Set up connectors](/beacon/connectors/).
