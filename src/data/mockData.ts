import type {
  LandAcquisitionProject,
  StateDelayMatrixItem,
  PrimaryDelayDriverSummary,
  Intervention,
  CriticalAlert,
  ModelPerformanceMetrics,
  AuditLogItem,
} from '../types';

export const mockStateDelayMatrix: StateDelayMatrixItem[] = [
  {
    state: 'Maharashtra',
    corridor: 'Mumbai-Nagpur Samruddhi Corridor & DMIC',
    projectsCount: 24,
    statutoryMonths: 18,
    aiPredictedMonths: 29.4,
    aiLagMonths: 11.4,
    riskCategory: 'HIGH',
    litigationExposurePercent: 28.5,
    compensationDisbursedPercent: 68.2,
    titleMutationBacklogPercent: 61.0,
  },
  {
    state: 'Gujarat',
    corridor: 'Delhi-Mumbai Expressway & Dholera SIR',
    projectsCount: 18,
    statutoryMonths: 14,
    aiPredictedMonths: 16.1,
    aiLagMonths: 2.1,
    riskCategory: 'MEDIUM',
    litigationExposurePercent: 12.4,
    compensationDisbursedPercent: 88.5,
    titleMutationBacklogPercent: 22.1,
  },
  {
    state: 'Karnataka',
    corridor: 'Bengaluru-Chennai Industrial Corridor',
    projectsCount: 16,
    statutoryMonths: 16,
    aiPredictedMonths: 22.8,
    aiLagMonths: 6.8,
    riskCategory: 'HIGH',
    litigationExposurePercent: 24.1,
    compensationDisbursedPercent: 74.0,
    titleMutationBacklogPercent: 44.5,
  },
  {
    state: 'Uttar Pradesh',
    corridor: 'Ganga Expressway & Defense Corridor',
    projectsCount: 26,
    statutoryMonths: 20,
    aiPredictedMonths: 29.2,
    aiLagMonths: 9.2,
    riskCategory: 'HIGH',
    litigationExposurePercent: 31.0,
    compensationDisbursedPercent: 71.8,
    titleMutationBacklogPercent: 52.3,
  },
  {
    state: 'Tamil Nadu',
    corridor: 'Chennai-Kanyakumari Industrial Highway',
    projectsCount: 15,
    statutoryMonths: 15,
    aiPredictedMonths: 18.5,
    aiLagMonths: 3.5,
    riskCategory: 'MEDIUM',
    litigationExposurePercent: 18.2,
    compensationDisbursedPercent: 82.1,
    titleMutationBacklogPercent: 31.8,
  },
  {
    state: 'Rajasthan',
    corridor: 'Amritsar-Jamnagar Economic Corridor',
    projectsCount: 12,
    statutoryMonths: 16,
    aiPredictedMonths: 17.8,
    aiLagMonths: 1.8,
    riskCategory: 'LOW',
    litigationExposurePercent: 9.8,
    compensationDisbursedPercent: 91.2,
    titleMutationBacklogPercent: 15.4,
  },
  {
    state: 'Telangana',
    corridor: 'Hyderabad Regional Ring Road',
    projectsCount: 11,
    statutoryMonths: 18,
    aiPredictedMonths: 26.5,
    aiLagMonths: 8.5,
    riskCategory: 'CRITICAL',
    litigationExposurePercent: 36.4,
    compensationDisbursedPercent: 61.5,
    titleMutationBacklogPercent: 58.9,
  },
];

export const mockPrimaryDelayDrivers: PrimaryDelayDriverSummary[] = [
  {
    name: 'Legal & Court Litigation',
    percentage: 34,
    color: '#EF4444',
    detail: 'High Court stays, ownership disputes, and compensation enhancement petitions.',
  },
  {
    name: 'Land Titling & Mutation',
    percentage: 26,
    color: '#F97316',
    detail: 'Incomplete ancestral title records, mutation backlogs, and unregistered heirs.',
  },
  {
    name: 'R&R Compensation & Resettlement',
    percentage: 22,
    color: '#F59E0B',
    detail: 'Family identification disputes, alternative land allocation SLA delays.',
  },
  {
    name: 'Environmental & Forest Clearance',
    percentage: 18,
    color: '#3B82F6',
    detail: 'Stage-1 Statutory forestry permissions and CRZ clearance bottlenecks.',
  },
];

