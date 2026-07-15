import httpx

COINGECKO_URL = "https://api.coingecko.com/api/v3/coins/markets"


async def get_market_data():
    params = {
        "vs_currency": "usd",
        "order": "market_cap_desc",
        "per_page": 25,
        "page": 1,
        "sparkline": False,
    }

    try:
        async with httpx.AsyncClient(timeout=20) as client:
            response = await client.get(
                COINGECKO_URL,
                params=params,
                headers={
                    "User-Agent": "CryptoTracker-Pro"
                },
            )

            print("Status Code:", response.status_code)

            response.raise_for_status()

            data = response.json()

    except Exception as e:
        print("CoinGecko Error:", str(e))
        return {
            "error": str(e)
        }

    coins = []

    for coin in data:
        coins.append(
            {
                "id": coin["id"],
                "name": coin["name"],
                "symbol": coin["symbol"].upper(),
                "image": coin["image"],
                "price": f"${coin['current_price']:,.2f}",
                "change": round(
                    coin.get("price_change_percentage_24h") or 0,
                    2,
                ),
                "positive": (
                    coin.get("price_change_percentage_24h") or 0
                ) >= 0,
                "market_cap": coin.get("market_cap"),
                "high_24h": coin.get("high_24h"),
                "low_24h": coin.get("low_24h"),
                "volume": coin.get("total_volume"),
                "circulating_supply": coin.get("circulating_supply"),
                "rank": coin.get("market_cap_rank"),
            }
        )

    return coins


async def get_coin_history(coin_id: str):
    url = (
        f"https://api.coingecko.com/api/v3/coins/"
        f"{coin_id}/market_chart"
    )

    params = {
        "vs_currency": "usd",
        "days": 7,
    }

    async with httpx.AsyncClient(timeout=20) as client:
        response = await client.get(
            url,
            params=params,
        )

        response.raise_for_status()

        data = response.json()

    prices = data["prices"]

    history = []

    step = max(1, len(prices) // 7)

    for i, price in enumerate(prices[::step][:7]):
        history.append(
            {
                "day": f"Day {i + 1}",
                "price": round(price[1], 2),
            }
        )

    return history