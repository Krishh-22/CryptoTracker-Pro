from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.market import router as market_router

app = FastAPI(
    title="Cryptocurrency Tracker API",
    version="1.0.0",
    description="Backend API for Cryptocurrency Tracker",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(market_router)


@app.get("/")
def root():
    return {
        "message": "Backend Connected Successfully",
        "status": "running",
    }