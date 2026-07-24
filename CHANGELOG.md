# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.8.0] - 2026-07-24

### Added
- `CODE_OF_CONDUCT.md` (Contributor Covenant v2.1) for community standards
- `socket.yml` configuration for socket.dev supply chain security monitoring
- Dependency Review GitHub Actions workflow to scan PRs for risky dependency changes
- OpenSSF Scorecard workflow for automated security assessments

### Changed
- Fixed Dependabot configuration with proper `npm` and `github-actions` package ecosystems
- Expanded README with comprehensive documentation, badges, and full usage guide
- Updated CI workflow to include linting step

### Security
- Enhanced supply chain security posture with automated dependency review
- Added OpenSSF Scorecard integration for continuous security scoring

## [1.7.0] - 2026-02-24

### Added
- GitHub release-based npm publish workflow with OIDC Trusted Publishing
- CodeQL Advanced analysis workflow for automated vulnerability scanning

### Changed
- Updated publish workflow to use Node.js 24.x
- Streamlined CI/CD pipeline with provenance-enabled publishing

## [1.6.0] - 2026-02-20

### Added
- Automated testing suite covering Markdown generation, prompt logic, and JSON parsing
- ESLint integration with strict code formatting and quality standards
- `prepublishOnly` script to run lint and tests before publishing

### Changed
- Improved code quality across the entire codebase with ESLint enforcement

## [1.5.0] - 2026-02-18

### Added
- Inline terminal preview of generated markdown before writing to disk
- Dynamic sections that skip Tests section when no command is detected
- Custom output filename support with `.md` validation

### Changed
- Enhanced input validation for required fields and email format
- Improved overwrite protection with confirmation prompt

## [1.4.0] - 2026-02-17

### Added
- Three README templates: Minimal, Standard, and Detailed
- Emoji section headers option for thematic heading prefixes
- License badges with automatic Shields.io badge generation

### Changed
- Expanded license support to include Apache 2.0, GPL 3.0, and BSD 3-Clause
- Improved auto-detection of project info from git config

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
