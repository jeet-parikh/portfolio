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
    lede: "A folder of PDFs is a bad conversationalist. DeepDoc lets you ask a library a question — vector search with FAISS, orchestration with LangChain — and get an answer that stays tied to the page it came from.",
    caption: "fig. 04 — ask the paper",
    tags: ["Python", "FastAPI", "LangChain", "FAISS", "React", "Tailwind"],
    githubUrl: "https://github.com/jeet-parikh/DeepDoc",
    liveUrl: "https://deep-doc.vercel.app/",
    imageUrl: "/projects/deepdoc-preview.png",
    featured: false,
    metrics: [
      { label: "Accuracy", value: "95%" },
      { label: "Response", value: "<2s" },
      { label: "Documents", value: "1000+" },
    ],
  },
  {
    id: "ymeets",
    title: "ymeets",
    description: "A cleaner, faster way to schedule meetings on Yale's campus",
    longDescription:
      "Led product development for Yale's largest computer science club platform. Grew the site to 2,500 users while managing a 10-person developer team and shipping new features regularly.",
    lede: "Yale runs on meetings, and the calendar usually loses. ymeets is the board that makes a time appear. I led a ten-person team, shipped what people actually asked for, and watched it pass twenty-five hundred users.",
    caption: "fig. 03 — thursday, 3pm, somehow",
    tags: ["React", "Node.js", "MongoDB", "Leadership", "Product"],
    githubUrl: "https://github.com/YaleComputerSociety/ymeets",
    liveUrl: "https://ymeets.com",
    imageUrl: "/projects/ymeets-preview.png",
    featured: false,
    metrics: [
      { label: "Users", value: "2,500+" },
      { label: "Devs", value: "10+" },
      { label: "Growth", value: "150% YoY" },
    ],
  },
  {
    id: "plantvision",
    title: "PlantVision AI",
    description:
      "Computer-vision based app for plant disease detection and treatment",
    longDescription:
      "A computer vision-powered mobile application capable of identifying plant diseases from user-submitted leaf images with over 90% accuracy. Trained a CNN on 20,000+ images and deployed using CoreML for on-device inference and offline usability.",
    lede: "A photo of a leaf, instead of another hour on Reddit. I trained a vision model on more than twenty thousand images and shipped it to the phone, offline included. It started because we kept burying tomato plants.",
    caption: "fig. 01 — the garden, diagnosed",
    tags: ["Swift", "TensorFlow", "CoreML", "Computer Vision", "iOS"],
    liveUrl:
      "https://apps.apple.com/us/app/plantvision-ai-detect-disease/id1547100846",
    imageUrl: "/projects/plantvision-preview.png",
    featured: false,
    metrics: [
      { label: "Downloads", value: "7000+" },
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
    lede: "The garden was a rehearsal. Kare is for people: a medication, a blood pressure, a walk, shared with the family doing the looking-after. Two-factor sign-in, reminders, encrypted storage. It took eighteen months, because the data belongs to someone.",
    caption: "fig. 02 — shared carefully",
    tags: ["SwiftUI", "Firebase", "Cloud Firestore", "iOS", "2FA"],
    liveUrl:
      "https://apps.apple.com/us/app/kare-enabling-independence/id1660828940",
    imageUrl: "/projects/kare-preview.png",
    featured: false,
    metrics: [
      { label: "Users", value: "100+" },
      { label: "Countries", value: "50+" },
      { label: "Rating", value: "4.8★" },
    ],
  },
];

export const projectOrder = [
  "plantvision",
  "kare",
  "ymeets",
  "deepdoc",
] as const;
