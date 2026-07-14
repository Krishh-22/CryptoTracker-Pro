import CryptoRow from "./CryptoRow";

function CryptoTable({ coins }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">

        <thead className="border-b border-slate-700">

          <tr>

            <th className="pb-4">Coin</th>

            <th className="pb-4">Price</th>

            <th className="pb-4">24h</th>

          </tr>

        </thead>

        <tbody>

          {coins.length > 0 ? (

            coins.map((coin) => (
              <CryptoRow
                key={coin.id}
                coin={coin}
              />
            ))

          ) : (

            <tr>

              <td
                colSpan="3"
                className="py-16 text-center"
              >

                <h2 className="text-2xl font-bold">
                  🔍 No cryptocurrencies found
                </h2>

                <p className="text-slate-400 mt-2">
                  Try searching for Bitcoin, Ethereum, Solana...
                </p>

              </td>

            </tr>

          )}

        </tbody>

      </table>
    </div>
  );
}

export default CryptoTable;