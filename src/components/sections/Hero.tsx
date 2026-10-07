"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Terminal, Rocket, FileText, Mail, Phone, Copy, CheckCircle2 } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { personalLinks } from "@/data/projects";
import Modal from "@/components/ui/Modal";

const roles = [
  "AI-Driven DevOps Engineer",
  "Rust + Tauri Desktop Apps",
  "Streamlit Experience Builder",
  "Agentic AI Systems (Hermes)",
  "Infrastructure Automator",
];

export default function Hero() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleText, setRoleText] = useState("");
    const [isTyping, setIsTyping] = useState(true);
    const roleRef = useRef<HTMLHeadingElement>(null);

    const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  // Typing effect for roles
  useEffect(() => {
    const role = roles[roleIndex];
    let charIndex = 0;
    setIsTyping(true);

    const typeInterval = setInterval(() => {
      if (charIndex < role.length) {
        setRoleText(role.slice(0, charIndex + 1));
        charIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
        // Wait before deleting
        setTimeout(() => {
          const deleteInterval = setInterval(() => {
            if (charIndex > 0) {
              setRoleText(role.slice(0, charIndex - 1));
              charIndex--;
            } else {
              clearInterval(deleteInterval);
              setRoleIndex((prev) => (prev + 1) % roles.length);
            }
          }, 50);
        }, 1500);
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, [roleIndex]);

  // Random glitch trigger
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (roleRef.current) {
        roleRef.current.classList.add("zap");
        setTimeout(() => {
          roleRef.current?.classList.remove("zap");
        }, 500);
      }
    }, 4000 + Math.random() * 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <section className="hero relative min-h-screen flex flex-col justify-center px-6 md:px-24">
      <div className="grid-floor" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl z-10 w-full"
      >
        <div className="term-line">
          <span className="p">~/grid $ </span>
          <span className="caret" />
        </div>

        <h1 className="glitch mb-6" data-text="SASHANKAR J" ref={roleRef}>
          SASHANKAR J
        </h1>

        <div className="role-line">
          <span className="arrow">▶ </span>
          <span id="roleText" className="whitespace-nowrap">{roleText}</span>
          {isTyping && <span className="caret ml-1" style={{ background: "var(--cyan)" }} />}
        </div>

        <p className="tagline mb-10 max-w-2xl leading-relaxed">
          I bridge the gap between <b>intelligent systems</b> and <b>scalable infrastructure</b> — building desktop apps in Rust, wrangling data in Python, and teaching AI agents to behave.
        </p>

        <div className="btn-row flex flex-wrap gap-4 mb-8">
          <button className="btn btn-primary flex items-center gap-2">
            <Rocket className="w-5 h-5" />
            View Projects
          </button>
          <button
            onClick={() => setIsContactOpen(true)}
            className="btn btn-glass flex items-center gap-2"
          >
            <Terminal className="w-5 h-5 text-indigo-400" />
            Contact Me
          </button>
        </div>

        {/* Social Link Bar - Glass Pill */}
        <div className="inline-flex items-center gap-6 px-6 py-3 rounded-full glass-card border border-white/5 backdrop-blur-md">
          <motion.a
            href={personalLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="interactive text-gray-400 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            aria-label="GitHub"
          >
            <FaGithub className="w-6 h-6" />
          </motion.a>
          <motion.a
            href={personalLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="interactive text-gray-400 hover:text-sky-400 transition-colors"
            whileHover={{ scale: 1.1 }}
            aria-label="LinkedIn"
          >
            <FaLinkedin className="w-6 h-6" />
          </motion.a>
          <div className="w-[1px] h-6 bg-white/10" />
          <button
            onClick={() => setIsResumeOpen(true)}
            className="interactive flex items-center gap-2 text-gray-400 hover:text-indigo-400 transition-colors"
          >
            <motion.div whileHover={{ scale: 1.1 }} className="flex items-center gap-2">
              <FileText className="w-6 h-6" />
              <span className="text-sm font-medium font-mono">RESUME</span>
            </motion.div>
          </button>
        </div>
      </motion.div>

      {/* Resume Modal */}
      <Modal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} title="RESUME — SASHANKAR J" maxWidth="max-w-4xl">
        <div className="w-full h-[70vh] rounded-xl overflow-hidden bg-[#0b0f1a] border border-[rgba(0,229,255,0.35)]">
          <iframe
            src={personalLinks.resume}
            className="w-full h-full border-none"
            title="Resume"
          />
        </div>
        <div className="mt-4 flex justify-end">
          <a
            href={personalLinks.resume}
            download
            className="btn btn-primary flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            DOWNLOAD PDF
          </a>
        </div>
      </Modal>

      {/* Contact Modal */}
      <Modal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} title="GET IN TOUCH">
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-sky-500/20 flex items-center justify-center">
                <Mail className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400 font-medium mb-1 font-mono tracking-wider">EMAIL</p>
                <p className="text-white text-lg">sashankarj2999@gmail.com</p>
              </div>
            </div>
            <button
              onClick={() => handleCopy("sashankarj2999@gmail.com", "email")}
              className="interactive p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              title="Copy Email"
            >
              {copied === "email" ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <Phone className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400 font-medium mb-1 font-mono tracking-wider">PHONE</p>
                <p className="text-white text-lg">+91 80886 72269</p>
              </div>
            </div>
            <button
              onClick={() => handleCopy("8088672269", "phone")}
              className="interactive p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              title="Copy Phone"
            >
              {copied === "phone" ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
}