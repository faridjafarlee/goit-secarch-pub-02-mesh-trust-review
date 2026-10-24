// Збирає review.html з content.js; PDF друкується з нього headless Chrome (див. README).
const fs = require('fs');
const C = require('./content.js');
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

let html = `<!doctype html><html lang="uk"><head><meta charset="utf-8"><title>${esc(C.title)}</title><style>
@page { size: A4; margin: 20mm 20mm 18mm; }
body { font-family: Arial, Helvetica, sans-serif; font-size: 11pt; line-height: 1.45; color: #1d1d1f; }
h1 { font-size: 17pt; color: #1F2A44; margin: 0 0 4px; }
.meta { color: #666; font-size: 9pt; margin-bottom: 16px; }
h2 { font-size: 12.5pt; color: #1F4E8C; margin: 16px 0 6px; }
p, li { text-align: justify; margin: 0 0 7px; }
ul { padding-left: 20px; margin: 0; }
h2 { break-after: avoid; }
li { break-inside: avoid; }
</style></head><body>
<h1>${esc(C.title)}</h1><div class="meta">${esc(C.author)}</div>
`;
for (const s of C.sections) {
  html += `<h2>${esc(s.h)}</h2>\n`;
  (s.p || []).forEach(t => { html += `<p>${esc(t)}</p>\n`; });
  if (s.bullets) html += '<ul>' + s.bullets.map(t => `<li>${esc(t)}</li>`).join('\n') + '</ul>\n';
}
html += '</body></html>\n';
fs.writeFileSync('review.html', html);
console.log('written review.html');
