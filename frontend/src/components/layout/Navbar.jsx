import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const navLink = (path) =>
    `transition font-medium ${
      location.pathname === path
        ? "text-blue-400"
        : "text-slate-300 hover:text-white"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

        <Link
          to="/"
          className="text-2xl font-bold text-blue-500"
        >
          🪙 CryptoTracker Pro
        </Link>

        <div className="flex items-center gap-8">
          <Link to="/" className={navLink("/")}>
            Home
          </Link>

          <Link to="/dashboard" className={navLink("/dashboard")}>
            Dashboard
          </Link>

          <Link to="/watchlist" className={navLink("/watchlist")}>
            Watchlist
          </Link>

          <Link to="/portfolio" className={navLink("/portfolio")}>
            Portfolio
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;