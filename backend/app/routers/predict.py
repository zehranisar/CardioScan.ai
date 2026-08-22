from fastapi import APIRouter, HTTPException

from app.ml.predict import predict_with_explanation
from app.schemas.assessment import AssessmentInput, AssessmentOutput

router = APIRouter(prefix="/predict", tags=["predict"])


@router.post("", response_model=AssessmentOutput)
def predict(payload: AssessmentInput):
    try:
        features = payload.to_model_features()
        result = predict_with_explanation(features)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
