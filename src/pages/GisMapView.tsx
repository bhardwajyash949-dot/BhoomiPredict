import React, { useState } from 'react';
import { InteractiveGisMap } from '../components/gis/InteractiveGisMap';
import type { LandAcquisitionProject } from '../types';
import { Map, ChevronRight } from 'lucide-react';

interface GisMapViewProps {
  projects: LandAcquisitionProject[];
  onSelectProject: (project: LandAcquisitionProject) => void;
  selectedState: string;
}

export const GisMapView: React.FC<GisMapViewProps> = ({
  projects,
  onSelectProject,
  selectedState,
}) => {
  const [selectedRiskFilter, setSelectedRiskFilter] = useState<string>('ALL');

  const filteredProjects = projects.filter((p) => {
    if (selectedState && selectedState !== 'ALL' && p.state !== selectedState) return false;
    if (selectedRiskFilter !== 'ALL' && p.riskCategory !== selectedRiskFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 tracking-tight">
            <Map className="w-6 h-6 text-blue-600" />
            Geospatial Land Map
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Cadastral visualization of project corridors and district risk clusters.
          </p>
        </div>

        <div className="flex items-center bg-slate-100/80 p-1 rounded-xl border border-slate-200/60 text-xs font-medium">
          <span className="text-slate-500 px-2 text-[11px] font-semibold">Filter:</span>
          {(['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'] as const).map((risk) => (
            <button
              key={risk}
              onClick={() => setSelectedRiskFilter(risk)}
              className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                selectedRiskFilter === risk
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {risk}
            </button>
          ))}
        </div>
      </div>

      <InteractiveGisMap
        projects={filteredProjects}
        onSelectProject={onSelectProject}
        selectedStateFilter={selectedState}
      />

      <div className="clean-card p-6">
        <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center justify-between">
          <span>Active GIS Pins ({filteredProjects.length} Projects Shown)</span>
          <span className="text-xs text-slate-500 font-medium">PostGIS Layer Connected</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.slice(0, 6).map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="p-4 rounded-xl border border-slate-200/70 hover:border-blue-400 bg-slate-50/50 hover:bg-blue-50/20 transition cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">{project.id}</span>
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      project.riskCategory === 'CRITICAL'
                        ? 'bg-red-50 text-red-700'
                        : project.riskCategory === 'HIGH'
                        ? 'bg-orange-50 text-orange-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {project.riskCategory}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 truncate">{project.name}</h4>
                <p className="text-[11px] text-slate-500">{project.state} • {project.district}</p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-xs">
                <span className="text-red-600 font-bold">+{project.predictedDelayMonths} Mo Lag</span>
                <span className="text-blue-600 font-semibold text-[11px] flex items-center gap-0.5">
                  Inspect <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
