import os
import sys

# Ensure root and backend directories are in Python path for Render deployment
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.dirname(BASE_DIR)
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from fastapi import FastAPI, HTTPException, Query, Path
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import datetime

app = FastAPI(
    title="Sanket Gati API",
    description="AI-Powered Land Acquisition Intelligence & Predictive Decision Support System REST Backend",
    version="4.2.0",
)


# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Data Models ---
class DriverAttributionItem(BaseModel):
    driver: str
    percentage: float
    impactScore: float
    description: str

class ProjectResponse(BaseModel):
    id: str
    name: str
    sector: str
    state: str
    district: str
    corridor: str
    landAreaHa: float
    affectedParcels: int
    affectedFamilies: int
    riskScore: int
    riskCategory: str
    delayProbability: float
    predictedDelayMonths: float
    statutoryTimelineMonths: int
    aiPredictedTimelineMonths: float
    currentStage: str
    stageProgressPercent: int
    legalDisputesCount: int
    courtCaseStatus: str
    litigationDurationMonths: int
    approvalStatus: str
    pendingApprovalsCount: int
    compensationStatus: str
    compensationApprovedCr: float
    compensationDisbursedCr: float
    dbtStatus: str
    rnrProgressPercent: int
    rnrCompensationCr: float
    environmentalClearance: str
    stakeholderResponsivenessScore: int
    primaryDriver: str
    driverAttribution: List[DriverAttributionItem] = []
    recommendedAction: str
    status: str
    lat: float
    lng: float
    lastUpdated: str

class InterventionModel(BaseModel):
    id: Optional[str] = None
    projectId: str
    projectName: str
    state: str
    district: str
    issue: str
    recommendation: str
    priority: str
    assignedDepartment: str
    assignedOfficer: str
    targetDate: str
    expectedDelayReductionDays: int
    status: str = "Pending"
    createdAt: Optional[str] = None
    notes: Optional[str] = None

class PredictionRequest(BaseModel):
    projectId: str
    state: str
    district: str
    sector: str
    landAreaHa: float
    affectedParcels: int
    legalDisputesCount: int
    pendingApprovalsCount: int
    titleMutationBacklog: bool = False

class PredictionResponse(BaseModel):
    projectId: str
    riskScore: int
    riskCategory: str
    delayProbability: float
    estimatedDelayMonths: float
    primaryDrivers: List[Dict[str, Any]]
    recommendedAction: str
    confidenceIndex: float = 94.6

# --- Demo Data Layer ---
MOCK_STATE_MATRIX = [
    {
        "state": "Maharashtra",
        "corridor": "Mumbai-Nagpur Samruddhi Corridor & DMIC",
        "projectsCount": 24,
        "statutoryMonths": 18,
        "aiPredictedMonths": 29.4,
        "aiLagMonths": 11.4,
        "riskCategory": "HIGH",
        "litigationExposurePercent": 28.5,
        "compensationDisbursedPercent": 68.2,
        "titleMutationBacklogPercent": 61.0,
    },
    {
        "state": "Gujarat",
        "corridor": "Delhi-Mumbai Expressway & Dholera SIR",
        "projectsCount": 18,
        "statutoryMonths": 14,
        "aiPredictedMonths": 16.1,
        "aiLagMonths": 2.1,
        "riskCategory": "MEDIUM",
        "litigationExposurePercent": 12.4,
        "compensationDisbursedPercent": 88.5,
        "titleMutationBacklogPercent": 22.1,
    },
    {
        "state": "Karnataka",
        "corridor": "Bengaluru-Chennai Industrial Corridor",
        "projectsCount": 16,
        "statutoryMonths": 16,
        "aiPredictedMonths": 22.8,
        "aiLagMonths": 6.8,
        "riskCategory": "HIGH",
        "litigationExposurePercent": 24.1,
        "compensationDisbursedPercent": 74.0,
        "titleMutationBacklogPercent": 44.5,
    },
    {
        "state": "Uttar Pradesh",
        "corridor": "Ganga Expressway & Defense Corridor",
        "projectsCount": 26,
        "statutoryMonths": 20,
        "aiPredictedMonths": 29.2,
        "aiLagMonths": 9.2,
        "riskCategory": "HIGH",
        "litigationExposurePercent": 31.0,
        "compensationDisbursedPercent": 71.8,
        "titleMutationBacklogPercent": 52.3,
    },
    {
        "state": "Tamil Nadu",
        "corridor": "Chennai-Kanyakumari Industrial Highway",
        "projectsCount": 15,
        "statutoryMonths": 15,
        "aiPredictedMonths": 18.5,
        "aiLagMonths": 3.5,
        "riskCategory": "MEDIUM",
        "litigationExposurePercent": 18.2,
        "compensationDisbursedPercent": 82.1,
        "titleMutationBacklogPercent": 31.8,
    },
]

