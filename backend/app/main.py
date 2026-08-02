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
