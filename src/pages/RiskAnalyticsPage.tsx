import React, { useState } from 'react';
import type { LandAcquisitionProject } from '../types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  BrainCircuit,
  AlertTriangle,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface RiskAnalyticsPageProps {
  projects: LandAcquisitionProject[];
  onSelectProject: (project: LandAcquisitionProject) => void;
}

export const RiskAnalyticsPage: React.FC<RiskAnalyticsPageProps> = ({
  projects,
  onSelectProject,
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || 'LA-2026-1004');

  const selectedProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  const totalProjects = projects.length;
  const criticalCount = projects.filter((p) => p.riskCategory === 'CRITICAL').length;
  const highCount = projects.filter((p) => p.riskCategory === 'HIGH').length;
  const avgRiskScore = totalProjects > 0 ? (projects.reduce((a, b) => a + b.riskScore, 0) / totalProjects).toFixed(1) : '54.2';
  const avgDelayDays = totalProjects > 0 ? Math.round((projects.reduce((a, b) => a + b.predictedDelayMonths, 0) / totalProjects) * 30) : 185;

  const stateAggMap: Record<string, { state: string; avgScore: number; avgDelay: number; count: number }> = {};
  projects.forEach((p) => {
    if (!stateAggMap[p.state]) {
      stateAggMap[p.state] = { state: p.state, avgScore: 0, avgDelay: 0, count: 0 };
    }
    stateAggMap[p.state].avgScore += p.riskScore;
    stateAggMap[p.state].avgDelay += p.predictedDelayMonths;
    stateAggMap[p.state].count += 1;
  });

  const stateChartData = Object.values(stateAggMap).map((s) => ({
    state: s.state,
    avgScore: parseFloat((s.avgScore / s.count).toFixed(1)),
    avgDelayMonths: parseFloat((s.avgDelay / s.count).toFixed(1)),
  }));

  const featureImportance = [
    { feature: 'High Court / Civil Stay Orders', shapValue: 0.38, impact: 'High' },
    { feature: 'Ancestral Title Mutation Backlog', shapValue: 0.28, impact: 'High' },
    { feature: 'R&R Plot Allotment Consent', shapValue: 0.21, impact: 'Medium' },
    { feature: 'Forest Stage-1 Permission SLA', shapValue: 0.16, impact: 'Medium' },
    { feature: 'DBT Bank Account Re-verification', shapValue: 0.11, impact: 'Low' },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-blue-600" />
            Risk Analytics & Explainable AI (XAI)
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            SHAP feature attribution, survival curve analysis, and project-wise risk profiling.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="gov-card p-3 rounded-lg bg-white border border-slate-200">
          <span className="text-[10px] font-semibold text-slate-400 uppercase">Avg Risk Score</span>
          <div className="text-xl font-extrabold text-slate-900 font-mono mt-0.5">{avgRiskScore} / 100</div>
        </div>
        <div className="gov-card p-3 rounded-lg bg-white border border-slate-200">
          <span className="text-[10px] font-semibold text-slate-400 uppercase">Critical Projects</span>
          <div className="text-xl font-extrabold text-red-600 font-mono mt-0.5">{criticalCount}</div>
        </div>
        <div className="gov-card p-3 rounded-lg bg-white border border-slate-200">
          <span className="text-[10px] font-semibold text-slate-400 uppercase">High Risk Projects</span>
          <div className="text-xl font-extrabold text-orange-600 font-mono mt-0.5">{highCount}</div>
        </div>
        <div className="gov-card p-3 rounded-lg bg-white border border-slate-200">
          <span className="text-[10px] font-semibold text-slate-400 uppercase">Mean Predicted Delay</span>
          <div className="text-xl font-extrabold text-slate-900 font-mono mt-0.5">+{avgDelayDays} Days</div>
        </div>
        <div className="gov-card p-3 rounded-lg bg-white border border-slate-200 col-span-2 sm:col-span-1">
          <span className="text-[10px] font-semibold text-slate-400 uppercase">XAI Model Engine</span>
          <div className="text-xs font-bold text-blue-700 mt-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            SHAP + XGBoost v4.2
          </div>
        </div>
      </div>

      {selectedProject && (
        <div className="gov-card p-5 rounded-lg bg-white border border-slate-200 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {selectedProject.id}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    selectedProject.riskCategory === 'CRITICAL'
                      ? 'bg-red-100 text-red-700 border border-red-200'
                      : selectedProject.riskCategory === 'HIGH'
                      ? 'bg-orange-100 text-orange-700 border border-orange-200'
                      : 'bg-amber-100 text-amber-700 border border-amber-200'
                  }`}
                >
                  {selectedProject.riskCategory} RISK
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-1">{selectedProject.name}</h2>
              <p className="text-xs text-slate-500 font-medium">
                {selectedProject.state} • {selectedProject.district} • {selectedProject.sector}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-semibold whitespace-nowrap">Select Project:</span>
              <div className="relative">
                <select
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded-md py-1.5 px-3 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer max-w-xs"
                >
                  {projects.slice(0, 30).map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.id} - {p.name.substring(0, 30)}... ({p.riskCategory})
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => onSelectProject(selectedProject)}
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3 py-1.5 rounded-md transition shadow-2xs cursor-pointer flex items-center gap-1"
              >
                <span>Full Intelligence</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] font-semibold text-slate-500 uppercase">Risk Score</span>
              <div className="text-3xl font-black text-slate-900 font-mono mt-1">
                {selectedProject.riskScore} <span className="text-xs text-slate-400 font-normal">/ 100</span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">Normalized Cadastral Risk</span>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] font-semibold text-slate-500 uppercase">Delay Probability</span>
              <div className="text-3xl font-black text-red-600 font-mono mt-1">
                {selectedProject.delayProbability}%
              </div>
              <span className="text-[11px] text-slate-500 font-medium">Cox Survival Hazard</span>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] font-semibold text-slate-500 uppercase">Predicted Delay</span>
              <div className="text-3xl font-black text-slate-900 font-mono mt-1">
                +{(selectedProject.predictedDelayMonths * 30).toFixed(0)} <span className="text-xs text-slate-500 font-normal">days</span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">+{selectedProject.predictedDelayMonths} Calendar Months</span>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] font-semibold text-slate-500 uppercase">Risk Classification</span>
              <div
                className={`text-2xl font-black font-mono mt-1 ${
                  selectedProject.riskCategory === 'CRITICAL'
                    ? 'text-red-600'
                    : selectedProject.riskCategory === 'HIGH'
                    ? 'text-orange-600'
                    : 'text-amber-600'
                }`}
              >
                {selectedProject.riskCategory}
              </div>
              <span className="text-[11px] text-slate-500 font-medium">Action Priority Level</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              Top Risk Drivers (SHAP Factor Attribution)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedProject.driverAttribution.map((attr, idx) => (
                <div key={idx} className="p-2.5 rounded border border-slate-200 bg-slate-50 flex items-start gap-2 text-xs">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="font-semibold text-slate-900 flex items-center justify-between">
                      <span>{attr.driver}</span>
                      <span className="font-mono text-blue-700 font-bold ml-2">{attr.percentage}%</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{attr.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="gov-card p-5 rounded-lg bg-white border border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 mb-1">State-wise Average Risk Score</h3>
          <p className="text-xs text-slate-500 mb-4">Mean risk score comparison across key infrastructure states.</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stateChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="state" tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} domain={[0, 100]} />
                <Tooltip
                  formatter={(value: any) => [`${value} Score`, 'Avg Risk']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '6px', fontSize: '11px' }}
                />
                <Bar dataKey="avgScore" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="gov-card p-5 rounded-lg bg-white border border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 mb-1">SHAP Global Feature Importance</h3>
          <p className="text-xs text-slate-500 mb-4">Relative weight of parameters in predicting land acquisition delay.</p>
          <div className="space-y-3">
            {featureImportance.map((f) => (
              <div key={f.feature}>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-slate-800">{f.feature}</span>
                  <span className="font-mono text-blue-700 font-bold">{(f.shapValue * 100).toFixed(0)}% Impact</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all"
                    style={{ width: `${f.shapValue * 200}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
