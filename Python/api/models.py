from pydantic import BaseModel, Field, ConfigDict, field_validator
from typing import Literal, Optional, List

class ChatMessage(BaseModel):
    role: Literal["user", "system", "assistant"]
    content: str = Field(min_length=1, max_length=8000)

class ChatRequest(BaseModel):
    model: str = Field(default="gpt-4o-mini")
    messages: List[ChatMessage]
    temperature: float = Field(default=0.2, ge=0.0, le=1.0)
    stream: bool = False

    @field_validator("messages")
    @classmethod
    def must_have_user(cls, v):
        if not any(m.role == "user" for m in v):
            raise ValueError("At least one 'user' message is required.")
        return v

class ChatChunk(BaseModel):
    """One streamed token/chunk."""
    delta: str

class ChatResponse(BaseModel):
    model_config = ConfigDict(strict=True)
    completion: str
    model: str
    usage_tokens: Optional[int] = None
