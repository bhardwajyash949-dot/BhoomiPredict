import React, { useState } from 'react';
import type { LandAcquisitionProject, GlobalFilterState } from '../types';
import {
  FolderKanban,
  Search,
  ArrowUpDown,
  Eye,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface ProjectPortfolioPageProps {
  projects: LandAcquisitionProject[];
  filters: GlobalFilterState;
  onFilterChange: (filters: Partial<GlobalFilterState>) => void;
  onSelectProject: (project: LandAcquisitionProject) => void;
}

export const ProjectPortfolioPage: React.FC<ProjectPortfolioPageProps> = ({
  projects,
  filters,
  onFilterChange,
  onSelectProject,
}) => {
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [sortBy, setSortBy] = useState<'riskScore' | 'delayProbability' | 'landAreaHa' | 'id'>('riskScore');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const filtered = projects.filter((p) => {
    if (filters.state && filters.state !== 'ALL' && p.state !== filters.state) return false;
    if (filters.sector && filters.sector !== 'ALL' && p.sector !== filters.sector) return false;
    if (filters.riskCategory && filters.riskCategory !== 'ALL' && p.riskCategory !== filters.riskCategory) return false;
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      const mName = p.name.toLowerCase().includes(q);
      const mId = p.id.toLowerCase().includes(q);
      const mState = p.state.toLowerCase().includes(q);
      const mDist = p.district.toLowerCase().includes(q);
      if (!mName && !mId && !mState && !mDist) return false;
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];
    if (typeof valA === 'string') {
      return sortOrder === 'asc' ? valA.localeCompare(valB as string) : (valB as string).localeCompare(valA);
    }
    return sortOrder === 'asc' ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
  });

  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const paginatedProjects = sorted.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const toggleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <FolderKanban className="w-6 h-6 text-blue-600" />
            Land Acquisition Project Portfolio
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            National directory of ongoing and upcoming infrastructure land acquisition projects.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 p-1 rounded-md">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded text-xs transition cursor-pointer ${
                viewMode === 'table' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-500'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded text-xs transition cursor-pointer ${
                viewMode === 'cards' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-500'
              }`}
              title="Card View"
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="gov-card p-4 rounded-lg bg-white border border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by ID, project name, district..."
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-md pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <span className="text-xs text-slate-500 font-mono">
            Showing {sorted.length} of {projects.length} projects
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 font-semibold">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-50 border border-slate-200 rounded-md py-1 px-2 text-xs font-medium focus:outline-none cursor-pointer"
          >
            <option value="riskScore">Risk Score</option>
            <option value="delayProbability">Delay Probability</option>
            <option value="landAreaHa">Land Area</option>
            <option value="id">Project ID</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition font-mono font-bold text-xs cursor-pointer"
          >
            {sortOrder.toUpperCase()}
          </button>
        </div>
      </div>

      {viewMode === 'table' ? (
        <div className="gov-card p-4 rounded-lg bg-white border border-slate-200 overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-3 cursor-pointer" onClick={() => toggleSort('id')}>
                  ID <ArrowUpDown className="w-3 h-3 inline ml-0.5" />
                </th>
                <th className="py-2.5 px-3">Project Name</th>
                <th className="py-2.5 px-3">State / District</th>
                <th className="py-2.5 px-3">Sector</th>
                <th className="py-2.5 px-3 font-mono cursor-pointer" onClick={() => toggleSort('landAreaHa')}>
                  Land Area <ArrowUpDown className="w-3 h-3 inline ml-0.5" />
                </th>
                <th className="py-2.5 px-3 text-center cursor-pointer" onClick={() => toggleSort('riskScore')}>
                  Risk Score <ArrowUpDown className="w-3 h-3 inline ml-0.5" />
                </th>
                <th className="py-2.5 px-3 text-center cursor-pointer" onClick={() => toggleSort('delayProbability')}>
                  Delay Prob <ArrowUpDown className="w-3 h-3 inline ml-0.5" />
                </th>
                <th className="py-2.5 px-3 text-center">Predicted Delay</th>
                <th className="py-2.5 px-3">Current Stage</th>
                <th className="py-2.5 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
              {paginatedProjects.map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-blue-50/30 transition cursor-pointer"
                  onClick={() => onSelectProject(p)}
                >
                  <td className="py-3 px-3 font-mono font-bold text-blue-700 whitespace-nowrap">{p.id}</td>
                  <td className="py-3 px-3 max-w-xs font-semibold text-slate-900 truncate">{p.name}</td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div>{p.state}</div>
                    <div className="text-[10px] text-slate-500">{p.district}</div>
                  </td>
                  <td className="py-3 px-3 text-slate-600 truncate max-w-[120px]">{p.sector}</td>
                  <td className="py-3 px-3 font-mono">{p.landAreaHa} Ha</td>
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <span
                      className={`inline-block font-mono font-extrabold px-2 py-0.5 rounded text-[11px] ${
                        p.riskCategory === 'CRITICAL'
                          ? 'bg-red-100 text-red-800'
                          : p.riskCategory === 'HIGH'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {p.riskScore}/100
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-red-600">{p.delayProbability}%</td>
                  <td className="py-3 px-3 text-center font-mono font-bold">+{p.predictedDelayMonths} Mo</td>
                  <td className="py-3 px-3 text-slate-600 max-w-[140px] truncate text-[11px]">{p.currentStage}</td>
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(p);
                      }}
                      className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedProjects.map((p) => (
            <div
              key={p.id}
              onClick={() => onSelectProject(p)}
              className="gov-card p-4 rounded-lg bg-white border border-slate-200 hover:border-blue-400 transition cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono font-bold text-blue-700">{p.id}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      p.riskCategory === 'CRITICAL'
                        ? 'bg-red-100 text-red-800'
                        : p.riskCategory === 'HIGH'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {p.riskCategory}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1 line-clamp-2">{p.name}</h3>
                <p className="text-xs text-slate-500 mb-3">{p.state} • {p.district}</p>

                <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded text-xs font-mono mb-3">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Risk Score</span>
                    <span className="font-extrabold text-slate-900">{p.riskScore}/100</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Est. Delay</span>
                    <span className="font-extrabold text-red-600">+{p.predictedDelayMonths} Mo</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>{p.landAreaHa} Ha</span>
                <span className="text-blue-600 font-bold flex items-center gap-0.5">
                  Inspect <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 text-xs">
          <span className="text-slate-500">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded border border-slate-200 disabled:opacity-40 hover:bg-slate-100 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded border border-slate-200 disabled:opacity-40 hover:bg-slate-100 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
