/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Layers, Search, Tag } from 'lucide-react';
import { motion } from 'motion/react';
import { LibraryItem } from '../types';

interface LibraryViewProps {
  library: LibraryItem[];
}

export function LibraryView({ library }: LibraryViewProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Catalog' },
    { id: 'furniture', label: 'Furniture' },
    { id: 'material', label: 'Materials & Finishes' },
    { id: 'lighting', label: 'Lighting' },
  ];

  const filteredItems = library.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.subCategory.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
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
              <Layers className="w-3.5 h-3.5 text-[#B69A6A]" />
              <span>Material & Product Catalog</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Furniture & Materials Library</h1>
            <p className="text-sm text-neutral-500 mt-1">Explore luxury Italian marbles, wooden veneers, and designer statement furniture</p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search catalog items..."
              className="w-full pl-11 pr-4 py-3 bg-white dark:bg-neutral-900 border border-[#E9DFD0] dark:border-neutral-800 rounded-xl text-xs focus:outline-none focus:border-[#B69A6A]"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-[#282828] dark:bg-[#B69A6A] text-white'
                  : 'bg-white dark:bg-neutral-900 border border-[#E9DFD0] dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:border-[#B69A6A]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Catalog Grid */}
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
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md text-[#282828] dark:text-white text-xs font-semibold">
                    {item.subCategory}
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#B69A6A] uppercase tracking-wider">{item.category}</span>
                    <span className="text-xs font-bold bg-[#E9DFD0]/50 dark:bg-neutral-800 px-2.5 py-1 rounded-lg">
                      {item.priceEstimate}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold group-hover:text-[#B69A6A] transition-colors">{item.name}</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2">{item.description}</p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-[#E9DFD0]/50 dark:border-neutral-800 flex items-center gap-2 text-[11px] text-neutral-500">
                <Tag className="w-3.5 h-3.5 text-[#B69A6A]" />
                <span>Tags: {item.tags.join(', ')}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </motion.div>
  );
}
