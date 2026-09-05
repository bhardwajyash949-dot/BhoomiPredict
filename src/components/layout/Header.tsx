import React from 'react';
import {
  Search,
  Bell,
  UserCheck,
  Shield,
  RefreshCw,
  SlidersHorizontal,
} from 'lucide-react';
import type { GlobalFilterState, UserRole } from '../../types';

interface HeaderProps {
  filters: GlobalFilterState;
  onFilterChange: (filters: Partial<GlobalFilterState>) => void;
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  unreadAlertsCount: number;
  onOpenAlerts: () => void;
}

const availableStates = [
  'ALL',
  'Maharashtra',
  'Gujarat',
  'Karnataka',
  'Uttar Pradesh',
  'Tamil Nadu',
  'Rajasthan',
  'Madhya Pradesh',
  'Telangana',
  'Andhra Pradesh',
  'Haryana',
];

const availableSectors = [
  'ALL',
  'Highways & Expressways',
  'Railways & Dedicated Freight',
  'Ports & Maritime',
  'Renewable Energy & Solar',
  'Industrial Corridors',
  'Urban Infrastructure',
  'Water Resources & Irrigation',
];

const availableRoles: UserRole[] = [
  'Super Administrator',
  'Chief Land Acquisition Officer',
  'State Administrator',
  'District Officer',
  'Project Manager',
  'Analyst',
  'Viewer',
];

export const Header: React.FC<HeaderProps> = ({
  filters,
  onFilterChange,
  userRole,
  onRoleChange,
  unreadAlertsCount,
  onOpenAlerts,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-3 sticky top-0 z-30 shadow-xs">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3">
        <div className="flex items-center gap-4 flex-1">
          <div className="hidden sm:block">
            <h2 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-600" />
              AI Land Acquisition Intelligence
            </h2>
            <p className="text-[11px] text-slate-500 font-medium">Predictive Governance & Decision Support Platform</p>
          </div>

          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects / survey / parcel ID..."
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-md pl-9 pr-4 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-md p-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500 ml-1.5" />
            
            <select
              value={filters.state}
              onChange={(e) => onFilterChange({ state: e.target.value })}
              aria-label="Filter by State"
              className="bg-transparent font-medium text-slate-700 text-xs py-0.5 px-1 focus:outline-none cursor-pointer"
            >
              {availableStates.map((s) => (
                <option key={s} value={s}>
                  State: {s}
                </option>
              ))}
            </select>

            <span className="text-slate-300">|</span>

            <select
              value={filters.sector}
              onChange={(e) => onFilterChange({ sector: e.target.value })}
              aria-label="Filter by Infrastructure Sector"
              className="bg-transparent font-medium text-slate-700 text-xs py-0.5 px-1 focus:outline-none cursor-pointer max-w-[140px] truncate"
            >
              {availableSectors.map((sec) => (
                <option key={sec} value={sec}>
                  Sector: {sec === 'ALL' ? 'All Sectors' : sec.split(' ')[0]}
                </option>
              ))}
            </select>

            <span className="text-slate-300">|</span>

            <select
              value={filters.riskCategory}
              onChange={(e) => onFilterChange({ riskCategory: e.target.value })}
              aria-label="Filter by Risk Category"
              className="bg-transparent font-medium text-slate-700 text-xs py-0.5 px-1 focus:outline-none cursor-pointer"
            >
              <option value="ALL">Risk: All</option>
              <option value="CRITICAL">Risk: Critical</option>
              <option value="HIGH">Risk: High</option>
              <option value="MEDIUM">Risk: Medium</option>
              <option value="LOW">Risk: Low</option>
            </select>
          </div>

          {(filters.state !== 'ALL' || filters.sector !== 'ALL' || filters.riskCategory !== 'ALL' || filters.searchQuery) && (
            <button
              onClick={() => onFilterChange({ state: 'ALL', district: 'ALL', sector: 'ALL', riskCategory: 'ALL', searchQuery: '' })}
              title="Reset Filters"
              className="p-1.5 text-slate-500 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 rounded-md transition cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={onOpenAlerts}
            className="relative p-2 text-slate-600 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-md transition cursor-pointer"
            title="System Alerts"
          >
            <Bell className="w-4 h-4" />
            {unreadAlertsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                {unreadAlertsCount}
              </span>
            )}
          </button>

          <div className="flex items-center gap-1.5 bg-slate-900 text-white px-2.5 py-1 rounded-md border border-slate-800">
            <UserCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[9px] text-slate-400 font-semibold uppercase leading-none">Role</span>
              <select
                value={userRole}
                onChange={(e) => onRoleChange(e.target.value as UserRole)}
                aria-label="Select User Role"
                className="bg-transparent text-white font-medium text-[11px] focus:outline-none cursor-pointer py-0.5 pr-1"
              >
                {availableRoles.map((r) => (
                  <option key={r} value={r} className="bg-slate-900 text-white">
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
