#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const fontsDir = path.join(__dirname, '../src/fonts');

function toCamelCase(kebabStr) {
  return kebabStr
    .split('-')
    .map((word, index) => {
      // Handle numbers at the start
      if (/^\d/.test(word)) {
        // Convert "3d" -> "threeD", "1row" -> "oneRow", etc
        const numMap = {
          '1': 'one', '2': 'two', '3': 'three', '4': 'four', '5': 'five',
          '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine', '0': 'zero'
        };
        const firstChar = word.charAt(0);
        if (index === 0) {
          return (numMap[firstChar] || word.charAt(0)) + word.slice(1).toLowerCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }

      if (index === 0) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');
}

// Get all .ts files in the fonts directory except index.ts
const files = fs.readdirSync(fontsDir)
  .filter(file => file.endsWith('.ts') && file !== 'index.ts')
  .sort();

console.log(`Generating index.ts for ${files.length} fonts...\n`);

// Generate exports
const fontExports = files.map(file => {
  const kebabName = path.basename(file, '.ts');
  const camelName = toCamelCase(kebabName);

  return `export { default as ${camelName} } from "./${kebabName}";`;
});

// Create the index.ts content
const indexContent = `// Auto-generated font exports
// Total fonts: ${files.length}

${fontExports.join('\n')}
`;

// Write the index.ts file
const indexPath = path.join(fontsDir, 'index.ts');
fs.writeFileSync(indexPath, indexContent, 'utf8');

console.log(`✓ Generated src/fonts/index.ts with ${files.length} font exports`);

// Show a sample of exports
console.log('\nSample exports:');
files.slice(0, 10).forEach(file => {
  const kebabName = path.basename(file, '.ts');
  const camelName = toCamelCase(kebabName);
  console.log(`  fonts.${camelName} -> ${file}`);
});
console.log('  ...');
