from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

def test_health():
    r = client.get("/health")
    assert r.status_code == 200
    assert r.json()["status"] == "ok"

def test_chat_validation():
    # Falta user → debe fallar
    payload = {"model": "gpt-4o-mini", "messages": [{"role": "system", "content": "hi"}]}
    r = client.post("/chat", json=payload)
    assert r.status_code == 422  # Pydantic validation error

def test_chat_ok(monkeypatch):
    # Mock ai_complete
    async def fake_complete(payload):
        return {"completion": "Hello Pablo!", "usage_tokens": 42}

    from service import ai_complete
    monkeypatch.setattr("service.ai_complete", fake_complete)

    payload = {
        "model": "gpt-4o-mini",
        "messages": [{"role":"user","content":"Say hello"}],
        "temperature": 0.1,
        "stream": False
    }
    r = client.post("/chat", json=payload)
    assert r.status_code == 200
    data = r.json()
    assert data["completion"] == "Hello Pablo!"
    assert data["usage_tokens"] == 42
