---
tags: ["ai"]
pubDate: "2025-04-22"
title: "AI Updates - April 2025 - 2nd Edition"
author: Christian Köberl
image: "./images/robot-launch.jpg"
summary: "Busy OpenAI weeks: GPT-4.1, o3 and o4-mini, OpenAI Codex CLI and rumors about OpenAI buying Windsurf. Google launches Gemini 2.5 Flash, and PocketFlow is a minimalistic framework for building AI agents."
---

## New AI models: GPT-4.1, o3 and o4-mini + Gemini 2.5 Flash

Many new AI models have been released in the last two weeks, including:

- **GPT-4.1**: OpenAI launched the newest version of the GPT-4 series - it now also has 1M token window and scores better than GPT-4o and GPT-4.5 on coding benchmarks. This model is API only - cannot be used in ChatGPT and it's already available on Azure OpenAI. See [Introducing GPT-4.1 in the API](https://openai.com/index/gpt-4-1/). OpenAI also provided a [guide for prompting GPT-4.1](https://cookbook.openai.com/examples/gpt4-1_prompting_guide).

- **o3** and **o4-mini**: according to OpenAI these are the "smartest and most capable models to date with full tool access". Models are available in ChatGPT and API and via Azure OpenAI.
  See [Introducing OpenAI o3 and o4-mini](https://openai.com/index/introducing-o3-and-o4-mini/).

- **Gemini 2.5 Flash**: Google has launched a faster and smaller version of Gemini 2.5 Pro. You can configure how much it should think. It's a little bit more expensive than 2.0 Flash but still very cheap. See [Start building with Gemini 2.5 Flash](https://developers.googleblog.com/en/start-building-with-gemini-25-flash/).

## OpenAI Codex CLI

OpenAI was very busy in the last two weeks and also launched [OpenAI Codex CLI](https://help.openai.com/en/articles/11096431-openai-codex-cli-getting-started) - a tool to use your LLM models directly in your terminal. The tool is very similar to [Claude Code](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview).

## OpenAI buys Windsurf?

OpenAI is rumored to have offered to buy Windsurf for $3 billion after failing to acquire Cursor. [Windsurf](https://windsurf.com/) is an AI-powered IDE based on VSCode similar to VSCode with GitHub Copilot. We will see how this will play out.

## PocketFlow

[PocketFlow](https://the-pocket.github.io/PocketFlow/) is a minimalistic framework for building AI agents - the core is only 100 lines Python. The authors says that other frameworks like LangChain, LlamaIndex, etc. are too bloated. They also provide an example that generated documentation for any Git(Hub) repository: https://github.com/The-Pocket/Tutorial-Codebase-Knowledge
