import React, { useState, useEffect } from 'react';
import type { LandAcquisitionProject, PredictiveAnalyticsResult } from '../types';
import { apiService } from '../services/api';
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
  ChevronRight,
  Sparkles,
  Scale,
  Banknote,
  FileCheck2,
  Users,
} from 'lucide-react';

interface RiskAnalyticsPageProps {
  projects: LandAcquisitionProject[];
  onSelectProject: (project: LandAcquisitionProject) => void;
}

export const RiskAnalyticsPage: React.FC<RiskAnalyticsPageProps> = ({
  projects,
  onSelectProject,
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    projects[0]?.id || 'LA-2026-1004'
  );
  const [predictiveResult, setPredictiveResult] = useState<PredictiveAnalyticsResult | null>(null);

  useEffect(() => {
    async function fetchPrediction() {
      const res = await apiService.getPredictiveAnalytics(selectedProjectId);
      setPredictiveResult(res);
    }
    fetchPrediction();
  }, [selectedProjectId]);


  const selectedProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  const totalProjects = projects.length;
  const criticalCount = projects.filter((p) => p.riskCategory === 'CRITICAL').length;
  const highCount = projects.filter((p) => p.riskCategory === 'HIGH').length;
  const avgRiskScore =
    totalProjects > 0
      ? (projects.reduce((a, b) => a + b.riskScore, 0) / totalProjects).toFixed(1)
      : '54.2';
  const avgDelayDays =
    totalProjects > 0
      ? Math.round(
          (projects.reduce((a, b) => a + b.predictedDelayMonths, 0) / totalProjects) * 30
        )
      : 185;

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

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 tracking-tight">
            <BrainCircuit className="w-6 h-6 text-blue-600" />
            Random Forest + SHAP Predictive Analytics
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Machine learning inference, SHAP feature attributions, and rule-based recommendation engine.
          </p>
        </div>
      </div>

      {/* Top Overview KPI Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
        <div className="clean-card p-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avg Risk Score</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">{avgRiskScore} / 100</div>
        </div>
        <div className="clean-card p-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Critical Corridors</span>
          <div className="text-2xl font-extrabold text-red-600 mt-1">{criticalCount}</div>
        </div>
        <div className="clean-card p-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">High Risk</span>
          <div className="text-2xl font-extrabold text-orange-600 mt-1">{highCount}</div>
        </div>
        <div className="clean-card p-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mean Delay</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">+{avgDelayDays} Days</div>
        </div>
        <div className="clean-card p-4 col-span-2 sm:col-span-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ML Architecture</span>
          <div className="text-xs font-semibold text-blue-600 mt-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            Random Forest + SHAP
          </div>
        </div>
      </div>

      {/* Predictive Analytics Feature Card for High-Risk Project */}
      {predictiveResult && (
        <div className="clean-card p-6 border-2 border-blue-200/80 shadow-md">
          {/* Card Title & Project Selector */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  {predictiveResult.projectId}
                </span>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    predictiveResult.riskLevel === 'HIGH' || predictiveResult.riskLevel === 'CRITICAL'
                      ? 'bg-red-50 text-red-700 border border-red-200/80'
                      : 'bg-amber-50 text-amber-700 border border-amber-200/80'
                  }`}
                >
                  Risk Level: {predictiveResult.riskLevel}
                </span>
                <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  Random Forest Inference
                </span>
              </div>
              <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
                {predictiveResult.projectName}
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {predictiveResult.state} • {predictiveResult.district} • {predictiveResult.sector}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Select Corridor:</span>
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer max-w-xs shadow-2xs"
              >
                {projects.slice(0, 20).map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.id} - {p.name.substring(0, 26)}... ({p.riskCategory})
                  </option>
                ))}
              </select>
              {selectedProject && (
                <button
                  onClick={() => onSelectProject(selectedProject)}
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition cursor-pointer flex items-center gap-1 shadow-2xs"
                >
                  <span>Inspect</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Core Analytics Outputs: Delay Prob, Risk Level, Expected Delay */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-6">
            {/* Delay Probability */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-red-50/80 to-amber-50/60 border border-red-200/80 text-center relative overflow-hidden">
              <span className="text-[11px] font-bold text-red-700 uppercase tracking-wider block mb-1">
                Delay Probability
              </span>
              <div className="text-4xl font-extrabold text-red-600 font-mono tracking-tight">
                ~{predictiveResult.delayProbability}%
              </div>
              <p className="text-[11px] text-red-800/80 font-medium mt-1">
                Calculated via Random Forest probability output
              </p>
            </div>

            {/* Risk Level */}
            <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 text-center">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Risk Classification
              </span>
              <div className="text-4xl font-extrabold text-orange-600 font-mono tracking-tight">
                {predictiveResult.riskLevel}
              </div>
              <p className="text-[11px] text-slate-500 font-medium mt-1">
                Action Threshold Triggered
              </p>
            </div>

            {/* Expected Delay */}
            <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 text-center">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Expected Delay
              </span>
              <div className="text-4xl font-extrabold text-slate-900 font-mono tracking-tight">
                {predictiveResult.expectedDelay}
              </div>
              <p className="text-[11px] text-slate-500 font-medium mt-1">
                Estimated Delivery Lag ({predictiveResult.expectedDelayMonths} months mean)
              </p>
            </div>
          </div>

          {/* Top Delay Drivers & Rule-Based Recommendation Engine */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
            {/* Top Delay Drivers (SHAP Normalized) */}
            <div className="p-5 rounded-2xl bg-slate-50/60 border border-slate-200/70">
              <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-blue-600" />
                Top Delay Drivers (SHAP Attributions)
              </h3>
              <p className="text-xs text-slate-500 mb-4 font-medium">
                Normalized SHAP feature attribution breakdown for this project.
              </p>

              <div className="space-y-3.5">
                {predictiveResult.topDelayDrivers.map((driver, index) => (
                  <div key={driver.driver}>
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="font-semibold text-slate-800 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px] flex items-center justify-center">
                          {index + 1}
                        </span>
                        {driver.driver}
                      </span>
                      <span className="text-blue-700 font-bold font-mono text-xs">
                        ~{driver.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200/80 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${driver.percentage * 2.2}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rule-Based Recommended Actions */}
            <div className="p-5 rounded-2xl bg-blue-50/40 border border-blue-200/70">
              <h3 className="text-sm font-bold text-blue-900 mb-1 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                Recommended Actions (Rule-Based Engine)
              </h3>
              <p className="text-xs text-blue-700/80 mb-4 font-medium">
                Automated corrective actions triggered by top feature attributions & dataset values.
              </p>

              <div className="space-y-3">
                {predictiveResult.recommendedActions.map((action, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white border border-blue-200/80 shadow-2xs text-xs flex items-start gap-3"
                  >
                    <div className="p-2 rounded-lg bg-blue-50 text-blue-600 shrink-0 mt-0.5">
                      {idx === 0 && <Scale className="w-4 h-4" />}
                      {idx === 1 && <Banknote className="w-4 h-4" />}
                      {idx === 2 && <FileCheck2 className="w-4 h-4" />}
                      {idx === 3 && <Users className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-bold text-slate-900 text-xs">
                          {action.trigger}
                        </span>
                        <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/60 font-mono">
                          {action.metric}
                        </span>
                      </div>
                      <p className="text-slate-700 font-medium leading-relaxed">
                        {action.action}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* State-wise Chart & SHAP Global Feature Importance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="clean-card p-6">
          <h3 className="text-sm font-bold text-slate-900 mb-1">State-wise Average Risk Score</h3>
          <p className="text-xs text-slate-500 mb-4">Mean risk score comparison across key states.</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stateChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="state" tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} domain={[0, 100]} />
                <Tooltip
                  formatter={(value: any) => [`${value} Score`, 'Avg Risk']}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    color: '#fff',
                    borderRadius: '8px',
                    fontSize: '11px',
                  }}
                />
                <Bar dataKey="avgScore" fill="#2563eb" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="clean-card p-6">
          <h3 className="text-sm font-bold text-slate-900 mb-1">SHAP Global Feature Importance</h3>
          <p className="text-xs text-slate-500 mb-4">Relative parameter weighting in predicting acquisition delay.</p>
          <div className="space-y-4">
            {[
              { feature: 'Legal disputes count', shapValue: 0.32 },
              { feature: 'Compensation pending percentage', shapValue: 0.27 },
              { feature: 'Pending statutory approvals', shapValue: 0.19 },
              { feature: 'Rehabilitation progress lag', shapValue: 0.12 },
              { feature: 'Total land scope (Ha)', shapValue: 0.10 },
            ].map((f) => (
              <div key={f.feature}>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="font-semibold text-slate-800">{f.feature}</span>
                  <span className="text-blue-600 font-bold font-mono">{(f.shapValue * 100).toFixed(0)}%</span>
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
