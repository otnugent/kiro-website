import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));

describe('Project structure', () => {
  it('src/index.html exists', () => {
    expect(existsSync(resolve(ROOT, 'src/index.html'))).toBe(true);
  });

  it('README.md exists and is non-empty', () => {
    const path = resolve(ROOT, 'README.md');
    expect(existsSync(path)).toBe(true);
    expect(readFileSync(path, 'utf8').trim().length).toBeGreaterThan(0);
  });

  it('CONTENT_GUIDE.md exists and is non-empty', () => {
    const path = resolve(ROOT, 'CONTENT_GUIDE.md');
    expect(existsSync(path)).toBe(true);
    expect(readFileSync(path, 'utf8').trim().length).toBeGreaterThan(0);
  });

  it('.github/workflows/deploy.yml exists', () => {
    expect(existsSync(resolve(ROOT, '.github/workflows/deploy.yml'))).toBe(true);
  });
});
