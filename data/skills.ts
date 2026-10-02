export interface Skill {
  name: string;
  category: string;
  note: string;
}

export const skills: Skill[] = [
  {
    name: "Python",
    category: "Languages",
    note: "The video I clicked in eighth grade. Still home base.",
  },
  {
    name: "JavaScript",
    category: "Languages",
    note: "For the interfaces people actually touch.",
  },
  {
    name: "TypeScript",
    category: "Languages",
    note: "JavaScript, after it has had a moment to think.",
  },
  {
    name: "Swift",
    category: "Languages",
    note: "Self-taught in Xcode, so the first apps could leave the house.",
  },
  {
    name: "Java",
    category: "Languages",
    note: "When a course, or a stubborn system, asks for it.",
  },
  {
    name: "C",
    category: "Languages",
    note: "For the days the problem wants to sit closer to the machine.",
  },
  {
    name: "R",
    category: "Languages",
    note: "When the question is really a statistics question.",
  },
  {
    name: "React",
    category: "Frameworks",
    note: "ymeets, the trial tool, and plenty of interfaces since.",
  },
  {
    name: "Next.js",
    category: "Frameworks",
    note: "How a React idea gets a URL.",
  },
  {
    name: "Tailwind CSS",
    category: "Frameworks",
    note: "Type, space, and color without a long argument.",
  },
  {
    name: "FastAPI",
    category: "Frameworks",
    note: "The door in front of a model. DeepDoc uses it.",
  },
  {
    name: "Node.js",
    category: "Frameworks",
    note: "The other door, usually with a React app beside it.",
  },
  {
    name: "Apache Spark",
    category: "Data & ML",
    note: "Moved 100M+ financial records a day at Bloomberg.",
  },
  {
    name: "Kafka",
    category: "Data & ML",
    note: "The stream those records arrived on.",
  },
  {
    name: "TensorFlow",
    category: "Data & ML",
    note: "Trained the plant model on 20,000+ leaf images.",
  },
  {
    name: "LangChain",
    category: "Data & ML",
    note: "Orchestration so DeepDoc stays attached to the page.",
  },
  {
    name: "CoreML",
    category: "Data & ML",
    note: "On-device inference, so PlantVision works with no signal.",
  },
  {
    name: "AWS",
    category: "DevOps & Tools",
    note: "The oncology trial tool lived on EC2.",
  },
  {
    name: "Kubernetes",
    category: "DevOps & Tools",
    note: "When a service needs a cluster, not a single machine.",
  },
  {
    name: "Docker",
    category: "DevOps & Tools",
    note: "The box a service ships in.",
  },
  {
    name: "Firebase",
    category: "DevOps & Tools",
    note: "Auth, reminders, and encrypted storage for Kare.",
  },
  {
    name: "Git",
    category: "DevOps & Tools",
    note: "The other paper trail.",
  },
  {
    name: "Xcode",
    category: "DevOps & Tools",
    note: "Where Swift becomes something you can hold.",
  },
  {
    name: "Linux",
    category: "DevOps & Tools",
    note: "SLURM clusters, servers, the quiet machines.",
  },
];

export const skillCategories = [
  "Languages",
  "Frameworks",
  "Data & ML",
  "DevOps & Tools",
] as const;
