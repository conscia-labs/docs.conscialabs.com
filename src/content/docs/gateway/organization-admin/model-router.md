---
title: Configure the Model Router
description: Configure organization rules for Gateway-managed model selection.
---

The Model Router controls `model: "auto"` for the organization. It uses an ordered rulebook to answer: which eligible public model should handle this request for this person or App?

## Configure the rulebook

1. Open **Organization Administration → Model Router → Rules**.
2. Create rules in the order they should be evaluated.
3. Define **who** is making the request: everyone, selected people, groups, Apps, App type, environment, or credential kind.
4. Define **what** the request requires: request kind, modality, token estimates, message or tool counts, streaming, context, structured output, or workload type.
5. Select **which AI Model** should handle a match, or choose automatic selection from eligible public models.
6. Test the rulebook and review the catch-all rule before enabling changes.

The first matching enabled rule wins. Rules can narrow or prioritize eligible models, but they cannot grant model access, bypass a credential restriction, or override an allowance.

## Keep a catch-all rule

An enabled rulebook has one catch-all rule. It is evaluated last and selects either a specific public model or automatic selection from eligible public models. It cannot be disabled or moved while the router is enabled.

If the selected model has no eligible route, the Gateway returns a no-route denial. The router does not switch to a different model because a route is unavailable.

## Simple and Advanced modes

Simple mode uses authenticated subject context and Gateway-derived request facts. It does not interpret prompt content before routing.

Advanced mode can use interpreted request attributes such as intent, domain, complexity, reasoning need, and expected output. It adds a separate interpretation request with its own latency and cost. Treat Advanced mode as Preview until the organization has approved its data boundary and operating behavior. Callers can opt down to Simple mode, but they cannot enable Advanced mode for the organization from an API request.

## Keep model and provider decisions separate

The Model Router selects a public AI Model. Preferred and fallback provider routes are configured on that model's operational page. Do not add provider names, provider-native IDs, provider credentials, or route identifiers to router rules.

Use the rule tester and diagnostics to review matched, skipped, disabled, unavailable, and winning rules. Confirm that the selected model remains available under current Model Access policies and allowances.
