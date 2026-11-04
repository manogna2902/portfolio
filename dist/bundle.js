// src/main.jsx
import React33 from "react";
import ReactDOM from "react-dom/client";

// src/App.jsx
import React32, { useState as useState19, useEffect as useEffect6 } from "react";

// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

// src/data/resumeBase64.js
var defaultResumePdfBase64 = "data:application/pdf;base64,JVBERi0xLjQKMSAwIG9iago8PCAvVHlwZSAvQ2F0YWxvZyAvUGFnZXMgMiAwIFIgPj4KZW5kb2JqCjIgMCBvYmoKPDwgL1R5cGUgL1BhZ2VzIC9LaWRzIFszIDAgUl0gL0NvdW50IDEgPj4KZW5kb2JqCjMgMCBvYmoKPDwgL1R5cGUgL1BhZ2UgL1BhcmVudCAyIDAgUiAvTWVkaWFCb3ggWzAgMCA1OTUgODQyXSAvQ29udGVudHMgNCAwIFIgL1Jlc291cmNlcyA8PCAvRm9udCA8PCAvRjEgNSAwIFIgL0YyIDYgMCBSID4+ID4+ID4+CmVuZG9iago0IDAgb2JqCjw8IC9MZW5ndGggMzQ4NCA+PgpzdHJlYW0KMC4yIDAuMiAwLjIgUkcgMSB3IDQwIDczNSBtIDU1NSA3MzUgbCBTCjAuNyAwLjcgMC43IFJHIDAuNSB3CjQwIDcxMCBtIDU1NSA3MTAgbCBTCjQwIDY1NSBtIDU1NSA2NTUgbCBTCjQwIDUzNyBtIDU1NSA1MzcgbCBTCjQwIDQ2OCBtIDU1NSA0NjggbCBTCjQwIDM1NyBtIDU1NSAzNTcgbCBTCjQwIDI4OCBtIDU1NSAyODggbCBTCkJUIC9GMiAyMCBUZiAwIDAgMCByZyA0MCA3OTAgVGQgKFBJVFRBTEEgTUFOT0dOQSkgVGogRVQKQlQgL0YxIDEyIFRmIDAgMCAwIHJnIDQwIDc3MCBUZCAoQi5UZWNoIERhdGEgU2NpZW5jZSBTdHVkZW50IHwgQXNwaXJpbmcgRGF0YSBBbmFseXN0KSBUaiBFVApCVCAvRjEgMTAgVGYgMCAwIDAgcmcgNDAgNzU1IFRkIChXYXJhbmdhbCwgVGVsYW5nYW5hLCBJbmRpYSB8ICs5MSA4MzMxMDAzMjkwIHwgbWFub2duYTI5MDJAZ21haWwuY29tKSBUaiBFVApCVCAvRjEgMTAgVGYgMCAwIDAgcmcgNDAgNzQyIFRkIChMaW5rZWRJbjogbGlua2VkaW4uY29tL2luL21hbm9nbmEtcGl0dGFsYS0wNzdhYTkzMjUgfCBHaXRIdWI6IGdpdGh1Yi5jb20vbWFub2duYTI5MDIpIFRqIEVUCkJUIC9GMiAxMiBUZiAwIDAgMCByZyA0MCA3MTUgVGQgKENBUkVFUiBPQkpFQ1RJVkUpIFRqIEVUCkJUIC9GMSAxMCBUZiAwIDAgMCByZyA0MCA3MDAgVGQgKFBhc3Npb25hdGUgQi5UZWNoIERhdGEgU2NpZW5jZSBzdHVkZW50IGF0IEtJVFNXIFdhcmFuZ2FsIHdpdGggc3Ryb25nIGZvdW5kYXRpb25zIGluIERhdGEgQW5hbHl0aWNzLCkgVGogRVQKQlQgL0YxIDEwIFRmIDAgMCAwIHJnIDQwIDY4OCBUZCAoUHl0aG9uLCBNYWNoaW5lIExlYXJuaW5nLCBhbmQgVGFibGVhdS4gU2Vla2luZyB0byB0cmFuc2Zvcm0gcmF3IGRhdGEgaW50byBhY3Rpb25hYmxlIGJ1c2luZXNzIGluc2lnaHRzLikgVGogRVQKQlQgL0YyIDEyIFRmIDAgMCAwIHJnIDQwIDY2MCBUZCAoRURVQ0FUSU9OKSBUaiBFVApCVCAvRjIgMTEgVGYgMCAwIDAgcmcgNDAgNjQ1IFRkIChLYWthdGl5YSBJbnN0aXR1dGUgb2YgVGVjaG5vbG9neSBhbmQgU2NpZW5jZSBcKEtJVFNXXCksIFdhcmFuZ2FsKSBUaiBFVApCVCAvRjEgMTAgVGYgMCAwIDAgcmcgNDAgNjMyIFRkIChCLlRlY2ggaW4gRGF0YSBTY2llbmNlIHwgMjAyNCAtIFByZXNlbnQgfCBDR1BBOiA4LjgpIFRqIEVUCkJUIC9GMiAxMSBUZiAwIDAgMCByZyA0MCA2MTQgVGQgKFRTUkpDIENFVCBHaXJscywgTmlybWFsKSBUaiBFVApCVCAvRjEgMTAgVGYgMCAwIDAgcmcgNDAgNjAxIFRkIChJbnRlcm1lZGlhdGUgLSBNUEMgfCAyMDIyIC0gMjAyNCB8IFBlcmNlbnRhZ2U6IDk2LjklKSBUaiBFVApCVCAvRjIgMTEgVGYgMCAwIDAgcmcgNDAgNTgzIFRkIChaUEhTIE1hc2thcHVyKSBUaiBFVApCVCAvRjEgMTAgVGYgMCAwIDAgcmcgNDAgNTcwIFRkIChTZWNvbmRhcnkgU2Nob29sIENlcnRpZmljYXRlIFwoU1NDXCkgfCAyMDIyIHwgR1BBOiA5LjIpIFRqIEVUCkJUIC9GMiAxMiBUZiAwIDAgMCByZyA0MCA1NDIgVGQgKFRFQ0hOSUNBTCBTS0lMTFMpIFRqIEVUCkJUIC9GMSAxMCBUZiAwIDAgMCByZyA0MCA1MjcgVGQgKExhbmd1YWdlcyAmIENvcmU6IFB5dGhvbiBcKFBhbmRhcywgTnVtUHlcKSwgSmF2YSBcKE9PUCwgRGF0YSBTdHJ1Y3R1cmVzXCksIFNRTCkgVGogRVQKQlQgL0YxIDEwIFRmIDAgMCAwIHJnIDQwIDUxNCBUZCAoQnVzaW5lc3MgSW50ZWxsaWdlbmNlICYgVml6OiBUYWJsZWF1IERlc2t0b3AsIEludGVyYWN0aXZlIERhc2hib2FyZHMsIERhdGEgVmlzdWFsaXphdGlvbikgVGogRVQKQlQgL0YxIDEwIFRmIDAgMCAwIHJnIDQwIDUwMSBUZCAoRGF0YSBTY2llbmNlICYgQ29uY2VwdHM6IERhdGEgUHJlcHJvY2Vzc2luZywgRGF0YSBDbGVhbmluZywgRXhwbG9yYXRvcnkgQW5hbHlzaXMsIFByb2JsZW0gU29sdmluZykgVGogRVQKQlQgL0YyIDEyIFRmIDAgMCAwIHJnIDQwIDQ3MyBUZCAoUFJPSkVDVFMpIFRqIEVUCkJUIC9GMiAxMSBUZiAwIDAgMCByZyA0MCA0NTggVGQgKFN0dWR5TWF0ZSAtIEludGVsbGlnZW50IENvbGxhYm9yYXRpdmUgU3R1ZHkgUGxhdGZvcm0pIFRqIEVUCkJUIC9GMSAxMCBUZiAwIDAgMCByZyA0MCA0NDUgVGQgKERlc2lnbmVkIGEgY29sbGFib3JhdGl2ZSBwbGF0Zm9ybSBmb3Igc3R1ZGVudHMgdG8gdHJhY2sgc3R1ZHkgc2Vzc2lvbnMgYW5kIG9wdGltaXplIHBlZXIgbGVhcm5pbmcuKSBUaiBFVApCVCAvRjEgOSBUZiAwIDAgMCByZyA0MCA0MzMgVGQgKFRlY2hub2xvZ2llczogUHl0aG9uLCBEYXRhIEFuYWx5dGljcywgUmVhY3QsIFRhaWx3aW5kIENTUywgRGF0YWJhc2UgRGVzaWduKSBUaiBFVApCVCAvRjIgMTEgVGYgMCAwIDAgcmcgNDAgNDE1IFRkIChUUklDSVRZIC0gVXJiYW4gQW5hbHl0aWNzICYgQ2l2aWMgRGF0YSBWaXN1YWxpemF0aW9uKSBUaiBFVApCVCAvRjEgMTAgVGYgMCAwIDAgcmcgNDAgNDAyIFRkIChDaXZpYyBhbmFseXRpY3MgcGxhdGZvcm0gdmlzdWFsaXppbmcgbXVuaWNpcGFsIG1ldHJpY3MsIGdlb3NwYXRpYWwgbWFwcGluZywgYW5kIGNpdGl6ZW4gcmVwb3J0aW5nLikgVGogRVQKQlQgL0YxIDkgVGYgMCAwIDAgcmcgNDAgMzkwIFRkIChUZWNobm9sb2dpZXM6IFB5dGhvbiwgQ2l2aWMgQW5hbHl0aWNzLCBEYXRhIFZpc3VhbGl6YXRpb24sIFJFU1QgQVBJcywgR0lTIE1hcHBpbmcpIFRqIEVUCkJUIC9GMiAxMiBUZiAwIDAgMCByZyA0MCAzNjIgVGQgKElOVEVSTlNISVAgRVhQRVJJRU5DRSkgVGogRVQKQlQgL0YyIDExIFRmIDAgMCAwIHJnIDQwIDM0NyBUZCAoSmF2YSBQcm9ncmFtbWluZyBJbnRlcm4gLSBJbnRlcm5QZSBcKDYgV2Vla3MsIDIwMjZcKSkgVGogRVQKQlQgL0YxIDEwIFRmIDAgMCAwIHJnIDQwIDMzNCBUZCAoLSBJbXBsZW1lbnRlZCBtb2R1bGFyIEphdmEgY29tcG9uZW50cyBhZGhlcmluZyB0byBvYmplY3Qtb3JpZW50ZWQgcHJvZ3JhbW1pbmcgcHJpbmNpcGxlcy4pIFRqIEVUCkJUIC9GMSAxMCBUZiAwIDAgMCByZyA0MCAzMjEgVGQgKC0gRGV2ZWxvcGVkIGFsZ29yaXRobXMgZm9yIGVmZmljaWVudCBkYXRhIHN0cnVjdHVyZXMsIGRlYnVnZ2luZywgYW5kIHNvZnR3YXJlIHRlc3RpbmcgcHJhY3RpY2VzLikgVGogRVQKQlQgL0YyIDEyIFRmIDAgMCAwIHJnIDQwIDI5MyBUZCAoQ0VSVElGSUNBVElPTlMgJiBTRU1JTkFSUykgVGogRVQKQlQgL0YyIDEwIFRmIDAgMCAwIHJnIDQwIDI3OCBUZCAoSGVkZXJhIENlcnRpZmllZCBGb3VuZGF0aW9uIFwoSENGXCkgLSBIZWRlcmEgXCgyMDI0XCkpIFRqIEVUCkJUIC9GMiAxMCBUZiAwIDAgMCByZyA0MCAyNjMgVGQgKENyZWRpdCBDYXJkIEZyYXVkIERldGVjdGlvbiAtIEFjYWRlbWljIFJlc2VhcmNoIFNlbWluYXIsIEtJVFNXIFwoMjAyNlwpKSBUaiBFVApCVCAvRjEgOSBUZiAwIDAgMCByZyA0MCAyNTAgVGQgKEV4cGxvcmVkIE1MIHRlY2huaXF1ZXMgXChTTU9URSwgWEdCb29zdCwgUFItQVVDXCkgZm9yIGhpZ2hseSBza2V3ZWQgZmluYW5jaWFsIHRyYW5zYWN0aW9uIHN0cmVhbXMuKSBUaiBFVAplbmRzdHJlYW0KZW5kb2JqCjUgMCBvYmoKPDwgL1R5cGUgL0ZvbnQgL1N1YnR5cGUgL1R5cGUxIC9CYXNlRm9udCAvSGVsdmV0aWNhID4+CmVuZG9iago2IDAgb2JqCjw8IC9UeXBlIC9Gb250IC9TdWJ0eXBlIC9UeXBlMSAvQmFzZUZvbnQgL0hlbHZldGljYS1Cb2xkID4+CmVuZG9iagp4cmVmCjAgNwowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMDkgMDAwMDAgbiAKMDAwMDAwMDA1OCAwMDAwMCBuIAowMDAwMDAwMTE1IDAwMDAwIG4gCjAwMDAwMDAyNTEgMDAwMDAgbiAKMDAwMDAwMzc4NyAwMDAwMCBuIAowMDAwMDAzODU3IDAwMDAwIG4gCnRyYWlsZXIKPDwgL1NpemUgNyAvUm9vdCAxIDAgUiA+PgpzdGFydHhyZWYKMzkzMgolJUVPRgo=";

// src/data/initialData.js
var initialProfile = {
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
  avatarUrl: "",
  // Defaults to clean minimalist SVG avatar if empty
  resumeUrl: defaultResumePdfBase64,
  // Actual Pittala Manogna Resume PDF
  resumeFileName: "Pittala_Manogna_Resume.pdf",
  resumeUpdatedAt: "2026-11-04"
};
var initialEducation = [
  {
    id: "edu-1",
    degree: "B.Tech \u2013 Data Science",
    institution: "Kakatiya Institute of Technology and Science (KITSW), Warangal",
    period: "2024\u2013Present",
    score: "CGPA: 8.8",
    description: "Focusing on Core Data Science, Python programming, Machine Learning, Database Management Systems, and Statistical Data Analysis.",
    order: 1
  },
  {
    id: "edu-2",
    degree: "Intermediate \u2013 MPC",
    institution: "TSRJC CET Girls, Nirmal",
    period: "2022\u20132024",
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
var initialSkills = [
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
var initialProjects = [
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
var initialCertifications = [
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
var initialInternships = [
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
var initialServices = [
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
var initialSeminar = {
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
var initialMessages = [
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

// src/supabaseClient.js
var STORAGE_KEY_CONFIG = "manogna_portfolio_supabase_config";
var STORAGE_KEY_DATA = "manogna_portfolio_data_v1";
var STORAGE_KEY_AUTH = "manogna_portfolio_auth_user";
var DEFAULT_ADMIN = {
  email: "manogna2902@gmail.com",
  password: "AdminPassword@2026",
  name: "Pittala Manogna (Admin)",
  role: "admin"
};
function getSupabaseConfig() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.url && parsed.anonKey) return parsed;
    }
  } catch (e) {
    console.warn("Error reading Supabase config from localStorage:", e);
  }
  const envUrl = typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_URL;
  const envKey = typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_ANON_KEY;
  if (envUrl && envKey && !envUrl.includes("your-project")) {
    return { url: envUrl, anonKey: envKey };
  }
  return { url: "", anonKey: "" };
}
var supabaseInstance = null;
function getSupabaseClient() {
  const config = getSupabaseConfig();
  if (config.url && config.anonKey) {
    if (!supabaseInstance || supabaseInstance.supabaseUrl !== config.url) {
      try {
        supabaseInstance = createClient(config.url, config.anonKey, {
          auth: {
            persistSession: true,
            autoRefreshToken: true
          }
        });
      } catch (err) {
        console.error("Failed to initialize Supabase client:", err);
        supabaseInstance = null;
      }
    }
    return supabaseInstance;
  }
  return null;
}
function isSupabaseConfigured() {
  const config = getSupabaseConfig();
  return Boolean(config.url && config.anonKey);
}
function saveSupabaseConfig(url, anonKey) {
  const config = { url: url.trim(), anonKey: anonKey.trim() };
  localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
  supabaseInstance = null;
  return getSupabaseClient();
}
async function testSupabaseConnection(url, anonKey) {
  try {
    const testClient = createClient(url, anonKey);
    const { data, error } = await testClient.from("profiles").select("name").limit(1);
    if (error && error.code !== "PGRST116") {
      if (error.message.includes('relation "public.profiles" does not exist')) {
        return { success: true, message: "Connected to Supabase! (Tables need to be created using schema.sql)" };
      }
      return { success: false, message: error.message };
    }
    return { success: true, message: "Connected successfully to Supabase database!" };
  } catch (err) {
    return { success: false, message: err.message || "Connection failed" };
  }
}
function getLocalPortfolioData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_DATA);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (!parsed.profile?.resumeUrl || parsed.profile.resumeUrl === "") {
        parsed.profile = {
          ...parsed.profile,
          resumeUrl: initialProfile.resumeUrl || "Pittala_Manogna_Resume.pdf",
          resumeFileName: "Pittala_Manogna_Resume.pdf"
        };
        saveLocalPortfolioData(parsed);
      }
      return parsed;
    }
  } catch (e) {
    console.error("Error reading local portfolio data:", e);
  }
  const defaultData = {
    profile: initialProfile,
    education: initialEducation,
    skills: initialSkills,
    projects: initialProjects,
    certifications: initialCertifications,
    internships: initialInternships,
    services: initialServices,
    seminar: initialSeminar,
    messages: initialMessages
  };
  saveLocalPortfolioData(defaultData);
  return defaultData;
}
function saveLocalPortfolioData(data) {
  try {
    localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(data));
  } catch (e) {
    console.error("Error saving local portfolio data:", e);
  }
}
async function fetchAllPortfolioData() {
  const local = getLocalPortfolioData();
  const client = getSupabaseClient();
  if (!client) {
    return { data: local, source: "local" };
  }
  try {
    const [
      profileRes,
      eduRes,
      skillsRes,
      projectsRes,
      certsRes,
      internRes,
      servicesRes,
      seminarRes,
      messagesRes
    ] = await Promise.all([
      client.from("profiles").select("*").limit(1).maybeSingle(),
      client.from("education").select("*").order("sort_order", { ascending: true }),
      client.from("skills").select("*").order("sort_order", { ascending: true }),
      client.from("projects").select("*").order("sort_order", { ascending: true }),
      client.from("certifications").select("*").order("created_at", { ascending: false }),
      client.from("internships").select("*").order("created_at", { ascending: false }),
      client.from("services").select("*").order("sort_order", { ascending: true }),
      client.from("seminars").select("*").limit(1).maybeSingle(),
      client.from("messages").select("*").order("created_at", { ascending: false })
    ]);
    const remoteData = {
      profile: profileRes.data ? {
        name: profileRes.data.name,
        title: profileRes.data.title,
        tagline: profileRes.data.tagline || local.profile.tagline,
        location: profileRes.data.location || local.profile.location,
        email: profileRes.data.email,
        phone: profileRes.data.phone,
        linkedin: profileRes.data.linkedin,
        github: profileRes.data.github,
        bio: profileRes.data.bio,
        interests: profileRes.data.interests || local.profile.interests,
        avatarUrl: profileRes.data.avatar_url || "",
        resumeUrl: profileRes.data.resume_url || "",
        resumeFileName: profileRes.data.resume_file_name || "Pittala_Manogna_Resume.pdf",
        resumeUpdatedAt: profileRes.data.resume_updated_at || local.profile.resumeUpdatedAt
      } : local.profile,
      education: eduRes.data && eduRes.data.length > 0 ? eduRes.data.map((e) => ({
        id: e.id,
        degree: e.degree,
        institution: e.institution,
        period: e.period,
        score: e.score,
        description: e.description,
        order: e.sort_order
      })) : local.education,
      skills: skillsRes.data && skillsRes.data.length > 0 ? skillsRes.data.map((s) => ({
        id: s.id,
        name: s.name,
        category: s.category,
        icon: s.icon,
        description: s.description
      })) : local.skills,
      projects: projectsRes.data && projectsRes.data.length > 0 ? projectsRes.data.map((p) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        technologies: p.technologies || [],
        githubUrl: p.github_url,
        liveUrl: p.live_url,
        imageUrl: p.image_url,
        featured: p.featured,
        order: p.sort_order
      })) : local.projects,
      certifications: certsRes.data && certsRes.data.length > 0 ? certsRes.data.map((c) => ({
        id: c.id,
        title: c.title,
        issuer: c.issuer,
        issueDate: c.issue_date,
        credentialUrl: c.credential_url,
        fileUrl: c.file_url,
        description: c.description
      })) : local.certifications,
      internships: internRes.data && internRes.data.length > 0 ? internRes.data.map((i) => ({
        id: i.id,
        role: i.role,
        company: i.company,
        duration: i.duration,
        period: i.period,
        description: i.description,
        highlights: i.highlights || []
      })) : local.internships,
      services: servicesRes.data && servicesRes.data.length > 0 ? servicesRes.data.map((s) => ({
        id: s.id,
        title: s.title,
        description: s.description,
        icon: s.icon
      })) : local.services,
      seminar: seminarRes.data ? {
        id: seminarRes.data.id,
        title: seminarRes.data.title,
        type: seminarRes.data.seminar_type,
        institution: seminarRes.data.institution,
        description: seminarRes.data.description,
        extendedNotes: seminarRes.data.extended_notes,
        keyTakeaways: seminarRes.data.key_takeaways || []
      } : local.seminar,
      messages: messagesRes.data && messagesRes.data.length > 0 ? messagesRes.data.map((m) => ({
        id: m.id,
        name: m.name,
        email: m.email,
        subject: m.subject,
        message: m.message,
        timestamp: m.created_at,
        read: m.is_read
      })) : local.messages
    };
    saveLocalPortfolioData(remoteData);
    return { data: remoteData, source: "supabase" };
  } catch (err) {
    console.warn("Failed to fetch from Supabase, falling back to local data:", err);
    return { data: local, source: "local" };
  }
}
async function uploadAsset(bucketName, file, customName) {
  const client = getSupabaseClient();
  const fileName = `${Date.now()}-${customName || file.name.replace(/\s+/g, "_")}`;
  if (client) {
    try {
      const { data, error } = await client.storage.from(bucketName).upload(fileName, file, { cacheControl: "3600", upsert: true });
      if (!error && data) {
        const { data: publicUrlData } = client.storage.from(bucketName).getPublicUrl(fileName);
        return { success: true, url: publicUrlData.publicUrl, fileName };
      }
    } catch (e) {
      console.warn("Supabase storage upload failed, falling back to local Base64:", e);
    }
  }
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({ success: true, url: reader.result, fileName: file.name });
    };
    reader.onerror = () => {
      resolve({ success: false, error: "Could not read file" });
    };
    reader.readAsDataURL(file);
  });
}
async function submitContactMessage(messageData) {
  const client = getSupabaseClient();
  const newMsg = {
    id: `msg-${Date.now()}`,
    name: messageData.name.trim(),
    email: messageData.email.trim(),
    subject: messageData.subject.trim(),
    message: messageData.message.trim(),
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    read: false
  };
  const local = getLocalPortfolioData();
  const updatedMessages = [newMsg, ...local.messages || []];
  saveLocalPortfolioData({ ...local, messages: updatedMessages });
  if (client) {
    try {
      await client.from("messages").insert([{
        name: newMsg.name,
        email: newMsg.email,
        subject: newMsg.subject,
        message: newMsg.message,
        is_read: false
      }]);
    } catch (err) {
      console.warn("Could not insert message into Supabase:", err);
    }
  }
  return { success: true, message: newMsg };
}
function getStoredAuthUser() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_AUTH);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.error("Error reading auth user:", e);
  }
  return null;
}
function setStoredAuthUser(user) {
  if (user) {
    localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEY_AUTH);
  }
}
async function loginAdmin(email, password) {
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client.auth.signInWithPassword({
        email: email.trim(),
        password
      });
      if (!error && data?.user) {
        const user = {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.name || "Administrator",
          role: "admin",
          source: "supabase"
        };
        setStoredAuthUser(user);
        return { success: true, user };
      }
    } catch (e) {
      console.warn("Supabase auth attempt failed, testing local admin fallback:", e);
    }
  }
  if ((email.trim().toLowerCase() === DEFAULT_ADMIN.email.toLowerCase() || email.trim().toLowerCase() === "admin@pittalaspaces.com") && password === DEFAULT_ADMIN.password) {
    const user = {
      id: "local-admin-1",
      email: email.trim(),
      name: DEFAULT_ADMIN.name,
      role: "admin",
      source: "local"
    };
    setStoredAuthUser(user);
    return { success: true, user };
  }
  return {
    success: false,
    error: "Invalid email or password. Default admin: manogna2902@gmail.com / AdminPassword@2026"
  };
}
async function logoutAdmin() {
  const client = getSupabaseClient();
  if (client) {
    try {
      await client.auth.signOut();
    } catch (e) {
      console.warn("Supabase sign out error:", e);
    }
  }
  setStoredAuthUser(null);
  return { success: true };
}

