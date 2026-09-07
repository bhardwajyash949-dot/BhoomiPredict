import React, { useState } from 'react';
import type { LandAcquisitionProject, AcquisitionStage } from '../types';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Scale,
  Banknote,
  BrainCircuit,
  Sparkles,
  History,
} from 'lucide-react';

interface ProjectDetailPageProps {
  project: LandAcquisitionProject;
  onBack: () => void;
  onNavigateToInterventions: (projectId: string) => void;
}

const all9Stages: AcquisitionStage[] = [
  'Preliminary Notification (Sec 4/11)',
  'Survey & Boundary Marking',
  'Valuation & Assessment',
  'Administrative Approval',
  'Compensation Declaration',
  'Compensation Disbursement',
  'Legal Dispute Resolution',
  'Rehabilitation & Resettlement (R&R)',
  'Physical Possession',
  'Final Acquisition Closure',
];

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  project,
  onBack,
  onNavigateToInterventions,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'timeline' | 'parameters' | 'xai' | 'audit'>('timeline');

  const currentStageIndex = all9Stages.indexOf(project.currentStage);

  return (
    <div className="space-y-6 pb-12">
      <div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 mb-3 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </button>

        <div className="clean-card p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  {project.id}
                </span>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    project.riskCategory === 'CRITICAL'
                      ? 'bg-red-50 text-red-700 border border-red-200/80'
                      : project.riskCategory === 'HIGH'
                      ? 'bg-orange-50 text-orange-700 border border-orange-200/80'
                      : 'bg-amber-50 text-amber-700 border border-amber-200/80'
                  }`}
                >
                  {project.riskCategory}
                </span>
                <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  {project.status}
                </span>
              </div>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">{project.name}</h1>
              <p className="text-xs text-slate-500 font-medium mt-1">
                State: <span className="font-semibold text-slate-800">{project.state}</span> • District:{' '}
                <span className="font-semibold text-slate-800">{project.district}</span> • Sector:{' '}
                <span className="font-semibold text-slate-800">{project.sector}</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigateToInterventions(project.id)}
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition shadow-md shadow-blue-600/30 cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Create AI Intervention</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5 mt-6 pt-5 border-t border-slate-100">
            <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/60">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Risk Score</span>
              <div className="text-2xl font-extrabold text-slate-900 mt-0.5">
                {project.riskScore} <span className="text-xs text-slate-400 font-normal">/ 100</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/60">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Delay Probability</span>
              <div className="text-2xl font-extrabold text-red-600 mt-0.5">
                {project.delayProbability}%
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/60">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Est. AI Lag</span>
              <div className="text-2xl font-extrabold text-slate-900 mt-0.5">
                +{project.predictedDelayMonths} Mo
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/60">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Land Scope</span>
              <div className="text-2xl font-extrabold text-slate-900 mt-0.5">
                {project.landAreaHa.toLocaleString()} Ha
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/60 col-span-2 sm:col-span-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Current Stage</span>
              <div className="text-xs font-semibold text-slate-800 mt-1 truncate">
                {project.currentStage}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center border-b border-slate-200/80 bg-white rounded-xl p-1 border shadow-2xs font-semibold text-xs gap-1">
        <button
          onClick={() => setActiveSubTab('timeline')}
          className={`px-4 py-2 rounded-lg transition cursor-pointer ${
            activeSubTab === 'timeline' ? 'bg-blue-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Acquisition Timeline
        </button>
        <button
          onClick={() => setActiveSubTab('parameters')}
          className={`px-4 py-2 rounded-lg transition cursor-pointer ${
            activeSubTab === 'parameters' ? 'bg-blue-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Multi-Parameter Analysis
        </button>
        <button
          onClick={() => setActiveSubTab('xai')}
          className={`px-4 py-2 rounded-lg transition cursor-pointer ${
            activeSubTab === 'xai' ? 'bg-blue-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          XAI SHAP Explanation
        </button>
        <button
          onClick={() => setActiveSubTab('audit')}
          className={`px-4 py-2 rounded-lg transition cursor-pointer ${
            activeSubTab === 'audit' ? 'bg-blue-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Audit Logs
        </button>
      </div>

      {activeSubTab === 'timeline' && (
        <div className="clean-card p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              10-Stage Land Acquisition Statutory Progress
            </h3>
            <span className="text-xs font-semibold text-slate-500">
              Target: {project.statutoryTimelineMonths} Mo | AI Forecast: {project.aiPredictedTimelineMonths} Mo
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
            {all9Stages.slice(0, 5).map((stage, idx) => {
              const isDone = idx < currentStageIndex;
              const isCurrent = idx === currentStageIndex;
              return (
                <div
                  key={stage}
                  className={`p-3.5 rounded-xl border text-xs relative ${
                    isDone
                      ? 'bg-emerald-50/60 border-emerald-300/80 text-emerald-900'
                      : isCurrent
                      ? 'bg-blue-50 border-blue-400 text-blue-900 ring-2 ring-blue-500/20 font-bold'
                      : 'bg-slate-50 border-slate-200/80 text-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5 font-bold text-[10px]">
                    <span>STAGE 0{idx + 1}</span>
                    {isDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    ) : isCurrent ? (
                      <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                    ) : null}
                  </div>
                  <div className="font-semibold text-[11px] leading-snug">{stage}</div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {all9Stages.slice(5).map((stage, idx) => {
              const actualIdx = idx + 5;
              const isDone = actualIdx < currentStageIndex;
              const isCurrent = actualIdx === currentStageIndex;
              return (
                <div
                  key={stage}
                  className={`p-3.5 rounded-xl border text-xs relative ${
                    isDone
                      ? 'bg-emerald-50/60 border-emerald-300/80 text-emerald-900'
                      : isCurrent
                      ? 'bg-blue-50 border-blue-400 text-blue-900 ring-2 ring-blue-500/20 font-bold'
                      : 'bg-slate-50 border-slate-200/80 text-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5 font-bold text-[10px]">
                    <span>STAGE {actualIdx + 1 < 10 ? `0${actualIdx + 1}` : actualIdx + 1}</span>
                    {isDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    ) : isCurrent ? (
                      <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                    ) : null}
                  </div>
                  <div className="font-semibold text-[11px] leading-snug">{stage}</div>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs">
            <h4 className="font-bold text-blue-900 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-600" />
              AI Automated Recommendation
            </h4>
            <p className="text-blue-800 font-medium">{project.recommendedAction}</p>
          </div>
        </div>
      )}

      {activeSubTab === 'parameters' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="clean-card p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Scale className="w-4 h-4 text-blue-600" />
              Legal & Dispute Parameters
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Legal Disputes Count:</span>
                <span className="font-bold text-slate-900">{project.legalDisputesCount} cases</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Court Case Status:</span>
                <span className="font-bold text-red-600">{project.courtCaseStatus}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Litigation Duration:</span>
                <span className="font-bold text-slate-900">{project.litigationDurationMonths} Months</span>
              </div>
            </div>
          </div>

          <div className="clean-card p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Banknote className="w-4 h-4 text-purple-600" />
              Compensation & Disbursement
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Approved Amount:</span>
                <span className="font-bold text-slate-900">₹{project.compensationApprovedCr} Cr</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Disbursed Amount:</span>
                <span className="font-bold text-emerald-600">₹{project.compensationDisbursedCr} Cr</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">DBT Status:</span>
                <span className="font-bold text-purple-700">{project.dbtStatus}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'xai' && (
        <div className="clean-card p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-blue-600" />
            Explainable AI (SHAP Waterfall Model Attribution)
          </h3>
          <p className="text-xs text-slate-500">
            Deconstruction of parameters pushing the risk score from base 20.0 to <span className="font-bold text-slate-900">{project.riskScore}.0</span>.
          </p>
          <div className="space-y-3 pt-2">
            {(project.driverAttribution || []).map((driver) => (
              <div key={driver.driver} className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/70">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-bold text-slate-900">{driver.driver}</span>
                  <span className="text-blue-600 font-bold">{driver.percentage}% Attribution</span>
                </div>
                <p className="text-[11px] text-slate-500">{driver.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSubTab === 'audit' && (
        <div className="clean-card p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <History className="w-5 h-5 text-blue-600" />
            Statutory Audit Trail for {project.id}
          </h3>
          <div className="space-y-2 text-xs">
            <div className="p-3.5 rounded-xl border border-slate-200/70 bg-slate-50/60 flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-900">Project Data Synchronized</span>
                <p className="text-[11px] text-slate-500">Updated from State Revenue Portal</p>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">{project.lastUpdated}</span>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200/70 bg-slate-50/60 flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-900">AI Risk Assessment Generated</span>
                <p className="text-[11px] text-slate-500">XGBoost Engine evaluated parameters</p>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">{project.lastUpdated}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
