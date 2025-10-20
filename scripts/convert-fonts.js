#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const fontsDir = path.join(__dirname, '../src/fonts');

// Get all .js files in the fonts directory
const files = fs.readdirSync(fontsDir).filter(file => file.endsWith('.js'));

console.log(`Found ${files.length} .js font files to convert`);

files.forEach(file => {
  const jsPath = path.join(fontsDir, file);
  const tsPath = jsPath.replace(/\.js$/, '.ts');

  // Read the file content
  let content = fs.readFileSync(jsPath, 'utf8');

  // Convert from: export default `...`
  // To: const fontName: string = `...`\nexport default fontName;

  if (content.startsWith('export default `')) {
    // Generate a camelCase variable name from the filename
    const baseName = path.basename(file, '.js');
    const varName = baseName
      .split(/[\s-]+/)
      .map((word, index) => {
        if (index === 0) return word.toLowerCase();
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join('') + 'Font';

    // Replace the export
    content = content.replace(/^export default /, `const ${varName}: string = `);

    // Add export at the end if not already there
    if (!content.includes(`export default ${varName}`)) {
      // Make sure template literal is closed
      if (content.trim().endsWith('`')) {
        content = content.trim() + '\n\nexport default ' + varName + ';\n';
      } else {
        console.warn(`Warning: ${file} doesn't end with backtick`);
      }
    }
  }

  // Write to .ts file
  fs.writeFileSync(tsPath, content, 'utf8');

  // Delete the .js file
  fs.unlinkSync(jsPath);

  console.log(`✓ Converted ${file} -> ${path.basename(tsPath)}`);
});

console.log(`\nConversion complete! Converted ${files.length} files.`);
