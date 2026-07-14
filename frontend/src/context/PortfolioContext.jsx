import { createContext, useContext, useEffect, useState } from "react";

const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
  const [portfolio, setPortfolio] = useState(() => {
    const saved = localStorage.getItem("portfolio");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("portfolio", JSON.stringify(portfolio));
  }, [portfolio]);

  function addToPortfolio(coin, quantity, buyPrice) {
    const existing = portfolio.find((item) => item.id === coin.id);

    if (existing) {
      alert("Coin already exists in Portfolio.");
      return;
    }

    setPortfolio([
      ...portfolio,
      {
        ...coin,
        quantity: Number(quantity),
        buyPrice: Number(buyPrice),
      },
    ]);
  }

  function removeFromPortfolio(id) {
    setPortfolio(portfolio.filter((coin) => coin.id !== id));
  }

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        addToPortfolio,
        removeFromPortfolio,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}