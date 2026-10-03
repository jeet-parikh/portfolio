export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
  tags: string[];
  aside: string;
}

export const experience: Experience[] = [
  {
    id: "databricks",
    title: "Software Engineer Intern",
    company: "Databricks",
    location: "Mountain View, CA",
    startDate: "May 2026",
    endDate: "Present",
    current: true,
    aside:
      "I built an agent that improves production data pipelines. Latency down 30%, compute down 25%.",
    description: [
      "I built an AI agent that improves production data pipelines on its own, using a custom harness, MCP tools, and orchestration.",
      "It cut latency by 30% and compute costs by 25%, which made it possible to offer it at a lower price.",
    ],
    tags: ["MCP"],
  },
  {
    id: "yale-cs",
    title: "President",
    company: "Yale Computer Society",
    location: "New Haven, CT",
    startDate: "Sep 2024",
    endDate: "Present",
    current: true,
    aside:
      "I lead Yale's largest CS club. 8 products, 20,000+ users, 100+ student developers.",
    description: [
      "I lead Yale's largest CS club and the product work for 8 apps. They have 20,000+ users, and 100+ students build them.",
      "I also lead ymeets. We grew it to 2,500 users with a 10-person team.",
    ],
    tags: [],
  },
  {
    id: "bloomberg",
    title: "Software Engineer Intern",
    company: "Bloomberg",
    location: "New York, NY",
    startDate: "Jun 2025",
    endDate: "Aug 2025",
    current: false,
    aside:
      "A Spark and Kafka pipeline. 100M+ financial records a day, on the Terminal.",
    description: [
      "I built a Spark and Kafka pipeline that takes in 100M+ financial records a day.",
      "It's in production on the Bloomberg Terminal, for 300+ enterprise clients and internal teams.",
      "I worked with teams in San Francisco and London on what clients needed, and on checking that the services fit together.",
    ],
    tags: ["Apache Spark", "Kafka"],
  },
  {
    id: "ctrltrial",
    title: "Software Engineer Intern",
    company: "CtrlTrial",
    location: "New Haven, CT",
    startDate: "Oct 2024",
    endDate: "Jun 2025",
    current: false,
    aside: "I grouped clinical trial data so the trends were easier to see.",
    description: [
      "I built a system that uses embeddings, NLP, and LLMs to pull unstructured clinical trial data from an API and group it.",
      "I shipped an oncology trial trends tool in React and Three.js on AWS EC2, and cleaned up the charts and how people read them.",
    ],
    tags: ["React", "Three.js", "AWS"],
  },
  {
    id: "pariglo",
    title: "Founder & CEO",
    company: "Pariglo Solutions LLC",
    location: "Irvine, CA",
    startDate: "Jun 2020",
    endDate: "Aug 2024",
    current: false,
    aside:
      "Two iOS apps, Kare and PlantVision AI. 10,000+ downloads in 50+ countries.",
    description: [
      "I started the company and shipped Kare and PlantVision AI. Together they have 10,000+ downloads in 50+ countries.",
      "I taught myself Swift and Xcode. The apps have push notifications, two-factor login, and on-device models with CoreML.",
    ],
    tags: ["Swift", "Xcode", "CoreML"],
  },
  {
    id: "utah-research",
    title: "Machine Learning Researcher",
    company: "University of Utah",
    location: "Salt Lake City, UT",
    startDate: "Aug 2022",
    endDate: "Jan 2024",
    current: false,
    aside:
      "An open-source Python package for materials discovery, and a talk at TMS 2023.",
    description: [
      "I built an open-source Python package that benchmarks algorithms for discovering new materials.",
      "I co-authored a paper and gave a talk to 500+ people in industry at the TMS 2023 conference.",
    ],
    tags: ["Python"],
  },
];
