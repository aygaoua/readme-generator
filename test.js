import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateMarkdown, buildQuestions, readJSON } from './index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── generateMarkdown ──────────────────────────────────────────────

describe('generateMarkdown', () => {
  const baseData = {
    title: 'Test Project',
    description: 'A test project description.',
    license: 'MIT',
    installation: 'npm install',
    usage: 'Run the project with node.',
    contributing: 'Fork and submit PR.',
    tests: 'npm test',
    email: 'test@example.com',
    github: 'testuser',
  };

  it('should include the project title as an H1', () => {
    const md = generateMarkdown(baseData);
    assert.ok(md.startsWith('# Test Project'));
  });

  it('should include a license badge for MIT', () => {
    const md = generateMarkdown(baseData);
    assert.ok(md.includes('![License]'));
    assert.ok(md.includes('MIT'));
  });

  it('should omit the license badge when license is None', () => {
    const md = generateMarkdown({ ...baseData, license: 'None' });
    assert.ok(!md.includes('![License]'));
    assert.ok(md.includes('not currently licensed'));
  });

  it('should include all standard sections', () => {
    const md = generateMarkdown(baseData);
    const sections = ['## Description', '## Installation', '## Usage', '## License', '## Contributing', '## Tests', '## Questions'];
    for (const section of sections) {
      assert.ok(md.includes(section), `Missing section: ${section}`);
    }
  });

  it('should omit Tests section when tests field is empty', () => {
    const md = generateMarkdown({ ...baseData, tests: '' });
    assert.ok(!md.includes('## Tests'));
  });

  it('should include the email and github in Questions', () => {
    const md = generateMarkdown(baseData);
    assert.ok(md.includes('test@example.com'));
    assert.ok(md.includes('https://github.com/testuser'));
  });

  it('should include installation command in a code block', () => {
    const md = generateMarkdown(baseData);
    assert.ok(md.includes('```bash\nnpm install\n```'));
  });

  it('should generate a table of contents', () => {
    const md = generateMarkdown(baseData);
    assert.ok(md.includes('## Table of Contents'));
    assert.ok(md.includes('[Installation](#installation)'));
  });
});

// ── buildQuestions ────────────────────────────────────────────────

describe('buildQuestions', () => {
  it('should skip title question when title is detected', () => {
    const questions = buildQuestions({ title: 'my-project', github: '', email: '' });
    const names = questions.map(q => q.name);
    assert.ok(!names.includes('title'));
  });

  it('should ask for title when not detected', () => {
    const questions = buildQuestions({ title: '', github: '', email: '' });
    const names = questions.map(q => q.name);
    assert.ok(names.includes('title'));
  });

  it('should skip github question when github is detected', () => {
    const questions = buildQuestions({ title: 'proj', github: 'user123', email: '' });
    const names = questions.map(q => q.name);
    assert.ok(!names.includes('github'));
  });

  it('should ask for email when not detected', () => {
    const questions = buildQuestions({ title: 'proj', github: '', email: '' });
    const names = questions.map(q => q.name);
    assert.ok(names.includes('email'));
  });

  it('should skip email question when email is detected', () => {
    const questions = buildQuestions({ title: 'proj', github: '', email: 'a@b.com' });
    const names = questions.map(q => q.name);
    assert.ok(!names.includes('email'));
  });

  it('should always include description, license, usage, contributing, outputFile', () => {
    const questions = buildQuestions({ title: 'proj', github: 'u', email: 'a@b.com' });
    const names = questions.map(q => q.name);
    for (const field of ['description', 'license', 'usage', 'contributing', 'outputFile']) {
      assert.ok(names.includes(field), `Missing question: ${field}`);
    }
  });

  it('should validate email format', () => {
    const questions = buildQuestions({ title: 'proj', github: '', email: '' });
    const emailQ = questions.find(q => q.name === 'email');
    assert.equal(emailQ.validate('bad'), 'Please enter a valid email.');
    assert.equal(emailQ.validate('good@test.com'), true);
  });

  it('should validate outputFile ends with .md', () => {
    const questions = buildQuestions({ title: 'proj', github: '', email: '' });
    const outputQ = questions.find(q => q.name === 'outputFile');
    assert.equal(outputQ.validate('file.txt'), 'Filename must end with .md');
    assert.equal(outputQ.validate('README.md'), true);
  });
});

// ── readJSON ──────────────────────────────────────────────────────

describe('readJSON', () => {
  it('should parse a valid JSON file', () => {
    const pkgPath = path.join(__dirname, 'package.json');
    const result = readJSON(pkgPath);
    assert.equal(result.name, 'aygaoua-readme-generator');
  });

  it('should return null for a non-existent file', () => {
    const result = readJSON('/tmp/does-not-exist-12345.json');
    assert.equal(result, null);
  });

  it('should return null for invalid JSON', () => {
    const tmpFile = path.join(__dirname, '_test_invalid.json');
    fs.writeFileSync(tmpFile, '{ broken json !!!');
    try {
      const result = readJSON(tmpFile);
      assert.equal(result, null);
    } finally {
      fs.unlinkSync(tmpFile);
    }
  });
});
