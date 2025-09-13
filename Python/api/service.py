import os
import httpx
from typing import AsyncGenerator, Dict, Any, Optional

AI_API_BASE = os.getenv("AI_API_BASE", "http://localhost:8001")  # mock local optional
AI_API_KEY = os.getenv("AI_API_KEY", "dev_key")
REQUEST_TIMEOUT = float(os.getenv("REQUEST_TIMEOUT_SECONDS", "10"))

HEADERS = {"Authorization": f"Bearer {AI_API_KEY}", "Content-Type": "application/json"}

class AIClientError(Exception):
    pass

async def ai_complete(payload: Dict[str, Any]) -> Dict[str, Any]:
    """
    Llamada NO streaming a un proveedor AI (simulada).
    Retorna JSON con { "completion": "...", "usage_tokens": 123 }
    """
    async with httpx.AsyncClient(timeout=REQUEST_TIMEOUT) as client:
        try:
            resp = await client.post(f"{AI_API_BASE}/v1/complete", json=payload, headers=HEADERS)
            if resp.status_code >= 400:
                raise AIClientError(f"AI provider error {resp.status_code}: {resp.text}")
            return resp.json()
        except httpx.TimeoutException as e:
            raise AIClientError(f"AI provider timeout: {e}") from e
        except httpx.HTTPError as e:
            raise AIClientError(f"AI provider network error: {e}") from e

async def ai_stream(payload: Dict[str, Any]) -> AsyncGenerator[str, None]:
    """
    Streaming SSE-like: devuelve tokens/chunks de texto.
    Simulación: el endpoint devuelve NDJSON o text/event-stream.
    """
    async with httpx.AsyncClient(timeout=None) as client:
        try:
            async with client.stream("POST", f"{AI_API_BASE}/v1/stream", json=payload, headers=HEADERS) as resp:
                if resp.status_code >= 400:
                    body = await resp.aread()
                    raise AIClientError(f"AI provider error {resp.status_code}: {body!r}")
                async for line in resp.aiter_lines():
                    if not line:
                        continue
                    # Asumimos un formato simple tipo "data: chunk"
                    if line.startswith("data:"):
                        yield line[len("data:"):].strip()
        except httpx.HTTPError as e:
            raise AIClientError(f"AI provider stream error: {e}") from e
