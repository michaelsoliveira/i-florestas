# config.py
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str="postgresql://postgres:postgres@localhost:5433/bomanejo?options=-csearch_path%3Dpublic"   # default value if env variable does not exist
    APP_MAX: int=100 # default value if env variable does not exist

# global instance
settings = Settings()