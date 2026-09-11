from typing import Literal, Optional

from pydantic import BaseModel


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str


class ChatContext(BaseModel):
    risk_probability: float
    risk_label: str
    top_factors: list[dict] = []


class ChatRequest(BaseModel):
    message: str
    history: list[ChatMessage] = []
    context: Optional[ChatContext] = None


class ChatResponse(BaseModel):
    reply: str
