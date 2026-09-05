import React from 'react';
import {
  LayoutDashboard,
  BrainCircuit,
  Map,
  FolderKanban,
  GitPullRequest,
  Network,
  FileText,
  Bell,
  Lock,
  Cpu,
  Landmark,
  Radio,
  ChevronRight,
} from 'lucide-react';
import type { UserRole } from '../../types';

export type NavItemKey =
  | 'dashboard'
  | 'risk-analytics'
  | 'gis-map'
  | 'portfolio'
  | 'interventions'
  | 'model-intelligence'
  | 'architecture'
  | 'scope'
  | 'alerts'
  | 'security';

interface SidebarProps {
  activeTab: NavItemKey;
  onTabChange: (key: NavItemKey) => void;
  userRole: UserRole;
  unreadAlertsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  unreadAlertsCount,
}) => {
  const navItems: { key: NavItemKey; label: string; icon: React.FC<{ className?: string }>; badge?: number }[] = [
    { key: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
    { key: 'risk-analytics', label: 'Risk Analytics & AI', icon: BrainCircuit },
    { key: 'gis-map', label: 'GIS Map View', icon: Map },
    { key: 'portfolio', label: 'Project Portfolio', icon: FolderKanban },
    { key: 'interventions', label: 'Interventions & Recommendations', icon: GitPullRequest },
    { key: 'alerts', label: 'Alerts & Notifications', icon: Bell, badge: unreadAlertsCount },
    { key: 'model-intelligence', label: 'Model Intelligence', icon: Cpu },
    { key: 'architecture', label: 'System Architecture', icon: Network },
    { key: 'scope', label: 'Scope of Study', icon: FileText },
    { key: 'security', label: 'Security & Audit Trail', icon: Lock },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col h-screen shrink-0 border-r border-slate-800 select-none">
      <div className="p-4 border-b border-slate-800/80 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
          <Landmark className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="font-bold text-base tracking-wide text-white">Bhoomi-Predict</h1>
            <span className="text-[10px] font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30 px-1.5 py-0.5 rounded">
              AI
            </span>
          </div>
          <p className="text-[11px] font-mono text-slate-400 tracking-wider">NIC-GOV PORTAL v4.2</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
        <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Core Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onTabChange(item.key)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm font-semibold'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 ? (
                <span className="ml-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0">
                  {item.badge}
                </span>
              ) : isActive ? (
                <ChevronRight className="w-3.5 h-3.5 text-blue-200 opacity-80 shrink-0" />
              ) : null}
            </button>
          );
        })}
      </nav>

      <div className="p-3 m-2 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5 text-slate-300 font-medium">
            <Radio className="w-3.5 h-3.5 text-emerald-400" />
            <span>Model Sync</span>
          </div>
          <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot"></span>
            Live
          </span>
        </div>
        <div className="flex justify-between items-baseline text-[11px] text-slate-400">
          <span>XGBoost + Survival</span>
          <span className="font-mono text-emerald-400 font-bold">99.8%</span>
        </div>
      </div>
    </aside>
  );
};
