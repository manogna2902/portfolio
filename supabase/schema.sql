-- ==============================================================================
-- SUPABASE POSTGRESQL SCHEMA FOR PITTALA MANOGNA'S PORTFOLIO
-- Features: Full CRUD, Row Level Security (RLS), Storage policies, Initial Seed
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    tagline TEXT,
    location TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    linkedin TEXT,
    github TEXT,
    bio TEXT NOT NULL,
    interests TEXT[] DEFAULT '{}',
    avatar_url TEXT,
    resume_url TEXT,
    resume_file_name TEXT,
    resume_updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. EDUCATION TABLE
CREATE TABLE IF NOT EXISTS public.education (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    degree TEXT NOT NULL,
    institution TEXT NOT NULL,
    period TEXT NOT NULL,
    score TEXT NOT NULL,
    description TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. SKILLS TABLE
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category TEXT,
    icon TEXT DEFAULT 'code',
    description TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    technologies TEXT[] DEFAULT '{}',
    github_url TEXT,
    live_url TEXT,
    image_url TEXT,
    featured BOOLEAN DEFAULT true,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. CERTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.certifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    issue_date TEXT,
    credential_url TEXT,
    file_url TEXT,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. INTERNSHIPS TABLE
CREATE TABLE IF NOT EXISTS public.internships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    duration TEXT,
    period TEXT,
    description TEXT NOT NULL,
    highlights TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT DEFAULT 'layout',
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. SEMINARS TABLE
CREATE TABLE IF NOT EXISTS public.seminars (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    seminar_type TEXT DEFAULT 'Academic Seminar Topic',
    institution TEXT,
    description TEXT NOT NULL,
    extended_notes TEXT,
    key_takeaways TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Only authenticated users (administrators) can modify portfolio data.
-- Public users can view the portfolio and submit contact messages.
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.internships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seminars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Profiles: Public Read, Auth Write
CREATE POLICY "Public profiles are readable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Only authenticated admin can insert/update profile" ON public.profiles FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Education: Public Read, Auth Write
CREATE POLICY "Public education is readable by everyone" ON public.education FOR SELECT USING (true);
CREATE POLICY "Only authenticated admin can modify education" ON public.education FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Skills: Public Read, Auth Write
CREATE POLICY "Public skills are readable by everyone" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Only authenticated admin can modify skills" ON public.skills FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Projects: Public Read, Auth Write
CREATE POLICY "Public projects are readable by everyone" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Only authenticated admin can modify projects" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Certifications: Public Read, Auth Write
CREATE POLICY "Public certifications are readable by everyone" ON public.certifications FOR SELECT USING (true);
CREATE POLICY "Only authenticated admin can modify certifications" ON public.certifications FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Internships: Public Read, Auth Write
CREATE POLICY "Public internships are readable by everyone" ON public.internships FOR SELECT USING (true);
CREATE POLICY "Only authenticated admin can modify internships" ON public.internships FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Services: Public Read, Auth Write
CREATE POLICY "Public services are readable by everyone" ON public.services FOR SELECT USING (true);
CREATE POLICY "Only authenticated admin can modify services" ON public.services FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Seminars: Public Read, Auth Write
CREATE POLICY "Public seminars are readable by everyone" ON public.seminars FOR SELECT USING (true);
CREATE POLICY "Only authenticated admin can modify seminars" ON public.seminars FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Messages: Anyone can insert, only Authenticated Admin can read / update / delete
CREATE POLICY "Anyone can submit a contact message" ON public.messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Only authenticated admin can view contact messages" ON public.messages FOR SELECT TO authenticated USING (true);
CREATE POLICY "Only authenticated admin can manage contact messages" ON public.messages FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Only authenticated admin can delete contact messages" ON public.messages FOR DELETE TO authenticated USING (true);

-- ==============================================================================
-- STORAGE BUCKET CONFIGURATION
-- Buckets: portfolio-assets, resumes, certificates
-- ==============================================================================

INSERT INTO storage.buckets (id, name, public) VALUES 
('portfolio-assets', 'portfolio-assets', true),
('resumes', 'resumes', true),
('certificates', 'certificates', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
CREATE POLICY "Public read for portfolio assets" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-assets');
CREATE POLICY "Auth write for portfolio assets" ON storage.objects FOR ALL TO authenticated USING (bucket_id = 'portfolio-assets') WITH CHECK (bucket_id = 'portfolio-assets');

CREATE POLICY "Public read for resumes" ON storage.objects FOR SELECT USING (bucket_id = 'resumes');
CREATE POLICY "Auth write for resumes" ON storage.objects FOR ALL TO authenticated USING (bucket_id = 'resumes') WITH CHECK (bucket_id = 'resumes');

CREATE POLICY "Public read for certificates" ON storage.objects FOR SELECT USING (bucket_id = 'certificates');
CREATE POLICY "Auth write for certificates" ON storage.objects FOR ALL TO authenticated USING (bucket_id = 'certificates') WITH CHECK (bucket_id = 'certificates');

-- ==============================================================================
-- SEED DATA FOR PITTALA MANOGNA
-- ==============================================================================

INSERT INTO public.profiles (
    name, title, tagline, location, email, phone, linkedin, github, bio, interests
) VALUES (
    'Pittala Manogna',
    'B.Tech Data Science Student | Aspiring Data Analyst',
    'Turning Data into Meaningful Insights',
    'Warangal, Telangana, India',
    'manogna2902@gmail.com',
    '+91 8331003290',
    'https://www.linkedin.com/in/manogna-pittala-077aa9325/',
    'https://github.com/manogna2902',
    'I am a passionate B.Tech Data Science student at KITSW, Warangal, with a strong interest in Data Analytics, Python, Machine Learning, and Artificial Intelligence. I enjoy working with data, exploring new technologies, and developing problem-solving skills. My career goal is to become a successful Data Analyst and transform raw data into meaningful insights that support better decision-making. I am a quick learner, curious about new technologies, and committed to continuously improving my technical and analytical skills.',
    ARRAY['Data Analytics', 'Python', 'Machine Learning', 'Artificial Intelligence', 'Data Visualization', 'Problem Solving']
) ON CONFLICT DO NOTHING;

INSERT INTO public.education (degree, institution, period, score, description, sort_order) VALUES
('B.Tech – Data Science', 'Kakatiya Institute of Technology and Science (KITSW), Warangal', '2024–Present', 'CGPA: 8.8', 'Focusing on Core Data Science, Python programming, Machine Learning, Database Management Systems, and Statistical Data Analysis.', 1),
('Intermediate – MPC', 'TSRJC CET Girls, Nirmal', '2022–2024', 'Percentage: 96.9%', 'Rigorous focus on advanced Mathematics, Physics, and Analytical problem solving with outstanding academic standing.', 2),
('SSC (Secondary School Certificate)', 'ZPHS Maskapur', '2022', 'GPA: 9.2', 'Completed secondary education with top honors in quantitative subjects and general sciences.', 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.skills (name, category, icon, description, sort_order) VALUES
('Python', 'Programming & Analysis', 'code', 'Data wrangling, analytical scripting, statistical computation, and foundational machine learning.', 1),
('Tableau', 'Business Intelligence', 'bar-chart-2', 'Interactive visual reports, calculated fields, dashboard design, and business trend tracking.', 2),
('Data Visualization', 'Analytical Storytelling', 'pie-chart', 'Visual exploratory analysis, charting patterns, KPIs, and turning complex metrics into clarity.', 3),
('Java', 'Core Programming', 'cpu', 'Object-oriented principles, algorithmic problem solving, and structured data handling.', 4),
('Problem Solving', 'Core Analytical', 'brain', 'Root-cause diagnostics, logical deduction, algorithmic thinking, and quantitative reasoning.', 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.projects (title, description, technologies, github_url, live_url, featured, sort_order) VALUES
('StudyMate', 'An intelligent collaborative study management platform designed for students to organize academic resources, schedule study sessions, track subject milestones, and gain analytical insights into peer learning habits.', ARRAY['Python', 'Data Analytics', 'React', 'Tailwind CSS', 'Database Design'], 'https://github.com/manogna2902', '', true, 1),
('TRICITY', 'An urban data analytics and civic information platform providing spatial visualizations, municipal data tracking, and community resource reporting to empower citizens and urban planners with data-backed decisions.', ARRAY['Python', 'Civic Analytics', 'Data Visualization', 'REST APIs', 'GIS Mapping'], 'https://github.com/manogna2902', '', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.certifications (title, issuer, issue_date, credential_url, description) VALUES
('Hedera Certified Foundation (HCF)', 'Hedera', '2024', 'https://hedera.com', 'Verified foundational proficiency in distributed ledger technology, Hedera Hashgraph consensus algorithms, token services, and decentralized architecture.')
ON CONFLICT DO NOTHING;

INSERT INTO public.internships (role, company, duration, period, description, highlights) VALUES
('Java Programming Intern', 'InternPe', '6 Weeks', '2026', 'Completed an intensive 6-week hands-on internship focusing on core Java programming, object-oriented software design, data structures, and practical application development.', ARRAY['Built structured Java modules adhering to OOP and clean architecture principles', 'Developed algorithms for data manipulation and optimized efficiency', 'Applied debugging, version control, and real-world software testing practices'])
ON CONFLICT DO NOTHING;

INSERT INTO public.services (title, description, icon, sort_order) VALUES
('Data Visualization using Tableau', 'Transforming complex datasets into clear, interactive, and actionable Tableau dashboards that drive strategic understanding.', 'layout', 1),
('Dashboard Creation', 'Designing end-to-end performance and KPI dashboards tailored for continuous tracking, metrics evaluation, and decision-making.', 'gauge', 2),
('Data Cleaning and Data Preprocessing', 'Detecting anomalies, handling missing values, standardizing formats, and structuring raw data for dependable statistical modeling.', 'filter', 3),
('Basic Python Programming', 'Writing clean, modular Python scripts to automate repetitive tasks, parse unstructured files, and compute quantitative metrics.', 'terminal', 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.seminars (title, seminar_type, institution, description, extended_notes, key_takeaways) VALUES
('Credit Card Fraud Detection', 'Academic Seminar Topic', 'KITSW, Warangal', 'Academic seminar exploring machine learning-based approaches for identifying fraudulent credit card transactions.', 'Analyzed critical challenges in high-frequency financial systems including extreme class imbalance, concept drift, feature scaling, and optimizing Precision-Recall trade-offs over raw accuracy to minimize false negatives.', ARRAY['Examined supervised classification models (Logistic Regression, Random Forests, XGBoost) on anonymized PCA datasets', 'Evaluated resampling strategies such as SMOTE and Random Undersampling for highly skewed distributions', 'Highlighted cost-sensitive learning metrics: F1-Score, PR-AUC, and financial loss minimization'])
ON CONFLICT DO NOTHING;