// src/context/AuthContext.jsx
var AuthContext = createContext(null);
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const existing = getStoredAuthUser();
    if (existing) {
      setUser(existing);
    }
    setLoading(false);
  }, []);
  const login = async (email, password) => {
    setLoading(true);
    const result = await loginAdmin(email, password);
    if (result.success) {
      setUser(result.user);
    }
    setLoading(false);
    return result;
  };
  const logout = async () => {
    setLoading(true);
    await logoutAdmin();
    setUser(null);
    setLoading(false);
  };
  const value = {
    user,
    isAuthenticated: Boolean(user),
    loading,
    login,
    logout
  };
  return /* @__PURE__ */ React.createElement(AuthContext.Provider, { value }, children);
}
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// src/context/PortfolioContext.jsx
import React2, { createContext as createContext2, useContext as useContext2, useState as useState2, useEffect as useEffect2 } from "react";
var PortfolioContext = createContext2(null);
function PortfolioProvider({ children }) {
  const [data, setData] = useState2({
    profile: initialProfile,
    education: initialEducation,
    skills: initialSkills,
    projects: initialProjects,
    certifications: initialCertifications,
    internships: initialInternships,
    services: initialServices,
    seminar: initialSeminar,
    messages: initialMessages
  });
  const [loading, setLoading] = useState2(true);
  const [syncSource, setSyncSource] = useState2("local");
  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchAllPortfolioData();
      setData(res.data);
      setSyncSource(res.source);
    } catch (err) {
      console.error("Error loading portfolio data:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect2(() => {
    loadData();
  }, []);
  const updateSlice = async (sliceKey, updatedValue, supabaseTable, supabaseAction = null) => {
    const updatedAll = {
      ...data,
      [sliceKey]: updatedValue
    };
    setData(updatedAll);
    saveLocalPortfolioData(updatedAll);
    const client = getSupabaseClient();
    if (client && supabaseTable) {
      try {
        if (supabaseAction) {
          await supabaseAction(client);
        } else if (sliceKey === "profile") {
          await client.from("profiles").upsert([{
            name: updatedValue.name,
            title: updatedValue.title,
            tagline: updatedValue.tagline,
            location: updatedValue.location,
            email: updatedValue.email,
            phone: updatedValue.phone,
            linkedin: updatedValue.linkedin,
            github: updatedValue.github,
            bio: updatedValue.bio,
            interests: updatedValue.interests,
            avatar_url: updatedValue.avatarUrl,
            resume_url: updatedValue.resumeUrl,
            resume_file_name: updatedValue.resumeFileName,
            resume_updated_at: (/* @__PURE__ */ new Date()).toISOString()
          }]);
        } else if (sliceKey === "seminar") {
          await client.from("seminars").upsert([{
            title: updatedValue.title,
            seminar_type: updatedValue.type,
            institution: updatedValue.institution,
            description: updatedValue.description,
            extended_notes: updatedValue.extendedNotes,
            key_takeaways: updatedValue.keyTakeaways
          }]);
        }
      } catch (err) {
        console.warn(`Supabase sync failed for ${sliceKey}:`, err);
      }
    }
  };
  const updateProfile = async (newProfile) => {
    await updateSlice("profile", newProfile, "profiles");
  };
  const addEducation = async (item) => {
    const newItem = {
      ...item,
      id: item.id || `edu-${Date.now()}`
    };
    const updated = [...data.education, newItem];
    await updateSlice("education", updated, "education", async (client) => {
      await client.from("education").insert([{
        degree: newItem.degree,
        institution: newItem.institution,
        period: newItem.period,
        score: newItem.score,
        description: newItem.description,
        sort_order: updated.length
      }]);
    });
  };
  const updateEducation = async (id, updatedFields) => {
    const updated = data.education.map((item) => item.id === id ? { ...item, ...updatedFields } : item);
    await updateSlice("education", updated, "education", async (client) => {
      await client.from("education").update({
        degree: updatedFields.degree,
        institution: updatedFields.institution,
        period: updatedFields.period,
        score: updatedFields.score,
        description: updatedFields.description
      }).eq("id", id);
    });
  };
  const deleteEducation = async (id) => {
    const updated = data.education.filter((item) => item.id !== id);
    await updateSlice("education", updated, "education", async (client) => {
      await client.from("education").delete().eq("id", id);
    });
  };
  const addSkill = async (item) => {
    const newItem = {
      ...item,
      id: item.id || `skill-${Date.now()}`
    };
    const updated = [...data.skills, newItem];
    await updateSlice("skills", updated, "skills", async (client) => {
      await client.from("skills").insert([{
        name: newItem.name,
        category: newItem.category,
        icon: newItem.icon,
        description: newItem.description,
        sort_order: updated.length
      }]);
    });
  };
  const updateSkill = async (id, updatedFields) => {
    const updated = data.skills.map((item) => item.id === id ? { ...item, ...updatedFields } : item);
    await updateSlice("skills", updated, "skills", async (client) => {
      await client.from("skills").update({
        name: updatedFields.name,
        category: updatedFields.category,
        icon: updatedFields.icon,
        description: updatedFields.description
      }).eq("id", id);
    });
  };
  const deleteSkill = async (id) => {
    const updated = data.skills.filter((item) => item.id !== id);
    await updateSlice("skills", updated, "skills", async (client) => {
      await client.from("skills").delete().eq("id", id);
    });
  };
  const addProject = async (item) => {
    const newItem = {
      ...item,
      id: item.id || `proj-${Date.now()}`
    };
    const updated = [...data.projects, newItem];
    await updateSlice("projects", updated, "projects", async (client) => {
      await client.from("projects").insert([{
        title: newItem.title,
        description: newItem.description,
        technologies: newItem.technologies || [],
        github_url: newItem.githubUrl,
        live_url: newItem.liveUrl,
        image_url: newItem.imageUrl,
        featured: newItem.featured ?? true,
        sort_order: updated.length
      }]);
    });
  };
  const updateProject = async (id, updatedFields) => {
    const updated = data.projects.map((item) => item.id === id ? { ...item, ...updatedFields } : item);
    await updateSlice("projects", updated, "projects", async (client) => {
      await client.from("projects").update({
        title: updatedFields.title,
        description: updatedFields.description,
        technologies: updatedFields.technologies,
        github_url: updatedFields.githubUrl,
        live_url: updatedFields.liveUrl,
        image_url: updatedFields.imageUrl,
        featured: updatedFields.featured
      }).eq("id", id);
    });
  };
  const deleteProject = async (id) => {
    const updated = data.projects.filter((item) => item.id !== id);
    await updateSlice("projects", updated, "projects", async (client) => {
      await client.from("projects").delete().eq("id", id);
    });
  };
  const addCertification = async (item) => {
    const newItem = {
      ...item,
      id: item.id || `cert-${Date.now()}`
    };
    const updated = [...data.certifications, newItem];
    await updateSlice("certifications", updated, "certifications", async (client) => {
      await client.from("certifications").insert([{
        title: newItem.title,
        issuer: newItem.issuer,
        issue_date: newItem.issueDate,
        credential_url: newItem.credentialUrl,
        file_url: newItem.fileUrl,
        description: newItem.description
      }]);
    });
  };
  const updateCertification = async (id, updatedFields) => {
    const updated = data.certifications.map((item) => item.id === id ? { ...item, ...updatedFields } : item);
    await updateSlice("certifications", updated, "certifications", async (client) => {
      await client.from("certifications").update({
        title: updatedFields.title,
        issuer: updatedFields.issuer,
        issue_date: updatedFields.issueDate,
        credential_url: updatedFields.credentialUrl,
        file_url: updatedFields.fileUrl,
        description: updatedFields.description
      }).eq("id", id);
    });
  };
  const deleteCertification = async (id) => {
    const updated = data.certifications.filter((item) => item.id !== id);
    await updateSlice("certifications", updated, "certifications", async (client) => {
      await client.from("certifications").delete().eq("id", id);
    });
  };
  const addInternship = async (item) => {
    const newItem = {
      ...item,
      id: item.id || `intern-${Date.now()}`
    };
    const updated = [...data.internships, newItem];
    await updateSlice("internships", updated, "internships", async (client) => {
      await client.from("internships").insert([{
        role: newItem.role,
        company: newItem.company,
        duration: newItem.duration,
        period: newItem.period,
        description: newItem.description,
        highlights: newItem.highlights || []
      }]);
    });
  };
  const updateInternship = async (id, updatedFields) => {
    const updated = data.internships.map((item) => item.id === id ? { ...item, ...updatedFields } : item);
    await updateSlice("internships", updated, "internships", async (client) => {
      await client.from("internships").update({
        role: updatedFields.role,
        company: updatedFields.company,
        duration: updatedFields.duration,
        period: updatedFields.period,
        description: updatedFields.description,
        highlights: updatedFields.highlights
      }).eq("id", id);
    });
  };
  const deleteInternship = async (id) => {
    const updated = data.internships.filter((item) => item.id !== id);
    await updateSlice("internships", updated, "internships", async (client) => {
      await client.from("internships").delete().eq("id", id);
    });
  };
  const addService = async (item) => {
    const newItem = {
      ...item,
      id: item.id || `serv-${Date.now()}`
    };
    const updated = [...data.services, newItem];
    await updateSlice("services", updated, "services", async (client) => {
      await client.from("services").insert([{
        title: newItem.title,
        description: newItem.description,
        icon: newItem.icon,
        sort_order: updated.length
      }]);
    });
  };
  const updateService = async (id, updatedFields) => {
    const updated = data.services.map((item) => item.id === id ? { ...item, ...updatedFields } : item);
    await updateSlice("services", updated, "services", async (client) => {
      await client.from("services").update({
        title: updatedFields.title,
        description: updatedFields.description,
        icon: updatedFields.icon
      }).eq("id", id);
    });
  };
  const deleteService = async (id) => {
    const updated = data.services.filter((item) => item.id !== id);
    await updateSlice("services", updated, "services", async (client) => {
      await client.from("services").delete().eq("id", id);
    });
  };
  const updateSeminar = async (newSeminar) => {
    await updateSlice("seminar", newSeminar, "seminars");
  };
  const markMessageRead = async (id) => {
    const updated = (data.messages || []).map((m) => m.id === id ? { ...m, read: true } : m);
    await updateSlice("messages", updated, "messages", async (client) => {
      await client.from("messages").update({ is_read: true }).eq("id", id);
    });
  };
  const deleteMessage = async (id) => {
    const updated = (data.messages || []).filter((m) => m.id !== id);
    await updateSlice("messages", updated, "messages", async (client) => {
      await client.from("messages").delete().eq("id", id);
    });
  };
  const resetToDefaultData = () => {
    const defaultData = {
      profile: initialProfile,
      education: initialEducation,
      skills: initialSkills,
      projects: initialProjects,
      certifications: initialCertifications,
      internships: initialInternships,
      services: initialServices,
      seminar: initialSeminar,
      messages: initialMessages
    };
    setData(defaultData);
    saveLocalPortfolioData(defaultData);
  };
  const value = {
    ...data,
    loading,
    syncSource,
    reloadPortfolioData: loadData,
    resetToDefaultData,
    updateProfile,
    addEducation,
    updateEducation,
    deleteEducation,
    addSkill,
    updateSkill,
    deleteSkill,
    addProject,
    updateProject,
    deleteProject,
    addCertification,
    updateCertification,
    deleteCertification,
    addInternship,
    updateInternship,
    deleteInternship,
    addService,
    updateService,
    deleteService,
    updateSeminar,
    markMessageRead,
    deleteMessage
  };
  return /* @__PURE__ */ React2.createElement(PortfolioContext.Provider, { value }, children);
}
function usePortfolio() {
  const context = useContext2(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}

// src/components/Navbar.jsx
import React3, { useState as useState3, useEffect as useEffect3 } from "react";

// src/utils/downloadHelper.js
async function downloadResumePdf(resumeUrl, fileName = "Pittala_Manogna_Resume.pdf", onMessage = null) {
  const targetFileName = fileName || "Pittala_Manogna_Resume.pdf";
  if (!resumeUrl || resumeUrl.trim() === "") {
    const errorMsg = "No resume PDF is currently available to download. Please upload one via the Admin Dashboard.";
    if (typeof onMessage === "function") {
      onMessage(errorMsg, "info");
    } else {
      alert(errorMsg);
    }
    return false;
  }
  try {
    if (resumeUrl.startsWith("data:")) {
      const link2 = document.createElement("a");
      link2.href = resumeUrl;
      link2.download = targetFileName;
      link2.target = "_self";
      link2.style.display = "none";
      document.body.appendChild(link2);
      link2.click();
      setTimeout(() => {
        if (document.body.contains(link2)) {
          document.body.removeChild(link2);
        }
      }, 250);
      if (typeof onMessage === "function") {
        onMessage(`Downloading ${targetFileName}...`, "success");
      }
      return true;
    }
    try {
      const res = await fetch(resumeUrl, { mode: "cors" });
      if (res.ok) {
        const blob = await res.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const link2 = document.createElement("a");
        link2.href = blobUrl;
        link2.download = targetFileName;
        link2.target = "_self";
        link2.style.display = "none";
        document.body.appendChild(link2);
        link2.click();
        setTimeout(() => {
          window.URL.revokeObjectURL(blobUrl);
          if (document.body.contains(link2)) {
            document.body.removeChild(link2);
          }
        }, 600);
        if (typeof onMessage === "function") {
          onMessage(`Downloading ${targetFileName}...`, "success");
        }
        return true;
      }
    } catch (fetchErr) {
      console.warn("Blob fetch failed (likely cross-origin), falling back to anchor download:", fetchErr);
    }
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = targetFileName;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
    }, 250);
    if (typeof onMessage === "function") {
      onMessage(`Opening ${targetFileName}...`, "success");
    }
    return true;
  } catch (err) {
    console.error("Download resume error:", err);
    if (typeof onMessage === "function") {
      onMessage("Failed to download resume. Opening in a new window instead.", "error");
    }
    window.open(resumeUrl, "_blank");
    return false;
  }
}

// src/components/Navbar.jsx
function Navbar({ onNavigateAdmin, onShowToast }) {
  const { profile } = usePortfolio();
  const { isAuthenticated } = useAuth();
  const [scrolled, setScrolled] = useState3(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState3(false);
  useEffect3(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Education", href: "#education" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Services", href: "#services" },
    { name: "Seminar", href: "#seminar" },
    { name: "Contact", href: "#contact" }
  ];
  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };
  const handleResumeDownload = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setMobileMenuOpen(false);
    const resumeSource = profile.resumeUrl || "Pittala_Manogna_Resume.pdf";
    const resumeName = profile.resumeFileName || "Pittala_Manogna_Resume.pdf";
    downloadResumePdf(resumeSource, resumeName, onShowToast);
  };
  return /* @__PURE__ */ React3.createElement("nav", { className: `fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md border-b border-[#E5E5E5] py-3.5 shadow-sm" : "bg-white/80 backdrop-blur-sm py-5"}` }, /* @__PURE__ */ React3.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, /* @__PURE__ */ React3.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React3.createElement(
    "a",
    {
      href: "#",
      onClick: (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
      className: "flex items-center gap-2 group"
    },
    /* @__PURE__ */ React3.createElement("span", { className: "w-8 h-8 rounded-lg bg-[#111111] text-white flex items-center justify-center font-bold text-sm tracking-wider group-hover:scale-105 transition-transform" }, "PM"),
    /* @__PURE__ */ React3.createElement("span", { className: "text-base font-semibold text-[#111111] tracking-tight group-hover:text-black transition-colors" }, profile.name || "Pittala Manogna")
  ), /* @__PURE__ */ React3.createElement("div", { className: "hidden lg:flex items-center gap-7" }, navLinks.map((link) => /* @__PURE__ */ React3.createElement(
    "a",
    {
      key: link.name,
      href: link.href,
      onClick: (e) => handleLinkClick(e, link.href),
      className: "text-xs uppercase tracking-wider font-medium text-[#666666] hover:text-[#111111] transition-colors"
    },
    link.name
  ))), /* @__PURE__ */ React3.createElement("div", { className: "hidden md:flex items-center gap-3" }, /* @__PURE__ */ React3.createElement(
    "a",
    {
      href: profile.resumeUrl || "Pittala_Manogna_Resume.pdf",
      download: profile.resumeFileName || "Pittala_Manogna_Resume.pdf",
      onClick: handleResumeDownload,
      role: "button",
      className: "inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#111111] bg-white border border-[#E5E5E5] rounded-md hover:border-[#111111] hover:bg-[#F3F3F3] transition-all cursor-pointer shadow-sm"
    },
    /* @__PURE__ */ React3.createElement("svg", { className: "w-3.5 h-3.5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React3.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" })),
    "Resume"
  ), /* @__PURE__ */ React3.createElement(
    "button",
    {
      onClick: onNavigateAdmin,
      className: "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#666666] hover:text-[#111111] transition-colors",
      title: isAuthenticated ? "Open Admin Dashboard" : "Admin Login"
    },
    /* @__PURE__ */ React3.createElement("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React3.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" })),
    isAuthenticated ? "Dashboard" : "Admin"
  )), /* @__PURE__ */ React3.createElement("div", { className: "flex items-center gap-2 lg:hidden" }, /* @__PURE__ */ React3.createElement(
    "button",
    {
      onClick: () => setMobileMenuOpen(!mobileMenuOpen),
      className: "p-2 rounded-md text-[#111111] hover:bg-[#F3F3F3] focus:outline-none",
      "aria-label": "Toggle Menu"
    },
    mobileMenuOpen ? /* @__PURE__ */ React3.createElement("svg", { className: "w-6 h-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React3.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" })) : /* @__PURE__ */ React3.createElement("svg", { className: "w-6 h-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React3.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 6h16M4 12h16M4 18h16" }))
  )))), mobileMenuOpen && /* @__PURE__ */ React3.createElement("div", { className: "lg:hidden bg-white border-b border-[#E5E5E5] px-4 pt-3 pb-6 animate-fade-in shadow-xl" }, /* @__PURE__ */ React3.createElement("div", { className: "flex flex-col gap-3" }, navLinks.map((link) => /* @__PURE__ */ React3.createElement(
    "a",
    {
      key: link.name,
      href: link.href,
      onClick: (e) => handleLinkClick(e, link.href),
      className: "py-2 text-sm font-medium text-[#333333] hover:text-[#111111] border-b border-neutral-100"
    },
    link.name
  )), /* @__PURE__ */ React3.createElement("div", { className: "pt-3 flex flex-col gap-2" }, /* @__PURE__ */ React3.createElement(
    "a",
    {
      href: profile.resumeUrl || "Pittala_Manogna_Resume.pdf",
      download: profile.resumeFileName || "Pittala_Manogna_Resume.pdf",
      onClick: handleResumeDownload,
      role: "button",
      className: "w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#111111] bg-[#F3F3F3] rounded-md border border-[#E5E5E5] cursor-pointer"
    },
    /* @__PURE__ */ React3.createElement("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React3.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" })),
    "Download Resume"
  ), /* @__PURE__ */ React3.createElement(
    "button",
    {
      onClick: () => {
        setMobileMenuOpen(false);
        onNavigateAdmin();
      },
      className: "w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white bg-[#111111] rounded-md"
    },
    /* @__PURE__ */ React3.createElement("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React3.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" })),
    isAuthenticated ? "Admin Dashboard" : "Admin Login"
  )))));
}

// src/components/Hero.jsx
import React4 from "react";
function Hero({ onShowToast }) {
  const { profile } = usePortfolio();
  const handleResumeDownload = (e) => {
    e.preventDefault();
    const resumeSource = profile.resumeUrl || "Pittala_Manogna_Resume.pdf";
    const resumeName = profile.resumeFileName || "Pittala_Manogna_Resume.pdf";
    downloadResumePdf(resumeSource, resumeName, onShowToast);
  };
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };
  return /* @__PURE__ */ React4.createElement("section", { className: "relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-white border-b border-[#E5E5E5]" }, /* @__PURE__ */ React4.createElement("div", { className: "absolute inset-0 bg-grid-dots opacity-40 pointer-events-none" }), /* @__PURE__ */ React4.createElement("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, /* @__PURE__ */ React4.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center" }, /* @__PURE__ */ React4.createElement("div", { className: "lg:col-span-7 flex flex-col items-start" }, /* @__PURE__ */ React4.createElement("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F3F3] border border-[#E5E5E5] text-xs font-medium text-[#333333] mb-6" }, /* @__PURE__ */ React4.createElement("span", { className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse" }), /* @__PURE__ */ React4.createElement("span", null, "Available for Data Analyst Internships & Roles")), /* @__PURE__ */ React4.createElement("h1", { className: "text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#111111] leading-[1.15] mb-4" }, "Hi, I'm ", /* @__PURE__ */ React4.createElement("span", { className: "underline decoration-neutral-300 underline-offset-8" }, profile.name || "Pittala Manogna")), /* @__PURE__ */ React4.createElement("p", { className: "text-lg sm:text-xl font-medium text-[#111111] mb-2 tracking-tight" }, profile.title || "Data Science Student | Aspiring Data Analyst"), /* @__PURE__ */ React4.createElement("p", { className: "text-base sm:text-lg font-light text-[#666666] italic mb-6" }, '"', profile.tagline || "Turning Data into Meaningful Insights", '"'), /* @__PURE__ */ React4.createElement("p", { className: "text-sm sm:text-base text-[#444444] leading-relaxed max-w-2xl mb-8" }, "B.Tech Data Science student at KITSW, Warangal. Passionate about uncovering actionable patterns from complex datasets, designing intuitive Tableau dashboards, and building algorithmic data solutions."), /* @__PURE__ */ React4.createElement("div", { className: "flex flex-wrap items-center gap-3.5 mb-8 w-full sm:w-auto" }, /* @__PURE__ */ React4.createElement(
    "button",
    {
      onClick: () => scrollToSection("projects"),
      className: "w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] rounded-lg hover:bg-neutral-800 transition-all shadow-sm"
    },
    /* @__PURE__ */ React4.createElement("span", null, "View Projects"),
    /* @__PURE__ */ React4.createElement("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React4.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 14l-7 7m0 0l-7-7m7 7V3" }))
  ), /* @__PURE__ */ React4.createElement(
    "a",
    {
      href: profile.resumeUrl || "Pittala_Manogna_Resume.pdf",
      download: profile.resumeFileName || "Pittala_Manogna_Resume.pdf",
      onClick: handleResumeDownload,
      role: "button",
      className: "w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#111111] bg-white border border-[#E5E5E5] rounded-lg hover:border-[#111111] hover:bg-[#F3F3F3] transition-all cursor-pointer shadow-sm"
    },
    /* @__PURE__ */ React4.createElement("svg", { className: "w-4 h-4 text-[#111111]", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React4.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" })),
    /* @__PURE__ */ React4.createElement("span", null, "Download Resume")
  ), /* @__PURE__ */ React4.createElement(
    "button",
    {
      onClick: () => scrollToSection("contact"),
      className: "w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#666666] hover:text-[#111111] rounded-lg transition-colors"
    },
    /* @__PURE__ */ React4.createElement("span", null, "Contact Me"),
    /* @__PURE__ */ React4.createElement("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React4.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M14 5l7 7m0 0l-7 7m7-7H3" }))
  )), /* @__PURE__ */ React4.createElement("div", { className: "flex items-center gap-6 pt-4 border-t border-[#E5E5E5] w-full max-w-xl" }, /* @__PURE__ */ React4.createElement("span", { className: "text-xs text-[#666666] font-medium flex items-center gap-1.5" }, /* @__PURE__ */ React4.createElement("svg", { className: "w-4 h-4 text-neutral-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React4.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }), /* @__PURE__ */ React4.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" })), profile.location || "Warangal, Telangana, India"), /* @__PURE__ */ React4.createElement("div", { className: "h-4 w-[1px] bg-[#E5E5E5]" }), /* @__PURE__ */ React4.createElement("div", { className: "flex items-center gap-3" }, profile.linkedin && /* @__PURE__ */ React4.createElement(
    "a",
    {
      href: profile.linkedin,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "p-2 rounded-md text-[#666666] hover:text-[#111111] hover:bg-[#F3F3F3] transition-colors",
      "aria-label": "LinkedIn Profile"
    },
    /* @__PURE__ */ React4.createElement("svg", { className: "w-5 h-5 fill-current", viewBox: "0 0 24 24" }, /* @__PURE__ */ React4.createElement("path", { d: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" }))
  ), profile.github && /* @__PURE__ */ React4.createElement(
    "a",
    {
      href: profile.github,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "p-2 rounded-md text-[#666666] hover:text-[#111111] hover:bg-[#F3F3F3] transition-colors",
      "aria-label": "GitHub Profile"
    },
    /* @__PURE__ */ React4.createElement("svg", { className: "w-5 h-5 fill-current", viewBox: "0 0 24 24" }, /* @__PURE__ */ React4.createElement("path", { d: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" }))
  )))), /* @__PURE__ */ React4.createElement("div", { className: "lg:col-span-5 flex justify-center lg:justify-end" }, /* @__PURE__ */ React4.createElement("div", { className: "relative group" }, /* @__PURE__ */ React4.createElement("div", { className: "absolute -inset-2.5 rounded-2xl bg-neutral-100 border border-[#E5E5E5] -rotate-2 group-hover:rotate-0 transition-transform duration-300" }), /* @__PURE__ */ React4.createElement("div", { className: "relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden bg-[#F3F3F3] border-2 border-[#111111] shadow-lg flex items-center justify-center" }, profile.avatarUrl ? /* @__PURE__ */ React4.createElement(
    "img",
    {
      src: profile.avatarUrl,
      alt: profile.name,
      className: "w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
    }
  ) : /* @__PURE__ */ React4.createElement("div", { className: "flex flex-col items-center justify-center text-center p-6 text-[#111111]" }, /* @__PURE__ */ React4.createElement("div", { className: "w-24 h-24 rounded-full bg-[#111111] text-white flex items-center justify-center text-3xl font-bold mb-4 shadow-inner" }, "PM"), /* @__PURE__ */ React4.createElement("span", { className: "text-base font-semibold" }, profile.name), /* @__PURE__ */ React4.createElement("span", { className: "text-xs text-[#666666] mt-1" }, "Data Science \u2022 KITSW"))), /* @__PURE__ */ React4.createElement("div", { className: "absolute -bottom-4 -left-4 bg-white border border-[#E5E5E5] rounded-xl px-4 py-2.5 shadow-md flex items-center gap-3" }, /* @__PURE__ */ React4.createElement("div", { className: "w-8 h-8 rounded-lg bg-[#111111] text-white flex items-center justify-center" }, /* @__PURE__ */ React4.createElement("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React4.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" }))), /* @__PURE__ */ React4.createElement("div", null, /* @__PURE__ */ React4.createElement("p", { className: "text-[11px] uppercase tracking-wider text-[#666666] font-medium" }, "B.Tech CGPA"), /* @__PURE__ */ React4.createElement("p", { className: "text-sm font-bold text-[#111111]" }, "8.8 / 10"))))))));
}

// src/components/About.jsx
import React5 from "react";
function About() {
  const { profile } = usePortfolio();
  const interestsList = profile.interests && profile.interests.length > 0 ? profile.interests : [
    "Data Analytics",
    "Python",
    "Machine Learning",
    "Artificial Intelligence",
    "Data Visualization",
    "Problem Solving"
  ];
  return /* @__PURE__ */ React5.createElement("section", { id: "about", className: "py-24 bg-white border-b border-[#E5E5E5]" }, /* @__PURE__ */ React5.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, /* @__PURE__ */ React5.createElement("div", { className: "mb-16" }, /* @__PURE__ */ React5.createElement("p", { className: "text-xs uppercase tracking-widest text-[#666666] font-semibold mb-2" }, "01 / Profile Overview"), /* @__PURE__ */ React5.createElement("h2", { className: "text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight" }, "About Me"), /* @__PURE__ */ React5.createElement("div", { className: "w-12 h-1 bg-[#111111] mt-3" })), /* @__PURE__ */ React5.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start" }, /* @__PURE__ */ React5.createElement("div", { className: "lg:col-span-5 flex flex-col gap-6" }, /* @__PURE__ */ React5.createElement("div", { className: "p-8 rounded-2xl bg-[#F3F3F3] border border-[#E5E5E5]" }, /* @__PURE__ */ React5.createElement("div", { className: "flex items-center gap-4 mb-6" }, /* @__PURE__ */ React5.createElement("div", { className: "w-14 h-14 rounded-xl bg-[#111111] text-white flex items-center justify-center font-bold text-lg shadow-sm" }, profile.avatarUrl ? /* @__PURE__ */ React5.createElement("img", { src: profile.avatarUrl, alt: "PM", className: "w-full h-full rounded-xl object-cover" }) : "PM"), /* @__PURE__ */ React5.createElement("div", null, /* @__PURE__ */ React5.createElement("h3", { className: "text-lg font-bold text-[#111111]" }, profile.name), /* @__PURE__ */ React5.createElement("p", { className: "text-xs text-[#666666]" }, profile.title))), /* @__PURE__ */ React5.createElement("div", { className: "space-y-3.5 text-xs text-[#444444] border-t border-[#E5E5E5] pt-5" }, /* @__PURE__ */ React5.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React5.createElement("span", { className: "text-[#666666] uppercase tracking-wider font-medium" }, "Institution"), /* @__PURE__ */ React5.createElement("span", { className: "font-semibold text-[#111111]" }, "KITSW, Warangal")), /* @__PURE__ */ React5.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React5.createElement("span", { className: "text-[#666666] uppercase tracking-wider font-medium" }, "Discipline"), /* @__PURE__ */ React5.createElement("span", { className: "font-semibold text-[#111111]" }, "B.Tech Data Science")), /* @__PURE__ */ React5.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React5.createElement("span", { className: "text-[#666666] uppercase tracking-wider font-medium" }, "Location"), /* @__PURE__ */ React5.createElement("span", { className: "font-semibold text-[#111111]" }, profile.location)), /* @__PURE__ */ React5.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React5.createElement("span", { className: "text-[#666666] uppercase tracking-wider font-medium" }, "Email"), /* @__PURE__ */ React5.createElement("span", { className: "font-semibold text-[#111111]" }, profile.email)), /* @__PURE__ */ React5.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React5.createElement("span", { className: "text-[#666666] uppercase tracking-wider font-medium" }, "Phone"), /* @__PURE__ */ React5.createElement("span", { className: "font-semibold text-[#111111]" }, profile.phone)))), /* @__PURE__ */ React5.createElement("div", { className: "p-6 rounded-2xl bg-white border border-[#E5E5E5] shadow-sm" }, /* @__PURE__ */ React5.createElement("div", { className: "flex items-center gap-2 mb-3" }, /* @__PURE__ */ React5.createElement("svg", { className: "w-5 h-5 text-[#111111]", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React5.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M13 10V3L4 14h7v7l9-11h-7z" })), /* @__PURE__ */ React5.createElement("h4", { className: "text-xs uppercase tracking-wider font-bold text-[#111111]" }, "Career Objective")), /* @__PURE__ */ React5.createElement("p", { className: "text-sm text-[#444444] leading-relaxed" }, "To become a successful Data Analyst and transform raw data into meaningful insights that support better decision-making, while continuously sharpening technical, statistical, and analytical problem-solving skills."))), /* @__PURE__ */ React5.createElement("div", { className: "lg:col-span-7 flex flex-col justify-between h-full" }, /* @__PURE__ */ React5.createElement("div", null, /* @__PURE__ */ React5.createElement("h3", { className: "text-xl sm:text-2xl font-bold text-[#111111] mb-6 tracking-tight" }, "Passionate about turning complex patterns into strategic data intelligence."), /* @__PURE__ */ React5.createElement("div", { className: "prose prose-neutral text-sm sm:text-base text-[#444444] leading-relaxed space-y-4 mb-10" }, /* @__PURE__ */ React5.createElement("p", null, profile.bio), /* @__PURE__ */ React5.createElement("p", null, "As a data science undergraduate, I emphasize grounded mathematical foundations, reproducible Python workflows, and visual clarity through Tableau. My approach focuses on bridging exploratory data analysis with intuitive executive-level communication.")), /* @__PURE__ */ React5.createElement("div", null, /* @__PURE__ */ React5.createElement("h4", { className: "text-xs uppercase tracking-widest font-bold text-[#111111] mb-4" }, "Core Fields of Interest"), /* @__PURE__ */ React5.createElement("div", { className: "flex flex-wrap gap-2.5" }, interestsList.map((interest, idx) => /* @__PURE__ */ React5.createElement(
    "div",
    {
      key: idx,
      className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F3F3F3] border border-[#E5E5E5] text-xs font-semibold text-[#111111] hover:border-[#111111] transition-all"
    },
    /* @__PURE__ */ React5.createElement("span", { className: "w-1.5 h-1.5 rounded-full bg-[#111111]" }),
    /* @__PURE__ */ React5.createElement("span", null, interest)
  ))))), /* @__PURE__ */ React5.createElement("div", { className: "grid grid-cols-3 gap-4 pt-10 mt-10 border-t border-[#E5E5E5]" }, /* @__PURE__ */ React5.createElement("div", null, /* @__PURE__ */ React5.createElement("div", { className: "text-2xl sm:text-3xl font-extrabold text-[#111111]" }, "8.8"), /* @__PURE__ */ React5.createElement("div", { className: "text-xs text-[#666666] font-medium mt-1" }, "B.Tech CGPA")), /* @__PURE__ */ React5.createElement("div", null, /* @__PURE__ */ React5.createElement("div", { className: "text-2xl sm:text-3xl font-extrabold text-[#111111]" }, "96.9%"), /* @__PURE__ */ React5.createElement("div", { className: "text-xs text-[#666666] font-medium mt-1" }, "Intermediate Score")), /* @__PURE__ */ React5.createElement("div", null, /* @__PURE__ */ React5.createElement("div", { className: "text-2xl sm:text-3xl font-extrabold text-[#111111]" }, "6+"), /* @__PURE__ */ React5.createElement("div", { className: "text-xs text-[#666666] font-medium mt-1" }, "Core Tech Focus")))))));
}

