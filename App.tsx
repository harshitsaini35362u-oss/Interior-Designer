/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { StudioView } from './components/StudioView';
import { ProjectsView } from './components/ProjectsView';
import { InspirationView } from './components/InspirationView';
import { LibraryView } from './components/LibraryView';
import { BudgetView } from './components/BudgetView';
import { SettingsView } from './components/SettingsView';
import { INITIAL_PROJECTS, INITIAL_INSPIRATION, INITIAL_LIBRARY } from './data/mockData';
import { Project } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  const handleSaveProject = (newProject: Project) => {
    setProjects(prev => {
      const exists = prev.find(p => p.id === newProject.id);
      if (exists) {
        return prev.map(p => p.id === newProject.id ? newProject : p);
      }
      return [newProject, ...prev];
    });
    setCurrentProject(newProject);
  };

  const handleDeleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    if (currentProject?.id === id) {
      setCurrentProject(null);
    }
  };

  const handleUseStyle = (style: string, roomType: string) => {
    setCurrentProject({
      id: 'proj-' + Date.now(),
      name: `${style} ${roomType}`,
      roomType,
      style,
      originalImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
      generatedImage: '',
      description: '',
      createdAt: new Date().toISOString().split('T')[0],
      preferences: {
        wallColors: 'Neutral & Warm',
        flooring: 'Wood / Marble',
        lighting: 'Ambient & Cove',
        furnitureStyle: style,
        mood: 'Cozy & Luxurious'
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#121212] font-sans antialiased selection:bg-[#B69A6A] selection:text-white">
      <Navbar currentView={currentView} onNavigate={setCurrentView} />

      <main>
        {currentView === 'dashboard' && (
          <DashboardView
            onNavigate={setCurrentView}
            projects={projects}
            inspiration={INITIAL_INSPIRATION}
            onSelectProject={setCurrentProject}
          />
        )}

        {currentView === 'studio' && (
          <StudioView
            currentProject={currentProject}
            onSaveProject={handleSaveProject}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'projects' && (
          <ProjectsView
            projects={projects}
            onSelectProject={setCurrentProject}
            onDeleteProject={handleDeleteProject}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'inspiration' && (
          <InspirationView
            inspiration={INITIAL_INSPIRATION}
            onUseStyle={handleUseStyle}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'library' && (
          <LibraryView library={INITIAL_LIBRARY} />
        )}

        {currentView === 'budget' && (
          <BudgetView />
        )}

        {currentView === 'settings' && (
          <SettingsView />
        )}
      </main>
    </div>
  );
}
