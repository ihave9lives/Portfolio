"use client";

import { motion } from "framer-motion";

const technologies = [
  { name: "Rust", category: "Core" },
  { name: "Python", category: "Core" },
  { name: "TypeScript", category: "Core" },
  { name: "JavaScript", category: "Core" },
  { name: "SQL", category: "Core" },
  { name: "Next.js", category: "Web" },
  { name: "React", category: "Web" },
  { name: "Tailwind CSS", category: "Web" },
  { name: "Framer Motion", category: "Web" },
  { name: "Three.js", category: "Web" },
  { name: "Tauri", category: "Desktop" },
  { name: "Streamlit", category: "Data Apps" },
  { name: "FastAPI", category: "API" },
  { name: "Flask", category: "API" },
  { name: "Docker", category: "DevOps" },
  { name: "Kubernetes", category: "DevOps" },
  { name: "AWS", category: "DevOps" },
  { name: "CI/CD", category: "DevOps" },
  { name: "TensorFlow", category: "AI/ML" },
  { name: "PyTorch", category: "AI/ML" },
  { name: "scikit-learn", category: "AI/ML" },
  { name: "IsolationForest", category: "AI/ML" },
];

export default function TechStack() {
  return (
    <section className="py-24 px-6 md:px-24 relative z-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 tracking-tight text-center font-mono tracking-wider">
          TECHNICAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500">ARSENAL</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03, duration: 0.4 }}
              whileHover={{ scale: 1.05, y: -3 }}
              className="btn btn-glass px-5 py-2.5 rounded-lg text-sm font-medium cursor-default flex flex-col items-center justify-center min-w-[110px] group"
            >
              <span className="text-xs text-cyan-400 mb-0.5 font-semibold uppercase tracking-wider font-mono">{tech.category}</span>
              <span className="text-base font-mono tracking-tight">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}