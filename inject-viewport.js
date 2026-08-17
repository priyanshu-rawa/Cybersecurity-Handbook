import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'public', 'index.html');

try {
  let html = fs.readFileSync(filePath, 'utf8');
  if (!html.includes('viewport')) {
    html = html.replace('<head>', '<head><meta name="viewport" content="width=device-width, initial-scale=1">');
    fs.writeFileSync(filePath, html);
    console.log('✅ Viewport meta tag injected into public/index.html');
  } else {
    console.log('ℹ️ Viewport meta tag already exists');
  }
} catch (err) {
  console.error('❌ Failed to inject viewport tag:', err.message);
}
