/**
 * Safely read and parse a JSON file.
 * @param filePath - Absolute path to the JSON file.
 * @returns The parsed object, or `null` on failure.
 */
export declare function readJSON(filePath: string): Record<string, unknown> | null;

/**
 * Read a value from the local git config.
 * @param key - The git config key (e.g. `"user.email"`).
 * @returns The config value, or an empty string if unavailable.
 */
export declare function gitConfig(key: string): string;

/**
 * Extract the GitHub username from the `origin` remote URL.
 * @returns The GitHub username, or an empty string if unavailable.
 */
export declare function getGitHubUser(): string;

/** Project info auto-detected from the current directory. */
export interface ProjectInfo {
  title: string;
  description: string;
  license: string;
  installation: string;
  tests: string;
  github: string;
  email: string;
  author: string;
}

/**
 * Detect project info from `package.json` and git config in the current directory.
 */
export declare function detectProjectInfo(): ProjectInfo;

/** Data used to generate a README. */
export interface ReadmeData {
  title: string;
  description: string;
  license: string;
  installation: string;
  usage: string;
  contributing: string;
  tests: string;
  email: string;
  github: string;
}

/**
 * Generate a Markdown README string from the given data.
 */
export declare function generateMarkdown(data: ReadmeData): string;

/** An Inquirer question descriptor. */
export interface Question {
  type: string;
  name: string;
  message: string;
  default?: unknown;
  choices?: string[];
  validate?: (value: string) => true | string;
}

/**
 * Build the list of interactive prompts, skipping any fields already detected.
 */
export declare function buildQuestions(detected: Partial<ProjectInfo>): Question[];
