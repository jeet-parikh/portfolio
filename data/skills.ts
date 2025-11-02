export interface Skill {
  name: string;
  category: string;
  icon?: string;
}

export const skills: Skill[] = [
  // Languages
  { name: "Python", category: "Languages" },
  { name: "JavaScript", category: "Languages" },
  { name: "TypeScript", category: "Languages" },
  { name: "Swift", category: "Languages" },
  { name: "Java", category: "Languages" },
  { name: "C", category: "Languages" },
  { name: "R", category: "Languages" },

  // Frameworks
  { name: "React", category: "Frameworks" },
  { name: "Next.js", category: "Frameworks" },
  { name: "Tailwind CSS", category: "Frameworks" },
  { name: "FastAPI", category: "Frameworks" },
  { name: "Node.js", category: "Frameworks" },

  // Data & ML
  { name: "Apache Spark", category: "Data & ML" },
  { name: "Kafka", category: "Data & ML" },
  { name: "TensorFlow", category: "Data & ML" },
  { name: "LangChain", category: "Data & ML" },
  { name: "CoreML", category: "Data & ML" },

  // DevOps & Tools
  { name: "AWS", category: "DevOps & Tools" },
  { name: "Kubernetes", category: "DevOps & Tools" },
  { name: "Docker", category: "DevOps & Tools" },
  { name: "Firebase", category: "DevOps & Tools" },
  { name: "Git", category: "DevOps & Tools" },
  { name: "Xcode", category: "DevOps & Tools" },
  { name: "Linux", category: "DevOps & Tools" },
];
