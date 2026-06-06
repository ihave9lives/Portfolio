"use client";

import { motion } from "framer-motion";

const technologies = [
  { name: "Rust", category: "Core" },
  { name: "Python", category: "Core" },
  { name: "TypeScript", category: "Core" },
  { name: "Next.js", category: "Web" },
  { name: "React", category: "Web" },
  { name: "Tailwind CSS", category: "Web" },
  { name: "Docker", category: "DevOps" },
  { name: "Kubernetes", category: "DevOps" },
  { name: "AWS", category: "DevOps" },
  { name: "CI/CD", category: "DevOps" },
  { name: "TensorFlow", category: "AI" },
  { name: "PyTorch", category: "AI" },
];

export default function TechStack() {
  return (
    <section className="py-24 px-6 md:px-24 relative z-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 tracking-tight text-center">
          Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">Arsenal</span>
        </h2>
        
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="interactive px-6 py-3 rounded-xl glass-panel text-gray-200 font-medium hover-glow border border-white/5 cursor-default flex flex-col items-center justify-center min-w-[120px]"
            >
              <span className="text-xs text-sky-400 mb-1 font-semibold uppercase tracking-wider">{tech.category}</span>
              <span className="text-lg">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