// src/components/Education.jsx
import React6 from "react";
function Education() {
  const { education } = usePortfolio();
  const sortedEdu = [...education || []].sort((a, b) => (a.order || 0) - (b.order || 0));
  return /* @__PURE__ */ React6.createElement("section", { id: "education", className: "py-24 bg-[#F3F3F3] border-b border-[#E5E5E5]" }, /* @__PURE__ */ React6.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, /* @__PURE__ */ React6.createElement("div", { className: "mb-16" }, /* @__PURE__ */ React6.createElement("p", { className: "text-xs uppercase tracking-widest text-[#666666] font-semibold mb-2" }, "02 / Academic Journey"), /* @__PURE__ */ React6.createElement("h2", { className: "text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight" }, "Education"), /* @__PURE__ */ React6.createElement("div", { className: "w-12 h-1 bg-[#111111] mt-3" })), /* @__PURE__ */ React6.createElement("div", { className: "relative border-l-2 border-[#111111] ml-4 md:ml-8 pl-6 md:pl-10 space-y-12" }, sortedEdu.map((item, idx) => /* @__PURE__ */ React6.createElement("div", { key: item.id || idx, className: "relative group" }, /* @__PURE__ */ React6.createElement("div", { className: "absolute -left-[31px] md:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-white border-4 border-[#111111] group-hover:scale-125 transition-transform" }), /* @__PURE__ */ React6.createElement("div", { className: "bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E5E5] hover:border-[#111111] transition-all shadow-sm" }, /* @__PURE__ */ React6.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4" }, /* @__PURE__ */ React6.createElement("div", null, /* @__PURE__ */ React6.createElement("span", { className: "inline-block px-3 py-1 rounded-full bg-[#F3F3F3] text-[11px] font-bold uppercase tracking-wider text-[#111111] mb-2" }, item.period), /* @__PURE__ */ React6.createElement("h3", { className: "text-xl sm:text-2xl font-bold text-[#111111] tracking-tight" }, item.degree), /* @__PURE__ */ React6.createElement("p", { className: "text-sm font-medium text-[#666666] mt-1" }, item.institution)), /* @__PURE__ */ React6.createElement("div", { className: "shrink-0" }, /* @__PURE__ */ React6.createElement("span", { className: "inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#111111] text-white text-xs sm:text-sm font-bold tracking-tight shadow-sm" }, /* @__PURE__ */ React6.createElement("svg", { className: "w-4 h-4 text-emerald-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React6.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" })), item.score))), item.description && /* @__PURE__ */ React6.createElement("p", { className: "text-sm text-[#444444] leading-relaxed pt-2 border-t border-neutral-100" }, item.description)))))));
}

// src/components/Skills.jsx
import React7 from "react";
function Skills() {
  const { skills } = usePortfolio();
  const renderIcon = (name, iconType) => {
    switch (iconType || name.toLowerCase()) {
      case "code":
      case "python":
        return /* @__PURE__ */ React7.createElement("svg", { className: "w-6 h-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React7.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" }));
      case "bar-chart-2":
      case "bar-chart-3":
      case "tableau":
        return /* @__PURE__ */ React7.createElement("svg", { className: "w-6 h-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React7.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" }));
      case "pie-chart":
      case "data visualization":
        return /* @__PURE__ */ React7.createElement("svg", { className: "w-6 h-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React7.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" }), /* @__PURE__ */ React7.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" }));
      case "cpu":
      case "java":
        return /* @__PURE__ */ React7.createElement("svg", { className: "w-6 h-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React7.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" }));
      case "brain":
      case "problem solving":
        return /* @__PURE__ */ React7.createElement("svg", { className: "w-6 h-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React7.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" }));
      default:
        return /* @__PURE__ */ React7.createElement("svg", { className: "w-6 h-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React7.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M13 10V3L4 14h7v7l9-11h-7z" }));
    }
  };
  return /* @__PURE__ */ React7.createElement("section", { id: "skills", className: "py-24 bg-white border-b border-[#E5E5E5]" }, /* @__PURE__ */ React7.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, /* @__PURE__ */ React7.createElement("div", { className: "mb-16" }, /* @__PURE__ */ React7.createElement("p", { className: "text-xs uppercase tracking-widest text-[#666666] font-semibold mb-2" }, "03 / Technical Proficiency"), /* @__PURE__ */ React7.createElement("h2", { className: "text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight" }, "Technical Skills"), /* @__PURE__ */ React7.createElement("div", { className: "w-12 h-1 bg-[#111111] mt-3" })), /* @__PURE__ */ React7.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" }, (skills || []).map((skill, idx) => /* @__PURE__ */ React7.createElement(
    "div",
    {
      key: skill.id || idx,
      className: "minimal-card p-8 rounded-2xl flex flex-col justify-between"
    },
    /* @__PURE__ */ React7.createElement("div", null, /* @__PURE__ */ React7.createElement("div", { className: "flex items-center justify-between mb-6" }, /* @__PURE__ */ React7.createElement("div", { className: "w-12 h-12 rounded-xl bg-[#111111] text-white flex items-center justify-center shadow-sm" }, renderIcon(skill.name, skill.icon)), /* @__PURE__ */ React7.createElement("span", { className: "text-[11px] font-semibold uppercase tracking-wider text-[#666666] bg-[#F3F3F3] px-2.5 py-1 rounded-md" }, skill.category || "Competency")), /* @__PURE__ */ React7.createElement("h3", { className: "text-xl font-bold text-[#111111] mb-2 tracking-tight" }, skill.name), /* @__PURE__ */ React7.createElement("p", { className: "text-xs sm:text-sm text-[#555555] leading-relaxed" }, skill.description)),
    /* @__PURE__ */ React7.createElement("div", { className: "pt-6 mt-6 border-t border-[#E5E5E5] flex items-center justify-between text-xs text-[#666666]" }, /* @__PURE__ */ React7.createElement("span", { className: "font-medium" }, "Applied in coursework & projects"), /* @__PURE__ */ React7.createElement("span", { className: "text-neutral-400" }, "0", idx + 1))
  )))));
}

// src/components/Projects.jsx
import React8 from "react";
function Projects() {
  const { projects } = usePortfolio();
  const sanitizedProjects = (projects || []).filter(
    (p) => !p.title.toLowerCase().includes("student data quality repair system")
  );
  return /* @__PURE__ */ React8.createElement("section", { id: "projects", className: "py-24 bg-[#F3F3F3] border-b border-[#E5E5E5]" }, /* @__PURE__ */ React8.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, /* @__PURE__ */ React8.createElement("div", { className: "flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16" }, /* @__PURE__ */ React8.createElement("div", null, /* @__PURE__ */ React8.createElement("p", { className: "text-xs uppercase tracking-widest text-[#666666] font-semibold mb-2" }, "04 / Featured Work"), /* @__PURE__ */ React8.createElement("h2", { className: "text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight" }, "Key Projects"), /* @__PURE__ */ React8.createElement("div", { className: "w-12 h-1 bg-[#111111] mt-3" })), /* @__PURE__ */ React8.createElement(
    "a",
    {
      href: "https://github.com/manogna2902",
      target: "_blank",
      rel: "noopener noreferrer",
      className: "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#111111] hover:text-black group self-start md:self-auto"
    },
    /* @__PURE__ */ React8.createElement("span", null, "Explore All GitHub Repositories"),
    /* @__PURE__ */ React8.createElement("svg", { className: "w-4 h-4 group-hover:translate-x-1 transition-transform", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React8.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M14 5l7 7m0 0l-7 7m7-7H3" }))
  )), /* @__PURE__ */ React8.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8" }, sanitizedProjects.map((project, idx) => /* @__PURE__ */ React8.createElement(
    "div",
    {
      key: project.id || idx,
      className: "bg-white rounded-2xl border border-[#E5E5E5] hover:border-[#111111] transition-all duration-300 shadow-sm overflow-hidden flex flex-col justify-between"
    },
    /* @__PURE__ */ React8.createElement("div", { className: "p-8 pb-4" }, /* @__PURE__ */ React8.createElement("div", { className: "flex items-center justify-between mb-4" }, /* @__PURE__ */ React8.createElement("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F3F3] text-[11px] font-bold uppercase tracking-wider text-[#111111]" }, /* @__PURE__ */ React8.createElement("span", null, "Project 0", idx + 1)), project.featured && /* @__PURE__ */ React8.createElement("span", { className: "text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full" }, "Featured")), /* @__PURE__ */ React8.createElement("h3", { className: "text-2xl font-bold text-[#111111] tracking-tight mb-3" }, project.title), /* @__PURE__ */ React8.createElement("p", { className: "text-sm text-[#444444] leading-relaxed mb-6" }, project.description), /* @__PURE__ */ React8.createElement("div", { className: "flex flex-wrap gap-2 mb-6" }, (project.technologies || []).map((tech, tIdx) => /* @__PURE__ */ React8.createElement(
      "span",
      {
        key: tIdx,
        className: "px-2.5 py-1 text-xs font-medium text-[#333333] bg-[#F3F3F3] rounded-md border border-[#E5E5E5]"
      },
      tech
    )))),
    /* @__PURE__ */ React8.createElement("div", { className: "px-8 py-5 bg-[#FAFAFA] border-t border-[#E5E5E5] flex items-center justify-between gap-4" }, /* @__PURE__ */ React8.createElement("div", { className: "flex items-center gap-3" }, project.githubUrl && /* @__PURE__ */ React8.createElement(
      "a",
      {
        href: project.githubUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#111111] rounded-lg hover:bg-neutral-800 transition-colors"
      },
      /* @__PURE__ */ React8.createElement("svg", { className: "w-4 h-4 fill-current", viewBox: "0 0 24 24" }, /* @__PURE__ */ React8.createElement("path", { d: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" })),
      /* @__PURE__ */ React8.createElement("span", null, "View GitHub")
    ), project.liveUrl && /* @__PURE__ */ React8.createElement(
      "a",
      {
        href: project.liveUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#111111] bg-white border border-[#E5E5E5] rounded-lg hover:border-[#111111] hover:bg-[#F3F3F3] transition-colors"
      },
      /* @__PURE__ */ React8.createElement("svg", { className: "w-3.5 h-3.5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React8.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" })),
      /* @__PURE__ */ React8.createElement("span", null, "Live Demo")
    )), /* @__PURE__ */ React8.createElement("span", { className: "text-[11px] text-[#666666] font-mono" }, "github.com/manogna2902"))
  )))));
}

// src/components/Certifications.jsx
import React9 from "react";
function Certifications() {
  const { certifications } = usePortfolio();
  return /* @__PURE__ */ React9.createElement("section", { id: "certifications", className: "py-24 bg-white border-b border-[#E5E5E5]" }, /* @__PURE__ */ React9.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, /* @__PURE__ */ React9.createElement("div", { className: "mb-16" }, /* @__PURE__ */ React9.createElement("p", { className: "text-xs uppercase tracking-widest text-[#666666] font-semibold mb-2" }, "05 / Verified Credentials"), /* @__PURE__ */ React9.createElement("h2", { className: "text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight" }, "Certifications"), /* @__PURE__ */ React9.createElement("div", { className: "w-12 h-1 bg-[#111111] mt-3" })), /* @__PURE__ */ React9.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" }, (certifications || []).map((cert, idx) => /* @__PURE__ */ React9.createElement(
    "div",
    {
      key: cert.id || idx,
      className: "minimal-card p-8 rounded-2xl flex flex-col justify-between"
    },
    /* @__PURE__ */ React9.createElement("div", null, /* @__PURE__ */ React9.createElement("div", { className: "flex items-center justify-between mb-4" }, /* @__PURE__ */ React9.createElement("div", { className: "w-10 h-10 rounded-xl bg-[#111111] text-white flex items-center justify-center shadow-sm" }, /* @__PURE__ */ React9.createElement("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React9.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" }))), /* @__PURE__ */ React9.createElement("span", { className: "text-[11px] font-bold uppercase tracking-wider text-[#666666] bg-[#F3F3F3] px-2.5 py-1 rounded-md" }, cert.issueDate || "Issued")), /* @__PURE__ */ React9.createElement("h3", { className: "text-xl font-bold text-[#111111] mb-1 tracking-tight" }, cert.title), /* @__PURE__ */ React9.createElement("p", { className: "text-xs font-semibold text-[#666666] mb-4 uppercase tracking-wider" }, "Issuing Organization: ", cert.issuer), /* @__PURE__ */ React9.createElement("p", { className: "text-xs sm:text-sm text-[#444444] leading-relaxed mb-6" }, cert.description)),
    /* @__PURE__ */ React9.createElement("div", { className: "pt-5 border-t border-[#E5E5E5] flex items-center justify-between gap-3" }, cert.fileUrl ? /* @__PURE__ */ React9.createElement(
      "a",
      {
        href: cert.fileUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "inline-flex items-center gap-1.5 text-xs font-semibold text-[#111111] hover:underline"
      },
      /* @__PURE__ */ React9.createElement("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React9.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }), /* @__PURE__ */ React9.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })),
      /* @__PURE__ */ React9.createElement("span", null, "View Certificate")
    ) : /* @__PURE__ */ React9.createElement("span", { className: "text-xs text-neutral-400 font-medium" }, "Digital Credential"), cert.credentialUrl && /* @__PURE__ */ React9.createElement(
      "a",
      {
        href: cert.credentialUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "inline-flex items-center gap-1 text-xs font-medium text-[#666666] hover:text-[#111111] transition-colors"
      },
      /* @__PURE__ */ React9.createElement("span", null, "Verify"),
      /* @__PURE__ */ React9.createElement("svg", { className: "w-3.5 h-3.5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React9.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" }))
    ))
  )))));
}

// src/components/Internships.jsx
import React10 from "react";
function Internships() {
  const { internships } = usePortfolio();
  return /* @__PURE__ */ React10.createElement("section", { id: "experience", className: "py-24 bg-[#F3F3F3] border-b border-[#E5E5E5]" }, /* @__PURE__ */ React10.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, /* @__PURE__ */ React10.createElement("div", { className: "mb-16" }, /* @__PURE__ */ React10.createElement("p", { className: "text-xs uppercase tracking-widest text-[#666666] font-semibold mb-2" }, "06 / Practical Experience"), /* @__PURE__ */ React10.createElement("h2", { className: "text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight" }, "Internships"), /* @__PURE__ */ React10.createElement("div", { className: "w-12 h-1 bg-[#111111] mt-3" })), /* @__PURE__ */ React10.createElement("div", { className: "space-y-8" }, (internships || []).map((intern, idx) => /* @__PURE__ */ React10.createElement(
    "div",
    {
      key: intern.id || idx,
      className: "bg-white p-8 sm:p-10 rounded-2xl border border-[#E5E5E5] hover:border-[#111111] transition-all shadow-sm"
    },
    /* @__PURE__ */ React10.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6" }, /* @__PURE__ */ React10.createElement("div", null, /* @__PURE__ */ React10.createElement("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F3F3] text-[11px] font-bold uppercase tracking-wider text-[#111111] mb-2" }, /* @__PURE__ */ React10.createElement("span", null, intern.duration || "6 Weeks"), /* @__PURE__ */ React10.createElement("span", null, "\u2022"), /* @__PURE__ */ React10.createElement("span", null, intern.period || "2026")), /* @__PURE__ */ React10.createElement("h3", { className: "text-2xl font-bold text-[#111111] tracking-tight" }, intern.role), /* @__PURE__ */ React10.createElement("p", { className: "text-sm font-semibold text-[#666666] mt-0.5" }, intern.company)), /* @__PURE__ */ React10.createElement("div", { className: "shrink-0" }, /* @__PURE__ */ React10.createElement("span", { className: "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-neutral-100 text-[#111111] text-xs font-semibold" }, /* @__PURE__ */ React10.createElement("svg", { className: "w-4 h-4 text-emerald-600", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React10.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 13l4 4L19 7" })), "Completed Internship"))),
    /* @__PURE__ */ React10.createElement("p", { className: "text-sm text-[#444444] leading-relaxed mb-6" }, intern.description),
    intern.highlights && intern.highlights.length > 0 && /* @__PURE__ */ React10.createElement("div", { className: "pt-6 border-t border-[#E5E5E5]" }, /* @__PURE__ */ React10.createElement("h4", { className: "text-xs uppercase tracking-wider font-bold text-[#111111] mb-3" }, "Core Technical Deliverables & Learnings"), /* @__PURE__ */ React10.createElement("ul", { className: "grid grid-cols-1 md:grid-cols-3 gap-3" }, intern.highlights.map((item, hIdx) => /* @__PURE__ */ React10.createElement(
      "li",
      {
        key: hIdx,
        className: "flex items-start gap-2.5 text-xs text-[#555555] bg-[#F9F9F9] p-3 rounded-lg border border-[#E5E5E5]"
      },
      /* @__PURE__ */ React10.createElement("span", { className: "w-1.5 h-1.5 rounded-full bg-[#111111] mt-1.5 shrink-0" }),
      /* @__PURE__ */ React10.createElement("span", null, item)
    ))))
  )))));
}

// src/components/Services.jsx
import React11 from "react";
function Services() {
  const { services } = usePortfolio();
  const renderIcon = (iconName, title) => {
    const key = (iconName || title).toLowerCase();
    if (key.includes("tableau") || key.includes("visualization")) {
      return /* @__PURE__ */ React11.createElement("svg", { className: "w-6 h-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React11.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" }), /* @__PURE__ */ React11.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" }));
    }
    if (key.includes("dashboard") || key.includes("gauge")) {
      return /* @__PURE__ */ React11.createElement("svg", { className: "w-6 h-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React11.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" }));
    }
    if (key.includes("clean") || key.includes("preprocessing") || key.includes("filter")) {
      return /* @__PURE__ */ React11.createElement("svg", { className: "w-6 h-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React11.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" }));
    }
    return /* @__PURE__ */ React11.createElement("svg", { className: "w-6 h-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React11.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" }));
  };
  return /* @__PURE__ */ React11.createElement("section", { id: "services", className: "py-24 bg-white border-b border-[#E5E5E5]" }, /* @__PURE__ */ React11.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, /* @__PURE__ */ React11.createElement("div", { className: "mb-16" }, /* @__PURE__ */ React11.createElement("p", { className: "text-xs uppercase tracking-widest text-[#666666] font-semibold mb-2" }, "07 / Capabilities & Offerings"), /* @__PURE__ */ React11.createElement("h2", { className: "text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight" }, "Services"), /* @__PURE__ */ React11.createElement("div", { className: "w-12 h-1 bg-[#111111] mt-3" })), /* @__PURE__ */ React11.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" }, (services || []).map((serv, idx) => /* @__PURE__ */ React11.createElement(
    "div",
    {
      key: serv.id || idx,
      className: "minimal-card p-8 rounded-2xl flex flex-col justify-between"
    },
    /* @__PURE__ */ React11.createElement("div", null, /* @__PURE__ */ React11.createElement("div", { className: "w-12 h-12 rounded-xl bg-[#111111] text-white flex items-center justify-center mb-6 shadow-sm" }, renderIcon(serv.icon, serv.title)), /* @__PURE__ */ React11.createElement("h3", { className: "text-lg font-bold text-[#111111] mb-3 tracking-tight" }, serv.title), /* @__PURE__ */ React11.createElement("p", { className: "text-xs sm:text-sm text-[#555555] leading-relaxed" }, serv.description)),
    /* @__PURE__ */ React11.createElement("div", { className: "pt-6 mt-6 border-t border-[#E5E5E5] flex items-center justify-between text-xs text-[#666666]" }, /* @__PURE__ */ React11.createElement("span", { className: "font-semibold uppercase tracking-wider text-[10px]" }, "Service 0", idx + 1), /* @__PURE__ */ React11.createElement("span", { className: "w-2 h-2 rounded-full bg-[#111111]" }))
  )))));
}

// src/components/Seminar.jsx
import React12 from "react";
function Seminar() {
  const { seminar } = usePortfolio();
  return /* @__PURE__ */ React12.createElement("section", { id: "seminar", className: "py-24 bg-[#F3F3F3] border-b border-[#E5E5E5]" }, /* @__PURE__ */ React12.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, /* @__PURE__ */ React12.createElement("div", { className: "mb-16" }, /* @__PURE__ */ React12.createElement("p", { className: "text-xs uppercase tracking-widest text-[#666666] font-semibold mb-2" }, "08 / Research & Seminar"), /* @__PURE__ */ React12.createElement("h2", { className: "text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight" }, "Academic Seminar"), /* @__PURE__ */ React12.createElement("div", { className: "w-12 h-1 bg-[#111111] mt-3" })), /* @__PURE__ */ React12.createElement("div", { className: "bg-white rounded-2xl border border-[#E5E5E5] p-8 sm:p-12 shadow-sm" }, /* @__PURE__ */ React12.createElement("div", { className: "max-w-4xl" }, /* @__PURE__ */ React12.createElement("div", { className: "flex flex-wrap items-center gap-3 mb-6" }, /* @__PURE__ */ React12.createElement("span", { className: "px-3 py-1 rounded-full bg-[#111111] text-white text-xs font-bold uppercase tracking-wider" }, seminar.type || "Academic Seminar Topic"), /* @__PURE__ */ React12.createElement("span", { className: "text-xs font-medium text-[#666666] border border-[#E5E5E5] px-3 py-1 rounded-full bg-[#F3F3F3]" }, seminar.institution || "KITSW, Warangal"), /* @__PURE__ */ React12.createElement("span", { className: "text-xs text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full font-medium" }, "Research Seminar \u2022 Non-Project Academic Study")), /* @__PURE__ */ React12.createElement("h3", { className: "text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight mb-4" }, seminar.title || "Credit Card Fraud Detection"), /* @__PURE__ */ React12.createElement("p", { className: "text-base sm:text-lg text-[#333333] leading-relaxed mb-6 font-medium" }, seminar.description), seminar.extendedNotes && /* @__PURE__ */ React12.createElement("p", { className: "text-sm text-[#555555] leading-relaxed mb-8" }, seminar.extendedNotes), seminar.keyTakeaways && seminar.keyTakeaways.length > 0 && /* @__PURE__ */ React12.createElement("div", { className: "pt-8 border-t border-[#E5E5E5]" }, /* @__PURE__ */ React12.createElement("h4", { className: "text-xs uppercase tracking-widest font-bold text-[#111111] mb-4" }, "Key Academic Insights & Seminar Focus"), /* @__PURE__ */ React12.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4" }, seminar.keyTakeaways.map((takeaway, idx) => /* @__PURE__ */ React12.createElement(
    "div",
    {
      key: idx,
      className: "p-4 rounded-xl bg-[#F9F9F9] border border-[#E5E5E5] text-xs text-[#444444] leading-relaxed"
    },
    /* @__PURE__ */ React12.createElement("div", { className: "flex items-center gap-2 mb-2 font-bold text-[#111111]" }, /* @__PURE__ */ React12.createElement("span", { className: "w-5 h-5 rounded-full bg-[#111111] text-white flex items-center justify-center text-[10px]" }, idx + 1), /* @__PURE__ */ React12.createElement("span", null, "Topic 0", idx + 1)),
    /* @__PURE__ */ React12.createElement("p", null, takeaway)
  ))))))));
}

