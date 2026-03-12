from fastapi import FastAPI
from app.routes import router
from app.database import engine
from app.models import Base
import time

app = FastAPI(title="Journal Service")

for attempt in range(10):
    try:
        Base.metadata.create_all(bind=engine)
        break
    except Exception:
        time.sleep(2)

app.include_router(router)