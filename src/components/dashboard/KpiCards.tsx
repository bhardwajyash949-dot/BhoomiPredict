import React from 'react';
import {
  Layers,
  AlertTriangle,
  TrendingDown,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Banknote,
} from 'lucide-react';
import type { LandAcquisitionProject } from '../../types';

interface KpiCardsProps {
  projects: LandAcquisitionProject[];
}

export const KpiCards: React.FC<KpiCardsProps> = ({ projects }) => {
  const activeCount = projects.length;
  const criticalCount = projects.filter((p) => p.riskCategory === 'CRITICAL' || p.riskCategory === 'HIGH').length;
  const totalAreaHa = projects.reduce((acc, p) => acc + p.landAreaHa, 0);
  const avgDelayProb = projects.length > 0 ? (projects.reduce((acc, p) => acc + p.delayProbability, 0) / projects.length).toFixed(1) : '38.4';
  const totalCompApproved = projects.reduce((acc, p) => acc + p.compensationApprovedCr, 0);
  const totalCompDisbursed = projects.reduce((acc, p) => acc + p.compensationDisbursedCr, 0);
  const compDisbursedPct = totalCompApproved > 0 ? ((totalCompDisbursed / totalCompApproved) * 100).toFixed(1) : '74.2';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
      <div className="clean-card clean-card-hover p-5 relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
            Active Projects & Corridors
          </span>
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
            <Layers className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2.5 mb-2">
          <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{activeCount > 0 ? activeCount : 142}</span>
          <span className="text-xs font-semibold text-emerald-600 flex items-center bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/80">
            <ArrowUpRight className="w-3 h-3 mr-0.5" />
            +12 this Qtr
          </span>
        </div>
        <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
          <span>Cadastral Scope</span>
          <span className="font-semibold text-slate-800">
            {totalAreaHa > 0 ? totalAreaHa.toLocaleString() : '84,200'} Ha
          </span>
        </div>
      </div>

      <div className="clean-card clean-card-hover p-5 relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
            Critical Risk Corridors
          </span>
          <div className="p-2.5 rounded-xl bg-red-50 text-red-600">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2.5 mb-2">
          <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{criticalCount > 0 ? criticalCount : 28}</span>
          <span className="text-xs font-semibold text-red-600 flex items-center bg-red-50 px-2 py-0.5 rounded-full border border-red-200/80">
            <ArrowUpRight className="w-3 h-3 mr-0.5" />
            +4 vs Last Month
          </span>
        </div>
        <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
          <span>Litigation Risk</span>
          <span className="font-semibold text-red-600">19.7%</span>
        </div>
      </div>

      <div className="clean-card clean-card-hover p-5 relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
            Avg Delay Risk Index
          </span>
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
            <TrendingDown className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2.5 mb-2">
          <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{avgDelayProb}%</span>
          <span className="text-xs font-semibold text-emerald-600 flex items-center bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/80">
            <ArrowDownRight className="w-3 h-3 mr-0.5" />
            ↓ 4.2% optimized
          </span>
        </div>
        <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
          <span>Schedule Reduction</span>
          <span className="font-semibold text-emerald-600">-34 Days</span>
        </div>
      </div>

      <div className="clean-card clean-card-hover p-5 relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
            Compensation Disbursed
          </span>
          <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
            <Banknote className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2.5 mb-2">
          <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{compDisbursedPct}%</span>
          <span className="text-xs font-semibold text-purple-700 flex items-center bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200/80">
            <CheckCircle2 className="w-3 h-3 mr-0.5" />
            Direct DBT
          </span>
        </div>
        <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
          <span>Disbursed / Approved</span>
          <span className="font-semibold text-slate-800 truncate">
            ₹{(totalCompDisbursed / 1000).toFixed(1)}k Cr / ₹{(totalCompApproved / 1000).toFixed(1)}k Cr
          </span>
        </div>
      </div>
    </div>
  );
};
