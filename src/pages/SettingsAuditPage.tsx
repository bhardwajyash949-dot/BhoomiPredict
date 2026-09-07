import React from 'react';
import type { AuditLogItem, UserRole } from '../types';
import { Lock, History, UserCheck, KeyRound } from 'lucide-react';

interface SettingsAuditPageProps {
  auditLogs: AuditLogItem[];
  currentUserRole: UserRole;
}

export const SettingsAuditPage: React.FC<SettingsAuditPageProps> = ({ auditLogs, currentUserRole }) => {
  const rolesPermissions = [
    { role: 'Super Administrator', permissions: 'Full system access, model retraining, RBAC management, audit inspection' },
    { role: 'Chief Land Acquisition Officer', permissions: 'National project oversight, intervention deployment, SLA override' },
    { role: 'State Administrator', permissions: 'State-level project management, officer assignments' },
    { role: 'District Officer', permissions: 'District land parcel survey updates, mutation status management' },
    { role: 'Project Manager', permissions: 'Assigned project timeline updates, compensation reporting' },
    { role: 'Analyst', permissions: 'XAI model metrics view, SHAP analysis, export generation' },
    { role: 'Viewer', permissions: 'Read-only dashboard view across national and state corridors' },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 tracking-tight">
            <Lock className="w-6 h-6 text-blue-600" />
            Security & Audit Trail
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Role-based access matrix and system audit logs.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-blue-50 text-blue-900 border border-blue-200/80 px-3 py-1.5 rounded-xl text-xs font-semibold">
          <UserCheck className="w-4 h-4 text-blue-600" />
          <span>Active Role: {currentUserRole}</span>
        </div>
      </div>

      <div className="clean-card p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <KeyRound className="w-5 h-5 text-blue-600" />
          Role-Based Access Control (RBAC)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2 text-xs">
          {rolesPermissions.map((r) => (
            <div
              key={r.role}
              className={`p-4 rounded-xl border ${
                currentUserRole === r.role
                  ? 'bg-blue-50/70 border-blue-400 ring-2 ring-blue-500/20'
                  : 'bg-slate-50/70 border-slate-200/60'
              }`}
            >
              <div className="font-bold text-slate-900 flex items-center justify-between mb-1">
                <span>{r.role}</span>
                {currentUserRole === r.role && (
                  <span className="text-[10px] bg-blue-600 text-white font-bold px-2 py-0.5 rounded-full">Active</span>
                )}
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">{r.permissions}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="clean-card p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <History className="w-5 h-5 text-blue-600" />
          System Audit Log
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px] bg-slate-50/50">
                <th className="py-3 px-3.5">Audit ID</th>
                <th className="py-3 px-3.5">User</th>
                <th className="py-3 px-3.5">Role</th>
                <th className="py-3 px-3.5">Action</th>
                <th className="py-3 px-3.5">Project</th>
                <th className="py-3 px-3.5">Timestamp</th>
                <th className="py-3 px-3.5">Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="py-3 px-3.5 font-bold text-blue-600 whitespace-nowrap">{log.id}</td>
                  <td className="py-3 px-3.5 font-semibold text-slate-900 whitespace-nowrap">{log.user}</td>
                  <td className="py-3 px-3.5 text-slate-500 whitespace-nowrap">{log.role}</td>
                  <td className="py-3 px-3.5 font-bold text-slate-800 whitespace-nowrap">{log.action}</td>
                  <td className="py-3 px-3.5 text-slate-700 whitespace-nowrap">{log.projectId}</td>
                  <td className="py-3 px-3.5 text-slate-400 text-[11px] whitespace-nowrap">{log.timestamp}</td>
                  <td className="py-3 px-3.5 text-slate-700 max-w-xs truncate" title={`${log.previousValue} → ${log.newValue}`}>
                    <span className="text-slate-400 line-through mr-1">{log.previousValue}</span>
                    <span className="font-bold text-emerald-600">→ {log.newValue}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
