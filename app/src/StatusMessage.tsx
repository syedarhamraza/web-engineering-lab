interface StatusMessageProps {
  count: number;
  total: number;
}

export function StatusMessage({ count, total }: StatusMessageProps) {
  return (
    <p id="status" role="status" className="span-all text-muted">
      {count} of {total} slots booked.
    </p>
  );
}
