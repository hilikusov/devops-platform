import os

class Settings:
    APP_NAME = "auth-service"
    JWT_SECRET = os.getenv("JWT_SECRET", "dev-secret")
    LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")

settings = Settings()
