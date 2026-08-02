"""
Feature order reference, kept as the single source of truth alongside
train.py. Pydantic (see app/schemas/predict_schema.py) handles request
validation now, so this is mainly documentation / used if you add more
preprocessing steps later.
"""

FEATURE_ORDER = ["age", "sex", "cp", "trestbps", "chol", "thalach", "exang", "oldpeak", "ca"]
