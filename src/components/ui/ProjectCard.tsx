"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  repoUrl?: string;
}

export default function ProjectCard({ title, description, tags, link, repoUrl }: ProjectCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={repoUrl || link || "#"}
      target="_blank"
      rel="noopener noreferrer"
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      className="interactive cursor-pointer relative w-full h-full rounded-2xl glass-card p-6 flex flex-col justify-between overflow-hidden group transition-all duration-300 hover-glow"
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 z-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-[-100%] group-hover:translate-x-[100%] ease-in-out" />
      
      <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-white">{title}</h3>
          <div className="flex gap-2">
            {repoUrl && (
              <motion.div
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                aria-label="GitHub Repository"
              >
                <FaGithub className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
              </motion.div>
            )}
            <motion.div 
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm"
              whileHover={{ scale: 1.1 }}
            >
              <ArrowUpRight className="w-5 h-5 text-sky-400 group-hover:text-white transition-colors" />
            </motion.div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-6">
          {description}
        </p>
      </div>

      <div className="relative z-10 flex flex-wrap gap-2 mt-auto" style={{ transform: "translateZ(20px)" }}>
        {tags.map((tag, i) => (
          <span
            key={i}
            className="text-xs px-3 py-1 rounded-full bg-white/10 text-sky-200 border border-white/5"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.a>
  );
}
