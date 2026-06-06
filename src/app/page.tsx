import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import TechStack from "@/components/sections/TechStack";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full max-w-[1440px]">
        <Hero />
        <Projects />
        <TechStack />
        
        <footer className="w-full py-8 text-center text-gray-500 text-sm glass-panel mt-20 border-t border-white/10">
          <p>© {new Date().getFullYear()} Sashankar J. Built with Next.js & Framer Motion.</p>
        </footer>
      </div>
    </main>
  );
}
