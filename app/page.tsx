import { Navbar } from '@/components/layout/Navbar';
import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';
import { Hero } from '@/components/sections/Hero';
import { Journey } from '@/components/sections/Journey';
import { Projects } from '@/components/sections/Projects';
import { Services } from '@/components/sections/Services';
import { StackMatrix } from '@/components/sections/StackMatrix';
import { getPortfolioContent } from '@/lib/portfolio';

export default async function HomePage() {
  const content = await getPortfolioContent();

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 pb-16">
        <Hero />
        <About />
        <StackMatrix skills={content.skills} />
        <Services services={content.services} />
        <Projects projects={content.projects} />
        <Journey entries={content.experience} />
        <Contact />
      </main>
    </>
  );
}
