import { useWatchlist } from "../../context/WatchlistContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";

function Watchlist() {
  const { watchlist, removeFromWatchlist } = useWatchlist();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-6 bg-slate-800 px-4 py-2 rounded-lg"
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold mb-8">
        ⭐ Favourite Cryptocurrencies
      </h1>

      {watchlist.length === 0 ? (
        <div className="bg-slate-900 rounded-xl p-12 text-center border border-slate-800">

          <div className="text-6xl mb-4">
            ⭐
          </div>

          <h2 className="text-3xl font-bold">
            Watchlist is Empty
          </h2>

          <p className="text-slate-400 mt-3">
            Add your favourite cryptocurrencies to monitor them quickly.
          </p>

          <button
            onClick={() => navigate("/dashboard")}
            className="mt-8 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
          >
            Explore Market
          </button>

        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {watchlist.map((coin) => (
            <div
              key={coin.id}
              className="bg-slate-900 p-6 rounded-xl"
            >
              <div className="flex items-center gap-4">
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="w-10 h-10"
                />

                <div>
                  <h2 className="font-bold">{coin.name}</h2>
                  <p className="text-slate-400">{coin.symbol}</p>
                </div>
              </div>

              <p className="text-2xl font-bold mt-6">
                {coin.price}
              </p>

              <button
                onClick={() => removeFromWatchlist(coin.id)}
                className="mt-6 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Watchlist;