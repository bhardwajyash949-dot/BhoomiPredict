import type { LandAcquisitionProject, InfrastructureSector, RiskCategory, AcquisitionStage } from '../types';

export interface RawCsvRow {
  project_id: string;
  project_name: string;
  state: string;
  district: string;
  sector: string;
  legal_disputes: string;
  compensation_paid_pct: string;
  pending_approvals: string;
  rehabilitation_progress_pct: string;
  land_area_ha: string;
  is_delayed: string;
  delay_months: string;
}

export function parseCsvText(csvText: string): LandAcquisitionProject[] {
  const lines = csvText.trim().split(/\r?\n/);
  if (lines.length <= 1) return [];

  const headers = lines[0].split(',').map((h) => h.trim());
  const projects: LandAcquisitionProject[] = [];

  const coordsMap: Record<string, { lat: number; lng: number }> = {
    Maharashtra: { lat: 19.076, lng: 72.8777 },
    Gujarat: { lat: 23.0225, lng: 72.5714 },
    Karnataka: { lat: 12.9716, lng: 77.5946 },
    'Uttar Pradesh': { lat: 26.8467, lng: 80.9462 },
    'Tamil Nadu': { lat: 13.0827, lng: 80.2707 },
    Rajasthan: { lat: 26.9124, lng: 75.7873 },
    'Madhya Pradesh': { lat: 23.2599, lng: 77.4126 },
    Telangana: { lat: 17.385, lng: 78.4867 },
  };

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Split handling commas within or without quotes
    const values: string[] = [];
    let insideQuote = false;
    let currentVal = '';

    for (let charIdx = 0; charIdx < line.length; charIdx++) {
      const char = line[charIdx];
      if (char === '"') {
        insideQuote = !insideQuote;
      } else if (char === ',' && !insideQuote) {
        values.push(currentVal.trim());
        currentVal = '';
      } else {
        currentVal += char;
      }
    }
    values.push(currentVal.trim());

    if (values.length < headers.length) continue;

    const rowObj: Record<string, string> = {};
    headers.forEach((h, idx) => {
      rowObj[h] = values[idx] || '';
    });

    const legalDisputes = parseInt(rowObj.legal_disputes || '0', 10);
    const compensationPaidPct = parseFloat(rowObj.compensation_paid_pct || '50.0');
    const pendingApprovals = parseInt(rowObj.pending_approvals || '0', 10);
    const rehabProgressPct = parseFloat(rowObj.rehabilitation_progress_pct || '50.0');
    const landAreaHa = parseFloat(rowObj.land_area_ha || '500.0');
    const isDelayed = parseInt(rowObj.is_delayed || '0', 10);
    const delayMonths = parseFloat(rowObj.delay_months || '2.0');

    // Risk score calculation based on CSV features
    const riskScore = Math.min(
      99,
      Math.max(
        15,
        Math.round(
          legalDisputes * 6 +
            (100 - compensationPaidPct) * 0.4 +
            pendingApprovals * 5 +
            (100 - rehabProgressPct) * 0.3
        )
      )
    );

    const riskCategory: RiskCategory =
      riskScore >= 75 ? 'CRITICAL' : riskScore >= 55 ? 'HIGH' : riskScore >= 35 ? 'MEDIUM' : 'LOW';

    const delayProbability = isDelayed === 1 ? Math.min(98, Math.max(70, Math.round(riskScore * 0.95))) : Math.round(riskScore * 0.5);

    const stage: AcquisitionStage =
      compensationPaidPct > 80
        ? 'Compensation Disbursement'
        : pendingApprovals > 3
        ? 'Administrative Approval'
        : legalDisputes > 4
        ? 'Legal Dispute Resolution'
        : 'Survey & Boundary Marking';

    const coords = coordsMap[rowObj.state] || { lat: 20.5937 + (i % 5), lng: 78.9629 + (i % 5) };

    const totalApprovedCr = Math.round((landAreaHa * 0.45) * 10) / 10;
    const totalDisbursedCr = Math.round(((totalApprovedCr * compensationPaidPct) / 100) * 10) / 10;

    projects.push({
      id: rowObj.project_id || `LA-2026-${1000 + i}`,
      name: rowObj.project_name || `Project ${i}`,
      sector: (rowObj.sector as InfrastructureSector) || 'Highways & Expressways',
      state: rowObj.state || 'Maharashtra',
      district: rowObj.district || 'Thane',
      corridor: `${rowObj.state} State Corridor`,
      landAreaHa,
      affectedParcels: Math.round(landAreaHa * 2.4),
      affectedFamilies: Math.round(landAreaHa * 1.2),

      riskScore,
      riskCategory,
      delayProbability,
      predictedDelayMonths: delayMonths,
      statutoryTimelineMonths: 18,
      aiPredictedTimelineMonths: Math.round((18 + delayMonths) * 10) / 10,
      currentStage: stage,
      stageProgressPercent: Math.round(compensationPaidPct),

      legalDisputesCount: legalDisputes,
      courtCaseStatus: legalDisputes > 5 ? 'High Court Stay' : legalDisputes > 0 ? 'Pending Sub-Court' : 'Clear',
      litigationDurationMonths: legalDisputes * 4,
      approvalStatus: pendingApprovals > 0 ? 'Pending Clearance' : 'Approved',
      pendingApprovalsCount: pendingApprovals,
      compensationStatus: compensationPaidPct >= 90 ? 'Fully Disbursed' : 'Partially Disbursed',
      compensationApprovedCr: totalApprovedCr,
      compensationDisbursedCr: totalDisbursedCr,
      dbtStatus: 'Active DBT',
      rnrProgressPercent: rehabProgressPct,
      rnrCompensationCr: Math.round(totalApprovedCr * 0.15 * 10) / 10,
      environmentalClearance: pendingApprovals > 2 ? 'Forest Stage-1 Pending' : 'Cleared',
      stakeholderResponsivenessScore: Math.max(1, 10 - legalDisputes),

      primaryDriver:
        legalDisputes >= 5
          ? 'Legal Disputes & Stay Orders'
          : compensationPaidPct < 40
          ? 'Compensation Disbursement Delay'
          : pendingApprovals >= 4
          ? 'Pending Statutory Approvals'
          : 'Rehabilitation & Resettlement Lag',
      driverAttribution: [
        { driver: 'Legal disputes', percentage: 32, impactScore: 0.32, description: `${legalDisputes} active court cases` },
        { driver: 'Compensation pending', percentage: 27, impactScore: 0.27, description: `${(100 - compensationPaidPct).toFixed(1)}% pending disbursement` },
        { driver: 'Pending approvals', percentage: 19, impactScore: 0.19, description: `${pendingApprovals} statutory approvals pending` },
        { driver: 'Rehabilitation', percentage: 12, impactScore: 0.12, description: `Rehabilitation at ${rehabProgressPct.toFixed(1)}%` },
      ],
      recommendedAction:
        legalDisputes >= 5
          ? `Resolve ${legalDisputes} specific legal dispute cases on priority.`
          : `Accelerate compensation processing (${(100 - compensationPaidPct).toFixed(1)}% pending).`,
      status: riskCategory === 'CRITICAL' ? 'Critical Bottleneck' : riskCategory === 'HIGH' ? 'At Risk' : 'On Track',

      lat: coords.lat + (i % 10) * 0.05,
      lng: coords.lng + (i % 10) * 0.05,
      lastUpdated: '2026-09-07',
    });
  }

  return projects;
}

export async function fetchAndParseCsvDataset(): Promise<LandAcquisitionProject[]> {
  try {
    const response = await fetch('/land_acquisition.csv');
    if (response.ok) {
      const csvText = await response.text();
      return parseCsvText(csvText);
    }
  } catch (err) {
    console.error('Error fetching public/land_acquisition.csv:', err);
  }
  return [];
}
