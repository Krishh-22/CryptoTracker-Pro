const stats = [
  {
    id: 1,
    value: "$3.9T",
    label: "Global Market Cap",
  },
  {
    id: 2,
    value: "17K+",
    label: "Cryptocurrencies",
  },
  {
    id: 3,
    value: "1,200+",
    label: "Exchanges",
  },
  {
    id: 4,
    value: "24/7",
    label: "Live Market Data",
  },
];

function StatsBar() {
  return (
    <section className="px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">

        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center hover:border-blue-500 transition duration-300"
          >
            <h2 className="text-3xl font-bold text-blue-500">
              {stat.value}
            </h2>

            <p className="text-slate-400 mt-2">
              {stat.label}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
}

export default StatsBar;