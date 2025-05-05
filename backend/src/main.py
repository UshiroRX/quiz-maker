from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from auth.router import router as auth_router
from quizzes.router import router as quiz_router
import os

@asynccontextmanager
async def lifespan(app: FastAPI):
    yield  

app = FastAPI(lifespan=lifespan, title="QuizAru API")

origins = os.getenv("FRONTEND_URLS", "http://localhost:4200,http://127.0.0.1:4200,http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,  
    allow_methods=["*"],  
    allow_headers=["*"],  
)


app.include_router(auth_router)
app.include_router(quiz_router)


@app.get("/")
async def root():
    return {
        "mes" : "ok"
    }

