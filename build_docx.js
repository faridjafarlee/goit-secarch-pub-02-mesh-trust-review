// Збирає рев'ю у .docx з content.js (docx-js). Запуск: NODE_PATH=<node_modules з docx> node build_docx.js
const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, LevelFormat, AlignmentType } = require('docx');
const C = require('./content.js');

const FONT = 'Arial';
const p = text => new Paragraph({ alignment: AlignmentType.JUSTIFIED, spacing: { after: 120, line: 300 }, children: [new TextRun({ text, font: FONT, size: 22 })] });
const h = text => new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 240, after: 100 }, children: [new TextRun({ text, font: FONT })] });
const bullet = text => new Paragraph({
  numbering: { reference: 'bullets', level: 0 }, alignment: AlignmentType.JUSTIFIED, spacing: { after: 80, line: 300 },
  children: [new TextRun({ text, font: FONT, size: 22 })],
});

const body = [
  new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { after: 80 }, children: [new TextRun({ text: C.title, font: FONT })] }),
  new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: C.author, font: FONT, size: 18, color: '666666' })] }),
];
for (const s of C.sections) {
  body.push(h(s.h));
  (s.p || []).forEach(t => body.push(p(t)));
  (s.bullets || []).forEach(b => body.push(bullet(b)));
}

const doc = new Document({
  creator: 'Фарід Джафарлі', title: C.title,
  styles: {
    default: { document: { run: { font: FONT, size: 22 } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 32, bold: true, font: FONT, color: '1F2A44' }, paragraph: { outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 25, bold: true, font: FONT, color: '1F4E8C' }, paragraph: { outlineLevel: 1 } },
    ],
  },
  numbering: { config: [{ reference: 'bullets', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 270 } } } }] }] },
  sections: [{ properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 } } }, children: body }],
});

const out = 'Джафарлі_Рев’ю_Enhancing_Microservice_Security.docx';
Packer.toBuffer(doc).then(buf => { fs.writeFileSync(out, buf); console.log('written', out); });
