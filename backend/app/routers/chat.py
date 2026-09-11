from fastapi import APIRouter, HTTPException

from app.chat.gemini_chat import chat_with_assistant
from app.schemas.chat import ChatRequest, ChatResponse

router = APIRouter(prefix="/chat", tags=["chat"])

MAX_MESSAGE_LENGTH = 1000
MAX_HISTORY_TURNS = 20


@router.post("", response_model=ChatResponse)
async def chat(payload: ChatRequest):
    if len(payload.message) > MAX_MESSAGE_LENGTH:
        raise HTTPException(status_code=400, detail="Message is too long.")

    if not payload.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty.")

    history = [h.model_dump() for h in payload.history[-MAX_HISTORY_TURNS:]]
    context = payload.context.model_dump() if payload.context else None

    try:
        reply = await chat_with_assistant(payload.message, history, context)
    except RuntimeError as e:
        raise HTTPException(status_code=503, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Assistant request failed: {e}")

    return {"reply": reply}
