export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  lede: string;
  caption: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
  metrics?: {
    label: string;
    value: string;
  }[];
}

export const projects: Project[] = [
  {
    id: "deepdoc",
    title: "DeepDoc",
    description: "Ask questions about a stack of PDFs.",
    longDescription:
      "Upload PDFs and ask questions in normal language. Search uses FAISS and LangChain, and the answer comes from the pages themselves.",
    lede: "Upload PDFs and ask questions in normal language. It searches them with FAISS and LangChain, and the answer comes from the pages themselves.",
    caption: "fig. 04 — questions for a PDF",
    tags: ["Python", "FastAPI", "LangChain", "FAISS", "React", "Tailwind"],
    githubUrl: "https://github.com/jeet-parikh/DeepDoc",
    liveUrl: "https://deep-doc.vercel.app/",
    imageUrl: "/projects/deepdoc-preview.png",
    featured: false,
  },
  {
    id: "ymeets",
    title: "ymeets",
    description: "Find a meeting time at Yale.",
    longDescription:
      "A scheduling site for Yale. I led a 10-person team, shipped what people asked for, and grew it to 2,500 users.",
    lede: "A way to find a meeting time at Yale. I led a 10-person team, shipped what people asked for, and grew it to 2,500 users.",
    caption: "fig. 01 — finding a time",
    tags: ["React", "TypeScript", "Firebase"],
    githubUrl: "https://github.com/YaleComputerSociety/ymeets",
    liveUrl: "https://ymeets.com",
    imageUrl: "/projects/ymeets-preview.png",
    featured: false,
    metrics: [
      { label: "Users", value: "2,500+" },
      { label: "Team", value: "10" },
    ],
  },
  {
    id: "plantvision",
    title: "PlantVision AI",
    description: "Take a photo of a leaf and get the disease.",
    longDescription:
      "Take a photo of a leaf and it names the disease. Trained on 20,000+ images, then run on the phone with CoreML, including offline, at over 90% accuracy.",
    lede: "Take a photo of a leaf and it names the disease. I trained the model on 20,000+ images. It runs on the phone with CoreML, offline, at over 90% accuracy.",
    caption: "fig. 02 — a photo of a leaf",
    tags: ["Swift", "Xcode", "TensorFlow", "CoreML", "CocoaPods"],
    liveUrl:
      "https://apps.apple.com/us/app/plantvision-ai-detect-disease/id1547100846",
    imageUrl: "/projects/plantvision-preview.png",
    featured: false,
    metrics: [
      { label: "Accuracy", value: "90%+" },
      { label: "Images", value: "20K+" },
    ],
  },
  {
    id: "kare",
    title: "Kare",
    description: "A health app for older adults.",
    longDescription:
      "Older adults can log how they're doing and share it with family. Two-factor login, push notifications, and encrypted storage with Firebase and Cloud Firestore. 100+ users, and growing.",
    lede: "A health app for older adults. They can log how they're doing and share it with family. Two-factor login, push notifications, and encrypted storage. 100+ users, and growing.",
    caption: "fig. 03 — a health log",
    tags: ["SwiftUI", "Xcode", "Firebase", "Cloud Firestore"],
    liveUrl:
      "https://apps.apple.com/us/app/kare-enabling-independence/id1660828940",
    imageUrl: "/projects/kare-preview.png",
    featured: false,
    metrics: [{ label: "Users", value: "100+" }],
  },
];

export const projectOrder = [
  "ymeets",
  "plantvision",
  "kare",
  "deepdoc",
] as const;
