"""
Pydantic schema for the /predict endpoint.

The frontend Assessment form sends human-readable string values
(e.g. sex="male", cp="typical"). This module validates that payload
and converts it into the numeric encoding the trained model expects.
"""

from pydantic import BaseModel, Field, field_validator


class AssessmentInput(BaseModel):
    age: int = Field(..., ge=1, le=120)
    sex: str  # "male" | "female"
    cp: str  # "typical" | "atypical" | "non_anginal" | "asymptomatic"
    trestbps: int = Field(..., ge=60, le=260)
    chol: int = Field(..., ge=80, le=700)
    fbs: str  # "1" | "0"
    restecg: str  # "normal" | "st_t_abnormality" | "lv_hypertrophy"
    thalach: int = Field(..., ge=50, le=250)
    exang: str  # "1" | "0"
    oldpeak: float = Field(..., ge=0, le=10)
    slope: str  # "upsloping" | "flat" | "downsloping"
    ca: str  # "0" | "1" | "2" | "3"
    thal: str  # "normal" | "fixed_defect" | "reversible_defect"

    @field_validator("sex")
    @classmethod
    def validate_sex(cls, v: str) -> str:
        if v not in ("male", "female"):
            raise ValueError("sex must be 'male' or 'female'")
        return v

    def to_model_features(self) -> dict:
        """Converts validated string inputs into the numeric encoding
        the Cleveland-trained model expects."""
        cp_map = {"typical": 0, "atypical": 1, "non_anginal": 2, "asymptomatic": 3}
        restecg_map = {"normal": 0, "st_t_abnormality": 1, "lv_hypertrophy": 2}
        slope_map = {"upsloping": 0, "flat": 1, "downsloping": 2}
        thal_map = {"normal": 1, "fixed_defect": 2, "reversible_defect": 3}

        return {
            "age": self.age,
            "sex": 1 if self.sex == "male" else 0,
            "cp": cp_map[self.cp],
            "trestbps": self.trestbps,
            "chol": self.chol,
            "fbs": int(self.fbs),
            "restecg": restecg_map[self.restecg],
            "thalach": self.thalach,
            "exang": int(self.exang),
            "oldpeak": self.oldpeak,
            "slope": slope_map[self.slope],
            "ca": int(self.ca),
            "thal": thal_map[self.thal],
        }


class FactorOut(BaseModel):
    feature: str
    label: str
    impact: float
    direction: str


class AssessmentOutput(BaseModel):
    risk_probability: float
    risk_label: str
    top_factors: list[FactorOut]
