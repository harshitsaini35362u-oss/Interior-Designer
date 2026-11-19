/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sparkles, Wand2, ArrowRight, Compass, Calculator, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import { Project, InspirationItem } from '../types';

interface DashboardViewProps {
  onNavigate: (view: string) => void;
  projects: Project[];
  inspiration: InspirationItem[];
  onSelectProject: (project: Project) => void;
}

export function DashboardView({ onNavigate, projects, inspiration, onSelectProject }: DashboardViewProps) {
  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#121212] text-[#282828] dark:text-[#FAF9F6] pb-24 transition-colors overflow-hidden">
      
      {/* Hero Welcome Banner */}
      <section className="relative overflow-hidden py-16 px-6 lg:px-12 border-b border-[#E9DFD0] dark:border-neutral-800 bg-gradient-to-br from-[#FAF9F6] via-[#E9DFD0]/30 to-[#FAF9F6] dark:from-[#121212] dark:via-neutral-900 dark:to-[#121212]">
        
        {/* Ambient background motion glow */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#B69A6A]/10 blur-3xl pointer-events-none"
        />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E9DFD0] dark:bg-neutral-800 text-xs font-medium text-[#282828] dark:text-[#B69A6A]">
              <Sparkles className="w-3.5 h-3.5 text-[#B69A6A]" />
              <span>Next-Gen AI Interior Architecture</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-wrap">
              Transform your rooms into architectural masterpieces with <span className="text-[#B69A6A]">AI</span>.
            </h1>
            
            <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-xl">
              Upload any room photograph, select your signature style, customize materials and lighting, and watch Gemini AI generate photorealistic redesigns instantly.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate('studio')}
                className="flex items-center gap-3 px-8 py-4 bg-[#282828] dark:bg-[#B69A6A] text-white rounded-xl font-semibold hover:bg-black dark:hover:bg-[#a3875a] transition-all shadow-xl"
              >
                <Wand2 className="w-5 h-5 text-[#B69A6A] dark:text-white" />
                <span>Start AI Design Studio</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate('inspiration')}
                className="flex items-center gap-2 px-6 py-4 bg-white dark:bg-neutral-800 border border-[#E9DFD0] dark:border-neutral-700 rounded-xl font-semibold hover:bg-[#E9DFD0]/30 transition-all shadow-sm"
              >
                <Compass className="w-5 h-5 text-[#B69A6A]" />
                <span>Explore Gallery</span>
              </motion.button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#E9DFD0] dark:border-neutral-800">
              <div>
                <div className="text-2xl font-bold tracking-tight text-[#282828] dark:text-white">16+</div>
                <div className="text-xs text-neutral-500">Design Styles</div>
              </div>
              <div>
                <div className="text-2xl font-bold tracking-tight text-[#282828] dark:text-white">Photoreal</div>
                <div className="text-xs text-neutral-500">AI Redesigns</div>
              </div>
              <div>
                <div className="text-2xl font-bold tracking-tight text-[#282828] dark:text-white">Instant</div>
                <div className="text-xs text-neutral-500">Cost Estimator</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-neutral-800 aspect-[4/3] group">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
                alt="Luxury Modern Living Room Redesign"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs font-semibold text-[#B69A6A] uppercase tracking-wider">Featured Transformation</span>
                <h3 className="text-xl font-bold">Luxury Modern Indian Living Room</h3>
                <p className="text-xs text-neutral-300 mt-1">Italian Marble · Fluted Wood · Warm Ambient Lighting</p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 space-y-16">
        
        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'AI Room Redesign',
              desc: 'Upload your existing room photo and transform it into any architectural style in seconds.',
              icon: Wand2,
              view: 'studio'
            },
            {
              title: 'Interior Budget Estimator',
              desc: 'Calculate room-by-room cost breakdowns for civil work, flooring, painting, and modular furniture.',
              icon: Calculator,
              view: 'budget'
            },
            {
              title: 'Materials & Furniture',
              desc: 'Explore our curated library of Italian marble, wooden veneers, designer sofas, and statement lighting.',
              icon: Layers,
              view: 'library'
            },
          ].map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                onClick={() => onNavigate(card.view)}
                className="p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-[#E9DFD0] dark:border-neutral-800 hover:border-[#B69A6A] transition-colors cursor-pointer group shadow-sm hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-xl bg-[#E9DFD0]/50 dark:bg-neutral-800 flex items-center justify-center text-[#B69A6A] mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">{card.desc}</p>
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#B69A6A]">
                  <span>Explore Now</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Recent Projects Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Recent Projects</h2>
              <p className="text-sm text-neutral-500">Your latest AI interior transformations and saved designs</p>
            </div>
            <button
              onClick={() => onNavigate('projects')}
              className="text-sm font-semibold text-[#B69A6A] hover:underline flex items-center gap-1"
            >
              <span>View All ({projects.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj, idx) => (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                onClick={() => {
                  onSelectProject(proj);
                  onNavigate('studio');
                }}
                className="bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-[#E9DFD0] dark:border-neutral-800 hover:border-[#B69A6A] transition-colors cursor-pointer group shadow-sm hover:shadow-lg"
              >
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
                    <span>{proj.roomType}</span>
                    <span>·</span>
                    <span>{proj.createdAt}</span>
                  </div>
                  <h3 className="text-lg font-bold group-hover:text-[#B69A6A] transition-colors">{proj.name}</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2">{proj.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Inspiration Gallery Preview */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Design Inspiration Gallery</h2>
              <p className="text-sm text-neutral-500">Curated architectural styles from around the world</p>
            </div>
            <button
              onClick={() => onNavigate('inspiration')}
              className="text-sm font-semibold text-[#B69A6A] hover:underline flex items-center gap-1"
            >
              <span>Explore All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {inspiration.slice(0, 3).map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                onClick={() => onNavigate('inspiration')}
                className="bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-[#E9DFD0] dark:border-neutral-800 hover:border-[#B69A6A] transition-colors cursor-pointer group shadow-sm hover:shadow-md"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md text-[#282828] dark:text-white text-[11px] font-semibold">
                    {item.style}
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-lg font-bold group-hover:text-[#B69A6A] transition-colors">{item.title}</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2">{item.description}</p>
                  <div className="flex items-center gap-2 pt-2 text-[11px] text-neutral-500">
                    <span>{item.roomType}</span>
                    <span>·</span>
                    <span>{item.tags.join(' / ')}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
