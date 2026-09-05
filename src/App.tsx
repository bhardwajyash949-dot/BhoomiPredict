import { useState, useEffect } from 'react';
import { Sidebar, type NavItemKey } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { ExecutiveDashboard } from './pages/ExecutiveDashboard';
import { RiskAnalyticsPage } from './pages/RiskAnalyticsPage';
import { GisMapView } from './pages/GisMapView';
import { ProjectPortfolioPage } from './pages/ProjectPortfolioPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { InterventionsPage } from './pages/InterventionsPage';
import { ModelIntelligencePage } from './pages/ModelIntelligencePage';
import { SystemArchitecturePage } from './pages/SystemArchitecturePage';
import { ScopeOfStudyPage } from './pages/ScopeOfStudyPage';
import { AlertsPage } from './pages/AlertsPage';
import { SettingsAuditPage } from './pages/SettingsAuditPage';

import type {
  LandAcquisitionProject,
  StateDelayMatrixItem,
  PrimaryDelayDriverSummary,
  Intervention,
  CriticalAlert,
  ModelPerformanceMetrics,
  AuditLogItem,
  GlobalFilterState,
  UserRole,
} from './types';
import { apiService } from './services/api';

export function App() {
  const [activeTab, setActiveTab] = useState<NavItemKey>('dashboard');
  const [userRole, setUserRole] = useState<UserRole>('Super Administrator');
  
  const [filters, setFilters] = useState<GlobalFilterState>({
    state: 'ALL',
    district: 'ALL',
    sector: 'ALL',
    riskCategory: 'ALL',
    financialYear: '2026-27',
    searchQuery: '',
  });

  const [projects, setProjects] = useState<LandAcquisitionProject[]>([]);
  const [matrixData, setMatrixData] = useState<StateDelayMatrixItem[]>([]);
  const [delayDrivers, setDelayDrivers] = useState<PrimaryDelayDriverSummary[]>([]);
  const [interventions, setInterventions] = useState<Intervention[]>([]);
  const [alerts, setAlerts] = useState<CriticalAlert[]>([]);
  const [modelMetrics, setModelMetrics] = useState<ModelPerformanceMetrics | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([]);
  const [selectedProject, setSelectedProject] = useState<LandAcquisitionProject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [projList, matrix, drivers, interv, altList, metrics, logs] = await Promise.all([
        apiService.getProjects(),
        apiService.getStateDelayMatrix(),
        apiService.getPrimaryDelayDrivers(),
        apiService.getInterventions(),
        apiService.getAlerts(),
        apiService.getModelMetrics(),
        apiService.getAuditLogs(),
      ]);

      setProjects(projList);
      setMatrixData(matrix);
      setDelayDrivers(drivers);
      setInterventions(interv);
      setAlerts(altList);
      setModelMetrics(metrics);
      setAuditLogs(logs);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleFilterChange = (partial: Partial<GlobalFilterState>) => {
    setFilters((prev) => ({ ...prev, ...partial }));
  };

  const handleSelectProject = (project: LandAcquisitionProject) => {
    setSelectedProject(project);
  };

  const handleAddIntervention = async (newIntervention: Omit<Intervention, 'id' | 'createdAt'>) => {
    const created = await apiService.addIntervention(newIntervention);
    setInterventions((prev) => [created, ...prev]);
    const logs = await apiService.getAuditLogs();
    setAuditLogs(logs);
  };

  const handleUpdateInterventionStatus = async (id: string, status: Intervention['status'], notes?: string) => {
    await apiService.updateInterventionStatus(id, status, notes);
    const updated = await apiService.getInterventions();
    setInterventions(updated);
    const logs = await apiService.getAuditLogs();
    setAuditLogs(logs);
  };

  const handleMarkAlertRead = async (id: string) => {
    await apiService.markAlertAsRead(id);
    const updated = await apiService.getAlerts();
    setAlerts(updated);
  };

  const filteredProjects = apiService.filterProjectsList(projects, filters);
  const unreadAlertsCount = alerts.filter((a) => !a.isRead).length;

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      <Sidebar
        activeTab={activeTab}
        onTabChange={(key) => {
          setActiveTab(key);
          if (key !== 'portfolio') setSelectedProject(null);
        }}
        userRole={userRole}
        unreadAlertsCount={unreadAlertsCount}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          filters={filters}
          onFilterChange={handleFilterChange}
          userRole={userRole}
          onRoleChange={setUserRole}
          unreadAlertsCount={unreadAlertsCount}
          onOpenAlerts={() => setActiveTab('alerts')}
        />

        <main className="flex-1 overflow-y-auto px-6 py-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 text-slate-500 text-xs">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
              <span>Initializing Bhoomi-Predict Intelligence Engine...</span>
            </div>
          ) : selectedProject ? (
            <ProjectDetailPage
              project={selectedProject}
              onBack={() => setSelectedProject(null)}
              onNavigateToInterventions={() => {
                setSelectedProject(null);
                setActiveTab('interventions');
              }}
            />
          ) : (
            <>
              {activeTab === 'dashboard' && (
                <ExecutiveDashboard
                  projects={filteredProjects}
                  matrixData={matrixData}
                  delayDrivers={delayDrivers}
                  onSelectProject={handleSelectProject}
                  onNavigateToRiskAnalytics={() => setActiveTab('risk-analytics')}
                />
              )}

              {activeTab === 'risk-analytics' && (
                <RiskAnalyticsPage
                  projects={filteredProjects}
                  onSelectProject={handleSelectProject}
                />
              )}

              {activeTab === 'gis-map' && (
                <GisMapView
                  projects={filteredProjects}
                  onSelectProject={handleSelectProject}
                  selectedState={filters.state}
                />
              )}

              {activeTab === 'portfolio' && (
                <ProjectPortfolioPage
                  projects={filteredProjects}
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onSelectProject={handleSelectProject}
                />
              )}

              {activeTab === 'interventions' && (
                <InterventionsPage
                  interventions={interventions}
                  projects={projects}
                  onAddIntervention={handleAddIntervention}
                  onUpdateStatus={handleUpdateInterventionStatus}
                />
              )}

              {activeTab === 'model-intelligence' && modelMetrics && (
                <ModelIntelligencePage metrics={modelMetrics} />
              )}

              {activeTab === 'architecture' && <SystemArchitecturePage />}

              {activeTab === 'scope' && <ScopeOfStudyPage />}

              {activeTab === 'alerts' && (
                <AlertsPage
                  alerts={alerts}
                  onMarkRead={handleMarkAlertRead}
                  onSelectProject={(projId) => {
                    const p = projects.find((item) => item.id === projId);
                    if (p) setSelectedProject(p);
                  }}
                />
              )}

              {activeTab === 'security' && (
                <SettingsAuditPage auditLogs={auditLogs} currentUserRole={userRole} />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
