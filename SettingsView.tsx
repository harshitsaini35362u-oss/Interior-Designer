/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Settings as SettingsIcon, User, Shield, Sparkles, Check } from 'lucide-react';

export function SettingsView() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#121212] text-[#282828] dark:text-[#FAF9F6] pb-24 transition-colors">
      
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
        
        <div className="border-b border-[#E9DFD0] dark:border-neutral-800 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E9DFD0] dark:bg-neutral-800 text-xs font-medium text-[#282828] dark:text-[#B69A6A] mb-2">
            <SettingsIcon className="w-3.5 h-3.5 text-[#B69A6A]" />
            <span>Preferences & Account</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Studio Settings</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage your account profile, AI configuration, and workspace preferences</p>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-[#E9DFD0] dark:border-neutral-800 space-y-6 shadow-sm">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <User className="w-5 h-5 text-[#B69A6A]" />
              <span>User Profile</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue="Interior Architect"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E9DFD0] dark:border-neutral-700 bg-[#FAF9F6] dark:bg-neutral-800 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">Email Address</label>
                <input
                  type="email"
                  defaultValue="architect@dreamspace.ai"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E9DFD0] dark:border-neutral-700 bg-[#FAF9F6] dark:bg-neutral-800 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-[#E9DFD0] dark:border-neutral-800 space-y-6 shadow-sm">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#B69A6A]" />
              <span>Google Gemini AI Engine</span>
            </h3>

            <div className="p-4 rounded-xl bg-[#FAF9F6] dark:bg-neutral-800 border border-[#E9DFD0] dark:border-neutral-700 flex items-center justify-between">
              <div>
                <div className="text-sm font-bold">Model Status</div>
                <div className="text-xs text-neutral-500">Gemini Vision & Imagen AI connected via secure server proxy</div>
              </div>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 text-xs font-semibold">
                <Check className="w-3.5 h-3.5" />
                <span>Active</span>
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
