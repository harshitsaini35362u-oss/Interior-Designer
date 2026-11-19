/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Calculator, CheckCircle2, DollarSign, ArrowRight } from 'lucide-react';

export function BudgetView() {
  const [area, setArea] = useState<number>(1200);
  const [bedrooms, setBedrooms] = useState<number>(2);
  const [bathrooms, setBathrooms] = useState<number>(2);
  const [quality, setQuality] = useState<'standard' | 'premium' | 'luxury'>('premium');

  // Calculation multipliers
  const ratePerSqFt = quality === 'standard' ? 1200 : quality === 'premium' ? 2200 : 3800;
  const baseTotal = area * ratePerSqFt;

  const breakdown = {
    civil: Math.round(baseTotal * 0.15),
    flooring: Math.round(baseTotal * 0.12),
    painting: Math.round(baseTotal * 0.10),
    falseCeiling: Math.round(baseTotal * 0.10),
    electrical: Math.round(baseTotal * 0.08),
    lighting: Math.round(baseTotal * 0.07),
    furniture: Math.round(baseTotal * 0.18),
    kitchen: Math.round(baseTotal * 0.12),
    wardrobes: Math.round(baseTotal * 0.08),
  };

  const minTotal = Math.round(baseTotal * 0.9);
  const maxTotal = Math.round(baseTotal * 1.1);

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#121212] text-[#282828] dark:text-[#FAF9F6] pb-24 transition-colors">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 space-y-10">
        
        {/* Header */}
        <div className="border-b border-[#E9DFD0] dark:border-neutral-800 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E9DFD0] dark:bg-neutral-800 text-xs font-medium text-[#282828] dark:text-[#B69A6A] mb-2">
            <Calculator className="w-3.5 h-3.5 text-[#B69A6A]" />
            <span>Financial Estimator</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Interior Design Budget Calculator</h1>
          <p className="text-sm text-neutral-500 mt-1">Get an instant, itemized cost estimate for your home renovation and interior design</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Form Parameters */}
          <div className="lg:col-span-5 bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-[#E9DFD0] dark:border-neutral-800 space-y-6 shadow-sm">
            <h3 className="text-lg font-bold">Project Parameters</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                  Total Area: {area} sq.ft
                </label>
                <input
                  type="range"
                  min="500"
                  max="5000"
                  step="100"
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full accent-[#B69A6A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">Bedrooms</label>
                  <select
                    value={bedrooms}
                    onChange={(e) => setBedrooms(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E9DFD0] dark:border-neutral-700 bg-[#FAF9F6] dark:bg-neutral-800 text-sm"
                  >
                    {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n} BHK</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">Bathrooms</label>
                  <select
                    value={bathrooms}
                    onChange={(e) => setBathrooms(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E9DFD0] dark:border-neutral-700 bg-[#FAF9F6] dark:bg-neutral-800 text-sm"
                  >
                    {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} Bathrooms</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">Material & Finish Quality</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'standard', label: 'Standard', desc: 'Laminates & Vitrified' },
                    { id: 'premium', label: 'Premium', desc: 'Veneer & Marble' },
                    { id: 'luxury', label: 'Luxury', desc: 'Italian Marble & Brass' },
                  ].map((tier) => (
                    <button
                      key={tier.id}
                      onClick={() => setQuality(tier.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        quality === tier.id
                          ? 'border-[#B69A6A] bg-[#E9DFD0]/30 dark:bg-neutral-800 font-semibold'
                          : 'border-[#E9DFD0] dark:border-neutral-700 text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      <div className="text-xs font-bold">{tier.label}</div>
                      <div className="text-[10px] text-neutral-500 mt-0.5">{tier.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF9F6] dark:bg-neutral-800 border border-[#E9DFD0] dark:border-neutral-700 text-[11px] text-neutral-500 leading-relaxed">
              * Calculations use standard Indian metropolitan contracting and material rate benchmarks. Actual quotes may vary based on site conditions.
            </div>
          </div>

          {/* Cost Estimate Breakdown */}
          <div className="lg:col-span-7 bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-[#E9DFD0] dark:border-neutral-800 space-y-8 shadow-sm">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#B69A6A]">Estimated Budget Range</span>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1 text-[#282828] dark:text-white">
                ₹ {minTotal.toLocaleString()} — ₹ {maxTotal.toLocaleString()}
              </div>
              <p className="text-xs text-neutral-500 mt-1">Approximate turnkey cost for {area} sq.ft ({quality} tier)</p>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 border-b border-[#E9DFD0] dark:border-neutral-800 pb-2">
                Itemized Cost Breakdown
              </h4>

              <div className="space-y-3">
                {[
                  { label: 'Modular Kitchen', amount: breakdown.kitchen, pct: '12%' },
                  { label: 'Wardrobes & Storage', amount: breakdown.wardrobes, pct: '8%' },
                  { label: 'Furniture & Seating', amount: breakdown.furniture, pct: '18%' },
                  { label: 'Civil & Partition Work', amount: breakdown.civil, pct: '15%' },
                  { label: 'Flooring & Tiling', amount: breakdown.flooring, pct: '12%' },
                  { label: 'False Ceiling & POP', amount: breakdown.falseCeiling, pct: '10%' },
                  { label: 'Painting & Wall Finishes', amount: breakdown.painting, pct: '10%' },
                  { label: 'Electrical & Wiring', amount: breakdown.electrical, pct: '8%' },
                  { label: 'Lighting & Chandeliers', amount: breakdown.lighting, pct: '7%' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs py-2 border-b border-[#E9DFD0]/30 dark:border-neutral-800">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#B69A6A]" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-neutral-400 text-[11px]">{item.pct}</span>
                      <span className="font-bold tabular-nums">₹ {item.amount.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
