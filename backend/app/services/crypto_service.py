import httpx

COINPAPRIKA_URL = "https://api.coinpaprika.com/v1/tickers"


async def get_market_data():
    async with httpx.AsyncClient(timeout=20) as client:
        response = await client.get(COINPAPRIKA_URL)
        response.raise_for_status()

        data = response.json()[:25]

    coins = []

    for coin in data:
        quotes = coin.get("quotes", {}).get("USD", {})

        price = quotes.get("price", 0)
        change = quotes.get("percent_change_24h", 0)

        coins.append(
            {
                "id": coin["id"],
                "name": coin["name"],
                "symbol": coin["symbol"],
                "image": f"https://static.coinpaprika.com/coin/{coin['id']}/logo.png",
                "price": f"${price:,.2f}",
                "change": round(change, 2),
                "positive": change >= 0,
                "market_cap": quotes.get("market_cap"),
                "high_24h": None,
                "low_24h": None,
                "volume": quotes.get("volume_24h"),
                "circulating_supply": coin.get("circulating_supply"),
                "rank": coin.get("rank"),
            }
        )

    return coins


async def get_coin_history(coin_id: str):
    # Temporary placeholder until we wire a historical endpoint.
    # This keeps your chart component from crashing.
    return [
        {"day": "Day 1", "price": 0},
        {"day": "Day 2", "price": 0},
        {"day": "Day 3", "price": 0},
        {"day": "Day 4", "price": 0},
        {"day": "Day 5", "price": 0},
        {"day": "Day 6", "price": 0},
        {"day": "Day 7", "price": 0},
    ]