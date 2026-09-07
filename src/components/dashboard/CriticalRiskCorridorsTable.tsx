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
    link.setAttribute('download', `Sanket_Gati_Risk_Corridors_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="clean-card p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-600" />
            Critical Risk Corridors & Projects
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Real-time cadastral risk scoring, delay drivers, and recommended statutory actions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center bg-slate-100/80 p-1 rounded-xl text-xs font-medium border border-slate-200/60">
            {(['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                  activeTab === tab
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab === 'ALL' ? 'All' : tab}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search corridor or state..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-40 sm:w-52"
            />
          </div>

          <button
            onClick={exportCsv}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3.5 py-1.5 rounded-xl transition shadow-2xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV Export</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px] bg-slate-50/50">
              <th className="py-3 px-3.5">ID</th>
              <th className="py-3 px-3.5">Corridor Project</th>
              <th className="py-3 px-3.5">Location</th>
              <th className="py-3 px-3.5">Area (Ha)</th>
              <th className="py-3 px-3.5 text-center">Risk Score</th>
              <th className="py-3 px-3.5 text-center">Delay Prob</th>
              <th className="py-3 px-3.5 text-center">Lag</th>
              <th className="py-3 px-3.5">Primary Driver</th>
              <th className="py-3 px-3.5 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
            {filteredProjects.slice(0, 15).map((project) => {
              const isCrit = project.riskCategory === 'CRITICAL';
              const isHigh = project.riskCategory === 'HIGH';
              const isMed = project.riskCategory === 'MEDIUM';

              return (
                <tr
                  key={project.id}
                  className="hover:bg-slate-50 transition cursor-pointer group"
                  onClick={() => onSelectProject(project)}
                >
                  <td className="py-3.5 px-3.5 font-bold text-blue-600 whitespace-nowrap">
                    {project.id}
                  </td>

                  <td className="py-3.5 px-3.5 max-w-xs">
                    <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition truncate">
                      {project.name}
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">{project.sector}</span>
                  </td>

                  <td className="py-3.5 px-3.5 whitespace-nowrap">
                    <div className="font-medium text-slate-900">{project.state}</div>
                    <div className="text-[10px] text-slate-400">{project.district}</div>
                  </td>

                  <td className="py-3.5 px-3.5">{project.landAreaHa.toLocaleString()} Ha</td>

                  <td className="py-3.5 px-3.5 text-center whitespace-nowrap">
                    <span
                      className={`inline-block font-bold px-2.5 py-0.5 rounded-full text-[11px] ${
                        isCrit
                          ? 'bg-red-50 text-red-700 border border-red-200/80'
                          : isHigh
                          ? 'bg-orange-50 text-orange-700 border border-orange-200/80'
                          : isMed
                          ? 'bg-amber-50 text-amber-700 border border-amber-200/80'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200/80'
                      }`}
                    >
                      {project.riskScore}/100
                    </span>
                  </td>

                  <td className="py-3.5 px-3.5 text-center font-bold whitespace-nowrap">
                    <span
                      className={
                        isCrit ? 'text-red-600' : isHigh ? 'text-orange-600' : isMed ? 'text-amber-600' : 'text-emerald-600'
                      }
                    >
                      {project.delayProbability}%
                    </span>
                  </td>

                  <td className="py-3.5 px-3.5 text-center font-semibold text-slate-900 whitespace-nowrap">
                    +{project.predictedDelayMonths} Mo
                  </td>

                  <td className="py-3.5 px-3.5 text-slate-600 max-w-[160px] truncate" title={project.primaryDriver}>
                    {project.primaryDriver}
                  </td>

                  <td className="py-3.5 px-3.5 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(project);
                      }}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer"
                      title="Inspect Details"
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
        <div className="py-8 text-center text-slate-400 text-xs font-medium">
          No projects matched the selected criteria.
        </div>
      )}
    </div>
  );
};
