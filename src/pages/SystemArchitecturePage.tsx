import React from 'react';
import { Network, ArrowDown, Layers, CheckCircle2 } from 'lucide-react';

export const SystemArchitecturePage: React.FC = () => {
  const techStack = [
    { component: 'Frontend', tech: 'React.js + TypeScript', purpose: 'Interactive web application' },
    { component: 'UI Framework', tech: 'Tailwind CSS', purpose: 'Responsive design system' },
    { component: 'UI Components', tech: 'Lucide Icons', purpose: 'Consistent reusable UI elements' },
    { component: 'Charts', tech: 'Recharts', purpose: 'Analytics visualizations and XAI plots' },
    { component: 'GIS', tech: 'Leaflet Map', purpose: 'Interactive spatial visualization' },
    { component: 'Backend API', tech: 'FastAPI (Python)', purpose: 'High-performance REST APIs' },
    { component: 'ML Language', tech: 'Python 3.11', purpose: 'Machine learning & feature engineering' },
    { component: 'ML Algorithms', tech: 'XGBoost / Random Forest', purpose: 'Delay classification & risk scoring' },
    { component: 'Survival Analysis', tech: 'Cox Proportional Hazards', purpose: 'Delay duration estimation' },
    { component: 'Explainable AI', tech: 'SHAP', purpose: 'Feature attribution & explainability' },
    { component: 'Database', tech: 'PostgreSQL', purpose: 'Structured project data' },
    { component: 'Spatial Database', tech: 'PostGIS', purpose: 'GIS spatial queries' },
    { component: 'Authentication', tech: 'JWT / OAuth2', purpose: 'Secure SSO authentication' },
    { component: 'Authorization', tech: 'RBAC', purpose: 'Role-based access control' },
  ];

  const architectureLayers = [
    { title: '1. Existing Revenue Systems', detail: 'State Revenue Portals & Bhoomi Land Records', color: 'bg-slate-900 text-white' },
    { title: '2. Enterprise API Gateway', detail: 'Nginx Proxy, Rate Limiting, JWT Auth', color: 'bg-blue-950 text-blue-100' },
    { title: '3. Data Ingestion Pipeline', detail: 'Pandas Pipeline, Geometry Validator', color: 'bg-indigo-950 text-indigo-100' },
    { title: '4. Central Database Layer', detail: 'PostgreSQL + PostGIS Spatial Extensions', color: 'bg-slate-900 text-slate-100' },
    { title: '5. Feature Engineering Engine', detail: '48 Cadastral, Legal & Financial Feature Extractors', color: 'bg-slate-800 text-slate-100' },
    { title: '6. ML Prediction & XAI Engine', detail: 'XGBoost Classifier + Cox Survival + SHAP', color: 'bg-blue-600 text-white' },
    { title: '7. Recommendation Engine', detail: 'SLA Escalation & Impact Estimator (-25 to -40 Days)', color: 'bg-emerald-700 text-white' },
    { title: '8. Executive UI', detail: 'Dashboard, GIS Map, Portfolio, Interventions, Alerts', color: 'bg-slate-950 text-white' },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 tracking-tight">
            <Network className="w-6 h-6 text-blue-600" />
            System Architecture
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            End-to-end data flow, microservices architecture, and component stack.
          </p>
        </div>
      </div>

      <div className="clean-card p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-600" />
          Enterprise System Flow
        </h3>

        <div className="max-w-xl mx-auto space-y-2 py-4">
          {architectureLayers.map((layer, index) => (
            <React.Fragment key={layer.title}>
              <div className={`p-4 rounded-xl font-medium text-xs border border-slate-700/40 ${layer.color} flex items-center justify-between`}>
                <div>
                  <span className="font-bold text-xs block">{layer.title}</span>
                  <span className="text-[11px] opacity-80">{layer.detail}</span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
              </div>
              {index < architectureLayers.length - 1 && (
                <div className="flex justify-center my-0.5">
                  <ArrowDown className="w-4 h-4 text-blue-600 animate-bounce" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="clean-card p-6">
        <h3 className="text-base font-bold text-slate-900 mb-1">
          Technology Stack
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Component reference for government implementation.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px] bg-slate-50/50">
                <th className="py-3 px-3.5">Component</th>
                <th className="py-3 px-3.5">Technology</th>
                <th className="py-3 px-3.5">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {techStack.map((item) => (
                <tr key={item.component} className="hover:bg-slate-50">
                  <td className="py-3 px-3.5 font-bold text-slate-900 whitespace-nowrap">{item.component}</td>
                  <td className="py-3 px-3.5 font-bold text-blue-600 whitespace-nowrap">{item.tech}</td>
                  <td className="py-3 px-3.5 text-slate-600">{item.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
