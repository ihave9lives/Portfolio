"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Rocket, FileText, Mail, Phone, Copy, CheckCircle2 } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { personalLinks } from "@/data/projects";
import Modal from "@/components/ui/Modal";

export default function Hero() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section className="min-h-screen flex flex-col justify-center relative px-6 md:px-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl z-10"
      >
        <h1 className="text-6xl md:text-8xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
          AI-Driven <br className="hidden md:block" /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">DevOps Engineer</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 font-light mb-10 max-w-2xl leading-relaxed">
          Hi, I&apos;m <span className="font-semibold text-white">Sashankar J</span>. I bridge the gap between intelligent systems and scalable infrastructure.
        </p>

        <div className="flex flex-wrap gap-4 mb-8">
          <button className="interactive group px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium backdrop-blur-md border border-white/10 transition-all duration-300 flex items-center gap-2 hover-glow">
            <Rocket className="w-5 h-5 text-sky-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            View Projects
          </button>
          <button 
            onClick={() => setIsContactOpen(true)}
            className="interactive px-8 py-4 rounded-xl glass-panel text-white font-medium transition-all duration-300 hover-glow flex items-center gap-2"
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
          <div className="w-[1px] h-6 bg-white/10"></div>
          <button 
            onClick={() => setIsResumeOpen(true)}
            className="interactive flex items-center gap-2 text-gray-400 hover:text-indigo-400 transition-colors"
          >
            <motion.div whileHover={{ scale: 1.1 }} className="flex items-center gap-2">
              <FileText className="w-6 h-6" />
              <span className="text-sm font-medium">Resume</span>
            </motion.div>
          </button>
        </div>
      </motion.div>

      {/* Resume Modal */}
      <Modal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} title="Resume - Sashankar J" maxWidth="max-w-4xl">
        <div className="w-full h-[70vh] rounded-xl overflow-hidden bg-white/5 border border-white/10">
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
            className="interactive px-6 py-2 rounded-lg bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 transition-colors border border-sky-500/30 flex items-center gap-2"
          >
            <FileText className="w-4 h-4" /> Download PDF
          </a>
        </div>
      </Modal>

      {/* Contact Modal */}
      <Modal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} title="Get In Touch">
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-sky-500/20 flex items-center justify-center">
                <Mail className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400 font-medium mb-1">Email</p>
                <p className="text-white text-lg">sashankarj@999@gmail.com</p>
              </div>
            </div>
            <button 
              onClick={() => handleCopy("sashankarj@999@gmail.com", "email")}
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
                <p className="text-sm text-gray-400 font-medium mb-1">Phone</p>
                <p className="text-white text-lg">8088672269</p>
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
