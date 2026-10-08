"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import TechStack from "@/components/sections/TechStack";
import ThemeToggle from "@/components/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="relative flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full max-w-[1440px]">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-40 px-6 md:px-24 py-4">
          <div className="max-w-[1440px] mx-auto flex items-center justify-between">
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="font-mono text-xl font-bold text-white tracking-tight"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              SASHANKAR J
            </motion.a>

            <div className="hidden md:flex items-center gap-6">
              <a href="#projects" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm font-medium">Projects</a>
              <a href="#tech" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm font-medium">Tech Stack</a>
              <a href="#contact" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm font-medium">Contact</a>
              <ThemeToggle />
            </div>

            <div className="md:hidden flex items-center gap-4">
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 glass-panel rounded-xl p-4 overflow-hidden"
              >
                <div className="flex flex-col gap-2">
                  <a href="#projects" className="text-gray-300 hover:text-cyan-400 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Projects</a>
                  <a href="#tech" className="text-gray-300 hover:text-cyan-400 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Tech Stack</a>
                  <a href="#contact" className="text-gray-300 hover:text-cyan-400 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Contact</a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        <Hero />
        <Projects />
        <TechStack />

        <footer id="contact" className="w-full py-12 text-center text-gray-500 text-sm glass-panel mt-20 border-t border-white/10 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <p className="font-mono text-white mb-4">Built with Next.js, Framer Motion & TypeScript</p>
            <p className="text-gray-400">© {new Date().getFullYear()} Sashankar J. All rights reserved.</p>
            <div className="flex justify-center gap-4 mt-6">
              <a href="https://github.com/ihave9lives" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/sashankar-j-30399a3b1/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </motion.div>
        </footer>
      </div>
    </main>
  );
}