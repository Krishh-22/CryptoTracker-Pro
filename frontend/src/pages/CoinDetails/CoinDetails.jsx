import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import { useWatchlist } from "../../context/WatchlistContext";
import { usePortfolio } from "../../context/PortfolioContext";
import { useEffect, useState } from "react";
import api from "../../services/api";
import PriceChart from "../../components/charts/PriceChart";

function formatValue(value, prefix = "") {
  if (value === undefined || value === null) return "N/A";
  return `${prefix}${Number(value).toLocaleString()}`;
}

function CoinDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const coin = state;

  const { addToWatchlist } = useWatchlist();
  const { addToPortfolio } = usePortfolio();

  const [quantity, setQuantity] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const response = await api.get(
          `/coin/${coin.id}/history`
        );

        setHistory(response.data);

      } catch (error) {
        console.error(error);
      }
    }

    if (coin) {
      fetchHistory();
    }

  }, [coin]);

  if (!coin) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
          <h1 className="text-3xl font-bold">
            Coin not found
          </h1>
        </div>
      </>
    );
  }

  const cards = [
    {
      title: "Current Price",
      value: coin.price,
    },
    {
      title: "24h Change",
      value: `${coin.change}%`,
      color: coin.positive
        ? "text-green-400"
        : "text-red-400",
    },
    {
      title: "Market Cap",
      value: formatValue(coin.market_cap, "$"),
    },
    {
      title: "24h High",
      value: formatValue(coin.high_24h, "$"),
    },
    {
      title: "24h Low",
      value: formatValue(coin.low_24h, "$"),
    },
    {
      title: "24h Volume",
      value: formatValue(coin.volume, "$"),
    },
    {
      title: "Circulating Supply",
      value: formatValue(coin.circulating_supply),
    },
    {
      title: "Market Rank",
      value: `#${coin.rank}`,
    },
  ];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 text-white p-10">

        <button
          onClick={() => navigate("/dashboard")}
          className="mb-8 bg-slate-800 hover:bg-slate-700 px-5 py-2 rounded-lg transition"
        >
          ← Back to Dashboard
        </button>

        <div className="flex items-center gap-5 mb-10">

          <img
            src={coin.image}
            alt={coin.name}
            className="w-16 h-16"
          />

          <div>

            <h1 className="text-5xl font-bold">
              {coin.name}
            </h1>

            <p className="text-slate-400 text-xl">
              {coin.symbol}
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {cards.map((card) => (

            <div
              key={card.title}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-500 transition"
            >

              <p className="text-slate-400">
                {card.title}
              </p>

              <h2
                className={`text-2xl font-bold mt-3 ${
                  card.color || ""
                }`}
              >
                {card.value}
              </h2>

            </div>

          ))}

        </div>

        <PriceChart data={history} />

        <div className="grid md:grid-cols-2 gap-4 mt-10">

          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) =>
              setQuantity(e.target.value)
            }
            className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-3"
          />

          <input
            type="number"
            placeholder="Buy Price ($)"
            value={buyPrice}
            onChange={(e) =>
              setBuyPrice(e.target.value)
            }
            className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-3"
          />

        </div>

        <div className="flex flex-wrap gap-4 mt-8">
                  <button
            onClick={() => {
              addToWatchlist(coin);
              toast.success(`${coin.name} added to Watchlist!`);
            }}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition"
          >
            ⭐ Add to Watchlist
          </button>

          <button
            onClick={() => {
              if (!quantity || !buyPrice) {
                toast.error("Please enter Quantity and Buy Price.");
                return;
              }

              addToPortfolio(coin, quantity, buyPrice);

              toast.success(`${coin.name} added to Portfolio!`);

              setQuantity("");
              setBuyPrice("");
            }}
            className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold transition"
          >
            💼 Add to Portfolio
          </button>

          <button
            onClick={() => navigate("/watchlist")}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition"
          >
            📋 View Watchlist
          </button>

          <button
            onClick={() => navigate("/portfolio")}
            className="bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-lg font-semibold transition"
          >
            📈 View Portfolio
          </button>

        </div>

      </div>

    </>
  );
}

export default CoinDetails;