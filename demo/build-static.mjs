import { mkdirSync, writeFileSync } from "node:fs";
import { page, time } from "./page.mjs";

mkdirSync("demo/dist", { recursive: true });
writeFileSync(
  "demo/dist/ssg.html",
  page("SSG", `<p id="time">Built at ${time()}</p>`),
);
console.log("Wrote demo/dist/ssg.html");
