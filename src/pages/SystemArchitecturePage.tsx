import React from 'react';
import { Network, ArrowDown, Layers, CheckCircle2 } from 'lucide-react';

export const SystemArchitecturePage: React.FC = () => {
  const techStack = [
    { component: 'Frontend', tech: 'React.js + TypeScript', purpose: 'Interactive enterprise web application' },
    { component: 'UI Framework', tech: 'Tailwind CSS', purpose: 'Responsive GovTech UI design system' },
    { component: 'UI Components', tech: 'shadcn/ui / Lucide', purpose: 'Consistent reusable visual elements' },
    { component: 'Charts', tech: 'Recharts / Apache ECharts', purpose: 'Analytics visualizations and XAI plots' },
    { component: 'GIS', tech: 'MapLibre GL JS / Leaflet', purpose: 'Interactive map visualization & GIS layers' },
    { component: 'Backend API', tech: 'FastAPI (Python)', purpose: 'High-performance REST APIs' },
    { component: 'ML Language', tech: 'Python 3.11', purpose: 'Machine learning, feature engineering and analytics' },
    { component: 'ML Algorithms', tech: 'XGBoost / Random Forest', purpose: 'Delay classification and risk scoring' },
    { component: 'Survival Analysis', tech: 'Cox Proportional Hazards', purpose: 'Time-to-event / delay duration estimation' },
    { component: 'Explainable AI', tech: 'SHAP', purpose: 'Feature attribution and explainability' },
    { component: 'Database', tech: 'PostgreSQL', purpose: 'Structured project and statutory data' },
    { component: 'Spatial Database', tech: 'PostGIS', purpose: 'GIS spatial queries and corridor bounding' },
    { component: 'Authentication', tech: 'JWT / OAuth2', purpose: 'Secure state/national SSO authentication' },
    { component: 'Authorization', tech: 'RBAC', purpose: 'Role-based access control (7 roles)' },
    { component: 'Data Processing', tech: 'Pandas + NumPy', purpose: 'Data cleaning and transformation' },
    { component: 'API Documentation', tech: 'OpenAPI / Swagger', purpose: 'Automated REST API integration docs' },
    { component: 'Notifications', tech: 'WebSockets / Email Service', purpose: 'Real-time alert dispatch' },
    { component: 'Model Tracking', tech: 'MLflow', purpose: 'Model versioning and experiment tracking' },
    { component: 'Deployment', tech: 'Docker', purpose: 'Containerized microservices' },
    { component: 'Reverse Proxy', tech: 'Nginx', purpose: 'API gateway routing and TLS termination' },
    { component: 'Cloud Infrastructure', tech: 'NIC Cloud / AWS / GCP', purpose: 'Enterprise production hosting' },
    { component: 'Audit Logging', tech: 'PostgreSQL / ELK Stack', purpose: 'Security and immutable activity auditing' },
  ];

  const architectureLayers = [
    { title: '1. Government Existing Systems', detail: 'State Revenue Portals, Bhoomi Land Records, National Highway Portal', color: 'bg-slate-800 text-white' },
    { title: '2. Enterprise API Gateway', detail: 'Nginx Proxy, Rate Limiting, JWT Auth & TLS Encryption', color: 'bg-blue-900 text-blue-100' },
    { title: '3. Data Ingestion & Preprocessing', detail: 'Pandas Pipeline, PostGIS Geometry Validator, Error Cleaner', color: 'bg-indigo-900 text-indigo-100' },
    { title: '4. Central Database Layer', detail: 'PostgreSQL 16 + PostGIS Spatial Extensions', color: 'bg-slate-900 text-slate-100' },
    { title: '5. Feature Engineering Engine', detail: '48 Cadastral, Statutory, Legal & Financial Feature Extractors', color: 'bg-slate-800 text-slate-100' },
    { title: '6. ML Prediction & XAI Engine', detail: 'XGBoost Delay Classifier + Cox Survival + SHAP Explainer', color: 'bg-blue-600 text-white' },
    { title: '7. Prescriptive Recommendation Engine', detail: 'Rule-based SLA Escalation & Impact Estimator (-25 to -40 Days)', color: 'bg-emerald-700 text-white' },
    { title: '8. Executive Intelligence UI', detail: 'Dashboard, GIS Map, Risk Profiler, Interventions, Alerts', color: 'bg-slate-950 text-white' },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Network className="w-6 h-6 text-blue-600" />
            Bhoomi-Predict System Architecture
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            End-to-end data flow, microservices architecture, and suggested component-wise technology stack.
          </p>
        </div>
      </div>

      <div className="gov-card p-6 rounded-lg bg-white border border-slate-200 space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-600" />
          End-to-End Enterprise System Architecture Flow
        </h3>

        <div className="max-w-xl mx-auto space-y-2 py-4">
          {architectureLayers.map((layer, index) => (
            <React.Fragment key={layer.title}>
              <div className={`p-3.5 rounded-lg font-mono text-xs shadow-xs border border-slate-700/40 ${layer.color} flex items-center justify-between`}>
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

      <div className="gov-card p-6 rounded-lg bg-white border border-slate-200">
        <h3 className="text-base font-bold text-slate-900 mb-1">
          Suggested Components-wise Technology Stack
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Complete production tech stack reference for government implementation.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-3">Component</th>
                <th className="py-2.5 px-3">Suggested Technology</th>
                <th className="py-2.5 px-3">Platform Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
              {techStack.map((item) => (
                <tr key={item.component} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-bold text-slate-900 whitespace-nowrap">{item.component}</td>
                  <td className="py-2.5 px-3 font-mono text-blue-700 font-semibold whitespace-nowrap">{item.tech}</td>
                  <td className="py-2.5 px-3 text-slate-600">{item.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
