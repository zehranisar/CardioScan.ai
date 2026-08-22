"""
Loads the trained model and exposes a predict_with_explanation() function
that returns a risk score plus a SHAP-based breakdown of which factors
contributed most.
"""

from pathlib import Path

import joblib
import numpy as np
import pandas as pd
import shap

HERE = Path(__file__).parent
MODEL_PATH = HERE / "model.pkl"

_bundle = joblib.load(MODEL_PATH)
_model = _bundle["model"]
_feature_order = _bundle["feature_order"]
_explainer = shap.TreeExplainer(_model)

# Human-readable labels for the SHAP factor breakdown shown in the UI.
FEATURE_LABELS = {
    "age": "Age",
    "sex": "Sex",
    "cp": "Chest pain type",
    "trestbps": "Resting blood pressure",
    "chol": "Cholesterol",
    "fbs": "Fasting blood sugar",
    "restecg": "Resting ECG",
    "thalach": "Max heart rate",
    "exang": "Exercise-induced angina",
    "oldpeak": "ST depression",
    "slope": "ST segment slope",
    "ca": "Major vessels (fluoroscopy)",
    "thal": "Thalassemia",
}


def predict_with_explanation(features: dict) -> dict:
    """
    features: dict with the 13 raw numeric-encoded Cleveland fields,
    e.g. {"age": 45, "sex": 1, "cp": 2, ...}

    Returns:
        {
            "risk_probability": 0.18,
            "risk_label": "Low",
            "top_factors": [
                {"feature": "cp", "label": "Chest pain type", "impact": 0.09, "direction": "increases"},
                ...
            ]
        }
    """
    row = pd.DataFrame([[features[f] for f in _feature_order]], columns=_feature_order)

    proba = float(_model.predict_proba(row)[0, 1])

    shap_values = _explainer.shap_values(row)
    # For binary RandomForest, shap_values may be a list [class0, class1] or a single array.
    if isinstance(shap_values, list):
        contributions = shap_values[1][0]
    else:
        contributions = shap_values[0]
        if contributions.ndim > 1:
            contributions = contributions[:, 1]

    ranked = sorted(
        zip(_feature_order, contributions),
        key=lambda pair: abs(pair[1]),
        reverse=True,
    )[:4]

    top_factors = [
        {
            "feature": feat,
            "label": FEATURE_LABELS.get(feat, feat),
            "impact": round(float(abs(val)), 4),
            "direction": "increases" if val > 0 else "decreases",
        }
        for feat, val in ranked
    ]

    if proba < 0.3:
        risk_label = "Low"
    elif proba < 0.6:
        risk_label = "Moderate"
    else:
        risk_label = "High"

    return {
        "risk_probability": round(proba, 4),
        "risk_label": risk_label,
        "top_factors": top_factors,
    }
