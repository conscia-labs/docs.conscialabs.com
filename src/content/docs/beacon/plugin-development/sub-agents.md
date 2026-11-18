---
title: Build a sub-agent for Beacon Work
description: Add an agents/<name>.agent.md specialist to a Beacon Work plugin.
---

A sub-agent is a specialist that Beacon Work’s main agent can ask to handle a focused part of a task. Add one Markdown file per agent at `agents/<name>.agent.md` in your plugin.

```text
my-plugin/
  .claude-plugin/plugin.json
  agents/
    reviewer.agent.md
```

Use frontmatter with a `name` matching the filename, a `description` that says when to use the agent, and optional `tools`:

```markdown
---
name: reviewer
description: Reviews a code change for bugs and missing tests. Use after implementation.
tools: Read, Grep, Glob
---

Review the changed files. Look for correctness issues and missing tests. Report each finding with its file and line number. Do not edit files.
```

The frontmatter must contain the matching `name` and a nonempty `description`; the text after the frontmatter must contain instructions. `tools` is optional and can be a comma-separated string or a list. If the description contains `: ` or ` #`, starts with a sign such as `-` or `[`, or otherwise looks like YAML syntax, quote the value.

Do not set `model` or other unsupported keys. Beacon runs the sub-agent on the thread’s model; unknown frontmatter keys are rejected. The filename and name can contain letters, numbers, dots, underscores, and hyphens, and must start with a letter or number.

## What permissions the sub-agent has

A sub-agent cannot expand the permissions of its thread. It inherits the thread’s mode, tool restrictions, and approvals. For example, a sub-agent in Discuss remains read-only, and listing `Write` or `Bash` in `tools` does not override the thread’s limits or approval prompts.

For the rest of the plugin structure and Marketplace upload steps, see [Build a Beacon Work plugin](/beacon/plugin-development/).
