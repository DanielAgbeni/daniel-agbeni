import { memo } from 'react';
import { Section } from '@/components/ui/Section';
import type { Skill } from '@/lib/types';

const categories: Skill['category'][] = ['frontend', 'backend', 'mobile', 'cloud'];

function StackMatrixComponent({ skills }: { skills: Skill[] }) {
  return (
    <Section id="skills" title="Stack Matrix">
      <div className="grid gap-4 md:grid-cols-2">
        {categories.map((category) => {
          const items = skills.filter((skill) => skill.category === category);
          return (
            <article key={category} className="rounded-2xl border border-border-line bg-surface p-5 shadow-card">
              <h3 className="mb-3 font-heading text-lg capitalize">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.length ? items.map((item) => (
                  <span key={item._id} className="rounded-full border border-border-line bg-primary/5 px-3 py-1 text-xs font-medium">
                    {item.name}
                  </span>
                )) : <span className="text-sm text-text/50">No skills yet</span>}
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}

export const StackMatrix = memo(StackMatrixComponent);
