// Line icons used in the landing cards (stroke = brand orange).
const PATHS: Record<string, React.ReactNode> = {
  cap: (<><path d="M22 9L12 4 2 9l10 5 10-5z" /><path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" /><path d="M22 9v5" /></>),
  brain: (<><path d="M12 3a3.5 3.5 0 00-3.4 2.7A3.5 3.5 0 006 12a3.5 3.5 0 002.6 6.3A3.5 3.5 0 0012 21a3.5 3.5 0 003.4-2.7A3.5 3.5 0 0018 12a3.5 3.5 0 00-2.6-6.3A3.5 3.5 0 0012 3z" /><path d="M12 8v8M9.5 10.5L12 12l2.5-1.5" /></>),
  certificate: (<><circle cx="12" cy="9" r="5" /><path d="M12 6.5l.9 1.8 2 .3-1.45 1.4.35 2-1.8-.95-1.8.95.35-2L9.1 8.6l2-.3L12 6.5z" fill="#ED7117" stroke="none" /><path d="M8.5 13.5L7 21l5-2.5L17 21l-1.5-7.5" /></>),
  chart: (<><path d="M3 3v18h18" /><path d="M7 14l4-4 4 4 5-6" /></>),
  bulb: (<><path d="M9 18h6M10 22h4" /><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z" /></>),
  laptop: (<><rect x="4" y="5" width="16" height="11" rx="2" /><path d="M2 19h20" /></>),
  restart: (<><path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v5h5" /></>),
  compass: (<><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" /></>),
  bars: (<><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>),
  question: (<><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6" /><path d="M12 17h.01" /></>),
  plus: <path d="M12 2v20M2 12h20" />,
  signal: <path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16M5 19a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />,
  check: <path d="M20 6L9 17l-5-5" />,
};

export function Icon({ name }: { name: keyof typeof PATHS | string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#ED7117" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      {PATHS[name]}
    </svg>
  );
}

export function CheckMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M20 6L9 17l-5-5" stroke="#ED7117" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
