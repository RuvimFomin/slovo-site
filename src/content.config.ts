import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const events = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/events" }),
  schema: ({ image }) =>
    z.object({
      number: z.number().optional(),
      title: z.string(),
      subtitle: z.string().optional(),
      description: z.string(),
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      startTime: z.string().regex(/^\d{2}:\d{2}$/),
      endTime: z.string().regex(/^\d{2}:\d{2}$/).optional(),
      timezone: z.literal("Europe/Moscow").default("Europe/Moscow"),
      location: z.string().default("Москва, ул. Тверская, 15"),
      speakerIds: z.array(z.string()).default([]),
      bibleReference: z.string().optional(),
      culturalProgram: z.string().optional(),
      poster: image().optional(),
      gallery: z.array(image()).default([]),
      registrationUrl: z.string().url().optional(),
      isFree: z.boolean().default(false),
      status: z.enum(["draft", "published", "completed", "cancelled"]).default("draft"),
      videoUrls: z
        .object({
          youtube: z.string().url().optional(),
          rutube: z.string().url().optional(),
          vk: z.string().url().optional(),
        })
        .optional(),
      audioUrl: z.string().url().optional(),
    }),
});

const speakers = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/speakers" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      bio: z.string(),
      photo: image().optional(),
      links: z
        .array(z.object({ label: z.string(), url: z.string().url() }))
        .default([]),
    }),
});

const lectures = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/lectures" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      speakerId: z.string(),
      bibleReference: z.string().optional(),
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      description: z.string().optional(),
      cover: image().optional(),
      videoUrl: z.string().url().optional(),
      audioUrl: z.string().url().optional(),
      eventId: z.string().optional(),
    }),
});

export const collections = { events, speakers, lectures };
