"""
Trains a heart disease risk classifier on the UCI Cleveland dataset
and saves the model + a SHAP explainer to disk for the FastAPI app to load.

Run with:
    python -m app.ml.train
"""

import json
from pathlib import Path

import joblib
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, roc_auc_score
from sklearn.model_selection import train_test_split

HERE = Path(__file__).parent
DATA_PATH = HERE / "heart.csv"
MODEL_PATH = HERE / "model.pkl"
METRICS_PATH = HERE / "metrics.json"

FEATURE_ORDER = [
    "age", "sex", "cp", "trestbps", "chol", "fbs", "restecg",
    "thalach", "exang", "oldpeak", "slope", "ca", "thal",
]


def main():
    df = pd.read_csv(DATA_PATH)
    X = df[FEATURE_ORDER]
    y = df["target"]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    model = RandomForestClassifier(
        n_estimators=300,
        max_depth=6,
        min_samples_leaf=3,
        random_state=42,
        class_weight="balanced",
    )
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    y_proba = model.predict_proba(X_test)[:, 1]

    acc = accuracy_score(y_test, y_pred)
    auc = roc_auc_score(y_test, y_proba)
    report = classification_report(y_test, y_pred, output_dict=True)

    print(f"Accuracy: {acc:.3f}")
    print(f"ROC AUC:  {auc:.3f}")
    print(classification_report(y_test, y_pred))

    # Retrain on the full dataset for the model that ships in production,
    # now that we've measured held-out performance above.
    model.fit(X, y)

    joblib.dump({"model": model, "feature_order": FEATURE_ORDER}, MODEL_PATH)

    METRICS_PATH.write_text(json.dumps({
        "accuracy": round(acc, 4),
        "roc_auc": round(auc, 4),
        "report": report,
        "n_samples": len(df),
    }, indent=2))

    print(f"\nSaved model to {MODEL_PATH}")
    print(f"Saved metrics to {METRICS_PATH}")


if __name__ == "__main__":
    main()
