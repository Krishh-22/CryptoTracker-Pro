import { usePortfolio } from "../../context/PortfolioContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, } from "recharts";

function Portfolio() {
  const { portfolio, removeFromPortfolio } = usePortfolio();
  const navigate = useNavigate();
  const totalInvestment = portfolio.reduce(
    (total, coin) => total + coin.quantity * coin.buyPrice,0);

  const totalCurrentValue = portfolio.reduce((total, coin) => {
    const currentPrice = Number(
      coin.price.replace("$", "").replace(/,/g, ""));

    return total + coin.quantity * currentPrice;}, 0);

  const totalProfit = totalCurrentValue - totalInvestment;

  const chartData = portfolio.map((coin) => ({
    name: coin.symbol,
    value:
      coin.quantity *
      Number(
        coin.price.replace("$", "").replace(/,/g, "")
      ),
  }));

  const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
    "#EC4899",
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-6 bg-slate-800 px-4 py-2 rounded-lg"
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold mb-8">
        💼 My Portfolio
      </h1>

      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <p className="text-slate-400">Total Investment</p>

          <h2 className="text-3xl font-bold mt-2">
            ${totalInvestment.toFixed(2)}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <p className="text-slate-400">Current Value</p>

          <h2 className="text-3xl font-bold mt-2">
            ${totalCurrentValue.toFixed(2)}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <p className="text-slate-400">Profit / Loss</p>

          <h2
            className={`text-3xl font-bold mt-2 ${
              totalProfit >= 0
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            ${totalProfit.toFixed(2)}
          </h2>
        </div>

      </div>

      {portfolio.length > 0 && (
        <div className="bg-slate-900 rounded-xl p-8 border border-slate-800 mb-10">

          <h2 className="text-3xl font-bold mb-6">
            🥧 Portfolio Allocation
          </h2>

          <ResponsiveContainer
            width="100%"
            height={400}
          >
            <PieChart>

              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={140}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>
          </ResponsiveContainer>

        </div>
      )}

      {portfolio.length === 0 ? (
        <div className="bg-slate-900 rounded-xl p-12 text-center border border-slate-800">

          <div className="text-6xl mb-4">
            💼
          </div>

          <h2 className="text-3xl font-bold">
            Portfolio is Empty
          </h2>

          <p className="text-slate-400 mt-3">
            Add cryptocurrencies from the dashboard to start tracking your investments.
          </p>

          <button
            onClick={() => navigate("/dashboard")}
            className="mt-8 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
          >
            Go to Dashboard
          </button>

        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolio.map((coin) => (
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

                <p className="mt-4">
                    <strong>Quantity:</strong> {coin.quantity}
                </p>

                <p>
                    <strong>Buy Price:</strong> ${coin.buyPrice}
                </p>

                <p>
                    <strong>Current Price:</strong> {coin.price}
                </p>

                <p className="mt-4 text-lg font-bold">

                    Investment: $

                    {(coin.quantity * coin.buyPrice).toFixed(2)}

                </p>

                <p className="font-bold mt-2">

                  Current Value: $

                  {(
                    coin.quantity *
                    Number(
                      coin.price.replace("$", "").replace(/,/g, "")
                    )
                  ).toFixed(2)}

                </p>

                <p
                  className={`font-bold mt-2 ${
                    (
                      coin.quantity *
                      Number(
                        coin.price.replace("$", "").replace(/,/g, "")
                      ) -
                      coin.quantity * coin.buyPrice
                    ) >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  Profit/Loss: $

                  {(
                    coin.quantity *
                      Number(
                        coin.price.replace("$", "").replace(/,/g, "")
                      ) -
                    coin.quantity * coin.buyPrice
                  ).toFixed(2)}
                </p>

              <button
                onClick={() => removeFromPortfolio(coin.id)}
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

export default Portfolio;