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
      "An agent that tunes production pipelines. Latency down 30%. Compute down 25%.",
    description: [
      "Built an AI agent that autonomously improves production data pipelines, using a custom harness, MCP tools, and orchestration",
      "The optimization cut latency by 30% and compute costs by 25%, enough to commercialize at a lower price",
    ],
    tags: ["Agents", "MCP", "Data Pipelines", "Python"],
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
      "Eight products. Twenty thousand people. A hundred students building them.",
    description: [
      "Leading Yale's largest CS club and the product vision for 8 software products with 20,000+ users and 100+ student developers",
      "Team lead of ymeets.com. Grew the site to 2,500 users with a 10-person developer team",
    ],
    tags: ["Leadership", "Product", "React", "Node.js"],
  },
  {
    id: "bloomberg",
    title: "Software Engineer Intern",
    company: "Bloomberg",
    location: "New York, NY",
    startDate: "Jun 2025",
    endDate: "Aug 2025",
    current: false,
    aside: "A hundred million financial records a day, live on the Terminal.",
    description: [
      "Engineered a Spark and Kafka pipeline that ingests 100M+ financial records daily",
      "Shipped it to production on the Bloomberg Terminal, powering analytics for 300+ enterprise clients",
    ],
    tags: ["Apache Spark", "Kafka", "Python", "Production"],
  },
  {
    id: "ctrltrial",
    title: "Software Engineer Intern",
    company: "CtrlTrial",
    location: "New Haven, CT",
    startDate: "Oct 2024",
    endDate: "Jun 2025",
    current: false,
    aside: "Oncology trial data, clustered so the trend is visible.",
    description: [
      "Built an AI system using vector embeddings, NLP, and LLMs to extract and cluster unstructured clinical trial data",
      "Shipped a trial-trend tool in React and Three.js on AWS, and tightened the way the data is read",
    ],
    tags: ["React", "Three.js", "NLP", "AWS"],
  },
  {
    id: "pariglo",
    title: "Founder & CEO",
    company: "Pariglo Solutions LLC",
    location: "Irvine, CA",
    startDate: "Jun 2020",
    endDate: "Aug 2024",
    current: false,
    aside: "Two apps. Ten thousand downloads. Fifty countries.",
    description: [
      "Founded the company and shipped Kare and PlantVision AI, native iOS apps with 10,000+ downloads across 50+ countries",
      "Taught myself Swift and Xcode. Added push notifications, two-factor sign-in, and on-device inference with CoreML",
    ],
    tags: ["iOS", "Swift", "CoreML", "Firebase"],
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
      "An open-source benchmarking suite, and a talk to 500 people at TMS.",
    description: [
      "Built an open-source Python package for benchmarking materials-discovery algorithms",
      "Co-authored a manuscript and presented it to 500+ industry leaders at the TMS 2023 conference",
    ],
    tags: ["Machine Learning", "Python", "Research"],
  },
];
