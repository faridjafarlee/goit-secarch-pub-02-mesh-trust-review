# Наукова публікація 2: рев'ю «Enhancing Microservice Security»

Завдання: `../notes/tasks/pub2-spec.md` (300-500 слів, 5 розділів, Google Doc + PDF, дедлайн 18 Oct 23:45).
Конспект статті: `../notes/pub2-mesh-trust.md`.

| Файл | Що це |
|---|---|
| `Джафарлі_Рев’ю_Enhancing_Microservice_Security.pdf` | PDF для прикріплення (2 стор. A4) |
| `Джафарлі_Рев’ю_Enhancing_Microservice_Security.docx` | Той самий текст. Завантажити в Google Drive, відкрити через «Відкрити в Google Docs», назвати `Джафарлі. Рев`ю “Enhancing Microservice Security”` і дати доступ «Усі, хто має посилання» |
| `content.js` | Єдине джерело тексту (у формулах і виразах «X = Y» стоять нерозривні пробіли) |
| `build_docx.js`, `build_html.js` | Збірка .docx і review.html, з якого друкується PDF |

Обсяг: 444 слова основного тексту в розділах, 470 разом із назвою, рядком автора і заголовками розділів (487, якщо рахувати ще й символи формул). Це в межах 300-500.

Перезбірка:
```bash
NODE_PATH=<scratchpad>/docxjs/node_modules node build_docx.js
node build_html.js
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --user-data-dir="$(mktemp -d)" \
  --no-pdf-header-footer --print-to-pdf="Джафарлі_Рев’ю_Enhancing_Microservice_Security.pdf" "file://$PWD/review.html"
```
Headless Chrome записує PDF, але може не завершитися сам. Коли файл з'явився і перестав рости, процес треба зупинити.

Нічого не здано, подає користувач.
