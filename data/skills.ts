export interface Skill {
  name: string;
  category: string;
  note: string;
}

export const skills: Skill[] = [
  {
    name: "Python",
    category: "Languages",
    note: "DeepDoc, and the materials-discovery package from Utah.",
  },
  {
    name: "C",
    category: "Languages",
    note: "A language I use.",
  },
  {
    name: "Java",
    category: "Languages",
    note: "A language I use.",
  },
  {
    name: "Swift",
    category: "Languages",
    note: "Kare and PlantVision. I taught myself in Xcode.",
  },
  {
    name: "R",
    category: "Languages",
    note: "A language I use.",
  },
  {
    name: "JavaScript",
    category: "Languages",
    note: "The web projects.",
  },
  {
    name: "TypeScript",
    category: "Languages",
    note: "ymeets is written in it.",
  },
  {
    name: "HTML",
    category: "Languages",
    note: "The web projects.",
  },
  {
    name: "CSS",
    category: "Languages",
    note: "The web projects.",
  },
  {
    name: "MCP",
    category: "Technologies",
    note: "The Databricks agent uses MCP tools.",
  },
  {
    name: "Apache Spark",
    category: "Technologies",
    note: "The Bloomberg pipeline.",
  },
  {
    name: "Kafka",
    category: "Technologies",
    note: "The Bloomberg pipeline.",
  },
  {
    name: "Firebase",
    category: "Technologies",
    note: "Kare, and ymeets.",
  },
  {
    name: "LangChain",
    category: "Technologies",
    note: "DeepDoc uses it to answer from the PDFs.",
  },
  {
    name: "TensorFlow",
    category: "Technologies",
    note: "I trained the PlantVision model with it.",
  },
  {
    name: "CoreML",
    category: "Technologies",
    note: "PlantVision runs the model on the phone.",
  },
  {
    name: "Kubernetes",
    category: "Technologies",
    note: "A tool I use.",
  },
  {
    name: "React",
    category: "Technologies",
    note: "ymeets, DeepDoc, and the CtrlTrial tool.",
  },
  {
    name: "Xcode",
    category: "Technologies",
    note: "Where I built the iOS apps.",
  },
  {
    name: "Git",
    category: "Technologies",
    note: "A tool I use.",
  },
  {
    name: "Linux",
    category: "Technologies",
    note: "A tool I use.",
  },
];

export const skillCategories = ["Languages", "Technologies"] as const;
