import React from 'react';
import type { AuditLogItem, UserRole } from '../types';
import { Lock, History, UserCheck, KeyRound } from 'lucide-react';

interface SettingsAuditPageProps {
  auditLogs: AuditLogItem[];
  currentUserRole: UserRole;
}

export const SettingsAuditPage: React.FC<SettingsAuditPageProps> = ({ auditLogs, currentUserRole }) => {
  const rolesPermissions = [
    { role: 'Super Administrator', permissions: 'Full system access, model retraining, RBAC management, audit log inspection' },
    { role: 'Chief Land Acquisition Officer', permissions: 'National & state project oversight, intervention deployment, SLA override' },
    { role: 'State Administrator', permissions: 'State-level project management, district officer assignments' },
    { role: 'District Officer', permissions: 'District land parcel survey updates, mutation status management' },
    { role: 'Project Manager', permissions: 'Assigned project timeline updates, compensation status reporting' },
    { role: 'Analyst', permissions: 'XAI model metrics view, SHAP feature importance analysis, export report generation' },
    { role: 'Viewer', permissions: 'Read-only dashboard view across national and state corridors' },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Lock className="w-6 h-6 text-blue-600" />
            Security, RBAC & Audit Trail
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Role-based access matrix, active session control, and immutable audit logs.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-blue-50 text-blue-900 border border-blue-200 px-3 py-1.5 rounded text-xs font-semibold">
          <UserCheck className="w-4 h-4 text-blue-600" />
          <span>Active Role: {currentUserRole}</span>
        </div>
      </div>

      <div className="gov-card p-6 rounded-lg bg-white border border-slate-200 space-y-3">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <KeyRound className="w-5 h-5 text-blue-600" />
          7-Tier Role-Based Access Control (RBAC) Matrix
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
          {rolesPermissions.map((r) => (
            <div
              key={r.role}
              className={`p-3 rounded-lg border ${
                currentUserRole === r.role
                  ? 'bg-blue-50 border-blue-400 ring-1 ring-blue-400/40'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="font-bold text-slate-900 flex items-center justify-between mb-1">
                <span>{r.role}</span>
                {currentUserRole === r.role && (
                  <span className="text-[10px] bg-blue-600 text-white font-bold px-1.5 py-0.5 rounded">Active</span>
                )}
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">{r.permissions}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="gov-card p-6 rounded-lg bg-white border border-slate-200 space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <History className="w-5 h-5 text-blue-600" />
          Immutable System Audit Log
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-3">Audit ID</th>
                <th className="py-2.5 px-3">User</th>
                <th className="py-2.5 px-3">Role</th>
                <th className="py-2.5 px-3">Action</th>
                <th className="py-2.5 px-3">Project</th>
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Previous / New Value</th>
                <th className="py-2.5 px-3 font-mono">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-mono font-bold text-blue-700 whitespace-nowrap">{log.id}</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900 whitespace-nowrap">{log.user}</td>
                  <td className="py-2.5 px-3 text-slate-600 whitespace-nowrap">{log.role}</td>
                  <td className="py-2.5 px-3 font-bold text-slate-800 whitespace-nowrap">{log.action}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-700 whitespace-nowrap">{log.projectId}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-500 text-[11px] whitespace-nowrap">{log.timestamp}</td>
                  <td className="py-2.5 px-3 text-slate-700 max-w-xs truncate" title={`${log.previousValue} → ${log.newValue}`}>
                    <span className="text-slate-400 line-through mr-1">{log.previousValue}</span>
                    <span className="font-bold text-emerald-700">→ {log.newValue}</span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-500 text-[11px] whitespace-nowrap">{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
