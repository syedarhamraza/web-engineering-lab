export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function makeCounter() {
  let count = 0;
  return () => ++count;
}
