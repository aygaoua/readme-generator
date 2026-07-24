# aygaoua-readme-generator

[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node](https://img.shields.io/badge/Node-%3E%3D18-green.svg)](https://nodejs.org/)
[![npm](https://img.shields.io/npm/v/aygaoua-readme-generator.svg)](https://www.npmjs.com/package/aygaoua-readme-generator)
[![CI](https://github.com/aygaoua/readme-generator/actions/workflows/ci.yml/badge.svg)](https://github.com/aygaoua/readme-generator/actions/workflows/ci.yml)
[![CodeQL](https://github.com/aygaoua/readme-generator/actions/workflows/codeql.yml/badge.svg)](https://github.com/aygaoua/readme-generator/actions/workflows/codeql.yml)
[![Socket Badge](https://socket.dev/api/badge/npm/package/aygaoua-readme-generator)](https://socket.dev/npm/package/aygaoua-readme-generator)

A smart CLI tool that generates professional `README.md` files by **auto-detecting** project info from `package.json` and git config — so you answer fewer questions.

---

## ✨ What's New in v1.8.0

- **🔒 Supply Chain Security** — Added dependency review workflow, OpenSSF Scorecard, and socket.yml configuration.
- **📋 Code of Conduct** — Adopted Contributor Covenant v2.1 for community standards.
- **🔧 Dependabot Fixes** — Properly configured Dependabot for npm and GitHub Actions ecosystems.
- **📝 Complete Changelog** — Full version history from v1.0.0 to v1.8.0.

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
- **Interactive CLI UI** — Powered by Inquirer for a polished terminal experience.

---

## Installation

```bash
npm install -g aygaoua-readme-generator
```

Or use it directly with `npx`:

```bash
npx aygaoua-readme-generator
```

### Requirements

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0

---

## Usage

Navigate to your project directory and run:

```bash
readme-gen
```

The tool will:

1. **Auto-detect** your project name, description, license, GitHub username, email, and test commands from `package.json` and `.git/config`.
2. **Prompt** you only for information it couldn't detect.
3. **Generate** a polished `README.md` with proper formatting, badges, and table of contents.

### CLI Options

| Flag | Description |
|------|-------------|
| `-v`, `--version` | Show version number |
| `-h`, `--help` | Show help message |

### Example Output

The generated README includes:

- **License badge** from Shields.io
- **Table of Contents** with anchor links
- **Description**, **Installation**, **Usage** sections
- **Contributing guidelines** and **Questions** with your contact info
- **Tests section** (only if a test command is detected)

---

## Supported Licenses

| License | Badge Color |
|---------|-------------|
| MIT | Yellow |
| Apache-2.0 | Blue |
| GPL-3.0 | Red |
| BSD-3-Clause | Orange |
| None | No badge |

---

## Development

### Setup

```bash
git clone https://github.com/aygaoua/readme-generator.git
cd readme-generator
npm install
```

### Testing

```bash
npm test
```

Runs 19 unit tests using Node.js built-in test runner covering:

- Markdown generation and section rendering
- Prompt logic and auto-detection skipping
- Input validation (email format, filename)
- JSON parsing and error handling

### Linting

```bash
npm run lint
```

Uses ESLint with strict rules for code quality.

---

## Security

This project takes security seriously:

- **Provenance** — All npm releases include provenance attestations via OIDC Trusted Publishing
- **CodeQL** — Automated vulnerability scanning on every push and PR
- **Dependency Review** — PRs are scanned for risky dependency changes
- **OpenSSF Scorecard** — Continuous security scoring and assessment
- **Socket.dev** — Real-time supply chain security monitoring

For vulnerability reports, see [SECURITY.md](SECURITY.md).

---

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) before getting started.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Run tests: `npm test`
4. Submit a Pull Request

---

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a complete list of changes across all versions.

---

## License

This project is licensed under the **MIT** license — see the [LICENSE](LICENSE) file for details.

---

## Author

**aygaoua** — [GitHub](https://github.com/aygaoua) · [Email](mailto:zgaoua72@gmail.com)