// src/components/Contact.jsx
import React13, { useState as useState4 } from "react";
function Contact({ onShowToast }) {
  const { profile } = usePortfolio();
  const [formData, setFormData] = useState4({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState4({});
  const [submitting, setSubmitting] = useState4(false);
  const [submitted, setSubmitted] = useState4(false);
  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Full Name is required";
    if (!formData.email.trim()) {
      errs.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address";
    }
    if (!formData.subject.trim()) errs.subject = "Subject is required";
    if (!formData.message.trim()) {
      errs.message = "Message content is required";
    } else if (formData.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await submitContactMessage(formData);
      if (res.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        if (onShowToast) {
          onShowToast("Thank you! Your message has been sent successfully.", "success");
        }
      } else {
        if (onShowToast) {
          onShowToast("Failed to send message. Please try again.", "error");
        }
      }
    } catch (err) {
      console.error("Contact submit error:", err);
      if (onShowToast) {
        onShowToast("Something went wrong. Please try again.", "error");
      }
    } finally {
      setSubmitting(false);
    }
  };
  return /* @__PURE__ */ React13.createElement("section", { id: "contact", className: "py-24 bg-white border-b border-[#E5E5E5]" }, /* @__PURE__ */ React13.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, /* @__PURE__ */ React13.createElement("div", { className: "mb-16" }, /* @__PURE__ */ React13.createElement("p", { className: "text-xs uppercase tracking-widest text-[#666666] font-semibold mb-2" }, "09 / Get In Touch"), /* @__PURE__ */ React13.createElement("h2", { className: "text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight" }, "Contact"), /* @__PURE__ */ React13.createElement("div", { className: "w-12 h-1 bg-[#111111] mt-3" })), /* @__PURE__ */ React13.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16" }, /* @__PURE__ */ React13.createElement("div", { className: "lg:col-span-5 flex flex-col justify-between" }, /* @__PURE__ */ React13.createElement("div", null, /* @__PURE__ */ React13.createElement("h3", { className: "text-2xl font-bold text-[#111111] tracking-tight mb-4" }, "Let's discuss data opportunities and analytical projects."), /* @__PURE__ */ React13.createElement("p", { className: "text-sm text-[#555555] leading-relaxed mb-8" }, "I am actively seeking Data Analyst internships and entry-level positions. Whether you have an inquiry, project collaboration, or mentorship advice, I'd love to connect."), /* @__PURE__ */ React13.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React13.createElement(
    "a",
    {
      href: `mailto:${profile.email}`,
      className: "flex items-center gap-4 p-4 rounded-xl border border-[#E5E5E5] hover:border-[#111111] bg-[#FAFAFA] transition-all group"
    },
    /* @__PURE__ */ React13.createElement("div", { className: "w-10 h-10 rounded-lg bg-[#111111] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform" }, /* @__PURE__ */ React13.createElement("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React13.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }))),
    /* @__PURE__ */ React13.createElement("div", { className: "overflow-hidden" }, /* @__PURE__ */ React13.createElement("span", { className: "text-[11px] uppercase tracking-wider text-[#666666] font-medium block" }, "Email Address"), /* @__PURE__ */ React13.createElement("span", { className: "text-sm font-bold text-[#111111] truncate block" }, profile.email))
  ), /* @__PURE__ */ React13.createElement(
    "a",
    {
      href: `tel:${profile.phone}`,
      className: "flex items-center gap-4 p-4 rounded-xl border border-[#E5E5E5] hover:border-[#111111] bg-[#FAFAFA] transition-all group"
    },
    /* @__PURE__ */ React13.createElement("div", { className: "w-10 h-10 rounded-lg bg-[#111111] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform" }, /* @__PURE__ */ React13.createElement("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React13.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" }))),
    /* @__PURE__ */ React13.createElement("div", null, /* @__PURE__ */ React13.createElement("span", { className: "text-[11px] uppercase tracking-wider text-[#666666] font-medium block" }, "Phone"), /* @__PURE__ */ React13.createElement("span", { className: "text-sm font-bold text-[#111111] block" }, profile.phone))
  ), /* @__PURE__ */ React13.createElement("div", { className: "flex items-center gap-4 p-4 rounded-xl border border-[#E5E5E5] bg-[#FAFAFA]" }, /* @__PURE__ */ React13.createElement("div", { className: "w-10 h-10 rounded-lg bg-[#111111] text-white flex items-center justify-center shrink-0" }, /* @__PURE__ */ React13.createElement("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React13.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }), /* @__PURE__ */ React13.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" }))), /* @__PURE__ */ React13.createElement("div", null, /* @__PURE__ */ React13.createElement("span", { className: "text-[11px] uppercase tracking-wider text-[#666666] font-medium block" }, "Location"), /* @__PURE__ */ React13.createElement("span", { className: "text-sm font-bold text-[#111111] block" }, profile.location))))), /* @__PURE__ */ React13.createElement("div", { className: "pt-8 mt-8 border-t border-[#E5E5E5] flex items-center gap-4" }, /* @__PURE__ */ React13.createElement("span", { className: "text-xs uppercase tracking-wider text-[#666666] font-semibold" }, "Social Profiles:"), profile.linkedin && /* @__PURE__ */ React13.createElement(
    "a",
    {
      href: profile.linkedin,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "px-3 py-1.5 rounded-lg bg-[#F3F3F3] text-xs font-semibold text-[#111111] hover:bg-[#111111] hover:text-white transition-all"
    },
    "LinkedIn"
  ), profile.github && /* @__PURE__ */ React13.createElement(
    "a",
    {
      href: profile.github,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "px-3 py-1.5 rounded-lg bg-[#F3F3F3] text-xs font-semibold text-[#111111] hover:bg-[#111111] hover:text-white transition-all"
    },
    "GitHub"
  ))), /* @__PURE__ */ React13.createElement("div", { className: "lg:col-span-7" }, /* @__PURE__ */ React13.createElement("div", { className: "bg-[#FAFAFA] p-8 sm:p-10 rounded-2xl border border-[#E5E5E5] shadow-sm" }, /* @__PURE__ */ React13.createElement("h4", { className: "text-xl font-bold text-[#111111] mb-2 tracking-tight" }, "Send a Direct Message"), /* @__PURE__ */ React13.createElement("p", { className: "text-xs sm:text-sm text-[#666666] mb-8" }, "Fill out the form below. Messages are securely stored and monitored directly in the Admin portal."), submitted ? /* @__PURE__ */ React13.createElement("div", { className: "p-6 bg-white border border-emerald-300 rounded-xl text-center animate-fade-in" }, /* @__PURE__ */ React13.createElement("div", { className: "w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-3" }, /* @__PURE__ */ React13.createElement("svg", { className: "w-6 h-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React13.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 13l4 4L19 7" }))), /* @__PURE__ */ React13.createElement("h5", { className: "text-base font-bold text-[#111111] mb-1" }, "Message Received!"), /* @__PURE__ */ React13.createElement("p", { className: "text-xs text-[#555555] mb-4" }, "Thank you for reaching out. I will review your inquiry and respond to your email shortly."), /* @__PURE__ */ React13.createElement(
    "button",
    {
      onClick: () => setSubmitted(false),
      className: "px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#111111] bg-[#F3F3F3] rounded-md hover:bg-[#E5E5E5] transition-colors"
    },
    "Send Another Message"
  )) : /* @__PURE__ */ React13.createElement("form", { onSubmit: handleSubmit, className: "space-y-5" }, /* @__PURE__ */ React13.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5" }, /* @__PURE__ */ React13.createElement("div", null, /* @__PURE__ */ React13.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Full Name ", /* @__PURE__ */ React13.createElement("span", { className: "text-red-500" }, "*")), /* @__PURE__ */ React13.createElement(
    "input",
    {
      type: "text",
      name: "name",
      value: formData.name,
      onChange: handleChange,
      placeholder: "e.g. John Doe",
      className: `w-full px-4 py-2.5 rounded-lg text-sm bg-white ${errors.name ? "border-red-500" : "border-[#E5E5E5]"}`
    }
  ), errors.name && /* @__PURE__ */ React13.createElement("p", { className: "text-[11px] text-red-500 mt-1" }, errors.name)), /* @__PURE__ */ React13.createElement("div", null, /* @__PURE__ */ React13.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Email Address ", /* @__PURE__ */ React13.createElement("span", { className: "text-red-500" }, "*")), /* @__PURE__ */ React13.createElement(
    "input",
    {
      type: "email",
      name: "email",
      value: formData.email,
      onChange: handleChange,
      placeholder: "e.g. john@example.com",
      className: `w-full px-4 py-2.5 rounded-lg text-sm bg-white ${errors.email ? "border-red-500" : "border-[#E5E5E5]"}`
    }
  ), errors.email && /* @__PURE__ */ React13.createElement("p", { className: "text-[11px] text-red-500 mt-1" }, errors.email))), /* @__PURE__ */ React13.createElement("div", null, /* @__PURE__ */ React13.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Subject ", /* @__PURE__ */ React13.createElement("span", { className: "text-red-500" }, "*")), /* @__PURE__ */ React13.createElement(
    "input",
    {
      type: "text",
      name: "subject",
      value: formData.subject,
      onChange: handleChange,
      placeholder: "e.g. Data Analyst Internship / Project Inquiry",
      className: `w-full px-4 py-2.5 rounded-lg text-sm bg-white ${errors.subject ? "border-red-500" : "border-[#E5E5E5]"}`
    }
  ), errors.subject && /* @__PURE__ */ React13.createElement("p", { className: "text-[11px] text-red-500 mt-1" }, errors.subject)), /* @__PURE__ */ React13.createElement("div", null, /* @__PURE__ */ React13.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Message ", /* @__PURE__ */ React13.createElement("span", { className: "text-red-500" }, "*")), /* @__PURE__ */ React13.createElement(
    "textarea",
    {
      name: "message",
      rows: 5,
      value: formData.message,
      onChange: handleChange,
      placeholder: "Write your message here...",
      className: `w-full px-4 py-2.5 rounded-lg text-sm bg-white resize-y ${errors.message ? "border-red-500" : "border-[#E5E5E5]"}`
    }
  ), errors.message && /* @__PURE__ */ React13.createElement("p", { className: "text-[11px] text-red-500 mt-1" }, errors.message)), /* @__PURE__ */ React13.createElement(
    "button",
    {
      type: "submit",
      disabled: submitting,
      className: "w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] rounded-lg hover:bg-neutral-800 transition-all disabled:opacity-50 shadow-sm"
    },
    submitting ? /* @__PURE__ */ React13.createElement(React13.Fragment, null, /* @__PURE__ */ React13.createElement("svg", { className: "w-4 h-4 animate-spin", fill: "none", viewBox: "0 0 24 24" }, /* @__PURE__ */ React13.createElement("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), /* @__PURE__ */ React13.createElement("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })), /* @__PURE__ */ React13.createElement("span", null, "Sending Message...")) : /* @__PURE__ */ React13.createElement(React13.Fragment, null, /* @__PURE__ */ React13.createElement("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React13.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8" })), /* @__PURE__ */ React13.createElement("span", null, "Send Message"))
  )))))));
}

// src/components/Footer.jsx
import React14 from "react";
function Footer({ onNavigateAdmin }) {
  const { profile } = usePortfolio();
  const { isAuthenticated } = useAuth();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return /* @__PURE__ */ React14.createElement("footer", { className: "bg-[#111111] text-white py-16 border-t border-neutral-800" }, /* @__PURE__ */ React14.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, /* @__PURE__ */ React14.createElement("div", { className: "grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-neutral-800 items-start" }, /* @__PURE__ */ React14.createElement("div", { className: "md:col-span-6" }, /* @__PURE__ */ React14.createElement("div", { className: "flex items-center gap-2 mb-3" }, /* @__PURE__ */ React14.createElement("span", { className: "w-8 h-8 rounded-lg bg-white text-[#111111] flex items-center justify-center font-bold text-sm tracking-wider" }, "PM"), /* @__PURE__ */ React14.createElement("span", { className: "text-lg font-bold tracking-tight" }, profile.name)), /* @__PURE__ */ React14.createElement("p", { className: "text-xs text-neutral-400 font-medium mb-1" }, profile.title), /* @__PURE__ */ React14.createElement("p", { className: "text-xs text-neutral-500 italic max-w-sm" }, '"', profile.tagline || "Turning Data into Meaningful Insights", '"')), /* @__PURE__ */ React14.createElement("div", { className: "md:col-span-3" }, /* @__PURE__ */ React14.createElement("h5", { className: "text-xs uppercase tracking-widest font-bold text-neutral-400 mb-4" }, "Navigation"), /* @__PURE__ */ React14.createElement("ul", { className: "space-y-2 text-xs text-neutral-400 font-medium" }, /* @__PURE__ */ React14.createElement("li", null, /* @__PURE__ */ React14.createElement("a", { href: "#about", className: "hover:text-white transition-colors" }, "About Me")), /* @__PURE__ */ React14.createElement("li", null, /* @__PURE__ */ React14.createElement("a", { href: "#education", className: "hover:text-white transition-colors" }, "Education")), /* @__PURE__ */ React14.createElement("li", null, /* @__PURE__ */ React14.createElement("a", { href: "#skills", className: "hover:text-white transition-colors" }, "Skills")), /* @__PURE__ */ React14.createElement("li", null, /* @__PURE__ */ React14.createElement("a", { href: "#projects", className: "hover:text-white transition-colors" }, "Projects")), /* @__PURE__ */ React14.createElement("li", null, /* @__PURE__ */ React14.createElement("a", { href: "#certifications", className: "hover:text-white transition-colors" }, "Certifications")), /* @__PURE__ */ React14.createElement("li", null, /* @__PURE__ */ React14.createElement("a", { href: "#experience", className: "hover:text-white transition-colors" }, "Internships")), /* @__PURE__ */ React14.createElement("li", null, /* @__PURE__ */ React14.createElement("a", { href: "#services", className: "hover:text-white transition-colors" }, "Services")), /* @__PURE__ */ React14.createElement("li", null, /* @__PURE__ */ React14.createElement("a", { href: "#seminar", className: "hover:text-white transition-colors" }, "Academic Seminar")), /* @__PURE__ */ React14.createElement("li", null, /* @__PURE__ */ React14.createElement("a", { href: "#contact", className: "hover:text-white transition-colors" }, "Contact")))), /* @__PURE__ */ React14.createElement("div", { className: "md:col-span-3" }, /* @__PURE__ */ React14.createElement("h5", { className: "text-xs uppercase tracking-widest font-bold text-neutral-400 mb-4" }, "Connect & Admin"), /* @__PURE__ */ React14.createElement("div", { className: "flex flex-col gap-2.5 text-xs text-neutral-400 font-medium mb-6" }, profile.linkedin && /* @__PURE__ */ React14.createElement("a", { href: profile.linkedin, target: "_blank", rel: "noopener noreferrer", className: "hover:text-white transition-colors flex items-center gap-2" }, /* @__PURE__ */ React14.createElement("span", null, "LinkedIn"), /* @__PURE__ */ React14.createElement("svg", { className: "w-3.5 h-3.5 text-neutral-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React14.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" }))), profile.github && /* @__PURE__ */ React14.createElement("a", { href: profile.github, target: "_blank", rel: "noopener noreferrer", className: "hover:text-white transition-colors flex items-center gap-2" }, /* @__PURE__ */ React14.createElement("span", null, "GitHub"), /* @__PURE__ */ React14.createElement("svg", { className: "w-3.5 h-3.5 text-neutral-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React14.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" }))), /* @__PURE__ */ React14.createElement("a", { href: `mailto:${profile.email}`, className: "hover:text-white transition-colors" }, profile.email)), /* @__PURE__ */ React14.createElement(
    "button",
    {
      onClick: onNavigateAdmin,
      className: "inline-flex items-center gap-2 px-3 py-1.5 rounded bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 text-xs font-semibold transition-all"
    },
    /* @__PURE__ */ React14.createElement("svg", { className: "w-3.5 h-3.5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React14.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" })),
    /* @__PURE__ */ React14.createElement("span", null, isAuthenticated ? "Admin Dashboard" : "Admin Login")
  ))), /* @__PURE__ */ React14.createElement("div", { className: "pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500" }, /* @__PURE__ */ React14.createElement("p", null, "\xA9 ", (/* @__PURE__ */ new Date()).getFullYear(), " Pittala Manogna. Built with React & Supabase. All rights reserved."), /* @__PURE__ */ React14.createElement(
    "button",
    {
      onClick: scrollToTop,
      className: "flex items-center gap-1.5 hover:text-white transition-colors"
    },
    /* @__PURE__ */ React14.createElement("span", null, "Back to top"),
    /* @__PURE__ */ React14.createElement("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React14.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 10l7-7m0 0l7 7m-7-7v18" }))
  ))));
}

// src/components/Toast.jsx
import React15, { useEffect as useEffect4 } from "react";
function Toast({ message, type = "success", onClose, duration = 3500 }) {
  useEffect4(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);
  if (!message) return null;
  const bgStyles = {
    success: "bg-[#111111] text-white border-neutral-800",
    error: "bg-red-950 text-red-100 border-red-800",
    info: "bg-neutral-900 text-white border-neutral-700"
  };
  const icons = {
    success: /* @__PURE__ */ React15.createElement("svg", { className: "w-5 h-5 text-emerald-400 shrink-0", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React15.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 13l4 4L19 7" })),
    error: /* @__PURE__ */ React15.createElement("svg", { className: "w-5 h-5 text-red-400 shrink-0", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React15.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" })),
    info: /* @__PURE__ */ React15.createElement("svg", { className: "w-5 h-5 text-blue-400 shrink-0", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React15.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }))
  };
  return /* @__PURE__ */ React15.createElement("div", { className: "fixed bottom-6 right-6 z-50 animate-fade-in" }, /* @__PURE__ */ React15.createElement("div", { className: `flex items-center gap-3 px-4 py-3 rounded-lg border shadow-xl text-sm font-medium ${bgStyles[type] || bgStyles.info}` }, icons[type], /* @__PURE__ */ React15.createElement("span", null, message), /* @__PURE__ */ React15.createElement(
    "button",
    {
      onClick: onClose,
      className: "ml-2 text-neutral-400 hover:text-white transition-colors",
      "aria-label": "Close"
    },
    "\xD7"
  )));
}

// src/admin/AdminLayout.jsx
import React16, { useState as useState5 } from "react";
function AdminLayout({
  activeTab,
  onSelectTab,
  onBackToSite,
  onOpenSupabaseModal,
  children
}) {
  const { user, logout } = useAuth();
  const { messages } = usePortfolio();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState5(false);
  const unreadMessagesCount = (messages || []).filter((m) => !m.read).length;
  const isSupabaseActive = isSupabaseConfigured();
  const menuItems = [
    { id: "overview", label: "Overview", icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" },
    { id: "profile", label: "Profile Management", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
    { id: "education", label: "Education Management", icon: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" },
    { id: "skills", label: "Skills Management", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
    { id: "projects", label: "Projects Management", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
    { id: "certifications", label: "Certifications", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
    { id: "internships", label: "Internships", icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    { id: "services", label: "Services", icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" },
    { id: "seminar", label: "Seminar Topics", icon: "M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" },
    { id: "contact_info", label: "Contact Information", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    { id: "resume", label: "Resume Management", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
    { id: "messages", label: "Contact Messages", badge: unreadMessagesCount, icon: "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" }
  ];
  const handleMenuClick = (id) => {
    onSelectTab(id);
    setMobileSidebarOpen(false);
  };
  return /* @__PURE__ */ React16.createElement("div", { className: "min-h-screen bg-[#F3F3F3] flex flex-col font-sans" }, /* @__PURE__ */ React16.createElement("header", { className: "bg-white border-b border-[#E5E5E5] sticky top-0 z-30" }, /* @__PURE__ */ React16.createElement("div", { className: "px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between" }, /* @__PURE__ */ React16.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React16.createElement(
    "button",
    {
      onClick: () => setMobileSidebarOpen(!mobileSidebarOpen),
      className: "lg:hidden p-2 rounded-lg text-[#111111] hover:bg-[#F3F3F3]",
      "aria-label": "Toggle Navigation"
    },
    /* @__PURE__ */ React16.createElement("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React16.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 6h16M4 12h16M4 18h16" }))
  ), /* @__PURE__ */ React16.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React16.createElement("span", { className: "w-8 h-8 rounded-lg bg-[#111111] text-white flex items-center justify-center font-bold text-xs" }, "PM"), /* @__PURE__ */ React16.createElement("div", null, /* @__PURE__ */ React16.createElement("h1", { className: "text-sm font-bold text-[#111111] tracking-tight" }, "Admin Dashboard"), /* @__PURE__ */ React16.createElement("p", { className: "text-[11px] text-[#666666] hidden sm:block" }, "Logged in as ", user?.email || "Administrator")))), /* @__PURE__ */ React16.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React16.createElement(
    "button",
    {
      onClick: onOpenSupabaseModal,
      className: `inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${isSupabaseActive ? "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100" : "bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100"}`,
      title: "Click to configure or test Supabase connection"
    },
    /* @__PURE__ */ React16.createElement("span", { className: `w-2 h-2 rounded-full ${isSupabaseActive ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}` }),
    /* @__PURE__ */ React16.createElement("span", { className: "hidden sm:inline" }, isSupabaseActive ? "Supabase Connected" : "Supabase Setup")
  ), /* @__PURE__ */ React16.createElement(
    "button",
    {
      onClick: onBackToSite,
      className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#111111] bg-white border border-[#E5E5E5] hover:bg-[#F3F3F3] transition-colors"
    },
    /* @__PURE__ */ React16.createElement("svg", { className: "w-3.5 h-3.5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React16.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" })),
    /* @__PURE__ */ React16.createElement("span", null, "View Site")
  ), /* @__PURE__ */ React16.createElement(
    "button",
    {
      onClick: logout,
      className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors",
      title: "Logout from dashboard"
    },
    /* @__PURE__ */ React16.createElement("svg", { className: "w-3.5 h-3.5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React16.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" })),
    /* @__PURE__ */ React16.createElement("span", { className: "hidden sm:inline" }, "Logout")
  )))), /* @__PURE__ */ React16.createElement("div", { className: "flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-8" }, /* @__PURE__ */ React16.createElement("aside", { className: "w-64 shrink-0 hidden lg:block" }, /* @__PURE__ */ React16.createElement("div", { className: "bg-white rounded-2xl border border-[#E5E5E5] p-3 shadow-sm sticky top-24" }, /* @__PURE__ */ React16.createElement("div", { className: "px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#888888]" }, "Dashboard Menu"), /* @__PURE__ */ React16.createElement("nav", { className: "space-y-1" }, menuItems.map((item) => {
    const isActive = activeTab === item.id;
    return /* @__PURE__ */ React16.createElement(
      "button",
      {
        key: item.id,
        onClick: () => handleMenuClick(item.id),
        className: `w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${isActive ? "bg-[#111111] text-white shadow-sm" : "text-[#444444] hover:bg-[#F3F3F3] hover:text-[#111111]"}`
      },
      /* @__PURE__ */ React16.createElement("div", { className: "flex items-center gap-2.5 truncate" }, /* @__PURE__ */ React16.createElement("svg", { className: `w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-[#888888]"}`, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React16.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: item.icon })), /* @__PURE__ */ React16.createElement("span", { className: "truncate" }, item.label)),
      item.badge > 0 && /* @__PURE__ */ React16.createElement("span", { className: `px-2 py-0.5 rounded-full text-[10px] font-bold ${isActive ? "bg-white text-[#111111]" : "bg-red-600 text-white"}` }, item.badge)
    );
  })), /* @__PURE__ */ React16.createElement("div", { className: "pt-4 mt-4 border-t border-[#E5E5E5] px-2" }, /* @__PURE__ */ React16.createElement(
    "button",
    {
      onClick: logout,
      className: "w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
    },
    /* @__PURE__ */ React16.createElement("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React16.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" })),
    /* @__PURE__ */ React16.createElement("span", null, "Logout")
  )))), mobileSidebarOpen && /* @__PURE__ */ React16.createElement("div", { className: "fixed inset-0 z-50 lg:hidden flex" }, /* @__PURE__ */ React16.createElement("div", { className: "fixed inset-0 bg-black/50 backdrop-blur-sm", onClick: () => setMobileSidebarOpen(false) }), /* @__PURE__ */ React16.createElement("div", { className: "relative bg-white w-72 max-w-[80%] h-full p-4 overflow-y-auto shadow-2xl flex flex-col justify-between" }, /* @__PURE__ */ React16.createElement("div", null, /* @__PURE__ */ React16.createElement("div", { className: "flex items-center justify-between pb-4 mb-4 border-b border-[#E5E5E5]" }, /* @__PURE__ */ React16.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React16.createElement("span", { className: "w-8 h-8 rounded-lg bg-[#111111] text-white flex items-center justify-center font-bold text-xs" }, "PM"), /* @__PURE__ */ React16.createElement("span", { className: "text-sm font-bold text-[#111111]" }, "Dashboard Menu")), /* @__PURE__ */ React16.createElement("button", { onClick: () => setMobileSidebarOpen(false), className: "p-1 text-neutral-400 hover:text-black" }, "\xD7")), /* @__PURE__ */ React16.createElement("nav", { className: "space-y-1" }, menuItems.map((item) => {
    const isActive = activeTab === item.id;
    return /* @__PURE__ */ React16.createElement(
      "button",
      {
        key: item.id,
        onClick: () => handleMenuClick(item.id),
        className: `w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold ${isActive ? "bg-[#111111] text-white" : "text-[#444444] hover:bg-[#F3F3F3]"}`
      },
      /* @__PURE__ */ React16.createElement("div", { className: "flex items-center gap-2.5 truncate" }, /* @__PURE__ */ React16.createElement("svg", { className: `w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-[#888888]"}`, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React16.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: item.icon })), /* @__PURE__ */ React16.createElement("span", { className: "truncate" }, item.label)),
      item.badge > 0 && /* @__PURE__ */ React16.createElement("span", { className: "px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-600 text-white" }, item.badge)
    );
  }))), /* @__PURE__ */ React16.createElement("div", { className: "pt-4 border-t border-[#E5E5E5]" }, /* @__PURE__ */ React16.createElement(
    "button",
    {
      onClick: logout,
      className: "w-full flex items-center gap-2 px-3 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg"
    },
    /* @__PURE__ */ React16.createElement("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React16.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" })),
    /* @__PURE__ */ React16.createElement("span", null, "Logout")
  )))), /* @__PURE__ */ React16.createElement("main", { className: "flex-1 min-w-0" }, children)));
}

// src/admin/AdminLogin.jsx
import React17, { useState as useState6 } from "react";
function AdminLogin({ onLoginSuccess, onBackToSite, onShowToast }) {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState6(DEFAULT_ADMIN.email);
  const [password, setPassword] = useState6(DEFAULT_ADMIN.password);
  const [showPassword, setShowPassword] = useState6(false);
  const [error, setError] = useState6("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password) {
      setError("Please provide both email and password");
      return;
    }
    const result = await login(email, password);
    if (result.success) {
      if (onShowToast) onShowToast("Welcome back, Pittala Manogna!", "success");
      onLoginSuccess();
    } else {
      setError(result.error || "Authentication failed. Please check credentials.");
      if (onShowToast) onShowToast("Login failed", "error");
    }
  };
  const handleUseDefaultCredentials = () => {
    setEmail(DEFAULT_ADMIN.email);
    setPassword(DEFAULT_ADMIN.password);
    setError("");
  };
  return /* @__PURE__ */ React17.createElement("div", { className: "min-h-screen bg-[#F3F3F3] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans" }, /* @__PURE__ */ React17.createElement("div", { className: "sm:mx-auto sm:w-full sm:max-w-md text-center mb-6" }, /* @__PURE__ */ React17.createElement(
    "button",
    {
      onClick: onBackToSite,
      className: "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#666666] hover:text-[#111111] transition-colors mb-4"
    },
    /* @__PURE__ */ React17.createElement("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React17.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10 19l-7-7m0 0l7-7m-7 7h18" })),
    "Back to Public Portfolio"
  ), /* @__PURE__ */ React17.createElement("div", { className: "w-12 h-12 rounded-xl bg-[#111111] text-white flex items-center justify-center font-bold text-lg mx-auto shadow-sm" }, "PM"), /* @__PURE__ */ React17.createElement("h2", { className: "mt-4 text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]" }, "Admin Control Center"), /* @__PURE__ */ React17.createElement("p", { className: "mt-1 text-xs text-[#666666]" }, "Secure content management portal for Pittala Manogna")), /* @__PURE__ */ React17.createElement("div", { className: "sm:mx-auto sm:w-full sm:max-w-md" }, /* @__PURE__ */ React17.createElement("div", { className: "bg-white py-8 px-6 sm:px-10 shadow-lg border border-[#E5E5E5] rounded-2xl" }, error && /* @__PURE__ */ React17.createElement("div", { className: "mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2" }, /* @__PURE__ */ React17.createElement("svg", { className: "w-4 h-4 shrink-0 mt-0.5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React17.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" })), /* @__PURE__ */ React17.createElement("span", null, error)), /* @__PURE__ */ React17.createElement("form", { onSubmit: handleSubmit, className: "space-y-5" }, /* @__PURE__ */ React17.createElement("div", null, /* @__PURE__ */ React17.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Admin Email"), /* @__PURE__ */ React17.createElement(
    "input",
    {
      type: "email",
      value: email,
      onChange: (e) => setEmail(e.target.value),
      required: true,
      className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white border-[#E5E5E5]",
      placeholder: "manogna2902@gmail.com"
    }
  )), /* @__PURE__ */ React17.createElement("div", null, /* @__PURE__ */ React17.createElement("div", { className: "flex items-center justify-between mb-1.5" }, /* @__PURE__ */ React17.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333]" }, "Password"), /* @__PURE__ */ React17.createElement(
    "button",
    {
      type: "button",
      onClick: () => setShowPassword(!showPassword),
      className: "text-[11px] text-[#666666] hover:text-[#111111]"
    },
    showPassword ? "Hide" : "Show"
  )), /* @__PURE__ */ React17.createElement(
    "input",
    {
      type: showPassword ? "text" : "password",
      value: password,
      onChange: (e) => setPassword(e.target.value),
      required: true,
      className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white border-[#E5E5E5]",
      placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
    }
  )), /* @__PURE__ */ React17.createElement(
    "button",
    {
      type: "submit",
      disabled: loading,
      className: "w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 transition-all disabled:opacity-50"
    },
    loading ? /* @__PURE__ */ React17.createElement(React17.Fragment, null, /* @__PURE__ */ React17.createElement("svg", { className: "w-4 h-4 animate-spin", fill: "none", viewBox: "0 0 24 24" }, /* @__PURE__ */ React17.createElement("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), /* @__PURE__ */ React17.createElement("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })), /* @__PURE__ */ React17.createElement("span", null, "Authenticating...")) : /* @__PURE__ */ React17.createElement(React17.Fragment, null, /* @__PURE__ */ React17.createElement("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React17.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" })), /* @__PURE__ */ React17.createElement("span", null, "Log In to Dashboard"))
  )), /* @__PURE__ */ React17.createElement("div", { className: "mt-6 pt-5 border-t border-[#E5E5E5] text-xs text-[#666666]" }, /* @__PURE__ */ React17.createElement("div", { className: "flex items-center justify-between mb-2" }, /* @__PURE__ */ React17.createElement("span", { className: "font-semibold text-[#111111]" }, "Default Credentials:"), /* @__PURE__ */ React17.createElement(
    "button",
    {
      type: "button",
      onClick: handleUseDefaultCredentials,
      className: "text-xs text-[#111111] font-bold underline hover:no-underline"
    },
    "Auto-fill"
  )), /* @__PURE__ */ React17.createElement("div", { className: "bg-[#F9F9F9] p-3 rounded-lg border border-[#E5E5E5] space-y-1 font-mono text-[11px]" }, /* @__PURE__ */ React17.createElement("div", null, "Email: ", /* @__PURE__ */ React17.createElement("span", { className: "text-[#111111] font-semibold" }, DEFAULT_ADMIN.email)), /* @__PURE__ */ React17.createElement("div", null, "Password: ", /* @__PURE__ */ React17.createElement("span", { className: "text-[#111111] font-semibold" }, DEFAULT_ADMIN.password))), /* @__PURE__ */ React17.createElement("p", { className: "mt-2 text-[11px] text-[#888888]" }, "Tip: Supports both local testing and real Supabase Auth when your Supabase database is connected!")))));
}

