# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0] - 2026-02-16

### Added
- ESLint configuration for code quality
- `.editorconfig` for consistent formatting
- `CHANGELOG.md` following Keep a Changelog format
- npm provenance on publish (links package to source commit)

### Changed
- Publish now uses `--provenance` flag for supply chain security

## [1.2.0] - 2026-02-16

### Added
- GitHub Actions CI workflow (Node 18, 20, 22)
- Provenance-enabled npm publish workflow
- 19 unit tests using Node.js built-in test runner
- TypeScript type declarations (`index.d.ts`)
- `SECURITY.md` vulnerability disclosure policy
- `CONTRIBUTING.md` with development guide
- `prepublishOnly` script to run tests before publish
- `exports` field in `package.json`

### Changed
- Pinned dependency versions (removed `^` prefix)
- Bumped minimum Node.js engine to `>=18`

## [1.1.0] - 2026-02-16

### Added
- Auto-detection of project info from `package.json` and git config
- Input validation (required fields, email format)
- Overwrite protection with confirmation prompt
- Custom output filename support
- `--help` and `--version` CLI flags
- `bin` field for CLI usage (`readme-gen`)
- npm package metadata (keywords, repository, bugs, homepage)
- `README.md`, `LICENSE` (MIT), `.gitignore`

### Changed
- Reduced number of questions by auto-detecting answers
- Dynamic Table of Contents and optional Tests section
- Standardized license identifiers (SPDX)

## [1.0.0] - 2026-02-16

### Added
- Initial release
- Interactive CLI questionnaire with 9 prompts
- Markdown README generation with license badge
- Support for MIT, Apache 2.0, GPL 3.0, BSD 3, None licenses
