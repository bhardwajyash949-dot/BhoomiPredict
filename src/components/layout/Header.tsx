import React from 'react';
import {
  Search,
  Bell,
  UserCheck,
  Shield,
  RotateCcw,
  Filter,
  Menu,
} from 'lucide-react';
import type { GlobalFilterState, UserRole } from '../../types';

interface HeaderProps {
  filters: GlobalFilterState;
  onFilterChange: (filters: Partial<GlobalFilterState>) => void;
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  unreadAlertsCount: number;
  onOpenAlerts: () => void;
  onToggleMobileSidebar: () => void;
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
  onToggleMobileSidebar,
}) => {
  const isFilterActive =
    filters.state !== 'ALL' ||
    filters.sector !== 'ALL' ||
    filters.riskCategory !== 'ALL' ||
    Boolean(filters.searchQuery);

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3 sticky top-0 z-30 shadow-2xs">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Left Section: Mobile Toggle & Search */}
        <div className="flex items-center gap-3 flex-1">
          <button
            onClick={onToggleMobileSidebar}
            className="md:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
            aria-label="Toggle Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden lg:flex items-center gap-2 shrink-0 pr-2 border-r border-slate-200">
            <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-slate-900 leading-tight">Land Acquisition AI</h2>
              <p className="text-[10px] text-slate-500 font-medium">Predictive Governance Platform</p>
            </div>
          </div>

          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects, survey numbers, parcels..."
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition"
            />
          </div>
        </div>

        {/* Right Section: Clean Filter Bar & User Tools */}
        <div className="flex flex-wrap items-center justify-between lg:justify-end gap-2.5 text-xs">
          {/* Filters Group */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-100/70 p-1 rounded-xl border border-slate-200/60">
            <div className="flex items-center gap-1.5 px-2 py-1 text-slate-500 text-[11px] font-semibold">
              <Filter className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Filters:</span>
            </div>

            {/* State Filter */}
            <select
              value={filters.state}
              onChange={(e) => onFilterChange({ state: e.target.value })}
              aria-label="Filter by State"
              className="bg-white border border-slate-200 font-medium text-slate-700 text-xs rounded-lg py-1 px-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer shadow-2xs"
            >
              {availableStates.map((s) => (
                <option key={s} value={s}>
                  {s === 'ALL' ? 'All States' : s}
                </option>
              ))}
            </select>

            {/* Sector Filter */}
            <select
              value={filters.sector}
              onChange={(e) => onFilterChange({ sector: e.target.value })}
              aria-label="Filter by Sector"
              className="bg-white border border-slate-200 font-medium text-slate-700 text-xs rounded-lg py-1 px-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer shadow-2xs max-w-[130px] sm:max-w-[150px] truncate"
            >
              {availableSectors.map((sec) => (
                <option key={sec} value={sec}>
                  {sec === 'ALL' ? 'All Sectors' : sec.split(' ')[0]}
                </option>
              ))}
            </select>

            {/* Risk Category Filter */}
            <select
              value={filters.riskCategory}
              onChange={(e) => onFilterChange({ riskCategory: e.target.value })}
              aria-label="Filter by Risk Category"
              className="bg-white border border-slate-200 font-medium text-slate-700 text-xs rounded-lg py-1 px-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer shadow-2xs"
            >
              <option value="ALL">All Risks</option>
              <option value="CRITICAL">Critical Risk</option>
              <option value="HIGH">High Risk</option>
              <option value="MEDIUM">Medium Risk</option>
              <option value="LOW">Low Risk</option>
            </select>

            {isFilterActive && (
              <button
                onClick={() =>
                  onFilterChange({
                    state: 'ALL',
                    district: 'ALL',
                    sector: 'ALL',
                    riskCategory: 'ALL',
                    searchQuery: '',
                  })
                }
                title="Reset Filters"
                className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-white rounded-lg transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Notifications Button */}
            <button
              onClick={onOpenAlerts}
              className="relative p-2 text-slate-600 hover:text-blue-600 bg-slate-100/70 hover:bg-white border border-slate-200/80 rounded-xl transition cursor-pointer"
              title="System Alerts"
            >
              <Bell className="w-4 h-4" />
              {unreadAlertsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {unreadAlertsCount}
                </span>
              )}
            </button>

            {/* User Role Switcher */}
            <div className="flex items-center gap-2 bg-slate-900 text-white px-3 py-1.5 rounded-xl border border-slate-800 shadow-2xs">
              <UserCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <select
                value={userRole}
                onChange={(e) => onRoleChange(e.target.value as UserRole)}
                aria-label="Select User Role"
                className="bg-transparent text-white font-medium text-[11px] focus:outline-none cursor-pointer max-w-[130px] sm:max-w-none truncate"
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
