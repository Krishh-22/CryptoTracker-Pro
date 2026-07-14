import { useNavigate } from "react-router-dom";

function CryptoRow({ coin }) {
  const navigate = useNavigate();

  return (
    <tr
      onClick={() => navigate("/coin", { state: coin })}
      className="cursor-pointer border-b border-slate-800 hover:bg-slate-900 transition"
    >
      <td className="py-4 flex items-center gap-3">
        <img
          src={coin.image}
          alt={coin.name}
          className="w-8 h-8"
        />

        <div>
          <p className="font-semibold">{coin.name}</p>
          <p className="text-slate-400 text-sm">
            {coin.symbol}
          </p>
        </div>
      </td>

      <td>{coin.price}</td>

      <td
        className={
          coin.positive
            ? "text-green-400"
            : "text-red-400"
        }
      >
        {coin.change}%
      </td>
    </tr>
  );
}

export default CryptoRow;