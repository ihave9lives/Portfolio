import ProjectCard from "@/components/ui/ProjectCard";
import { projectsData } from "@/data/projects";
import { motion } from "framer-motion";

export default function Projects() {
  // Split projects into "Fun" and "Professional" categories
  const funProjects = projectsData.filter(p => 
    p.tags.some(t => ["Game", "Three.js", "WebGL", "Procedural Generation", "Media", "Streamlit", "CSS Injection", "Offline-Capable"].includes(t))
  );
  
  const proProjects = projectsData.filter(p => 
    !p.tags.some(t => ["Game", "Three.js", "WebGL", "Procedural Generation", "Media", "Streamlit", "CSS Injection", "Offline-Capable"].includes(t))
  );

  return (
    <section className="min-h-screen py-24 px-6 md:px-24 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            A curated selection of things I've built — from production infrastructure to creative experiments.
          </p>
        </motion.div>

        {/* Fun & Experimental Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
              <Gamepad2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Fun & Experimental</h3>
              <p className="text-gray-500 text-sm">Creative coding, games, and weekend experiments</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {funProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                className="h-full min-h-[380px]"
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Professional Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Professional & Production</h3>
              <p className="text-gray-500 text-sm">Production systems, DevOps tooling, and scalable architectures</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {proProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                className="h-full min-h-[380px]"
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Icon components
function Gamepad2({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="11" x2="10" y2="11" />
      <line x1="8" y1="9" x2="8" y2="13" />
      <line x1="14" y1="11" x2="18" y2="11" />
      <line x1="16" y1="9" x2="16" y2="13" />
      <path d="M17.32 5H6.68a4 4 0 0 0-3.97 4.61L2 17a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5" />
    </svg>
  );
}

function Briefcase({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect x="2" y="6" width="20" height="12" rx="2" />
    </svg>
  );
}