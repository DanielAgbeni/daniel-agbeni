import { Navbar } from '@/components/layout/Navbar';
import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';
import { Hero } from '@/components/sections/Hero';
import { Journey } from '@/components/sections/Journey';
import { Projects } from '@/components/sections/Projects';
import { Services } from '@/components/sections/Services';
import { StackMatrix } from '@/components/sections/StackMatrix';
import { getPortfolioContent } from '@/lib/portfolio';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const content = await getPortfolioContent();

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content" aria-label="Portfolio" className="mx-auto max-w-6xl px-6 pb-16">
        <Hero />
        <About />
        <StackMatrix skills={content.skills} />
        <Services services={content.services} />
        <Projects projects={content.projects} />
        <Journey entries={content.experience} />
        <Contact />
      </main>

      <footer className="border-t border-primary/10 bg-background">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-8 text-sm text-text/60 md:flex-row md:justify-between">
          <p>&copy; {new Date().getFullYear()} Daniel Agbeni. All rights reserved.</p>
          <nav aria-label="Social links" className="flex items-center gap-5">
            <a href="https://github.com/DanielAgbeni" target="_blank" rel="noopener noreferrer" className="transition hover:text-primary">GitHub</a>
            <a href="https://x.com/Agbeni_Daniel" target="_blank" rel="noopener noreferrer" className="transition hover:text-primary">X / Twitter</a>
            <a href="https://www.instagram.com/daniel_agbeni" target="_blank" rel="noopener noreferrer" className="transition hover:text-primary">Instagram</a>
            <a href="https://www.youtube.com/@daniel_agbeni" target="_blank" rel="noopener noreferrer" className="transition hover:text-primary">YouTube</a>
            <a href="mailto:danielagbeni@uploaddoc.app" className="transition hover:text-primary">Email</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
