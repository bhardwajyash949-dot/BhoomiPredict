import React, { useState } from 'react';
import type { LandAcquisitionProject, RiskCategory } from '../../types';
import { Download, Search, Eye, ShieldAlert } from 'lucide-react';

interface CriticalRiskCorridorsTableProps {
  projects: LandAcquisitionProject[];
  onSelectProject: (project: LandAcquisitionProject) => void;
}

export const CriticalRiskCorridorsTable: React.FC<CriticalRiskCorridorsTableProps> = ({
  projects,
  onSelectProject,
}) => {
  const [activeTab, setActiveTab] = useState<'ALL' | RiskCategory>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projects.filter((p) => {
    if (activeTab !== 'ALL' && p.riskCategory !== activeTab) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchId = p.id.toLowerCase().includes(q);
      const matchName = p.name.toLowerCase().includes(q);
      const matchState = p.state.toLowerCase().includes(q);
      const matchDistrict = p.district.toLowerCase().includes(q);
      if (!matchId && !matchName && !matchState && !matchDistrict) return false;
    }
    return true;
  });

  const exportCsv = () => {
    const headers = [
      'Project ID',
      'Project Name',
      'State',
      'District',
      'Land Area (Ha)',
      'Risk Category',
      'Risk Score',
      'Delay Probability (%)',
      'Predicted Delay (Mo)',
      'Primary Driver',
      'Recommended Action',
      'Status',
    ];

    const rows = filteredProjects.map((p) => [
      p.id,
      `"${p.name.replace(/"/g, '""')}"`,
      p.state,
      p.district,
      p.landAreaHa,
      p.riskCategory,
      p.riskScore,
      p.delayProbability,
      p.predictedDelayMonths,
      `"${p.primaryDriver.replace(/"/g, '""')}"`,
      `"${p.recommendedAction.replace(/"/g, '""')}"`,
      p.status,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Bhoomi-Predict_Risk_Corridors_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="gov-card p-5 rounded-lg bg-white border border-slate-200 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-600" />
            Critical Risk Corridors & Projects
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time cadastral risk scoring, delay drivers, and recommended statutory actions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center bg-slate-100 p-1 rounded-md text-xs font-semibold">
            {(['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded transition cursor-pointer ${
                  activeTab === tab
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab === 'ALL' ? 'All Corridors' : tab}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search ID / State..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-md pl-8 pr-3 py-1 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 w-36 sm:w-48"
            />
          </div>

          <button
            onClick={exportCsv}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium px-3 py-1.5 rounded-md transition shadow-2xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV Export</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[10px]">
              <th className="py-2.5 px-3">Project ID</th>
              <th className="py-2.5 px-3">Project / Corridor</th>
              <th className="py-2.5 px-3">State / District</th>
              <th className="py-2.5 px-3">Area (Ha)</th>
              <th className="py-2.5 px-3 text-center">Risk Score</th>
              <th className="py-2.5 px-3 text-center">Delay Prob</th>
              <th className="py-2.5 px-3 text-center">Est. Lag</th>
              <th className="py-2.5 px-3">Primary Driver</th>
              <th className="py-2.5 px-3">Legal Status</th>
              <th className="py-2.5 px-3">Recommended Action</th>
              <th className="py-2.5 px-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
            {filteredProjects.slice(0, 15).map((project) => {
              const isCrit = project.riskCategory === 'CRITICAL';
              const isHigh = project.riskCategory === 'HIGH';
              const isMed = project.riskCategory === 'MEDIUM';

              return (
                <tr
                  key={project.id}
                  className="hover:bg-blue-50/40 transition cursor-pointer group"
                  onClick={() => onSelectProject(project)}
                >
                  <td className="py-3 px-3 font-mono font-bold text-blue-700 whitespace-nowrap">
                    {project.id}
                  </td>

                  <td className="py-3 px-3 max-w-xs">
                    <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition truncate">
                      {project.name}
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">{project.sector}</span>
                  </td>

                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="font-medium text-slate-800">{project.state}</div>
                    <div className="text-[10px] text-slate-500">{project.district}</div>
                  </td>

                  <td className="py-3 px-3 font-mono">{project.landAreaHa.toLocaleString()} Ha</td>

                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <span
                      className={`inline-block font-mono font-extrabold px-2 py-0.5 rounded text-[11px] ${
                        isCrit
                          ? 'bg-red-100 text-red-800 border border-red-300'
                          : isHigh
                          ? 'bg-orange-100 text-orange-800 border border-orange-300'
                          : isMed
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      }`}
                    >
                      {project.riskScore}/100
                    </span>
                  </td>

                  <td className="py-3 px-3 text-center font-mono font-bold whitespace-nowrap">
                    <span
                      className={
                        isCrit ? 'text-red-600' : isHigh ? 'text-orange-600' : isMed ? 'text-amber-600' : 'text-emerald-600'
                      }
                    >
                      {project.delayProbability}%
                    </span>
                  </td>

                  <td className="py-3 px-3 text-center font-mono whitespace-nowrap">
                    <span className="font-bold text-slate-900">+{project.predictedDelayMonths} Mo</span>
                  </td>

                  <td className="py-3 px-3 text-slate-700 max-w-[150px] truncate" title={project.primaryDriver}>
                    {project.primaryDriver}
                  </td>

                  <td className="py-3 px-3 whitespace-nowrap">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        project.courtCaseStatus === 'High Court Stay'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : project.courtCaseStatus === 'Pending Sub-Court'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {project.courtCaseStatus}
                    </span>
                  </td>

                  <td className="py-3 px-3 text-slate-600 max-w-xs truncate" title={project.recommendedAction}>
                    {project.recommendedAction}
                  </td>

                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(project);
                      }}
                      className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-100 rounded transition cursor-pointer"
                      title="Inspect Intelligence Profile"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredProjects.length === 0 && (
        <div className="py-8 text-center text-slate-500 text-xs font-medium">
          No projects matched the selected filters.
        </div>
      )}

      {filteredProjects.length > 15 && (
        <div className="pt-3 mt-2 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
          <span>Showing 15 of {filteredProjects.length} critical corridors</span>
          <span className="font-mono text-[11px] text-blue-600 font-semibold">
            Use Portfolio view to inspect all {projects.length} national projects
          </span>
        </div>
      )}
    </div>
  );
};
