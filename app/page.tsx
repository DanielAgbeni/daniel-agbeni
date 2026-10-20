import { About } from '@/components/home/About';
import { ContactSection } from '@/components/home/ContactSection';
import { ExperienceSection } from '@/components/home/ExperienceSection';
import { Hero } from '@/components/home/Hero';
import { ProjectsSection } from '@/components/home/ProjectsSection';
import { SkillsSection } from '@/components/home/SkillsSection';
import { JsonLd } from '@/components/seo/JsonLd';
import { homeGraph } from '@/lib/structured-data';

export default function HomePage() {
  return (
    <main id="main-content">
      <JsonLd data={homeGraph()} />
      <Hero />
      <ProjectsSection />
      <ExperienceSection />
      <SkillsSection />
      <About />
      <ContactSection />
    </main>
  );
}
