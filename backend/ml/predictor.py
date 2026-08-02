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
