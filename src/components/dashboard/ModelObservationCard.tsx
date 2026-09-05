import React from 'react';
import { Lightbulb, ArrowRight, Sparkles } from 'lucide-react';

interface ModelObservationCardProps {
  onStateBreakdownClick?: () => void;
}

export const ModelObservationCard: React.FC<ModelObservationCardProps> = ({
  onStateBreakdownClick,
}) => {
  return (
    <div className="mb-6 rounded-lg bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white p-4 shadow-sm border border-blue-800/50 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      {/* Decorative Glow background */}
      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-start gap-3 z-10">
        <div className="p-2 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-400/30 shrink-0 mt-0.5">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-400/20 text-blue-300 px-2 py-0.5 rounded border border-blue-400/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-blue-300" />
              AI Model Observation
            </span>
            <span className="text-[11px] text-slate-400 font-mono">XAI Insight #2026-MH</span>
          </div>
          <p className="text-xs md:text-sm font-medium text-slate-100 leading-relaxed">
            “Title mutation backlogs in western Maharashtra account for <span className="text-amber-300 font-bold underline decoration-amber-400/50">61% of statewide delay exposure</span>, primarily driven by legacy un-digitized survey land maps in Thane and Nashik districts.”
          </p>
        </div>
      </div>

      <button
        onClick={onStateBreakdownClick}
        className="z-10 shrink-0 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-md transition shadow-md shadow-blue-600/30 hover:shadow-blue-500/40 cursor-pointer"
      >
        <span>State Breakdown</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
