/**
 * migrate-scss-imports.js
 * Tự động chuyển đổi @import -> @use trong toàn bộ dự án SCSS
 */

// migrate-scss-imports.js
const fs = require("fs");
const path = require("path");

const rootDir = path.resolve("./src");
const scssFiles = [];

function walk(dir) {
  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath);
    } else if (file.endsWith(".scss")) {
      scssFiles.push(fullPath);
    }
  }
}

function migrateImports(filePath) {
  let content = fs.readFileSync(filePath, "utf-8");
  const importRegex = /@import\s+["']([^"']+)["'];?/g;

  if (!importRegex.test(content)) return false;

  const updated = content.replace(importRegex, (match, importPath) => {
    let normalized = importPath.replace(/\.scss$/, "");
    return `@use "${normalized}" as *;`;
  });

  fs.writeFileSync(filePath, updated, "utf-8");
  console.log(`✅ Converted @import -> @use in: ${filePath}`);
  return true;
}

walk(rootDir);
let count = 0;
scssFiles.forEach((file) => {
  if (migrateImports(file)) count++;
});
console.log(`\n✨ Done! Updated ${count} SCSS files.`);

