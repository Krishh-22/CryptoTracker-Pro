import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function Hero() {
  const navigate = useNavigate();
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    async function fetchCoins() {
      try {
        const response = await api.get("/market");
        setCoins(response.data.slice(0, 3));
      } catch (error) {
        console.error(error);
      }
    }

    fetchCoins();
  }, []);

  return (
    <section className="min-h-[85vh] flex items-center justify-between px-10 lg:px-24">

      {/* Left Section */}
      <div className="max-w-3xl">

        <p className="text-blue-500 font-semibold text-lg mb-4">
          🚀 Real-Time Cryptocurrency Tracking Platform
        </p>

        <h1 className="text-6xl lg:text-7xl font-extrabold leading-tight">
          Track Crypto
          <br />
          <span className="text-blue-500">
            Like a Professional
          </span>
        </h1>

        <p className="mt-8 text-xl text-slate-400 leading-8">
          Stay ahead of the crypto market with real-time prices,
          portfolio management, watchlists, and powerful analytics —
          all in one modern dashboard.
        </p>

        {/* Feature Badges */}
        <div className="grid grid-cols-2 gap-4 mt-10">

          <div className="flex items-center gap-3 text-lg">
            ✅ Live Prices
          </div>

          <div className="flex items-center gap-3 text-lg">
            ⭐ Watchlist
          </div>

          <div className="flex items-center gap-3 text-lg">
            💼 Portfolio
          </div>

          <div className="flex items-center gap-3 text-lg">
            📈 Market Analytics
          </div>

        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-5 mt-12">

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 hover:bg-blue-700 transition px-8 py-4 rounded-xl font-bold text-lg shadow-lg"
          >
            🚀 Explore Market
          </button>

          <button
            onClick={() => navigate("/portfolio")}
            className="border border-slate-600 hover:bg-slate-800 transition px-8 py-4 rounded-xl font-bold text-lg"
          >
            💼 My Portfolio
          </button>

        </div>

      </div>

      {/* Right Section */}
      <div className="hidden lg:flex flex-col gap-6">

        {coins.map((coin) => (

          <div
            key={coin.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl hover:scale-105 transition"
          >

            <div className="flex justify-between items-center">

              <div className="flex items-center gap-4">

                <img
                  src={coin.image}
                  alt={coin.name}
                  className="w-12 h-12"
                />

                <div>

                  <p className="text-slate-400">
                    {coin.name}
                  </p>

                  <h2 className="text-2xl font-bold mt-1">
                    {coin.price}
                  </h2>

                </div>

              </div>

              <span
                className={`font-bold ${
                  coin.positive
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {coin.change}%
              </span>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Hero;