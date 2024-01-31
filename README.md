# ai-tools

ChatGPT with extra steps [Live](https://ai.emeibech.com).

## Table of contents

- [Summary](#summary)
- [Technologies](#technologies)
- [Features](#features)
- [Screenshots](#screenshots)
- [Install](#install)
- [Usage](#usage)

## Summary

A collection of tools and chatbots powered by OpenAI API. The purpose of this app is to create an environment similar to ChatGPT and to customize temperature and system content to create specialized tools that provides a more consistent result while also removing the neccessity of repeated prompting for the same task.

## Technologies

<img width="80" src="https://www.svgrepo.com/show/452092/react.svg" alt="React logo">
<img width="80" src="https://www.svgrepo.com/show/374146/typescript-official.svg" alt="Typescript logo">
<img width="80" src="https://www.svgrepo.com/show/452093/redux.svg" alt="Redux logo">
<img width="80" src="https://vitejs.dev/logo.svg" alt="Vite logo">

## Features

- Fast, responsive, accessible, and clean UI
- Dark mode/Light mode toggler
- Chatbots automatically create conversation history when submitting the first query and generates an appropriate title
- Coding Assistant implements syntax highlighter to easily distinguish code blocks
- Provision for higher context (16k) and GPT-4 model when using Coding Assistant
- Rate limiter and the capability to override it
- Priority over free users of ChatGPT during peak hours

## Screenshots

<span align="center">
  <img alt="Story Generator screenchot" src="/screenshots/story-gen.png" width="720" height="405">
  <img alt="Coding Assistant screenshot" src="/screenshots/code-assistant.png" width="720" height="405">
</span>
<img alt="Desktop screenshot" src="/screenshots/desktop-home.png" width="720" height="405">

## Install

**You need Git and NPM installed.**

Clone the repo

```bash
git clone https://github.com/emeibech/ai-tools.git
```

Install dependencies

```bash
npm install
```

Run dev server

```bash
npm run dev
```

## Usage

Although the app will run, it is only the frontend and will require a couple of things for it to actually be useful. First, you need to create a .env.local file and fill it with the values outlined in the .env.local.example. Now the hard part, you're going to need a server and a postgres db. You can clone my server [here](https://github.com/emeibech/express-server) and follow the instructions there.
