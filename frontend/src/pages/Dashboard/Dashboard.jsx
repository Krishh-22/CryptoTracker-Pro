import { useEffect, useState } from "react";
import api from "../../services/api";
import SearchBar from "../../components/dashboard/SearchBar";
import CryptoTable from "../../components/dashboard/CryptoTable";
import Navbar from "../../components/layout/Navbar";

function Dashboard() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");

    async function fetchCoins() {
      try {
        setLoading(true);
        setError(false);

        const response = await api.get("/market");
        setCoins(response.data);
        setLastUpdated(new Date().toLocaleTimeString());

      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    useEffect(() => {
      fetchCoins();

      const interval = setInterval(() => {
        fetchCoins();
      }, 30000);
      return () => clearInterval(interval);
    }, []);

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const gainers = coins.filter((coin) => coin.positive).length;
  const losers = coins.length - gainers;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <h2 className="text-white text-2xl font-bold mt-6">
            Loading Live Market...
          </h2>

          <p className="text-slate-400 mt-2">
            Fetching latest cryptocurrency prices...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center">

        <h1 className="text-4xl font-bold text-red-400">
          ⚠️ Unable to load market data
        </h1>

        <p className="text-slate-400 mt-3">
          Please check your internet connection or try again.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="mt-8 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl"
        >
          🔄 Retry
        </button>

      </div>
    );
  }

  return (
    <>
      <Navbar />

    <div className="min-h-screen bg-slate-950 text-white p-10">

      <div className="mb-8">
        <h1 className="text-5xl font-extrabold">
          📊 Live Cryptocurrency Dashboard
        </h1>

        <p className="text-slate-400 mt-3 text-lg">
          Track live prices, monitor trends, and manage your crypto portfolio.
        </p>

        <p className="text-green-400 mt-3 font-medium">
          🟢 Live Market • Last Updated: {lastUpdated}
        </p>

        <p className="text-slate-500 text-sm mt-1">
          🔄 Refreshes automatically every 30 seconds
        </p>
      </div>

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 hover:border-blue-500 transition">
          <p className="text-slate-400">🪙 Total Coins</p>
          <h2 className="text-3xl font-bold mt-2">
            {coins.length}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 hover:border-green-500 transition">
          <p className="text-slate-400">🟢 Gainers</p>
          <h2 className="text-3xl font-bold text-green-400 mt-2">
            {gainers}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 hover:border-red-500 transition">
          <p className="text-slate-400">🔴 Losers</p>
          <h2 className="text-3xl font-bold text-red-400 mt-2">
            {losers}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 hover:border-yellow-500 transition">
          <p className="text-slate-400">📡 Market Status</p>
          <h2 className="text-3xl font-bold text-green-400 mt-2">
            LIVE
          </h2>
        </div>

      </div>

      <CryptoTable
        coins={filteredCoins}
      />

    </div>
    </>
  );
}

export default Dashboard;