# Lab 05 – Legacy Notes

## 1. jQuery → Native translation

| # | jQuery call | Native equivalent |
|---|-------------|-------------------|
| 1 | `$(document).ready(fn)` | Load the script with `type="module"` (modules are deferred, so they already wait for the page), or `document.addEventListener("DOMContentLoaded", fn)` |
| 2 | `$("#name").val()` | `document.querySelector("#name").value` |
| 3 | `$("#name").after(html)` | Build the node with `document.createElement("span")`, set `textContent`, then `input.after(span)` (or `input.insertAdjacentHTML("afterend", html)`) |
| 4 | `$(".error").remove()` | `document.querySelectorAll(".error").forEach((el) => el.remove())` |
| 5 | `.text(…).hide().fadeIn(400)` | `status.textContent = "…"`. No one-line native fade — drop it, or add a CSS `transition` on `opacity` |
| 6 | `$form[0].reset()` | `form.reset()` — `querySelector` already returns the raw element, so no `[0]` unwrap |

## 2. Three legacy smells

1. **`var` for variables** — function-scoped and hoisted. Modern code uses `const` (default) and `let` (only when reassigned), which are block-scoped.
2. **`$.trim(...)`** — a library helper for something the language now has: `String.prototype.trim()`. `$.trim` was removed in jQuery 4, so this script breaks on upgrade.
3. **HTML built from strings** — `'<span class="error">…</span>'` passed to `.after()` is parsed as HTML. It is fragile and becomes an XSS risk once user data is concatenated in. Modern code uses `createElement` + `textContent`.
4. *(bonus)* **`indexOf("@") === -1`** — replaced by the clearer `!email.includes("@")`. String concatenation with `+` is also replaced by template literals.

## 3. TypeScript errors seen after `git mv` (Task 6)

Running `npm run typecheck` straight after renaming the files to `.ts`:

- `src/feedback.ts(2,19): error TS18047: 'form' is possibly 'null'.`
  `querySelector` returns `Element | null`; the code used it without checking.
- `src/feedback.ts(6,20): error TS7006: Parameter 'input' implicitly has an 'any' type.`
  `strict` forbids untyped parameters.
- `src/feedback.ts(25,26): error TS2339: Property 'value' does not exist on type 'Element'.`
  A plain `Element` has no `.value`; it must be known to be an `HTMLInputElement`.

All three are fixed by `getRequired<HTMLInputElement>(...)` and typed parameters.

## 4. Structural typing (Task 8)

- `describeSlot(booking)` — **accepted**: `booking` has `day`, `start`, `end`, `room` (the extra `id` is fine, because it is a variable, not an object literal written in place).
- `describeSlot({ day: "Monday" })` — **rejected**:
  `error TS2739: Type '{ day: string; }' is missing the following properties from type 'Slot': start, end, room`

## 5. Deliberate error (Task 11)

Changed `delay(1000)` to `delay("1000")`:

`src/main.ts(31,15): error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.`

Because of `noEmitOnError`, no JavaScript was written to `public/`. Changed it back to `delay(1000)` and the build succeeded.
