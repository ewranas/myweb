import React, { useState } from 'react';
import { X, Check, Mail, Send, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  email,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2>(1);

  // Form states
  const [needOption, setNeedOption] = useState('Website Development');
  const [helpOption, setHelpOption] = useState('Personal Website');
  const [message, setMessage] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const needOptions = [
    'Website Development',
    'Software Project',
    'Collaboration',
    'Just Saying Hello',
  ];

  const helpOptions = [
    'Personal Website',
    'Portfolio Website',
    'Web Application',
    'Other',
  ];

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderEmail) return;

    // Trigger subtle monochrome/white confetti
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#ffffff', '#cccccc', '#888888'],
    });

    setSubmitted(true);

    // Prepare mailto link option
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${needOption} - ${helpOption}`);
    const body = encodeURIComponent(
      `Hello Anas,\n\nMy name is ${senderName} (${senderEmail}).\n\nInterest: ${needOption}\nCategory: ${helpOption}\n\nMessage:\n${message}\n\nBest regards,\n${senderName}`
    );

    // Save inquiry to localStorage for Anas
    try {
      const existing = JSON.parse(localStorage.getItem('anas_contact_inquiries') || '[]');
      existing.push({
        date: new Date().toISOString(),
        needOption,
        helpOption,
        senderName,
        senderEmail,
        message,
      });
      localStorage.setItem('anas_contact_inquiries', JSON.stringify(existing));
    } catch {
      // ignore
    }
  };

  const openEmailClient = () => {
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${needOption} - ${helpOption}`);
    const body = encodeURIComponent(
      `Hello Anas,\n\nMy name is ${senderName} (${senderEmail}).\n\nInterest: ${needOption}\nCategory: ${helpOption}\n\nMessage:\n${message}\n\nBest regards,\n${senderName}`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-300">
      
      {/* Centered Modal Container */}
      <div className="relative w-full max-w-xl rounded-3xl bg-[#111111] border border-white/[0.12] p-8 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] text-left animate-in zoom-in-95 duration-200">
        
        {/* Close Button (Top-Right) */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.1] text-[#888888] hover:text-[#f5f5f5] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Title */}
        <div className="mb-6 space-y-1">
          <span className="text-[10px] font-mono tracking-[0.2em] text-[#888888] uppercase">
            START A CONVERSATION
          </span>
          <h3 className="font-editorial text-3xl font-bold text-[#f5f5f5]">
            Get in Touch
          </h3>
        </div>

        {submitted ? (
          <div className="py-8 space-y-5 text-center animate-in fade-in duration-300">
            <div className="w-12 h-12 rounded-full bg-white/[0.08] text-[#f5f5f5] flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h4 className="text-xl font-bold text-[#f5f5f5]">
                Inquiry Prepared & Saved
              </h4>
              <p className="text-xs sm:text-sm text-[#888888] max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{senderName}</strong>. Your note has been logged directly for Anas Ahammed ({email}).
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={openEmailClient}
                className="w-full sm:w-auto btn-minimal-white px-5 py-2.5 rounded-full text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Send via Default Email App</span>
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.1] text-xs font-medium text-[#f5f5f5] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : step === 1 ? (
          /* Step 1: Project Needs & Concept */
          <form onSubmit={handleNext} className="space-y-6">
            
            {/* Field 1: What do you need? */}
            <div className="space-y-2.5">
              <label className="text-xs font-mono uppercase tracking-wider text-[#888888] block">
                What do you need?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {needOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setNeedOption(opt)}
                    className={`p-3 rounded-xl text-xs font-medium text-left transition-all border cursor-pointer ${
                      needOption === opt
                        ? 'bg-white text-[#050505] border-white shadow-sm font-semibold'
                        : 'bg-[#181818] text-[#888888] hover:text-[#f5f5f5] border-white/[0.06] hover:border-white/[0.14]'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Field 2: How can I help? */}
            <div className="space-y-2.5">
              <label className="text-xs font-mono uppercase tracking-wider text-[#888888] block">
                How can I help?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {helpOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setHelpOption(opt)}
                    className={`p-3 rounded-xl text-xs font-medium text-left transition-all border cursor-pointer ${
                      helpOption === opt
                        ? 'bg-white text-[#050505] border-white shadow-sm font-semibold'
                        : 'bg-[#181818] text-[#888888] hover:text-[#f5f5f5] border-white/[0.06] hover:border-white/[0.14]'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Field 3: Message Textarea */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-[#888888] block">
                Message
              </label>
              <textarea
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about your idea..."
                className="w-full px-4 py-3 rounded-2xl bg-[#050505] border border-white/[0.1] text-xs sm:text-sm text-[#f5f5f5] placeholder-[#555555] focus:outline-none focus:border-white transition-all resize-none"
              />
            </div>

            {/* Modal Buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-white/[0.08]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs text-[#888888] hover:text-[#f5f5f5] transition-colors cursor-pointer"
              >
                Close
              </button>

              <button
                type="submit"
                className="btn-minimal-white px-6 py-2.5 rounded-full text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-lg"
              >
                <span>Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </form>
        ) : (
          /* Step 2: Contact Details */
          <form onSubmit={handleFinalSubmit} className="space-y-5">
            
            <div className="p-3.5 rounded-2xl bg-[#181818] border border-white/[0.06] text-xs text-[#888888] space-y-1">
              <div>Selection: <strong className="text-[#f5f5f5]">{needOption}</strong> · {helpOption}</div>
              <div className="italic truncate">&quot;{message}&quot;</div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-[#888888] block">
                Your Name <span className="text-white">*</span>
              </label>
              <input
                type="text"
                required
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Your full name"
                className="w-full px-4 py-3 rounded-2xl bg-[#050505] border border-white/[0.1] text-xs sm:text-sm text-[#f5f5f5] placeholder-[#555555] focus:outline-none focus:border-white transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-[#888888] block">
                Your Email Address <span className="text-white">*</span>
              </label>
              <input
                type="email"
                required
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full px-4 py-3 rounded-2xl bg-[#050505] border border-white/[0.1] text-xs sm:text-sm text-[#f5f5f5] placeholder-[#555555] focus:outline-none focus:border-white transition-all"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs text-[#888888] hover:text-[#f5f5f5] transition-colors cursor-pointer"
              >
                Back
              </button>

              <button
                type="submit"
                className="btn-minimal-white px-7 py-2.5 rounded-full text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-lg"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Message</span>
              </button>
            </div>

          </form>
        )}

      </div>

    </div>
  );
};
