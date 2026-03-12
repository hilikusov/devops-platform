from jose import jwt, JWTError
from fastapi import HTTPException

SECRET_KEY = "super-secret-key"
ALGORITHM = "HS256"


def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")

        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")

        return username
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")