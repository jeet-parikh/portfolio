"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/jeet-parikh",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/parikhjeet",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:jeet.parikh@yale.edu",
    icon: Mail,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/jeetparikh",
    icon: Twitter,
  },
];

/**
 * Renders the site footer with a branded home link, current year, and social links.
 * @returns The animated footer and its accessible links.
 */
export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="border-t border-border bg-background/50 backdrop-blur-sm"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Link href="/" aria-label="Jeet Parikh — home">
              <BrandLogo className="h-10 w-10" />
            </Link>
            <span>
              © {new Date().getFullYear()} Jeet Parikh. All rights reserved.
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={link.name}
                >
                  <link.icon className="h-5 w-5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