const statesAndDistricts: Record<string, { districts: string[]; lat: number; lng: number }> = {
  Maharashtra: { districts: ['Thane', 'Nashik', 'Pune', 'Nagpur', 'Aurangabad', 'Solapur'], lat: 19.7515, lng: 75.7139 },
  Gujarat: { districts: ['Ahmedabad', 'Surat', 'Vadodara', 'Bharuch', 'Kheda', 'Mehsana'], lat: 22.2587, lng: 71.1924 },
  Karnataka: { districts: ['Bengaluru Rural', 'Ramanagara', 'Tumakuru', 'Mysuru', 'Belagavi'], lat: 15.3173, lng: 75.7139 },
  'Uttar Pradesh': { districts: ['Gautam Buddha Nagar', 'Agra', 'Kanpur', 'Prayagraj', 'Varanasi', 'Gorakhpur'], lat: 26.8467, lng: 80.9462 },
  'Tamil Nadu': { districts: ['Kanchipuram', 'Tiruvallur', 'Coimbatore', 'Madurai', 'Salem'], lat: 11.1271, lng: 78.6569 },
  Rajasthan: { districts: ['Jaipur', 'Alwar', 'Jodhpur', 'Bikaner', 'Udaipur'], lat: 27.0238, lng: 74.2179 },
  'Madhya Pradesh': { districts: ['Indore', 'Bhopal', 'Gwalior', 'Jabalpur', 'Ujjain'], lat: 22.9734, lng: 78.6569 },
  Telangana: { districts: ['Medak', 'Rangareddy', 'Sangareddy', 'Nalgonda', 'Warangal'], lat: 18.1124, lng: 79.0193 },
  'Andhra Pradesh': { districts: ['Visakhapatnam', 'Krishna', 'Guntur', 'Nellore', 'Kurnool'], lat: 15.9129, lng: 79.7400 },
  Haryana: { districts: ['Gurugram', 'Faridabad', 'Sonipat', 'Panipat', 'Ambala'], lat: 29.0588, lng: 76.0856 },
};

const sectorsList = [
  'Highways & Expressways',
  'Railways & Dedicated Freight',
  'Ports & Maritime',
  'Renewable Energy & Solar',
  'Industrial Corridors',
  'Urban Infrastructure',
  'Water Resources & Irrigation',
] as const;

const stagesList = [
  'Preliminary Notification (Sec 4/11)',
  'Survey & Boundary Marking',
  'Valuation & Assessment',
  'Administrative Approval',
  'Compensation Declaration',
  'Compensation Disbursement',
  'Legal Dispute Resolution',
  'Rehabilitation & Resettlement (R&R)',
  'Physical Possession',
  'Final Acquisition Closure',
] as const;

