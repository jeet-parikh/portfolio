export interface Skill {
  name: string;
  category: string;
  level: number; // 1-5
  icon?: string;
}

export const skills: Skill[] = [
  // Languages
  { name: "Python", category: "Languages", level: 5, icon: "🐍" },
  { name: "JavaScript", category: "Languages", level: 5, icon: "🟨" },
  { name: "TypeScript", category: "Languages", level: 5, icon: "🔷" },
  { name: "Swift", category: "Languages", level: 4, icon: "🍎" },
  { name: "Java", category: "Languages", level: 4, icon: "☕" },
  { name: "C", category: "Languages", level: 4, icon: "⚙️" },
  { name: "R", category: "Languages", level: 3, icon: "📊" },

  // Frameworks & Libraries
  { name: "React", category: "Frontend", level: 5, icon: "⚛️" },
  { name: "Next.js", category: "Frontend", level: 5, icon: "▲" },
  { name: "Tailwind CSS", category: "Frontend", level: 5, icon: "🎨" },
  { name: "FastAPI", category: "Backend", level: 4, icon: "🚀" },
  { name: "Node.js", category: "Backend", level: 4, icon: "🟢" },

  // Data & ML
  { name: "Apache Spark", category: "Data", level: 5, icon: "⚡" },
  { name: "Kafka", category: "Data", level: 4, icon: "📡" },
  { name: "TensorFlow", category: "ML", level: 4, icon: "🧠" },
  { name: "LangChain", category: "ML", level: 4, icon: "🔗" },
  { name: "CoreML", category: "ML", level: 4, icon: "📱" },

  // Cloud & DevOps
  { name: "AWS", category: "Cloud", level: 4, icon: "☁️" },
  { name: "Kubernetes", category: "DevOps", level: 3, icon: "⚙️" },
  { name: "Docker", category: "DevOps", level: 4, icon: "🐳" },
  { name: "Firebase", category: "Cloud", level: 5, icon: "🔥" },

  // Tools
  { name: "Git", category: "Tools", level: 5, icon: "📝" },
  { name: "Xcode", category: "Tools", level: 4, icon: "🔨" },
  { name: "Linux", category: "Tools", level: 4, icon: "🐧" },
];
