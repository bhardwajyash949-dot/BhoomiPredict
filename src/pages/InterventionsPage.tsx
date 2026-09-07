import React, { useState } from 'react';
import type { Intervention, LandAcquisitionProject } from '../types';
import {
  GitPullRequest,
  Plus,
  Sparkles,
} from 'lucide-react';

interface InterventionsPageProps {
  interventions: Intervention[];
  projects: LandAcquisitionProject[];
  onAddIntervention: (newIntervention: Omit<Intervention, 'id' | 'createdAt'>) => void;
  onUpdateStatus: (id: string, status: Intervention['status'], notes?: string) => void;
}

export const InterventionsPage: React.FC<InterventionsPageProps> = ({
  interventions,
  projects,
  onAddIntervention,
  onUpdateStatus,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || '');
  const [issue, setIssue] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [priority, setPriority] = useState<Intervention['priority']>('HIGH');
  const [department] = useState('Land Records & Revenue');
  const [officer, setOfficer] = useState('');
  const [targetDate] = useState('2026-09-30');
  const [delayReduction] = useState(30);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const proj = projects.find((p) => p.id === selectedProjectId);
    if (!proj) return;

    onAddIntervention({
      projectId: proj.id,
      projectName: proj.name,
      state: proj.state,
      district: proj.district,
      issue: issue || proj.primaryDriver,
      recommendation: recommendation || proj.recommendedAction,
      priority,
      assignedDepartment: department,
      assignedOfficer: officer || 'Shri S. K. Sharma (Collector)',
      targetDate,
      expectedDelayReductionDays: delayReduction,
      status: 'Pending',
    });

    setShowModal(false);
    setIssue('');
    setRecommendation('');
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 tracking-tight">
            <GitPullRequest className="w-6 h-6 text-blue-600" />
            AI Interventions & Action Engine
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Prescriptive decision support and inter-departmental action tracking.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition shadow-md shadow-blue-600/30 flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Intervention</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {interventions.map((item) => {
          const isCrit = item.priority === 'CRITICAL';
          const isHigh = item.priority === 'HIGH';

          return (
            <div
              key={item.id}
              className="clean-card clean-card-hover p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                      {item.id}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{item.projectId}</span>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      isCrit
                        ? 'bg-red-50 text-red-700 border border-red-200/80'
                        : isHigh
                        ? 'bg-orange-50 text-orange-700 border border-orange-200/80'
                        : 'bg-amber-50 text-amber-700 border border-amber-200/80'
                    }`}
                  >
                    {item.priority}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm mb-1">{item.projectName}</h3>
                <p className="text-xs text-slate-500 font-medium mb-4">
                  {item.state} • {item.district}
                </p>

                <div className="space-y-2.5 text-xs mb-4">
                  <div className="p-3 rounded-xl bg-red-50/60 border border-red-200/60 text-red-950">
                    <span className="font-bold block text-[10px] uppercase tracking-wider text-red-700 mb-0.5">Detected Bottleneck</span>
                    <p className="font-medium text-xs">{item.issue}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/60 text-emerald-950">
                    <span className="font-bold block text-[10px] uppercase tracking-wider text-emerald-700 flex items-center gap-1 mb-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      AI Recommended Action
                    </span>
                    <p className="font-medium text-xs">{item.recommendation}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs text-slate-600 bg-slate-50/80 p-3 rounded-xl border border-slate-200/60 mb-4">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Department</span>
                    <span className="font-semibold text-slate-800 truncate block">{item.assignedDepartment}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Officer</span>
                    <span className="font-semibold text-slate-800 truncate block">{item.assignedOfficer}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Target SLA</span>
                    <span className="font-semibold text-slate-800 block">{item.targetDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Delay Saved</span>
                    <span className="font-bold text-emerald-600 block">-{item.expectedDelayReductionDays} Days</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full border ${
                    item.status === 'Resolved'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200/80'
                      : item.status === 'In Progress'
                      ? 'bg-blue-50 text-blue-700 border-blue-200/80'
                      : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  {item.status}
                </span>

                <div className="flex items-center gap-2 text-xs">
                  {item.status !== 'In Progress' && item.status !== 'Resolved' && (
                    <button
                      onClick={() => onUpdateStatus(item.id, 'In Progress')}
                      className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-3 py-1.5 rounded-xl transition cursor-pointer"
                    >
                      Start Progress
                    </button>
                  )}
                  {item.status !== 'Resolved' && (
                    <button
                      onClick={() => onUpdateStatus(item.id, 'Resolved')}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-3 py-1.5 rounded-xl transition cursor-pointer"
                    >
                      Mark Resolved
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 text-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              Create AI-Powered Intervention
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Target Project:</label>
                <select
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-medium cursor-pointer"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.id} - {p.name} ({p.state})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Identified Bottleneck:</label>
                <input
                  type="text"
                  placeholder="e.g. Ancestral land title mutation backlog"
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Recommended Action:</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Deploy Special Revenue Officer for mutation reconciliation camp."
                  value={recommendation}
                  onChange={(e) => setRecommendation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Priority:</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs cursor-pointer"
                  >
                    <option value="CRITICAL">CRITICAL</option>
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Assigned Officer:</label>
                  <input
                    type="text"
                    placeholder="Officer name"
                    value={officer}
                    onChange={(e) => setOfficer(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-xs cursor-pointer"
                >
                  Deploy Intervention
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
