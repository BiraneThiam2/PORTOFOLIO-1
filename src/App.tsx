import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Goals from './components/Goals';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#030712] text-slate-900 dark:text-white overflow-x-hidden transition-colors duration-300">
      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-violet-700/20 dark:bg-violet-700/20 rounded-full blur-[120px] animate-orb" />
        <div className="absolute top-2/3 -right-40 w-[500px] h-[500px] bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-[120px] animate-orb-reverse" />
        <div className="absolute bottom-1/3 left-1/3 w-[300px] h-[300px] bg-pink-600/10 rounded-full blur-[100px] animate-float-slow" />
      </div>

      <div className="relative z-10">
        <Header />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Goals />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;
