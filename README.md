# Modern Personal Portfolio Website – Pittala Manogna

> **B.Tech Data Science Student | Aspiring Data Analyst**  
> Kakatiya Institute of Technology and Science (KITSW), Warangal  
> *"Turning Data into Meaningful Insights"*

A complete, responsive personal portfolio website engineered with **React**, **Tailwind CSS**, and **Supabase (PostgreSQL, Authentication & Storage)**. It features an interactive **Admin Dashboard** allowing Pittala Manogna to update all personal information, photos, education, skills, projects, certifications, internships, services, resume, and contact messages dynamically without touching source code.

---

## 🌟 Key Features

### Public Portfolio
- **Minimalist Aesthetic**: Sophisticated palette (Primary Black `#111111`, Light Grey `#F3F3F3`, Borders `#E5E5E5`, White background) with clean Inter typography and spacious layouts.
- **Hero Section**: Personal introduction, title, profile portrait, downloadable resume CTA, project explorer CTA, and verified LinkedIn/GitHub links.
- **About Section**: Detailed biography, career objective, and core interest badges (*Data Analytics, Python, Machine Learning, Artificial Intelligence, Data Visualization, Problem Solving*).
- **Education Section**: Modern vertical timeline featuring:
  - **B.Tech – Data Science** (KITSW, Warangal | 2024–Present | CGPA: 8.8)
  - **Intermediate – MPC** (TSRJC CET Girls, Nirmal | 2022–2024 | 96.9%)
  - **SSC** (ZPHS Maskapur | 2022 | GPA: 9.2)
- **Technical Skills**: Professional cards without fake proficiency bars (*Python, Tableau, Data Visualization, Java, Problem Solving*).
- **Featured Projects**: Project cards with tech stacks, repository buttons, and descriptions:
  - **StudyMate**: Intelligent collaborative student study platform.
  - **TRICITY**: Urban analytics and civic spatial data platform.
  - *(Strictly excludes the student data repair project as requested)*.
- **Certifications & Internships (Separate Sections)**:
  - **Internship**: Java Programming Internship – InternPe (6 Weeks, 2026).
  - **Certification**: Hedera Certified Foundation (HCF) with credential link and certificate preview.
- **Services (4 Tailored Offerings)**:
  1. Data Visualization using Tableau
  2. Dashboard Creation
  3. Data Cleaning and Data Preprocessing
  4. Basic Python Programming
- **Academic Seminar**:
  - **Credit Card Fraud Detection**: Academic study on machine learning for extreme class imbalance and financial anomaly detection (*strictly categorized as an academic seminar topic*).
- **Working Contact Section**:
  - Direct email, phone, location, and social links.
  - Fully validated contact form saving submissions securely to the database.

---

## 🔒 Admin Dashboard (`/admin/login` & `/admin/dashboard`)

The portfolio includes a secure administrative control center accessible at `/#/admin/login` or `/admin/login`.

### Default Login Credentials
- **Admin Email**: `manogna2902@gmail.com` (or `admin@pittalaspaces.com`)
- **Admin Password**: `AdminPassword@2026`

### Admin Features
1. **Overview**: Metric summary, unread message badges, system sync status, quick actions.
2. **Profile Management**: Upload & replace profile picture, edit biography, career title, location, phone, email, and social URLs.
3. **Education Management**: Add, edit, and delete degrees, update CGPAs and percentages.
4. **Skills Management**: Add, modify, or remove skills and select category tags.
5. **Projects Management**: Add new projects, upload screenshots, add tags, update GitHub & demo links.
6. **Certifications Management**: Add certificates, attach image/PDF files, link verification URLs.
7. **Internships Management**: Add internship details, dates, companies, and technical takeaways.
8. **Services Management**: Update service titles, descriptions, and icon styles.
9. **Seminar Management**: Manage the academic seminar abstract and key takeaways.
10. **Resume Management**: Upload a new resume PDF, replace existing file, preview, or remove. Updates the public "Download Resume" buttons instantly.
11. **Contact Messages**: Review visitor inquiries, mark as read, delete messages, and reply via one-click email.
12. **Supabase Cloud Settings**: Test and connect your live Supabase project right from the browser.

---

## 🚀 How to Run the Portfolio Locally

### Option 1: One-Click Windows Launcher (Easiest)
Simply double-click:
```bat
start_portfolio.bat
```
This automatically starts the local HTTP server on `http://localhost:3000` and opens your default browser!

### Option 2: Python Command Line
```powershell
python run.py
```

### Option 3: Standard Node / Vite Workflow
```powershell
npm install
npm run dev
```

---

## 🗄️ Supabase Backend Setup (PostgreSQL, Auth & Storage)

