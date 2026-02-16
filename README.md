# aygaoua-readme-generator

![License](https://img.shields.io/badge/License-MIT-yellow.svg)
![Node](https://img.shields.io/badge/Node-%3E%3D16-green.svg)
![npm](https://img.shields.io/npm/v/aygaoua-readme-generator.svg)

A smart CLI tool that generates professional README.md files by **auto-detecting** project info from `package.json` and git config — so you answer fewer questions.

## Features

- **Auto-detection** — Reads your `package.json` and git config to pre-fill project name, license, GitHub username, email, install & test commands.
- **Input validation** — Ensures required fields are filled and emails are valid.
- **Overwrite protection** — Warns before replacing an existing file.
- **Custom output filename** — Choose any `.md` filename you want.
- **License badges** — Automatically adds a shield.io badge matching your license.
- **Dynamic sections** — Skips the Tests section if no test command is detected.

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

1. Auto-detect project info from `package.json` and git config.
2. Show you what it found.
3. Ask only the questions it couldn't answer automatically.
4. Generate a polished `README.md` (or any filename you choose).

### CLI Options

| Flag              | Description           |
| ----------------- | --------------------- |
| `-h`, `--help`    | Show help message     |
| `-v`, `--version` | Show version number   |

## Example Output

The generated README includes these sections:

- **Title** with license badge
- **Description**
- **Table of Contents**
- **Installation** (with code block)
- **Usage**
- **License**
- **Contributing**
- **Tests** (with code block, if applicable)
- **Questions** (with email + GitHub link)

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
# readme-generator
