# aygaoua-readme-generator

![License](https://img.shields.io/badge/License-MIT-yellow.svg)
![Node](https://img.shields.io/badge/Node-%3E%3D18-green.svg)
![npm](https://img.shields.io/npm/v/aygaoua-readme-generator.svg)

A smart CLI tool that generates professional README.md files by **auto-detecting** project info from `package.json` and git config — so you answer fewer questions.

## ✨ What's New in v1.6

- **🎨 Colorful CLI** — Styled banner, colored output, and animated spinner
- **📋 Template Selection** — Choose Minimal, Standard, or Detailed README styles
- **😎 Emoji Headers** — Optional emoji prefixes on section headings
- **👀 Inline Preview** — See your README before it's written to disk
- **📜 More Licenses** — ISC, MPL-2.0, LGPL-2.1, Unlicense added

## Features

- **Auto-detection** — Reads your `package.json` and git config to pre-fill project name, license, GitHub username, email, install & test commands.
- **3 README templates** — Minimal (clean & concise), Standard (balanced), Detailed (full-featured with Features, Roadmap, Acknowledgments).
- **Emoji section headers** — Optionally prefix headings with thematic emoji (🚀 Installation, 📜 License, etc.).
- **Inline preview** — Previews the first 20 lines of your README in the terminal before writing.
- **Input validation** — Ensures required fields are filled and emails are valid.
- **Overwrite protection** — Warns before replacing an existing file.
- **Custom output filename** — Choose any `.md` filename you want.
- **License badges** — Automatically adds a shields.io badge matching your license.
- **Dynamic sections** — Skips the Tests section if no test command is detected.
- **Animated spinner** — Smooth loading animation while generating.
- **Colored output** — Beautiful chalk-powered CLI experience.

## Installation

```bash
npm install -g aygaoua-readme-generator
```

Or run it directly with `npx`:

```bash
npx aygaoua-readme-generator
```

## Usage

Navigate to the root of your project (where `package.json` lives) and run:

```bash
readme-gen
```

The tool will:

1. Show a styled banner.
2. Auto-detect project info from `package.json` and git config.
3. Display what it found in a colored summary.
4. Ask only the questions it couldn't answer automatically.
5. Let you pick a template (Minimal / Standard / Detailed) and toggle emoji headers.
6. Show an inline preview of the generated markdown.
7. Generate a polished `README.md` (or any filename you choose) with a spinner animation.

### CLI Options

| Flag              | Description                 |
| ----------------- | --------------------------- |
| `-h`, `--help`    | Show help message           |
| `-v`, `--version` | Show version number         |
| `--no-preview`    | Skip the inline preview     |

### Templates

| Template   | Description                                                        |
| ---------- | ------------------------------------------------------------------ |
| 📋 Standard | Balanced — Title, badges, TOC, Install, Usage, License, Contributing, Tests, Questions |
| 📄 Minimal  | Clean & concise — Title, badges, blockquote description, Install, Usage, License, Contributing, Tests, Questions |
| 📚 Detailed | Full-featured — Everything in Standard + Features, Roadmap, Acknowledgments |

## Example Output

The generated README includes these sections (depending on template):

- **Title** with license badge
- **Description** (blockquote in Minimal, heading in Standard/Detailed)
- **Features** *(Detailed only)*
- **Table of Contents** *(Standard + Detailed)*
- **Installation** (with code block)
- **Usage**
- **License**
- **Contributing**
- **Tests** (with code block, if applicable)
- **Questions** (with email + GitHub link)
- **Roadmap** *(Detailed only)*
- **Acknowledgments** *(Detailed only)*

## Supported Licenses

MIT · Apache-2.0 · GPL-3.0 · BSD-3-Clause · ISC · MPL-2.0 · LGPL-2.1 · Unlicense · None

## License

This project is licensed under the **MIT** license.

## Contributing

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add my feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

## Questions

For questions or issues, open an issue on [GitHub](https://github.com/aygaoua/readme-generator/issues).
