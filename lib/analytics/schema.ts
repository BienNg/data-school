import { z } from 'zod';
import { BEREICH_OPTIONS, STATUS_OPTIONS } from '@/lib/sections';

export const EVENT_TYPES = [
  'page_view',
  'click',
  'outbound_click',
  'section_view',
  'section_dwell',
  'scroll_depth',
  'engagement',
  'faq_open',
  'form_start',
  'form_field_complete',
  'form_submit',
  'form_success',
  'form_error',
] as const;

export type EventType = (typeof EVENT_TYPES)[number];

const shortText = z.string().trim().max(120);

export const trackEventSchema = z.object({
  type: z.enum(EVENT_TYPES),
  section: shortText.optional(),
  target: shortText.optional(),
  value: z.record(z.string(), z.union([z.string().max(200), z.number(), z.boolean(), z.null()])).optional(),
  // Milliseconds between the event happening and the batch being sent.
  // The server derives the timestamp from this, so client clock skew doesn't matter.
  age: z.number().int().min(0).max(24 * 60 * 60 * 1000),
});

export const trackContextSchema = z.object({
  path: z.string().max(300),
  referrer: z.string().max(500).optional(),
  utm_source: shortText.optional(),
  utm_medium: shortText.optional(),
  utm_campaign: shortText.optional(),
  utm_content: shortText.optional(),
  utm_term: shortText.optional(),
  vw: z.number().int().min(0).max(20000).optional(),
  vh: z.number().int().min(0).max(20000).optional(),
  lang: z.string().max(35).optional(),
});

export const trackPayloadSchema = z.object({
  sid: z.uuid(),
  ctx: trackContextSchema.optional(),
  events: z.array(trackEventSchema).min(1).max(60),
});

export type TrackEvent = z.infer<typeof trackEventSchema>;
export type TrackContext = z.infer<typeof trackContextSchema>;
export type TrackPayload = z.infer<typeof trackPayloadSchema>;

const statusValues = STATUS_OPTIONS.map((o) => o.value) as [string, ...string[]];
const bereichValues = BEREICH_OPTIONS.map((o) => o.value) as [string, ...string[]];

export const leadSchema = z.object({
  sid: z.uuid().optional(),
  vorname: z.string().trim().min(1).max(80),
  email: z.email().max(200),
  telefon: z.string().trim().max(40).optional().default(''),
  status: z.enum(statusValues),
  bereich: z.enum(bereichValues),
  botcheck: z.union([z.boolean(), z.string()]).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
