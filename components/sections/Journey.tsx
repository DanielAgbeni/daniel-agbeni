import { Section } from '@/components/ui/Section';
import type { Experience } from '@/lib/types';

export function Journey({ entries }: { entries: Experience[] }) {
  return (
    <Section id="journey" title="Experience / Journey">
      <div className="space-y-4">
        {entries.length ? entries.map((entry, index) => (
          <div key={entry._id} className={`grid gap-4 md:grid-cols-2 ${index % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}>
            <div className="rounded-2xl border border-primary/10 bg-white p-5 shadow-soft">
              <p className="text-sm font-semibold text-primary">{entry.year}</p>
              <h3 className="font-heading text-lg">{entry.title}</h3>
            </div>
            <div className="rounded-2xl border border-primary/10 bg-white p-5 shadow-soft">
              <p className="text-sm text-text/75">{entry.description}</p>
            </div>
          </div>
        )) : <p className="text-text/60">No experience entries yet.</p>}
      </div>
    </Section>
  );
}
