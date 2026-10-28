export interface Slot {
  day: string;
  start: string;
  end: string;
  room: string;
}

export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function makeCounter(): () => number {
  let count = 0;
  return () => ++count;
}

export function getRequired<T extends Element>(
  selector: string,
  root: ParentNode = document,
): T {
  const element = root.querySelector<T>(selector);
  if (element === null) {
    throw new Error(`Missing element: ${selector}`);
  }
  return element;
}

export function describeSlot(slot: Slot): string {
  return `${slot.day} ${slot.start}–${slot.end}, ${slot.room}`;
}