// src/admin/AdminOverview.jsx
import React18 from "react";
function AdminOverview({ onNavigateTab, onOpenSupabaseModal }) {
  const {
    profile,
    projects,
    education,
    skills,
    certifications,
    internships,
    services,
    messages
  } = usePortfolio();
  const isSupabase = isSupabaseConfigured();
  const unreadCount = (messages || []).filter((m) => !m.read).length;
  const stats = [
    { label: "Featured Projects", count: (projects || []).length, tab: "projects", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
    { label: "Technical Skills", count: (skills || []).length, tab: "skills", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
    { label: "Education Records", count: (education || []).length, tab: "education", icon: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" },
    { label: "Certifications", count: (certifications || []).length, tab: "certifications", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
    { label: "Internships", count: (internships || []).length, tab: "internships", icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    { label: "Unread Messages", count: unreadCount, tab: "messages", highlight: unreadCount > 0, icon: "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" }
  ];
  return /* @__PURE__ */ React18.createElement("div", { className: "space-y-8 animate-fade-in" }, /* @__PURE__ */ React18.createElement("div", { className: "bg-white rounded-2xl border border-[#E5E5E5] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm" }, /* @__PURE__ */ React18.createElement("div", { className: "flex items-center gap-4" }, /* @__PURE__ */ React18.createElement("div", { className: "w-16 h-16 rounded-2xl bg-[#111111] text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-sm" }, profile.avatarUrl ? /* @__PURE__ */ React18.createElement("img", { src: profile.avatarUrl, alt: "PM", className: "w-full h-full rounded-2xl object-cover" }) : "PM"), /* @__PURE__ */ React18.createElement("div", null, /* @__PURE__ */ React18.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React18.createElement("h2", { className: "text-xl sm:text-2xl font-bold text-[#111111]" }, "Hello, ", profile.name), /* @__PURE__ */ React18.createElement("span", { className: "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200" }, "Active Admin")), /* @__PURE__ */ React18.createElement("p", { className: "text-xs text-[#666666] mt-0.5" }, profile.title, " \u2022 ", profile.location))), /* @__PURE__ */ React18.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React18.createElement("div", { className: "text-right hidden sm:block" }, /* @__PURE__ */ React18.createElement("p", { className: "text-xs font-semibold text-[#111111]" }, isSupabase ? "Supabase Cloud Sync" : "Local Persistence Engine"), /* @__PURE__ */ React18.createElement("p", { className: "text-[11px] text-[#666666]" }, isSupabase ? "PostgreSQL & Storage Active" : "Synced in LocalStorage")), /* @__PURE__ */ React18.createElement(
    "button",
    {
      onClick: onOpenSupabaseModal,
      className: "px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider border border-[#E5E5E5] bg-[#F9F9F9] hover:bg-[#F3F3F3] text-[#111111] transition-colors"
    },
    isSupabase ? "Configure Backend" : "Connect Supabase"
  ))), /* @__PURE__ */ React18.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4" }, stats.map((item, idx) => /* @__PURE__ */ React18.createElement(
    "div",
    {
      key: idx,
      onClick: () => onNavigateTab(item.tab),
      className: `p-5 rounded-2xl border transition-all cursor-pointer ${item.highlight ? "bg-red-50 border-red-200 hover:border-red-400" : "bg-white border-[#E5E5E5] hover:border-[#111111]"}`
    },
    /* @__PURE__ */ React18.createElement("div", { className: "flex items-center justify-between mb-2" }, /* @__PURE__ */ React18.createElement("svg", { className: `w-5 h-5 ${item.highlight ? "text-red-600" : "text-[#888888]"}`, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React18.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: item.icon })), /* @__PURE__ */ React18.createElement("span", { className: "text-[10px] font-bold uppercase tracking-wider text-[#888888]" }, "Manage")),
    /* @__PURE__ */ React18.createElement("div", { className: `text-2xl font-extrabold ${item.highlight ? "text-red-700" : "text-[#111111]"}` }, item.count),
    /* @__PURE__ */ React18.createElement("div", { className: "text-xs font-medium text-[#666666] truncate mt-1" }, item.label)
  ))), /* @__PURE__ */ React18.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8" }, /* @__PURE__ */ React18.createElement("div", { className: "lg:col-span-5 bg-white rounded-2xl border border-[#E5E5E5] p-6 shadow-sm" }, /* @__PURE__ */ React18.createElement("h3", { className: "text-base font-bold text-[#111111] mb-4" }, "Quick Management"), /* @__PURE__ */ React18.createElement("div", { className: "grid grid-cols-2 gap-3" }, /* @__PURE__ */ React18.createElement(
    "button",
    {
      onClick: () => onNavigateTab("profile"),
      className: "p-3 text-left rounded-xl bg-[#F9F9F9] hover:bg-[#F3F3F3] border border-[#E5E5E5] transition-colors"
    },
    /* @__PURE__ */ React18.createElement("p", { className: "text-xs font-bold text-[#111111]" }, "Profile & Photo"),
    /* @__PURE__ */ React18.createElement("p", { className: "text-[11px] text-[#666666] mt-0.5" }, "Edit bio, avatar, links")
  ), /* @__PURE__ */ React18.createElement(
    "button",
    {
      onClick: () => onNavigateTab("projects"),
      className: "p-3 text-left rounded-xl bg-[#F9F9F9] hover:bg-[#F3F3F3] border border-[#E5E5E5] transition-colors"
    },
    /* @__PURE__ */ React18.createElement("p", { className: "text-xs font-bold text-[#111111]" }, "Projects"),
    /* @__PURE__ */ React18.createElement("p", { className: "text-[11px] text-[#666666] mt-0.5" }, "StudyMate & TRICITY")
  ), /* @__PURE__ */ React18.createElement(
    "button",
    {
      onClick: () => onNavigateTab("resume"),
      className: "p-3 text-left rounded-xl bg-[#F9F9F9] hover:bg-[#F3F3F3] border border-[#E5E5E5] transition-colors"
    },
    /* @__PURE__ */ React18.createElement("p", { className: "text-xs font-bold text-[#111111]" }, "Resume PDF"),
    /* @__PURE__ */ React18.createElement("p", { className: "text-[11px] text-[#666666] mt-0.5" }, "Upload or update CV")
  ), /* @__PURE__ */ React18.createElement(
    "button",
    {
      onClick: () => onNavigateTab("messages"),
      className: "p-3 text-left rounded-xl bg-[#F9F9F9] hover:bg-[#F3F3F3] border border-[#E5E5E5] transition-colors"
    },
    /* @__PURE__ */ React18.createElement("p", { className: "text-xs font-bold text-[#111111]" }, "Messages"),
    /* @__PURE__ */ React18.createElement("p", { className: "text-[11px] text-[#666666] mt-0.5" }, unreadCount, " unread submissions")
  ))), /* @__PURE__ */ React18.createElement("div", { className: "lg:col-span-7 bg-white rounded-2xl border border-[#E5E5E5] p-6 shadow-sm flex flex-col justify-between" }, /* @__PURE__ */ React18.createElement("div", null, /* @__PURE__ */ React18.createElement("div", { className: "flex items-center justify-between mb-4" }, /* @__PURE__ */ React18.createElement("h3", { className: "text-base font-bold text-[#111111]" }, "Recent Contact Messages"), /* @__PURE__ */ React18.createElement(
    "button",
    {
      onClick: () => onNavigateTab("messages"),
      className: "text-xs font-semibold text-[#111111] hover:underline"
    },
    "View All Messages \u2192"
  )), (messages || []).length === 0 ? /* @__PURE__ */ React18.createElement("p", { className: "text-xs text-[#888888] py-8 text-center" }, "No contact messages received yet.") : /* @__PURE__ */ React18.createElement("div", { className: "divide-y divide-neutral-100" }, (messages || []).slice(0, 3).map((msg) => /* @__PURE__ */ React18.createElement("div", { key: msg.id, className: "py-3 flex items-start justify-between gap-4" }, /* @__PURE__ */ React18.createElement("div", { className: "min-w-0" }, /* @__PURE__ */ React18.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React18.createElement("span", { className: "text-xs font-bold text-[#111111] truncate" }, msg.name), !msg.read && /* @__PURE__ */ React18.createElement("span", { className: "w-2 h-2 rounded-full bg-red-600 shrink-0" }), /* @__PURE__ */ React18.createElement("span", { className: "text-[10px] text-[#888888] truncate" }, msg.email)), /* @__PURE__ */ React18.createElement("p", { className: "text-xs text-[#444444] font-medium truncate mt-0.5" }, msg.subject), /* @__PURE__ */ React18.createElement("p", { className: "text-[11px] text-[#777777] line-clamp-1" }, msg.message)), /* @__PURE__ */ React18.createElement("span", { className: "text-[10px] text-neutral-400 shrink-0 font-mono" }, new Date(msg.timestamp).toLocaleDateString()))))), /* @__PURE__ */ React18.createElement("div", { className: "pt-4 border-t border-[#E5E5E5] flex items-center justify-between text-xs text-[#666666]" }, /* @__PURE__ */ React18.createElement("span", null, "Form submissions are automatically synchronized."), /* @__PURE__ */ React18.createElement(
    "button",
    {
      onClick: () => onNavigateTab("messages"),
      className: "text-xs font-bold text-[#111111]"
    },
    "Open Inbox"
  )))));
}

// src/admin/ProfileManager.jsx
import React19, { useState as useState7 } from "react";
function ProfileManager({ onShowToast }) {
  const { profile, updateProfile } = usePortfolio();
  const [formData, setFormData] = useState7({
    name: profile.name || "",
    title: profile.title || "",
    tagline: profile.tagline || "",
    location: profile.location || "",
    email: profile.email || "",
    phone: profile.phone || "",
    linkedin: profile.linkedin || "",
    github: profile.github || "",
    bio: profile.bio || "",
    avatarUrl: profile.avatarUrl || "",
    interests: (profile.interests || []).join(", ")
  });
  const [uploading, setUploading] = useState7(false);
  const [saving, setSaving] = useState7(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      if (onShowToast) onShowToast("Please select a valid image file (JPG, PNG, WebP)", "error");
      return;
    }
    setUploading(true);
    try {
      const res = await uploadAsset("portfolio-assets", file, "profile_avatar");
      if (res.success) {
        setFormData((prev) => ({ ...prev, avatarUrl: res.url }));
        if (onShowToast) onShowToast("Profile picture uploaded successfully!", "success");
      } else {
        if (onShowToast) onShowToast("Failed to upload image.", "error");
      }
    } catch (err) {
      console.error("Avatar upload failed:", err);
      if (onShowToast) onShowToast("Error uploading picture.", "error");
    } finally {
      setUploading(false);
    }
  };
  const handleRemoveAvatar = () => {
    setFormData((prev) => ({ ...prev, avatarUrl: "" }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const parsedInterests = formData.interests.split(",").map((i) => i.trim()).filter(Boolean);
      const updated = {
        ...profile,
        name: formData.name.trim(),
        title: formData.title.trim(),
        tagline: formData.tagline.trim(),
        location: formData.location.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        linkedin: formData.linkedin.trim(),
        github: formData.github.trim(),
        bio: formData.bio.trim(),
        avatarUrl: formData.avatarUrl,
        interests: parsedInterests
      };
      await updateProfile(updated);
      if (onShowToast) onShowToast("Profile information updated and published!", "success");
    } catch (err) {
      console.error("Update profile error:", err);
      if (onShowToast) onShowToast("Failed to update profile.", "error");
    } finally {
      setSaving(false);
    }
  };
  return /* @__PURE__ */ React19.createElement("div", { className: "bg-white rounded-2xl border border-[#E5E5E5] p-6 sm:p-8 shadow-sm animate-fade-in" }, /* @__PURE__ */ React19.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#E5E5E5] gap-4" }, /* @__PURE__ */ React19.createElement("div", null, /* @__PURE__ */ React19.createElement("h2", { className: "text-xl sm:text-2xl font-bold text-[#111111] tracking-tight" }, "Profile Management"), /* @__PURE__ */ React19.createElement("p", { className: "text-xs text-[#666666] mt-1" }, "Update your biography, personal details, professional title, and profile picture.")), /* @__PURE__ */ React19.createElement(
    "button",
    {
      onClick: handleSubmit,
      disabled: saving,
      className: "inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 transition-all disabled:opacity-50"
    },
    saving ? /* @__PURE__ */ React19.createElement(React19.Fragment, null, /* @__PURE__ */ React19.createElement("svg", { className: "w-4 h-4 animate-spin", fill: "none", viewBox: "0 0 24 24" }, /* @__PURE__ */ React19.createElement("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), /* @__PURE__ */ React19.createElement("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })), /* @__PURE__ */ React19.createElement("span", null, "Saving Changes...")) : /* @__PURE__ */ React19.createElement(React19.Fragment, null, /* @__PURE__ */ React19.createElement("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React19.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 13l4 4L19 7" })), /* @__PURE__ */ React19.createElement("span", null, "Save Changes"))
  )), /* @__PURE__ */ React19.createElement("form", { onSubmit: handleSubmit, className: "space-y-8" }, /* @__PURE__ */ React19.createElement("div", { className: "p-6 rounded-2xl bg-[#F9F9F9] border border-[#E5E5E5]" }, /* @__PURE__ */ React19.createElement("h3", { className: "text-xs uppercase tracking-wider font-bold text-[#111111] mb-4" }, "Profile Picture"), /* @__PURE__ */ React19.createElement("div", { className: "flex flex-col sm:flex-row items-center gap-6" }, /* @__PURE__ */ React19.createElement("div", { className: "w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-white border-2 border-[#111111] flex items-center justify-center shrink-0 shadow-sm" }, formData.avatarUrl ? /* @__PURE__ */ React19.createElement(
    "img",
    {
      src: formData.avatarUrl,
      alt: "Profile Preview",
      className: "w-full h-full object-cover"
    }
  ) : /* @__PURE__ */ React19.createElement("div", { className: "text-center font-bold text-neutral-400" }, /* @__PURE__ */ React19.createElement("span", { className: "text-xl" }, "PM"), /* @__PURE__ */ React19.createElement("span", { className: "block text-[10px]" }, "No Photo"))), /* @__PURE__ */ React19.createElement("div", { className: "flex-1 space-y-3 text-center sm:text-left" }, /* @__PURE__ */ React19.createElement("div", { className: "flex flex-wrap items-center gap-3 justify-center sm:justify-start" }, /* @__PURE__ */ React19.createElement("label", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 cursor-pointer transition-all" }, /* @__PURE__ */ React19.createElement("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React19.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" })), /* @__PURE__ */ React19.createElement("span", null, uploading ? "Uploading..." : "Upload New Photo"), /* @__PURE__ */ React19.createElement(
    "input",
    {
      type: "file",
      accept: "image/*",
      onChange: handleAvatarUpload,
      disabled: uploading,
      className: "hidden"
    }
  )), formData.avatarUrl && /* @__PURE__ */ React19.createElement(
    "button",
    {
      type: "button",
      onClick: handleRemoveAvatar,
      className: "px-4 py-2 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 border border-red-200 transition-colors"
    },
    "Remove Photo"
  )), /* @__PURE__ */ React19.createElement("p", { className: "text-[11px] text-[#666666]" }, "Supported formats: PNG, JPG, JPEG, WebP. Recommended: Square ratio, clean professional portrait.")))), /* @__PURE__ */ React19.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6" }, /* @__PURE__ */ React19.createElement("div", null, /* @__PURE__ */ React19.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Full Name"), /* @__PURE__ */ React19.createElement(
    "input",
    {
      type: "text",
      name: "name",
      value: formData.name,
      onChange: handleChange,
      required: true,
      className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white"
    }
  )), /* @__PURE__ */ React19.createElement("div", null, /* @__PURE__ */ React19.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Professional Title"), /* @__PURE__ */ React19.createElement(
    "input",
    {
      type: "text",
      name: "title",
      value: formData.title,
      onChange: handleChange,
      required: true,
      className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white"
    }
  )), /* @__PURE__ */ React19.createElement("div", null, /* @__PURE__ */ React19.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Hero Tagline"), /* @__PURE__ */ React19.createElement(
    "input",
    {
      type: "text",
      name: "tagline",
      value: formData.tagline,
      onChange: handleChange,
      className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white"
    }
  )), /* @__PURE__ */ React19.createElement("div", null, /* @__PURE__ */ React19.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Location"), /* @__PURE__ */ React19.createElement(
    "input",
    {
      type: "text",
      name: "location",
      value: formData.location,
      onChange: handleChange,
      className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white"
    }
  )), /* @__PURE__ */ React19.createElement("div", null, /* @__PURE__ */ React19.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Email Address"), /* @__PURE__ */ React19.createElement(
    "input",
    {
      type: "email",
      name: "email",
      value: formData.email,
      onChange: handleChange,
      required: true,
      className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white"
    }
  )), /* @__PURE__ */ React19.createElement("div", null, /* @__PURE__ */ React19.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Phone Number"), /* @__PURE__ */ React19.createElement(
    "input",
    {
      type: "text",
      name: "phone",
      value: formData.phone,
      onChange: handleChange,
      className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white"
    }
  )), /* @__PURE__ */ React19.createElement("div", null, /* @__PURE__ */ React19.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "LinkedIn URL"), /* @__PURE__ */ React19.createElement(
    "input",
    {
      type: "url",
      name: "linkedin",
      value: formData.linkedin,
      onChange: handleChange,
      className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white"
    }
  )), /* @__PURE__ */ React19.createElement("div", null, /* @__PURE__ */ React19.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "GitHub URL"), /* @__PURE__ */ React19.createElement(
    "input",
    {
      type: "url",
      name: "github",
      value: formData.github,
      onChange: handleChange,
      className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white"
    }
  ))), /* @__PURE__ */ React19.createElement("div", null, /* @__PURE__ */ React19.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "About Me / Complete Biography"), /* @__PURE__ */ React19.createElement(
    "textarea",
    {
      name: "bio",
      rows: 5,
      value: formData.bio,
      onChange: handleChange,
      required: true,
      className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white resize-y"
    }
  )), /* @__PURE__ */ React19.createElement("div", null, /* @__PURE__ */ React19.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Core Interests (comma-separated)"), /* @__PURE__ */ React19.createElement(
    "input",
    {
      type: "text",
      name: "interests",
      value: formData.interests,
      onChange: handleChange,
      className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white",
      placeholder: "Data Analytics, Python, Machine Learning, Artificial Intelligence, Data Visualization, Problem Solving"
    }
  )), /* @__PURE__ */ React19.createElement("div", { className: "pt-6 border-t border-[#E5E5E5] flex justify-end" }, /* @__PURE__ */ React19.createElement(
    "button",
    {
      type: "submit",
      disabled: saving,
      className: "inline-flex items-center gap-2 px-8 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 transition-all disabled:opacity-50"
    },
    saving ? "Saving Changes..." : "Save & Publish Profile"
  ))));
}

// src/admin/EducationManager.jsx
import React21, { useState as useState8 } from "react";

// src/components/Modal.jsx
import React20, { useEffect as useEffect5 } from "react";
function Modal({ isOpen, onClose, title, children, maxWidth = "max-w-lg" }) {
  useEffect5(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  return /* @__PURE__ */ React20.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto" }, /* @__PURE__ */ React20.createElement(
    "div",
    {
      className: "fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-fade-in",
      onClick: onClose
    }
  ), /* @__PURE__ */ React20.createElement("div", { className: `relative bg-white rounded-xl shadow-2xl border border-[#E5E5E5] w-full ${maxWidth} z-10 overflow-hidden my-8 animate-fade-in` }, /* @__PURE__ */ React20.createElement("div", { className: "flex items-center justify-between px-6 py-4 border-b border-[#E5E5E5]" }, /* @__PURE__ */ React20.createElement("h3", { className: "text-lg font-semibold text-[#111111]" }, title), /* @__PURE__ */ React20.createElement(
    "button",
    {
      onClick: onClose,
      className: "text-neutral-400 hover:text-[#111111] transition-colors p-1 rounded-md",
      "aria-label": "Close modal"
    },
    /* @__PURE__ */ React20.createElement("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React20.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }))
  )), /* @__PURE__ */ React20.createElement("div", { className: "p-6 max-h-[80vh] overflow-y-auto" }, children)));
}

// src/admin/EducationManager.jsx
function EducationManager({ onShowToast }) {
  const { education, addEducation, updateEducation, deleteEducation } = usePortfolio();
  const [isModalOpen, setIsModalOpen] = useState8(false);
  const [editingItem, setEditingItem] = useState8(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState8(null);
  const [formData, setFormData] = useState8({
    degree: "",
    institution: "",
    period: "",
    score: "",
    description: ""
  });
  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      degree: "",
      institution: "",
      period: "",
      score: "",
      description: ""
    });
    setIsModalOpen(true);
  };
  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      degree: item.degree || "",
      institution: item.institution || "",
      period: item.period || "",
      score: item.score || "",
      description: item.description || ""
    });
    setIsModalOpen(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.degree.trim() || !formData.institution.trim()) {
      if (onShowToast) onShowToast("Degree and Institution are required", "error");
      return;
    }
    try {
      if (editingItem) {
        await updateEducation(editingItem.id, formData);
        if (onShowToast) onShowToast("Education entry updated successfully!", "success");
      } else {
        await addEducation(formData);
        if (onShowToast) onShowToast("New education entry added!", "success");
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error saving education:", err);
      if (onShowToast) onShowToast("Failed to save education entry", "error");
    }
  };
  const handleConfirmDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      await deleteEducation(deleteConfirmId);
      if (onShowToast) onShowToast("Education entry deleted successfully", "success");
    } catch (err) {
      console.error("Error deleting education:", err);
      if (onShowToast) onShowToast("Failed to delete education entry", "error");
    } finally {
      setDeleteConfirmId(null);
    }
  };
  return /* @__PURE__ */ React21.createElement("div", { className: "bg-white rounded-2xl border border-[#E5E5E5] p-6 sm:p-8 shadow-sm animate-fade-in" }, /* @__PURE__ */ React21.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#E5E5E5] gap-4" }, /* @__PURE__ */ React21.createElement("div", null, /* @__PURE__ */ React21.createElement("h2", { className: "text-xl sm:text-2xl font-bold text-[#111111] tracking-tight" }, "Education Management"), /* @__PURE__ */ React21.createElement("p", { className: "text-xs text-[#666666] mt-1" }, "Manage degrees, institutions, study periods, CGPA, and percentages displayed in the timeline.")), /* @__PURE__ */ React21.createElement(
    "button",
    {
      onClick: handleOpenAdd,
      className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 transition-all shadow-sm"
    },
    /* @__PURE__ */ React21.createElement("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React21.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 4v16m8-8H4" })),
    /* @__PURE__ */ React21.createElement("span", null, "Add Education")
  )), /* @__PURE__ */ React21.createElement("div", { className: "space-y-4" }, (education || []).map((item, idx) => /* @__PURE__ */ React21.createElement(
    "div",
    {
      key: item.id || idx,
      className: "p-5 rounded-xl border border-[#E5E5E5] hover:border-[#111111] transition-all bg-[#FAFAFA] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    },
    /* @__PURE__ */ React21.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ React21.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React21.createElement("span", { className: "text-[11px] font-bold uppercase tracking-wider bg-[#E5E5E5] text-[#111111] px-2.5 py-0.5 rounded-full" }, item.period), /* @__PURE__ */ React21.createElement("span", { className: "text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 px-2.5 py-0.5 rounded-full" }, item.score)), /* @__PURE__ */ React21.createElement("h3", { className: "text-base font-bold text-[#111111]" }, item.degree), /* @__PURE__ */ React21.createElement("p", { className: "text-xs font-medium text-[#666666]" }, item.institution), item.description && /* @__PURE__ */ React21.createElement("p", { className: "text-xs text-[#555555] line-clamp-1 mt-1" }, item.description)),
    /* @__PURE__ */ React21.createElement("div", { className: "flex items-center gap-2 shrink-0" }, /* @__PURE__ */ React21.createElement(
      "button",
      {
        onClick: () => handleOpenEdit(item),
        className: "px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#111111] bg-white border border-[#E5E5E5] hover:bg-[#F3F3F3] transition-colors"
      },
      "Edit"
    ), /* @__PURE__ */ React21.createElement(
      "button",
      {
        onClick: () => setDeleteConfirmId(item.id),
        className: "px-3.5 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 border border-red-200 transition-colors"
      },
      "Delete"
    ))
  ))), /* @__PURE__ */ React21.createElement(
    Modal,
    {
      isOpen: isModalOpen,
      onClose: () => setIsModalOpen(false),
      title: editingItem ? "Edit Education Entry" : "Add New Education Entry"
    },
    /* @__PURE__ */ React21.createElement("form", { onSubmit: handleSubmit, className: "space-y-4" }, /* @__PURE__ */ React21.createElement("div", null, /* @__PURE__ */ React21.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Degree / Qualification ", /* @__PURE__ */ React21.createElement("span", { className: "text-red-500" }, "*")), /* @__PURE__ */ React21.createElement(
      "input",
      {
        type: "text",
        value: formData.degree,
        onChange: (e) => setFormData({ ...formData, degree: e.target.value }),
        required: true,
        placeholder: "e.g. B.Tech \u2013 Data Science",
        className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white"
      }
    )), /* @__PURE__ */ React21.createElement("div", null, /* @__PURE__ */ React21.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Institution / School ", /* @__PURE__ */ React21.createElement("span", { className: "text-red-500" }, "*")), /* @__PURE__ */ React21.createElement(
      "input",
      {
        type: "text",
        value: formData.institution,
        onChange: (e) => setFormData({ ...formData, institution: e.target.value }),
        required: true,
        placeholder: "e.g. Kakatiya Institute of Technology and Science (KITSW), Warangal",
        className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white"
      }
    )), /* @__PURE__ */ React21.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ React21.createElement("div", null, /* @__PURE__ */ React21.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Period / Year ", /* @__PURE__ */ React21.createElement("span", { className: "text-red-500" }, "*")), /* @__PURE__ */ React21.createElement(
      "input",
      {
        type: "text",
        value: formData.period,
        onChange: (e) => setFormData({ ...formData, period: e.target.value }),
        required: true,
        placeholder: "e.g. 2024\u2013Present",
        className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white"
      }
    )), /* @__PURE__ */ React21.createElement("div", null, /* @__PURE__ */ React21.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "CGPA / Percentage ", /* @__PURE__ */ React21.createElement("span", { className: "text-red-500" }, "*")), /* @__PURE__ */ React21.createElement(
      "input",
      {
        type: "text",
        value: formData.score,
        onChange: (e) => setFormData({ ...formData, score: e.target.value }),
        required: true,
        placeholder: "e.g. CGPA: 8.8 or 96.9%",
        className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white"
      }
    ))), /* @__PURE__ */ React21.createElement("div", null, /* @__PURE__ */ React21.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Description / Specialization"), /* @__PURE__ */ React21.createElement(
      "textarea",
      {
        rows: 3,
        value: formData.description,
        onChange: (e) => setFormData({ ...formData, description: e.target.value }),
        placeholder: "Course highlights, key subjects, or distinctions...",
        className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white resize-y"
      }
    )), /* @__PURE__ */ React21.createElement("div", { className: "pt-4 flex justify-end gap-3 border-t border-[#E5E5E5]" }, /* @__PURE__ */ React21.createElement(
      "button",
      {
        type: "button",
        onClick: () => setIsModalOpen(false),
        className: "px-4 py-2 rounded-lg text-xs font-semibold text-[#666666] hover:bg-[#F3F3F3]"
      },
      "Cancel"
    ), /* @__PURE__ */ React21.createElement(
      "button",
      {
        type: "submit",
        className: "px-6 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800"
      },
      editingItem ? "Save Changes" : "Add Education"
    )))
  ), /* @__PURE__ */ React21.createElement(
    Modal,
    {
      isOpen: Boolean(deleteConfirmId),
      onClose: () => setDeleteConfirmId(null),
      title: "Confirm Deletion",
      maxWidth: "max-w-md"
    },
    /* @__PURE__ */ React21.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React21.createElement("p", { className: "text-sm text-[#444444]" }, "Are you sure you want to delete this education entry? This change will be permanently saved."), /* @__PURE__ */ React21.createElement("div", { className: "flex justify-end gap-3 pt-2" }, /* @__PURE__ */ React21.createElement(
      "button",
      {
        onClick: () => setDeleteConfirmId(null),
        className: "px-4 py-2 rounded-lg text-xs font-semibold text-[#666666] hover:bg-[#F3F3F3]"
      },
      "Cancel"
    ), /* @__PURE__ */ React21.createElement(
      "button",
      {
        onClick: handleConfirmDelete,
        className: "px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700"
      },
      "Delete Entry"
    )))
  ));
}

