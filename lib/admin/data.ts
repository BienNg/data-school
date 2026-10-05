import 'server-only';
import { serverClient } from '@/lib/supabase/server';
import { rpcArgs, type Filters } from './range';

export type Overview = {
  sessions: number;
  visitors: number;
  engaged_sessions: number;
  median_active_ms: number;
  form_view: number;
  form_start: number;
  form_submit: number;
  converted_sessions: number;
  leads: number;
  scroll: { mark: number; sessions: number }[];
};
export type DayRow = { day: string; sessions: number; visitors: number; leads: number };
export type FunnelRow = { step: number; key: string; label: string; sessions: number };
export type SectionRow = {
  section: string;
  sessions_viewed: number;
  avg_dwell_ms: number;
  clicks: number;
  last_seen: number;
  converted_viewers: number;
};
export type CtaRow = { target: string; section: string | null; clicks: number; sessions: number; converted_sessions: number };
export type FormStats = {
  starts: number;
  submits: number;
  success: number;
  fields: Record<string, number>;
  errors: { message: string; count: number }[];
  status: { value: string; leads: number }[];
  bereich: { value: string; leads: number }[];
};
export type SourceRow = { label: string; sessions: number; visitors: number; engaged: number; converted: number };
export type FaqRow = { target: string; opens: number; sessions: number; converted_sessions: number };
export type LeadRow = {
  id: string;
  created_at: string;
  vorname: string;
  email: string;
  telefon: string | null;
  status: string;
  bereich: string;
  source: string | null;
  medium: string | null;
  campaign: string | null;
  device: string | null;
  country: string | null;
  last_cta: string | null;
  active_s: number;
};

// PostgREST may return bigint/numeric as strings — coerce the known numeric columns.
const NUMERIC = new Set([
  'step', 'sessions', 'visitors', 'leads', 'sessions_viewed', 'avg_dwell_ms', 'clicks', 'last_seen',
  'converted_viewers', 'converted_sessions', 'engaged', 'converted', 'opens', 'active_s',
]);
function num<T>(rows: T[] | null): T[] {
  return (rows ?? []).map((r) => {
    const o: Record<string, unknown> = { ...(r as Record<string, unknown>) };
    for (const k of Object.keys(o)) if (NUMERIC.has(k) && o[k] != null) o[k] = Number(o[k]);
    return o as T;
  });
}

async function rpc<T>(fn: string, args: Record<string, unknown>): Promise<T> {
  const db = await serverClient();
  const { data, error } = await db.rpc(fn, args);
  if (error) throw new Error(`${fn}: ${error.message}`);
  return data as T;
}

export const getOverview = (f: Filters, prev = false) => rpc<Overview>('analytics_overview', rpcArgs(f, prev));
export const getTimeseries = async (f: Filters) => num(await rpc<DayRow[]>('analytics_timeseries', rpcArgs(f)));
export const getFunnel = async (f: Filters) => num(await rpc<FunnelRow[]>('analytics_funnel', rpcArgs(f)));
export const getSections = async (f: Filters) => num(await rpc<SectionRow[]>('analytics_sections', rpcArgs(f)));
export const getCtas = async (f: Filters) => num(await rpc<CtaRow[]>('analytics_ctas', rpcArgs(f)));
export const getForm = (f: Filters) => rpc<FormStats>('analytics_form', rpcArgs(f));
export const getFaq = async (f: Filters) => num(await rpc<FaqRow[]>('analytics_faq', rpcArgs(f)));
export const getSources = async (f: Filters, dim: string) =>
  num(await rpc<SourceRow[]>('analytics_sources', { ...rpcArgs(f), p_dim: dim }));
export const getLeads = async (f: Filters) =>
  num(await rpc<LeadRow[]>('admin_leads', { p_from: f.from.toISOString(), p_to: f.to.toISOString() }));
