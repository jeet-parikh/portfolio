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
    description:
      "A full-stack RAG platform for querying PDF knowledge bases with natural language",
    longDescription:
      "Built a comprehensive Retrieval-Augmented Generation (RAG) platform that enables users to query large PDF knowledge bases using natural language. The system leverages vector search with FAISS and LangChain orchestration to provide contextually grounded, relevant answers.",
    lede: "Ask a stack of PDFs a question. Vector search with FAISS and LangChain orchestration, so the answer stays tied to the page it came from.",
    caption: "fig. 04 — the library, queried",
    tags: ["Python", "FastAPI", "LangChain", "FAISS", "React", "Tailwind"],
    githubUrl: "https://github.com/jeet-parikh/DeepDoc",
    liveUrl: "https://deep-doc.vercel.app/",
    imageUrl: "/projects/deepdoc-preview.png",
    featured: false,
  },
  {
    id: "ymeets",
    title: "ymeets",
    description: "A cleaner, faster way to schedule meetings on Yale's campus",
    longDescription:
      "Led product development for Yale's largest computer science club platform. Grew the site to 2,500 users while managing a 10-person developer team and shipping new features regularly.",
    lede: "Yale's scheduling board. I led a ten-person team, shipped the features people asked for, and grew it to 2,500 users.",
    caption: "fig. 03 — when everyone is free",
    tags: ["React", "Node.js", "MongoDB", "Leadership", "Product"],
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
    description:
      "Computer-vision based app for plant disease detection and treatment",
    longDescription:
      "A computer vision-powered mobile application capable of identifying plant diseases from user-submitted leaf images with over 90% accuracy. Trained a CNN on 20,000+ images and deployed using CoreML for on-device inference and offline usability.",
    lede: "Point a phone at a leaf and get the disease. A vision model trained on 20,000+ images, running on the device with CoreML, including offline.",
    caption: "fig. 01 — one photo, a diagnosis",
    tags: ["Swift", "TensorFlow", "CoreML", "Computer Vision", "iOS"],
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
    description: "Health data tracking app for elderly users",
    longDescription:
      "An intuitive health data tracking and sharing app designed to empower elderly users to take control of their health. Features secure two-factor authentication, push notifications, and encrypted data storage using Firebase and Cloud Firestore.",
    lede: "A health record older adults can actually keep, and share with the people looking after them. Two-factor sign-in, reminders, encrypted storage. A hundred users, and growing.",
    caption: "fig. 02 — shared with care",
    tags: ["SwiftUI", "Firebase", "Cloud Firestore", "iOS", "2FA"],
    liveUrl:
      "https://apps.apple.com/us/app/kare-enabling-independence/id1660828940",
    imageUrl: "/projects/kare-preview.png",
    featured: false,
    metrics: [
      { label: "Users", value: "100+" },
      { label: "Countries", value: "50+" },
    ],
  },
];

export const projectOrder = [
  "ymeets",
  "plantvision",
  "kare",
  "deepdoc",
] as const;
