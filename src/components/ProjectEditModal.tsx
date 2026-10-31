import React, { useState, useEffect } from 'react';
import { X, Check, FolderGit2, Trash2 } from 'lucide-react';
import { ProjectItem } from '../types/portfolio';

interface ProjectEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectItem | null;
  onSave: (updatedProject: ProjectItem) => void;
  onDelete?: (projectId: string) => void;
}

export const ProjectEditModal: React.FC<ProjectEditModalProps> = ({
  isOpen,
  onClose,
  project,
  onSave,
  onDelete,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState(project?.title || '');
  const [badge, setBadge] = useState(project?.badge || 'Project');
  const [category, setCategory] = useState(project?.category || 'Software');
  const [description, setDescription] = useState(project?.description || '');
  const [techString, setTechString] = useState(project?.technologies.join(', ') || '');
  const [githubUrl, setGithubUrl] = useState(project?.githubUrl || '');
  const [liveDemoUrl, setLiveDemoUrl] = useState(project?.liveDemoUrl || '');
  const [image, setImage] = useState(project?.image || '/src/assets/images/dev_workspace_code_1793470982568.jpg');

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setBadge(project.badge);
      setCategory(project.category);
      setDescription(project.description);
      setTechString(project.technologies.join(', '));
      setGithubUrl(project.githubUrl);
      setLiveDemoUrl(project.liveDemoUrl);
      setImage(project.image);
    } else {
      setTitle('');
      setBadge('New Project');
      setCategory('Web / Software');
      setDescription('');
      setTechString('Python, Web');
      setGithubUrl('https://github.com/zerolap657-design');
      setLiveDemoUrl('#');
      setImage('/src/assets/images/dev_workspace_code_1793470982568.jpg');
    }
  }, [project]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: ProjectItem = {
      id: project?.id || `project-${Date.now()}`,
      title,
      badge,
      category,
      description,
      technologies: techString.split(',').map((t) => t.trim()).filter(Boolean),
      githubUrl,
      liveDemoUrl,
      image,
      highlights: project?.highlights || [
        'Built with clean modular architecture',
        'Focused on accessibility and smooth user experience',
      ],
      isEditablePlaceholder: true,
    };
    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#161617] border border-white/[0.12] p-6 sm:p-8 shadow-2xl max-h-[92vh] overflow-y-auto text-left">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/[0.04] text-[#2997ff]">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#f5f5f7]">
                {project ? 'Edit Project Details' : 'Add New Project'}
              </h3>
              <p className="text-xs text-[#86868b]">Customize title, description, and technologies</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/[0.04] text-[#86868b] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-mono text-[#86868b] uppercase tracking-wider block mb-1">
                Project Name
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. FOLAFOL"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#000000] border border-white/[0.08] text-xs text-white focus:outline-none focus:border-[#2997ff]"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-[#86868b] uppercase tracking-wider block mb-1">
                Badge / Tag
              </label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="e.g. Educational Technology"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#000000] border border-white/[0.08] text-xs text-white focus:outline-none focus:border-[#2997ff]"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-mono text-[#86868b] uppercase tracking-wider block mb-1">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Educational Technology, Automation, Web App"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#000000] border border-white/[0.08] text-xs text-white focus:outline-none focus:border-[#2997ff]"
            />
          </div>

          <div>
            <label className="text-[11px] font-mono text-[#86868b] uppercase tracking-wider block mb-1">
              Short Description
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain the purpose, who it helps, and core functionality..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#000000] border border-white/[0.08] text-xs text-white focus:outline-none focus:border-[#2997ff] resize-none"
            />
          </div>

          <div>
            <label className="text-[11px] font-mono text-[#86868b] uppercase tracking-wider block mb-1">
              Technologies (comma separated)
            </label>
            <input
              type="text"
              value={techString}
              onChange={(e) => setTechString(e.target.value)}
              placeholder="e.g. Python, REST APIs, HTML, CSS, JavaScript"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#000000] border border-white/[0.08] text-xs text-white focus:outline-none focus:border-[#2997ff]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-mono text-[#86868b] uppercase tracking-wider block mb-1">
                GitHub Repository URL
              </label>
              <input
                type="text"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#000000] border border-white/[0.08] text-xs text-white focus:outline-none focus:border-[#2997ff]"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-[#86868b] uppercase tracking-wider block mb-1">
                Live Demo URL (or #)
              </label>
              <input
                type="text"
                value={liveDemoUrl}
                onChange={(e) => setLiveDemoUrl(e.target.value)}
                placeholder="#"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#000000] border border-white/[0.08] text-xs text-white focus:outline-none focus:border-[#2997ff]"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
            {project && onDelete && project.id !== 'folafol' ? (
              <button
                type="button"
                onClick={() => onDelete(project.id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#ff375f] hover:bg-[#ff375f]/10 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            ) : (
              <div />
            )}

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
                <span>Save Project</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