export const mockProjects: LandAcquisitionProject[] = Array.from({ length: 100 }).map((_, index) => {
  const stateKeys = Object.keys(statesAndDistricts);
  const state = stateKeys[index % stateKeys.length];
  const stateData = statesAndDistricts[state];
  const district = stateData.districts[index % stateData.districts.length];
  const sector = sectorsList[index % sectorsList.length];
  
  const idNum = (1001 + index).toString();
  const id = `LA-2026-${idNum}`;
  
  const seed = (index * 37 + 13) % 100;
  let riskCategory: LandAcquisitionProject['riskCategory'] = 'LOW';
  let riskScore = 20 + (seed % 35);
  
  if (seed > 75) {
    riskCategory = 'CRITICAL';
    riskScore = 81 + (seed % 19);
  } else if (seed > 50) {
    riskCategory = 'HIGH';
    riskScore = 61 + (seed % 20);
  } else if (seed > 25) {
    riskCategory = 'MEDIUM';
    riskScore = 31 + (seed % 30);
  }

  const delayProbability = Math.min(99.5, Math.max(12.0, parseFloat((riskScore * 0.94 + (index % 7)).toFixed(1))));
  const statutoryTimelineMonths = 12 + (index % 12);
  const predictedDelayMonths = parseFloat((riskScore * 0.15 + (index % 5) * 0.4).toFixed(1));
  const aiPredictedTimelineMonths = parseFloat((statutoryTimelineMonths + predictedDelayMonths).toFixed(1));

  const offsetLat = (seed % 20 - 10) * 0.15;
  const offsetLng = ((seed * 7) % 20 - 10) * 0.15;

  const currentStage = stagesList[index % stagesList.length];

  const primaryDrivers = [
    'Legal & Court Litigation',
    'Land Titling & Mutation',
    'R&R Compensation & Resettlement',
    'Environmental & Forest Clearance',
    'Administrative Approval SLA',
  ];
  const primaryDriver = primaryDrivers[index % primaryDrivers.length];

  const actions = [
    'Initiate district-level title verification and mutation reconciliation.',
    'Escalate unresolved High Court stay orders to Special Legal Cell.',
    'Expedite pending Forest Stage-1 statutory clearance with MoEFCC.',
    'Prioritize Direct Benefit Transfer (DBT) compensation disbursement.',
    'Convene inter-departmental SLA review meeting with District Collector.',
    'Conduct targeted village-level R&R grievance redressal drive.',
  ];

  return {
    id,
    name: `${state} ${sector.split(' ')[0]} Phase-${(index % 4) + 1} (${district} Corridor)`,
    sector,
    state,
    district,
    corridor: `${state} Package-${(index % 5) + 1}`,
    landAreaHa: 120 + (index * 45) % 1800,
    affectedParcels: 40 + (index * 32) % 450,
    affectedFamilies: 25 + (index * 28) % 380,
    
    riskScore,
    riskCategory,
    delayProbability,
    predictedDelayMonths,
    statutoryTimelineMonths,
    aiPredictedTimelineMonths,
    currentStage,
    stageProgressPercent: Math.min(100, Math.max(10, (index * 13) % 100)),
    
    legalDisputesCount: riskCategory === 'CRITICAL' ? 12 + (index % 8) : riskCategory === 'HIGH' ? 5 + (index % 4) : index % 3,
    courtCaseStatus: riskCategory === 'CRITICAL' ? 'High Court Stay' : riskCategory === 'HIGH' ? 'Pending Sub-Court' : 'Clear',
    litigationDurationMonths: riskCategory === 'CRITICAL' ? 18 + (index % 14) : (index % 6),
    approvalStatus: riskCategory === 'CRITICAL' ? 'Pending Clearance' : 'Approved',
    pendingApprovalsCount: riskCategory === 'CRITICAL' ? 4 : (index % 2),
    compensationStatus: riskCategory === 'CRITICAL' ? 'Escrow Lock' : riskCategory === 'HIGH' ? 'Partially Disbursed' : 'Fully Disbursed',
    compensationApprovedCr: parseFloat((150 + index * 12.5).toFixed(2)),
    compensationDisbursedCr: parseFloat(((150 + index * 12.5) * (riskCategory === 'CRITICAL' ? 0.42 : 0.85)).toFixed(2)),
    dbtStatus: riskCategory === 'CRITICAL' ? 'Verification Pending' : 'Active DBT',
    rnrProgressPercent: Math.max(15, 100 - riskScore),
    rnrCompensationCr: parseFloat((45 + index * 4.2).toFixed(2)),
    environmentalClearance: riskCategory === 'CRITICAL' ? 'Forest Stage-1 Pending' : 'Cleared',
    stakeholderResponsivenessScore: Math.max(2, Math.min(10, 10 - Math.floor(riskScore / 12))),
    
    primaryDriver,
    driverAttribution: [
      { driver: primaryDriver, percentage: 38, impactScore: 8.4, description: 'Major bottleneck slowing down physical possession.' },
      { driver: 'Land Titling & Mutation', percentage: 28, impactScore: 6.2, description: 'Multiple un-mutated survey numbers.' },
      { driver: 'Compensation Disbursement', percentage: 20, impactScore: 4.8, description: 'Bank account verification pending for 14 families.' },
      { driver: 'Inter-department SLA', percentage: 14, impactScore: 3.1, description: 'Response pending from Public Works Dept.' },
    ],
    recommendedAction: actions[index % actions.length],
    status: riskCategory === 'CRITICAL' ? 'Critical Bottleneck' : riskCategory === 'HIGH' ? 'At Risk' : riskCategory === 'MEDIUM' ? 'Delayed' : 'On Track',
    
    lat: stateData.lat + offsetLat,
    lng: stateData.lng + offsetLng,
    lastUpdated: '2026-09-04 14:30 IST',
  };
});