A ready-to-run database script is provided at `supabase/schema.sql`.

### Quick Setup Steps:
1. Log in to [Supabase](https://supabase.com) and create a new project (e.g. `manogna-portfolio`).
2. Navigate to **SQL Editor** > **New Query**.
3. Paste the contents of `supabase/schema.sql` and click **Run**.
4. In **Authentication** > **Users**, click **Add user** and create:
   - Email: `manogna2902@gmail.com`
   - Password: Choose your password
5. Copy your **Project URL** and **Anon Key** from **Project Settings** > **API**.
6. Open your portfolio Admin Dashboard (`http://localhost:3000/#/admin/dashboard`), click **"Supabase Setup"** in the top bar, paste your credentials, and click **"Save & Connect"**.

All data, uploads, and submissions will now be synchronized with your Supabase cloud backend!

---

## 📂 Project Architecture

```
Portfolio/
├── index.html                  # HTML entry point with SEO, Inter font & Tailwind config
├── run.py                      # Python local HTTP runner & auto-browser launcher
├── start_portfolio.bat         # One-click Windows runner
├── build.bat                   # Sub-50ms esbuild bundler
├── package.json                # Standard npm configuration
├── vite.config.js              # Vite configuration
├── README.md                   # Complete documentation
├── dist/
│   ├── bundle.js               # Production ES module bundle
│   └── bundle.css              # Custom minimalist CSS & styling
├── supabase/
│   ├── schema.sql              # Complete PostgreSQL schema, RLS, storage buckets, seed data
│   └── setup_guide.md          # Step-by-step setup walkthrough
└── src/
    ├── index.css               # Minimalist color palette & utilities
    ├── supabaseClient.js       # Client with Supabase & LocalStorage dual sync
    ├── context/
    │   ├── AuthContext.jsx     # Authentication context & session handling
    │   └── PortfolioContext.jsx# Global portfolio state & CRUD operations
    ├── components/
    │   ├── Navbar.jsx          # Public navigation with mobile drawer
    │   ├── Hero.jsx            # Hero section with avatar, CTAs & social links
    │   ├── About.jsx           # 2-column about & core interests
    │   ├── Education.jsx       # Vertical timeline (KITSW, TSRJC, ZPHS)
    │   ├── Skills.jsx          # Professional cards with icons (no fake %)
    │   ├── Projects.jsx        # StudyMate, TRICITY cards with tech tags
    │   ├── Certifications.jsx  # Hedera HCF credential card & file viewer
    │   ├── Internships.jsx     # InternPe 6-week Java programming internship
    │   ├── Services.jsx        # 4 Tableau & Data services
    │   ├── Seminar.jsx         # Credit Card Fraud Detection seminar topic
    │   ├── Contact.jsx         # Working contact form with validation
    │   ├── Footer.jsx          # Minimal footer with quick links & admin portal
    │   ├── Toast.jsx           # Notification toast
    │   └── Modal.jsx           # Reusable confirmation & editor modal
    ├── admin/
    │   ├── AdminLayout.jsx     # Professional sidebar & dashboard shell
    │   ├── AdminLogin.jsx      # Admin login page (/admin/login)
    │   ├── AdminOverview.jsx   # Metrics, stats, quick links & recent messages
    │   ├── ProfileManager.jsx  # Avatar upload, bio, name, title, contact links
    │   ├── EducationManager.jsx# CRUD timeline entries & CGPA
    │   ├── SkillsManager.jsx   # CRUD skills & icons
    │   ├── ProjectsManager.jsx # CRUD projects, screenshots, tags & repos
    │   ├── CertificationsManager.jsx # CRUD certifications & certificate upload
    │   ├── InternshipsManager.jsx    # CRUD internship records
    │   ├── ServicesManager.jsx # CRUD services
    │   ├── SeminarManager.jsx  # Academic seminar editor
    │   ├── ContactInfoManager.jsx    # Contact details editor
    │   ├── ResumeManager.jsx   # Resume PDF upload, replace & delete
    │   ├── MessagesManager.jsx # View submissions, mark read & delete
    │   └── SupabaseSettingsModal.jsx # Live Supabase credential connector
    └── data/
        └── initialData.js      # Seed data matching Pittala Manogna's profile
```

---

## 👩‍💻 Author
**Pittala Manogna**  
- Email: [manogna2902@gmail.com](mailto:manogna2902@gmail.com)  
- LinkedIn: [linkedin.com/in/manogna-pittala-077aa9325](https://www.linkedin.com/in/manogna-pittala-077aa9325/)  
- GitHub: [github.com/manogna2902](https://github.com/manogna2902)
