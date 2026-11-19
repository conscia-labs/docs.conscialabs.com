---
title: Build a skill for Beacon Work
description: Write a SKILL.md with clear instructions and package it in a Beacon plugin.
---

Use a skill when you want Beacon Work’s agent to follow a repeatable workflow for matching tasks. A skill is a folder of instructions and supporting files; its description tells the agent when to apply them.

## Create the skill folder

Add one folder per skill under `skills/`. The folder name must start with a letter or number and contain only letters, numbers, dots, underscores, or hyphens (up to 64 characters).

```text
my-plugin/
  .claude-plugin/plugin.json
  skills/
    project-brief/
      SKILL.md
      examples.md
```

Use simple `key: value` frontmatter in `SKILL.md`. Start with `name` and a one-sentence `description` that says when the agent should use the skill:

```markdown
---
name: project-brief
description: Use when the person asks for a concise brief about a local project.
---

# Create a project brief

Read the relevant project files, then summarize the goal, current status, decisions, and open questions. Cite the files you used.
```

Beacon accepts a defined set of frontmatter keys: `name`, `description`, `license`, `metadata`, `version`, `when_to_use`, `argument-hint`, `disable-model-invocation`, and `user-invocable`. Keep frontmatter to plain `key: value` lines; avoid YAML blocks or nested structures. When referencing a bundled file, use the skill folder’s name in its `${CLAUDE_PLUGIN_ROOT}` path.

## Include supporting files

You can include references or other files the skill instructions need. Refer to a bundled file with its path under the plugin root, for example:

```text
${CLAUDE_PLUGIN_ROOT}/skills/project-brief/examples.md
```

For a standalone skill uploaded directly, Beacon Work wraps the folder as a plugin and asks for the Marketplace name and metadata. Keep any `${CLAUDE_PLUGIN_ROOT}` references consistent with the skill name you enter: renaming a standalone skill during upload changes the expected folder path.

Beacon leaves out hidden files and folders (except the recognized plugin metadata files), development folders such as `node_modules` and `.venv`, and other unsupported entries. Symbolic links are rejected. Review the upload dialog’s file list before submitting.

To include MCP tools or a sub-agent, add those components to the plugin; see [Build an MCP connector](/beacon/plugin-development/mcp-connectors/) and [Build a sub-agent](/beacon/plugin-development/sub-agents/).
