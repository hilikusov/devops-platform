from fastapi import APIRouter, Header, HTTPException
from fastapi.responses import Response
from prometheus_client import generate_latest, CONTENT_TYPE_LATEST
from app.metrics import REQUEST_COUNT

from app.database import SessionLocal
from app.models import Product
from app.security import verify_token

router = APIRouter()


@router.get("/health")
def health():
    return {"status": "healthy"}


@router.get("/metrics")
def metrics():
    return Response(generate_latest(), media_type=CONTENT_TYPE_LATEST)


@router.get("/products")
def get_products():
    db = SessionLocal()
    try:
        REQUEST_COUNT.labels(endpoint="/products_get").inc()
        products = db.query(Product).all()
        return products
    finally:
        db.close()


@router.post("/products")
def create_product(name: str, price: int, authorization: str = Header(None)):
    if authorization is None:
        raise HTTPException(status_code=401, detail="Authorization header missing")

    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")

    token = authorization.split(" ")[1]
    username = verify_token(token)

    db = SessionLocal()
    try:
        product = Product(name=name, price=price)
        db.add(product)
        db.commit()
        
        REQUEST_COUNT.labels(endpoint="/products_post").inc()

        return {
            "message": "Product created",
            "created_by": username
        }
    finally:
        db.close()
