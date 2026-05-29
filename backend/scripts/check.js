import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const backendDir = path.resolve(scriptDir, '..');
const projectRoot = path.resolve(backendDir, '..');
const targets = [
  path.join(projectRoot, 'frontend', 'index.js'),
  path.join(backendDir, 'src'),
  path.join(backendDir, 'tests'),
  path.join(backendDir, 'scripts')
];

function collectJavaScriptFiles(target) {
  const stat = fs.statSync(target);
  if (stat.isFile()) {
    return target.endsWith('.js') ? [target] : [];
  }

  return fs.readdirSync(target, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(target, entry.name);
    if (entry.isDirectory()) {
      return collectJavaScriptFiles(entryPath);
    }

    return entry.isFile() && entry.name.endsWith('.js') ? [entryPath] : [];
  });
}

const files = targets.flatMap(collectJavaScriptFiles);
let hasFailure = false;

for (const file of files) {
  const result = spawnSync(process.execPath, ['--check', file], {
    encoding: 'utf8',
    stdio: 'pipe'
  });

  if (result.status !== 0) {
    hasFailure = true;
    process.stderr.write(result.stderr || result.stdout);
  }
}

if (hasFailure) {
  process.exit(1);
}

console.log(`Verificacao concluida: ${files.length} arquivos JavaScript validos.`);
