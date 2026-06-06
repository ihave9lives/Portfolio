"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest(".interactive")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 flex items-center justify-center mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovered ? 2.5 : 1,
          backgroundColor: isHovered
            ? "rgba(125, 211, 252, 0.2)"
            : "rgba(255, 255, 255, 0.4)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]" />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 w-32 h-32 -ml-12 -mt-12 rounded-full pointer-events-none z-40 bg-sky-400/10 blur-2xl"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />
    </>
  );
}
