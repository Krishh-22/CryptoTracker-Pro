function SearchBar({ search, setSearch }) {
  return (
    <div className="mb-8">
      <input
        type="text"
        placeholder="🔍 Search Bitcoin, Ethereum..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-5 py-4 text-white outline-none focus:border-blue-500"
      />
    </div>
  );
}

export default SearchBar;