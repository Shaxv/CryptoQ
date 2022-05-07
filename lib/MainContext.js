
import { createContext, useContext, useEffect, useState } from "react";

const Main = createContext();

const MainContext = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  return (
    <Main.Provider value={{ currency, setCurrency, symbol }}>
      {children}
    </Main.Provider>
  );
};

export default MainContext;

export const CryptoState = () => {
  return useContext(Main);
};