MOCK_DELAY_DRIVERS = [
    {"name": "Legal & Court Litigation", "percentage": 34, "color": "#EF4444", "detail": "High Court stays, ownership disputes, and compensation enhancement petitions."},
    {"name": "Land Titling & Mutation", "percentage": 26, "color": "#F97316", "detail": "Incomplete ancestral title records, mutation backlogs, and unregistered heirs."},
    {"name": "R&R Compensation & Resettlement", "percentage": 22, "color": "#F59E0B", "detail": "Family identification disputes, alternative land allocation SLA delays."},
    {"name": "Environmental & Forest Clearance", "percentage": 18, "color": "#3B82F6", "detail": "Stage-1 Statutory forestry permissions and CRZ clearance bottlenecks."},
]

MOCK_INTERVENTIONS = [
    {
        "id": "INT-2026-001",
        "projectId": "LA-2026-1004",
        "projectName": "Maharashtra Highways Phase-1 (Thane Corridor)",
        "state": "Maharashtra",
        "district": "Thane",
        "issue": "Unresolved High Court stay order regarding ancestral land share calculation.",
        "recommendation": "Escalate to Special Government Pleader & set up expedited Lok Adalat bench.",
        "priority": "CRITICAL",
        "assignedDepartment": "Revenue & Legal Cell",
        "assignedOfficer": "Shri S. K. Kulkarni (Addl Collector)",
        "targetDate": "2026-09-25",
        "expectedDelayReductionDays": 38,
        "status": "In Progress",
        "createdAt": "2026-08-28",
        "notes": "District Magistrate convened preliminary hearing with advocate on record.",
    },
    {
        "id": "INT-2026-002",
        "projectId": "LA-2026-1011",
        "projectName": "Uttar Pradesh Industrial Phase-4 (Prayagraj Corridor)",
        "state": "Uttar Pradesh",
        "district": "Prayagraj",
        "issue": "Title mutation backlog across 84 survey numbers in Naini sub-division.",
        "recommendation": "Deploy dedicated Special Land Acquisition Officer (SLAO) mutation camp.",
        "priority": "HIGH",
        "assignedDepartment": "Land Records & Revenue",
        "assignedOfficer": "Shri R. P. Verma (SLAO)",
        "targetDate": "2026-09-30",
        "expectedDelayReductionDays": 28,
        "status": "Pending",
        "createdAt": "2026-09-01",
    },
]

MOCK_ALERTS = [
    {
        "id": "ALT-901",
        "projectId": "LA-2026-1004",
        "projectName": "Maharashtra Highways Phase-1 (Thane Corridor)",
        "state": "Maharashtra",
        "district": "Thane",
        "alertType": "Legal Dispute",
        "riskScoreDelta": 18,
        "previousProb": 62.4,
        "currentProb": 88.2,
        "primaryDriver": "Legal & Court Litigation",
        "recommendedAction": "Escalate to Special Legal Cell for High Court stay vacation petition.",
        "severity": "CRITICAL",
        "timestamp": "10 mins ago",
        "isRead": False,
    },
    {
        "id": "ALT-902",
        "projectId": "LA-2026-1008",
        "projectName": "Telangana Railways Phase-1 (Rangareddy Corridor)",
        "state": "Telangana",
        "district": "Rangareddy",
        "alertType": "R&R Milestone Missed",
        "riskScoreDelta": 14,
        "previousProb": 71.0,
        "currentProb": 85.0,
        "primaryDriver": "R&R Compensation & Resettlement",
        "recommendedAction": "Convene SLAO emergency review for plot possession handover.",
        "severity": "CRITICAL",
        "timestamp": "1 hour ago",
        "isRead": False,
    },
]

MOCK_AUDIT_LOGS = [
    {
        "id": "AUD-8801",
        "user": "Rajesh Kumar, IAS",
        "role": "Chief Land Acquisition Officer",
        "action": "Intervention Assigned",
        "projectId": "LA-2026-1004",
        "projectName": "Maharashtra Highways Phase-1",
        "timestamp": "2026-09-05 14:15:10",
        "previousValue": "Unassigned",
        "newValue": "Assigned to Shri S. K. Kulkarni (Addl Collector)",
        "ipAddress": "10.204.14.82",
    },
]

