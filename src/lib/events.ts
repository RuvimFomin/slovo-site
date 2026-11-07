import { getCollection, type CollectionEntry } from "astro:content";

export type EventEntry = CollectionEntry<"events">;

const MSK_OFFSET = "+03:00"; // Europe/Moscow — фиксированное смещение круглый год

export function eventStart(event: EventEntry): Date {
  return new Date(`${event.data.date}T${event.data.startTime}:00${MSK_OFFSET}`);
}

export function eventEnd(event: EventEntry): Date {
  if (event.data.endTime) {
    return new Date(`${event.data.date}T${event.data.endTime}:00${MSK_OFFSET}`);
  }
  return new Date(eventStart(event).getTime() + 3 * 60 * 60 * 1000);
}

export function startIso(event: EventEntry): string {
  return `${event.data.date}T${event.data.startTime}:00${MSK_OFFSET}`;
}

export function endIso(event: EventEntry): string | undefined {
  return event.data.endTime
    ? `${event.data.date}T${event.data.endTime}:00${MSK_OFFSET}`
    : undefined;
}

async function getVisible(): Promise<EventEntry[]> {
  const all = await getCollection("events");
  return all.filter((e) => e.data.status !== "draft");
}

/** Ближайшая опубликованная предстоящая встреча (на момент сборки). */
export async function getNextEvent(now = new Date()): Promise<EventEntry | undefined> {
  const events = await getVisible();
  return events
    .filter((e) => e.data.status === "published" && eventEnd(e) > now)
    .sort((a, b) => eventStart(a).getTime() - eventStart(b).getTime())[0];
}

/** Все предстоящие опубликованные встречи по возрастанию даты. */
export async function getUpcomingEvents(now = new Date()): Promise<EventEntry[]> {
  const events = await getVisible();
  return events
    .filter((e) => e.data.status === "published" && eventEnd(e) > now)
    .sort((a, b) => eventStart(a).getTime() - eventStart(b).getTime());
}

/** Прошедшие встречи (архив) по убыванию даты. */
export async function getPastEvents(now = new Date()): Promise<EventEntry[]> {
  const events = await getVisible();
  return events
    .filter(
      (e) =>
        e.data.status === "completed" ||
        (e.data.status !== "draft" && eventEnd(e) <= now),
    )
    .sort((a, b) => eventStart(b).getTime() - eventStart(a).getTime());
}

/** Все события, которым нужна своя страница. */
export async function getEventPages(): Promise<EventEntry[]> {
  return getVisible();
}
