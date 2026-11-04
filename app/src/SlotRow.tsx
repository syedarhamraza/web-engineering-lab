import type { Slot } from "./types";

interface SlotRowProps {
  slot: Slot;
  booked: boolean;
  onToggle: (day: string) => void;
}

export function SlotRow({ slot, booked, onToggle }: SlotRowProps) {
  const action = booked ? "Cancel" : "Select";

  return (
    <tr className={booked ? "selected" : undefined}>
      <th scope="row">{slot.day}</th>
      <td>
        <time dateTime={slot.start}>{slot.start}</time>–
        <time dateTime={slot.end}>{slot.end}</time>
      </td>
      <td>{slot.room}</td>
      <td>
        <button
          type="button"
          aria-label={`${action} ${slot.day}`}
          onClick={() => onToggle(slot.day)}
        >
          {action}
        </button>
      </td>
    </tr>
  );
}
