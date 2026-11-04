import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext.jsx';
import { submitContactMessage } from '../supabaseClient.js';

export default function Contact({ onShowToast }) {
  const { profile } = usePortfolio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full Name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) errs.subject = 'Subject is required';
    if (!formData.message.trim()) {
      errs.message = 'Message content is required';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
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
        setFormData({ name: '', email: '', subject: '', message: '' });
        if (onShowToast) {
          onShowToast('Thank you! Your message has been sent successfully.', 'success');
        }
      } else {
        if (onShowToast) {
          onShowToast('Failed to send message. Please try again.', 'error');
        }
      }
    } catch (err) {
      console.error('Contact submit error:', err);
      if (onShowToast) {
        onShowToast('Something went wrong. Please try again.', 'error');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white border-b border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-xs uppercase tracking-widest text-[#666666] font-semibold mb-2">09 / Get In Touch</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight">Contact</h2>
          <div className="w-12 h-1 bg-[#111111] mt-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Direct Contact Details & Availability */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-[#111111] tracking-tight mb-4">
                Let's discuss data opportunities and analytical projects.
              </h3>
              <p className="text-sm text-[#555555] leading-relaxed mb-8">
                I am actively seeking Data Analyst internships and entry-level positions. Whether you have an inquiry, project collaboration, or mentorship advice, I'd love to connect.
              </p>

              {/* Contact Cards */}
              <div className="space-y-4">
                {/* Email */}
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-4 p-4 rounded-xl border border-[#E5E5E5] hover:border-[#111111] bg-[#FAFAFA] transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#111111] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[11px] uppercase tracking-wider text-[#666666] font-medium block">Email Address</span>
                    <span className="text-sm font-bold text-[#111111] truncate block">{profile.email}</span>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href={`tel:${profile.phone}`}
                  className="flex items-center gap-4 p-4 rounded-xl border border-[#E5E5E5] hover:border-[#111111] bg-[#FAFAFA] transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#111111] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#666666] font-medium block">Phone</span>
                    <span className="text-sm font-bold text-[#111111] block">{profile.phone}</span>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-4 p-4 rounded-xl border border-[#E5E5E5] bg-[#FAFAFA]">
                  <div className="w-10 h-10 rounded-lg bg-[#111111] text-white flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#666666] font-medium block">Location</span>
                    <span className="text-sm font-bold text-[#111111] block">{profile.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-8 mt-8 border-t border-[#E5E5E5] flex items-center gap-4">
              <span className="text-xs uppercase tracking-wider text-[#666666] font-semibold">Social Profiles:</span>
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#F3F3F3] text-xs font-semibold text-[#111111] hover:bg-[#111111] hover:text-white transition-all"
                >
                  LinkedIn
                </a>
              )}
              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#F3F3F3] text-xs font-semibold text-[#111111] hover:bg-[#111111] hover:text-white transition-all"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Working Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAFAFA] p-8 sm:p-10 rounded-2xl border border-[#E5E5E5] shadow-sm">
              <h4 className="text-xl font-bold text-[#111111] mb-2 tracking-tight">
                Send a Direct Message
              </h4>
              <p className="text-xs sm:text-sm text-[#666666] mb-8">
                Fill out the form below. Messages are securely stored and monitored directly in the Admin portal.
              </p>

              {submitted ? (
                <div className="p-6 bg-white border border-emerald-300 rounded-xl text-center animate-fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h5 className="text-base font-bold text-[#111111] mb-1">Message Received!</h5>
                  <p className="text-xs text-[#555555] mb-4">
                    Thank you for reaching out. I will review your inquiry and respond to your email shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#111111] bg-[#F3F3F3] rounded-md hover:bg-[#E5E5E5] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. John Doe"
                        className={`w-full px-4 py-2.5 rounded-lg text-sm bg-white ${
                          errors.name ? 'border-red-500' : 'border-[#E5E5E5]'
                        }`}
                      />
                      {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. john@example.com"
                        className={`w-full px-4 py-2.5 rounded-lg text-sm bg-white ${
                          errors.email ? 'border-red-500' : 'border-[#E5E5E5]'
                        }`}
                      />
                      {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Data Analyst Internship / Project Inquiry"
                      className={`w-full px-4 py-2.5 rounded-lg text-sm bg-white ${
                        errors.subject ? 'border-red-500' : 'border-[#E5E5E5]'
                      }`}
                    />
                    {errors.subject && <p className="text-[11px] text-red-500 mt-1">{errors.subject}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-1.5">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                      className={`w-full px-4 py-2.5 rounded-lg text-sm bg-white resize-y ${
                        errors.message ? 'border-red-500' : 'border-[#E5E5E5]'
                      }`}
                    />
                    {errors.message && <p className="text-[11px] text-red-500 mt-1">{errors.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] rounded-lg hover:bg-neutral-800 transition-all disabled:opacity-50 shadow-sm"
                  >
                    {submitting ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
