"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { skills } from "@/data/skills";
import Image from "next/image";

// Technology logos mapping
const techLogos: Record<string, string> = {
  // Languages
  Python:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  JavaScript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  TypeScript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  Swift:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg",
  Java: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  C: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg",
  R: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/r/r-original.svg",

  // Frameworks & Libraries
  React:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "Next.js":
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  "Tailwind CSS":
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  FastAPI:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
  "Node.js":
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",

  // Data & ML
  "Apache Spark":
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachespark/apachespark-original.svg",
  Kafka:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachekafka/apachekafka-original.svg",
  TensorFlow:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg",
  LangChain: "https://langchain.com/img/logo.png",
  CoreML:
    "https://developer.apple.com/assets/elements/icons/core-ml/core-ml-256x256.png",

  // Cloud & DevOps
  AWS: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original.svg",
  Kubernetes:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg",
  Docker:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  Firebase:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg",

  // Tools
  Git: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  Xcode:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/xcode/xcode-original.svg",
  Linux:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
};

const getSkillLevel = (level: number) => {
  const levels = ["Beginner", "Novice", "Intermediate", "Advanced", "Expert"];
  return levels[level - 1] || "Beginner";
};

const getSkillColor = (level: number) => {
  const colors = [
    "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
    "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
    "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
    "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  ];
  return colors[level - 1] || colors[0];
};

export function SkillsGrid() {
  // Filter to show only the most important skills (level 4+ or key technologies)
  const importantSkills = skills.filter(
    (skill) =>
      skill.level >= 4 ||
      [
        "Python",
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "AWS",
        "Docker",
        "Git",
      ].includes(skill.name)
  );

  // Create broader categories
  const broadCategories = {
    "Languages & Frameworks": importantSkills.filter((skill) =>
      ["Languages", "Frontend", "Backend"].includes(skill.category)
    ),
    "Data & AI": importantSkills.filter((skill) =>
      ["Data", "ML"].includes(skill.category)
    ),
    "DevOps & Tools": importantSkills.filter((skill) =>
      ["Cloud", "DevOps", "Tools"].includes(skill.category)
    ),
  };

  const categories = Object.entries(broadCategories).filter(
    ([, skills]) => skills.length > 0
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(([category, categorySkills], categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: categoryIndex * 0.1,
              ease: "easeOut",
            }}
            className="space-y-4"
          >
            {/* Category Title */}
            <h3 className="text-lg font-semibold text-foreground text-center">
              {category}
            </h3>

            {/* Skills Cards */}
            <div className="grid grid-cols-1 gap-2">
              {categorySkills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: skillIndex * 0.05,
                    ease: "easeOut",
                  }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="group"
                >
                  <Card className="p-3 hover:shadow-md transition-all duration-300 border-border/50 hover:border-primary/50">
                    <div className="flex items-center space-x-3">
                      {/* Technology Logo */}
                      <div className="relative w-6 h-6 flex items-center justify-center flex-shrink-0">
                        {techLogos[skill.name] ? (
                          <Image
                            src={techLogos[skill.name]}
                            alt={skill.name}
                            width={24}
                            height={24}
                            className="w-6 h-6 object-contain group-hover:scale-110 transition-transform duration-300"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = "none";
                              const fallback =
                                target.nextElementSibling as HTMLElement;
                              if (fallback) fallback.style.display = "flex";
                            }}
                          />
                        ) : null}
                        <div
                          className="hidden w-6 h-6 bg-primary/10 rounded items-center justify-center text-primary font-bold text-xs"
                          style={{
                            display: techLogos[skill.name] ? "none" : "flex",
                          }}
                        >
                          {skill.name.charAt(0)}
                        </div>
                      </div>

                      {/* Technology Name */}
                      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {skill.name}
                      </span>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
