import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { PrimaryDelayDriverSummary } from '../../types';
import { ShieldCheck, Cpu } from 'lucide-react';

interface PrimaryDelayDriversProps {
  drivers: PrimaryDelayDriverSummary[];
}

export const PrimaryDelayDrivers: React.FC<PrimaryDelayDriversProps> = ({ drivers }) => {
  return (
    <div className="gov-card p-5 rounded-lg bg-white border border-slate-200 shadow-xs flex flex-col h-full justify-between">
      <div>
        <div className="flex items-start justify-between mb-1">
          <div>
            <h3 className="text-base font-bold text-slate-900">Primary Delay Drivers</h3>
            <p className="text-xs text-slate-500 font-medium">XAI Factor Attribution across projects</p>
          </div>
          <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
            SHAP Integrated
          </span>
        </div>

        <div className="relative h-48 my-2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={drivers}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="percentage"
                nameKey="name"
              >
                {drivers.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="#ffffff" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: any) => [`${value}% Attribution`, 'Impact']}
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#ffffff', borderRadius: '6px', fontSize: '12px' }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            <span className="text-lg font-extrabold text-slate-900 font-mono leading-none">100%</span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 mt-0.5">CAUSAL POOL</span>
          </div>
        </div>

        <div className="space-y-2 mt-1">
          {drivers.map((item) => (
            <div key={item.name} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-slate-700 font-medium truncate">{item.name}</span>
              </div>
              <span className="font-bold text-slate-900 font-mono ml-2">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-3 mt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
        <div className="flex items-center gap-1.5 text-emerald-700 font-semibold bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Confidence Index: 94.6%</span>
        </div>
        <div className="flex items-center gap-1 text-slate-500 text-[11px]">
          <Cpu className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-mono">XGBoost + Cox Survival</span>
        </div>
      </div>
    </div>
  );
};
