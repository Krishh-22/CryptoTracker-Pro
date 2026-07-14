import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/landing/Hero";
import StatsBar from "../../components/landing/StatsBar";
import MarketOverview from "../../components/landing/MarketOverview";
import Footer from "../../components/layout/Footer";

function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      <Navbar />
      <Hero />
      <StatsBar />
      <MarketOverview />
      <Footer />
    </div>
  );
}

export default Landing;