"""
Run this once from the backend/ directory:  python setup_backend.py

It writes/overwrites every file needed for the Cardyx FastAPI backend.
Safe to run more than once (it always overwrites with the correct content).
"""
import os

BASE = os.path.dirname(os.path.abspath(__file__))


def write(relative_path, content):
    full_path = os.path.join(BASE, relative_path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8", newline="\n") as f:
        f.write(content.lstrip("\n"))
    print(f"wrote {relative_path}")


def remove(relative_path):
    full_path = os.path.join(BASE, relative_path)
    if os.path.exists(full_path):
        os.remove(full_path)
        print(f"removed {relative_path}")


# ---------------------------------------------------------------------------
# requirements.txt
# ---------------------------------------------------------------------------
write("requirements.txt", """
fastapi==0.115.6
uvicorn[standard]==0.34.0
pydantic==2.10.4
python-dotenv==1.0.1
numpy==2.1.3
pandas==2.2.3
scikit-learn==1.5.2
joblib==1.4.2
""")

# Old Flask entry point, not used anymore
remove("run.py")

# ---------------------------------------------------------------------------
# ml/train.py
# ---------------------------------------------------------------------------
write("ml/__init__.py", "")

write("ml/train.py", '''
# Importing the Dependencies
import os
import joblib
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score

# Paths (relative to this file, so the script works no matter where it's run from)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, "..", "..", "dataset", "data.csv")
SAVED_MODELS_DIR = os.path.join(BASE_DIR, "saved_models")
os.makedirs(SAVED_MODELS_DIR, exist_ok=True)

# Data Collection and Processing
heart_data = pd.read_csv(DATA_PATH)

print("First 5 rows of the dataset:")
print(heart_data.head())

print("\\nDataset shape (rows, columns):", heart_data.shape)
print("\\nMissing values in each column:")
print(heart_data.isnull().sum())

print("\\nDistribution of target variable:")
print(heart_data["target"].value_counts())
print("\\n1 --> Defective Heart\\n0 --> Healthy Heart")

# Splitting the Features and Target
X = heart_data.drop(columns="target")
Y = heart_data["target"]

# Splitting the Data into Training data & Test Data
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, stratify=Y, random_state=2)

print("\\nData Shapes:")
print("X:", X.shape)
print("X_train:", X_train.shape)
print("X_test:", X_test.shape)

# Feature Scaling
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Model Training
model = LogisticRegression(max_iter=1000)
model.fit(X_train_scaled, Y_train)

# Model Evaluation
X_train_prediction = model.predict(X_train_scaled)
training_data_accuracy = accuracy_score(Y_train, X_train_prediction)
print("\\nAccuracy on Training data:", training_data_accuracy)

X_test_prediction = model.predict(X_test_scaled)
test_data_accuracy = accuracy_score(Y_test, X_test_prediction)
print("Accuracy on Test data:", test_data_accuracy)

# Building a Predictive System
# Feature order must match X.columns: age, sex, cp, trestbps, chol, thalach, exang, oldpeak, ca
input_data = (62, 0, 0, 140, 268, 160, 0, 3.6, 2)
input_data_as_numpy_array = np.asarray(input_data).reshape(1, -1)
input_data_scaled = scaler.transform(input_data_as_numpy_array)

prediction = model.predict(input_data_scaled)
print("\\nPrediction result:", prediction)

if prediction[0] == 0:
    print("The Person does not have a Heart Disease")
else:
    print("The Person has Heart Disease")

# Persist the trained model, scaler, and feature order so the API can load them without retraining.
joblib.dump(model, os.path.join(SAVED_MODELS_DIR, "heart_disease_model.pkl"))
joblib.dump(scaler, os.path.join(SAVED_MODELS_DIR, "scaler.pkl"))
joblib.dump(list(X.columns), os.path.join(SAVED_MODELS_DIR, "feature_order.pkl"))
print(f"\\nModel, scaler, and feature order saved to {SAVED_MODELS_DIR}")
''')

# ---------------------------------------------------------------------------
# ml/preprocess.py
# ---------------------------------------------------------------------------
write("ml/preprocess.py", '''
"""
Feature order reference, kept as the single source of truth alongside
train.py. Pydantic (see app/schemas/predict_schema.py) handles request
validation now, so this is mainly documentation / used if you add more
preprocessing steps later.
"""

FEATURE_ORDER = ["age", "sex", "cp", "trestbps", "chol", "thalach", "exang", "oldpeak", "ca"]
''')

# ---------------------------------------------------------------------------
# ml/predictor.py
# ---------------------------------------------------------------------------
write("ml/predictor.py", '''
"""
Loads the trained model, scaler, and feature order once (lazily), and
exposes a simple predict() function for the API layer to call.
"""
import os
import joblib

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SAVED_MODELS_DIR = os.path.join(BASE_DIR, "saved_models")

_model = None
_scaler = None
_feature_order = None


def _load_artifacts():
    global _model, _scaler, _feature_order

    if _model is None:
        model_path = os.path.join(SAVED_MODELS_DIR, "heart_disease_model.pkl")
        scaler_path = os.path.join(SAVED_MODELS_DIR, "scaler.pkl")
        feature_order_path = os.path.join(SAVED_MODELS_DIR, "feature_order.pkl")

        if not (os.path.exists(model_path) and os.path.exists(scaler_path)):
            raise FileNotFoundError(
                "Trained model not found. Run 'python ml/train.py' first "
                "(from the backend directory) to train and save it."
            )

        _model = joblib.load(model_path)
        _scaler = joblib.load(scaler_path)
        _feature_order = joblib.load(feature_order_path)

    return _model, _scaler, _feature_order


def predict(feature_dict: dict):
    """
    Takes a dict of already-validated raw feature values, scales them the
    same way training data was scaled, and returns (prediction, probability).

    prediction: 0 (no heart disease) or 1 (heart disease)
    probability: model confidence that the person has heart disease (0-1)
    """
    model, scaler, feature_order = _load_artifacts()

    feature_vector = [[float(feature_dict[f]) for f in feature_order]]
    scaled = scaler.transform(feature_vector)

    prediction = int(model.predict(scaled)[0])
    probability = float(model.predict_proba(scaled)[0][1])

    return prediction, probability
''')

# ---------------------------------------------------------------------------
# app/__init__.py
# ---------------------------------------------------------------------------
write("app/__init__.py", "")

# ---------------------------------------------------------------------------
# app/schemas/predict_schema.py
# ---------------------------------------------------------------------------
write("app/schemas/__init__.py", "")

write("app/schemas/predict_schema.py", '''
"""
Pydantic models for the /predict endpoint. FastAPI uses these to validate
incoming requests automatically and to generate the /docs schema.
"""
from pydantic import BaseModel, Field


class PredictRequest(BaseModel):
    age: float = Field(..., description="Age in years")
    sex: float = Field(..., description="0 = female, 1 = male")
    cp: float = Field(..., description="Chest pain type (0-3)")
    trestbps: float = Field(..., description="Resting blood pressure in mm Hg")
    chol: float = Field(..., description="Serum cholesterol in mg/dl")
    thalach: float = Field(..., description="Maximum heart rate achieved")
    exang: float = Field(..., description="Exercise induced angina (0 = no, 1 = yes)")
    oldpeak: float = Field(..., description="ST depression induced by exercise relative to rest")
    ca: float = Field(..., description="Number of major vessels (0-4) colored by fluoroscopy")


class PredictResponse(BaseModel):
    prediction: int
    risk: str
    probability: float
    message: str
''')

# ---------------------------------------------------------------------------
# app/services/prediction_service.py
# ---------------------------------------------------------------------------
write("app/services/__init__.py", "")

write("app/services/prediction_service.py", '''
"""
Business logic for handling a prediction request. Validation of the raw
input shape is handled by Pydantic (see app/schemas/predict_schema.py)
before this is ever called, so this just runs the model and formats the result.
"""
from ml.predictor import predict as ml_predict


def get_prediction(data: dict) -> dict:
    prediction, probability = ml_predict(data)

    return {
        "prediction": prediction,
        "risk": "high" if prediction == 1 else "low",
        "probability": round(probability, 4),
        "message": (
            "The model indicates a higher likelihood of heart disease. "
            "Please consult a healthcare professional for an accurate diagnosis."
            if prediction == 1
            else "The model indicates a lower likelihood of heart disease."
        ),
    }
''')

# ---------------------------------------------------------------------------
# app/routes/predict_routes.py
# ---------------------------------------------------------------------------
write("app/routes/__init__.py", "")

write("app/routes/predict_routes.py", '''
"""
Routes for heart disease prediction requests.
"""
from fastapi import APIRouter

from app.schemas.predict_schema import PredictRequest, PredictResponse
from app.services.prediction_service import get_prediction

router = APIRouter()


@router.get("/predict/fields")
def get_fields():
    """Tells the frontend which fields to collect in the prediction form."""
    fields = list(PredictRequest.model_fields.keys())
    descriptions = {name: f.description for name, f in PredictRequest.model_fields.items()}
    return {"fields": fields, "descriptions": descriptions}


@router.post("/predict", response_model=PredictResponse)
def predict(payload: PredictRequest):
    return get_prediction(payload.model_dump())
''')

# ---------------------------------------------------------------------------
# app/main.py
# ---------------------------------------------------------------------------
write("app/main.py", '''
"""
FastAPI application entry point for the Cardyx backend.
Run (from the backend directory): uvicorn app.main:app --reload --port 5000
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from app.routes.predict_routes import router as predict_router

load_dotenv()

app = FastAPI(title="Cardyx API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # TODO: restrict to the frontend's actual origin before production
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predict_router, prefix="/api")


@app.get("/api/health")
def health_check():
    return {"status": "ok", "service": "cardyx-backend"}
''')

print("\\nAll files written. Next steps:")
print("  1. pip install -r requirements.txt")
print("  2. python ml/train.py")
print("  3. uvicorn app.main:app --reload --port 5000")
