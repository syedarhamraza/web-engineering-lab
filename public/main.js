import { delay, makeCounter } from "./utils.js";

const status = document.querySelector("#status");
const tbody = document.querySelector("#schedule tbody");
const nextBooking = makeCounter();

tbody.addEventListener("click", async (event) => {
  const button = event.target.closest("button[data-day]");
  if (!button) return;

  const day = button.dataset.day;
  const row = button.closest("tr");

  status.textContent = `Updating ${day}…`;
  await delay(1000);

  const booked = row.classList.toggle("selected");
  const count = document.querySelectorAll("#schedule tr.selected").length;

  status.textContent = booked
    ? `Booking #${nextBooking()} confirmed for ${day}. ${count} of 2 slots booked.`
    : `Booking for ${day} cancelled. ${count} of 2 slots booked.`;
});