export const mockInterventions: Intervention[] = [
  {
    id: 'INT-2026-001',
    projectId: 'LA-2026-1004',
    projectName: 'Maharashtra Highways Phase-1 (Thane Corridor)',
    state: 'Maharashtra',
    district: 'Thane',
    issue: 'Unresolved High Court stay order regarding ancestral land share calculation.',
    recommendation: 'Escalate to Special Government Pleader & set up expedited Lok Adalat bench.',
    priority: 'CRITICAL',
    assignedDepartment: 'Revenue & Legal Cell',
    assignedOfficer: 'Shri S. K. Kulkarni (Addl Collector)',
    targetDate: '2026-09-25',
    expectedDelayReductionDays: 38,
    status: 'In Progress',
    createdAt: '2026-08-28',
    notes: 'District Magistrate convened preliminary hearing with advocate on record.',
  },
  {
    id: 'INT-2026-002',
    projectId: 'LA-2026-1011',
    projectName: 'Uttar Pradesh Industrial Phase-4 (Prayagraj Corridor)',
    state: 'Uttar Pradesh',
    district: 'Prayagraj',
    issue: 'Title mutation backlog across 84 survey numbers in Naini sub-division.',
    recommendation: 'Deploy dedicated Special Land Acquisition Officer (SLAO) mutation camp.',
    priority: 'HIGH',
    assignedDepartment: 'Land Records & Revenue',
    assignedOfficer: 'Shri R. P. Verma (SLAO)',
    targetDate: '2026-09-30',
    expectedDelayReductionDays: 28,
    status: 'Pending',
    createdAt: '2026-09-01',
  },
  {
    id: 'INT-2026-003',
    projectId: 'LA-2026-1008',
    projectName: 'Telangana Railways Phase-1 (Rangareddy Corridor)',
    state: 'Telangana',
    district: 'Rangareddy',
    issue: 'R&R housing plot allocation consent pending for 142 affected families.',
    recommendation: 'Initiate joint site inspection and issue provisional land allotment cards.',
    priority: 'CRITICAL',
    assignedDepartment: 'Rehabilitation & Resettlement',
    assignedOfficer: 'Smt. M. Anuradha (R&R Commissioner)',
    targetDate: '2026-09-18',
    expectedDelayReductionDays: 45,
    status: 'In Progress',
    createdAt: '2026-08-20',
    notes: 'First round of community consultation completed successfully.',
  },
  {
    id: 'INT-2026-004',
    projectId: 'LA-2026-1025',
    projectName: 'Karnataka Urban Infra Phase-2 (Tumakuru Corridor)',
    state: 'Karnataka',
    district: 'Tumakuru',
    issue: 'Forest Stage-1 permission pending with Regional Office MoEFCC.',
    recommendation: 'Submit revised tree enumeration survey and compensatory afforestation land proposal.',
    priority: 'MEDIUM',
    assignedDepartment: 'Forest & Environment Cell',
    assignedOfficer: 'Shri V. Rao (DFO)',
    targetDate: '2026-10-10',
    expectedDelayReductionDays: 22,
    status: 'Resolved',
    createdAt: '2026-08-10',
    notes: 'Compensatory land approved by State Nodal Officer.',
  },
];

