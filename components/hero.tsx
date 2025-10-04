"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6"
            >
              Hi, I'm{" "}
              <motion.span
                className="text-gradient"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                Jeet Parikh
              </motion.span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl sm:text-2xl text-muted-foreground mb-8"
            >
              <TypewriterText
                texts={[
                  "Software Engineer & AI Researcher",
                  "Computer Science @ Yale University",
                  "Building the future with code",
                  "Passionate about data & machine learning",
                ]}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              I'm a Computer Science student at Yale University with experience
              in AI, data engineering, and full-stack development. Currently
              working on predictive analytics for healthcare and leading
              development at Yale's largest CS club.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="magnetic-hover"
              >
                <Button asChild size="lg" className="group glow-effect">
                  <Link href="/projects">
                    View My Work
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="magnetic-hover"
              >
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">Get In Touch</Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex justify-center lg:justify-start space-x-4 mt-8"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild variant="ghost" size="icon">
                  <Link
                    href="https://github.com/jeet-parikh"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild variant="ghost" size="icon">
                  <Link
                    href="https://linkedin.com/in/parikhjeet"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center">
                <div className="w-72 h-72 rounded-full bg-gradient-to-br from-primary/10 to-background border border-primary/10 flex items-center justify-center">
                  <div className="w-64 h-64 rounded-full bg-gradient-to-br from-primary/5 to-background border border-primary/5 flex items-center justify-center">
                    <div className="text-6xl font-bold text-primary/60">JP</div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center"
              >
                <div className="w-4 h-4 bg-primary rounded-full" />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center"
              >
                <div className="w-3 h-3 bg-primary rounded-full" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TypewriterText({ texts }: { texts: string[] }) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const fullText = texts[currentTextIndex];

        if (isDeleting) {
          setCurrentText(fullText.substring(0, currentText.length - 1));
          if (currentText === "") {
            setIsDeleting(false);
            setCurrentTextIndex((prev) => (prev + 1) % texts.length);
          }
        } else {
          setCurrentText(fullText.substring(0, currentText.length + 1));
          if (currentText === fullText) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentTextIndex, texts]);

  return (
    <span className="inline-block">
      {currentText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="ml-1"
      >
        |
      </motion.span>
    </span>
  );
}
