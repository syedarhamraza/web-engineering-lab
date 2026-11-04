# Lab 6: Rendering Notes

## Part A: where is the HTML made?

Server: `node demo/build-static.mjs` then `node demo/server.mjs`, tested at
`http://localhost:3000`. Each route was refreshed twice, two seconds apart
(more than five seconds apart for `/isr`), checked with View Page Source
(Ctrl+U), then reloaded with JavaScript disabled (DevTools, Ctrl+Shift+P,
"Disable JavaScript").

| Route  | Time in View Source?                        | Changes on refresh?                                                                   | Works with JS off?                       | Where the HTML is made          |
| ------ | ------------------------------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------- | ------------------------------- |
| `/csr` | No, source only has `Loading…` and a script | Yes, a new browser time each load                                                     | No, it stays on `Loading…`               | In the browser, after JS runs   |
| `/ssr` | Yes, `Rendered on the server at …`          | Yes, a new server time on every request                                               | Yes                                      | On the server, per request      |
| `/ssg` | Yes, `Built at …`                           | No, it is fixed at the build time until `build-static.mjs` runs again                 | Yes                                      | At build time, once             |
| `/isr` | Yes, `Regenerated at …`                     | Only after 5 s: refreshes inside 5 s show the same cached time, later ones a new time | Yes                                      | On the server, cached for 5 s   |

Observed values (example run): `/csr` source said `Loading…` while the page
showed `Rendered in the browser at 5:46:12 AM`, then `5:46:14 AM`. `/ssr` went
`5:46:16 AM` to `5:46:19 AM`. `/ssg` stayed at `Built at 5:46:03 AM`. `/isr`
showed `5:47:05 AM` three times in a row at 2 s intervals, and moved to a new
time once more than 5 s had passed.

## Streaming (`/stream`)

| Measurement          | Value     |
| -------------------- | --------- |
| Time to first byte   | ~30 ms    |
| Total time           | ~1,525 ms |

The heading and first paragraph appear immediately; the second paragraph
arrives about 1.5 s later, because the browser renders each chunk as it lands.

**When streaming helps:** when most of the page is ready at once but one part
depends on slow data, streaming lets the user see and read the fast shell
straight away instead of staring at a blank screen until the slowest query
finishes.

## Hydration

With SSR or SSG the user sees finished HTML immediately, but it is not
interactive until the framework's JavaScript downloads and "hydrates" it by
attaching event handlers to the existing elements. More JavaScript means a
longer gap between "visible" and "usable". Islands cut that cost by hydrating
only the interactive widgets and leaving the rest as plain HTML.

## Choosing a strategy

| Page                         | Strategy                                  | Why (freshness, speed, cost)                                                                                                                                                                                                         |
| ---------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Blog post                    | SSG (or ISR if posts get edited often)    | Content changes rarely, so build once and serve a file from a CDN: fastest load, zero server work per visit, fully indexable. ISR adds background refresh if comments or edits must show up without a full rebuild.                 |
| Live stock-price dashboard   | SSR shell + CSR (or streaming) for prices | Prices change every second, so cached HTML is wrong almost immediately. Send a quick shell, then update prices in the browser (polling or WebSockets). SEO is irrelevant and the server would otherwise re-render on every tick.     |
| User's account page          | SSR (or CSR behind login)                 | It is personal and must be fresh on every visit, so it cannot be built ahead or cached for everyone. SSR gives correct data on first paint; the per-request server cost is fine because only logged-in users hit it, and it needs no SEO. |

## Part B: the React app is CSR

After `npm run build` and `npm run preview` in `app/`, View Source shows the
body is only:

```html
<div id="root"></div>
<script type="module" crossorigin src="/assets/index-….js"></script>
```

This is exactly the `/csr` route from Part A: the server sends an empty shell
and React builds the table in the browser. With JavaScript disabled the page is
blank. In next week's Next.js lab the same components can be rendered on the
server (SSR/SSG) and then hydrated.
