import React, { useState, useRef } from 'react';
import { X, Upload, RotateCcw, Check, Sparkles } from 'lucide-react';
import { PersonalInfo } from '../types/portfolio';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  personalInfo: PersonalInfo;
  onUpdatePersonalInfo: (updated: PersonalInfo) => void;
  onResetToDefaults: () => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  personalInfo,
  onUpdatePersonalInfo,
  onResetToDefaults,
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<PersonalInfo>(personalInfo);
  const [photoPreview, setPhotoPreview] = useState<string>(personalInfo.photoUrl);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhotoPreview(result);
        setFormData((prev) => ({ ...prev, photoUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePersonalInfo({ ...formData, photoUrl: photoPreview });
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#161617] border border-white/[0.12] p-6 sm:p-8 shadow-2xl max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5 text-left">
            <div className="p-2 rounded-xl bg-white/[0.04] text-[#2997ff]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#f5f5f7]">Personalize Profile & Links</h3>
              <p className="text-xs text-[#86868b]">Upload your Facebook photo or update contact handles</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/[0.04] text-[#86868b] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6 pt-5 text-left">
          
          {/* Profile Photo */}
          <div className="space-y-3">
            <label className="text-xs font-mono text-[#2997ff] uppercase tracking-wider block">
              Profile Photo (Circular Crop)
            </label>
            
            <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-[#000000] border border-white/[0.08]">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#2997ff] p-0.5 shadow-md shrink-0">
                <img
                  src={photoPreview}
                  alt="Preview"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <div className="flex-1 space-y-2 text-center sm:text-left">
                <p className="text-xs text-[#a1a1a6]">
                  Select your Facebook profile photo file from your device:
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="apple-btn-primary px-3.5 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Image File</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const def = '/src/assets/images/anas_profile_real.jpg';
                      setPhotoPreview(def);
                      setFormData((prev) => ({ ...prev, photoUrl: def }));
                    }}
                    className="px-3.5 py-1.5 rounded-full bg-white/[0.05] text-[#86868b] text-xs hover:text-white transition-colors cursor-pointer"
                  >
                    <span>Use Default</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <label className="text-xs font-mono text-[#2997ff] uppercase tracking-wider block">
              Contact & Social Channels
            </label>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] text-[#86868b] block mb-1">Email</label>
                <input
                  type="email"
                  value={formData.socials.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socials: { ...formData.socials, email: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-[#000000] border border-white/[0.08] text-xs text-[#f5f5f7] focus:outline-none focus:border-[#2997ff]"
                />
              </div>

              <div>
                <label className="text-[11px] text-[#86868b] block mb-1">GitHub URL</label>
                <input
                  type="text"
                  value={formData.socials.github}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socials: { ...formData.socials, github: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-[#000000] border border-white/[0.08] text-xs text-[#f5f5f7] focus:outline-none focus:border-[#2997ff]"
                />
              </div>

              <div>
                <label className="text-[11px] text-[#86868b] block mb-1">Facebook URL</label>
                <input
                  type="text"
                  value={formData.socials.facebook}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socials: { ...formData.socials, facebook: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-[#000000] border border-white/[0.08] text-xs text-[#f5f5f7] focus:outline-none focus:border-[#2997ff]"
                />
              </div>

              <div>
                <label className="text-[11px] text-[#86868b] block mb-1">LinkedIn URL</label>
                <input
                  type="text"
                  value={formData.socials.linkedin}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socials: { ...formData.socials, linkedin: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-[#000000] border border-white/[0.08] text-xs text-[#f5f5f7] focus:outline-none focus:border-[#2997ff]"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={onResetToDefaults}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-[#86868b] hover:text-[#ff375f] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-full bg-white/[0.04] text-xs text-[#a1a1a6] hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="apple-btn-primary px-5 py-2 rounded-full text-xs font-medium cursor-pointer"
              >
                {saveSuccess ? 'Saved!' : 'Save Changes'}
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
