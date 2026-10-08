"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

const technologies = [
  { name: "Rust", category: "Core", color: "from-orange-500 to-red-500" },
  { name: "Python", category: "Core", color: "from-blue-500 to-yellow-500" },
  { name: "TypeScript", category: "Core", color: "from-blue-600 to-cyan-500" },
  { name: "JavaScript", category: "Core", color: "from-yellow-500 to-amber-500" },
  { name: "SQL", category: "Core", color: "from-orange-600 to-amber-700" },
  { name: "Next.js", category: "Web", color: "from-gray-800 to-white" },
  { name: "React", category: "Web", color: "from-cyan-500 to-blue-500" },
  { name: "Tailwind CSS", category: "Web", color: "from-cyan-500 to-teal-500" },
  { name: "Framer Motion", category: "Web", color: "from-pink-500 to-purple-500" },
  { name: "Three.js", category: "Web", color: "from-black to-gray-400" },
  { name: "Tauri", category: "Desktop", color: "from-blue-600 to-cyan-400" },
  { name: "Streamlit", category: "Data Apps", color: "from-red-500 to-orange-500" },
  { name: "FastAPI", category: "API", color: "from-green-500 to-teal-500" },
  { name: "Flask", category: "API", color: "from-black to-gray-300" },
  { name: "Docker", category: "DevOps", color: "from-blue-500 to-cyan-500" },
  { name: "Kubernetes", category: "DevOps", color: "from-blue-600 to-indigo-500" },
  { name: "AWS", category: "DevOps", color: "from-orange-500 to-yellow-500" },
  { name: "CI/CD", category: "DevOps", color: "from-green-500 to-emerald-500" },
  { name: "TensorFlow", category: "AI/ML", color: "from-orange-500 to-red-500" },
  { name: "PyTorch", category: "AI/ML", color: "from-red-500 to-orange-500" },
  { name: "scikit-learn", category: "AI/ML", color: "from-orange-600 to-amber-500" },
  { name: "IsolationForest", category: "AI/ML", color: "from-purple-500 to-pink-500" },
];

const categoryColors = {
  "Core": "from-cyan-500 to-blue-500",
  "Web": "from-pink-500 to-purple-500",
  "Desktop": "from-blue-500 to-cyan-400",
  "Data Apps": "from-red-500 to-orange-500",
  "API": "from-green-500 to-teal-500",
  "DevOps": "from-emerald-500 to-teal-500",
  "AI/ML": "from-purple-500 to-pink-500",
};

export default function TechStack() {
  const { theme } = useTheme();

  return (
    <section className="py-24 px-6 md:px-24 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight font-mono tracking-wider">
            TECHNICAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500">ARSENAL</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            The tools and technologies I reach for when building production systems and creative experiments.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
            {technologies.map((tech, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.02, duration: 0.3 }}
                whileHover={{ scale: 1.08, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className={`btn btn-glass px-5 py-2.5 rounded-lg text-sm font-medium cursor-default flex flex-col items-center justify-center min-w-[110px] relative overflow-hidden ${
                  theme === "matrix" ? "border-green-400/30" : ""
                }`}
                style={{
                  borderColor: theme === "matrix" ? "rgba(0, 255, 65, 0.3)" : "var(--line)",
                }}
              >
                <span 
                  className="text-xs font-semibold uppercase tracking-wider font-mono mb-0.5"
                  style={{
                    background: `linear-gradient(135deg, var(--cyan), var(--vio), var(--mag))`,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {tech.category}
                </span>
                <span className="text-base font-mono tracking-tight text-white relative z-10">
                  {tech.name}
                </span>
                {/* Category glow indicator */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, var(--cyan), var(--vio), var(--mag))`,
                    opacity: 0.1,
                  }}
                />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Category legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-16 flex flex-wrap justify-center gap-4 text-sm"
        >
          {Object.entries(categoryColors).map(([category, color]) => (
            <div key={category} className="flex items-center gap-2 text-gray-400">
              <div className="w-3 h-3 rounded" style={{ background: `linear-gradient(135deg, ${color.replace("from-", "").replace("to-", "")})` }} />
              <span className="font-mono">{category}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}