from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import predict, ocr

app = FastAPI(
    title="CardioScan.ai API",
    description="Heart disease risk prediction with explainability.",
    version="0.1.0",
)

# During local development the frontend runs on Vite's default port.
# In production, replace "*" with your deployed frontend's exact origin(s).
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predict.router)
app.include_router(ocr.router)


@app.get("/")
def root():
    return {"status": "ok", "service": "CardioScan.ai API"}


@app.get("/health")
def health():
    return {"status": "healthy"}