// src/admin/SkillsManager.jsx
import React22, { useState as useState9 } from "react";
function SkillsManager({ onShowToast }) {
  const { skills, addSkill, updateSkill, deleteSkill } = usePortfolio();
  const [isModalOpen, setIsModalOpen] = useState9(false);
  const [editingItem, setEditingItem] = useState9(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState9(null);
  const [formData, setFormData] = useState9({
    name: "",
    category: "",
    icon: "code",
    description: ""
  });
  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      category: "Data & Analytics",
      icon: "code",
      description: ""
    });
    setIsModalOpen(true);
  };
  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name || "",
      category: item.category || "",
      icon: item.icon || "code",
      description: item.description || ""
    });
    setIsModalOpen(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      if (onShowToast) onShowToast("Skill name is required", "error");
      return;
    }
    try {
      if (editingItem) {
        await updateSkill(editingItem.id, formData);
        if (onShowToast) onShowToast("Skill updated successfully!", "success");
      } else {
        await addSkill(formData);
        if (onShowToast) onShowToast("New skill added!", "success");
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error saving skill:", err);
      if (onShowToast) onShowToast("Failed to save skill", "error");
    }
  };
  const handleConfirmDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      await deleteSkill(deleteConfirmId);
      if (onShowToast) onShowToast("Skill deleted successfully", "success");
    } catch (err) {
      console.error("Error deleting skill:", err);
      if (onShowToast) onShowToast("Failed to delete skill", "error");
    } finally {
      setDeleteConfirmId(null);
    }
  };
  return /* @__PURE__ */ React22.createElement("div", { className: "bg-white rounded-2xl border border-[#E5E5E5] p-6 sm:p-8 shadow-sm animate-fade-in" }, /* @__PURE__ */ React22.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#E5E5E5] gap-4" }, /* @__PURE__ */ React22.createElement("div", null, /* @__PURE__ */ React22.createElement("h2", { className: "text-xl sm:text-2xl font-bold text-[#111111] tracking-tight" }, "Skills Management"), /* @__PURE__ */ React22.createElement("p", { className: "text-xs text-[#666666] mt-1" }, "Manage your technical competencies, categories, descriptions, and icons.")), /* @__PURE__ */ React22.createElement(
    "button",
    {
      onClick: handleOpenAdd,
      className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 transition-all shadow-sm"
    },
    /* @__PURE__ */ React22.createElement("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React22.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 4v16m8-8H4" })),
    /* @__PURE__ */ React22.createElement("span", null, "Add Skill")
  )), /* @__PURE__ */ React22.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" }, (skills || []).map((skill, idx) => /* @__PURE__ */ React22.createElement(
    "div",
    {
      key: skill.id || idx,
      className: "p-5 rounded-xl border border-[#E5E5E5] hover:border-[#111111] bg-[#FAFAFA] flex flex-col justify-between transition-all"
    },
    /* @__PURE__ */ React22.createElement("div", null, /* @__PURE__ */ React22.createElement("div", { className: "flex items-center justify-between mb-2" }, /* @__PURE__ */ React22.createElement("span", { className: "text-sm font-bold text-[#111111]" }, skill.name), /* @__PURE__ */ React22.createElement("span", { className: "text-[10px] uppercase tracking-wider font-semibold bg-[#E5E5E5] text-[#333333] px-2 py-0.5 rounded" }, skill.category || "Skill")), /* @__PURE__ */ React22.createElement("p", { className: "text-xs text-[#555555] line-clamp-2" }, skill.description)),
    /* @__PURE__ */ React22.createElement("div", { className: "pt-4 mt-4 border-t border-[#E5E5E5] flex items-center justify-between" }, /* @__PURE__ */ React22.createElement("span", { className: "text-[11px] text-neutral-400 font-mono" }, "Icon: ", skill.icon), /* @__PURE__ */ React22.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React22.createElement(
      "button",
      {
        onClick: () => handleOpenEdit(skill),
        className: "px-3 py-1 rounded-md text-xs font-semibold text-[#111111] bg-white border border-[#E5E5E5] hover:bg-[#F3F3F3]"
      },
      "Edit"
    ), /* @__PURE__ */ React22.createElement(
      "button",
      {
        onClick: () => setDeleteConfirmId(skill.id),
        className: "px-3 py-1 rounded-md text-xs font-semibold text-red-600 hover:bg-red-50 border border-red-200"
      },
      "Delete"
    )))
  ))), /* @__PURE__ */ React22.createElement(
    Modal,
    {
      isOpen: isModalOpen,
      onClose: () => setIsModalOpen(false),
      title: editingItem ? "Edit Skill" : "Add New Skill"
    },
    /* @__PURE__ */ React22.createElement("form", { onSubmit: handleSubmit, className: "space-y-4" }, /* @__PURE__ */ React22.createElement("div", null, /* @__PURE__ */ React22.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Skill Name ", /* @__PURE__ */ React22.createElement("span", { className: "text-red-500" }, "*")), /* @__PURE__ */ React22.createElement(
      "input",
      {
        type: "text",
        value: formData.name,
        onChange: (e) => setFormData({ ...formData, name: e.target.value }),
        required: true,
        placeholder: "e.g. Python, SQL, Tableau",
        className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white"
      }
    )), /* @__PURE__ */ React22.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ React22.createElement("div", null, /* @__PURE__ */ React22.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Category"), /* @__PURE__ */ React22.createElement(
      "input",
      {
        type: "text",
        value: formData.category,
        onChange: (e) => setFormData({ ...formData, category: e.target.value }),
        placeholder: "e.g. Programming, BI",
        className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white"
      }
    )), /* @__PURE__ */ React22.createElement("div", null, /* @__PURE__ */ React22.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Icon Identifier"), /* @__PURE__ */ React22.createElement(
      "select",
      {
        value: formData.icon,
        onChange: (e) => setFormData({ ...formData, icon: e.target.value }),
        className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white"
      },
      /* @__PURE__ */ React22.createElement("option", { value: "code" }, "Code / Terminal"),
      /* @__PURE__ */ React22.createElement("option", { value: "bar-chart-2" }, "Bar Chart / Tableau"),
      /* @__PURE__ */ React22.createElement("option", { value: "pie-chart" }, "Pie Chart / Visualization"),
      /* @__PURE__ */ React22.createElement("option", { value: "cpu" }, "CPU / Java / Systems"),
      /* @__PURE__ */ React22.createElement("option", { value: "brain" }, "Brain / Problem Solving"),
      /* @__PURE__ */ React22.createElement("option", { value: "layout" }, "Layout / UI"),
      /* @__PURE__ */ React22.createElement("option", { value: "database" }, "Database / SQL")
    ))), /* @__PURE__ */ React22.createElement("div", null, /* @__PURE__ */ React22.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Description / Application"), /* @__PURE__ */ React22.createElement(
      "textarea",
      {
        rows: 3,
        value: formData.description,
        onChange: (e) => setFormData({ ...formData, description: e.target.value }),
        placeholder: "How you apply this skill in real projects...",
        className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white resize-y"
      }
    )), /* @__PURE__ */ React22.createElement("div", { className: "pt-4 flex justify-end gap-3 border-t border-[#E5E5E5]" }, /* @__PURE__ */ React22.createElement(
      "button",
      {
        type: "button",
        onClick: () => setIsModalOpen(false),
        className: "px-4 py-2 rounded-lg text-xs font-semibold text-[#666666] hover:bg-[#F3F3F3]"
      },
      "Cancel"
    ), /* @__PURE__ */ React22.createElement(
      "button",
      {
        type: "submit",
        className: "px-6 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800"
      },
      editingItem ? "Save Changes" : "Add Skill"
    )))
  ), /* @__PURE__ */ React22.createElement(
    Modal,
    {
      isOpen: Boolean(deleteConfirmId),
      onClose: () => setDeleteConfirmId(null),
      title: "Confirm Deletion",
      maxWidth: "max-w-md"
    },
    /* @__PURE__ */ React22.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React22.createElement("p", { className: "text-sm text-[#444444]" }, "Are you sure you want to remove this skill from your portfolio?"), /* @__PURE__ */ React22.createElement("div", { className: "flex justify-end gap-3 pt-2" }, /* @__PURE__ */ React22.createElement(
      "button",
      {
        onClick: () => setDeleteConfirmId(null),
        className: "px-4 py-2 rounded-lg text-xs font-semibold text-[#666666] hover:bg-[#F3F3F3]"
      },
      "Cancel"
    ), /* @__PURE__ */ React22.createElement(
      "button",
      {
        onClick: handleConfirmDelete,
        className: "px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700"
      },
      "Delete Skill"
    )))
  ));
}

// src/admin/ProjectsManager.jsx
import React23, { useState as useState10 } from "react";
function ProjectsManager({ onShowToast }) {
  const { projects, addProject, updateProject, deleteProject } = usePortfolio();
  const [isModalOpen, setIsModalOpen] = useState10(false);
  const [editingItem, setEditingItem] = useState10(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState10(null);
  const [uploadingImage, setUploadingImage] = useState10(false);
  const [formData, setFormData] = useState10({
    title: "",
    description: "",
    technologies: "",
    githubUrl: "",
    liveUrl: "",
    imageUrl: "",
    featured: true
  });
  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      description: "",
      technologies: "Python, Data Analytics, React",
      githubUrl: "https://github.com/manogna2902",
      liveUrl: "",
      imageUrl: "",
      featured: true
    });
    setIsModalOpen(true);
  };
  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || "",
      description: item.description || "",
      technologies: Array.isArray(item.technologies) ? item.technologies.join(", ") : item.technologies || "",
      githubUrl: item.githubUrl || "",
      liveUrl: item.liveUrl || "",
      imageUrl: item.imageUrl || "",
      featured: item.featured ?? true
    });
    setIsModalOpen(true);
  };
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const res = await uploadAsset("portfolio-assets", file, `project_${Date.now()}`);
      if (res.success) {
        setFormData((prev) => ({ ...prev, imageUrl: res.url }));
        if (onShowToast) onShowToast("Project screenshot uploaded!", "success");
      } else {
        if (onShowToast) onShowToast("Failed to upload image", "error");
      }
    } catch (err) {
      console.error("Error uploading screenshot:", err);
      if (onShowToast) onShowToast("Upload error", "error");
    } finally {
      setUploadingImage(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      if (onShowToast) onShowToast("Title and Description are required", "error");
      return;
    }
    if (formData.title.toLowerCase().includes("student data quality repair system")) {
      if (onShowToast) onShowToast("This project is excluded per specifications", "error");
      return;
    }
    const parsedTechs = formData.technologies.split(",").map((t) => t.trim()).filter(Boolean);
    const projectPayload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      technologies: parsedTechs,
      githubUrl: formData.githubUrl.trim(),
      liveUrl: formData.liveUrl.trim(),
      imageUrl: formData.imageUrl,
      featured: formData.featured
    };
    try {
      if (editingItem) {
        await updateProject(editingItem.id, projectPayload);
        if (onShowToast) onShowToast("Project details updated successfully!", "success");
      } else {
        await addProject(projectPayload);
        if (onShowToast) onShowToast("New project created successfully!", "success");
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error saving project:", err);
      if (onShowToast) onShowToast("Failed to save project", "error");
    }
  };
  const handleConfirmDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      await deleteProject(deleteConfirmId);
      if (onShowToast) onShowToast("Project deleted successfully", "success");
    } catch (err) {
      console.error("Error deleting project:", err);
      if (onShowToast) onShowToast("Failed to delete project", "error");
    } finally {
      setDeleteConfirmId(null);
    }
  };
  return /* @__PURE__ */ React23.createElement("div", { className: "bg-white rounded-2xl border border-[#E5E5E5] p-6 sm:p-8 shadow-sm animate-fade-in" }, /* @__PURE__ */ React23.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#E5E5E5] gap-4" }, /* @__PURE__ */ React23.createElement("div", null, /* @__PURE__ */ React23.createElement("h2", { className: "text-xl sm:text-2xl font-bold text-[#111111] tracking-tight" }, "Projects Management"), /* @__PURE__ */ React23.createElement("p", { className: "text-xs text-[#666666] mt-1" }, "Manage StudyMate, TRICITY, and other project cards, links, tech stacks, and screenshots.")), /* @__PURE__ */ React23.createElement(
    "button",
    {
      onClick: handleOpenAdd,
      className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 transition-all shadow-sm"
    },
    /* @__PURE__ */ React23.createElement("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React23.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 4v16m8-8H4" })),
    /* @__PURE__ */ React23.createElement("span", null, "Add Project")
  )), /* @__PURE__ */ React23.createElement("div", { className: "space-y-4" }, (projects || []).map((proj, idx) => /* @__PURE__ */ React23.createElement(
    "div",
    {
      key: proj.id || idx,
      className: "p-6 rounded-xl border border-[#E5E5E5] hover:border-[#111111] bg-[#FAFAFA] flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all"
    },
    /* @__PURE__ */ React23.createElement("div", { className: "space-y-2 max-w-2xl" }, /* @__PURE__ */ React23.createElement("div", { className: "flex items-center gap-2.5" }, /* @__PURE__ */ React23.createElement("span", { className: "text-xs font-bold text-[#111111] bg-white border border-[#E5E5E5] px-2.5 py-0.5 rounded-md" }, "Project 0", idx + 1), /* @__PURE__ */ React23.createElement("h3", { className: "text-lg font-bold text-[#111111]" }, proj.title), proj.featured && /* @__PURE__ */ React23.createElement("span", { className: "text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full" }, "Featured")), /* @__PURE__ */ React23.createElement("p", { className: "text-xs text-[#555555] line-clamp-2" }, proj.description), /* @__PURE__ */ React23.createElement("div", { className: "flex flex-wrap gap-1.5 pt-1" }, (proj.technologies || []).map((tech, tIdx) => /* @__PURE__ */ React23.createElement(
      "span",
      {
        key: tIdx,
        className: "text-[11px] font-medium bg-white text-[#444444] border border-[#E5E5E5] px-2 py-0.5 rounded"
      },
      tech
    )))),
    /* @__PURE__ */ React23.createElement("div", { className: "flex items-center gap-2 shrink-0" }, proj.githubUrl && /* @__PURE__ */ React23.createElement(
      "a",
      {
        href: proj.githubUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "p-2 rounded-lg text-[#666666] hover:text-[#111111] hover:bg-white border border-transparent hover:border-[#E5E5E5]",
        title: "View GitHub repository"
      },
      /* @__PURE__ */ React23.createElement("svg", { className: "w-4 h-4 fill-current", viewBox: "0 0 24 24" }, /* @__PURE__ */ React23.createElement("path", { d: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" }))
    ), /* @__PURE__ */ React23.createElement(
      "button",
      {
        onClick: () => handleOpenEdit(proj),
        className: "px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#111111] bg-white border border-[#E5E5E5] hover:bg-[#F3F3F3]"
      },
      "Edit"
    ), /* @__PURE__ */ React23.createElement(
      "button",
      {
        onClick: () => setDeleteConfirmId(proj.id),
        className: "px-3.5 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 border border-red-200"
      },
      "Delete"
    ))
  ))), /* @__PURE__ */ React23.createElement(
    Modal,
    {
      isOpen: isModalOpen,
      onClose: () => setIsModalOpen(false),
      title: editingItem ? "Edit Project Details" : "Add New Project",
      maxWidth: "max-w-2xl"
    },
    /* @__PURE__ */ React23.createElement("form", { onSubmit: handleSubmit, className: "space-y-4" }, /* @__PURE__ */ React23.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4" }, /* @__PURE__ */ React23.createElement("div", { className: "sm:col-span-2" }, /* @__PURE__ */ React23.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Project Title ", /* @__PURE__ */ React23.createElement("span", { className: "text-red-500" }, "*")), /* @__PURE__ */ React23.createElement(
      "input",
      {
        type: "text",
        value: formData.title,
        onChange: (e) => setFormData({ ...formData, title: e.target.value }),
        required: true,
        placeholder: "e.g. StudyMate or TRICITY",
        className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white"
      }
    )), /* @__PURE__ */ React23.createElement("div", null, /* @__PURE__ */ React23.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Feature on Public Site"), /* @__PURE__ */ React23.createElement(
      "select",
      {
        value: formData.featured ? "true" : "false",
        onChange: (e) => setFormData({ ...formData, featured: e.target.value === "true" }),
        className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white"
      },
      /* @__PURE__ */ React23.createElement("option", { value: "true" }, "Yes (Featured)"),
      /* @__PURE__ */ React23.createElement("option", { value: "false" }, "No (Standard)")
    ))), /* @__PURE__ */ React23.createElement("div", null, /* @__PURE__ */ React23.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Project Description ", /* @__PURE__ */ React23.createElement("span", { className: "text-red-500" }, "*")), /* @__PURE__ */ React23.createElement(
      "textarea",
      {
        rows: 4,
        value: formData.description,
        onChange: (e) => setFormData({ ...formData, description: e.target.value }),
        required: true,
        placeholder: "Detailed description of features, analytics problem solved, and technical architecture...",
        className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white resize-y"
      }
    )), /* @__PURE__ */ React23.createElement("div", null, /* @__PURE__ */ React23.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Technologies / Tags (comma-separated)"), /* @__PURE__ */ React23.createElement(
      "input",
      {
        type: "text",
        value: formData.technologies,
        onChange: (e) => setFormData({ ...formData, technologies: e.target.value }),
        placeholder: "Python, Tableau, React, SQLite, REST API",
        className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white"
      }
    )), /* @__PURE__ */ React23.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, /* @__PURE__ */ React23.createElement("div", null, /* @__PURE__ */ React23.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "GitHub Repository URL"), /* @__PURE__ */ React23.createElement(
      "input",
      {
        type: "url",
        value: formData.githubUrl,
        onChange: (e) => setFormData({ ...formData, githubUrl: e.target.value }),
        placeholder: "https://github.com/manogna2902/...",
        className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white"
      }
    )), /* @__PURE__ */ React23.createElement("div", null, /* @__PURE__ */ React23.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Live Demo URL (optional)"), /* @__PURE__ */ React23.createElement(
      "input",
      {
        type: "url",
        value: formData.liveUrl,
        onChange: (e) => setFormData({ ...formData, liveUrl: e.target.value }),
        placeholder: "https://...",
        className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white"
      }
    ))), /* @__PURE__ */ React23.createElement("div", { className: "p-4 rounded-xl bg-[#F9F9F9] border border-[#E5E5E5]" }, /* @__PURE__ */ React23.createElement("div", { className: "flex items-center justify-between mb-2" }, /* @__PURE__ */ React23.createElement("label", { className: "text-xs font-semibold uppercase tracking-wider text-[#333333]" }, "Project Screenshot / Mockup"), formData.imageUrl && /* @__PURE__ */ React23.createElement(
      "button",
      {
        type: "button",
        onClick: () => setFormData((prev) => ({ ...prev, imageUrl: "" })),
        className: "text-xs text-red-600 hover:underline"
      },
      "Clear Screenshot"
    )), /* @__PURE__ */ React23.createElement("div", { className: "flex items-center gap-4" }, /* @__PURE__ */ React23.createElement("label", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 cursor-pointer" }, /* @__PURE__ */ React23.createElement("span", null, uploadingImage ? "Uploading..." : "Upload Image"), /* @__PURE__ */ React23.createElement(
      "input",
      {
        type: "file",
        accept: "image/*",
        onChange: handleImageUpload,
        disabled: uploadingImage,
        className: "hidden"
      }
    )), /* @__PURE__ */ React23.createElement("span", { className: "text-xs text-[#666666] truncate max-w-xs" }, formData.imageUrl ? "Screenshot attached" : "No image chosen"))), /* @__PURE__ */ React23.createElement("div", { className: "pt-4 flex justify-end gap-3 border-t border-[#E5E5E5]" }, /* @__PURE__ */ React23.createElement(
      "button",
      {
        type: "button",
        onClick: () => setIsModalOpen(false),
        className: "px-4 py-2 rounded-lg text-xs font-semibold text-[#666666] hover:bg-[#F3F3F3]"
      },
      "Cancel"
    ), /* @__PURE__ */ React23.createElement(
      "button",
      {
        type: "submit",
        className: "px-6 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800"
      },
      editingItem ? "Save Changes" : "Create Project"
    )))
  ), /* @__PURE__ */ React23.createElement(
    Modal,
    {
      isOpen: Boolean(deleteConfirmId),
      onClose: () => setDeleteConfirmId(null),
      title: "Confirm Project Deletion",
      maxWidth: "max-w-md"
    },
    /* @__PURE__ */ React23.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React23.createElement("p", { className: "text-sm text-[#444444]" }, "Are you sure you want to permanently delete this project? This will immediately remove it from your portfolio."), /* @__PURE__ */ React23.createElement("div", { className: "flex justify-end gap-3 pt-2" }, /* @__PURE__ */ React23.createElement(
      "button",
      {
        onClick: () => setDeleteConfirmId(null),
        className: "px-4 py-2 rounded-lg text-xs font-semibold text-[#666666] hover:bg-[#F3F3F3]"
      },
      "Cancel"
    ), /* @__PURE__ */ React23.createElement(
      "button",
      {
        onClick: handleConfirmDelete,
        className: "px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700"
      },
      "Delete Project"
    )))
  ));
}

// src/admin/CertificationsManager.jsx
import React24, { useState as useState11 } from "react";
function CertificationsManager({ onShowToast }) {
  const { certifications, addCertification, updateCertification, deleteCertification } = usePortfolio();
  const [isModalOpen, setIsModalOpen] = useState11(false);
  const [editingItem, setEditingItem] = useState11(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState11(null);
  const [uploadingFile, setUploadingFile] = useState11(false);
  const [formData, setFormData] = useState11({
    title: "",
    issuer: "",
    issueDate: "",
    credentialUrl: "",
    fileUrl: "",
    description: ""
  });
  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      issuer: "",
      issueDate: "2024",
      credentialUrl: "",
      fileUrl: "",
      description: ""
    });
    setIsModalOpen(true);
  };
  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || "",
      issuer: item.issuer || "",
      issueDate: item.issueDate || "",
      credentialUrl: item.credentialUrl || "",
      fileUrl: item.fileUrl || "",
      description: item.description || ""
    });
    setIsModalOpen(true);
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingFile(true);
    try {
      const res = await uploadAsset("certificates", file, `certificate_${Date.now()}`);
      if (res.success) {
        setFormData((prev) => ({ ...prev, fileUrl: res.url }));
        if (onShowToast) onShowToast("Certificate document uploaded!", "success");
      } else {
        if (onShowToast) onShowToast("Failed to upload certificate", "error");
      }
    } catch (err) {
      console.error("Certificate upload error:", err);
      if (onShowToast) onShowToast("Upload error", "error");
    } finally {
      setUploadingFile(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.issuer.trim()) {
      if (onShowToast) onShowToast("Title and Issuer are required", "error");
      return;
    }
    try {
      if (editingItem) {
        await updateCertification(editingItem.id, formData);
        if (onShowToast) onShowToast("Certification updated successfully!", "success");
      } else {
        await addCertification(formData);
        if (onShowToast) onShowToast("New certification added!", "success");
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error saving certification:", err);
      if (onShowToast) onShowToast("Failed to save certification", "error");
    }
  };
  const handleConfirmDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      await deleteCertification(deleteConfirmId);
      if (onShowToast) onShowToast("Certification deleted successfully", "success");
    } catch (err) {
      console.error("Error deleting certification:", err);
      if (onShowToast) onShowToast("Failed to delete certification", "error");
    } finally {
      setDeleteConfirmId(null);
    }
  };
  return /* @__PURE__ */ React24.createElement("div", { className: "bg-white rounded-2xl border border-[#E5E5E5] p-6 sm:p-8 shadow-sm animate-fade-in" }, /* @__PURE__ */ React24.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#E5E5E5] gap-4" }, /* @__PURE__ */ React24.createElement("div", null, /* @__PURE__ */ React24.createElement("h2", { className: "text-xl sm:text-2xl font-bold text-[#111111] tracking-tight" }, "Certifications Management"), /* @__PURE__ */ React24.createElement("p", { className: "text-xs text-[#666666] mt-1" }, "Manage certifications like Hedera Certified Foundation (HCF), issuers, and upload certificate images or PDFs.")), /* @__PURE__ */ React24.createElement(
    "button",
    {
      onClick: handleOpenAdd,
      className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 transition-all shadow-sm"
    },
    /* @__PURE__ */ React24.createElement("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React24.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 4v16m8-8H4" })),
    /* @__PURE__ */ React24.createElement("span", null, "Add Certification")
  )), /* @__PURE__ */ React24.createElement("div", { className: "space-y-4" }, (certifications || []).map((cert, idx) => /* @__PURE__ */ React24.createElement(
    "div",
    {
      key: cert.id || idx,
      className: "p-5 rounded-xl border border-[#E5E5E5] hover:border-[#111111] bg-[#FAFAFA] flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
    },
    /* @__PURE__ */ React24.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ React24.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React24.createElement("span", { className: "text-[11px] font-bold uppercase tracking-wider bg-[#E5E5E5] text-[#111111] px-2.5 py-0.5 rounded-full" }, cert.issueDate || "Issued"), /* @__PURE__ */ React24.createElement("span", { className: "text-xs font-bold text-[#111111]" }, cert.issuer), cert.fileUrl && /* @__PURE__ */ React24.createElement("span", { className: "text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded" }, "File Attached")), /* @__PURE__ */ React24.createElement("h3", { className: "text-base font-bold text-[#111111]" }, cert.title), cert.description && /* @__PURE__ */ React24.createElement("p", { className: "text-xs text-[#555555] line-clamp-1 mt-1" }, cert.description)),
    /* @__PURE__ */ React24.createElement("div", { className: "flex items-center gap-2 shrink-0" }, cert.fileUrl && /* @__PURE__ */ React24.createElement(
      "a",
      {
        href: cert.fileUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "px-3 py-1.5 rounded-lg text-xs font-semibold text-[#111111] bg-white border border-[#E5E5E5] hover:bg-[#F3F3F3]"
      },
      "View File"
    ), /* @__PURE__ */ React24.createElement(
      "button",
      {
        onClick: () => handleOpenEdit(cert),
        className: "px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#111111] bg-white border border-[#E5E5E5] hover:bg-[#F3F3F3]"
      },
      "Edit"
    ), /* @__PURE__ */ React24.createElement(
      "button",
      {
        onClick: () => setDeleteConfirmId(cert.id),
        className: "px-3.5 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 border border-red-200"
      },
      "Delete"
    ))
  ))), /* @__PURE__ */ React24.createElement(
    Modal,
    {
      isOpen: isModalOpen,
      onClose: () => setIsModalOpen(false),
      title: editingItem ? "Edit Certification" : "Add New Certification"
    },
    /* @__PURE__ */ React24.createElement("form", { onSubmit: handleSubmit, className: "space-y-4" }, /* @__PURE__ */ React24.createElement("div", null, /* @__PURE__ */ React24.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Certification Title ", /* @__PURE__ */ React24.createElement("span", { className: "text-red-500" }, "*")), /* @__PURE__ */ React24.createElement(
      "input",
      {
        type: "text",
        value: formData.title,
        onChange: (e) => setFormData({ ...formData, title: e.target.value }),
        required: true,
        placeholder: "e.g. Hedera Certified Foundation (HCF)",
        className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white"
      }
    )), /* @__PURE__ */ React24.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ React24.createElement("div", null, /* @__PURE__ */ React24.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Issuing Organization ", /* @__PURE__ */ React24.createElement("span", { className: "text-red-500" }, "*")), /* @__PURE__ */ React24.createElement(
      "input",
      {
        type: "text",
        value: formData.issuer,
        onChange: (e) => setFormData({ ...formData, issuer: e.target.value }),
        required: true,
        placeholder: "e.g. Hedera",
        className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white"
      }
    )), /* @__PURE__ */ React24.createElement("div", null, /* @__PURE__ */ React24.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Issue Year / Date"), /* @__PURE__ */ React24.createElement(
      "input",
      {
        type: "text",
        value: formData.issueDate,
        onChange: (e) => setFormData({ ...formData, issueDate: e.target.value }),
        placeholder: "e.g. 2024",
        className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white"
      }
    ))), /* @__PURE__ */ React24.createElement("div", null, /* @__PURE__ */ React24.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Verification URL"), /* @__PURE__ */ React24.createElement(
      "input",
      {
        type: "url",
        value: formData.credentialUrl,
        onChange: (e) => setFormData({ ...formData, credentialUrl: e.target.value }),
        placeholder: "https://...",
        className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white"
      }
    )), /* @__PURE__ */ React24.createElement("div", { className: "p-4 rounded-xl bg-[#F9F9F9] border border-[#E5E5E5]" }, /* @__PURE__ */ React24.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-2" }, "Certificate Image or PDF Document"), /* @__PURE__ */ React24.createElement("div", { className: "flex items-center gap-4" }, /* @__PURE__ */ React24.createElement("label", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 cursor-pointer" }, /* @__PURE__ */ React24.createElement("span", null, uploadingFile ? "Uploading..." : "Upload Certificate File"), /* @__PURE__ */ React24.createElement(
      "input",
      {
        type: "file",
        accept: "image/*,application/pdf",
        onChange: handleFileUpload,
        disabled: uploadingFile,
        className: "hidden"
      }
    )), /* @__PURE__ */ React24.createElement("span", { className: "text-xs text-[#666666] truncate max-w-xs" }, formData.fileUrl ? "File uploaded and linked" : "No file chosen"))), /* @__PURE__ */ React24.createElement("div", null, /* @__PURE__ */ React24.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Description / Credential Highlights"), /* @__PURE__ */ React24.createElement(
      "textarea",
      {
        rows: 3,
        value: formData.description,
        onChange: (e) => setFormData({ ...formData, description: e.target.value }),
        placeholder: "Details regarding concepts mastered...",
        className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white resize-y"
      }
    )), /* @__PURE__ */ React24.createElement("div", { className: "pt-4 flex justify-end gap-3 border-t border-[#E5E5E5]" }, /* @__PURE__ */ React24.createElement(
      "button",
      {
        type: "button",
        onClick: () => setIsModalOpen(false),
        className: "px-4 py-2 rounded-lg text-xs font-semibold text-[#666666] hover:bg-[#F3F3F3]"
      },
      "Cancel"
    ), /* @__PURE__ */ React24.createElement(
      "button",
      {
        type: "submit",
        className: "px-6 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800"
      },
      editingItem ? "Save Changes" : "Add Certification"
    )))
  ), /* @__PURE__ */ React24.createElement(
    Modal,
    {
      isOpen: Boolean(deleteConfirmId),
      onClose: () => setDeleteConfirmId(null),
      title: "Confirm Deletion",
      maxWidth: "max-w-md"
    },
    /* @__PURE__ */ React24.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React24.createElement("p", { className: "text-sm text-[#444444]" }, "Are you sure you want to delete this certification?"), /* @__PURE__ */ React24.createElement("div", { className: "flex justify-end gap-3 pt-2" }, /* @__PURE__ */ React24.createElement(
      "button",
      {
        onClick: () => setDeleteConfirmId(null),
        className: "px-4 py-2 rounded-lg text-xs font-semibold text-[#666666] hover:bg-[#F3F3F3]"
      },
      "Cancel"
    ), /* @__PURE__ */ React24.createElement(
      "button",
      {
        onClick: handleConfirmDelete,
        className: "px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700"
      },
      "Delete Certification"
    )))
  ));
}

