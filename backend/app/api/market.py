from fastapi import APIRouter

from app.services.crypto_service import (
    get_market_data,
    get_coin_history,
    )

router = APIRouter(prefix="", tags=["Market"])


@router.get("/market")
async def market():
    return await get_market_data()

@router.get("/coin/{coin_id}/history")
async def coin_history(coin_id: str):
    return await get_coin_history(coin_id)