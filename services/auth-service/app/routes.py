from fastapi import APIRouter, HTTPException
from fastapi.responses import Response
from prometheus_client import generate_latest, CONTENT_TYPE_LATEST
from sqlalchemy.exc import IntegrityError
from app.metrics import REQUEST_COUNT

from app.database import SessionLocal
from app.models import User
from app.security import hash_password, verify_password, create_access_token

router = APIRouter()


@router.get("/health")
def health():
    return {"status": "healthy"}


@router.get("/metrics")
def metrics():
    return Response(generate_latest(), media_type=CONTENT_TYPE_LATEST)


@router.post("/register")
def register(username: str, password: str):
    db = SessionLocal()
    try:
        hashed = hash_password(password)
        user = User(username=username, password=hashed)

        db.add(user)
        db.commit()

        REQUEST_COUNT.labels(endpoint="/register").inc()

        return {"message": "User created"}
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Username already exists")
    finally:
        db.close()


@router.post("/login")
def login(username: str, password: str):
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.username == username).first()

        if not user:
            raise HTTPException(status_code=401, detail="Invalid username or password")

        if not verify_password(password, user.password):
            raise HTTPException(status_code=401, detail="Invalid username or password")

        REQUEST_COUNT.labels(endpoint="/login").inc()

        token = create_access_token({"sub": username})

        return {"access_token": token, "token_type": "bearer"}
    finally:
        db.close()
