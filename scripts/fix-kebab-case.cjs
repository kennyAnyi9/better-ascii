#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const fontsDir = path.join(__dirname, '../src/fonts');

function toStrictKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2') // camelCase to kebab
    .replace(/([a-z])(\d)/g, '$1-$2')    // letter before number
    .replace(/(\d)([a-z])/g, '$1-$2')    // number before letter
    .replace(/([a-zA-Z])([A-Z][a-z])/g, '$1-$2') // handle acronyms
    .replace(/[\s_]+/g, '-')              // spaces/underscores to hyphens
    .replace(/[^a-z0-9-]/gi, '-')        // non-alphanumeric to hyphens
    .replace(/-+/g, '-')                  // multiple hyphens to single
    .replace(/^-|-$/g, '')                // remove leading/trailing hyphens
    .toLowerCase();
}

// Get all .ts files in the fonts directory except index.ts
const files = fs.readdirSync(fontsDir)
  .filter(file => file.endsWith('.ts') && file !== 'index.ts');

console.log(`Checking ${files.length} font files for strict kebab-case...\n`);

const renames = [];

files.forEach(file => {
  const baseName = path.basename(file, '.ts');
  const strictKebab = toStrictKebabCase(baseName);

  if (baseName !== strictKebab) {
    const oldPath = path.join(fontsDir, file);
    const newFile = strictKebab + '.ts';
    const newPath = path.join(fontsDir, newFile);

    fs.renameSync(oldPath, newPath);
    renames.push({ old: file, new: newFile });
    console.log(`✓ ${file} -> ${newFile}`);
  }
});

console.log(`\nRenamed ${renames.length} files to strict kebab-case`);
