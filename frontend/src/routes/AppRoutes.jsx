import { BrowserRouter, Routes, Route } from "react-router-dom";
import Watchlist from "../pages/Watchlist/Watchlist";
import Landing from "../pages/Landing/Landing";
import Dashboard from "../pages/Dashboard/Dashboard";
import CoinDetails from "../pages/CoinDetails/CoinDetails";
import Portfolio from "../pages/Portfolio/Portfolio";
import NotFound from "../pages/NotFound/NotFound";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/coin" element={<CoinDetails />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;