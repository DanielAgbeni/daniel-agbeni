import { Award, GraduationCap } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { certifications, education, skillGroups } from '@/lib/resume';

export function SkillsSection() {
  return (
    <Section id="skills" title="Skills & education" lead="The tools I use day to day, and the training behind them.">
      <dl className="divide-y divide-line border-y border-line">
        {skillGroups.map((group) => (
          <div key={group.title} className="reveal grid gap-3 py-6 md:grid-cols-[12rem_1fr] md:gap-8">
            <dt className="text-sm font-semibold text-fg">{group.title}</dt>
            <dd>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm text-fg/90">
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {education.map((item) => (
          <div key={item.title} className="reveal rounded-2xl border border-line bg-surface p-6">
            <GraduationCap className="h-5 w-5 text-accent" aria-hidden="true" />
            <h3 className="mt-4 font-semibold leading-snug text-fg">{item.title}</h3>
            <p className="mt-2 text-sm text-muted">{item.institution}</p>
            <p className="mt-1 font-mono text-xs text-subtle">{item.period}</p>
          </div>
        ))}
        {certifications.map((item) => (
          <div key={item.title} className="reveal rounded-2xl border border-line bg-surface p-6">
            <Award className="h-5 w-5 text-accent" aria-hidden="true" />
            <h3 className="mt-4 font-semibold leading-snug text-fg">{item.title}</h3>
            <p className="mt-2 text-sm text-muted">{item.institution}</p>
            {item.detail ? <p className="mt-1 font-mono text-xs text-subtle">{item.detail}</p> : null}
          </div>
        ))}
      </div>
    </Section>
  );
}
