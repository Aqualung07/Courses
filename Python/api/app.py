from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv

from models import ChatRequest, ChatResponse, ChatChunk
from service import ai_complete, ai_stream, AIClientError

load_dotenv()
app = FastAPI(title="AI Gateway", version="1.0.0")

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/chat", response_model=ChatResponse, tags=["chat"])
async def chat(req: ChatRequest):
    """
    Endpoint no-stream: valida con Pydantic, llama a proveedor AI y devuelve el texto completo.
    """
    payload = req.model_dump()
    payload["stream"] = False
    try:
        data = await ai_complete(payload)
        # Normaliza respuesta a tu contrato
        return ChatResponse(
            completion=data.get("completion", ""),
            model=req.model,
            usage_tokens=data.get("usage_tokens"),
        )
    except AIClientError as e:
        raise HTTPException(status_code=502, detail=str(e))

@app.post("/chat/stream", tags=["chat"])
async def chat_stream(req: ChatRequest):
    """
    Endpoint streaming: retorna texto en chunks como NDJSON o text/event-stream.
    Aquí usamos NDJSON (una línea JSON por chunk) para simplicidad.
    """
    if not req.stream:
        # fuerza stream on
        req.stream = True
    payload = req.model_dump()
    payload["stream"] = True

    async def gen():
        try:
            async for chunk in ai_stream(payload):
                # empaqueta cada token como JSON por línea
                yield ChatChunk(delta=chunk).model_dump_json() + "\n"
        except AIClientError as e:
            # Propaga un "fin de stream" con error semántico si quieres
            yield ChatChunk(delta=f"[STREAM_ERROR] {e}").model_dump_json() + "\n"

    return StreamingResponse(gen(), media_type="application/x-ndjson")
