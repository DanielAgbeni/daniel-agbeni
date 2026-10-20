import { Section } from '@/components/ui/Section';
import { experience } from '@/lib/resume';

export function ExperienceSection() {
  return (
    <Section id="experience" title="Experience" lead="Three years of building and shipping software, plus a year teaching developers how to do the same.">
      <ol className="relative space-y-12 border-l border-line pl-8 md:ml-[11rem] md:space-y-14">
        {experience.map((job) => (
          <li key={`${job.company}-${job.start}`} className="reveal relative">
            <span aria-hidden="true" className="absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-bg bg-accent ring-1 ring-accent/40" />
            <p className="mb-2 font-mono text-xs text-subtle [font-variant-numeric:tabular-nums] md:absolute md:-left-[13rem] md:top-1 md:mb-0 md:w-40 md:text-right">
              <time dateTime={job.start}>{job.period.split(' – ')[0]}</time>
              {' – '}
              {job.end ? <time dateTime={job.end}>{job.period.split(' – ')[1]}</time> : 'Present'}
            </p>
            <h3 className="text-lg font-semibold tracking-tight text-fg">{job.role}</h3>
            <p className="mt-0.5 text-sm text-muted">
              {job.company}
              {job.location ? ` · ${job.location}` : ''}
            </p>
            <ul className="mt-4 max-w-2xl space-y-2.5 text-[15px] leading-relaxed text-muted">
              {job.points.map((point) => (
                <li key={point} className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2.5 before:bg-subtle">
                  {point}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
