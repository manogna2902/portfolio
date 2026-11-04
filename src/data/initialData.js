/**
 * Initial Seed Data for Pittala Manogna's Portfolio
 * Every detail matches the user specification precisely.
 */

export const initialProfile = {
  name: "Pittala Manogna",
  title: "B.Tech Data Science Student | Aspiring Data Analyst",
  tagline: "Turning Data into Meaningful Insights",
  location: "Warangal, Telangana, India",
  email: "manogna2902@gmail.com",
  phone: "+91 8331003290",
  linkedin: "https://www.linkedin.com/in/manogna-pittala-077aa9325/",
  github: "https://github.com/manogna2902",
  bio: "I am a passionate B.Tech Data Science student at KITSW, Warangal, with a strong interest in Data Analytics, Python, Machine Learning, and Artificial Intelligence. I enjoy working with data, exploring new technologies, and developing problem-solving skills. My career goal is to become a successful Data Analyst and transform raw data into meaningful insights that support better decision-making. I am a quick learner, curious about new technologies, and committed to continuously improving my technical and analytical skills.",
  interests: [
    "Data Analytics",
    "Python",
    "Machine Learning",
    "Artificial Intelligence",
    "Data Visualization",
    "Problem Solving"
  ],
  avatarUrl: "", // Defaults to clean minimalist SVG avatar if empty
  resumeUrl: "", // Resume PDF path or Base64 data URL
  resumeFileName: "Pittala_Manogna_Resume.pdf",
  resumeUpdatedAt: "2026-11-04"
};

export const initialEducation = [
  {
    id: "edu-1",
    degree: "B.Tech – Data Science",
    institution: "Kakatiya Institute of Technology and Science (KITSW), Warangal",
    period: "2024–Present",
    score: "CGPA: 8.8",
    description: "Focusing on Core Data Science, Python programming, Machine Learning, Database Management Systems, and Statistical Data Analysis.",
    order: 1
  },
  {
    id: "edu-2",
    degree: "Intermediate – MPC",
    institution: "TSRJC CET Girls, Nirmal",
    period: "2022–2024",
    score: "Percentage: 96.9%",
    description: "Rigorous focus on advanced Mathematics, Physics, and Analytical problem solving with outstanding academic standing.",
    order: 2
  },
  {
    id: "edu-3",
    degree: "SSC (Secondary School Certificate)",
    institution: "ZPHS Maskapur",
    period: "2022",
    score: "GPA: 9.2",
    description: "Completed secondary education with top honors in quantitative subjects and general sciences.",
    order: 3
  }
];

export const initialSkills = [
  {
    id: "skill-1",
    name: "Python",
    category: "Programming & Analysis",
    icon: "code",
    description: "Data wrangling, analytical scripting, statistical computation, and foundational machine learning."
  },
  {
    id: "skill-2",
    name: "Tableau",
    category: "Business Intelligence",
    icon: "bar-chart-2",
    description: "Interactive visual reports, calculated fields, dashboard design, and business trend tracking."
  },
  {
    id: "skill-3",
    name: "Data Visualization",
    category: "Analytical Storytelling",
    icon: "pie-chart",
    description: "Visual exploratory analysis, charting patterns, KPIs, and turning complex metrics into clarity."
  },
  {
    id: "skill-4",
    name: "Java",
    category: "Core Programming",
    icon: "cpu",
    description: "Object-oriented principles, algorithmic problem solving, and structured data handling."
  },
  {
    id: "skill-5",
    name: "Problem Solving",
    category: "Core Analytical",
    icon: "brain",
    description: "Root-cause diagnostics, logical deduction, algorithmic thinking, and quantitative reasoning."
  }
];

