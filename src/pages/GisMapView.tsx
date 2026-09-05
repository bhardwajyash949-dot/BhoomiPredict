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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Map className="w-6 h-6 text-blue-600" />
            Geospatial Land Intelligence (GIS Map View)
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Interactive cadastral visualization of project corridors, district risk clusters, and land acquisition bottlenecks.
          </p>
        </div>

        <div className="flex items-center bg-slate-100 p-1 rounded-md text-xs font-semibold">
          <span className="text-slate-500 px-2 text-[11px] font-bold">Filter GIS:</span>
          {(['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'] as const).map((risk) => (
            <button
              key={risk}
              onClick={() => setSelectedRiskFilter(risk)}
              className={`px-2.5 py-1 rounded transition cursor-pointer ${
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

      <div className="gov-card p-5 rounded-lg bg-white border border-slate-200">
        <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center justify-between">
          <span>Active GIS Pins ({filteredProjects.length} Projects Shown)</span>
          <span className="text-xs font-mono text-slate-500">PostGIS Layer Connected</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredProjects.slice(0, 6).map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="p-3 rounded-lg border border-slate-200 hover:border-blue-400 bg-slate-50/50 hover:bg-blue-50/30 transition cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-blue-700">{project.id}</span>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                      project.riskCategory === 'CRITICAL'
                        ? 'bg-red-100 text-red-700'
                        : project.riskCategory === 'HIGH'
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {project.riskCategory}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 truncate">{project.name}</h4>
                <p className="text-[11px] text-slate-500">{project.state} • {project.district}</p>
              </div>

              <div className="mt-2 pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs">
                <span className="font-mono text-red-600 font-bold">+{project.predictedDelayMonths} Mo Lag</span>
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