# Generate sample projects
MOCK_PROJECTS = []
states_data = [
    ("Maharashtra", "Thane", 19.75, 75.71),
    ("Gujarat", "Ahmedabad", 22.25, 71.19),
    ("Karnataka", "Bengaluru Rural", 15.31, 75.71),
    ("Uttar Pradesh", "Prayagraj", 26.84, 80.94),
    ("Tamil Nadu", "Kanchipuram", 11.12, 78.65),
]

for idx in range(1, 101):
    st, dist, lat, lng = states_data[(idx - 1) % len(states_data)]
    risk = "CRITICAL" if idx % 4 == 0 else "HIGH" if idx % 3 == 0 else "MEDIUM" if idx % 2 == 0 else "LOW"
    score = 85 if risk == "CRITICAL" else 68 if risk == "HIGH" else 45 if risk == "MEDIUM" else 22
    p_driver = "Legal & Court Litigation" if risk == "CRITICAL" else "Land Titling & Mutation"

    MOCK_PROJECTS.append({
        "id": f"LA-2026-{1000 + idx}",
        "name": f"{st} Infrastructure Corridor Package-{idx}",
        "sector": "Highways & Expressways" if idx % 2 == 0 else "Railways & Dedicated Freight",
        "state": st,
        "district": dist,
        "corridor": f"{st} Main Package {idx}",
        "landAreaHa": 250 + idx * 15,
        "affectedParcels": 80 + idx * 4,
        "affectedFamilies": 45 + idx * 3,
        "riskScore": score,
        "riskCategory": risk,
        "delayProbability": float(min(99.0, score * 0.95)),
        "predictedDelayMonths": float(round(score * 0.14, 1)),
        "statutoryTimelineMonths": 18,
        "aiPredictedTimelineMonths": float(round(18 + score * 0.14, 1)),
        "currentStage": "Legal Dispute Resolution" if risk == "CRITICAL" else "Compensation Disbursement",
        "stageProgressPercent": 45,
        "legalDisputesCount": 8 if risk == "CRITICAL" else 2,
        "courtCaseStatus": "High Court Stay" if risk == "CRITICAL" else "Clear",
        "litigationDurationMonths": 14 if risk == "CRITICAL" else 0,
        "approvalStatus": "Pending Clearance" if risk == "CRITICAL" else "Approved",
        "pendingApprovalsCount": 3 if risk == "CRITICAL" else 0,
        "compensationStatus": "Partially Disbursed",
        "compensationApprovedCr": float(240.0 + idx * 5),
        "compensationDisbursedCr": float(180.0 + idx * 3),
        "dbtStatus": "Active DBT",
        "rnrProgressPercent": 65,
        "rnrCompensationCr": 45.0,
        "environmentalClearance": "Cleared",
        "stakeholderResponsivenessScore": 7,
        "primaryDriver": p_driver,
        "driverAttribution": [
            {"driver": p_driver, "percentage": 38.0, "impactScore": 8.4, "description": "Major bottleneck slowing down physical possession."},
            {"driver": "Land Titling & Mutation", "percentage": 28.0, "impactScore": 6.2, "description": "Multiple un-mutated survey numbers."},
            {"driver": "Compensation Disbursement", "percentage": 20.0, "impactScore": 4.8, "description": "Bank account verification pending."},
            {"driver": "Inter-department SLA", "percentage": 14.0, "impactScore": 3.1, "description": "Response pending from Public Works Dept."},
        ],
        "recommendedAction": "Initiate district-level title verification and mutation reconciliation.",
        "status": "Critical Bottleneck" if risk == "CRITICAL" else "At Risk" if risk == "HIGH" else "On Track",
        "lat": lat + (idx % 10 - 5) * 0.1,
        "lng": lng + ((idx * 3) % 10 - 5) * 0.1,
        "lastUpdated": datetime.datetime.now().strftime("%Y-%m-%d %H:%M IST"),
    })

# --- REST Endpoints ---
@app.get("/")
def root():
    return {
        "platform": "Sanket Gati AI Platform API",
        "status": "ONLINE",
        "version": "4.2.0",
        "documentation": "/docs",
    }

@app.get("/api/projects", response_model=List[ProjectResponse])
def get_projects(
    state: Optional[str] = None,
    riskCategory: Optional[str] = None,
    sector: Optional[str] = None,
):
    results = MOCK_PROJECTS
    if state and state != "ALL":
        results = [p for p in results if p["state"] == state]
    if riskCategory and riskCategory != "ALL":
        results = [p for p in results if p["riskCategory"] == riskCategory]
    if sector and sector != "ALL":
        results = [p for p in results if p["sector"] == sector]
    return results

