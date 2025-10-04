"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

export function EasterEgg() {
  const [sequence, setSequence] = useState<string[]>([]);
  const [isActivated, setIsActivated] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const newSequence = [...sequence, event.code];
      setSequence(newSequence);

      // Check if the sequence matches the Konami code
      if (newSequence.length === KONAMI_CODE.length) {
        if (newSequence.every((key, index) => key === KONAMI_CODE[index])) {
          setIsActivated(true);
          // Reset after 5 seconds
          setTimeout(() => {
            setIsActivated(false);
            setSequence([]);
          }, 5000);
        } else {
          // Reset sequence if it doesn't match
          setSequence([]);
        }
      } else if (newSequence.length > KONAMI_CODE.length) {
        setSequence([]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sequence]);

  return (
    <AnimatePresence>
      {isActivated && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 pointer-events-none"
        >
          {/* Particle background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/20">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: 0,
                }}
                animate={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Secret message */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="bg-background/90 backdrop-blur-sm border border-primary/50 rounded-lg p-8 text-center shadow-xl">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="text-4xl mb-4"
              >
                🚀
              </motion.div>
              <h3 className="text-2xl font-bold text-primary mb-2">
                Secret Mode Activated!
              </h3>
              <p className="text-muted-foreground">
                You found the easter egg! 🎉
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
