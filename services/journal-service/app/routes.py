from fastapi import APIRouter, Header, HTTPException
from fastapi.responses import Response
from prometheus_client import generate_latest, CONTENT_TYPE_LATEST

from app.database import SessionLocal
from app.models import JournalEntry
from app.security import verify_token
from app.metrics import REQUEST_COUNT

router = APIRouter()


@router.get("/health")
def health():
    return {"status": "healthy"}


@router.get("/metrics")
def metrics():
    return Response(generate_latest(), media_type=CONTENT_TYPE_LATEST)


@router.get("/entries")
def get_entries(authorization: str = Header(None)):
    if authorization is None:
        raise HTTPException(status_code=401, detail="Authorization header missing")

    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")

    token = authorization.split(" ")[1]
    username = verify_token(token)

    db = SessionLocal()
    try:
        REQUEST_COUNT.labels(endpoint="/entries_get").inc()
        entries = (
            db.query(JournalEntry)
            .filter(JournalEntry.user_id == username)
            .order_by(JournalEntry.created_at.desc())
            .all()
        )
        return entries
    finally:
        db.close()


@router.get("/entries/{entry_id}")
def get_entry(entry_id: int, authorization: str = Header(None)):
    if authorization is None:
        raise HTTPException(status_code=401, detail="Authorization header missing")

    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")

    token = authorization.split(" ")[1]
    username = verify_token(token)

    db = SessionLocal()
    try:
        entry = db.query(JournalEntry).filter(JournalEntry.id == entry_id).first()

        if not entry:
            raise HTTPException(status_code=404, detail="Entry not found")

        if entry.user_id != username:
            raise HTTPException(status_code=403, detail="Not allowed to access this entry")

        return entry
    finally:
        db.close()


@router.post("/entries")
def create_entry(
    title: str,
    content: str,
    mood_score: int,
    mood_label: str,
    authorization: str = Header(None)
):
    if authorization is None:
        raise HTTPException(status_code=401, detail="Authorization header missing")

    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")

    token = authorization.split(" ")[1]
    username = verify_token(token)

    db = SessionLocal()
    try:
        entry = JournalEntry(
            user_id=username,
            title=title,
            content=content,
            mood_score=mood_score,
            mood_label=mood_label
        )

        db.add(entry)
        db.commit()
        db.refresh(entry)

        REQUEST_COUNT.labels(endpoint="/entries_post").inc()

        return {
            "message": "Journal entry created",
            "entry_id": entry.id,
            "created_by": username
        }
    finally:
        db.close()


@router.put("/entries/{entry_id}")
def update_entry(
    entry_id: int,
    title: str,
    content: str,
    mood_score: int,
    mood_label: str,
    authorization: str = Header(None)
):
    if authorization is None:
        raise HTTPException(status_code=401, detail="Authorization header missing")

    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")

    token = authorization.split(" ")[1]
    username = verify_token(token)

    db = SessionLocal()
    try:
        entry = db.query(JournalEntry).filter(JournalEntry.id == entry_id).first()

        if not entry:
            raise HTTPException(status_code=404, detail="Entry not found")

        if entry.user_id != username:
            raise HTTPException(status_code=403, detail="Not allowed to update this entry")

        entry.title = title
        entry.content = content
        entry.mood_score = mood_score
        entry.mood_label = mood_label

        db.commit()

        REQUEST_COUNT.labels(endpoint="/entries_put").inc()

        return {"message": "Journal entry updated"}
    finally:
        db.close()


@router.delete("/entries/{entry_id}")
def delete_entry(entry_id: int, authorization: str = Header(None)):
    if authorization is None:
        raise HTTPException(status_code=401, detail="Authorization header missing")

    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")

    token = authorization.split(" ")[1]
    username = verify_token(token)

    db = SessionLocal()
    try:
        entry = db.query(JournalEntry).filter(JournalEntry.id == entry_id).first()

        if not entry:
            raise HTTPException(status_code=404, detail="Entry not found")

        if entry.user_id != username:
            raise HTTPException(status_code=403, detail="Not allowed to delete this entry")

        db.delete(entry)
        db.commit()

        REQUEST_COUNT.labels(endpoint="/entries_delete").inc()

        return {"message": "Journal entry deleted"}
    finally:
        db.close()