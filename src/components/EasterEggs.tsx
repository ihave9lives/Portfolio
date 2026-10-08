"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal, Zap, Coffee, Gamepad2, Skull, Ghost, Sparkles } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "KeyB", "KeyA"
];

const EASTER_EGGS = [
  { id: "konami", name: "Konami Code", hint: "↑↑↓↓←→←→BA", reward: "🎮 Classic cheat activated!" },
  { id: "click-name", name: "Name Clicker", hint: "Click my name 7 times", reward: "⚡ Glitch overload!" },
  { id: "theme-cycler", name: "Theme Cycler", hint: "Switch themes 10 times", reward: "🌈 Secret mode unlocked!" },
  { id: "triple-click-logo", name: "Logo Clicker", hint: "Triple-click the S logo", reward: "👻 Ghost mode!" },
  { id: "terminal", name: "Terminal", hint: "Type 'help' in console", reward: "💻 Hidden terminal!" },
  { id: "coffee", name: "Coffee Break", hint: "Click coffee 5 times", reward: "☕ Infinite coffee!" },
  { id: "skull", name: "Skull Hunt", hint: "Find the hidden skull", reward: "💀 You found me!" },
];

export default function EasterEggs() {
  const { theme, setTheme } = useTheme();
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [nameClickCount, setNameClickCount] = useState(0);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [logoClickTimer, setLogoClickTimer] = useState<NodeJS.Timeout | null>(null);
  const [foundEggs, setFoundEggs] = useState<Set<string>>(new Set());
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "Welcome to the grid, user.",
    "Type 'help' for available commands.",
    "Type 'easter' to see discovered eggs.",
    "",
  ]);
  const [showKonamiHint, setShowKonamiHint] = useState(false);
  const [showMatrixRain, setShowMatrixRain] = useState(false);
  const [showGlitchOverlay, setShowGlitchOverlay] = useState(false);
  const [showGhostMode, setShowGhostMode] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Konami code listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === KONAMI_CODE[konamiIndex]) {
        setKonamiIndex(prev => prev + 1);
        if (konamiIndex === KONAMI_CODE.length - 1) {
          triggerEgg("konami");
          setKonamiIndex(0);
        }
      } else {
        setKonamiIndex(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [konamiIndex]);

  // Show konami hint after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowKonamiHint(true), 30000);
    return () => clearTimeout(timer);
  }, []);

  const triggerEgg = (eggId: string) => {
    setFoundEggs(prev => {
      const next = new Set(prev);
      next.add(eggId);
      return next;
    });

    switch (eggId) {
      case "konami":
        setShowMatrixRain(true);
        setTimeout(() => setShowMatrixRain(false), 10000);
        break;
      case "click-name":
        setShowGlitchOverlay(true);
        setTimeout(() => setShowGlitchOverlay(false), 3000);
        break;
      case "theme-cycler":
        document.body.classList.add("secret-mode");
        setTimeout(() => document.body.classList.remove("secret-mode"), 5000);
        break;
      case "triple-click-logo":
        setShowGhostMode(true);
        setTimeout(() => setShowGhostMode(false), 5000);
        break;
      case "terminal":
        setShowTerminal(true);
        break;
      case "coffee":
        // Add coffee particles
        break;
      case "skull":
        break;
    }

    addTerminalOutput(`🎉 EASTER EGG FOUND: ${EASTER_EGGS.find(e => e.id === eggId)?.reward || eggId}`);
  };

  const handleNameClick = () => {
    const count = nameClickCount + 1;
    setNameClickCount(count);
    if (count >= 7) {
      triggerEgg("click-name");
      setNameClickCount(0);
    }
  };

  const handleLogoClick = () => {
    if (logoClickTimer) clearTimeout(logoClickTimer);
    const count = logoClickCount + 1;
    setLogoClickCount(count);
    setLogoClickTimer(setTimeout(() => setLogoClickCount(0), 500));
    if (count >= 3) {
      triggerEgg("triple-click-logo");
      setLogoClickCount(0);
    }
  };

  const addTerminalOutput = (text: string) => {
    setTerminalOutput(prev => [...prev, text, ""]);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    addTerminalOutput(`> ${cmd}`);
    setTerminalInput("");

    switch (cmd) {
      case "help":
        addTerminalOutput("Available commands:");
        addTerminalOutput("  help     - Show this help");
        addTerminalOutput("  easter   - List discovered easter eggs");
        addTerminalOutput("  themes   - List available themes");
        addTerminalOutput("  theme <name> - Switch theme");
        addTerminalOutput("  clear    - Clear terminal");
        addTerminalOutput("  whoami   - Show user info");
        addTerminalOutput("  matrix   - Toggle matrix rain");
        addTerminalOutput("  glitch   - Trigger glitch effect");
        addTerminalOutput("  coffee   - Spawn coffee");
        addTerminalOutput("  sudo rm -rf / - Dangerous!");
        break;
      case "easter":
        addTerminalOutput("Discovered Easter Eggs:");
        EASTER_EGGS.forEach(egg => {
          const found = foundEggs.has(egg.id);
          addTerminalOutput(`  ${found ? "✓" : "✗"} ${egg.name}: ${egg.hint}`);
        });
        addTerminalOutput(`Total: ${foundEggs.size}/${EASTER_EGGS.length}`);
        break;
      case "themes":
        addTerminalOutput("Available themes: cyberpunk, light, synthwave, matrix, tokyo-night, amber-crt");
        break;
      case "clear":
        setTerminalOutput([]);
        break;
      case "whoami":
        addTerminalOutput("User: Sashankar J");
        addTerminalOutput("Role: AI-Driven DevOps Engineer");
        addTerminalOutput("Stack: Rust, Tauri, Next.js, TypeScript, Python, Kubernetes");
        addTerminalOutput("Current theme: " + theme);
        break;
      case "matrix":
        setShowMatrixRain(!showMatrixRain);
        addTerminalOutput(showMatrixRain ? "Matrix rain deactivated" : "Matrix rain activated");
        break;
      case "glitch":
        setShowGlitchOverlay(true);
        setTimeout(() => setShowGlitchOverlay(false), 2000);
        addTerminalOutput("Glitch triggered!");
        break;
      case "coffee":
        addTerminalOutput("☕ Coffee spawned! *sip*");
        break;
      case "sudo rm -rf /":
        addTerminalOutput("Nice try. Permission denied. 😎");
        addTerminalOutput("This isn't your first rodeo, is it?");
        break;
      default:
        if (cmd.startsWith("theme ")) {
          const themeName = cmd.split(" ")[1] as Parameters<typeof setTheme>[0];
          const validThemes = ["cyberpunk", "light", "synthwave", "matrix", "tokyo-night", "amber-crt"];
          if (validThemes.includes(themeName)) {
            setTheme(themeName);
            addTerminalOutput(`Theme switched to: ${themeName}`);
          } else {
            addTerminalOutput(`Unknown theme. Use 'themes' to list available.`);
          }
        } else {
          addTerminalOutput(`Unknown command: ${cmd}. Type 'help' for commands.`);
        }
    }
  };

  const handleTerminalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setShowTerminal(false);
    }
  };

  // Secret konami sequence in terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "KeyG" && e.ctrlKey && e.shiftKey) {
        triggerEgg("terminal");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* Konami hint */}
      <AnimatePresence>
        {showKonamiHint && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="konami-hint visible fixed bottom-5 right-5 z-50"
          >
            <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs font-mono">
              Try: ↑↑↓↓←→←→BA
            </kbd>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Matrix Rain Easter Egg */}
      <AnimatePresence>
        {showMatrixRain && (
          <MatrixRain className="matrix-rain active" />
        )}
      </AnimatePresence>

      {/* Glitch Overlay Easter Egg */}
      <AnimatePresence>
        {showGlitchOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glitch-overlay active"
            onClick={() => setShowGlitchOverlay(false)}
          >
            <div className="glitch text-center" style={{ fontSize: "clamp(3rem, 15vw, 8rem)" }} data-text="ACCESS GRANTED">
              ACCESS GRANTED
              <div className="glitch-jp">アクセス許可</div>
            </div>
            <p className="mt-8 text-cyan-400 font-mono text-sm">Click anywhere to dismiss</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ghost Mode Easter Egg */}
      <AnimatePresence>
        {showGhostMode && (
          <GhostMode onClose={() => setShowGhostMode(false)} />
        )}
      </AnimatePresence>

      {/* Hidden Terminal */}
      <AnimatePresence>
        {showTerminal && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="terminal-easter-egg open"
            onKeyDown={handleTerminalKeyDown}
          >
            <div className="w-full h-[60vh] max-h-[600px] flex flex-col p-4 font-mono text-sm">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-cyan-400">terminal://grid</span>
                <button
                  onClick={() => setShowTerminal(false)}
                  className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div
                ref={terminalRef}
                className="flex-1 overflow-y-auto mb-4 space-y-1 text-green-300"
                style={{ fontFamily: "var(--mono)" }}
              >
                {terminalOutput.map((line, i) => (
                  <div key={i} className="whitespace-pre-wrap">{line}</div>
                ))}
              </div>
              <form onSubmit={handleTerminalSubmit} className="flex gap-2">
                <span className="text-cyan-400 self-center">~/grid $</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={terminalInput}
                  onChange={e => setTerminalInput(e.target.value)}
                  onKeyDown={e => e.key === "Tab" && e.preventDefault()}
                  className="flex-1 bg-transparent border-none outline-none text-white font-mono text-sm"
                  placeholder="Type command..."
                  autoFocus
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Matrix Rain Component
function MatrixRain({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const chars = "アカサタナハマヤラワガザダバパイキシチニヒミリギジビピウクスツヌフムユルグズブプエケセテネヘメレゲゼベペオコソトノホモヨロゴゾドボポヴン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const fontSize = 16;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const colors = {
      "cyberpunk": "#00e5ff",
      "synthwave": "#ff007f",
      "matrix": "#00ff41",
      "tokyo-night": "#7dcfff",
      "amber-crt": "#ffbf00",
      "light": "#0891b2",
    };
    const currentTheme = document.documentElement.getAttribute("data-theme") || "cyberpunk";
    const color = colors[currentTheme as keyof typeof colors] || "#00e5ff";

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, width, height);
      
      ctx.fillStyle = color;
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        ctx.fillText(char, x, y);
        
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} style={{ position: "fixed", inset: 0, zIndex: 9999 }} />;
}

