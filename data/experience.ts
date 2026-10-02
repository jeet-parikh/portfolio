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
    id: "bloomberg",
    title: "Software Engineer Intern",
    company: "Bloomberg",
    location: "New York, NY",
    startDate: "Jun 2025",
    endDate: "Aug 2025",
    current: false,
    aside: "A summer inside the Terminal, moving more rows than I can picture.",
    description: [
      "Engineered a scalable data pipeline using Apache Spark and Kafka to automate the ingestion of 100M+ financial records daily",
      "Deployed to production on the Bloomberg Terminal, directly powering analytics for 300+ enterprise clients and internal teams",
      "Led global collaboration with teams in San Francisco and London to gather client needs and validate cross-service integration",
    ],
    tags: [
      "Apache Spark",
      "Kafka",
      "Python",
      "Data Engineering",
      "Production Systems",
    ],
  },
  {
    id: "yale-medicine",
    title: "Research Assistant",
    company: "Yale School of Medicine",
    location: "New Haven, CT",
    startDate: "Mar 2025",
    endDate: "Present",
    current: true,
    aside: "The question I most want a careful answer to.",
    description: [
      "Developing a predictive analytics tool using PySpark and AI modeling to forecast breast cancer recurrence",
      "Interfacing with OMOP-standardized electronic health record data at scale",
      "Experimenting with NLP techniques for novel feature extraction",
    ],
    tags: ["PySpark", "Machine Learning", "Healthcare", "NLP", "Data Science"],
  },
  {
    id: "ctrltrial",
    title: "Software Engineer Intern",
    company: "CtrlTrial",
    location: "New Haven, CT",
    startDate: "Oct 2024",
    endDate: "Jun 2025",
    current: false,
    aside: "Trial data is a mess. The job was to make its shape visible.",
    description: [
      "Built an AI system using semantic vector embeddings, NLP and LLMs to extract and cluster unstructured clinical trial API data",
      "Deployed a user-facing oncology trial trend analytics tool (React, Three.js) on AWS EC2",
      "Optimized UX and data visualization for clinical trial insights",
    ],
    tags: [
      "React",
      "Three.js",
      "AWS",
      "NLP",
      "Vector Embeddings",
      "Data Visualization",
    ],
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
      "A hundred builders, nine products, and a calendar that had to behave.",
    description: [
      "President of Yale's largest CS club, shaping 9 software products with 20,000+ users and 100+ student developers",
      "Team lead of ymeets.com — grew the site to 2,500 users while shipping with a 10-person developer team",
    ],
    tags: [
      "Leadership",
      "Product Management",
      "Team Development",
      "React",
      "Node.js",
    ],
  },
  {
    id: "pariglo",
    title: "Founder & CEO",
    company: "Pariglo Solutions LLC",
    location: "Irvine, CA",
    startDate: "Jun 2020",
    endDate: "Aug 2024",
    current: false,
    aside: "Two apps, started from zero, for problems that began at home.",
    description: [
      "Launched 2 successful native iOS apps (Kare and PlantVision AI) which have gained 8,000+ downloads across 50+ countries",
      "Self-taught iOS app development in Swift and Xcode. Integrated push notifications, 2FA, and on-device inference via CoreML",
    ],
    tags: [
      "iOS Development",
      "Swift",
      "Entrepreneurship",
      "CoreML",
      "Firebase",
      "Mobile Apps",
    ],
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
      "Materials, models, and 4,614 CUDA-core years I still like saying out loud.",
    description: [
      "Developed an ML benchmarking suite for complex materials discovery algorithms, available open-source as a Python package",
      "Ran multi-objective Bayesian optimization jobs with Meta's Ax on SLURM GPU clusters (4,614 CUDA-core years of runtime)",
      "Co-authored a manuscript and delivered a presentation to 500+ industry leaders at the International TMS 2023 Conference",
    ],
    tags: [
      "Machine Learning",
      "Python",
      "Research",
      "Materials Science",
      "Bayesian Optimization",
      "GPU Computing",
    ],
  },
  {
    id: "futuremakers",
    title: "Deep Learning Intern",
    company: "MIT FutureMakers",
    location: "Cambridge, MA",
    startDate: "Jun 2022",
    endDate: "Aug 2022",
    current: false,
    aside: "Eight weeks on the ethics underneath a health app.",
    description: [
      "Selected for an eight-week deep learning program with experts at MIT, focused on the ethics of software that touches private data",
      "Used the summer to reshape Kare around personalized care, accessibility, and simplicity",
    ],
    tags: ["Deep Learning", "Ethics", "Healthcare", "iOS"],
  },
];
