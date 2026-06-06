"use client";

import { useEffect, useRef } from "react";

export default function InteractiveBackground() {
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

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const particles: Particle[] = [];
    const particleCount = 1200; // High density for the phyllotaxis spiral

    // Deep cool tones from the existing color scheme
    const colors = [
      "rgba(56, 189, 248, 0.8)", // Sky
      "rgba(99, 102, 241, 0.8)", // Indigo
      "rgba(6, 182, 212, 0.8)",  // Cyan
      "rgba(255, 255, 255, 0.6)" // Soft white for contrast
    ];

    class Particle {
      radius: number;
      angle: number;
      color: string;
      length: number;
      rotationSpeed: number;
      x: number;
      y: number;
      vx: number;
      vy: number;

      constructor(radius: number, angle: number) {
        this.radius = radius;
        this.angle = angle;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.length = 3 + Math.random() * 6; // short dashes
        
        // Inner particles rotate slightly faster than outer ones for a vortex effect
        this.rotationSpeed = 0.0005 + (0.001 * (1 - this.radius / (width / 2)));
        if (this.rotationSpeed < 0.0002) this.rotationSpeed = 0.0002;

        this.x = width / 2 + Math.cos(this.angle) * this.radius;
        this.y = height / 2 + Math.sin(this.angle) * this.radius;
        this.vx = 0;
        this.vy = 0;
      }

      update(mx: number, my: number) {
        this.angle += this.rotationSpeed;
        
        // Target position based on spiral
        const targetX = width / 2 + Math.cos(this.angle) * this.radius;
        const targetY = height / 2 + Math.sin(this.angle) * this.radius;

        // Mouse interaction (Repulsion effect)
        const dx = mx - targetX;
        const dy = my - targetY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        let offsetX = 0;
        let offsetY = 0;
        
        const interactionRadius = 150;
        if (dist < interactionRadius) {
          const force = (interactionRadius - dist) / interactionRadius;
          // Push particles away from the mouse
          offsetX = -(dx / dist) * force * 40;
          offsetY = -(dy / dist) * force * 40;
        }

        const nextX = targetX + offsetX;
        const nextY = targetY + offsetY;

        // Velocity for smooth interpolation and tangent calculation
        this.vx = nextX - this.x;
        this.vy = nextY - this.y;

        this.x += this.vx * 0.15;
        this.y += this.vy * 0.15;
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Tangent angle to make dashes point along the swirling curve or mouse movement
        let tangent = this.angle + Math.PI / 2 + (Math.PI / 8); 
        
        // If strongly affected by mouse (high velocity), align dash with movement
        if (Math.abs(this.vx) > 0.5 || Math.abs(this.vy) > 0.5) {
            tangent = Math.atan2(this.vy, this.vx);
        }

        const endX = this.x + Math.cos(tangent) * this.length;
        const endY = this.y + Math.sin(tangent) * this.length;

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1.5;
        ctx.lineCap = "round";
        ctx.stroke();
      }
    }

    // Generate Phyllotaxis (Fibonacci) Spiral
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    // Scale factor to spread particles across the screen
    const spread = Math.max(width, height) / Math.sqrt(particleCount) * 0.6;

    for (let i = 0; i < particleCount; i++) {
      const radius = spread * Math.sqrt(i);
      const angle = i * goldenAngle;
      
      // Skip particles that are too close to the center
      if (radius > 80) {
        particles.push(new Particle(radius, angle));
      }
    }

    let animationFrameId: number;

    const animate = () => {
      // Clear with background color and a trail effect
      ctx.fillStyle = "rgba(7, 11, 20, 0.3)";
      ctx.fillRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.update(mouseX, mouseY);
        particle.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#070b14]">
      <canvas ref={canvasRef} className="absolute inset-0 block" />
      {/* Retain the noise overlay for the frosty glass feel */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
