const test = require("node:test");
const assert = require("node:assert/strict");
const { greet } = require("../public/script");

test('greet("Arham") returns "Hello, Arham!"', () => {
  const result = greet("Arham");
  assert.strictEqual(result, "Hello, Arham!");
});
