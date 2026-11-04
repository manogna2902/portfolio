/**
 * Supabase Client & Intelligent Persistence Layer
 * Seamlessly handles live Supabase Postgres/Auth/Storage with zero-configuration localStorage fallback.
 */

import { createClient } from '@supabase/supabase-js';
import * as initialData from './data/initialData.js';

const STORAGE_KEY_CONFIG = 'manogna_portfolio_supabase_config';
const STORAGE_KEY_DATA = 'manogna_portfolio_data_v1';
const STORAGE_KEY_AUTH = 'manogna_portfolio_auth_user';

// Fallback administrator credentials for instant local access
export const DEFAULT_ADMIN = {
  email: 'manogna2902@gmail.com',
  password: 'AdminPassword@2026',
  name: 'Pittala Manogna (Admin)',
  role: 'admin'
};

// Retrieve saved configuration or fallback to env variables
export function getSupabaseConfig() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.url && parsed.anonKey) return parsed;
    }
  } catch (e) {
    console.warn('Error reading Supabase config from localStorage:', e);
  }

  // Check Vite env
  const envUrl = typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL;
  const envKey = typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY;

  if (envUrl && envKey && !envUrl.includes('your-project')) {
    return { url: envUrl, anonKey: envKey };
  }

  return { url: '', anonKey: '' };
}

// Global active client instance
let supabaseInstance = null;

export function getSupabaseClient() {
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
        console.error('Failed to initialize Supabase client:', err);
        supabaseInstance = null;
      }
    }
    return supabaseInstance;
  }
  return null;
}

export function isSupabaseConfigured() {
  const config = getSupabaseConfig();
  return Boolean(config.url && config.anonKey);
}

export function saveSupabaseConfig(url, anonKey) {
  const config = { url: url.trim(), anonKey: anonKey.trim() };
  localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
  supabaseInstance = null; // force reinit
  return getSupabaseClient();
}

export async function testSupabaseConnection(url, anonKey) {
  try {
    const testClient = createClient(url, anonKey);
    // Simple ping query
    const { data, error } = await testClient.from('profiles').select('name').limit(1);
    if (error && error.code !== 'PGRST116') {
      // If table doesn't exist yet, it's still a valid connection to Supabase
      if (error.message.includes('relation "public.profiles" does not exist')) {
        return { success: true, message: 'Connected to Supabase! (Tables need to be created using schema.sql)' };
      }
      return { success: false, message: error.message };
    }
    return { success: true, message: 'Connected successfully to Supabase database!' };
  } catch (err) {
    return { success: false, message: err.message || 'Connection failed' };
  }
}

// ---------------------------------------------------------
// DATA LAYER (Syncs Supabase with LocalStorage Fallback)
// ---------------------------------------------------------

export function getLocalPortfolioData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_DATA);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error reading local portfolio data:', e);
  }

  // Initial structured data
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

  saveLocalPortfolioData(defaultData);
  return defaultData;
}

export function saveLocalPortfolioData(data) {
  try {
    localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving local portfolio data:', e);
  }
}

