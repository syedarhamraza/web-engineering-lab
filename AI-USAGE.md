# AI-USAGE.md

## Lab 6

AI assistant used: Claude (Claude Code), working from the Lab 06 statement.

- **Generated:**
  - `demo/page.mjs`, `demo/build-static.mjs` and `demo/server.mjs`, typed in
    from the code given in the lab statement.
  - The Vite React TypeScript app in `app/`: `types.ts`, `Greeting.tsx`,
    `StatusMessage.tsx`, `SlotRow.tsx`, `SlotTable.tsx` and `App.tsx`, following
    the lab statement's code, plus the boilerplate clean-up (removed
    `App.css`, `index.css`, `assets/`; copied `styles.css`; set the title).
  - A first draft of `RENDERING-NOTES.md`, including the strategy choices for
    the blog post, stock dashboard and account page.
- **Reviewed / verified:**
  - Ran every demo route twice with JavaScript on and off and compared View
    Source with what the page shows; the table in `RENDERING-NOTES.md` comes
    from those runs. Checked that `/isr` keeps the same time inside 5 seconds.
  - Measured `/stream`: about 30 ms to first byte, about 1.5 s total.
  - `npm run build` finishes with no TypeScript errors.
  - Booked and cancelled slots with the keyboard (Tab, then Enter and Space);
    rows highlight, labels switch Select/Cancel, the status count updates.
  - `npm run preview` View Source shows only `<div id="root"></div>` (CSR).
  - Lighthouse accessibility on the preview: 100
    (`evidence/lab06-lighthouse-accessibility.png`).
- **Rejected:**
  - Nothing yet. TODO (Arham): after reading every file yourself, list here
    anything you changed or threw away from the generated code, and why.
