import React from 'react';
import { Lightbulb, ArrowRight, Sparkles } from 'lucide-react';

interface ModelObservationCardProps {
  onStateBreakdownClick?: () => void;
}

export const ModelObservationCard: React.FC<ModelObservationCardProps> = ({
  onStateBreakdownClick,
}) => {
  return (
    <div className="mb-6 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-5 shadow-lg shadow-blue-950/10 border border-slate-800 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      {/* Decorative Glow */}
      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-start gap-3.5 z-10">
        <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-400/30 shrink-0 mt-0.5">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-400/20 text-blue-300 px-2.5 py-0.5 rounded-full border border-blue-400/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-blue-300" />
              AI Model Observation
            </span>
            <span className="text-[11px] text-slate-400 font-medium">Insight #2026-MH</span>
          </div>
          <p className="text-xs md:text-sm font-medium text-slate-200 leading-relaxed max-w-3xl">
            “Title mutation backlogs in western Maharashtra account for <span className="text-amber-300 font-bold underline decoration-amber-400/50">61% of statewide delay exposure</span>, primarily driven by legacy un-digitized survey maps in Thane and Nashik.”
          </p>
        </div>
      </div>

      <button
        onClick={onStateBreakdownClick}
        className="z-10 shrink-0 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition shadow-md shadow-blue-600/30 hover:shadow-blue-500/40 cursor-pointer"
      >
        <span>State Breakdown</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