// src/admin/InternshipsManager.jsx
import React25, { useState as useState12 } from "react";
function InternshipsManager({ onShowToast }) {
  const { internships, addInternship, updateInternship, deleteInternship } = usePortfolio();
  const [isModalOpen, setIsModalOpen] = useState12(false);
  const [editingItem, setEditingItem] = useState12(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState12(null);
  const [formData, setFormData] = useState12({
    role: "",
    company: "",
    duration: "",
    period: "",
    description: "",
    highlights: ""
  });
  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      role: "",
      company: "",
      duration: "6 Weeks",
      period: "2026",
      description: "",
      highlights: ""
    });
    setIsModalOpen(true);
  };
  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      role: item.role || "",
      company: item.company || "",
      duration: item.duration || "",
      period: item.period || "",
      description: item.description || "",
      highlights: Array.isArray(item.highlights) ? item.highlights.join("\n") : item.highlights || ""
    });
    setIsModalOpen(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.role.trim() || !formData.company.trim() || !formData.description.trim()) {
      if (onShowToast) onShowToast("Role, Company, and Description are required", "error");
      return;
    }
    const parsedHighlights = formData.highlights.split("\n").map((h) => h.trim()).filter(Boolean);
    const payload = {
      role: formData.role.trim(),
      company: formData.company.trim(),
      duration: formData.duration.trim(),
      period: formData.period.trim(),
      description: formData.description.trim(),
      highlights: parsedHighlights
    };
    try {
      if (editingItem) {
        await updateInternship(editingItem.id, payload);
        if (onShowToast) onShowToast("Internship updated successfully!", "success");
      } else {
        await addInternship(payload);
        if (onShowToast) onShowToast("New internship added!", "success");
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error saving internship:", err);
      if (onShowToast) onShowToast("Failed to save internship", "error");
    }
  };
  const handleConfirmDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      await deleteInternship(deleteConfirmId);
      if (onShowToast) onShowToast("Internship deleted successfully", "success");
    } catch (err) {
      console.error("Error deleting internship:", err);
      if (onShowToast) onShowToast("Failed to delete internship", "error");
    } finally {
      setDeleteConfirmId(null);
    }
  };
  return /* @__PURE__ */ React25.createElement("div", { className: "bg-white rounded-2xl border border-[#E5E5E5] p-6 sm:p-8 shadow-sm animate-fade-in" }, /* @__PURE__ */ React25.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#E5E5E5] gap-4" }, /* @__PURE__ */ React25.createElement("div", null, /* @__PURE__ */ React25.createElement("h2", { className: "text-xl sm:text-2xl font-bold text-[#111111] tracking-tight" }, "Internships Management"), /* @__PURE__ */ React25.createElement("p", { className: "text-xs text-[#666666] mt-1" }, "Manage your industry experience, including the Java Programming Internship at InternPe.")), /* @__PURE__ */ React25.createElement(
    "button",
    {
      onClick: handleOpenAdd,
      className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 transition-all shadow-sm"
    },
    /* @__PURE__ */ React25.createElement("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React25.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 4v16m8-8H4" })),
    /* @__PURE__ */ React25.createElement("span", null, "Add Internship")
  )), /* @__PURE__ */ React25.createElement("div", { className: "space-y-4" }, (internships || []).map((item, idx) => /* @__PURE__ */ React25.createElement(
    "div",
    {
      key: item.id || idx,
      className: "p-6 rounded-xl border border-[#E5E5E5] hover:border-[#111111] bg-[#FAFAFA] flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all"
    },
    /* @__PURE__ */ React25.createElement("div", { className: "space-y-2 max-w-2xl" }, /* @__PURE__ */ React25.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React25.createElement("span", { className: "text-[11px] font-bold uppercase tracking-wider bg-[#E5E5E5] text-[#111111] px-2.5 py-0.5 rounded-full" }, item.duration || "6 Weeks", " \u2022 ", item.period || "2026"), /* @__PURE__ */ React25.createElement("span", { className: "text-xs font-bold text-[#111111]" }, item.company)), /* @__PURE__ */ React25.createElement("h3", { className: "text-lg font-bold text-[#111111]" }, item.role), /* @__PURE__ */ React25.createElement("p", { className: "text-xs text-[#555555] line-clamp-2" }, item.description)),
    /* @__PURE__ */ React25.createElement("div", { className: "flex items-center gap-2 shrink-0" }, /* @__PURE__ */ React25.createElement(
      "button",
      {
        onClick: () => handleOpenEdit(item),
        className: "px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#111111] bg-white border border-[#E5E5E5] hover:bg-[#F3F3F3]"
      },
      "Edit"
    ), /* @__PURE__ */ React25.createElement(
      "button",
      {
        onClick: () => setDeleteConfirmId(item.id),
        className: "px-3.5 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 border border-red-200"
      },
      "Delete"
    ))
  ))), /* @__PURE__ */ React25.createElement(
    Modal,
    {
      isOpen: isModalOpen,
      onClose: () => setIsModalOpen(false),
      title: editingItem ? "Edit Internship Record" : "Add New Internship",
      maxWidth: "max-w-2xl"
    },
    /* @__PURE__ */ React25.createElement("form", { onSubmit: handleSubmit, className: "space-y-4" }, /* @__PURE__ */ React25.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, /* @__PURE__ */ React25.createElement("div", null, /* @__PURE__ */ React25.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Role / Title ", /* @__PURE__ */ React25.createElement("span", { className: "text-red-500" }, "*")), /* @__PURE__ */ React25.createElement(
      "input",
      {
        type: "text",
        value: formData.role,
        onChange: (e) => setFormData({ ...formData, role: e.target.value }),
        required: true,
        placeholder: "e.g. Java Programming Intern",
        className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white"
      }
    )), /* @__PURE__ */ React25.createElement("div", null, /* @__PURE__ */ React25.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Company / Organization ", /* @__PURE__ */ React25.createElement("span", { className: "text-red-500" }, "*")), /* @__PURE__ */ React25.createElement(
      "input",
      {
        type: "text",
        value: formData.company,
        onChange: (e) => setFormData({ ...formData, company: e.target.value }),
        required: true,
        placeholder: "e.g. InternPe",
        className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white"
      }
    )), /* @__PURE__ */ React25.createElement("div", null, /* @__PURE__ */ React25.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Duration"), /* @__PURE__ */ React25.createElement(
      "input",
      {
        type: "text",
        value: formData.duration,
        onChange: (e) => setFormData({ ...formData, duration: e.target.value }),
        placeholder: "e.g. 6 Weeks",
        className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white"
      }
    )), /* @__PURE__ */ React25.createElement("div", null, /* @__PURE__ */ React25.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Year / Period"), /* @__PURE__ */ React25.createElement(
      "input",
      {
        type: "text",
        value: formData.period,
        onChange: (e) => setFormData({ ...formData, period: e.target.value }),
        placeholder: "e.g. 2026",
        className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white"
      }
    ))), /* @__PURE__ */ React25.createElement("div", null, /* @__PURE__ */ React25.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Overall Description ", /* @__PURE__ */ React25.createElement("span", { className: "text-red-500" }, "*")), /* @__PURE__ */ React25.createElement(
      "textarea",
      {
        rows: 3,
        value: formData.description,
        onChange: (e) => setFormData({ ...formData, description: e.target.value }),
        required: true,
        placeholder: "Summary of responsibilities and scope...",
        className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white resize-y"
      }
    )), /* @__PURE__ */ React25.createElement("div", null, /* @__PURE__ */ React25.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Key Technical Learnings (one per line)"), /* @__PURE__ */ React25.createElement(
      "textarea",
      {
        rows: 3,
        value: formData.highlights,
        onChange: (e) => setFormData({ ...formData, highlights: e.target.value }),
        placeholder: "Built structured Java modules adhering to OOP\nDesigned efficient data algorithms\nApplied debugging and version control",
        className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white font-mono text-xs resize-y"
      }
    )), /* @__PURE__ */ React25.createElement("div", { className: "pt-4 flex justify-end gap-3 border-t border-[#E5E5E5]" }, /* @__PURE__ */ React25.createElement(
      "button",
      {
        type: "button",
        onClick: () => setIsModalOpen(false),
        className: "px-4 py-2 rounded-lg text-xs font-semibold text-[#666666] hover:bg-[#F3F3F3]"
      },
      "Cancel"
    ), /* @__PURE__ */ React25.createElement(
      "button",
      {
        type: "submit",
        className: "px-6 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800"
      },
      editingItem ? "Save Changes" : "Add Internship"
    )))
  ), /* @__PURE__ */ React25.createElement(
    Modal,
    {
      isOpen: Boolean(deleteConfirmId),
      onClose: () => setDeleteConfirmId(null),
      title: "Confirm Deletion",
      maxWidth: "max-w-md"
    },
    /* @__PURE__ */ React25.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React25.createElement("p", { className: "text-sm text-[#444444]" }, "Are you sure you want to remove this internship experience?"), /* @__PURE__ */ React25.createElement("div", { className: "flex justify-end gap-3 pt-2" }, /* @__PURE__ */ React25.createElement(
      "button",
      {
        onClick: () => setDeleteConfirmId(null),
        className: "px-4 py-2 rounded-lg text-xs font-semibold text-[#666666] hover:bg-[#F3F3F3]"
      },
      "Cancel"
    ), /* @__PURE__ */ React25.createElement(
      "button",
      {
        onClick: handleConfirmDelete,
        className: "px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700"
      },
      "Delete Record"
    )))
  ));
}

// src/admin/ServicesManager.jsx
import React26, { useState as useState13 } from "react";
function ServicesManager({ onShowToast }) {
  const { services, addService, updateService, deleteService } = usePortfolio();
  const [isModalOpen, setIsModalOpen] = useState13(false);
  const [editingItem, setEditingItem] = useState13(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState13(null);
  const [formData, setFormData] = useState13({
    title: "",
    description: "",
    icon: "layout"
  });
  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      description: "",
      icon: "layout"
    });
    setIsModalOpen(true);
  };
  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || "",
      description: item.description || "",
      icon: item.icon || "layout"
    });
    setIsModalOpen(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      if (onShowToast) onShowToast("Title and Description are required", "error");
      return;
    }
    try {
      if (editingItem) {
        await updateService(editingItem.id, formData);
        if (onShowToast) onShowToast("Service updated successfully!", "success");
      } else {
        await addService(formData);
        if (onShowToast) onShowToast("New service added!", "success");
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error saving service:", err);
      if (onShowToast) onShowToast("Failed to save service", "error");
    }
  };
  const handleConfirmDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      await deleteService(deleteConfirmId);
      if (onShowToast) onShowToast("Service deleted successfully", "success");
    } catch (err) {
      console.error("Error deleting service:", err);
      if (onShowToast) onShowToast("Failed to delete service", "error");
    } finally {
      setDeleteConfirmId(null);
    }
  };
  return /* @__PURE__ */ React26.createElement("div", { className: "bg-white rounded-2xl border border-[#E5E5E5] p-6 sm:p-8 shadow-sm animate-fade-in" }, /* @__PURE__ */ React26.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#E5E5E5] gap-4" }, /* @__PURE__ */ React26.createElement("div", null, /* @__PURE__ */ React26.createElement("h2", { className: "text-xl sm:text-2xl font-bold text-[#111111] tracking-tight" }, "Services Management"), /* @__PURE__ */ React26.createElement("p", { className: "text-xs text-[#666666] mt-1" }, "Manage your four core offerings: Tableau, Dashboard Creation, Data Cleaning, and Python Programming.")), /* @__PURE__ */ React26.createElement(
    "button",
    {
      onClick: handleOpenAdd,
      className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 transition-all shadow-sm"
    },
    /* @__PURE__ */ React26.createElement("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React26.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 4v16m8-8H4" })),
    /* @__PURE__ */ React26.createElement("span", null, "Add Service")
  )), /* @__PURE__ */ React26.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" }, (services || []).map((serv, idx) => /* @__PURE__ */ React26.createElement(
    "div",
    {
      key: serv.id || idx,
      className: "p-5 rounded-xl border border-[#E5E5E5] hover:border-[#111111] bg-[#FAFAFA] flex flex-col justify-between transition-all"
    },
    /* @__PURE__ */ React26.createElement("div", null, /* @__PURE__ */ React26.createElement("div", { className: "flex items-center justify-between mb-2" }, /* @__PURE__ */ React26.createElement("span", { className: "text-sm font-bold text-[#111111]" }, serv.title), /* @__PURE__ */ React26.createElement("span", { className: "text-[10px] font-mono text-neutral-400" }, "0", idx + 1)), /* @__PURE__ */ React26.createElement("p", { className: "text-xs text-[#555555]" }, serv.description)),
    /* @__PURE__ */ React26.createElement("div", { className: "pt-4 mt-4 border-t border-[#E5E5E5] flex items-center justify-between" }, /* @__PURE__ */ React26.createElement("span", { className: "text-[11px] text-neutral-400" }, "Icon: ", serv.icon), /* @__PURE__ */ React26.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React26.createElement(
      "button",
      {
        onClick: () => handleOpenEdit(serv),
        className: "px-3 py-1 rounded-md text-xs font-semibold text-[#111111] bg-white border border-[#E5E5E5] hover:bg-[#F3F3F3]"
      },
      "Edit"
    ), /* @__PURE__ */ React26.createElement(
      "button",
      {
        onClick: () => setDeleteConfirmId(serv.id),
        className: "px-3 py-1 rounded-md text-xs font-semibold text-red-600 hover:bg-red-50 border border-red-200"
      },
      "Delete"
    )))
  ))), /* @__PURE__ */ React26.createElement(
    Modal,
    {
      isOpen: isModalOpen,
      onClose: () => setIsModalOpen(false),
      title: editingItem ? "Edit Service" : "Add New Service"
    },
    /* @__PURE__ */ React26.createElement("form", { onSubmit: handleSubmit, className: "space-y-4" }, /* @__PURE__ */ React26.createElement("div", null, /* @__PURE__ */ React26.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Service Title ", /* @__PURE__ */ React26.createElement("span", { className: "text-red-500" }, "*")), /* @__PURE__ */ React26.createElement(
      "input",
      {
        type: "text",
        value: formData.title,
        onChange: (e) => setFormData({ ...formData, title: e.target.value }),
        required: true,
        placeholder: "e.g. Data Visualization using Tableau",
        className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white"
      }
    )), /* @__PURE__ */ React26.createElement("div", null, /* @__PURE__ */ React26.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Icon Type"), /* @__PURE__ */ React26.createElement(
      "select",
      {
        value: formData.icon,
        onChange: (e) => setFormData({ ...formData, icon: e.target.value }),
        className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white"
      },
      /* @__PURE__ */ React26.createElement("option", { value: "layout" }, "Tableau / Visualization"),
      /* @__PURE__ */ React26.createElement("option", { value: "gauge" }, "Dashboard / Metrics"),
      /* @__PURE__ */ React26.createElement("option", { value: "filter" }, "Data Cleaning / Preprocessing"),
      /* @__PURE__ */ React26.createElement("option", { value: "terminal" }, "Python Programming")
    )), /* @__PURE__ */ React26.createElement("div", null, /* @__PURE__ */ React26.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Description ", /* @__PURE__ */ React26.createElement("span", { className: "text-red-500" }, "*")), /* @__PURE__ */ React26.createElement(
      "textarea",
      {
        rows: 3,
        value: formData.description,
        onChange: (e) => setFormData({ ...formData, description: e.target.value }),
        required: true,
        placeholder: "Crisp professional summary of what is delivered...",
        className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white resize-y"
      }
    )), /* @__PURE__ */ React26.createElement("div", { className: "pt-4 flex justify-end gap-3 border-t border-[#E5E5E5]" }, /* @__PURE__ */ React26.createElement(
      "button",
      {
        type: "button",
        onClick: () => setIsModalOpen(false),
        className: "px-4 py-2 rounded-lg text-xs font-semibold text-[#666666] hover:bg-[#F3F3F3]"
      },
      "Cancel"
    ), /* @__PURE__ */ React26.createElement(
      "button",
      {
        type: "submit",
        className: "px-6 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800"
      },
      editingItem ? "Save Changes" : "Add Service"
    )))
  ), /* @__PURE__ */ React26.createElement(
    Modal,
    {
      isOpen: Boolean(deleteConfirmId),
      onClose: () => setDeleteConfirmId(null),
      title: "Confirm Deletion",
      maxWidth: "max-w-md"
    },
    /* @__PURE__ */ React26.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React26.createElement("p", { className: "text-sm text-[#444444]" }, "Are you sure you want to remove this service?"), /* @__PURE__ */ React26.createElement("div", { className: "flex justify-end gap-3 pt-2" }, /* @__PURE__ */ React26.createElement(
      "button",
      {
        onClick: () => setDeleteConfirmId(null),
        className: "px-4 py-2 rounded-lg text-xs font-semibold text-[#666666] hover:bg-[#F3F3F3]"
      },
      "Cancel"
    ), /* @__PURE__ */ React26.createElement(
      "button",
      {
        onClick: handleConfirmDelete,
        className: "px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700"
      },
      "Delete Service"
    )))
  ));
}

// src/admin/SeminarManager.jsx
import React27, { useState as useState14 } from "react";
function SeminarManager({ onShowToast }) {
  const { seminar, updateSeminar } = usePortfolio();
  const [formData, setFormData] = useState14({
    title: seminar.title || "Credit Card Fraud Detection",
    type: seminar.type || "Academic Seminar Topic",
    institution: seminar.institution || "KITSW, Warangal",
    description: seminar.description || "Academic seminar exploring machine learning-based approaches for identifying fraudulent credit card transactions.",
    extendedNotes: seminar.extendedNotes || "",
    keyTakeaways: (seminar.keyTakeaways || []).join("\n")
  });
  const [saving, setSaving] = useState14(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      if (onShowToast) onShowToast("Title and Description are required", "error");
      return;
    }
    setSaving(true);
    try {
      const parsedTakeaways = formData.keyTakeaways.split("\n").map((t) => t.trim()).filter(Boolean);
      const updated = {
        ...seminar,
        title: formData.title.trim(),
        type: formData.type.trim(),
        institution: formData.institution.trim(),
        description: formData.description.trim(),
        extendedNotes: formData.extendedNotes.trim(),
        keyTakeaways: parsedTakeaways
      };
      await updateSeminar(updated);
      if (onShowToast) onShowToast("Seminar topic details updated successfully!", "success");
    } catch (err) {
      console.error("Error saving seminar:", err);
      if (onShowToast) onShowToast("Failed to save seminar details", "error");
    } finally {
      setSaving(false);
    }
  };
  return /* @__PURE__ */ React27.createElement("div", { className: "bg-white rounded-2xl border border-[#E5E5E5] p-6 sm:p-8 shadow-sm animate-fade-in" }, /* @__PURE__ */ React27.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#E5E5E5] gap-4" }, /* @__PURE__ */ React27.createElement("div", null, /* @__PURE__ */ React27.createElement("h2", { className: "text-xl sm:text-2xl font-bold text-[#111111] tracking-tight" }, "Academic Seminar Management"), /* @__PURE__ */ React27.createElement("p", { className: "text-xs text-[#666666] mt-1" }, "Display settings for academic presentations (specifically marked as a seminar topic, not a project).")), /* @__PURE__ */ React27.createElement(
    "button",
    {
      onClick: handleSubmit,
      disabled: saving,
      className: "inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 transition-all disabled:opacity-50"
    },
    saving ? "Saving..." : "Save & Publish Seminar"
  )), /* @__PURE__ */ React27.createElement("form", { onSubmit: handleSubmit, className: "space-y-6" }, /* @__PURE__ */ React27.createElement("div", { className: "p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center gap-2.5" }, /* @__PURE__ */ React27.createElement("svg", { className: "w-5 h-5 shrink-0 text-amber-600", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React27.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" })), /* @__PURE__ */ React27.createElement("span", null, /* @__PURE__ */ React27.createElement("strong", null, "Requirement Notice:"), ' "Credit Card Fraud Detection" must be presented strictly as an academic seminar topic, not as a finished software project.')), /* @__PURE__ */ React27.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-6" }, /* @__PURE__ */ React27.createElement("div", { className: "sm:col-span-2" }, /* @__PURE__ */ React27.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Seminar Title ", /* @__PURE__ */ React27.createElement("span", { className: "text-red-500" }, "*")), /* @__PURE__ */ React27.createElement(
    "input",
    {
      type: "text",
      name: "title",
      value: formData.title,
      onChange: handleChange,
      required: true,
      className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white"
    }
  )), /* @__PURE__ */ React27.createElement("div", null, /* @__PURE__ */ React27.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Type / Category"), /* @__PURE__ */ React27.createElement(
    "input",
    {
      type: "text",
      name: "type",
      value: formData.type,
      onChange: handleChange,
      className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white"
    }
  ))), /* @__PURE__ */ React27.createElement("div", null, /* @__PURE__ */ React27.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Institution / Department"), /* @__PURE__ */ React27.createElement(
    "input",
    {
      type: "text",
      name: "institution",
      value: formData.institution,
      onChange: handleChange,
      className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white"
    }
  )), /* @__PURE__ */ React27.createElement("div", null, /* @__PURE__ */ React27.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Core Abstract / Overview ", /* @__PURE__ */ React27.createElement("span", { className: "text-red-500" }, "*")), /* @__PURE__ */ React27.createElement(
    "textarea",
    {
      name: "description",
      rows: 3,
      value: formData.description,
      onChange: handleChange,
      required: true,
      className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white resize-y"
    }
  )), /* @__PURE__ */ React27.createElement("div", null, /* @__PURE__ */ React27.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Extended Research & Technical Notes"), /* @__PURE__ */ React27.createElement(
    "textarea",
    {
      name: "extendedNotes",
      rows: 3,
      value: formData.extendedNotes,
      onChange: handleChange,
      className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white resize-y"
    }
  )), /* @__PURE__ */ React27.createElement("div", null, /* @__PURE__ */ React27.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Key Academic Takeaways (one per line)"), /* @__PURE__ */ React27.createElement(
    "textarea",
    {
      name: "keyTakeaways",
      rows: 4,
      value: formData.keyTakeaways,
      onChange: handleChange,
      className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white font-mono text-xs resize-y",
      placeholder: "Key concept 1\nKey concept 2\nKey concept 3"
    }
  )), /* @__PURE__ */ React27.createElement("div", { className: "pt-4 border-t border-[#E5E5E5] flex justify-end" }, /* @__PURE__ */ React27.createElement(
    "button",
    {
      type: "submit",
      disabled: saving,
      className: "px-8 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 transition-all disabled:opacity-50"
    },
    saving ? "Saving..." : "Save & Publish"
  ))));
}

// src/admin/ContactInfoManager.jsx
import React28, { useState as useState15 } from "react";
function ContactInfoManager({ onShowToast }) {
  const { profile, updateProfile } = usePortfolio();
  const [formData, setFormData] = useState15({
    email: profile.email || "",
    phone: profile.phone || "",
    location: profile.location || "",
    linkedin: profile.linkedin || "",
    github: profile.github || ""
  });
  const [saving, setSaving] = useState15(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.trim()) {
      if (onShowToast) onShowToast("Email is required", "error");
      return;
    }
    setSaving(true);
    try {
      await updateProfile({
        ...profile,
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        location: formData.location.trim(),
        linkedin: formData.linkedin.trim(),
        github: formData.github.trim()
      });
      if (onShowToast) onShowToast("Contact information updated successfully!", "success");
    } catch (err) {
      console.error("Error updating contact info:", err);
      if (onShowToast) onShowToast("Failed to update contact info", "error");
    } finally {
      setSaving(false);
    }
  };
  return /* @__PURE__ */ React28.createElement("div", { className: "bg-white rounded-2xl border border-[#E5E5E5] p-6 sm:p-8 shadow-sm animate-fade-in" }, /* @__PURE__ */ React28.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#E5E5E5] gap-4" }, /* @__PURE__ */ React28.createElement("div", null, /* @__PURE__ */ React28.createElement("h2", { className: "text-xl sm:text-2xl font-bold text-[#111111] tracking-tight" }, "Contact Information Management"), /* @__PURE__ */ React28.createElement("p", { className: "text-xs text-[#666666] mt-1" }, "Update your public communication channels, email, phone, location, and social profiles.")), /* @__PURE__ */ React28.createElement(
    "button",
    {
      onClick: handleSubmit,
      disabled: saving,
      className: "inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 transition-all disabled:opacity-50"
    },
    saving ? "Saving..." : "Save Changes"
  )), /* @__PURE__ */ React28.createElement("form", { onSubmit: handleSubmit, className: "space-y-6" }, /* @__PURE__ */ React28.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6" }, /* @__PURE__ */ React28.createElement("div", null, /* @__PURE__ */ React28.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Public Email Address ", /* @__PURE__ */ React28.createElement("span", { className: "text-red-500" }, "*")), /* @__PURE__ */ React28.createElement(
    "input",
    {
      type: "email",
      name: "email",
      value: formData.email,
      onChange: handleChange,
      required: true,
      placeholder: "manogna2902@gmail.com",
      className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white"
    }
  )), /* @__PURE__ */ React28.createElement("div", null, /* @__PURE__ */ React28.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Phone Number"), /* @__PURE__ */ React28.createElement(
    "input",
    {
      type: "text",
      name: "phone",
      value: formData.phone,
      onChange: handleChange,
      placeholder: "+91 8331003290",
      className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white"
    }
  )), /* @__PURE__ */ React28.createElement("div", { className: "sm:col-span-2" }, /* @__PURE__ */ React28.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Location / City"), /* @__PURE__ */ React28.createElement(
    "input",
    {
      type: "text",
      name: "location",
      value: formData.location,
      onChange: handleChange,
      placeholder: "Warangal, Telangana, India",
      className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white"
    }
  )), /* @__PURE__ */ React28.createElement("div", null, /* @__PURE__ */ React28.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "LinkedIn Profile Link"), /* @__PURE__ */ React28.createElement(
    "input",
    {
      type: "url",
      name: "linkedin",
      value: formData.linkedin,
      onChange: handleChange,
      placeholder: "https://www.linkedin.com/in/manogna-pittala-077aa9325/",
      className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white"
    }
  )), /* @__PURE__ */ React28.createElement("div", null, /* @__PURE__ */ React28.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "GitHub Profile Link"), /* @__PURE__ */ React28.createElement(
    "input",
    {
      type: "url",
      name: "github",
      value: formData.github,
      onChange: handleChange,
      placeholder: "https://github.com/manogna2902",
      className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white"
    }
  ))), /* @__PURE__ */ React28.createElement("div", { className: "pt-4 border-t border-[#E5E5E5] flex justify-end" }, /* @__PURE__ */ React28.createElement(
    "button",
    {
      type: "submit",
      disabled: saving,
      className: "px-8 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 transition-all disabled:opacity-50"
    },
    saving ? "Saving..." : "Save & Publish"
  ))));
}

