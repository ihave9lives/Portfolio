"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

export default function InteractiveBackground() {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio, 2);
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Subtle particle system - much fewer particles, cleaner
    const particles: Particle[] = [];
    const particleCount = reducedMotion ? 0 : 80; // Much fewer particles

    const themeColors = {
      cyberpunk: ["rgba(0, 229, 255, 0.6)", "rgba(139, 92, 246, 0.5)", "rgba(255, 46, 196, 0.5)", "rgba(74, 222, 128, 0.4)"],
      synthwave: ["rgba(0, 255, 255, 0.6)", "rgba(255, 0, 127, 0.5)", "rgba(188, 19, 254, 0.5)", "rgba(57, 255, 20, 0.4)"],
      matrix: ["rgba(0, 255, 65, 0.6)", "rgba(0, 200, 50, 0.5)", "rgba(0, 150, 40, 0.5)", "rgba(0, 100, 30, 0.4)"],
      "tokyo-night": ["rgba(125, 207, 255, 0.6)", "rgba(187, 154, 247, 0.5)", "rgba(247, 118, 142, 0.5)", "rgba(158, 206, 106, 0.4)"],
      "amber-crt": ["rgba(255, 191, 0, 0.6)", "rgba(255, 170, 0, 0.5)", "rgba(255, 140, 0, 0.5)", "rgba(200, 120, 0, 0.4)"],
      light: ["rgba(8, 145, 178, 0.4)", "rgba(124, 58, 237, 0.3)", "rgba(192, 38, 211, 0.3)", "rgba(22, 163, 74, 0.3)"],
    };

    const colors = themeColors[theme as keyof typeof themeColors] || themeColors.cyberpunk;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      baseX: number;
      baseY: number;
      angle: number;
      distance: number;
      speed: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = 0;
        this.vy = 0;
        this.radius = 1 + Math.random() * 2;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.baseX = this.x;
        this.baseY = this.y;
        this.angle = Math.random() * Math.PI * 2;
        this.distance = 30 + Math.random() * 100;
        this.speed = 0.0005 + Math.random() * 0.001;
      }

      update() {
        // Subtle orbital motion around base position
        this.angle += this.speed;
        this.baseX = width / 2 + Math.cos(this.angle * 0.3) * this.distance * 0.5;
        this.baseY = height / 2 + Math.sin(this.angle * 0.2) * this.distance * 0.3;

        // Mouse interaction - very subtle repulsion
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 120 && dist > 0) {
          const force = (120 - dist) / 120 * 0.3; // Very subtle
          this.vx -= (dx / dist) * force;
          this.vy -= (dy / dist) * force;
        }

        // Spring back to base position
        this.vx += (this.baseX - this.x) * 0.005;
        this.vy += (this.baseY - this.y) * 0.005;
        
        // Damping
        this.vx *= 0.92;
        this.vy *= 0.92;
        
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around edges
        if (this.x < -50) this.x = width + 50;
        if (this.x > width + 50) this.x = -50;
        if (this.y < -50) this.y = height + 50;
        if (this.y > height + 50) this.y = -50;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Subtle glow
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 4);
        gradient.addColorStop(0, this.color.replace("0.6", "0.3").replace("0.5", "0.25").replace("0.4", "0.2"));
        gradient.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw subtle connections between nearby particles
      if (!reducedMotion) {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
        ctx.lineWidth = 0.5;
        
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 100) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.globalAlpha = (1 - dist / 100) * 0.1;
              ctx.stroke();
            }
          }
        }
        ctx.globalAlpha = 1;
      }
      
      // Update and draw particles
      particles.forEach(p => {
        p.update();
        p.draw(ctx);
      });
      
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      
      // Recalculate particle base positions
      particles.forEach(p => {
        p.baseX = Math.random() * width;
        p.baseY = Math.random() * height;
      });
    };

    window.addEventListener("resize", handleResize);
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [theme, reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[-3] pointer-events-none"
      style={{ opacity: 0.4 }}
      aria-hidden="true"
    />
  );
}