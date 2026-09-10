"""
Loads the trained model and exposes predict_with_explanation(), which
returns a risk score plus a breakdown of which factors drove it.

Explanation method: for each feature, we swap it out for a "typical
patient" reference value (the training-set average) and see how much
the predicted probability shifts. A larger shift means that feature
mattered more for this specific prediction. This avoids a SHAP/numba
dependency, which can be blocked by locked-down Windows environments
(e.g. Application Control policies on managed machines).
"""

from pathlib import Path

import joblib
import pandas as pd

HERE = Path(__file__).parent
MODEL_PATH = HERE / "model.pkl"

_bundle = joblib.load(MODEL_PATH)
_model = _bundle["model"]
_feature_order = _bundle["feature_order"]
_reference = _bundle["reference"]

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
    row = pd.DataFrame([[features[f] for f in _feature_order]], columns=_feature_order)
    baseline_proba = float(_model.predict_proba(row)[0, 1])

    contributions = {}
    for feature in _feature_order:
        perturbed = row.copy()
        perturbed[feature] = _reference[feature]
        perturbed_proba = float(_model.predict_proba(perturbed)[0, 1])
        # Positive = this feature's actual value pushed risk UP relative
        # to a typical patient; negative = pushed it down.
        contributions[feature] = baseline_proba - perturbed_proba

    ranked = sorted(contributions.items(), key=lambda pair: abs(pair[1]), reverse=True)[:4]

    top_factors = [
        {
            "feature": feat,
            "label": FEATURE_LABELS.get(feat, feat),
            "impact": round(abs(val), 4),
            "direction": "increases" if val > 0 else "decreases",
        }
        for feat, val in ranked
    ]

    if baseline_proba < 0.3:
        risk_label = "Low"
    elif baseline_proba < 0.6:
        risk_label = "Moderate"
    else:
        risk_label = "High"

    return {
        "risk_probability": round(baseline_proba, 4),
        "risk_label": risk_label,
        "top_factors": top_factors,
    }
