import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext.jsx';
import { usePortfolio } from './context/PortfolioContext.jsx';

// Public Components
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Education from './components/Education.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Certifications from './components/Certifications.jsx';
import Internships from './components/Internships.jsx';
import Services from './components/Services.jsx';
import Seminar from './components/Seminar.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import Toast from './components/Toast.jsx';

// Admin Components
import AdminLayout from './admin/AdminLayout.jsx';
import AdminLogin from './admin/AdminLogin.jsx';
import AdminOverview from './admin/AdminOverview.jsx';
import ProfileManager from './admin/ProfileManager.jsx';
import EducationManager from './admin/EducationManager.jsx';
import SkillsManager from './admin/SkillsManager.jsx';
import ProjectsManager from './admin/ProjectsManager.jsx';
import CertificationsManager from './admin/CertificationsManager.jsx';
import InternshipsManager from './admin/InternshipsManager.jsx';
import ServicesManager from './admin/ServicesManager.jsx';
import SeminarManager from './admin/SeminarManager.jsx';
import ContactInfoManager from './admin/ContactInfoManager.jsx';
import ResumeManager from './admin/ResumeManager.jsx';
import MessagesManager from './admin/MessagesManager.jsx';
import SupabaseSettingsModal from './admin/SupabaseSettingsModal.jsx';

export default function App() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { loading: dataLoading } = usePortfolio();

  // Route state ('public', 'admin_login', 'admin_dashboard')
  const [currentRoute, setCurrentRoute] = useState('public');
  const [adminTab, setAdminTab] = useState('overview');
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);

  // Global Toast
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast({ message: '', type: 'success' });
  };

  // Sync route with URL path / hash
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();

      if (path.includes('/admin/login') || hash.includes('admin/login')) {
        setCurrentRoute(isAuthenticated ? 'admin_dashboard' : 'admin_login');
      } else if (path.includes('/admin') || hash.includes('admin')) {
        setCurrentRoute(isAuthenticated ? 'admin_dashboard' : 'admin_login');
      } else {
        setCurrentRoute('public');
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, [isAuthenticated]);

  const navigateTo = (route, updateUrl = true) => {
    setCurrentRoute(route);
    if (updateUrl) {
      if (route === 'admin_login') {
        window.history.pushState({}, '', '#/admin/login');
      } else if (route === 'admin_dashboard') {
        window.history.pushState({}, '', '#/admin/dashboard');
      } else {
        window.history.pushState({}, '', '#/');
      }
    }
  };

  // Render Admin Content based on active sidebar tab
  const renderAdminTabContent = () => {
    switch (adminTab) {
      case 'overview':
        return (
          <AdminOverview
            onNavigateTab={setAdminTab}
            onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
          />
        );
      case 'profile':
        return <ProfileManager onShowToast={showToast} />;
      case 'education':
        return <EducationManager onShowToast={showToast} />;
      case 'skills':
        return <SkillsManager onShowToast={showToast} />;
      case 'projects':
        return <ProjectsManager onShowToast={showToast} />;
      case 'certifications':
        return <CertificationsManager onShowToast={showToast} />;
      case 'internships':
        return <InternshipsManager onShowToast={showToast} />;
      case 'services':
        return <ServicesManager onShowToast={showToast} />;
      case 'seminar':
        return <SeminarManager onShowToast={showToast} />;
      case 'contact_info':
        return <ContactInfoManager onShowToast={showToast} />;
      case 'resume':
        return <ResumeManager onShowToast={showToast} />;
      case 'messages':
        return <MessagesManager onShowToast={showToast} />;
      default:
        return <AdminOverview onNavigateTab={setAdminTab} onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)} />;
    }
  };

  // Loading Screen
  if (authLoading && dataLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="w-12 h-12 rounded-xl bg-[#111111] text-white flex items-center justify-center font-bold text-lg animate-pulse mb-4">
          PM
        </div>
        <p className="text-xs uppercase tracking-widest text-[#666666] font-semibold">
          Loading Portfolio...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#333333] font-sans antialiased selection:bg-[#111111] selection:text-white">
      
      {/* 1. Admin Login View */}
      {currentRoute === 'admin_login' && (
        <AdminLogin
          onLoginSuccess={() => navigateTo('admin_dashboard')}
          onBackToSite={() => navigateTo('public')}
          onShowToast={showToast}
        />
      )}

      {/* 2. Admin Dashboard View */}
      {currentRoute === 'admin_dashboard' && (
        isAuthenticated ? (
          <AdminLayout
            activeTab={adminTab}
            onSelectTab={setAdminTab}
            onBackToSite={() => navigateTo('public')}
            onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
          >
            {renderAdminTabContent()}
          </AdminLayout>
        ) : (
          <AdminLogin
            onLoginSuccess={() => navigateTo('admin_dashboard')}
            onBackToSite={() => navigateTo('public')}
            onShowToast={showToast}
          />
        )
      )}

      {/* 3. Public Portfolio View */}
      {currentRoute === 'public' && (
        <>
          <Navbar onNavigateAdmin={() => navigateTo(isAuthenticated ? 'admin_dashboard' : 'admin_login')} />
          <main>
            <Hero />
            <About />
            <Education />
            <Skills />
            <Projects />
            <Certifications />
            <Internships />
            <Services />
            <Seminar />
            <Contact onShowToast={showToast} />
          </main>
          <Footer onNavigateAdmin={() => navigateTo(isAuthenticated ? 'admin_dashboard' : 'admin_login')} />
        </>
      )}

      {/* Supabase Settings Modal */}
      <SupabaseSettingsModal
        isOpen={isSupabaseModalOpen}
        onClose={() => setIsSupabaseModalOpen(false)}
        onShowToast={showToast}
      />

      {/* Global Notification Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />

    </div>
  );
}