export const mockAlerts: CriticalAlert[] = [
  {
    id: 'ALT-901',
    projectId: 'LA-2026-1004',
    projectName: 'Maharashtra Highways Phase-1 (Thane Corridor)',
    state: 'Maharashtra',
    district: 'Thane',
    alertType: 'Legal Dispute',
    riskScoreDelta: 18,
    previousProb: 62.4,
    currentProb: 88.2,
    primaryDriver: 'Legal & Court Litigation',
    recommendedAction: 'Escalate to Special Legal Cell for High Court stay vacation petition.',
    severity: 'CRITICAL',
    timestamp: '10 mins ago',
    isRead: false,
  },
  {
    id: 'ALT-902',
    projectId: 'LA-2026-1008',
    projectName: 'Telangana Railways Phase-1 (Rangareddy Corridor)',
    state: 'Telangana',
    district: 'Rangareddy',
    alertType: 'R&R Milestone Missed',
    riskScoreDelta: 14,
    previousProb: 71.0,
    currentProb: 85.0,
    primaryDriver: 'R&R Compensation & Resettlement',
    recommendedAction: 'Convene SLAO emergency review for plot possession handover.',
    severity: 'CRITICAL',
    timestamp: '1 hour ago',
    isRead: false,
  },
  {
    id: 'ALT-903',
    projectId: 'LA-2026-1015',
    projectName: 'Gujarat Solar Energy Phase-3 (Kheda Corridor)',
    state: 'Gujarat',
    district: 'Kheda',
    alertType: 'Compensation SLA Breach',
    riskScoreDelta: 9,
    previousProb: 44.0,
    currentProb: 53.0,
    primaryDriver: 'Compensation Disbursement',
    recommendedAction: 'Trigger DBT batch approval override with Treasury Department.',
    severity: 'HIGH',
    timestamp: '3 hours ago',
    isRead: true,
  },
];

export const mockModelMetrics: ModelPerformanceMetrics = {
  version: 'Predictive Engine v4.2-Prod',
  status: 'ACTIVE',
  lastTrainedDate: '2026-08-30 02:00 IST',
  trainingRecordsCount: 142850,
  accuracy: 0.938,
  precision: 0.912,
  recall: 0.945,
  f1Score: 0.928,
  rocAuc: 0.962,
  confidenceIndex: 94.6,
  algorithm: 'Gradient Boosted Trees (XGBoost) + Cox Proportional Hazards Survival Analysis',
  modelDrift: 0.012,
  featuresUsed: 48,
};

export const mockAuditLogs: AuditLogItem[] = [
  {
    id: 'AUD-8801',
    user: 'Rajesh Kumar, IAS',
    role: 'Chief Land Acquisition Officer',
    action: 'Intervention Assigned',
    projectId: 'LA-2026-1004',
    projectName: 'Maharashtra Highways Phase-1',
    timestamp: '2026-09-05 14:15:10',
    previousValue: 'Unassigned',
    newValue: 'Assigned to Shri S. K. Kulkarni (Addl Collector)',
    ipAddress: '10.204.14.82',
  },
  {
    id: 'AUD-8802',
    user: 'Dr. Anita Sharma',
    role: 'Analyst',
    action: 'Model Retraining Triggered',
    projectId: 'N/A',
    projectName: 'System Wide',
    timestamp: '2026-09-04 18:30:22',
    previousValue: 'Predictive Engine v4.1',
    newValue: 'Predictive Engine v4.2 deployed',
    ipAddress: '10.204.14.105',
  },
  {
    id: 'AUD-8803',
    user: 'Vikram Singh',
    role: 'State Administrator',
    action: 'Risk Score Threshold Updated',
    projectId: 'LA-2026-1008',
    projectName: 'Telangana Railways Phase-1',
    timestamp: '2026-09-04 11:20:45',
    previousValue: 'Critical Threshold: 85',
    newValue: 'Critical Threshold: 80',
    ipAddress: '10.204.18.44',
  },
];
