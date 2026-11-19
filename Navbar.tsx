/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sparkles, LayoutDashboard, Wand2, FolderKanban, Compass, Layers, Calculator, Settings } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export function Navbar({ currentView, onNavigate }: NavbarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'studio', label: 'AI Studio', icon: Wand2 },
    { id: 'projects', label: 'My Projects', icon: FolderKanban },
    { id: 'inspiration', label: 'Inspiration', icon: Compass },
    { id: 'library', label: 'Library', icon: Layers },
    { id: 'budget', label: 'Budget Planner', icon: Calculator },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FAF9F6]/90 dark:bg-[#1a1a1a]/90 backdrop-blur-md border-b border-[#E9DFD0] dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <button 
          onClick={() => onNavigate('dashboard')} 
          className="flex items-center gap-3 text-left group focus:outline-none shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#B69A6A] to-[#282828] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-[#282828] dark:text-[#FAF9F6]">
              DreamSpace AI
            </span>
            <span className="block text-[10px] uppercase tracking-widest text-[#B69A6A] font-semibold">
              Interior Studio
            </span>
          </div>
        </button>

        {/* Zone 2: Clean single-line navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#282828]/70 dark:text-neutral-300">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-[#282828] dark:text-white bg-[#E9DFD0]/60 dark:bg-neutral-800 font-semibold shadow-xs'
                    : 'hover:text-[#282828] dark:hover:text-white hover:bg-[#E9DFD0]/30 dark:hover:bg-neutral-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#B69A6A]' : 'text-neutral-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={() => onNavigate('studio')}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#282828] dark:bg-[#B69A6A] rounded-xl hover:bg-black dark:hover:bg-[#a3875a] transition-all shadow-md whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-4 h-4 text-[#B69A6A] dark:text-white" />
            <span>New Design</span>
          </button>
        </div>

      </div>

      {/* Mobile Nav Row */}
      <div className="lg:hidden flex items-center justify-around px-4 py-2 border-t border-[#E9DFD0] dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 overflow-x-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] whitespace-nowrap shrink-0 ${
                isActive ? 'text-[#B69A6A] font-bold' : 'text-neutral-600 dark:text-neutral-400'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
