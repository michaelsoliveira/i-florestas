# config.py
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    class Config:
        env_file = ".env"
        extra = 'ignore'


# global instance
settings = Settings()