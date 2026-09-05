import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { LandAcquisitionProject } from '../../types';
import { Layers, Eye } from 'lucide-react';

interface InteractiveGisMapProps {
  projects: LandAcquisitionProject[];
  onSelectProject: (project: LandAcquisitionProject) => void;
  selectedStateFilter?: string;
}

const INDIA_CENTER: [number, number] = [20.5937, 78.9629];

const MapRecenter: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const createRiskIcon = (riskCategory: LandAcquisitionProject['riskCategory']) => {
  let color = '#EF4444';
  if (riskCategory === 'HIGH') color = '#F97316';
  if (riskCategory === 'MEDIUM') color = '#F59E0B';
  if (riskCategory === 'LOW') color = '#10B981';

  return L.divIcon({
    className: 'custom-gis-pin',
    html: `
      <div style="
        background-color: ${color};
        width: 22px;
        height: 22px;
        border-radius: 50%;
        border: 2px solid #ffffff;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="width: 6px; height: 6px; background-color: #ffffff; border-radius: 50%;"></div>
      </div>
    `,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });
};

export const InteractiveGisMap: React.FC<InteractiveGisMapProps> = ({
  projects,
  onSelectProject,
  selectedStateFilter,
}) => {
  return (
    <div className="relative w-full h-[600px] rounded-lg border border-slate-200 overflow-hidden shadow-xs">
      <MapContainer
        center={INDIA_CENTER}
        zoom={5}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapRecenter center={INDIA_CENTER} zoom={selectedStateFilter && selectedStateFilter !== 'ALL' ? 7 : 5} />

        {projects.map((project) => (
          <Marker
            key={project.id}
            position={[project.lat, project.lng]}
            icon={createRiskIcon(project.riskCategory)}
          >
            <Popup className="gov-map-popup">
              <div className="p-2 max-w-sm text-xs font-sans">
                <div className="flex items-center justify-between gap-2 pb-1 mb-1.5 border-b border-slate-100">
                  <span className="font-mono font-bold text-blue-700 text-[11px]">{project.id}</span>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
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

                <h4 className="font-bold text-slate-900 text-xs mb-1">{project.name}</h4>
                <p className="text-[11px] text-slate-500 mb-2">
                  {project.state} • {project.district}
                </p>

                <div className="grid grid-cols-2 gap-1.5 bg-slate-50 p-2 rounded text-[11px] mb-2 font-mono">
                  <div>
                    <span className="text-slate-400 block text-[9px] uppercase">Risk Score</span>
                    <span className="font-extrabold text-slate-900">{project.riskScore}/100</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px] uppercase">Est. Delay</span>
                    <span className="font-extrabold text-red-600">+{project.predictedDelayMonths} Mo</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px] uppercase">Land Scope</span>
                    <span className="font-bold text-slate-800">{project.landAreaHa} Ha</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px] uppercase">Legal Status</span>
                    <span className="font-bold text-slate-800 truncate">{project.courtCaseStatus}</span>
                  </div>
                </div>

                <div className="text-[10px] text-slate-600 mb-2">
                  <span className="font-bold text-slate-800">Primary Driver: </span>
                  {project.primaryDriver}
                </div>

                <button
                  onClick={() => onSelectProject(project)}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[11px] py-1.5 px-3 rounded flex items-center justify-center gap-1 transition cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Intelligence Profile</span>
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md border border-slate-200 p-3 rounded-lg shadow-md z-20 text-xs">
        <h5 className="font-bold text-slate-900 text-[11px] uppercase tracking-wider mb-2 flex items-center gap-1">
          <Layers className="w-3.5 h-3.5 text-blue-600" />
          GIS Layer Risk Legend
        </h5>
        <div className="space-y-1.5 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block border border-white shadow-2xs"></span>
            <span className="font-semibold text-slate-800">CRITICAL (Risk 81-100)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-orange-500 inline-block border border-white shadow-2xs"></span>
            <span className="font-semibold text-slate-800">HIGH (Risk 61-80)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block border border-white shadow-2xs"></span>
            <span className="font-semibold text-slate-800">MEDIUM (Risk 31-60)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block border border-white shadow-2xs"></span>
            <span className="font-semibold text-slate-800">LOW (Risk 0-30)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
