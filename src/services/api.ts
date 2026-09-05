import type {
  LandAcquisitionProject,
  StateDelayMatrixItem,
  PrimaryDelayDriverSummary,
  Intervention,
  CriticalAlert,
  ModelPerformanceMetrics,
  AuditLogItem,
  GlobalFilterState,
} from '../types';
import {
  mockProjects,
  mockStateDelayMatrix,
  mockPrimaryDelayDrivers,
  mockInterventions,
  mockAlerts,
  mockModelMetrics,
  mockAuditLogs,
} from '../data/mockData';

const BASE_URL = 'http://localhost:8000/api';

const localProjects: LandAcquisitionProject[] = [...mockProjects];
const localInterventions: Intervention[] = [...mockInterventions];
const localAlerts: CriticalAlert[] = [...mockAlerts];
const localAuditLogs: AuditLogItem[] = [...mockAuditLogs];

export const apiService = {
  async getProjects(filters?: GlobalFilterState): Promise<LandAcquisitionProject[]> {
    try {
      const response = await fetch(`${BASE_URL}/projects`);
      if (response.ok) {
        const data = await response.json();
        return this.filterProjectsList(data, filters);
      }
    } catch {
      // Backend unavailable, fallback to local dataset
    }
    return this.filterProjectsList(localProjects, filters);
  },

  filterProjectsList(projects: LandAcquisitionProject[], filters?: GlobalFilterState): LandAcquisitionProject[] {
    if (!filters) return projects;
    return projects.filter((p) => {
      if (filters.state && filters.state !== 'ALL' && p.state !== filters.state) return false;
      if (filters.district && filters.district !== 'ALL' && p.district !== filters.district) return false;
      if (filters.sector && filters.sector !== 'ALL' && p.sector !== filters.sector) return false;
      if (filters.riskCategory && filters.riskCategory !== 'ALL' && p.riskCategory !== filters.riskCategory) return false;
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesId = p.id.toLowerCase().includes(q);
        const matchesState = p.state.toLowerCase().includes(q);
        const matchesDistrict = p.district.toLowerCase().includes(q);
        if (!matchesName && !matchesId && !matchesState && !matchesDistrict) return false;
      }
      return true;
    });
  },

  async getProjectById(id: string): Promise<LandAcquisitionProject | undefined> {
    try {
      const response = await fetch(`${BASE_URL}/projects/${id}`);
      if (response.ok) return await response.json();
    } catch {
      // Fallback
    }
    return localProjects.find((p) => p.id === id);
  },

  async getStateDelayMatrix(): Promise<StateDelayMatrixItem[]> {
    try {
      const response = await fetch(`${BASE_URL}/dashboard/state-analysis`);
      if (response.ok) return await response.json();
    } catch {
      // Fallback
    }
    return mockStateDelayMatrix;
  },

  async getPrimaryDelayDrivers(): Promise<PrimaryDelayDriverSummary[]> {
    try {
      const response = await fetch(`${BASE_URL}/dashboard/delay-drivers`);
      if (response.ok) return await response.json();
    } catch {
      // Fallback
    }
    return mockPrimaryDelayDrivers;
  },

  async getInterventions(): Promise<Intervention[]> {
    try {
      const response = await fetch(`${BASE_URL}/interventions`);
      if (response.ok) return await response.json();
    } catch {
      // Fallback
    }
    return localInterventions;
  },

  async addIntervention(newIntervention: Omit<Intervention, 'id' | 'createdAt'>): Promise<Intervention> {
    const created: Intervention = {
      ...newIntervention,
      id: `INT-2026-${(localInterventions.length + 1).toString().padStart(3, '0')}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    try {
      const response = await fetch(`${BASE_URL}/interventions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(created),
      });
      if (response.ok) {
        const data = await response.json();
        localInterventions.unshift(data);
        return data;
      }
    } catch {
      // Fallback
    }
    localInterventions.unshift(created);

    localAuditLogs.unshift({
      id: `AUD-${Date.now()}`,
      user: 'Administrator (Logged In)',
      role: 'Super Administrator',
      action: 'Intervention Created',
      projectId: created.projectId,
      projectName: created.projectName,
      timestamp: new Date().toLocaleString(),
      previousValue: 'None',
      newValue: `Created intervention for ${created.issue}`,
      ipAddress: '127.0.0.1',
    });

    return created;
  },

  async updateInterventionStatus(id: string, status: Intervention['status'], notes?: string): Promise<Intervention | undefined> {
    const item = localInterventions.find((i) => i.id === id);
    if (item) {
      const prev = item.status;
      item.status = status;
      if (notes) item.notes = notes;

      localAuditLogs.unshift({
        id: `AUD-${Date.now()}`,
        user: 'Administrator (Logged In)',
        role: 'Super Administrator',
        action: 'Intervention Status Updated',
        projectId: item.projectId,
        projectName: item.projectName,
        timestamp: new Date().toLocaleString(),
        previousValue: `Status: ${prev}`,
        newValue: `Status: ${status}`,
        ipAddress: '127.0.0.1',
      });
    }
    return item;
  },

  async getAlerts(): Promise<CriticalAlert[]> {
    try {
      const response = await fetch(`${BASE_URL}/alerts`);
      if (response.ok) return await response.json();
    } catch {
      // Fallback
    }
    return localAlerts;
  },

  async markAlertAsRead(id: string): Promise<void> {
    const alert = localAlerts.find((a) => a.id === id);
    if (alert) alert.isRead = true;
  },

  async getModelMetrics(): Promise<ModelPerformanceMetrics> {
    try {
      const response = await fetch(`${BASE_URL}/models/metrics`);
      if (response.ok) return await response.json();
    } catch {
      // Fallback
    }
    return mockModelMetrics;
  },

  async getAuditLogs(): Promise<AuditLogItem[]> {
    try {
      const response = await fetch(`${BASE_URL}/audit-logs`);
      if (response.ok) return await response.json();
    } catch {
      // Fallback
    }
    return localAuditLogs;
  },
};
