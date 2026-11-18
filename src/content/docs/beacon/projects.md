---
title: Work with projects and Workspaces in Beacon Work
description: Use local project folders and Workspaces to organize Beacon Work threads.
---

Beacon Work works in local folders. A **project** is the folder a thread works in; a **Workspace** is a named, device-local shortcut to an existing folder. A Workspace is not a cloud project, and Beacon Work does not sync its folder or threads to Beacon Cloud.

## Start in a project folder

1. Choose **New thread**.
2. Leave the Workspace choice at **No workspace** to use your default thread folder, or select a Workspace.
3. Choose **Discuss** or **Work**, write your first message, and send it. Beacon creates the thread on the first send. By default, it creates a folder under `~/Beacon/` using the thread title; if you configured another thread folder, Beacon uses that location instead.

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

For your first thread, see [Get started with Beacon Work](/beacon/get-started/). To connect tools used by a project, see [Set up connectors](/beacon/connectors/).
