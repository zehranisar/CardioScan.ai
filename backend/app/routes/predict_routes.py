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
