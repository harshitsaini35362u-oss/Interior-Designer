/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Compass, Search, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { InspirationItem } from '../types';

interface InspirationViewProps {
  inspiration: InspirationItem[];
  onUseStyle: (style: string, roomType: string) => void;
  onNavigate: (view: string) => void;
}

export function InspirationView({ inspiration, onUseStyle, onNavigate }: InspirationViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('All');

  const styles = ['All', 'Japandi', 'Modern Indian', 'Scandinavian', 'Industrial', 'Neo-Classical', 'Bohemian'];

  const filteredItems = inspiration.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.roomType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStyle = selectedStyle === 'All' || item.style === selectedStyle;
    return matchesSearch && matchesStyle;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#FAF9F6] dark:bg-[#121212] text-[#282828] dark:text-[#FAF9F6] pb-24 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#E9DFD0] dark:border-neutral-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E9DFD0] dark:bg-neutral-800 text-xs font-medium text-[#282828] dark:text-[#B69A6A] mb-2">
              <Compass className="w-3.5 h-3.5 text-[#B69A6A]" />
              <span>Inspiration Library</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Design Inspiration Gallery</h1>
            <p className="text-sm text-neutral-500 mt-1">Explore award-winning architectural interiors and apply any style instantly</p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search styles, rooms, materials..."
              className="w-full pl-11 pr-4 py-3 bg-white dark:bg-neutral-900 border border-[#E9DFD0] dark:border-neutral-800 rounded-xl text-xs focus:outline-none focus:border-[#B69A6A]"
            />
          </div>
        </div>

        {/* Style Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {styles.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStyle(st)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedStyle === st
                  ? 'bg-[#282828] dark:bg-[#B69A6A] text-white'
                  : 'bg-white dark:bg-neutral-900 border border-[#E9DFD0] dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:border-[#B69A6A]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-[#E9DFD0] dark:border-neutral-800 hover:border-[#B69A6A] transition-colors shadow-sm group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md text-[#282828] dark:text-white text-xs font-semibold">
                    {item.style}
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <span className="font-semibold text-[#B69A6A]">{item.roomType}</span>
                    <span>·</span>
                    <span>{item.tags.join(' / ')}</span>
                  </div>
                  <h3 className="text-lg font-bold group-hover:text-[#B69A6A] transition-colors">{item.title}</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2">{item.description}</p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-[#E9DFD0]/50 dark:border-neutral-800 flex items-center justify-between">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onUseStyle(item.style, item.roomType);
                    onNavigate('studio');
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#282828] dark:bg-[#B69A6A] text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-black transition-all shadow-sm"
                >
                  <Sparkles className="w-4 h-4 text-[#B69A6A] dark:text-white" />
                  <span>Use This Style in Studio</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </motion.div>
  );
}
