const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = [
  // Inline RGBs
  { regex: /rgba\(\s*6\s*,\s*182\s*,\s*212/g, replace: 'rgba(124, 58, 237' },
  { regex: /rgba\(\s*14\s*,\s*165\s*,\s*233/g, replace: 'rgba(167, 139, 250' },
  { regex: /rgba\(\s*5\s*,\s*8\s*,\s*24/g, replace: 'rgba(9, 9, 11' },
  { regex: /rgba\(\s*15\s*,\s*23\s*,\s*42/g, replace: 'rgba(19, 19, 22' },

  // Inline Hex strings with quotes (strict) - FIXED: Now keeping the quotes!
  { regex: /['"`]#22d3ee['"`]/gi, replace: "'var(--color-primary)'" },
  { regex: /['"`]#06b6d4['"`]/gi, replace: "'var(--color-primary)'" },
  { regex: /['"`]#67e8f9['"`]/gi, replace: "'var(--color-accent)'" },
  { regex: /['"`]#050818['"`]/gi, replace: "'var(--color-background)'" },
  { regex: /['"`]#0f172a['"`]/gi, replace: "'var(--color-surface)'" },
  { regex: /['"`]#e2e8f0['"`]/gi, replace: "'var(--color-text)'" },
  
  // Specific inline hex assignments without quotes (e.g. inside CSS files or already replaced parts)
  { regex: /#22d3ee/gi, replace: '#7C3AED' },
  { regex: /#06b6d4/gi, replace: '#7C3AED' },
  { regex: /#67e8f9/gi, replace: '#A78BFA' },
  { regex: /#050818/gi, replace: '#09090B' },
  { regex: /#0f172a/gi, replace: '#131316' },
  { regex: /#e2e8f0/gi, replace: '#FAFAFA' }
];

function walk(dir) {
  const files = fs.readdirSync(dir);
  let changedFiles = 0;
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      changedFiles += walk(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js') || fullPath.endsWith('.css')) {
      if (file === 'index.css') return;

      let content = fs.readFileSync(fullPath, 'utf-8');
      let newContent = content;
      replacements.forEach(r => {
        newContent = newContent.replace(r.regex, r.replace);
      });
      
      if (newContent !== content) {
        fs.writeFileSync(fullPath, newContent, 'utf-8');
        console.log(`Updated: ${file}`);
        changedFiles++;
      }
    }
  });
  return changedFiles;
}

const total = walk(srcDir);
console.log(`\n✅ Global theme replacement complete! Modified ${total} files.`);
