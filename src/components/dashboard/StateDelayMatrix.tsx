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
    <div className="gov-card p-5 rounded-lg bg-white border border-slate-200 shadow-xs flex flex-col h-full">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            State-Level Acquisition Delay Matrix
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Statutory vs AI-projected delivery lag measured in calendar months across major infrastructure clusters.
          </p>
        </div>
      </div>

      <div className="space-y-3.5 flex-1 overflow-y-auto pr-1">
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
              className="p-3 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50/70 transition cursor-pointer group"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <div>
                  <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition">
                    {item.state}
                  </span>
                  <span className="text-[11px] text-slate-400 ml-2 font-mono hidden sm:inline">
                    ({item.projectsCount} Projects)
                  </span>
                  <p className="text-[11px] text-slate-500 font-medium truncate max-w-xs">{item.corridor}</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs font-medium text-slate-600 mr-2">
                      {item.statutoryMonths} Mo Stat
                    </span>
                    <span
                      className={`text-xs font-bold font-mono ${
                        isCritical
                          ? 'text-red-600'
                          : isHigh
                          ? 'text-orange-600'
                          : 'text-amber-600'
                      }`}
                    >
                      +{item.aiLagMonths.toFixed(1)} Mo AI Lag
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                      isCritical
                        ? 'bg-red-50 text-red-700 border-red-200'
                        : isHigh
                        ? 'bg-orange-50 text-orange-700 border-orange-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}
                  >
                    {item.riskCategory} RISK
                  </span>
                </div>
              </div>

              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex relative">
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

              <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1 font-mono">
                <span>Title Backlog: {item.titleMutationBacklogPercent}%</span>
                <span>Litigation Exp: {item.litigationExposurePercent}%</span>
                <span>DBT Payout: {item.compensationDisbursedPercent}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
