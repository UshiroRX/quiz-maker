
import os
from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv()

class Settings(BaseSettings):
    DEBUG: bool = os.getenv("DEBUG", "False").lower() == "true"
    DATABASE_URL: str = os.getenv("DATABASE_URL") 
    SECRET_KEY: str = os.getenv("SECRET_KEY")        

    class Config:
        env_file = ".env"  

settings = Settings()
