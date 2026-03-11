from fastapi import FastAPI
from app.routes import router
from app.database import engine
from app.models import Base
import time

app = FastAPI(title="Auth Service")

for attempt in range(10):
    try:
        Base.metadata.create_all(bind=engine)
        print("Database connected and tables created.")
        break
    except Exception as e:
        print(f"Database not ready yet, retrying... ({attempt + 1}/10)")
        time.sleep(2)
else:
    raise Exception("Could not connect to the database after several attempts.")

app.include_router(router)
