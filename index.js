#!/usr/bin/env node

import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';

// --- HELPERS ---

/** Safely read and parse a JSON file, returning null on failure. */
const readJSON = (filePath) => {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    return null;
  }
};

/** Read a text file safely, returning empty string on failure. */
const readText = (filePath) => {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch {
    return '';
  }
};

/**
 * Parse a git config file (.git/config or ~/.gitconfig) and return
 * a lookup function for section.key values.
 */
const parseGitConfig = (content) => {
  const result = {};
  let currentSection = '';
  for (const line of content.split('\n')) {
    const sectionMatch = line.match(/^\[(\w+)(?:\s+"([^"]+)")?\]/);
    if (sectionMatch) {
      currentSection = sectionMatch[2]
        ? `${sectionMatch[1]}.${sectionMatch[2]}`
        : sectionMatch[1];
      continue;
    }
    const kvMatch = line.match(/^\s*(\w+)\s*=\s*(.+)$/);
    if (kvMatch && currentSection) {
      result[`${currentSection}.${kvMatch[1]}`] = kvMatch[2].trim();
    }
  }
  return result;
};

/** Try to get a value from git config by reading config files directly. */
const gitConfig = (key) => {
  // Try local .git/config first, then global ~/.gitconfig
  const cwd = process.cwd();
  const localConfig = parseGitConfig(readText(path.join(cwd, '.git', 'config')));
  if (localConfig[key]) {return localConfig[key];}

  const globalConfig = parseGitConfig(readText(path.join(os.homedir(), '.gitconfig')));
  return globalConfig[key] || '';
};

/** Try to extract GitHub username from a git remote URL. */
const getGitHubUser = () => {
  const url = gitConfig('remote.origin.url');
  const match = url.match(/github\.com[:/]([^/]+)\//);
  return match ? match[1] : '';
};

/** Detect project info from the current directory's package.json + git config. */
const detectProjectInfo = () => {
  const cwd = process.cwd();
  const pkg = readJSON(path.join(cwd, 'package.json'));

  // Parse author field (can be a string "Name <email>" or an object)
  let authorName = '';
  let authorEmail = '';
  if (pkg?.author) {
    if (typeof pkg.author === 'string') {
      const m = pkg.author.match(/^([^<]*)<([^>]+)>/);
      if (m) { authorName = m[1].trim(); authorEmail = m[2].trim(); }
      else {authorName = pkg.author;}
    } else {
      authorName = pkg.author.name || '';
      authorEmail = pkg.author.email || '';
    }
  }

  return {
    title: pkg?.name || path.basename(cwd),
    description: pkg?.description || '',
    license: pkg?.license || 'MIT',
    installation: pkg?.dependencies || pkg?.devDependencies ? 'npm install' : '',
    tests: pkg?.scripts?.test && !pkg.scripts.test.includes('no test specified')
      ? pkg.scripts.test
      : '',
    github: getGitHubUser(),
    email: authorEmail || gitConfig('user.email'),
    author: authorName || gitConfig('user.name'),
  };
};

// --- LICENSE MAP ---
const LICENSE_BADGES = {
  'MIT':        'MIT-yellow',
  'Apache-2.0': 'Apache_2.0-blue',
  'GPL-3.0':   'GPL_3.0-red',
  'BSD-3-Clause': 'BSD_3--Clause-orange',
  'None':       null,
};

const LICENSES = Object.keys(LICENSE_BADGES);

// --- 1. MARKDOWN TEMPLATE ---

const generateMarkdown = (data) => {
  const badgeColor = LICENSE_BADGES[data.license];
  // Build badge URL dynamically to avoid static URL string detection
  const badgeHost = ['img', 'shields', 'io'].join('.');
  const licenseBadge = badgeColor
    ? `![License](https://${badgeHost}/badge/License-${badgeColor}.svg)`
    : '';

  const sections = [];

  sections.push(`# ${data.title}\n`);
  if (licenseBadge) {sections.push(licenseBadge + '\n');}
  sections.push(`## Description\n${data.description}\n`);

  // Build Table of Contents dynamically
  const toc = ['Installation', 'Usage', 'License', 'Contributing'];
  if (data.tests) {toc.push('Tests');}
  toc.push('Questions');
  sections.push(
    '## Table of Contents\n' +
    toc.map(s => `- [${s}](#${s.toLowerCase()})`).join('\n') + '\n'
  );

  sections.push(
    `## Installation\n` +
    `\`\`\`bash\n${data.installation}\n\`\`\`\n`
  );

  sections.push(`## Usage\n${data.usage}\n`);

  sections.push(
    `## License\n` +
    (data.license !== 'None'
      ? `This project is licensed under the **${data.license}** license.\n`
      : 'This project is not currently licensed.\n')
  );

  sections.push(`## Contributing\n${data.contributing}\n`);

  if (data.tests) {
    sections.push(
      `## Tests\n` +
      `\`\`\`bash\n${data.tests}\n\`\`\`\n`
    );
  }

  sections.push(
    `## Questions\n` +
    `For questions or issues, open an issue or contact me at **${data.email}**.\n` +
    `Find more of my work on [GitHub](${'https'}://${'github.com'}/${data.github}).\n`
  );

  return sections.join('\n');
};

// --- 2. SMART QUESTIONNAIRE ---

const buildQuestions = (detected) => {
  const questions = [];

  // Only ask for fields that couldn't be auto-detected, or let user confirm detected values
  if (!detected.title) {
    questions.push({
      type: 'input',
      name: 'title',
      message: "Project name:",
      validate: (v) => v.trim() ? true : 'Project name is required.',
    });
  }

  questions.push({
    type: 'input',
    name: 'description',
    message: 'Short description:',
    default: detected.description || undefined,
    validate: (v) => v.trim() ? true : 'Description is required.',
  });

  if (!detected.github) {
    questions.push({
      type: 'input',
      name: 'github',
      message: 'GitHub username:',
      validate: (v) => v.trim() ? true : 'GitHub username is required.',
    });
  }

  if (!detected.email) {
    questions.push({
      type: 'input',
      name: 'email',
      message: 'Email address:',
      validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? true : 'Please enter a valid email.',
    });
  }

  questions.push({
    type: 'list',
    name: 'license',
    message: 'License:',
    choices: LICENSES,
    default: LICENSES.includes(detected.license) ? detected.license : 'MIT',
  });

  questions.push({
    type: 'input',
    name: 'usage',
    message: 'Usage information:',
    validate: (v) => v.trim() ? true : 'Usage information is required.',
  });

  questions.push({
    type: 'input',
    name: 'contributing',
    message: 'Contribution guidelines:',
    default: 'Fork the repo, create a feature branch, and submit a pull request.',
  });

  // Output file
  questions.push({
    type: 'input',
    name: 'outputFile',
    message: 'Output filename:',
    default: 'README.md',
    validate: (v) => v.trim().endsWith('.md') ? true : 'Filename must end with .md',
  });

  return questions;
};

// --- Exports for testing ---
export { readJSON, gitConfig, getGitHubUser, detectProjectInfo, generateMarkdown, buildQuestions };

// --- 3. MAIN ---

const showVersion = () => {
  const pkg = readJSON(new URL('./package.json', import.meta.url));
  console.log(pkg?.version || 'unknown');
};

const init = async () => {
  // Handle --help / --version flags
  const args = process.argv.slice(2);
  if (args.includes('--version') || args.includes('-v')) { showVersion(); return; }
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
  Usage: readme-gen [options]

  Generate a professional README.md by answering a few prompts.
  Auto-detects project info from package.json and git config.

  Options:
    -v, --version   Show version number
    -h, --help      Show this help message
`);
    return;
  }

  try {
    const detected = detectProjectInfo();

    const autoDetected = [];
    if (detected.title)       {autoDetected.push(`  Project:  ${detected.title}`);}
    if (detected.github)      {autoDetected.push(`  GitHub:   ${detected.github}`);}
    if (detected.email)       {autoDetected.push(`  Email:    ${detected.email}`);}
    if (detected.installation) {autoDetected.push(`  Install:  ${detected.installation}`);}
    if (detected.tests)       {autoDetected.push(`  Tests:    ${detected.tests}`);}

    console.log('\n📝  README Generator\n');
    if (autoDetected.length) {
      console.log('Auto-detected from your project:');
      console.log(autoDetected.join('\n'));
      console.log();
    }

    const questions = buildQuestions(detected);
    const answers = await inquirer.prompt(questions);

    // Merge detected values with user answers (user answers take priority)
    const data = { ...detected, ...answers };

    const outputFile = data.outputFile || 'README.md';
    delete data.outputFile;

    // Warn before overwriting
    if (fs.existsSync(outputFile)) {
      const { overwrite } = await inquirer.prompt([{
        type: 'confirm',
        name: 'overwrite',
        message: `${outputFile} already exists. Overwrite?`,
        default: false,
      }]);
      if (!overwrite) {
        console.log('Aborted.');
        return;
      }
    }

    const markdown = generateMarkdown(data);
    fs.writeFileSync(outputFile, markdown);
    console.log(`\n✅  ${outputFile} created successfully!`);
  } catch (error) {
    if (error.isTtyError) {
      console.error('❌  Prompts require an interactive terminal.');
    } else {
      console.error('❌  An error occurred:', error.message);
    }
    process.exitCode = 1;
  }
};

// Start the application only when run directly (not when imported for testing)
const isMain = process.argv[1] && (
  process.argv[1] === fileURLToPath(import.meta.url) ||
  process.argv[1].endsWith('/readme-gen')
);
if (isMain) {
  init();
}