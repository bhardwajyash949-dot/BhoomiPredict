import React from 'react';
import { KpiCards } from '../components/dashboard/KpiCards';
import { StateDelayMatrix } from '../components/dashboard/StateDelayMatrix';
import { PrimaryDelayDrivers } from '../components/dashboard/PrimaryDelayDrivers';
import { ModelObservationCard } from '../components/dashboard/ModelObservationCard';
import { CriticalRiskCorridorsTable } from '../components/dashboard/CriticalRiskCorridorsTable';
import type { LandAcquisitionProject, StateDelayMatrixItem, PrimaryDelayDriverSummary } from '../types';

interface ExecutiveDashboardProps {
  projects: LandAcquisitionProject[];
  matrixData: StateDelayMatrixItem[];
  delayDrivers: PrimaryDelayDriverSummary[];
  onSelectProject: (project: LandAcquisitionProject) => void;
  onNavigateToRiskAnalytics: () => void;
}

export const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({
  projects,
  matrixData,
  delayDrivers,
  onSelectProject,
  onNavigateToRiskAnalytics,
}) => {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Executive Intelligence Overview
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Real-time cadastral risk quantification, automated title dispute indexing, and multi-state acquisition forecasting.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded font-mono">
            FY 2026-27 | Q2 Cycle
          </span>
        </div>
      </div>

      <KpiCards projects={projects} />
      <ModelObservationCard onStateBreakdownClick={onNavigateToRiskAnalytics} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <StateDelayMatrix matrixData={matrixData} onSelectState={onNavigateToRiskAnalytics} />
        </div>

        <div className="lg:col-span-1">
          <PrimaryDelayDrivers drivers={delayDrivers} />
        </div>
      </div>

      <CriticalRiskCorridorsTable projects={projects} onSelectProject={onSelectProject} />
    </div>
  );
};
