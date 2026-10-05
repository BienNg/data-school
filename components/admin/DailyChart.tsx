'use client';

import { Area, Bar, BarChart, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type Point = { day: string; value: number };

const fmtDay = (d: string) => {
  const [, m, day] = d.slice(0, 10).split('-');
  return `${day}.${m}.`;
};

function Tip({ active, payload, unit }: { active?: boolean; payload?: { payload: Point }[]; unit: string }) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  return (
    <div className="adm-chart-tip">
      <div className="t-title" style={{ color: 'var(--ink-2)', fontSize: 12 }}>{fmtDay(p.day)}</div>
      <div style={{ fontSize: 13 }}>
        <strong style={{ fontVariantNumeric: 'tabular-nums' }}>{p.value.toLocaleString('de-DE')}</strong>{' '}
        <span style={{ color: 'var(--ink-2)' }}>{unit}</span>
      </div>
    </div>
  );
}

/** One measure per chart (never a second y-axis): a line for traffic, columns for leads. */
export function DailyChart({ data, kind, unit }: { data: Point[]; kind: 'line' | 'columns'; unit: string }) {
  const axis = {
    stroke: 'var(--axis)',
    tickLine: false,
    axisLine: { stroke: 'var(--axis)' },
  } as const;
  const interval = data.length > 31 ? Math.ceil(data.length / 10) - 1 : data.length > 14 ? 2 : 0;

  if (kind === 'columns') {
    return (
      <div className="adm-chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -12 }} barCategoryGap={2}>
            <CartesianGrid vertical={false} stroke="var(--grid)" />
            <XAxis dataKey="day" tickFormatter={fmtDay} interval={interval} {...axis} />
            <YAxis allowDecimals={false} {...axis} axisLine={false} width={44} />
            <Tooltip content={<Tip unit={unit} />} cursor={{ fill: 'var(--wash)' }} />
            <Bar dataKey="value" fill="var(--series-2)" radius={[4, 4, 0, 0]} maxBarSize={24} isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
  return (
    <div className="adm-chart">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
          <CartesianGrid vertical={false} stroke="var(--grid)" />
          <XAxis dataKey="day" tickFormatter={fmtDay} interval={interval} {...axis} />
          <YAxis allowDecimals={false} {...axis} axisLine={false} width={44} />
          <Tooltip content={<Tip unit={unit} />} cursor={{ stroke: 'var(--axis)', strokeWidth: 1 }} />
          <Area dataKey="value" fill="var(--series-1)" fillOpacity={0.1} stroke="none" isAnimationActive={false} />
          <Line
            dataKey="value"
            stroke="var(--series-1)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: 'var(--series-1)', stroke: 'var(--surface)', strokeWidth: 2 }}
            isAnimationActive={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
