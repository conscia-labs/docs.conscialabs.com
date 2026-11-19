---
title: Work with projects and Workspaces in Beacon Work
description: Use local project folders and Workspaces to organize Beacon Work threads.
---

A **project** is the local folder a thread works in. A **Workspace** is a device-local shortcut to an existing folder. Beacon Work doesn’t sync local folders or threads to Beacon Cloud.

## Choose a folder

| If you want to… | Choose… |
| --- | --- |
| Start a thread in your default thread folder | **No workspace**. By default, Beacon creates a folder under `~/Beacon/<title>`; if you configured another thread folder, it uses that location. |
| Reuse an existing local folder | Select its **Workspace**. Create one first if the folder does not have a Workspace yet. |

## Start a thread in that folder

1. Choose **New thread**.
2. Choose **No workspace** or select the Workspace you want to use.
3. Choose **Discuss** or **Work**, then send your message. Beacon creates the thread in the folder you chose.

Discuss is read-only. Work can edit files within the thread folder and run approved work there. Actions outside that folder, network access, and connector actions can require your approval.

## Create a Workspace

A Workspace gives an existing local folder a name you can choose when starting a thread.

1. Choose **New Workspace** in the sidebar, or choose **Create Workspace** from the Workspace menu in the new-thread composer.
2. Enter a Workspace name and choose an existing folder on your Mac.
3. Choose **Create Workspace**. New threads that use it work in that folder. Choose **Discuss** or **Work** in the composer, or use your saved default.

A Workspace keeps the folder you chose. To use a different folder, create another Workspace.

## Rename or remove a Workspace

Rename a Workspace from its sidebar menu. To remove one, choose **Remove Workspace** and confirm. Beacon forgets the Workspace mapping only: the folder, its files, and its threads remain on disk. Those threads are listed under the folder’s name after the Workspace is removed.

## Manage threads

Use a thread’s **More** menu to rename, pin, archive, fork, or delete it. Deleting a thread removes Beacon’s local thread state and transcript; it does not delete files in the project folder. An active thread cannot be archived, and a thread can only be forked when it is idle and has an agent session.

The thread’s **Details** panel shows a local Git summary. Refreshing it reads repository state without fetching or running Git hooks. **Commit**, **Push**, and **Initialize** are explicit actions in Work; they run as ordinary approved turns. Beacon does not commit, push, or roll back project changes automatically.

Start with [Get started with Beacon Work](/beacon/get-started/). To use MCP tools in a project, [set up connectors](/beacon/connectors/).