export const initialProjects = [
  {
    id: "proj-1",
    title: "StudyMate",
    description: "An intelligent collaborative study management platform designed for students to organize academic resources, schedule study sessions, track subject milestones, and gain analytical insights into peer learning habits.",
    technologies: ["Python", "Data Analytics", "React", "Tailwind CSS", "Database Design"],
    githubUrl: "https://github.com/manogna2902",
    liveUrl: "",
    imageUrl: "",
    featured: true,
    order: 1
  },
  {
    id: "proj-2",
    title: "TRICITY",
    description: "An urban data analytics and civic information platform providing spatial visualizations, municipal data tracking, and community resource reporting to empower citizens and urban planners with data-backed decisions.",
    technologies: ["Python", "Civic Analytics", "Data Visualization", "REST APIs", "GIS Mapping"],
    githubUrl: "https://github.com/manogna2902",
    liveUrl: "",
    imageUrl: "",
    featured: true,
    order: 2
  }
];

export const initialCertifications = [
  {
    id: "cert-1",
    title: "Hedera Certified Foundation (HCF)",
    issuer: "Hedera",
    issueDate: "2024",
    credentialUrl: "https://hedera.com",
    fileUrl: "",
    description: "Verified foundational proficiency in distributed ledger technology, Hedera Hashgraph consensus algorithms, token services, and decentralized architecture."
  }
];

export const initialInternships = [
  {
    id: "intern-1",
    role: "Java Programming Intern",
    company: "InternPe",
    duration: "6 Weeks",
    period: "2026",
    description: "Completed an intensive 6-week hands-on internship focusing on core Java programming, object-oriented software design, data structures, and practical application development.",
    highlights: [
      "Built structured Java modules adhering to OOP and clean architecture principles",
      "Developed algorithms for data manipulation and optimized efficiency",
      "Applied debugging, version control, and real-world software testing practices"
    ]
  }
];

export const initialServices = [
  {
    id: "serv-1",
    title: "Data Visualization using Tableau",
    description: "Transforming complex datasets into clear, interactive, and actionable Tableau dashboards that drive strategic understanding.",
    icon: "layout"
  },
  {
    id: "serv-2",
    title: "Dashboard Creation",
    description: "Designing end-to-end performance and KPI dashboards tailored for continuous tracking, metrics evaluation, and decision-making.",
    icon: "gauge"
  },
  {
    id: "serv-3",
    title: "Data Cleaning and Data Preprocessing",
    description: "Detecting anomalies, handling missing values, standardizing formats, and structuring raw data for dependable statistical modeling.",
    icon: "filter"
  },
  {
    id: "serv-4",
    title: "Basic Python Programming",
    description: "Writing clean, modular Python scripts to automate repetitive tasks, parse unstructured files, and compute quantitative metrics.",
    icon: "terminal"
  }
];

export const initialSeminar = {
  id: "sem-1",
  title: "Credit Card Fraud Detection",
  type: "Academic Seminar Topic",
  institution: "KITSW, Warangal",
  description: "Academic seminar exploring machine learning-based approaches for identifying fraudulent credit card transactions.",
  extendedNotes: "Analyzed critical challenges in high-frequency financial systems including extreme class imbalance, concept drift, feature scaling, and optimizing Precision-Recall trade-offs over raw accuracy to minimize false negatives.",
  keyTakeaways: [
    "Examined supervised classification models (Logistic Regression, Random Forests, XGBoost) on anonymized PCA datasets",
    "Evaluated resampling strategies such as SMOTE and Random Undersampling for highly skewed distributions",
    "Highlighted cost-sensitive learning metrics: F1-Score, PR-AUC, and financial loss minimization"
  ]
};

export const initialMessages = [
  {
    id: "msg-1",
    name: "KITSW Training & Placement Cell",
    email: "placements@kitsw.ac.in",
    subject: "Data Analyst Internship Opportunity",
    message: "Hello Manogna, we reviewed your academic profile and coursework in Data Science. We would like to invite you for an upcoming Data Analyst assessment session.",
    timestamp: "2026-11-02T10:30:00.000Z",
    read: false
  }
];
