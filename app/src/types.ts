export interface Slot {
  day: string;
  start: string;
  end: string;
  room: string;
}

export const slots: Slot[] = [
  { day: "Monday", start: "10:00", end: "11:00", room: "Room 214" },
  { day: "Wednesday", start: "14:00", end: "15:00", room: "Room 214" },
];
