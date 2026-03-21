import { Section } from '@/components/ui/Section';

export function About() {
  return (
    <Section id="about" title="About">
      <p className="max-w-3xl text-text/75">
        I design and ship product-grade systems across web and mobile.
        I care about resilient architecture, clear UX, and maintainable code.
        My focus is building fast experiences that scale without friction.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-primary/10 bg-white p-5 shadow-soft">
          <p className="text-3xl font-bold text-primary">25+</p>
          <p className="text-sm text-text/70">Projects delivered</p>
        </div>
        <div className="rounded-2xl border border-primary/10 bg-white p-5 shadow-soft">
          <p className="text-3xl font-bold text-primary">10+</p>
          <p className="text-sm text-text/70">Systems engineered</p>
        </div>
      </div>
    </Section>
  );
}
