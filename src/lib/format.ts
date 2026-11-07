const TZ = "Europe/Moscow";

/** "8 ноября" */
export function formatDate(dateStr: string): string {
  const d = new Date(`${dateStr}T12:00:00+03:00`);
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    timeZone: TZ,
  }).format(d);
}

/** "Воскресенье, 8 ноября" */
export function formatDateFull(dateStr: string): string {
  const d = new Date(`${dateStr}T12:00:00+03:00`);
  const s = new Intl.DateTimeFormat("ru-RU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: TZ,
  }).format(d);
  return s.charAt(0).toUpperCase() + s.slice(1);
}