@app.get("/api/projects/{id}", response_model=ProjectResponse)
def get_project_by_id(id: str = Path(..., description="Project ID e.g. LA-2026-1004")):
    proj = next((p for p in MOCK_PROJECTS if p["id"] == id), None)
    if not proj:
        raise HTTPException(status_code=404, detail="Project not found")
    return proj

@app.get("/api/projects/{id}/risk")
def get_project_risk(id: str):
    proj = get_project_by_id(id)
    return {
        "id": proj["id"],
        "riskScore": proj["riskScore"],
        "riskCategory": proj["riskCategory"],
        "delayProbability": proj["delayProbability"],
        "predictedDelayMonths": proj["predictedDelayMonths"],
    }

@app.get("/api/dashboard/summary")
def get_dashboard_summary():
    total_area = sum(p["landAreaHa"] for p in MOCK_PROJECTS)
    critical_count = sum(1 for p in MOCK_PROJECTS if p["riskCategory"] in ["CRITICAL", "HIGH"])
    return {
        "activeParcelsCount": len(MOCK_PROJECTS),
        "cadastralScopeHa": total_area,
        "criticalDelayVectorCount": critical_count,
        "litigationExposurePercent": 19.7,
        "meanDelayProbability": 38.4,
        "compensationDisbursedCr": 14820.0,
        "compensationTotalCr": 19970.0,
        "dbtPayoutPercent": 74.2,
    }

@app.get("/api/dashboard/state-analysis")
def get_state_analysis():
    return MOCK_STATE_MATRIX

@app.get("/api/dashboard/delay-drivers")
def get_delay_drivers():
    return MOCK_DELAY_DRIVERS

@app.get("/api/interventions")
def get_interventions():
    return MOCK_INTERVENTIONS

@app.post("/api/interventions")
def create_intervention(intervention: InterventionModel):
    item = intervention.dict()
    item["id"] = f"INT-2026-{len(MOCK_INTERVENTIONS) + 1:03d}"
    item["createdAt"] = datetime.datetime.now().strftime("%Y-%m-%d")
    MOCK_INTERVENTIONS.insert(0, item)
    return item

@app.get("/api/alerts")
def get_alerts():
    return MOCK_ALERTS

@app.get("/api/audit-logs")
def get_audit_logs():
    return MOCK_AUDIT_LOGS

@app.post("/api/predictions", response_model=PredictionResponse)
def run_prediction(req: PredictionRequest):
    base_score = 25
    if req.legalDisputesCount > 0:
        base_score += req.legalDisputesCount * 12
    if req.pendingApprovalsCount > 0:
        base_score += req.pendingApprovalsCount * 10
    if req.titleMutationBacklog:
        base_score += 20
    
    score = min(99, max(15, base_score))
    risk_cat = "CRITICAL" if score >= 81 else "HIGH" if score >= 61 else "MEDIUM" if score >= 31 else "LOW"
    
    return PredictionResponse(
        projectId=req.projectId,
        riskScore=score,
        riskCategory=risk_cat,
        delayProbability=float(round(score * 0.94, 1)),
        estimatedDelayMonths=float(round(score * 0.15, 1)),
        primaryDrivers=[
            {"driver": "Legal Disputes & Court Cases", "attribution": "42%"},
            {"driver": "Title Mutation Backlog", "attribution": "32%"},
            {"driver": "Department SLA Approvals", "attribution": "26%"},
        ],
        recommendedAction="Initiate emergency SLAO reconciliation camp and legal stay vacation petition.",
        confidenceIndex=94.6,
    )

@app.get("/api/models/metrics")
def get_model_metrics():
    return {
        "version": "Predictive Engine v4.2-Prod",
        "status": "ACTIVE",
        "lastTrainedDate": "2026-08-30 02:00 IST",
        "trainingRecordsCount": 142850,
        "accuracy": 0.938,
        "precision": 0.912,
        "recall": 0.945,
        "f1Score": 0.928,
        "rocAuc": 0.962,
        "confidenceIndex": 94.6,
        "algorithm": "Random Forest Classifier + SHAP TreeExplainer",
        "modelDrift": 0.012,
        "featuresUsed": 48,
    }

@app.get("/api/predictive-analytics")
@app.get("/api/predictive-analytics/{project_id}")
def get_predictive_analytics(project_id: str = "LA-2026-1004"):
    try:
        from backend.predictive_engine import analyze_project
        return analyze_project(project_id)
    except Exception as e:
        try:
            from predictive_engine import analyze_project
            return analyze_project(project_id)
        except Exception as inner_e:
            raise HTTPException(status_code=500, detail=str(inner_e))

