import type { Benchmark } from '@/lib/projects';

const latencyFormatter = new Intl.NumberFormat('en', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const lossFormatter = new Intl.NumberFormat('en', { minimumFractionDigits: 2, maximumFractionDigits: 3 });

interface BenchmarkChartProps {
  benchmark: Benchmark;
  /** Compact = latency bars only (cards). Full = bars + data table (case study). */
  variant?: 'compact' | 'full';
}

/** Latency comparison rendered from real benchmark data. Lower is better. */
export function BenchmarkChart({ benchmark, variant = 'compact' }: BenchmarkChartProps) {
  const maxLatency = Math.max(...benchmark.rows.map((row) => row.latencyMs));

  return (
    <figure className="w-full">
      <figcaption className="mb-4 flex items-baseline justify-between gap-4">
        <span className="text-sm font-semibold text-fg">Mean path latency</span>
        <span className="text-xs text-subtle">lower is better</span>
      </figcaption>
      <ul className="space-y-2.5">
        {benchmark.rows.map((row) => (
          <li key={row.name} className="grid grid-cols-[5.5rem_1fr_4.25rem] items-center gap-3 text-xs sm:grid-cols-[6.5rem_1fr_4.5rem]">
            <span className={row.highlight ? 'font-semibold text-fg' : 'text-muted'}>{row.name}</span>
            <span className="h-2.5 overflow-hidden rounded-full bg-line/70" aria-hidden="true">
              <span
                className={`block h-full origin-left rounded-full ${row.highlight ? 'bg-accent' : 'bg-subtle/50'}`}
                style={{ transform: `scaleX(${row.latencyMs / maxLatency})` }}
              />
            </span>
            <span className={`text-right font-mono [font-variant-numeric:tabular-nums] ${row.highlight ? 'font-semibold text-fg' : 'text-muted'}`}>
              {latencyFormatter.format(row.latencyMs)} ms
            </span>
          </li>
        ))}
      </ul>

      {variant === 'full' ? (
        <div className="mt-8 overflow-x-auto rounded-xl border border-line">
          <table className="w-full min-w-[22rem] text-left text-sm">
            <caption className="sr-only">
              {benchmark.caption}: latency and packet loss by routing algorithm
            </caption>
            <thead className="bg-surface-2 text-xs text-muted">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">
                  Algorithm
                </th>
                <th scope="col" className="px-4 py-3 text-right font-medium">
                  Latency (ms)
                </th>
                <th scope="col" className="px-4 py-3 text-right font-medium">
                  Packet loss (%)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line [font-variant-numeric:tabular-nums]">
              {benchmark.rows.map((row) => (
                <tr key={row.name} className={row.highlight ? 'bg-accent/5 font-semibold text-fg' : 'text-muted'}>
                  <th scope="row" className="px-4 py-3 font-medium">
                    {row.name}
                  </th>
                  <td className="px-4 py-3 text-right font-mono">{latencyFormatter.format(row.latencyMs)}</td>
                  <td className="px-4 py-3 text-right font-mono">{lossFormatter.format(row.packetLossPct)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      <p className="mt-4 text-xs leading-relaxed text-subtle">
        {benchmark.caption}.{variant === 'full' ? ` ${benchmark.source}` : ''}
      </p>
    </figure>
  );
}
