'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import type { Service } from '@/lib/types';

const fallback: Omit<Service, '_id'>[] = [
  { title: 'Frontend Development (Web & Mobile)', description: 'High-performance interfaces with modern architecture and reusable components.', icon: '🧩' },
  { title: 'Backend Development', description: 'API and data systems optimized for reliability, scale, and observability.', icon: '🛠️' },
  { title: 'Cloud Services (PaaS Focus)', description: 'Cloud-native deployment workflows, managed infrastructure, and secure operations.', icon: '☁️' }
];

export function Services({ services }: { services: Service[] }) {
  const data = services.length ? services : fallback.map((item, index) => ({ ...item, _id: `fallback-${index}` }));

  return (
    <Section id="services" title="Services">
      <div className="grid gap-4 md:grid-cols-3">
        {data.map((service) => (
          <motion.article
            key={service._id}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl border border-primary/10 bg-white p-5 shadow-soft"
          >
            <p className="text-2xl">{service.icon}</p>
            <h3 className="mt-3 font-heading text-lg">{service.title}</h3>
            <p className="mt-2 text-sm text-text/70">{service.description}</p>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
