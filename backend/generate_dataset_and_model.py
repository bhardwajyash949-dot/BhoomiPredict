import os
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
import shap

CSV_FILE = os.path.join(os.path.dirname(__file__), 'land_acquisition.csv')

def create_dataset():
    np.random.seed(42)
    n_samples = 150

    # Features:
    # 1. legal_disputes (int: 0 to 12)
    # 2. compensation_paid_pct (float: 10.0 to 100.0) -> pending is 100 - compensation_paid_pct
    # 3. pending_approvals (int: 0 to 10)
    # 4. rehabilitation_progress_pct (float: 10.0 to 100.0)

    projects = []
    
    # Let's create specific high risk project LA-2026-1004
    # legal_disputes=8, compensation_paid_pct=32.0, pending_approvals=6, rehabilitation_progress_pct=25.0
    
    for i in range(1, n_samples + 1):
        pid = f"LA-2026-{1000 + i}"
        if i == 4: # LA-2026-1004: Target High-Risk Project
            pname = "Maharashtra Highways Phase-1 (Thane Corridor)"
            state = "Maharashtra"
            district = "Thane"
            sector = "Highways & Expressways"
            legal_disputes = 8
            compensation_paid_pct = 32.0
            pending_approvals = 6
            rehabilitation_progress_pct = 25.0
            land_area = 1450.0
            is_delayed = 1
            delay_months = 7.5
        elif i == 1:
            pname = "Golden Quadrilateral Expansion"
            state = "Gujarat"
            district = "Ahmedabad"
            sector = "Highways & Expressways"
            legal_disputes = 1
            compensation_paid_pct = 85.0
            pending_approvals = 1
            rehabilitation_progress_pct = 90.0
            land_area = 620.0
            is_delayed = 0
            delay_months = 1.2
        elif i == 2:
            pname = "Dedicated Freight Corridor (North)"
            state = "Uttar Pradesh"
            district = "Varanasi"
            sector = "Railways & Dedicated Freight"
            legal_disputes = 6
            compensation_paid_pct = 45.0
            pending_approvals = 5
            rehabilitation_progress_pct = 40.0
            land_area = 1100.0
            is_delayed = 1
            delay_months = 6.2
        else:
            pname = f"Infrastructure Project {i}"
            states = ["Maharashtra", "Gujarat", "Karnataka", "Uttar Pradesh", "Tamil Nadu", "Rajasthan", "Madhya Pradesh", "Telangana"]
            state = np.random.choice(states)
            district = f"District-{i}"
            sector = np.random.choice(["Highways & Expressways", "Railways & Dedicated Freight", "Ports & Maritime", "Renewable Energy & Solar"])
            
            # Draw randomly but correlated
            legal_disputes = int(np.random.poisson(2))
            compensation_paid_pct = float(np.clip(np.random.normal(70, 20), 10, 100))
            pending_approvals = int(np.random.poisson(2))
            rehabilitation_progress_pct = float(np.clip(np.random.normal(65, 25), 10, 100))
            land_area = float(np.random.uniform(200, 2500))
            
            # Risk formula
            risk_score = (legal_disputes * 4.0) + ((100 - compensation_paid_pct) * 0.3) + (pending_approvals * 3.5) + ((100 - rehabilitation_progress_pct) * 0.2)
            is_delayed = 1 if risk_score > 35 else 0
            delay_months = round(float(risk_score / 8.5), 1)

        projects.append({
            "project_id": pid,
            "project_name": pname,
            "state": state,
            "district": district,
            "sector": sector,
            "legal_disputes": legal_disputes,
            "compensation_paid_pct": round(compensation_paid_pct, 1),
            "pending_approvals": pending_approvals,
            "rehabilitation_progress_pct": round(rehabilitation_progress_pct, 1),
            "land_area_ha": round(land_area, 1),
            "is_delayed": is_delayed,
            "delay_months": delay_months
        })

    df = pd.DataFrame(projects)
    df.to_csv(CSV_FILE, index=False)
    print(f"Saved dataset to {CSV_FILE}")
    return df

if __name__ == '__main__':
    create_dataset()
