# Supabase Setup Guide for Pittala Manogna's Portfolio

This guide explains how to connect your portfolio website to a real Supabase backend with PostgreSQL, Authentication, and Storage.

---

## 1. Create a Supabase Project
1. Go to [https://supabase.com](https://supabase.com) and sign in or create a free account.
2. Click **New project**.
3. Enter:
   - **Name**: `manogna-portfolio`
   - **Database Password**: Choose a strong password.
   - **Region**: Choose the closest region (e.g. `ap-south-1` for Mumbai / India).
4. Click **Create new project** and wait ~2 minutes for provisioning.

---

## 2. Run the Database Schema
1. In your Supabase dashboard, click **SQL Editor** from the left navigation menu.
2. Click **New query**.
3. Open the file `supabase/schema.sql` located in this project, copy its entire contents, and paste it into the SQL Editor.
4. Click **Run** (or press `Ctrl+Enter`).
5. You will see:
   - All 9 tables created (`profiles`, `education`, `skills`, `projects`, `certifications`, `internships`, `services`, `seminars`, `messages`).
   - Row Level Security (RLS) configured (public read, authenticated admin write).
   - Storage buckets created (`portfolio-assets`, `resumes`, `certificates`).
   - Default seed data for Pittala Manogna inserted.

---

## 3. Create Your Admin User
1. In your Supabase dashboard, go to **Authentication** > **Users**.
2. Click **Add user** > **Create user**.
3. Enter:
   - **Email**: `manogna2902@gmail.com` (or your preferred admin email)
   - **Password**: Create a secure password (e.g., `AdminSecure@2026`)
   - Check **Auto Confirm User?** so you can log in immediately without email confirmation.
4. Click **Create user**.

---

## 4. Get Your API Credentials
1. Go to **Project Settings** (gear icon at the bottom left) > **API**.
2. Under **Project URL**, copy your **URL** (looks like `https://xyzcompany.supabase.co`).
3. Under **Project API keys**, copy the **`anon` `public`** key.

---

## 5. Connect to Your Portfolio
You have two easy ways to connect:

### Method A: Through the Portfolio Admin UI (Easiest & Instant!)
1. Open the website and go to `/admin/login`.
2. Log in using the default credentials:
   - Email: `manogna2902@gmail.com`
   - Password: `AdminPassword@2026`
3. In the Admin Dashboard header or sidebar, click **"Supabase Settings"**.
4. Paste your **Supabase Project URL** and **Anon Key**.
5. Click **"Test & Save Connection"**.
6. That's it! Your portfolio will now seamlessly synchronize all data, photos, resumes, and contact submissions with your live Supabase cloud database!

### Method B: Via `.env` File
Create a `.env` file in the root of the project with:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key-here
```
