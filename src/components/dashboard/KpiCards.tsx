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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="gov-card p-4 rounded-lg bg-white border border-slate-200 shadow-xs relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
            Active Parcels & Corridors
          </span>
          <div className="p-2 rounded-md bg-blue-50 text-blue-600">
            <Layers className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-2xl font-bold text-slate-900 font-mono">{activeCount > 0 ? activeCount : 142}</span>
          <span className="text-xs font-semibold text-emerald-600 flex items-center bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
            <ArrowUpRight className="w-3 h-3 mr-0.5" />
            +12 this QTR
          </span>
        </div>
        <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs text-slate-600">
          <span>Cadastral Scope:</span>
          <span className="font-semibold text-slate-800 font-mono">
            {totalAreaHa > 0 ? totalAreaHa.toLocaleString() : '84,200'} Ha
          </span>
        </div>
      </div>

      <div className="gov-card p-4 rounded-lg bg-white border border-slate-200 shadow-xs relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
            Critical Delay Vector
          </span>
          <div className="p-2 rounded-md bg-red-50 text-red-600">
            <AlertTriangle className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-2xl font-bold text-slate-900 font-mono">{criticalCount > 0 ? criticalCount : 28}</span>
          <span className="text-xs font-semibold text-red-600 flex items-center bg-red-50 px-1.5 py-0.5 rounded border border-red-200">
            <ArrowUpRight className="w-3 h-3 mr-0.5" />
            +4 vs Last Month
          </span>
        </div>
        <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs text-slate-600">
          <span>Litigation Exposure:</span>
          <span className="font-semibold text-red-600 font-mono">19.7%</span>
        </div>
      </div>

      <div className="gov-card p-4 rounded-lg bg-white border border-slate-200 shadow-xs relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
            Mean Delay Probability
          </span>
          <div className="p-2 rounded-md bg-emerald-50 text-emerald-600">
            <TrendingDown className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-2xl font-bold text-slate-900 font-mono">{avgDelayProb}%</span>
          <span className="text-xs font-semibold text-emerald-600 flex items-center bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
            <ArrowDownRight className="w-3 h-3 mr-0.5" />
            ↓ 4.2% Post-Intervention
          </span>
        </div>
        <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs text-slate-600">
          <span>Optimized Impact:</span>
          <span className="font-semibold text-emerald-600 font-mono">-34 Days</span>
        </div>
      </div>

      <div className="gov-card p-4 rounded-lg bg-white border border-slate-200 shadow-xs relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
            Compensation Payout
          </span>
          <div className="p-2 rounded-md bg-purple-50 text-purple-600">
            <Banknote className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-2xl font-bold text-slate-900 font-mono">{compDisbursedPct}%</span>
          <span className="text-xs font-semibold text-purple-700 flex items-center bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200">
            <CheckCircle2 className="w-3 h-3 mr-0.5" />
            Direct DBT
          </span>
        </div>
        <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs text-slate-600">
          <span>Disbursed / Total:</span>
          <span className="font-semibold text-slate-800 font-mono truncate">
            ₹{(totalCompDisbursed / 1000).toFixed(1)}k Cr / ₹{(totalCompApproved / 1000).toFixed(1)}k Cr
          </span>
        </div>
      </div>
    </div>
  );
};
