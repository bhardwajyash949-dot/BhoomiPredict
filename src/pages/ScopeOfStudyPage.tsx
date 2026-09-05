import React from 'react';
import { FileText, CheckCircle2 } from 'lucide-react';

export const ScopeOfStudyPage: React.FC = () => {
  const scopeRows = [
    { area: 'Land Acquisition Projects', desc: 'Monitor national and state-level land acquisition projects across multiple infrastructure sectors.' },
    { area: 'Historical Data Analysis', desc: 'Analyze completed and ongoing acquisition cases to identify patterns associated with delays.' },
    { area: 'Predictive Analytics', desc: 'Predict whether a project is likely to experience delay and estimate delay probability.' },
    { area: 'Risk Scoring', desc: 'Generate project-wise risk scores based on multiple project parameters.' },
    { area: 'Delay Stage Prediction', desc: 'Predict risks at stages such as notification, approval, compensation, R&R, legal resolution, and possession.' },
    { area: 'Delay Driver Identification', desc: 'Identify major factors contributing to the predicted delay.' },
    { area: 'Explainable AI', desc: 'Explain why a project has received a particular risk score using feature importance / SHAP-style explanations.' },
    { area: 'GIS Analysis', desc: 'Visualize projects, high-risk corridors, districts, and states on an interactive map.' },
    { area: 'Dashboard & Monitoring', desc: 'Provide real-time executive dashboards for policymakers and administrators.' },
    { area: 'Recommendation Engine', desc: 'Suggest corrective actions based on detected risk factors.' },
    { area: 'Alerts & Notifications', desc: 'Automatically highlight or notify stakeholders about critical-risk projects.' },
    { area: 'Continuous Learning', desc: 'Update prediction models as new project data becomes available.' },
    { area: 'API Integration', desc: 'Provide APIs for integration with existing land acquisition management systems and government databases.' },
    { area: 'Security', desc: 'Implement role-based access, authentication, authorization, and audit trails.' },
    { area: 'Decision Support', desc: 'Enable administrators to prioritize interventions and optimize resources.' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            Scope of Study Specification
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Structured functional and operational scope of the Bhoomi-Predict Platform.
          </p>
        </div>
      </div>

      {/* Structured Table */}
      <div className="gov-card p-6 rounded-lg bg-white border border-slate-200 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900 text-white font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4 w-1/4">Scope Area</th>
                <th className="py-3 px-4">Description & Functional Requirements</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800 font-medium">
              {scopeRows.map((row) => (
                <tr key={row.area} className="hover:bg-blue-50/40 transition">
                  <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2 whitespace-nowrap">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{row.area}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 leading-relaxed">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
