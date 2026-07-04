const fs = require('fs');
const path = require('path');

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      content = content.replace(/from\s+['"]([^'"]+\/_lib\/db)['"]/g, 'from "$1.js"');
      fs.writeFileSync(fullPath, content);
    }
  }
}

walk('./api');
console.log('Fixed imports in api directory');