// Ghost Mode Component
function GhostMode({ onClose }: { onClose: () => void }) {
  const ghosts = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 30 + Math.random() * 50,
    speed: 0.5 + Math.random() * 1.5,
    delay: Math.random() * 5,
    opacity: 0.3 + Math.random() * 0.4,
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] pointer-events-none"
      onClick={onClose}
    >
      {ghosts.map(ghost => (
        <Ghost key={ghost.id} {...ghost} />
      ))}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 text-center pointer-events-auto"
      >
        <Ghost className="w-24 h-24 mx-auto mb-4 text-white/80" />
        <p className="text-white font-mono text-lg">👻 GHOST MODE ACTIVATED 👻</p>
        <p className="text-gray-400 text-sm mt-2">Click anywhere to return to reality</p>
      </motion.div>
    </motion.div>
  );
}

function Ghost({ id, x, y, size, speed, delay, opacity }: {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  delay: number;
  opacity: number;
}) {
  const [pos, setPos] = useState({ x, y });

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setPos(prev => ({
          x: prev.x + (Math.random() - 0.5) * 2 * speed,
          y: prev.y - speed * 0.5,
        }));
      }, 50);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [speed, delay]);

  return (
    <motion.div
      style={{
        left: `${pos.x}vw`,
        top: `${pos.y}vh`,
        fontSize: `${size}px`,
        opacity,
      }}
      className="fixed animate-float"
      animate={{ 
        y: [0, -10, 0],
        rotate: [-5, 5, -5],
      }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <GhostIcon />
    </motion.div>
  );
}

function GhostIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z" />
    </svg>
  );
}