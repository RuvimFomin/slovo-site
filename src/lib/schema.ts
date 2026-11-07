import type { EventEntry } from "./events";
import { startIso, endIso } from "./events";
import { site } from "../data/site";
import type { CollectionEntry } from "astro:content";

type Speaker = CollectionEntry<"speakers">;

/** schema.org/Event для страницы встречи. */
export function eventJsonLd(
  event: EventEntry,
  speakers: Speaker[],
  posterUrl?: string,
) {
  const d = event.data;
  const json: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: d.title,
    description: d.description,
    startDate: startIso(event),
    eventStatus:
      d.status === "cancelled"
        ? "https://schema.org/EventCancelled"
        : "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: site.fullName,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Москва",
        streetAddress: "ул. Тверская, 15",
        addressCountry: "RU",
      },
    },
    organizer: {
      "@type": "Organization",
      name: site.fullName,
      url: site.url,
    },
    url: `${site.url}/events/${event.id}/`,
  };

  const end = endIso(event);
  if (end) json.endDate = end;
  if (posterUrl) json.image = [posterUrl];
  if (speakers.length > 0) {
    json.performer = speakers.map((s) => ({
      "@type": "Person",
      name: s.data.name,
    }));
  }
  // Сведения о стоимости добавляем, только если бесплатный вход подтверждён в контенте.
  if (d.isFree) {
    json.offers = {
      "@type": "Offer",
      price: 0,
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
      url: d.registrationUrl ?? `${site.url}/events/${event.id}/`,
    };
  }
  if (d.registrationUrl) {
    json.url = `${site.url}/events/${event.id}/`;
  }
  return json;
}
