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
