import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  fetchAllPortfolioData, 
  saveLocalPortfolioData, 
  getSupabaseClient 
} from '../supabaseClient.js';
import * as initialData from '../data/initialData.js';

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  const [data, setData] = useState({
    profile: initialData.initialProfile,
    education: initialData.initialEducation,
    skills: initialData.initialSkills,
    projects: initialData.initialProjects,
    certifications: initialData.initialCertifications,
    internships: initialData.initialInternships,
    services: initialData.initialServices,
    seminar: initialData.initialSeminar,
    messages: initialData.initialMessages
  });
  const [loading, setLoading] = useState(true);
  const [syncSource, setSyncSource] = useState('local');

  // Load portfolio data on mount
  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchAllPortfolioData();
      setData(res.data);
      setSyncSource(res.source);
    } catch (err) {
      console.error('Error loading portfolio data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Generic helper to update a slice of state and persist locally & remotely
  const updateSlice = async (sliceKey, updatedValue, supabaseTable, supabaseAction = null) => {
    const updatedAll = {
      ...data,
      [sliceKey]: updatedValue
    };
    setData(updatedAll);
    saveLocalPortfolioData(updatedAll);

    // If Supabase client is available, sync to table
    const client = getSupabaseClient();
    if (client && supabaseTable) {
      try {
        if (supabaseAction) {
          await supabaseAction(client);
        } else if (sliceKey === 'profile') {
          await client.from('profiles').upsert([{
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
            resume_updated_at: new Date().toISOString()
          }]);
        } else if (sliceKey === 'seminar') {
          await client.from('seminars').upsert([{
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

  // Profile Management
  const updateProfile = async (newProfile) => {
    await updateSlice('profile', newProfile, 'profiles');
  };

  // Education Management (CRUD)
  const addEducation = async (item) => {
    const newItem = {
      ...item,
      id: item.id || `edu-${Date.now()}`
    };
    const updated = [...data.education, newItem];
    await updateSlice('education', updated, 'education', async (client) => {
      await client.from('education').insert([{
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
    const updated = data.education.map(item => item.id === id ? { ...item, ...updatedFields } : item);
    await updateSlice('education', updated, 'education', async (client) => {
      await client.from('education').update({
        degree: updatedFields.degree,
        institution: updatedFields.institution,
        period: updatedFields.period,
        score: updatedFields.score,
        description: updatedFields.description
      }).eq('id', id);
    });
  };

  const deleteEducation = async (id) => {
    const updated = data.education.filter(item => item.id !== id);
    await updateSlice('education', updated, 'education', async (client) => {
      await client.from('education').delete().eq('id', id);
    });
  };

  // Skills Management (CRUD)
  const addSkill = async (item) => {
    const newItem = {
      ...item,
      id: item.id || `skill-${Date.now()}`
    };
    const updated = [...data.skills, newItem];
    await updateSlice('skills', updated, 'skills', async (client) => {
      await client.from('skills').insert([{
        name: newItem.name,
        category: newItem.category,
        icon: newItem.icon,
        description: newItem.description,
        sort_order: updated.length
      }]);
    });
  };

  const updateSkill = async (id, updatedFields) => {
    const updated = data.skills.map(item => item.id === id ? { ...item, ...updatedFields } : item);
    await updateSlice('skills', updated, 'skills', async (client) => {
      await client.from('skills').update({
        name: updatedFields.name,
        category: updatedFields.category,
        icon: updatedFields.icon,
        description: updatedFields.description
      }).eq('id', id);
    });
  };

  const deleteSkill = async (id) => {
    const updated = data.skills.filter(item => item.id !== id);
    await updateSlice('skills', updated, 'skills', async (client) => {
      await client.from('skills').delete().eq('id', id);
    });
  };

  // Project Management (CRUD)
  const addProject = async (item) => {
    const newItem = {
      ...item,
      id: item.id || `proj-${Date.now()}`
    };
    const updated = [...data.projects, newItem];
    await updateSlice('projects', updated, 'projects', async (client) => {
      await client.from('projects').insert([{
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
    const updated = data.projects.map(item => item.id === id ? { ...item, ...updatedFields } : item);
    await updateSlice('projects', updated, 'projects', async (client) => {
      await client.from('projects').update({
        title: updatedFields.title,
        description: updatedFields.description,
        technologies: updatedFields.technologies,
        github_url: updatedFields.githubUrl,
        live_url: updatedFields.liveUrl,
        image_url: updatedFields.imageUrl,
        featured: updatedFields.featured
      }).eq('id', id);
    });
  };

  const deleteProject = async (id) => {
    const updated = data.projects.filter(item => item.id !== id);
    await updateSlice('projects', updated, 'projects', async (client) => {
      await client.from('projects').delete().eq('id', id);
    });
  };

  // Certifications Management (CRUD)
  const addCertification = async (item) => {
    const newItem = {
      ...item,
      id: item.id || `cert-${Date.now()}`
    };
    const updated = [...data.certifications, newItem];
    await updateSlice('certifications', updated, 'certifications', async (client) => {
      await client.from('certifications').insert([{
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
    const updated = data.certifications.map(item => item.id === id ? { ...item, ...updatedFields } : item);
    await updateSlice('certifications', updated, 'certifications', async (client) => {
      await client.from('certifications').update({
        title: updatedFields.title,
        issuer: updatedFields.issuer,
        issue_date: updatedFields.issueDate,
        credential_url: updatedFields.credentialUrl,
        file_url: updatedFields.fileUrl,
        description: updatedFields.description
      }).eq('id', id);
    });
  };

  const deleteCertification = async (id) => {
    const updated = data.certifications.filter(item => item.id !== id);
    await updateSlice('certifications', updated, 'certifications', async (client) => {
      await client.from('certifications').delete().eq('id', id);
    });
  };

  // Internships Management (CRUD)
  const addInternship = async (item) => {
    const newItem = {
      ...item,
      id: item.id || `intern-${Date.now()}`
    };
    const updated = [...data.internships, newItem];
    await updateSlice('internships', updated, 'internships', async (client) => {
      await client.from('internships').insert([{
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
    const updated = data.internships.map(item => item.id === id ? { ...item, ...updatedFields } : item);
    await updateSlice('internships', updated, 'internships', async (client) => {
      await client.from('internships').update({
        role: updatedFields.role,
        company: updatedFields.company,
        duration: updatedFields.duration,
        period: updatedFields.period,
        description: updatedFields.description,
        highlights: updatedFields.highlights
      }).eq('id', id);
    });
  };

  const deleteInternship = async (id) => {
    const updated = data.internships.filter(item => item.id !== id);
    await updateSlice('internships', updated, 'internships', async (client) => {
      await client.from('internships').delete().eq('id', id);
    });
  };

  // Services Management (CRUD)
  const addService = async (item) => {
    const newItem = {
      ...item,
      id: item.id || `serv-${Date.now()}`
    };
    const updated = [...data.services, newItem];
    await updateSlice('services', updated, 'services', async (client) => {
      await client.from('services').insert([{
        title: newItem.title,
        description: newItem.description,
        icon: newItem.icon,
        sort_order: updated.length
      }]);
    });
  };

  const updateService = async (id, updatedFields) => {
    const updated = data.services.map(item => item.id === id ? { ...item, ...updatedFields } : item);
    await updateSlice('services', updated, 'services', async (client) => {
      await client.from('services').update({
        title: updatedFields.title,
        description: updatedFields.description,
        icon: updatedFields.icon
      }).eq('id', id);
    });
  };

  const deleteService = async (id) => {
    const updated = data.services.filter(item => item.id !== id);
    await updateSlice('services', updated, 'services', async (client) => {
      await client.from('services').delete().eq('id', id);
    });
  };

  // Seminar Management
  const updateSeminar = async (newSeminar) => {
    await updateSlice('seminar', newSeminar, 'seminars');
  };

  // Messages Management
  const markMessageRead = async (id) => {
    const updated = (data.messages || []).map(m => m.id === id ? { ...m, read: true } : m);
    await updateSlice('messages', updated, 'messages', async (client) => {
      await client.from('messages').update({ is_read: true }).eq('id', id);
    });
  };

  const deleteMessage = async (id) => {
    const updated = (data.messages || []).filter(m => m.id !== id);
    await updateSlice('messages', updated, 'messages', async (client) => {
      await client.from('messages').delete().eq('id', id);
    });
  };

  // Reset to default seed
  const resetToDefaultData = () => {
    const defaultData = {
      profile: initialData.initialProfile,
      education: initialData.initialEducation,
      skills: initialData.initialSkills,
      projects: initialData.initialProjects,
      certifications: initialData.initialCertifications,
      internships: initialData.initialInternships,
      services: initialData.initialServices,
      seminar: initialData.initialSeminar,
      messages: initialData.initialMessages
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

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}

