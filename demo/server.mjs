import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { page, time } from "./page.mjs";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let isr = { html: "", madeAt: 0 };

createServer(async (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  if (req.url === "/csr") {
    res.end(
      page(
        "CSR",
        '<p id="time">Loading…</p>',
        `<script>document.getElementById("time").textContent =
  "Rendered in the browser at " + new Date().toLocaleTimeString();</script>`,
      ),
    );
  } else if (req.url === "/ssr") {
    res.end(page("SSR", `<p id="time">Rendered on the server at ${time()}</p>`));
  } else if (req.url === "/ssg") {
    res.end(readFileSync("demo/dist/ssg.html"));
  } else if (req.url === "/isr") {
    if (Date.now() - isr.madeAt > 5000) {
      isr = {
        html: page("ISR", `<p id="time">Regenerated at ${time()}</p>`),
        madeAt: Date.now(),
      };
    }
    res.end(isr.html);
  } else if (req.url === "/stream") {
    res.write(
      '<!doctype html><html lang="en"><head><meta charset="UTF-8" />' +
        "<title>Streaming</title></head><body><h1>Streaming</h1>" +
        "<p>First chunk: sent immediately.</p>",
    );
    await sleep(1500);
    res.end("<p>Second chunk: sent 1.5 seconds later.</p></body></html>");
  } else {
    res.end(
      page(
        "Rendering demo",
        "<ul>" +
          ["csr", "ssr", "ssg", "isr", "stream"]
            .map((p) => `<li><a href="/${p}">/${p}</a></li>`)
            .join("") +
          "</ul>",
      ),
    );
  }
}).listen(3000, () => console.log("Demo running at http://localhost:3000"));
