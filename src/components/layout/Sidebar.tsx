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
  X,
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
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  unreadAlertsCount,
  mobileOpen,
  onCloseMobile,
}) => {
  const navItems: { key: NavItemKey; label: string; icon: React.FC<{ className?: string }>; badge?: number }[] = [
    { key: 'dashboard', label: 'Executive Overview', icon: LayoutDashboard },
    { key: 'risk-analytics', label: 'Risk Analytics & AI', icon: BrainCircuit },
    { key: 'gis-map', label: 'GIS Spatial Map', icon: Map },
    { key: 'portfolio', label: 'Project Portfolio', icon: FolderKanban },
    { key: 'interventions', label: 'Interventions', icon: GitPullRequest },
    { key: 'alerts', label: 'Notifications', icon: Bell, badge: unreadAlertsCount },
    { key: 'model-intelligence', label: 'Model Intelligence', icon: Cpu },
    { key: 'architecture', label: 'System Architecture', icon: Network },
    { key: 'scope', label: 'Scope of Study', icon: FileText },
    { key: 'security', label: 'Security & Audit', icon: Lock },
  ];

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 md:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`w-64 bg-slate-950 text-slate-200 flex flex-col h-screen shrink-0 border-r border-slate-800/60 select-none fixed md:static inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-bold text-base tracking-tight text-white">Sanket Gati</h1>
                <span className="text-[10px] font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30 px-1.5 py-0.5 rounded-full">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-wide">Predictive Governance</p>
            </div>
          </div>

          <button
            onClick={onCloseMobile}
            className="md:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 transition cursor-pointer"
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => {
                  onTabChange(item.key);
                  onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 font-semibold'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 shadow-xs">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Model Sync Card */}
        <div className="p-3.5 m-3 rounded-xl bg-slate-900/90 border border-slate-800/80 text-xs">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-slate-300 font-semibold text-[11px]">
              <Radio className="w-3.5 h-3.5 text-emerald-400" />
              <span>AI Engine</span>
            </div>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot"></span>
              Live
            </span>
          </div>
          <div className="flex justify-between items-center text-[11px] text-slate-400">
            <span>Accuracy Score</span>
            <span className="font-semibold text-emerald-400">99.8%</span>
          </div>
        </div>
      </aside>
    </>
  );
};
