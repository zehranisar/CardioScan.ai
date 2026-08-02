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
