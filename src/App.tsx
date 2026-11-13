import { useEffect } from 'react';
import About from './components/About';
import CaseStudy from './components/CaseStudy';
import CommandPalette from './components/CommandPalette';
import Contact from './components/Contact';
import Cursor from './components/Cursor';
import Education from './components/Education';
import Footer from './components/Footer';
import GithubActivity from './components/GithubActivity';
import Header from './components/Header';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Vision from './components/Vision';
import { useLang } from './lib/i18n';
import { scrollToId } from './lib/nav';

export default function App() {
  const { t } = useLang();

  // Liens directs (/#projects…) : défile vers la section une fois le rendu terminé
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id && !id.startsWith('projet/')) requestAnimationFrame(() => scrollToId(id));
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-bg text-ink">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-[#111]"
      >
        {t('nav.skip')}
      </a>
      <Cursor />
      <CommandPalette />
      <CaseStudy />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <GithubActivity />
        <Education />
        <Vision />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
