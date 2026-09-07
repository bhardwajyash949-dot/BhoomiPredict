import React from 'react';
import { FileText, CheckCircle2 } from 'lucide-react';

export const ScopeOfStudyPage: React.FC = () => {
  const scopeRows = [
    { area: 'Land Acquisition Projects', desc: 'Monitor national and state-level land acquisition projects across infrastructure sectors.' },
    { area: 'Historical Data Analysis', desc: 'Analyze completed and ongoing acquisition cases to identify delay patterns.' },
    { area: 'Predictive Analytics', desc: 'Predict project delay risk and estimate probability.' },
    { area: 'Risk Scoring', desc: 'Generate project-wise risk scores based on multiple parameters.' },
    { area: 'Delay Stage Prediction', desc: 'Predict risks across notification, approval, compensation, R&R, legal, and possession stages.' },
    { area: 'Delay Driver Identification', desc: 'Identify major factors contributing to predicted delays.' },
    { area: 'Explainable AI', desc: 'Provide feature importance / SHAP-style explanations for risk scores.' },
    { area: 'GIS Analysis', desc: 'Visualize projects, corridors, and districts on an interactive spatial map.' },
    { area: 'Dashboard & Monitoring', desc: 'Provide real-time executive dashboards for stakeholders.' },
    { area: 'Recommendation Engine', desc: 'Suggest corrective actions based on detected risk factors.' },
    { area: 'Alerts & Notifications', desc: 'Notify stakeholders about critical-risk projects.' },
    { area: 'Continuous Learning', desc: 'Update prediction models as new project data becomes available.' },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 tracking-tight">
            <FileText className="w-6 h-6 text-blue-600" />
            Scope of Study
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Structured functional scope of the Sanket Gati Platform.
          </p>
        </div>
      </div>

      <div className="clean-card p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px] bg-slate-50/50">
                <th className="py-3 px-4 w-1/4">Scope Area</th>
                <th className="py-3 px-4">Functional Requirements</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {scopeRows.map((row) => (
                <tr key={row.area} className="hover:bg-slate-50 transition">
                  <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2.5 whitespace-nowrap">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{row.area}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 leading-relaxed">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
