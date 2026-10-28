function greet(name) {
  return `Hello, ${name}!`;
}

if (typeof document !== "undefined") {
  const heading = document.getElementById("heading");
  if (heading) {
    heading.textContent = greet("Arham");
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { greet };
}
