"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { MouseEvent } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
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

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

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
      whileHover={{ scale: 1.015 }}
      className="card cursor-pointer relative w-full h-full rounded-2xl p-6 flex flex-col justify-between overflow-hidden group transition-all duration-300"
    >
      {/* Subtle shimmer effect */}
      <div 
        className="absolute inset-0 z-0 bg-gradient-to-tr from-white/0 via-white/3 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-x-[-100%] group-hover:translate-x-[100%] ease-in-out" 
      />

      <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-white font-mono tracking-tight">{title}</h3>
          <div className="flex gap-2">
            {repoUrl && (
              <motion.a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center backdrop-blur-sm hover:bg-white/10 transition-colors group"
                whileHover={{ scale: 1.1 }}
                aria-label="GitHub Repository"
              >
                <FaGithub className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </motion.a>
            )}
            {(link || repoUrl) && (
              <motion.a
                href={link || repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center backdrop-blur-sm hover:bg-white/10 transition-colors group"
                whileHover={{ scale: 1.1 }}
                aria-label="View Project"
              >
                <ArrowUpRight className="w-5 h-5 text-sky-400 group-hover:text-white transition-colors" />
              </motion.a>
            )}
          </div>
        </div>

        <p className="text-gray-300 mb-6 flex-1 leading-relaxed text-sm">{description}</p>

        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 5).map((tag, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="tag"
            >
              {tag}
            </motion.span>
          ))}
          {tags.length > 5 && (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 5 * 0.05, duration: 0.3 }}
              className="tag text-cyan-400 border-cyan-400/30"
            >
              +{tags.length - 5}
            </motion.span>
          )}
        </div>
      </div>
    </motion.a>
  );
}