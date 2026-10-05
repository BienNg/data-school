/** The Data School bar-chart "D" mark. The letter colour follows the `--d-fill` CSS variable. */
export function DataMark() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect x="2" y="42" width="7" height="16" rx="1" fill="#C7C7CC" />
      <rect x="12" y="34" width="7" height="24" rx="1" fill="#8E8E93" />
      <rect x="22" y="24" width="7" height="34" rx="1" fill="#F08A3C" />
      <rect x="32" y="14" width="7" height="44" rx="1" fill="#ED7117" />
      <path
        style={{ fill: 'var(--d-fill, #2B2B2E)' }}
        d="M42 6 H47 C58 6 64 16 64 32 C64 48 58 58 47 58 H42 V50 H47 C53.5 50 56.5 42.5 56.5 32 C56.5 21.5 53.5 14 47 14 H42 Z"
      />
    </svg>
  );
}

export function Wordmark() {
  return (
    <span className="wordmark">
      <span className="top">
        <span className="o">DATA</span> SCHOOL
      </span>
      <span className="bottom">Datenwissen für die Zukunft</span>
    </span>
  );
}
