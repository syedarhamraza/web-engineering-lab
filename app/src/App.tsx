import { useState } from "react";
import { Greeting } from "./Greeting";
import { SlotTable } from "./SlotTable";
import { StatusMessage } from "./StatusMessage";
import { slots } from "./types";

export default function App() {
  const [booked, setBooked] = useState<string[]>([]);

  function toggle(day: string) {
    setBooked((current) =>
      current.includes(day)
        ? current.filter((d) => d !== day)
        : [...current, day],
    );
  }

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <header>
        <Greeting name="World" />
      </header>
      <main id="main-content">
        <section aria-labelledby="schedule-heading" id="schedule">
          <h2 id="schedule-heading" className="span-all">
            Office Hours
          </h2>
          <SlotTable slots={slots} booked={booked} onToggle={toggle} />
          <StatusMessage count={booked.length} total={slots.length} />
        </section>
      </main>
      <footer>
        <address>Contact your instructor for help.</address>
      </footer>
    </>
  );
}
