import { SlotRow } from "./SlotRow";
import type { Slot } from "./types";

interface SlotTableProps {
  slots: Slot[];
  booked: string[];
  onToggle: (day: string) => void;
}

export function SlotTable({ slots, booked, onToggle }: SlotTableProps) {
  return (
    <table>
      <caption>Weekly office hours</caption>
      <thead>
        <tr>
          <th scope="col">Day</th>
          <th scope="col">Time</th>
          <th scope="col">Location</th>
          <th scope="col">Book</th>
        </tr>
      </thead>
      <tbody>
        {slots.map((slot) => (
          <SlotRow
            key={slot.day}
            slot={slot}
            booked={booked.includes(slot.day)}
            onToggle={onToggle}
          />
        ))}
      </tbody>
    </table>
  );
}
