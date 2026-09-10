from fastapi import APIRouter, UploadFile, File, HTTPException

from app.ocr.extract import extract_from_document

router = APIRouter(prefix="/ocr", tags=["ocr"])

ALLOWED_TYPES = {"image/jpeg", "image/png", "image/webp", "application/pdf"}
MAX_SIZE_BYTES = 8 * 1024 * 1024  # 8MB


@router.post("/extract")
async def extract(file: UploadFile = File(...)):
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file type. Upload a JPG, PNG, or PDF.",
        )

    contents = await file.read()
    if len(contents) > MAX_SIZE_BYTES:
        raise HTTPException(status_code=400, detail="File too large (max 8MB).")

    try:
        result = await extract_from_document(contents, file.content_type)
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Extraction failed: {e}")

    # Normalize booleans to the "1"/"0" strings the frontend form expects.
    if isinstance(result.get("fbs"), bool):
        result["fbs"] = "1" if result["fbs"] else "0"
    if isinstance(result.get("exang"), bool):
        result["exang"] = "1" if result["exang"] else "0"

    return result
