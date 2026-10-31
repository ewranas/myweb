import React, { useState } from 'react';
import {
  Mail,
  Github,
  Facebook,
  Linkedin,
  Send,
  CheckCircle2,
  Copy,
  ExternalLink,
  Edit3,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PersonalInfo } from '../types/portfolio';

interface ContactSectionProps {
  personalInfo: PersonalInfo;
  onOpenCustomizer: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  personalInfo,
  onOpenCustomizer,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setIsSubmitted(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#2997ff', '#64d2ff', '#ffffff'],
      });
      setFormData({ name: '', email: '', message: '' });
    }, 500);
  };

  const contactChannels = [
    {
      key: 'email',
      name: 'Email',
      value: personalInfo.socials.email, // anasexp10@gmail.com
      href: `mailto:${personalInfo.socials.email}`,
      icon: Mail,
      actionLabel: 'Send Email',
    },
    {
      key: 'github',
      name: 'GitHub',
      value: personalInfo.socials.github, // https://github.com/zerolap657-design
      href: personalInfo.socials.github,
      icon: Github,
      actionLabel: 'Open GitHub',
    },
    {
      key: 'facebook',
      name: 'Facebook',
      value: personalInfo.socials.facebook,
      href: personalInfo.socials.facebook,
      icon: Facebook,
      actionLabel: 'Open Facebook',
    },
    {
      key: 'linkedin',
      name: 'LinkedIn',
      value: personalInfo.socials.linkedin,
      href: personalInfo.socials.linkedin,
      icon: Linkedin,
      actionLabel: 'Open LinkedIn',
    },
  ];

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#000000]">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-20">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#2997ff] font-mono">
            Contact
          </span>
          
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#f5f5f7]">
            Let&apos;s Build Something Meaningful.
          </h2>

          <p className="text-base sm:text-xl text-[#86868b] max-w-xl font-normal leading-relaxed text-balance">
            Have an idea, a project, or simply want to connect? I&apos;d love to hear from you.
          </p>

          <button
            onClick={onOpenCustomizer}
            className="inline-flex items-center gap-1.5 text-xs text-[#86868b] hover:text-[#2997ff] transition-colors pt-2 cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#2997ff]" />
            <span>Customize social links & profiles</span>
          </button>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Contact Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-3.5 text-left">
            <h3 className="text-lg font-bold text-[#f5f5f7] mb-2">
              Direct Contact Details
            </h3>

            {contactChannels.map((channel) => {
              const Icon = channel.icon;
              const isCopied = copiedKey === channel.key;

              return (
                <div
                  key={channel.key}
                  className="p-4 rounded-2xl bg-[#161617]/70 border border-white/[0.06] hover:border-white/[0.12] transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div className="w-9 h-9 rounded-xl bg-white/[0.04] flex items-center justify-center text-[#2997ff] group-hover:bg-[#2997ff] group-hover:text-white transition-colors shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#86868b] block">
                        {channel.name}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-[#f5f5f7] block truncate">
                        {channel.value}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleCopy(channel.value || '', channel.key)}
                      className="p-2 rounded-lg bg-white/[0.04] text-[#86868b] hover:text-[#2997ff] transition-colors cursor-pointer"
                      title={`Copy ${channel.name}`}
                    >
                      {isCopied ? (
                        <span className="text-[#30d158] font-mono text-[10px]">Copied</span>
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <a
                      href={channel.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/[0.04] text-[#86868b] hover:text-white transition-colors"
                      title={channel.actionLabel}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}

            <div className="p-4 rounded-2xl bg-[#161617]/40 border border-white/[0.04] text-xs text-[#86868b] space-y-1 mt-4">
              <div className="flex items-center justify-between">
                <span>Location:</span>
                <span className="text-[#f5f5f7]">Natore, Bangladesh</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Academic Institution:</span>
                <span className="text-[#f5f5f7] truncate max-w-[200px]">Shahid AHM Kamaruzzaman College</span>
              </div>
            </div>
          </div>

          {/* Right: Apple Contact Form (7 cols) */}
          <div className="lg:col-span-7 text-left">
            <div className="apple-glass-card p-8 sm:p-10 rounded-3xl border border-white/[0.08] shadow-2xl">
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-[#f5f5f7]">
                  Send a Direct Message
                </h3>
                <p className="text-xs text-[#86868b] mt-1">
                  Leave a note for Anas Ahammed.
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-8 rounded-2xl bg-[#161617] border border-[#2997ff]/30 text-center space-y-3 animate-in fade-in duration-300">
                  <div className="w-12 h-12 rounded-full bg-[#2997ff]/20 text-[#2997ff] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-[#f5f5f7]">Thank You</h4>
                  <p className="text-xs sm:text-sm text-[#86868b] max-w-sm mx-auto leading-relaxed">
                    Your message has been received. Anas will get back to you promptly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="apple-btn-secondary px-5 py-2 rounded-full text-xs font-medium cursor-pointer mt-2"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-[#a1a1a6] block">
                        Name <span className="text-[#ff375f]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-xl bg-[#000000] border border-white/[0.1] text-xs sm:text-sm text-[#f5f5f7] placeholder-[#6e6e73] focus:outline-none focus:border-[#2997ff] transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-[#a1a1a6] block">
                        Email <span className="text-[#ff375f]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@domain.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#000000] border border-white/[0.1] text-xs sm:text-sm text-[#f5f5f7] placeholder-[#6e6e73] focus:outline-none focus:border-[#2997ff] transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#a1a1a6] block">
                      Message <span className="text-[#ff375f]">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your thoughts, suggestions for FOLAFOL, or collaboration..."
                      className="w-full px-4 py-3 rounded-xl bg-[#000000] border border-white/[0.1] text-xs sm:text-sm text-[#f5f5f7] placeholder-[#6e6e73] focus:outline-none focus:border-[#2997ff] transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 px-6 rounded-full font-medium text-sm apple-btn-primary flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
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
};
