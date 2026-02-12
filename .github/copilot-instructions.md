# Copilot / AI agent instructions for silly-billis

This repository is a small, static, browser-only quiz app. The guidance below describes the structure, patterns, and concrete edits that make an AI agent immediately productive.

1) Big picture
- Single-page static site: `index.html` + `style.css` + `game.js` in project root.
- All runtime logic lives in `game.js` (no framework, no bundler). Edit this file for behavior changes.
- UI is DOM-manipulation based; screens are toggled by adding/removing the `.active` class via `showScreen()`.

2) Key files
- [index.html](index.html) — root HTML, inline handlers (onclick) call global functions from `game.js`.
- [game.js](game.js) — game state, `questions` array, screen management, and all exported functions used by HTML.
- [style.css](style.css) — visual styles and animations. Many classes (`.card`, `.screen`, `.option-btn`, `.progress-fill`) are relied upon by JS.
- [README.md](README.md) — short repo description.

3) Runtime / developer workflows
- No build or package manager. To run locally serve the folder and open in a browser:

  ```bash
  # from repo root
  python -m http.server 8000
  open http://localhost:8000
  ```

- Alternatively use the VS Code Live Server extension or open `index.html` directly (DevTools required for console). There are no tests or CI configured.

4) Project-specific conventions & important patterns
- Questions data: add or edit quiz entries in the `questions` array inside `game.js`. Each entry must include: `question`, `options` (array), `correct` (option index), `meme` (object with `emoji`, `caption`, `subcaption`), and `feedback`.
  - Example: modify [game.js](game.js) `questions` array near top.

- Global functions are referenced directly from HTML `onclick` attributes. Do NOT rename functions used in `index.html` unless you update the HTML accordingly. Important names: `startGame`, `loadQuestion`, `selectOption`, `nextQuestion`, `showMeme`, `sayYes`, `dodgeButton`, `createFloatingHearts`, `launchConfetti`, `showScreen`.

- Progress and question-count logic is partially hard-coded:
  - `loadQuestion()` computes progress using a hard-coded `7` denominator (`((currentQuestion) / 7) * 100`).
  - `nextQuestion()` treats question indices `< 6` as non-final, then shows the Valentine screen. If you change the number of questions, update both places to keep progress and final-screen behavior consistent.

- UI state is managed by CSS classes. Prefer manipulating classes (`.active`, `.hidden`, `.correct`, `.wrong`, `.disabled`) rather than directly toggling inline styles except for temporary animations (existing code triggers reflow via `card.offsetHeight`).

5) Integration points & external dependencies
- External assets: Google Fonts loaded in `index.html`; no other external packages.
- No bundler, npm, or backend. All work is client-side; CI and tests are not present.

6) Safe edit checklist for common tasks
- Add a question: update `questions` in `game.js` and ensure `correct` indexes match the `options` array. Update progress denominator if questions count changes.
- Change button behavior: update function in `game.js` and keep the same function name or update `index.html` handlers.
- Add images or remote assets: host them and reference in `index.html` or `game.js`. Keep cross-origin considerations in mind for fonts.

7) Quick grep hints (use these exact strings to find relevant logic)
- `questions` — list of quiz data (edit here)
- `showScreen(` — screen toggle logic
- `((currentQuestion) / 7) * 100` — progress calculation to update if you change question count
- `dodgeButton` / `sayYes` — final-screen interactions

8) Example prompts you can use for local edits
- "Add a new quiz item with a friendly meme; ensure the progress bar divides by the new total." — modify `questions` and update the denominator in `loadQuestion()`.
- "Refactor DOM handlers to use event listeners instead of inline `onclick` attributes." — ensure functions remain globally available or update `index.html` accordingly.

If any section is unclear or you want more examples (e.g., a canonical `questions` entry to copy), tell me which part to expand. I'll iterate on this file.
