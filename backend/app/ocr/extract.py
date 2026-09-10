"""
Calls Gemini's vision API to extract structured clinical values from an
uploaded lab report or ECG printout image/PDF. Only fields explicitly
present in the document are returned — everything else comes back null
and the user fills it in manually.
"""

import base64
import json
import os

import httpx

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = "gemini-2.0-flash"
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent"

PROMPT = """You are extracting structured cardiovascular clinical values from a
lab report or ECG printout image. Extract ONLY values that are explicitly
written in the document. Do not guess, estimate, or infer a value that
is not clearly present — return null for anything not found.

Map each value to the exact category defined in the schema:
- sex: "male" or "female"
- cp (chest pain type): "typical", "atypical", "non_anginal", or "asymptomatic"
- fbs (fasting blood sugar > 120 mg/dL): true or false
- restecg (resting ECG result): "normal", "st_t_abnormality", or "lv_hypertrophy"
- exang (exercise-induced angina): true or false
- slope (ST segment slope): "upsloping", "flat", or "downsloping"
- ca (major vessels colored by fluoroscopy): "0", "1", "2", or "3"
- thal (thalassemia result): "normal", "fixed_defect", or "reversible_defect"

Numeric fields (age, trestbps, chol, thalach, oldpeak) should be plain
numbers as written in the document."""

RESPONSE_SCHEMA = {
    "type": "OBJECT",
    "properties": {
        "age": {"type": "NUMBER", "nullable": True},
        "sex": {"type": "STRING", "enum": ["male", "female"], "nullable": True},
        "cp": {
            "type": "STRING",
            "enum": ["typical", "atypical", "non_anginal", "asymptomatic"],
            "nullable": True,
        },
        "trestbps": {"type": "NUMBER", "nullable": True},
        "chol": {"type": "NUMBER", "nullable": True},
        "fbs": {"type": "BOOLEAN", "nullable": True},
        "restecg": {
            "type": "STRING",
            "enum": ["normal", "st_t_abnormality", "lv_hypertrophy"],
            "nullable": True,
        },
        "thalach": {"type": "NUMBER", "nullable": True},
        "exang": {"type": "BOOLEAN", "nullable": True},
        "oldpeak": {"type": "NUMBER", "nullable": True},
        "slope": {
            "type": "STRING",
            "enum": ["upsloping", "flat", "downsloping"],
            "nullable": True,
        },
        "ca": {"type": "STRING", "enum": ["0", "1", "2", "3"], "nullable": True},
        "thal": {
            "type": "STRING",
            "enum": ["normal", "fixed_defect", "reversible_defect"],
            "nullable": True,
        },
    },
}


async def extract_from_document(file_bytes: bytes, mime_type: str) -> dict:
    if not GEMINI_API_KEY:
        raise RuntimeError("GEMINI_API_KEY is not configured on the server.")

    b64 = base64.b64encode(file_bytes).decode("utf-8")

    payload = {
        "contents": [
            {
                "parts": [
                    {"text": PROMPT},
                    {"inline_data": {"mime_type": mime_type, "data": b64}},
                ]
            }
        ],
        "generationConfig": {
            "responseMimeType": "application/json",
            "responseSchema": RESPONSE_SCHEMA,
        },
    }

    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.post(f"{GEMINI_URL}?key={GEMINI_API_KEY}", json=payload)

    resp.raise_for_status()
    data = resp.json()
    text = data["candidates"][0]["content"]["parts"][0]["text"]
    return json.loads(text)
