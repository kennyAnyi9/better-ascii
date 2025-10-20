#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const fontsDir = path.join(__dirname, '../src/fonts');

function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2') // camelCase to kebab-case
    .replace(/[\s_]+/g, '-') // spaces and underscores to hyphens
    .replace(/[^a-z0-9-]/gi, '-') // non-alphanumeric to hyphens
    .replace(/-+/g, '-') // multiple hyphens to single
    .replace(/^-|-$/g, '') // remove leading/trailing hyphens
    .toLowerCase();
}

function toCamelCase(str) {
  return str
    .split(/[\s-]+/)
    .map((word, index) => {
      // Keep numbers as-is
      if (/^\d/.test(word)) {
        // If starts with number, just lowercase the rest
        return word.toLowerCase().replace(/[^a-z0-9]/g, '');
      }
      if (index === 0) {
        return word.toLowerCase().replace(/[^a-z0-9]/g, '');
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase().replace(/[^a-z0-9]/g, '');
    })
    .join('');
}

// Get all .ts files in the fonts directory
const files = fs.readdirSync(fontsDir).filter(file => file.endsWith('.ts') && file !== 'index.ts');

console.log(`Found ${files.length} font files to rename\n`);

const renames = [];

files.forEach(file => {
  const baseName = path.basename(file, '.ts');
  const kebabName = toKebabCase(baseName);
  const newFile = kebabName + '.ts';

  if (file !== newFile) {
    const oldPath = path.join(fontsDir, file);
    const newPath = path.join(fontsDir, newFile);

    fs.renameSync(oldPath, newPath);

    const camelName = toCamelCase(baseName);
    renames.push({ original: baseName, kebab: kebabName, camel: camelName });
    console.log(`✓ ${file} -> ${newFile}`);
  }
});

console.log(`\nRenamed ${renames.length} files to kebab-case`);

// Save the mapping for generating index.ts
fs.writeFileSync(
  path.join(__dirname, 'font-mappings.json'),
  JSON.stringify(renames, null, 2)
);

console.log('Font mappings saved to scripts/font-mappings.json');
