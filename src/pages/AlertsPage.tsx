import React from 'react';
import type { CriticalAlert } from '../types';
import { Bell, ArrowRight, ShieldAlert } from 'lucide-react';

interface AlertsPageProps {
  alerts: CriticalAlert[];
  onMarkRead: (id: string) => void;
  onSelectProject: (projectId: string) => void;
}

export const AlertsPage: React.FC<AlertsPageProps> = ({ alerts, onMarkRead, onSelectProject }) => {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 tracking-tight">
            <Bell className="w-6 h-6 text-blue-600" />
            Alerts & Escalations
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Notifications for risk spikes, stay order filings, and SLA breaches.
          </p>
        </div>
      </div>

      <div className="space-y-3.5">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`clean-card p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition ${
              !alert.isRead ? 'bg-red-50/20 border-red-200/80 shadow-2xs' : ''
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`p-3 rounded-xl shrink-0 mt-0.5 ${
                  alert.severity === 'CRITICAL' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                }`}
              >
                <ShieldAlert className="w-5 h-5" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-xs font-bold text-red-700 uppercase bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200/80">
                    {alert.alertType}
                  </span>
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/80">
                    {alert.projectId}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">• {alert.timestamp}</span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm">{alert.projectName}</h3>
                <p className="text-xs text-slate-500 font-medium">{alert.state} • {alert.district}</p>

                <div className="mt-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-xs">
                  <span className="font-bold text-slate-900">Delay Probability Spike: </span>
                  <span className="text-red-600 font-bold">{alert.previousProb}% → {alert.currentProb}%</span>
                  <span className="ml-2.5 font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-full border border-red-200/80">
                    +{alert.riskScoreDelta} Risk Score
                  </span>
                  <p className="text-slate-600 mt-1 font-medium">Recommended: {alert.recommendedAction}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              {!alert.isRead && (
                <button
                  onClick={() => onMarkRead(alert.id)}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer transition"
                >
                  Mark Read
                </button>
              )}
              <button
                onClick={() => onSelectProject(alert.projectId)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-2xs cursor-pointer flex items-center gap-1 transition"
              >
                <span>Inspect</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