// Fetch all portfolio data from Supabase or LocalStorage
export async function fetchAllPortfolioData() {
  const local = getLocalPortfolioData();
  const client = getSupabaseClient();

  if (!client) {
    return { data: local, source: 'local' };
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
      client.from('profiles').select('*').limit(1).maybeSingle(),
      client.from('education').select('*').order('sort_order', { ascending: true }),
      client.from('skills').select('*').order('sort_order', { ascending: true }),
      client.from('projects').select('*').order('sort_order', { ascending: true }),
      client.from('certifications').select('*').order('created_at', { ascending: false }),
      client.from('internships').select('*').order('created_at', { ascending: false }),
      client.from('services').select('*').order('sort_order', { ascending: true }),
      client.from('seminars').select('*').limit(1).maybeSingle(),
      client.from('messages').select('*').order('created_at', { ascending: false })
    ]);

    // Format mapped data
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
        avatarUrl: profileRes.data.avatar_url || '',
        resumeUrl: profileRes.data.resume_url || '',
        resumeFileName: profileRes.data.resume_file_name || 'Pittala_Manogna_Resume.pdf',
        resumeUpdatedAt: profileRes.data.resume_updated_at || local.profile.resumeUpdatedAt
      } : local.profile,

      education: eduRes.data && eduRes.data.length > 0 ? eduRes.data.map(e => ({
        id: e.id,
        degree: e.degree,
        institution: e.institution,
        period: e.period,
        score: e.score,
        description: e.description,
        order: e.sort_order
      })) : local.education,

      skills: skillsRes.data && skillsRes.data.length > 0 ? skillsRes.data.map(s => ({
        id: s.id,
        name: s.name,
        category: s.category,
        icon: s.icon,
        description: s.description
      })) : local.skills,

      projects: projectsRes.data && projectsRes.data.length > 0 ? projectsRes.data.map(p => ({
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

      certifications: certsRes.data && certsRes.data.length > 0 ? certsRes.data.map(c => ({
        id: c.id,
        title: c.title,
        issuer: c.issuer,
        issueDate: c.issue_date,
        credentialUrl: c.credential_url,
        fileUrl: c.file_url,
        description: c.description
      })) : local.certifications,

      internships: internRes.data && internRes.data.length > 0 ? internRes.data.map(i => ({
        id: i.id,
        role: i.role,
        company: i.company,
        duration: i.duration,
        period: i.period,
        description: i.description,
        highlights: i.highlights || []
      })) : local.internships,

      services: servicesRes.data && servicesRes.data.length > 0 ? servicesRes.data.map(s => ({
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

      messages: messagesRes.data && messagesRes.data.length > 0 ? messagesRes.data.map(m => ({
        id: m.id,
        name: m.name,
        email: m.email,
        subject: m.subject,
        message: m.message,
        timestamp: m.created_at,
        read: m.is_read
      })) : local.messages
    };

    // Cache locally as well
    saveLocalPortfolioData(remoteData);
    return { data: remoteData, source: 'supabase' };
  } catch (err) {
    console.warn('Failed to fetch from Supabase, falling back to local data:', err);
    return { data: local, source: 'local' };
  }
}

// Generic file uploader (handles Supabase Storage or Base64 Data URL)
export async function uploadAsset(bucketName, file, customName) {
  const client = getSupabaseClient();
  const fileName = `${Date.now()}-${customName || file.name.replace(/\s+/g, '_')}`;

  if (client) {
    try {
      const { data, error } = await client.storage
        .from(bucketName)
        .upload(fileName, file, { cacheControl: '3600', upsert: true });

      if (!error && data) {
        const { data: publicUrlData } = client.storage
          .from(bucketName)
          .getPublicUrl(fileName);
        return { success: true, url: publicUrlData.publicUrl, fileName };
      }
    } catch (e) {
      console.warn('Supabase storage upload failed, falling back to local Base64:', e);
    }
  }

  // Fallback to Base64 Data URL
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({ success: true, url: reader.result, fileName: file.name });
    };
    reader.onerror = () => {
      resolve({ success: false, error: 'Could not read file' });
    };
    reader.readAsDataURL(file);
  });
}

// Submit contact message
export async function submitContactMessage(messageData) {
  const client = getSupabaseClient();
  const newMsg = {
    id: `msg-${Date.now()}`,
    name: messageData.name.trim(),
    email: messageData.email.trim(),
    subject: messageData.subject.trim(),
    message: messageData.message.trim(),
    timestamp: new Date().toISOString(),
    read: false
  };

  // Always save to local data
  const local = getLocalPortfolioData();
  const updatedMessages = [newMsg, ...(local.messages || [])];
  saveLocalPortfolioData({ ...local, messages: updatedMessages });

  // If Supabase is active, insert remotely
  if (client) {
    try {
      await client.from('messages').insert([{
        name: newMsg.name,
        email: newMsg.email,
        subject: newMsg.subject,
        message: newMsg.message,
        is_read: false
      }]);
    } catch (err) {
      console.warn('Could not insert message into Supabase:', err);
    }
  }

  return { success: true, message: newMsg };
}

// ---------------------------------------------------------
// AUTHENTICATION
// ---------------------------------------------------------

export function getStoredAuthUser() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_AUTH);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.error('Error reading auth user:', e);
  }
  return null;
}

export function setStoredAuthUser(user) {
  if (user) {
    localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEY_AUTH);
  }
}

export async function loginAdmin(email, password) {
  const client = getSupabaseClient();

  if (client) {
    try {
      const { data, error } = await client.auth.signInWithPassword({
        email: email.trim(),
        password: password
      });

      if (!error && data?.user) {
        const user = {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.name || 'Administrator',
          role: 'admin',
          source: 'supabase'
        };
        setStoredAuthUser(user);
        return { success: true, user };
      }
    } catch (e) {
      console.warn('Supabase auth attempt failed, testing local admin fallback:', e);
    }
  }

  // Fallback authentication with default credentials
  if (
    (email.trim().toLowerCase() === DEFAULT_ADMIN.email.toLowerCase() ||
     email.trim().toLowerCase() === 'admin@pittalaspaces.com') &&
    password === DEFAULT_ADMIN.password
  ) {
    const user = {
      id: 'local-admin-1',
      email: email.trim(),
      name: DEFAULT_ADMIN.name,
      role: 'admin',
      source: 'local'
    };
    setStoredAuthUser(user);
    return { success: true, user };
  }

  return {
    success: false,
    error: 'Invalid email or password. Default admin: manogna2902@gmail.com / AdminPassword@2026'
  };
}

export async function logoutAdmin() {
  const client = getSupabaseClient();
  if (client) {
    try {
      await client.auth.signOut();
    } catch (e) {
      console.warn('Supabase sign out error:', e);
    }
  }
  setStoredAuthUser(null);
  return { success: true };
}