// src/admin/ResumeManager.jsx
import React29, { useState as useState16 } from "react";
function ResumeManager({ onShowToast }) {
  const { profile, updateProfile } = usePortfolio();
  const [uploading, setUploading] = useState16(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState16(false);
  const handleResumeUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf" && !file.name.endsWith(".pdf")) {
      if (onShowToast) onShowToast("Please select a valid PDF file", "error");
      return;
    }
    setUploading(true);
    try {
      const res = await uploadAsset("resumes", file, file.name);
      if (res.success) {
        await updateProfile({
          ...profile,
          resumeUrl: res.url,
          resumeFileName: file.name,
          resumeUpdatedAt: (/* @__PURE__ */ new Date()).toISOString()
        });
        if (onShowToast) onShowToast("Resume uploaded and published to homepage!", "success");
      } else {
        if (onShowToast) onShowToast("Failed to upload resume file", "error");
      }
    } catch (err) {
      console.error("Error uploading resume:", err);
      if (onShowToast) onShowToast("Upload error", "error");
    } finally {
      setUploading(false);
    }
  };
  const handleRemoveResume = async () => {
    try {
      await updateProfile({
        ...profile,
        resumeUrl: "",
        resumeFileName: "Pittala_Manogna_Resume.pdf",
        resumeUpdatedAt: (/* @__PURE__ */ new Date()).toISOString()
      });
      setDeleteConfirmOpen(false);
      if (onShowToast) onShowToast("Resume removed. Homepage now uses auto-generated resume format.", "info");
    } catch (err) {
      console.error("Error removing resume:", err);
      if (onShowToast) onShowToast("Failed to remove resume", "error");
    }
  };
  return /* @__PURE__ */ React29.createElement("div", { className: "bg-white rounded-2xl border border-[#E5E5E5] p-6 sm:p-8 shadow-sm animate-fade-in" }, /* @__PURE__ */ React29.createElement("div", { className: "pb-6 mb-8 border-b border-[#E5E5E5]" }, /* @__PURE__ */ React29.createElement("h2", { className: "text-xl sm:text-2xl font-bold text-[#111111] tracking-tight" }, "Resume Management"), /* @__PURE__ */ React29.createElement("p", { className: "text-xs text-[#666666] mt-1" }, 'Upload, replace, and manage the PDF resume linked directly to the "Download Resume" buttons on the public website.')), /* @__PURE__ */ React29.createElement("div", { className: "space-y-8" }, /* @__PURE__ */ React29.createElement("div", { className: "p-6 rounded-2xl bg-[#F9F9F9] border border-[#E5E5E5] flex flex-col sm:flex-row sm:items-center justify-between gap-6" }, /* @__PURE__ */ React29.createElement("div", { className: "flex items-center gap-4" }, /* @__PURE__ */ React29.createElement("div", { className: "w-14 h-14 rounded-xl bg-[#111111] text-white flex items-center justify-center shrink-0 shadow-sm" }, /* @__PURE__ */ React29.createElement("svg", { className: "w-7 h-7 text-red-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React29.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }))), /* @__PURE__ */ React29.createElement("div", null, /* @__PURE__ */ React29.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React29.createElement("h3", { className: "text-base font-bold text-[#111111]" }, profile.resumeFileName || "Pittala_Manogna_Resume.pdf"), /* @__PURE__ */ React29.createElement("span", { className: `px-2 py-0.5 rounded-full text-[10px] font-bold ${profile.resumeUrl ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}` }, profile.resumeUrl ? "Custom PDF Active" : "Auto Generated Resume")), /* @__PURE__ */ React29.createElement("p", { className: "text-xs text-[#666666] mt-1" }, "Last updated: ", profile.resumeUpdatedAt ? new Date(profile.resumeUpdatedAt).toLocaleDateString() : "Current"))), /* @__PURE__ */ React29.createElement("div", { className: "flex items-center gap-3" }, profile.resumeUrl && /* @__PURE__ */ React29.createElement(
    "button",
    {
      type: "button",
      onClick: () => downloadResumePdf(profile.resumeUrl, profile.resumeFileName || "Pittala_Manogna_Resume.pdf", onShowToast),
      className: "px-4 py-2 rounded-lg text-xs font-semibold text-[#111111] bg-white border border-[#E5E5E5] hover:bg-[#F3F3F3] transition-colors"
    },
    "Test Download"
  ), profile.resumeUrl && /* @__PURE__ */ React29.createElement(
    "button",
    {
      onClick: () => setDeleteConfirmOpen(true),
      className: "px-4 py-2 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 border border-red-200 transition-colors"
    },
    "Remove"
  ))), /* @__PURE__ */ React29.createElement("div", { className: "border-2 border-dashed border-[#E5E5E5] hover:border-[#111111] rounded-2xl p-8 sm:p-12 text-center transition-all bg-[#FAFAFA]" }, /* @__PURE__ */ React29.createElement("div", { className: "w-16 h-16 rounded-full bg-[#111111] text-white flex items-center justify-center mx-auto mb-4 shadow-sm" }, /* @__PURE__ */ React29.createElement("svg", { className: "w-8 h-8", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React29.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" }))), /* @__PURE__ */ React29.createElement("h4", { className: "text-base font-bold text-[#111111] mb-1" }, profile.resumeUrl ? "Replace Current Resume PDF" : "Upload Your Professional Resume (PDF)"), /* @__PURE__ */ React29.createElement("p", { className: "text-xs text-[#666666] max-w-sm mx-auto mb-6" }, 'Upload your latest verified curriculum vitae. Once uploaded, the "Download Resume" buttons on the homepage will immediately deliver this file to visitors.'), /* @__PURE__ */ React29.createElement("label", { className: "inline-flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 cursor-pointer transition-all shadow-sm" }, uploading ? /* @__PURE__ */ React29.createElement(React29.Fragment, null, /* @__PURE__ */ React29.createElement("svg", { className: "w-4 h-4 animate-spin", fill: "none", viewBox: "0 0 24 24" }, /* @__PURE__ */ React29.createElement("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), /* @__PURE__ */ React29.createElement("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })), /* @__PURE__ */ React29.createElement("span", null, "Uploading & Publishing...")) : /* @__PURE__ */ React29.createElement(React29.Fragment, null, /* @__PURE__ */ React29.createElement("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React29.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" })), /* @__PURE__ */ React29.createElement("span", null, "Select PDF File")), /* @__PURE__ */ React29.createElement(
    "input",
    {
      type: "file",
      accept: "application/pdf",
      onChange: handleResumeUpload,
      disabled: uploading,
      className: "hidden"
    }
  )))), /* @__PURE__ */ React29.createElement(
    Modal,
    {
      isOpen: deleteConfirmOpen,
      onClose: () => setDeleteConfirmOpen(false),
      title: "Confirm Resume Removal",
      maxWidth: "max-w-md"
    },
    /* @__PURE__ */ React29.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React29.createElement("p", { className: "text-sm text-[#444444]" }, "Are you sure you want to remove the uploaded PDF resume? Visitors will be able to download the default formatted curriculum vitae."), /* @__PURE__ */ React29.createElement("div", { className: "flex justify-end gap-3 pt-2" }, /* @__PURE__ */ React29.createElement(
      "button",
      {
        onClick: () => setDeleteConfirmOpen(false),
        className: "px-4 py-2 rounded-lg text-xs font-semibold text-[#666666] hover:bg-[#F3F3F3]"
      },
      "Cancel"
    ), /* @__PURE__ */ React29.createElement(
      "button",
      {
        onClick: handleRemoveResume,
        className: "px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700"
      },
      "Remove PDF"
    )))
  ));
}

// src/admin/MessagesManager.jsx
import React30, { useState as useState17 } from "react";
function MessagesManager({ onShowToast }) {
  const { messages, markMessageRead, deleteMessage } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState17("all");
  const [selectedMessage, setSelectedMessage] = useState17(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState17(null);
  const filteredMessages = (messages || []).filter((m) => {
    if (activeFilter === "unread") return !m.read;
    return true;
  });
  const handleOpenMessage = async (msg) => {
    setSelectedMessage(msg);
    if (!msg.read) {
      await markMessageRead(msg.id);
    }
  };
  const handleConfirmDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      await deleteMessage(deleteConfirmId);
      if (selectedMessage?.id === deleteConfirmId) {
        setSelectedMessage(null);
      }
      if (onShowToast) onShowToast("Message deleted successfully", "success");
    } catch (err) {
      console.error("Error deleting message:", err);
      if (onShowToast) onShowToast("Failed to delete message", "error");
    } finally {
      setDeleteConfirmId(null);
    }
  };
  return /* @__PURE__ */ React30.createElement("div", { className: "bg-white rounded-2xl border border-[#E5E5E5] p-6 sm:p-8 shadow-sm animate-fade-in" }, /* @__PURE__ */ React30.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#E5E5E5] gap-4" }, /* @__PURE__ */ React30.createElement("div", null, /* @__PURE__ */ React30.createElement("h2", { className: "text-xl sm:text-2xl font-bold text-[#111111] tracking-tight" }, "Contact Messages"), /* @__PURE__ */ React30.createElement("p", { className: "text-xs text-[#666666] mt-1" }, "Inquiries and correspondence submitted via your website contact form.")), /* @__PURE__ */ React30.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React30.createElement(
    "button",
    {
      onClick: () => setActiveFilter("all"),
      className: `px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${activeFilter === "all" ? "bg-[#111111] text-white" : "bg-[#F3F3F3] text-[#444444] hover:bg-[#E5E5E5]"}`
    },
    "All Messages (",
    (messages || []).length,
    ")"
  ), /* @__PURE__ */ React30.createElement(
    "button",
    {
      onClick: () => setActiveFilter("unread"),
      className: `px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${activeFilter === "unread" ? "bg-[#111111] text-white" : "bg-[#F3F3F3] text-[#444444] hover:bg-[#E5E5E5]"}`
    },
    "Unread (",
    (messages || []).filter((m) => !m.read).length,
    ")"
  ))), filteredMessages.length === 0 ? /* @__PURE__ */ React30.createElement("div", { className: "py-16 text-center text-[#888888] text-xs" }, /* @__PURE__ */ React30.createElement("p", null, "No messages match the current filter.")) : /* @__PURE__ */ React30.createElement("div", { className: "divide-y divide-neutral-100" }, filteredMessages.map((msg) => /* @__PURE__ */ React30.createElement(
    "div",
    {
      key: msg.id,
      className: `p-4 sm:p-5 rounded-xl transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${!msg.read ? "bg-[#FAFAFA] font-medium" : "hover:bg-neutral-50"}`,
      onClick: () => handleOpenMessage(msg)
    },
    /* @__PURE__ */ React30.createElement("div", { className: "flex items-start gap-3 min-w-0" }, /* @__PURE__ */ React30.createElement("span", { className: `w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${!msg.read ? "bg-red-500" : "bg-transparent"}` }), /* @__PURE__ */ React30.createElement("div", { className: "min-w-0" }, /* @__PURE__ */ React30.createElement("div", { className: "flex flex-wrap items-center gap-2" }, /* @__PURE__ */ React30.createElement("span", { className: "text-sm font-bold text-[#111111] truncate" }, msg.name), /* @__PURE__ */ React30.createElement("span", { className: "text-xs text-[#888888] truncate" }, "<", msg.email, ">")), /* @__PURE__ */ React30.createElement("h4", { className: "text-xs sm:text-sm text-[#333333] font-semibold mt-0.5 truncate" }, msg.subject), /* @__PURE__ */ React30.createElement("p", { className: "text-xs text-[#666666] line-clamp-1 mt-0.5" }, msg.message))),
    /* @__PURE__ */ React30.createElement("div", { className: "flex items-center gap-3 shrink-0 self-end sm:self-center" }, /* @__PURE__ */ React30.createElement("span", { className: "text-[11px] text-[#888888] font-mono" }, new Date(msg.timestamp).toLocaleDateString()), /* @__PURE__ */ React30.createElement(
      "button",
      {
        onClick: (e) => {
          e.stopPropagation();
          setDeleteConfirmId(msg.id);
        },
        className: "p-1.5 text-neutral-400 hover:text-red-600 rounded-md transition-colors",
        title: "Delete message"
      },
      /* @__PURE__ */ React30.createElement("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React30.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }))
    ))
  ))), /* @__PURE__ */ React30.createElement(
    Modal,
    {
      isOpen: Boolean(selectedMessage),
      onClose: () => setSelectedMessage(null),
      title: "Message Details",
      maxWidth: "max-w-xl"
    },
    selectedMessage && /* @__PURE__ */ React30.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React30.createElement("div", { className: "p-4 rounded-xl bg-[#F9F9F9] border border-[#E5E5E5] space-y-2 text-xs" }, /* @__PURE__ */ React30.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React30.createElement("span", { className: "text-[#666666]" }, "From:"), /* @__PURE__ */ React30.createElement("span", { className: "font-bold text-[#111111]" }, selectedMessage.name)), /* @__PURE__ */ React30.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React30.createElement("span", { className: "text-[#666666]" }, "Email:"), /* @__PURE__ */ React30.createElement("a", { href: `mailto:${selectedMessage.email}`, className: "font-bold text-[#111111] hover:underline" }, selectedMessage.email)), /* @__PURE__ */ React30.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React30.createElement("span", { className: "text-[#666666]" }, "Subject:"), /* @__PURE__ */ React30.createElement("span", { className: "font-bold text-[#111111]" }, selectedMessage.subject)), /* @__PURE__ */ React30.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React30.createElement("span", { className: "text-[#666666]" }, "Received:"), /* @__PURE__ */ React30.createElement("span", { className: "font-mono text-[#111111]" }, new Date(selectedMessage.timestamp).toLocaleString()))), /* @__PURE__ */ React30.createElement("div", null, /* @__PURE__ */ React30.createElement("h5", { className: "text-xs uppercase tracking-wider font-bold text-[#111111] mb-2" }, "Message Content:"), /* @__PURE__ */ React30.createElement("div", { className: "p-4 rounded-xl bg-white border border-[#E5E5E5] text-sm text-[#333333] whitespace-pre-wrap leading-relaxed" }, selectedMessage.message)), /* @__PURE__ */ React30.createElement("div", { className: "flex items-center justify-between pt-4 border-t border-[#E5E5E5]" }, /* @__PURE__ */ React30.createElement(
      "button",
      {
        onClick: () => setDeleteConfirmId(selectedMessage.id),
        className: "px-4 py-2 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 border border-red-200"
      },
      "Delete Message"
    ), /* @__PURE__ */ React30.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React30.createElement(
      "a",
      {
        href: `mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`,
        className: "px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 transition-colors inline-flex items-center gap-1.5"
      },
      /* @__PURE__ */ React30.createElement("svg", { className: "w-3.5 h-3.5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React30.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" })),
      /* @__PURE__ */ React30.createElement("span", null, "Reply via Email")
    ), /* @__PURE__ */ React30.createElement(
      "button",
      {
        onClick: () => setSelectedMessage(null),
        className: "px-4 py-2 rounded-lg text-xs font-semibold text-[#666666] hover:bg-[#F3F3F3]"
      },
      "Close"
    ))))
  ), /* @__PURE__ */ React30.createElement(
    Modal,
    {
      isOpen: Boolean(deleteConfirmId),
      onClose: () => setDeleteConfirmId(null),
      title: "Confirm Deletion",
      maxWidth: "max-w-md"
    },
    /* @__PURE__ */ React30.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React30.createElement("p", { className: "text-sm text-[#444444]" }, "Are you sure you want to permanently delete this contact submission?"), /* @__PURE__ */ React30.createElement("div", { className: "flex justify-end gap-3 pt-2" }, /* @__PURE__ */ React30.createElement(
      "button",
      {
        onClick: () => setDeleteConfirmId(null),
        className: "px-4 py-2 rounded-lg text-xs font-semibold text-[#666666] hover:bg-[#F3F3F3]"
      },
      "Cancel"
    ), /* @__PURE__ */ React30.createElement(
      "button",
      {
        onClick: handleConfirmDelete,
        className: "px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700"
      },
      "Delete"
    )))
  ));
}

// src/admin/SupabaseSettingsModal.jsx
import React31, { useState as useState18 } from "react";
function SupabaseSettingsModal({ isOpen, onClose, onShowToast }) {
  const { reloadPortfolioData } = usePortfolio();
  const currentConfig = getSupabaseConfig();
  const [url, setUrl] = useState18(currentConfig.url || "");
  const [anonKey, setAnonKey] = useState18(currentConfig.anonKey || "");
  const [testing, setTesting] = useState18(false);
  const [testResult, setTestResult] = useState18(null);
  const handleTestConnection = async () => {
    if (!url.trim() || !anonKey.trim()) {
      setTestResult({ success: false, message: "Please provide both Supabase URL and Anon Key" });
      return;
    }
    setTesting(true);
    setTestResult(null);
    try {
      const res = await testSupabaseConnection(url.trim(), anonKey.trim());
      setTestResult(res);
    } catch (err) {
      setTestResult({ success: false, message: err.message || "Connection test failed" });
    } finally {
      setTesting(false);
    }
  };
  const handleSave = async (e) => {
    e.preventDefault();
    if (!url.trim() || !anonKey.trim()) {
      if (onShowToast) onShowToast("Both fields are required", "error");
      return;
    }
    try {
      saveSupabaseConfig(url.trim(), anonKey.trim());
      await reloadPortfolioData();
      if (onShowToast) onShowToast("Supabase configuration saved & connected!", "success");
      onClose();
    } catch (err) {
      console.error("Error saving Supabase config:", err);
      if (onShowToast) onShowToast("Failed to save configuration", "error");
    }
  };
  const handleClear = async () => {
    localStorage.removeItem("manogna_portfolio_supabase_config");
    setUrl("");
    setAnonKey("");
    setTestResult(null);
    await reloadPortfolioData();
    if (onShowToast) onShowToast("Returned to Local Persistence Mode", "info");
    onClose();
  };
  return /* @__PURE__ */ React31.createElement(
    Modal,
    {
      isOpen,
      onClose,
      title: "Supabase Cloud Database Settings",
      maxWidth: "max-w-xl"
    },
    /* @__PURE__ */ React31.createElement("form", { onSubmit: handleSave, className: "space-y-6" }, /* @__PURE__ */ React31.createElement("p", { className: "text-xs text-[#555555] leading-relaxed" }, "Connect your live Supabase cloud project to enable PostgreSQL tables, Supabase Authentication, Row Level Security (RLS), and Cloud Storage for photos, resumes, and certificates."), testResult && /* @__PURE__ */ React31.createElement("div", { className: `p-4 rounded-xl text-xs flex items-start gap-2.5 ${testResult.success ? "bg-emerald-50 text-emerald-900 border border-emerald-200" : "bg-red-50 text-red-900 border border-red-200"}` }, /* @__PURE__ */ React31.createElement("span", { className: "font-bold shrink-0" }, testResult.success ? "Success:" : "Notice:"), /* @__PURE__ */ React31.createElement("span", null, testResult.message)), /* @__PURE__ */ React31.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React31.createElement("div", null, /* @__PURE__ */ React31.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Supabase Project URL ", /* @__PURE__ */ React31.createElement("span", { className: "text-red-500" }, "*")), /* @__PURE__ */ React31.createElement(
      "input",
      {
        type: "url",
        value: url,
        onChange: (e) => setUrl(e.target.value),
        placeholder: "https://your-project-id.supabase.co",
        required: true,
        className: "w-full px-4 py-2.5 rounded-lg text-sm bg-white"
      }
    )), /* @__PURE__ */ React31.createElement("div", null, /* @__PURE__ */ React31.createElement("label", { className: "block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5" }, "Supabase Anon (Public) Key ", /* @__PURE__ */ React31.createElement("span", { className: "text-red-500" }, "*")), /* @__PURE__ */ React31.createElement(
      "textarea",
      {
        rows: 3,
        value: anonKey,
        onChange: (e) => setAnonKey(e.target.value),
        placeholder: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        required: true,
        className: "w-full px-4 py-2.5 rounded-lg text-xs font-mono bg-white resize-none"
      }
    ))), /* @__PURE__ */ React31.createElement("div", { className: "p-4 rounded-xl bg-[#F9F9F9] border border-[#E5E5E5] text-xs text-[#666666] space-y-1" }, /* @__PURE__ */ React31.createElement("p", { className: "font-semibold text-[#111111]" }, "Where to find these in Supabase?"), /* @__PURE__ */ React31.createElement("p", null, "1. Open your project on ", /* @__PURE__ */ React31.createElement("a", { href: "https://supabase.com", target: "_blank", rel: "noopener noreferrer", className: "underline font-medium text-[#111111]" }, "supabase.com")), /* @__PURE__ */ React31.createElement("p", null, "2. Go to ", /* @__PURE__ */ React31.createElement("strong", null, "Project Settings"), " > ", /* @__PURE__ */ React31.createElement("strong", null, "API")), /* @__PURE__ */ React31.createElement("p", null, "3. Copy ", /* @__PURE__ */ React31.createElement("strong", null, "Project URL"), " and the ", /* @__PURE__ */ React31.createElement("strong", null, "anon / public"), " API key."), /* @__PURE__ */ React31.createElement("p", null, "4. Execute the SQL script in ", /* @__PURE__ */ React31.createElement("code", null, "supabase/schema.sql"), " in the Supabase SQL Editor.")), /* @__PURE__ */ React31.createElement("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#E5E5E5]" }, /* @__PURE__ */ React31.createElement("div", { className: "flex items-center gap-2 w-full sm:w-auto" }, /* @__PURE__ */ React31.createElement(
      "button",
      {
        type: "button",
        onClick: handleTestConnection,
        disabled: testing,
        className: "px-4 py-2 rounded-lg text-xs font-semibold text-[#111111] bg-white border border-[#E5E5E5] hover:bg-[#F3F3F3] disabled:opacity-50"
      },
      testing ? "Testing..." : "Test Connection"
    ), currentConfig.url && /* @__PURE__ */ React31.createElement(
      "button",
      {
        type: "button",
        onClick: handleClear,
        className: "px-3 py-2 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50"
      },
      "Reset to Local"
    )), /* @__PURE__ */ React31.createElement("div", { className: "flex items-center gap-2 w-full sm:w-auto justify-end" }, /* @__PURE__ */ React31.createElement(
      "button",
      {
        type: "button",
        onClick: onClose,
        className: "px-4 py-2 rounded-lg text-xs font-semibold text-[#666666] hover:bg-[#F3F3F3]"
      },
      "Cancel"
    ), /* @__PURE__ */ React31.createElement(
      "button",
      {
        type: "submit",
        className: "px-6 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800"
      },
      "Save & Connect"
    ))))
  );
}

// src/App.jsx
function App() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { loading: dataLoading } = usePortfolio();
  const [currentRoute, setCurrentRoute] = useState19("public");
  const [adminTab, setAdminTab] = useState19("overview");
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState19(false);
  const [toast, setToast] = useState19({ message: "", type: "success" });
  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };
  const hideToast = () => {
    setToast({ message: "", type: "success" });
  };
  useEffect6(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes("/admin/login") || hash.includes("admin/login")) {
        setCurrentRoute(isAuthenticated ? "admin_dashboard" : "admin_login");
      } else if (path.includes("/admin") || hash.includes("admin")) {
        setCurrentRoute(isAuthenticated ? "admin_dashboard" : "admin_login");
      } else {
        setCurrentRoute("public");
      }
    };
    handleLocationChange();
    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, [isAuthenticated]);
  const navigateTo = (route, updateUrl = true) => {
    setCurrentRoute(route);
    if (updateUrl) {
      if (route === "admin_login") {
        window.history.pushState({}, "", "#/admin/login");
      } else if (route === "admin_dashboard") {
        window.history.pushState({}, "", "#/admin/dashboard");
      } else {
        window.history.pushState({}, "", "#/");
      }
    }
  };
  const renderAdminTabContent = () => {
    switch (adminTab) {
      case "overview":
        return /* @__PURE__ */ React32.createElement(
          AdminOverview,
          {
            onNavigateTab: setAdminTab,
            onOpenSupabaseModal: () => setIsSupabaseModalOpen(true)
          }
        );
      case "profile":
        return /* @__PURE__ */ React32.createElement(ProfileManager, { onShowToast: showToast });
      case "education":
        return /* @__PURE__ */ React32.createElement(EducationManager, { onShowToast: showToast });
      case "skills":
        return /* @__PURE__ */ React32.createElement(SkillsManager, { onShowToast: showToast });
      case "projects":
        return /* @__PURE__ */ React32.createElement(ProjectsManager, { onShowToast: showToast });
      case "certifications":
        return /* @__PURE__ */ React32.createElement(CertificationsManager, { onShowToast: showToast });
      case "internships":
        return /* @__PURE__ */ React32.createElement(InternshipsManager, { onShowToast: showToast });
      case "services":
        return /* @__PURE__ */ React32.createElement(ServicesManager, { onShowToast: showToast });
      case "seminar":
        return /* @__PURE__ */ React32.createElement(SeminarManager, { onShowToast: showToast });
      case "contact_info":
        return /* @__PURE__ */ React32.createElement(ContactInfoManager, { onShowToast: showToast });
      case "resume":
        return /* @__PURE__ */ React32.createElement(ResumeManager, { onShowToast: showToast });
      case "messages":
        return /* @__PURE__ */ React32.createElement(MessagesManager, { onShowToast: showToast });
      default:
        return /* @__PURE__ */ React32.createElement(AdminOverview, { onNavigateTab: setAdminTab, onOpenSupabaseModal: () => setIsSupabaseModalOpen(true) });
    }
  };
  if (authLoading && dataLoading) {
    return /* @__PURE__ */ React32.createElement("div", { className: "min-h-screen bg-white flex flex-col items-center justify-center" }, /* @__PURE__ */ React32.createElement("div", { className: "w-12 h-12 rounded-xl bg-[#111111] text-white flex items-center justify-center font-bold text-lg animate-pulse mb-4" }, "PM"), /* @__PURE__ */ React32.createElement("p", { className: "text-xs uppercase tracking-widest text-[#666666] font-semibold" }, "Loading Portfolio..."));
  }
  return /* @__PURE__ */ React32.createElement("div", { className: "min-h-screen bg-white text-[#333333] font-sans antialiased selection:bg-[#111111] selection:text-white" }, currentRoute === "admin_login" && /* @__PURE__ */ React32.createElement(
    AdminLogin,
    {
      onLoginSuccess: () => navigateTo("admin_dashboard"),
      onBackToSite: () => navigateTo("public"),
      onShowToast: showToast
    }
  ), currentRoute === "admin_dashboard" && (isAuthenticated ? /* @__PURE__ */ React32.createElement(
    AdminLayout,
    {
      activeTab: adminTab,
      onSelectTab: setAdminTab,
      onBackToSite: () => navigateTo("public"),
      onOpenSupabaseModal: () => setIsSupabaseModalOpen(true)
    },
    renderAdminTabContent()
  ) : /* @__PURE__ */ React32.createElement(
    AdminLogin,
    {
      onLoginSuccess: () => navigateTo("admin_dashboard"),
      onBackToSite: () => navigateTo("public"),
      onShowToast: showToast
    }
  )), currentRoute === "public" && /* @__PURE__ */ React32.createElement(React32.Fragment, null, /* @__PURE__ */ React32.createElement(
    Navbar,
    {
      onNavigateAdmin: () => navigateTo(isAuthenticated ? "admin_dashboard" : "admin_login"),
      onShowToast: showToast
    }
  ), /* @__PURE__ */ React32.createElement("main", null, /* @__PURE__ */ React32.createElement(Hero, { onShowToast: showToast }), /* @__PURE__ */ React32.createElement(About, null), /* @__PURE__ */ React32.createElement(Education, null), /* @__PURE__ */ React32.createElement(Skills, null), /* @__PURE__ */ React32.createElement(Projects, null), /* @__PURE__ */ React32.createElement(Certifications, null), /* @__PURE__ */ React32.createElement(Internships, null), /* @__PURE__ */ React32.createElement(Services, null), /* @__PURE__ */ React32.createElement(Seminar, null), /* @__PURE__ */ React32.createElement(Contact, { onShowToast: showToast })), /* @__PURE__ */ React32.createElement(Footer, { onNavigateAdmin: () => navigateTo(isAuthenticated ? "admin_dashboard" : "admin_login") })), /* @__PURE__ */ React32.createElement(
    SupabaseSettingsModal,
    {
      isOpen: isSupabaseModalOpen,
      onClose: () => setIsSupabaseModalOpen(false),
      onShowToast: showToast
    }
  ), /* @__PURE__ */ React32.createElement(
    Toast,
    {
      message: toast.message,
      type: toast.type,
      onClose: hideToast
    }
  ));
}

// src/main.jsx
var rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    /* @__PURE__ */ React33.createElement(React33.StrictMode, null, /* @__PURE__ */ React33.createElement(AuthProvider, null, /* @__PURE__ */ React33.createElement(PortfolioProvider, null, /* @__PURE__ */ React33.createElement(App, null))))
  );
}
