import { useEffect, useState } from "react";
import api from "../../services/api";

function MarketOverview() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    async function fetchMarket() {
  try {
    console.log("Fetching market...");
    const response = await api.get("/market");
    console.log("Response:", response.data);
    setCoins(response.data);
  } catch (error) {
    console.error("FULL ERROR:", error);
  }
}

    fetchMarket();
  }, []);

  return (
    <section className="py-16 px-8">
      <h2 className="text-4xl font-bold text-center mb-12">
        Live Market Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {coins.map((coin) => (
  <div
    key={coin.id}
    className="group bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 border border-slate-800 hover:border-blue-500 hover:-translate-y-2 transition-all duration-300 shadow-lg"
  >
    <div className="flex justify-between items-center">

      <div className="flex items-center gap-4">

        <img
          src={coin.image}
          alt={coin.name}
          className="w-12 h-12"
        />

        <div>
          <h3 className="font-bold text-xl">
            {coin.name}
          </h3>

          <p className="text-slate-400">
            {coin.symbol}
          </p>
        </div>

      </div>

      <span
        className={`font-semibold ${
          coin.positive
            ? "text-green-400"
            : "text-red-400"
        }`}
      >
        {coin.change}
      </span>

    </div>

    <div className="mt-8">

      <p className="text-3xl font-bold">
        {coin.price}
      </p>

      <p className="text-slate-500 mt-2">
        Live Market Price
      </p>

    </div>

  </div>
))}
      </div>
    </section>
  );
}

export default MarketOverview;