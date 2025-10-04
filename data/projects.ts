export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
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
    tags: ["Python", "FastAPI", "LangChain", "FAISS", "React", "Tailwind"],
    githubUrl: "https://github.com/jeet-parikh/deepdoc",
    liveUrl: "https://deepdoc-demo.vercel.app",
    imageUrl: "/projects/deepdoc-preview.png",
    featured: true,
    metrics: [
      { label: "Accuracy", value: "95%" },
      { label: "Response Time", value: "<2s" },
      { label: "Documents", value: "1000+" },
    ],
  },
  {
    id: "kare",
    title: "Kare",
    description:
      "Health data tracking app for elderly users with 100+ active users",
    longDescription:
      "An intuitive health data tracking and sharing app designed to empower elderly users to take control of their health. Features secure two-factor authentication, push notifications, and encrypted data storage using Firebase and Cloud Firestore.",
    tags: ["SwiftUI", "Xcode", "Cloud Firestore", "Firebase", "CocoaPods"],
    githubUrl: "https://github.com/jeet-parikh/kare",
    imageUrl: "/projects/kare-preview.png",
    featured: true,
    metrics: [
      { label: "Users", value: "100+" },
      { label: "Countries", value: "50+" },
      { label: "Rating", value: "4.8★" },
    ],
  },
  {
    id: "plantvision",
    title: "PlantVision AI",
    description:
      "Computer vision app for plant disease identification with 90%+ accuracy",
    longDescription:
      "A computer vision-powered mobile application capable of identifying plant diseases from user-submitted leaf images with over 90% accuracy. Trained a CNN on 20,000+ images and deployed using CoreML for on-device inference and offline usability.",
    tags: ["Swift", "TensorFlow", "CoreML", "Computer Vision", "iOS"],
    githubUrl: "https://github.com/jeet-parikh/plantvision",
    imageUrl: "/projects/plantvision-preview.png",
    featured: true,
    metrics: [
      { label: "Accuracy", value: "90%+" },
      { label: "Images Trained", value: "20K+" },
      { label: "Downloads", value: "500+" },
    ],
  },
  {
    id: "ymeets",
    title: "YMeets",
    description:
      "Yale's largest CS club platform with 2,500+ users and 10-person dev team",
    longDescription:
      "Led product development for Yale's largest computer science club platform. Grew the site to 2,500 users while managing a 10-person developer team and shipping new features regularly.",
    tags: ["React", "Node.js", "MongoDB", "Team Leadership"],
    liveUrl: "https://ymeets.com",
    featured: false,
  },
];
