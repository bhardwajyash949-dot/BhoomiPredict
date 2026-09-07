export type RiskCategory = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export type UserRole =
  | 'Super Administrator'
  | 'Chief Land Acquisition Officer'
  | 'State Administrator'
  | 'District Officer'
  | 'Project Manager'
  | 'Analyst'
  | 'Viewer';

export type InfrastructureSector =
  | 'Highways & Expressways'
  | 'Railways & Dedicated Freight'
  | 'Ports & Maritime'
  | 'Renewable Energy & Solar'
  | 'Industrial Corridors'
  | 'Urban Infrastructure'
  | 'Water Resources & Irrigation';

export type AcquisitionStage =
  | 'Preliminary Notification (Sec 4/11)'
  | 'Survey & Boundary Marking'
  | 'Valuation & Assessment'
  | 'Administrative Approval'
  | 'Compensation Declaration'
  | 'Compensation Disbursement'
  | 'Legal Dispute Resolution'
  | 'Rehabilitation & Resettlement (R&R)'
  | 'Physical Possession'
  | 'Final Acquisition Closure';

export interface PrimaryDriverAttribution {
  driver: string;
  percentage: number;
  impactScore: number;
  description: string;
}

export interface LandAcquisitionProject {
  id: string;
  name: string;
  sector: InfrastructureSector;
  state: string;
  district: string;
  corridor: string;
  landAreaHa: number;
  affectedParcels: number;
  affectedFamilies: number;
  
  // Risk & Delay Metrics
  riskScore: number; // 0 - 100
  riskCategory: RiskCategory;
  delayProbability: number; // 0 - 100%
  predictedDelayMonths: number;
  statutoryTimelineMonths: number;
  aiPredictedTimelineMonths: number;
  currentStage: AcquisitionStage;
  stageProgressPercent: number;
  
  // Parameter Statuses
  legalDisputesCount: number;
  courtCaseStatus: 'Clear' | 'Pending Sub-Court' | 'High Court Stay' | 'Supreme Court Appeal';
  litigationDurationMonths: number;
  approvalStatus: 'Approved' | 'Pending Clearance' | 'Rejected' | 'In Review';
  pendingApprovalsCount: number;
  compensationStatus: 'Fully Disbursed' | 'Partially Disbursed' | 'Assessment Pending' | 'Escrow Lock';
  compensationApprovedCr: number;
  compensationDisbursedCr: number;
  dbtStatus: 'Active DBT' | 'Manual Payment' | 'Verification Pending';
  rnrProgressPercent: number;
  rnrCompensationCr: number;
  environmentalClearance: 'Cleared' | 'Forest Stage-1 Pending' | 'CRZ Review' | 'Not Required';
  stakeholderResponsivenessScore: number; // 1-10
  
  // Drivers & Actions
  primaryDriver: string;
  driverAttribution: PrimaryDriverAttribution[];
  recommendedAction: string;
  status: 'On Track' | 'At Risk' | 'Delayed' | 'Critical Bottleneck';
  
  // Coordinates for GIS
  lat: number;
  lng: number;
  lastUpdated: string;
}

export interface StateDelayMatrixItem {
  state: string;
  corridor: string;
  projectsCount: number;
  statutoryMonths: number;
  aiPredictedMonths: number;
  aiLagMonths: number;
  riskCategory: RiskCategory;
  litigationExposurePercent: number;
  compensationDisbursedPercent: number;
  titleMutationBacklogPercent: number;
}

export interface PrimaryDelayDriverSummary {
  name: string;
  percentage: number;
  color: string;
  detail: string;
}

export interface Intervention {
  id: string;
  projectId: string;
  projectName: string;
  state: string;
  district: string;
  issue: string;
  recommendation: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  assignedDepartment: string;
  assignedOfficer: string;
  targetDate: string;
  expectedDelayReductionDays: number;
  status: 'Pending' | 'In Progress' | 'Resolved' | 'Escalated';
  createdAt: string;
  notes?: string;
}

export interface CriticalAlert {
  id: string;
  projectId: string;
  projectName: string;
  state: string;
  district: string;
  alertType: 'Delay Escalation' | 'Legal Dispute' | 'Compensation SLA Breach' | 'R&R Milestone Missed';
  riskScoreDelta: number;
  previousProb: number;
  currentProb: number;
  primaryDriver: string;
  recommendedAction: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  timestamp: string;
  isRead: boolean;
}

export interface ModelPerformanceMetrics {
  version: string;
  status: 'ACTIVE' | 'RETRAINING' | 'DEPRECATED';
  lastTrainedDate: string;
  trainingRecordsCount: number;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  rocAuc: number;
  confidenceIndex: number;
  algorithm: string;
  modelDrift: number;
  featuresUsed: number;
}

export interface AuditLogItem {
  id: string;
  user: string;
  role: UserRole;
  action: string;
  projectId: string;
  projectName: string;
  timestamp: string;
  previousValue: string;
  newValue: string;
  ipAddress: string;
}

export interface GlobalFilterState {
  state: string;
  district: string;
  sector: string;
  riskCategory: string;
  financialYear: string;
  searchQuery: string;
}

export interface PredictiveDriverAttribution {
  driver: string;
  percentage: number;
  raw_shap?: number;
}

export interface RecommendedActionItem {
  trigger: string;
  action: string;
  metric: string;
  priority: string;
}

export interface PredictiveAnalyticsResult {
  projectId: string;
  projectName: string;
  state: string;
  district: string;
  sector: string;
  delayProbability: number;
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW' | 'CRITICAL';
  expectedDelay: string;
  expectedDelayMonths: number;
  metricsData: {
    legalDisputes: number;
    compensationPaidPct: number;
    compensationPendingPct: number;
    pendingApprovals: number;
    rehabilitationProgressPct: number;
    landAreaHa: number;
  };
  topDelayDrivers: PredictiveDriverAttribution[];
  recommendedActions: RecommendedActionItem[];
}

