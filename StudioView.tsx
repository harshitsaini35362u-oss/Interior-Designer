/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { Upload, Wand2, Sparkles, ArrowLeft, Download, Save, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';

interface StudioViewProps {
  currentProject: Project | null;
  onSaveProject: (project: Project) => void;
  onNavigate: (view: string) => void;
}

const ROOM_TYPES = [
  'Living Room', 'Bedroom', 'Master Bedroom', 'Kitchen', 'Dining Room',
  'Bathroom', 'Guest Room', 'Kids Room', 'Study Room', 'Home Office', 'Balcony', 'Pooja Room'
];

const DESIGN_STYLES = [
  'Modern Minimalist', 'Contemporary', 'Luxury Modern', 'Scandinavian',
  'Industrial', 'Traditional Indian', 'Modern Indian', 'Japandi',
  'Bohemian', 'Mediterranean', 'Rustic', 'Art Deco',
  'Classic European', 'Mid-Century Modern', 'Coastal', 'Neo-Classical'
];

const SAMPLE_ROOMS = [
  { name: 'Empty Living Room', url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Bare Bedroom', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Standard Kitchen', url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80' }
];

export function StudioView({ currentProject, onSaveProject, onNavigate }: StudioViewProps) {
  const [roomType, setRoomType] = useState(currentProject?.roomType || 'Living Room');
  const [style, setStyle] = useState(currentProject?.style || 'Luxury Modern');
  const [originalImage, setOriginalImage] = useState<string>(currentProject?.originalImage || '');
  const [generatedImage, setGeneratedImage] = useState<string>(currentProject?.generatedImage || '');
  const [description, setDescription] = useState<string>(currentProject?.description || '');
  const [customPrompt, setCustomPrompt] = useState<string>('');
  
  const [wallColors, setWallColors] = useState(currentProject?.preferences.wallColors || 'Warm Ivory & Beige');
  const [flooring, setFlooring] = useState(currentProject?.preferences.flooring || 'Italian Marble');
  const [lighting, setLighting] = useState(currentProject?.preferences.lighting || 'Cove & Warm Spotlights');
  const [mood, setMood] = useState(currentProject?.preferences.mood || 'Sophisticated & Cozy');

  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Before/after slider state
  const [sliderPos, setSliderPos] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);

  // AI Edit state
  const [editPrompt, setEditPrompt] = useState('');
  const [editing, setEditing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file (JPG, PNG, WEBP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setOriginalImage(reader.result as string);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const selectSampleRoom = (url: string) => {
    setOriginalImage(url);
    setError(null);
  };

  const handleGenerate = async () => {
    if (!originalImage) {
      setError('Please upload or select an initial room photograph first.');
      return;
    }

    setLoading(true);
    setError(null);
    setLoadingStep('Analyzing room layout & perspective...');

    try {
      setTimeout(() => setLoadingStep('Applying AI interior design style & materials...'), 2000);
      setTimeout(() => setLoadingStep('Rendering photorealistic lighting & furniture...'), 4500);

      const response = await fetch('/api/generate-design', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: originalImage.replace(/^data:.+;base64,/, ''),
          mimeType: originalImage.startsWith('data:') ? originalImage.split(';')[0].replace('data:', '') : 'image/jpeg',
          roomType,
          style,
          customPrompt,
          preferences: { wallColors, flooring, lighting, furnitureStyle: style, mood }
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate design');
      }

      setGeneratedImage(data.imageUrl);
      setDescription(data.description);

      const newProj: Project = {
        id: currentProject?.id || 'proj-' + Date.now(),
        name: `${style} ${roomType}`,
        roomType,
        style,
        originalImage,
        generatedImage: data.imageUrl,
        description: data.description,
        createdAt: new Date().toISOString().split('T')[0],
        preferences: { wallColors, flooring, lighting, furnitureStyle: style, mood }
      };
      onSaveProject(newProj);
    } catch (err: any) {
      setError(err.message || 'Generation failed. Please verify API configuration or try again.');
    } finally {
      setLoading(false);
      setLoadingStep('');
    }
  };

  const handleEditDesign = async () => {
    if (!generatedImage || !editPrompt) return;

    setEditing(true);
    setError(null);
    try {
      const response = await fetch('/api/edit-design', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentImage: generatedImage,
          editPrompt
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Edit failed');

      setGeneratedImage(data.imageUrl);
      setEditPrompt('');
    } catch (err: any) {
      setError(err.message || 'AI editing failed.');
    } finally {
      setEditing(false);
    }
  };

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#FAF9F6] dark:bg-[#121212] text-[#282828] dark:text-[#FAF9F6] pb-24 transition-colors"
    >
      {/* Studio Header */}
      <div className="border-b border-[#E9DFD0] dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md px-6 py-4 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('dashboard')}
              className="p-2 rounded-xl bg-[#E9DFD0]/50 dark:bg-neutral-800 hover:bg-[#E9DFD0] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold">AI Design Studio</h1>
              <p className="text-xs text-neutral-500">Transform rooms with Google Gemini Vision & Imagen AI</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {generatedImage && (
              <a
                href={generatedImage}
                download={`dreamspace-${roomType.toLowerCase().replace(/\s+/g, '-')}-${style.toLowerCase().replace(/\s+/g, '-')}.png`}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-neutral-800 border border-[#E9DFD0] dark:border-neutral-700 rounded-xl text-xs font-semibold hover:bg-neutral-50 transition-colors shadow-xs"
              >
                <Download className="w-4 h-4 text-[#B69A6A]" />
                <span>Download High-Res</span>
              </a>
            )}
            <button
              onClick={() => onNavigate('projects')}
              className="flex items-center gap-2 px-4 py-2 bg-[#282828] dark:bg-[#B69A6A] text-white rounded-xl text-xs font-semibold hover:bg-black transition-colors shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>My Projects</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Configuration & Controls */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Step 1: Upload Room Photo */}
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-[#E9DFD0] dark:border-neutral-800 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-bold flex items-center gap-2 text-sm uppercase tracking-wider text-[#B69A6A]">
                <span className="w-6 h-6 rounded-full bg-[#E9DFD0] dark:bg-neutral-800 flex items-center justify-center text-xs text-[#282828] dark:text-white">1</span>
                <span>Upload Room Photograph</span>
              </h3>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>

            {originalImage ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative rounded-xl overflow-hidden aspect-[16/10] border border-[#E9DFD0] dark:border-neutral-700 group"
              >
                <img src={originalImage} alt="Room Upload" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 bg-white text-neutral-900 rounded-lg text-xs font-semibold shadow-md"
                  >
                    Replace
                  </button>
                  <button
                    onClick={() => setOriginalImage('')}
                    className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-semibold shadow-md"
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#E9DFD0] dark:border-neutral-700 rounded-xl p-8 text-center cursor-pointer hover:border-[#B69A6A] transition-colors bg-[#FAF9F6]/50 dark:bg-neutral-800/50"
              >
                <Upload className="w-10 h-10 text-[#B69A6A] mx-auto mb-3" />
                <p className="text-sm font-semibold">Drag and drop your room photo here</p>
                <p className="text-xs text-neutral-500 mt-1">Supports JPG, PNG, WEBP up to 25MB</p>
                <button className="mt-4 px-4 py-2 bg-[#282828] dark:bg-neutral-700 text-white rounded-xl text-xs font-semibold">
                  Browse Files
                </button>
              </div>
            )}

            {/* Quick Sample Selector */}
            <div className="pt-2">
              <p className="text-xs text-neutral-500 mb-2 font-medium">Or test with a sample room:</p>
              <div className="grid grid-cols-3 gap-2">
                {SAMPLE_ROOMS.map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => selectSampleRoom(sample.url)}
                    className="text-[11px] px-2.5 py-1.5 rounded-lg border border-[#E9DFD0] dark:border-neutral-700 hover:border-[#B69A6A] truncate text-neutral-700 dark:text-neutral-300 transition-colors"
                  >
                    {sample.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 2: Room Type & Style */}
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-[#E9DFD0] dark:border-neutral-800 space-y-6 shadow-sm">
            <h3 className="font-bold flex items-center gap-2 text-sm uppercase tracking-wider text-[#B69A6A]">
              <span className="w-6 h-6 rounded-full bg-[#E9DFD0] dark:bg-neutral-800 flex items-center justify-center text-xs text-[#282828] dark:text-white">2</span>
              <span>Room Type & Design Style</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">Room Category</label>
                <select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E9DFD0] dark:border-neutral-700 bg-[#FAF9F6] dark:bg-neutral-800 text-sm focus:outline-none focus:border-[#B69A6A]"
                >
                  {ROOM_TYPES.map((rt) => (
                    <option key={rt} value={rt}>{rt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">Interior Design Style</label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E9DFD0] dark:border-neutral-700 bg-[#FAF9F6] dark:bg-neutral-800 text-sm focus:outline-none focus:border-[#B69A6A]"
                >
                  {DESIGN_STYLES.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Step 3: Customization & Preferences */}
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-[#E9DFD0] dark:border-neutral-800 space-y-4 shadow-sm">
            <h3 className="font-bold flex items-center gap-2 text-sm uppercase tracking-wider text-[#B69A6A]">
              <span className="w-6 h-6 rounded-full bg-[#E9DFD0] dark:bg-neutral-800 flex items-center justify-center text-xs text-[#282828] dark:text-white">3</span>
              <span>Materials & Lighting Preferences</span>
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-neutral-500 mb-1">Wall Colors</label>
                <input
                  type="text"
                  value={wallColors}
                  onChange={(e) => setWallColors(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E9DFD0] dark:border-neutral-700 bg-[#FAF9F6] dark:bg-neutral-800 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-neutral-500 mb-1">Flooring Type</label>
                <input
                  type="text"
                  value={flooring}
                  onChange={(e) => setFlooring(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E9DFD0] dark:border-neutral-700 bg-[#FAF9F6] dark:bg-neutral-800 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-neutral-500 mb-1">Lighting Style</label>
                <input
                  type="text"
                  value={lighting}
                  onChange={(e) => setLighting(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E9DFD0] dark:border-neutral-700 bg-[#FAF9F6] dark:bg-neutral-800 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-neutral-500 mb-1">Overall Mood</label>
                <input
                  type="text"
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E9DFD0] dark:border-neutral-700 bg-[#FAF9F6] dark:bg-neutral-800 text-xs"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">Custom AI Instructions</label>
              <textarea
                rows={3}
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="e.g., Add wooden fluted wall panels behind the sofa, warm cove ceiling lights, and an L-shaped beige sectional sofa."
                className="w-full px-4 py-2.5 rounded-xl border border-[#E9DFD0] dark:border-neutral-700 bg-[#FAF9F6] dark:bg-neutral-800 text-sm focus:outline-none focus:border-[#B69A6A]"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 text-red-700 text-xs rounded-xl">
                {error}
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGenerate}
              disabled={loading || !originalImage}
              className="w-full flex items-center justify-center gap-3 py-4 bg-[#282828] dark:bg-[#B69A6A] text-white rounded-xl font-bold uppercase tracking-wider text-xs hover:bg-black transition-all shadow-lg disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin text-[#B69A6A]" />
                  <span>{loadingStep || 'Generating AI Design...'}</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5 text-[#B69A6A] dark:text-white" />
                  <span>Generate AI Interior Design</span>
                </>
              )}
            </motion.button>
          </div>

        </div>

        {/* Right Column: Visualization Workspace & Before/After Slider */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-[#E9DFD0] dark:border-neutral-800 space-y-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Design Result & Comparison</h2>
                <p className="text-xs text-neutral-500">Interactive before & after transformation slider</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#E9DFD0] dark:bg-neutral-800 text-xs font-semibold text-[#B69A6A]">
                {style} {roomType}
              </span>
            </div>

            {generatedImage ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                
                {/* Interactive Slider */}
                <div
                  ref={sliderRef}
                  onMouseMove={handleSliderMove}
                  onTouchMove={handleSliderMove}
                  className="relative aspect-[16/10] rounded-2xl overflow-hidden select-none cursor-ew-resize border border-[#E9DFD0] dark:border-neutral-700 shadow-xl"
                >
                  <img src={generatedImage} alt="AI Redesigned Room" className="absolute inset-0 w-full h-full object-cover" />

                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${sliderPos}%` }}
                  >
                    <img
                      src={originalImage}
                      alt="Original Room"
                      className="absolute inset-0 w-full h-full object-cover max-w-none"
                      style={{ width: sliderRef.current ? `${sliderRef.current.clientWidth}px` : '100%' }}
                    />
                  </div>

                  <div
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl flex items-center justify-center pointer-events-none"
                    style={{ left: `${sliderPos}%` }}
                  >
                    <div className="w-8 h-8 rounded-full bg-white text-neutral-900 shadow-lg flex items-center justify-center font-bold text-xs">
                      ↔
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-lg pointer-events-none">
                    Original
                  </div>
                  <div className="absolute bottom-4 right-4 px-3 py-1 bg-[#B69A6A]/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-lg pointer-events-none">
                    AI Redesigned
                  </div>
                </div>

                {description && (
                  <div className="p-4 rounded-xl bg-[#FAF9F6] dark:bg-neutral-800 border border-[#E9DFD0] dark:border-neutral-700 text-xs leading-relaxed">
                    <span className="font-bold text-[#B69A6A] uppercase tracking-wider block mb-1">Architectural Summary</span>
                    {description}
                  </div>
                )}

                {/* AI Follow-up Editing Box */}
                <div className="p-5 rounded-2xl border border-[#E9DFD0] dark:border-neutral-700 bg-[#FAF9F6]/50 dark:bg-neutral-800/50 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#B69A6A] flex items-center gap-2">
                    <Wand2 className="w-4 h-4" />
                    <span>AI Follow-Up Modification</span>
                  </h4>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editPrompt}
                      onChange={(e) => setEditPrompt(e.target.value)}
                      placeholder="e.g., Replace sofa with a navy blue velvet sectional, add wall art."
                      className="flex-1 px-4 py-2.5 rounded-xl border border-[#E9DFD0] dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs focus:outline-none focus:border-[#B69A6A]"
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleEditDesign}
                      disabled={editing || !editPrompt}
                      className="px-5 py-2.5 bg-[#282828] dark:bg-[#B69A6A] text-white rounded-xl text-xs font-semibold hover:bg-black transition-all disabled:opacity-50 whitespace-nowrap"
                    >
                      {editing ? 'Modifying...' : 'Apply Edit'}
                    </motion.button>
                  </div>
                </div>

              </motion.div>
            ) : (
              <div className="aspect-[16/10] rounded-2xl border-2 border-dashed border-[#E9DFD0] dark:border-neutral-700 flex flex-col items-center justify-center text-center p-8 bg-[#FAF9F6]/50 dark:bg-neutral-800/50">
                <Sparkles className="w-12 h-12 text-[#B69A6A] mb-3 animate-pulse" />
                <h3 className="font-bold text-base">No Design Generated Yet</h3>
                <p className="text-xs text-neutral-500 max-w-sm mt-1">
                  Upload your room photograph on the left, select your favorite design style, and click Generate AI Design.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>

    </motion.div>
  );
}
