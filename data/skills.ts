export interface Skill {
  name: string;
  category: string;
  level: number; // 1-5
  icon?: string;
}

export const skills: Skill[] = [
  // Languages
  { name: "Python", category: "Languages", level: 5 },
  { name: "JavaScript", category: "Languages", level: 5 },
  { name: "TypeScript", category: "Languages", level: 5 },
  { name: "Swift", category: "Languages", level: 4 },
  { name: "Java", category: "Languages", level: 4 },
  { name: "C", category: "Languages", level: 4 },
  { name: "R", category: "Languages", level: 3 },

  // Frameworks & Libraries
  { name: "React", category: "Frontend", level: 5 },
  { name: "Next.js", category: "Frontend", level: 5 },
  { name: "Tailwind CSS", category: "Frontend", level: 5 },
  { name: "FastAPI", category: "Backend", level: 4 },
  { name: "Node.js", category: "Backend", level: 4 },

  // Data & ML
  { name: "Apache Spark", category: "Data", level: 5 },
  { name: "Kafka", category: "Data", level: 4 },
  { name: "TensorFlow", category: "ML", level: 4 },
  { name: "LangChain", category: "ML", level: 4 },
  { name: "CoreML", category: "ML", level: 4 },

  // Cloud & DevOps
  { name: "AWS", category: "Cloud", level: 4 },
  { name: "Kubernetes", category: "DevOps", level: 3 },
  { name: "Docker", category: "DevOps", level: 4 },
  { name: "Firebase", category: "Cloud", level: 5 },

  // Tools
  { name: "Git", category: "Tools", level: 5 },
  { name: "Xcode", category: "Tools", level: 4 },
  { name: "Linux", category: "Tools", level: 4 },
];
