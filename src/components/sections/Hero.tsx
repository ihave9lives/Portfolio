"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Rocket, FileText, Mail, Phone, Copy, CheckCircle2, ExternalLink, Github as LucideGithub } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { personalLinks } from "@/data/projects";
import Modal from "@/components/ui/Modal";
import { useTheme } from "@/components/ThemeProvider";

// Japanese characters for the glitch effect
const JP_CHARS = ["サ", "シ", "ャ", "ン", "カ", "ラ", "ジ", "ェ", "イ", "キ", "ス", "タ", "ナ", "ハ", "マ", "ヤ", "ラ", "ワ", "ガ", "ザ", "ダ", "バ", "パ"];
const JP_NAME = "サシャンカル・ジェイ";

const roles = [
  "AI-Driven DevOps Engineer",
  "Rust + Tauri Desktop Apps",
  "Streamlit Experience Builder",
  "Agentic AI Systems (Hermes)",
  "Infrastructure Automator",
];

export default function Hero() {
  const { theme } = useTheme();
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleText, setRoleText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showJpGlitch, setShowJpGlitch] = useState(false);
  const roleRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const nameClickCount = useRef(0);
  const jpCharsRef = useRef<string[]>([]);

  // Generate random Japanese characters for glitch
  const generateJpChars = useCallback(() => {
    const length = "SASHANKAR J".length;
    return Array.from({ length }, () => JP_CHARS[Math.floor(Math.random() * JP_CHARS.length)]);
  }, []);

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
          }, 40);
        }, 1800);
      }
    }, 70);

    return () => clearInterval(typeInterval);
  }, [roleIndex]);

  // Random glitch trigger for name
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (nameRef.current) {
        nameRef.current.classList.add("zap");
        // Regenerate Japanese chars on each glitch
        jpCharsRef.current = generateJpChars();
        setTimeout(() => {
          nameRef.current?.classList.remove("zap");
        }, 400);
      }
    }, 5000 + Math.random() * 4000);

    return () => clearInterval(glitchInterval);
  }, [generateJpChars]);

  // Japanese character glitch on hover
  const handleNameMouseEnter = () => {
    setShowJpGlitch(true);
    jpCharsRef.current = generateJpChars();
    setTimeout(() => setShowJpGlitch(false), 1200);
  };

  const handleNameClick = () => {
    nameClickCount.current++;
    if (nameClickCount.current >= 7) {
      // Easter egg triggered via EasterEggs component
      nameRef.current?.classList.add("zap");
      jpCharsRef.current = generateJpChars();
      setTimeout(() => nameRef.current?.classList.remove("zap"), 400);
      nameClickCount.current = 0;
    }
    // Reset click count after 2 seconds of inactivity
    setTimeout(() => { nameClickCount.current = 0; }, 2000);
  };

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

        {/* Name with Japanese glitch effect - FIXED: never vanishes */}
        <h1 
          ref={nameRef}
          className="glitch relative mb-6"
          data-text="SASHANKAR J"
          onMouseEnter={handleNameMouseEnter}
          onClick={handleNameClick}
          style={{ 
            opacity: 1, 
            visibility: 'visible',
            // Ensure text is always visible
            color: 'var(--txt)',
            WebkitTextFillColor: 'transparent',
          }}
        >
          SASHANKAR J
          
          {/* Japanese character glitch overlay */}
          <AnimatePresence mode="wait">
            {showJpGlitch && (
              <motion.div
                key="jp-glitch"
                initial={{ opacity: 0, x: -20, scaleX: 0.8, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, scaleX: 1, filter: "blur(0)" }}
                exit={{ opacity: 0, x: 20, scaleX: 0.8, filter: "blur(4px)" }}
                className="glitch-jp absolute inset-0 pointer-events-none z-10 font-mono font-bold"
                style={{ 
                  fontSize: "inherit", 
                  lineHeight: "inherit", 
                  letterSpacing: "inherit",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {JP_NAME.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20, rotate: -90 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    exit={{ opacity: 0, y: -20, rotate: 90 }}
                    transition={{ delay: i * 0.03, duration: 0.3 }}
                    style={{ display: "inline-block" }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Glitch slices */}
          <span 
            className="absolute inset-0 mix-blend-screen pointer-events-none"
            style={{ 
              clipPath: "polygon(0 0, 100% 0, 100% 35%, 0 35%)",
              transform: "translateX(-2px)",
              color: "var(--cyan)",
              WebkitTextFillColor: "var(--cyan)",
              textShadow: "-2px 0 var(--cyan), 2px 0 var(--mag)",
            }}
            aria-hidden="true"
          >
            SASHANKAR J
          </span>
          <span 
            className="absolute inset-0 mix-blend-screen pointer-events-none"
            style={{ 
              clipPath: "polygon(0 65%, 100% 65%, 100% 100%, 0 100%)",
              transform: "translateX(2px)",
              color: "var(--mag)",
              WebkitTextFillColor: "var(--mag)",
              textShadow: "-2px 0 var(--mag), 2px 0 var(--cyan)",
            }}
            aria-hidden="true"
          >
            SASHANKAR J
          </span>
        </h1>

        <div className="role-line">
          <span className="text-cyan-400">{roleText}</span>
          {isTyping && <span className="cursor" aria-hidden="true" />}
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsResumeOpen(true)}
            className="btn btn-primary flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>Resume</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsContactOpen(true)}
            className="btn btn-glass flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            <span>Contact</span>
          </motion.button>

          <motion.a
                      href={personalLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn btn-glass flex items-center gap-2"
                    >
                      <FaGithub className="w-4 h-4" />
                      <span>GitHub</span>
                    </motion.a>

                    <motion.a
                      href={personalLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn btn-glass flex items-center gap-2"
                    >
                      <FaLinkedin className="w-4 h-4" />
                      <span>LinkedIn</span>
                    </motion.a>
        </div>

        {/* Quick copy section */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-2 group">
            <Terminal className="w-4 h-4" />
            <span className="font-mono">sashankar.j@proton.me</span>
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleCopy("sashankar.j@proton.me", "email")}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-gray-500 hover:text-cyan-400"
              aria-label="Copy email"
            >
              {copied === "email" ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </motion.button>
          </div>
          
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span className="font-mono">+91-XXXXXXXXXX</span>
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleCopy("+91-XXXXXXXXXX", "phone")}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-gray-500 hover:text-cyan-400"
              aria-label="Copy phone"
            >
              {copied === "phone" ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </motion.button>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 font-mono text-xs"
        >
          <span>SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-transparent rounded-full"
          />
        </motion.div>
      </motion.div>

      {/* Resume Modal */}
      <Modal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        title="Resume"
        maxWidth="max-w-2xl"
      >
        <div className="space-y-4 text-sm">
          <p className="text-gray-300">Click below to download the full resume PDF.</p>
          <motion.a
            href={personalLinks.resume}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn btn-primary w-full flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>Download Resume (PDF)</span>
            <ExternalLink className="w-4 h-4" />
          </motion.a>
          <p className="text-gray-500 text-xs text-center">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </p>
        </div>
      </Modal>

      {/* Contact Modal */}
      <Modal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        title="Get In Touch"
        maxWidth="max-w-md"
      >
        <div className="space-y-4 text-sm">
          <div className="flex items-center gap-3 p-3 glass-panel rounded-lg">
            <Mail className="w-5 h-5 text-cyan-400" />
            <div>
              <p className="text-gray-400 text-xs">Email</p>
              <p className="font-mono text-white">sashankar.j@proton.me</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleCopy("sashankar.j@proton.me", "email")}
              className="ml-auto p-1 text-gray-500 hover:text-cyan-400"
              aria-label="Copy email"
            >
              {copied === "email" ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </motion.button>
          </div>
          
          <div className="flex items-center gap-3 p-3 glass-panel rounded-lg">
            <Phone className="w-5 h-5 text-cyan-400" />
            <div>
              <p className="text-gray-400 text-xs">Phone</p>
              <p className="font-mono text-white">+91-XXXXXXXXXX</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleCopy("+91-XXXXXXXXXX", "phone")}
              className="ml-auto p-1 text-gray-500 hover:text-cyan-400"
              aria-label="Copy phone"
            >
              {copied === "phone" ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </motion.button>
          </div>

          <div className="flex items-center gap-3 p-3 glass-panel rounded-lg">
                      <FaGithub className="w-5 h-5 text-cyan-400" />
                      <div>
                        <p className="text-gray-400 text-xs">GitHub</p>
                        <p className="font-mono text-white">github.com/ihave9lives</p>
                      </div>
            <motion.a
              href={personalLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="ml-auto p-1 text-gray-500 hover:text-cyan-400"
              aria-label="Open GitHub"
            >
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </div>

          <div className="flex items-center gap-3 p-3 glass-panel rounded-lg">
                      <FaLinkedin className="w-5 h-5 text-cyan-400" />
                      <div>
                        <p className="text-gray-400 text-xs">LinkedIn</p>
                        <p className="font-mono text-white">linkedin.com/in/sashankar-j</p>
                      </div>
            <motion.a
              href={personalLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="ml-auto p-1 text-gray-500 hover:text-cyan-400"
              aria-label="Open LinkedIn"
            >
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </div>

          <p className="text-gray-500 text-xs text-center pt-2">
            Available for freelance, full-time, and contract roles.
          </p>
        </div>
      </Modal>
    </section>
  );
}