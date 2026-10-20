import { site } from '@/lib/site';

interface Stat {
  value: string;
  label: string;
}

/** Every figure here is taken from the CV or the GARRO benchmark results. */
const stats: readonly Stat[] = [
  { value: '2023', label: 'Shipping production web and mobile apps since' },
  { value: '6', label: 'Featured projects across web, mobile, backend and ML' },
  { value: '30+', label: 'Developers mentored in production React' },
  { value: '55%', label: 'Lower latency than OSPF in my GARRO routing research' },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="border-t border-line py-20 md:py-28">
      <div className="mx-auto grid max-w-page gap-14 px-5 sm:px-8 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <div className="reveal">
          <h2 id="about-heading" className="text-3xl font-semibold tracking-tight text-fg md:text-4xl">
            About
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted">
            <p>{site.summary}</p>
            <p>
              Before going independent I taught JavaScript and React professionally, designing curricula and reviewing code for more than 30 developers. That
              experience shapes how I work today: readable code, clear communication and systems that other people can maintain.
            </p>
            <p>
              I hold an HND in Networking &amp; Cloud Computing and am a Graduate Member of the Computer Professionals Registration Council of Nigeria (CPN).
            </p>
          </div>
        </div>

        <dl className="reveal grid grid-cols-2 gap-px self-start overflow-hidden rounded-2xl border border-line bg-line">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse gap-2 bg-surface p-6">
              <dt className="text-sm leading-snug text-muted">{stat.label}</dt>
              <dd className="text-4xl font-semibold tracking-tight text-fg [font-variant-numeric:tabular-nums]">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
