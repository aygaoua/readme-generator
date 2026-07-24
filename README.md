# aygaoua-readme-generator

![License](https://img.shields.io/badge/License-MIT-yellow.svg)
![Node](https://img.shields.io/badge/Node-%3E%3D18-green.svg)
![npm](https://img.shields.io/npm/v/aygaoua-readme-generator.svg)

A smart CLI tool that generates professional `README.md` files by **auto-detecting** project info from `package.json` and git config — so you answer fewer questions.

## ✨ What's New in v1.7.0

- **🧪 Automated Testing Suite** — Added unit and integration tests covering Markdown generation, prompt logic, and JSON parsing.
- **🧹 Code Quality & Linting** — Integrated ESLint rules to enforce strict code formatting and quality standards across the codebase.
- **🚀 CI/CD & Secure Publishing** — Automated release pipelines via GitHub Actions with OIDC Trusted Publishing support for seamless npm releases.

---

## Features

- **Auto-detection** — Reads your `package.json` and git config to pre-fill project name, license, GitHub username, email, install & test commands.
- **3 README templates** — Minimal (clean & concise), Standard (balanced), Detailed (full-featured with Features, Roadmap, Acknowledgments).
- **Emoji section headers** — Optionally prefix headings with thematic emoji (🚀 Installation, 📜 License, etc.).
- **Inline preview** — Previews the generated markdown directly in the terminal before writing to disk.
- **Input validation & Overwrite protection** — Validates required fields/emails and warns before replacing existing files.
- **Custom output filename** — Choose any `.md` filename you want.
- **License badges** — Automatically adds a Shields.io badge matching your project license.
- **Dynamic sections** — Skips sections like Tests if no command is detected.
- **Interactive CLI UI** — Powered by Chalk and ora spinners for a polished terminal experience.

---

## Installation

```bash
npm install -g aygaoua-readme-generator
