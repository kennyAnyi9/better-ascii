#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const fontsDir = path.join(__dirname, '../src/fonts');

function createValidVariableName(fileName) {
  const baseName = path.basename(fileName, '.ts');

  // Convert to camelCase
  let varName = baseName
    .split(/[\s-]+/)
    .map((word, index) => {
      // Remove special characters
      word = word.replace(/[^a-z0-9]/gi, '');

      if (index === 0) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');

  // If starts with a number, prefix with letter mapping
  if (/^\d/.test(varName)) {
    const numMap = {
      '1': 'one', '2': 'two', '3': 'three', '4': 'four', '5': 'five',
      '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine', '0': 'zero'
    };
    const firstDigit = varName.charAt(0);
    varName = numMap[firstDigit] + varName.slice(1);
  }

  // Ensure it doesn't start with a number (safety check)
  if (/^\d/.test(varName)) {
    varName = 'font' + varName.charAt(0).toUpperCase() + varName.slice(1);
  }

  return varName + 'Font';
}

// Get all .ts files in the fonts directory except index.ts
const files = fs.readdirSync(fontsDir)
  .filter(file => file.endsWith('.ts') && file !== 'index.ts');

console.log(`Fixing ${files.length} font files...\n`);

let fixed = 0;

files.forEach(file => {
  const filePath = path.join(fontsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  const varName = createValidVariableName(file);

  // Extract current const name
  const match = content.match(/^const\s+([a-zA-Z0-9_$]+)\s*:/);
  if (match) {
    const oldVarName = match[1];
    if (oldVarName !== varName) {
      // Replace the variable name
      content = content.replace(
        new RegExp(`\\b${oldVarName}\\b`, 'g'),
        varName
      );

      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Fixed ${file}: ${oldVarName} -> ${varName}`);
      fixed++;
    }
  } else {
    console.warn(`  Warning: Could not find const in ${file}`);
  }
});

console.log(`\nFixed ${fixed} files`);
