import React from 'react';
import type { StateDelayMatrixItem } from '../../types';
import { Clock } from 'lucide-react';

interface StateDelayMatrixProps {
  matrixData: StateDelayMatrixItem[];
  onSelectState?: (state: string) => void;
}

export const StateDelayMatrix: React.FC<StateDelayMatrixProps> = ({
  matrixData,
  onSelectState,
}) => {
  return (
    <div className="clean-card p-6 flex flex-col h-full">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            State Acquisition Delay Matrix
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Statutory timeline vs AI-predicted delivery lag across key infrastructure states.
          </p>
        </div>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto pr-1">
        {matrixData.map((item) => {
          const maxTimeline = 36;
          const statPct = Math.min(100, (item.statutoryMonths / maxTimeline) * 100);
          const aiLagPct = Math.min(100 - statPct, (item.aiLagMonths / maxTimeline) * 100);

          const isCritical = item.riskCategory === 'CRITICAL';
          const isHigh = item.riskCategory === 'HIGH';

          return (
            <div
              key={item.state}
              onClick={() => onSelectState && onSelectState(item.state)}
              className="p-4 rounded-xl border border-slate-200/70 hover:border-blue-300 hover:shadow-xs hover:bg-slate-50/60 transition cursor-pointer group"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition">
                      {item.state}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      ({item.projectsCount} Projects)
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium truncate max-w-xs">{item.corridor}</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs text-slate-500 mr-2 font-medium">
                      {item.statutoryMonths} Mo Stat
                    </span>
                    <span
                      className={`text-xs font-bold ${
                        isCritical
                          ? 'text-red-600'
                          : isHigh
                          ? 'text-orange-600'
                          : 'text-amber-600'
                      }`}
                    >
                      +{item.aiLagMonths.toFixed(1)} Mo Lag
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      isCritical
                        ? 'bg-red-50 text-red-700 border border-red-200/80'
                        : isHigh
                        ? 'bg-orange-50 text-orange-700 border border-orange-200/80'
                        : 'bg-amber-50 text-amber-700 border border-amber-200/80'
                    }`}
                  >
                    {item.riskCategory}
                  </span>
                </div>
              </div>

              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex relative mb-2">
                <div
                  className="bg-blue-600 h-full transition-all duration-500"
                  style={{ width: `${statPct}%` }}
                  title={`Statutory: ${item.statutoryMonths} months`}
                ></div>
                <div
                  className={`${
                    isCritical ? 'bg-red-500' : isHigh ? 'bg-orange-500' : 'bg-amber-500'
                  } h-full transition-all duration-500 opacity-90`}
                  style={{ width: `${aiLagPct}%` }}
                  title={`AI Lag: +${item.aiLagMonths} months`}
                ></div>
              </div>

              <div className="flex justify-between items-center text-[10px] text-slate-400 font-medium">
                <span>Title Backlog: {item.titleMutationBacklogPercent}%</span>
                <span>Litigation: {item.litigationExposurePercent}%</span>
                <span>Payout: {item.compensationDisbursedPercent}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
