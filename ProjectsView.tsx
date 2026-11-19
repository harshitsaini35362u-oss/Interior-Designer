/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FolderKanban, Trash2, ArrowRight, Plus, Sparkles, Calendar, Layers } from 'lucide-react';
import { Project } from '../types';

interface ProjectsViewProps {
  projects: Project[];
  onSelectProject: (proj: Project) => void;
  onDeleteProject: (id: string) => void;
  onNavigate: (view: string) => void;
}

export function ProjectsView({ projects, onSelectProject, onDeleteProject, onNavigate }: ProjectsViewProps) {
  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#121212] text-[#282828] dark:text-[#FAF9F6] pb-24 transition-colors">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E9DFD0] dark:border-neutral-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E9DFD0] dark:bg-neutral-800 text-xs font-medium text-[#282828] dark:text-[#B69A6A] mb-2">
              <FolderKanban className="w-3.5 h-3.5 text-[#B69A6A]" />
              <span>Project Repository</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">My Interior Projects</h1>
            <p className="text-sm text-neutral-500 mt-1">Manage, revisit, and customize all your saved AI room designs</p>
          </div>

          <button
            onClick={() => onNavigate('studio')}
            className="flex items-center gap-2 px-6 py-3 bg-[#282828] dark:bg-[#B69A6A] text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-black transition-all shadow-md self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Design</span>
          </button>
        </div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-[#E9DFD0] dark:border-neutral-800 hover:border-[#B69A6A] transition-all shadow-sm group flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={proj.generatedImage}
                      alt={proj.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-medium">
                      {proj.style}
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-neutral-500">
                      <span className="font-semibold text-[#B69A6A]">{proj.roomType}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {proj.createdAt}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold group-hover:text-[#B69A6A] transition-colors">{proj.name}</h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2">{proj.description}</p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-[#E9DFD0]/50 dark:border-neutral-800">
                  <button
                    onClick={() => {
                      onSelectProject(proj);
                      onNavigate('studio');
                    }}
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#282828] dark:text-white hover:text-[#B69A6A]"
                  >
                    <span>Open Studio</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onDeleteProject(proj.id)}
                    className="p-2 text-neutral-400 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-neutral-900 rounded-3xl border border-[#E9DFD0] dark:border-neutral-800 p-8 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-[#E9DFD0]/50 dark:bg-neutral-800 flex items-center justify-center text-[#B69A6A] mx-auto">
              <Layers className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold">No Saved Projects Yet</h3>
            <p className="text-sm text-neutral-500 max-w-md mx-auto">
              Your AI-generated room transformations will appear here automatically when you save them in the AI Design Studio.
            </p>
            <button
              onClick={() => onNavigate('studio')}
              className="px-6 py-3 bg-[#282828] dark:bg-[#B69A6A] text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-black transition-all"
            >
              Start Your First Design
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
