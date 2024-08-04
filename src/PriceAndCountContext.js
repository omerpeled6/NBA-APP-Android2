import { createContext, useState } from 'react';

const PriceAndCountType = createContext();

const PriceAndCountContext = ({ children }) => {
  const [price, setPrice] = useState(0);
  const [countPlayer, setCountPlayer] = useState(0);

  return (
    <PriceAndCountType.Provider
      value={{ price, setPrice, countPlayer, setCountPlayer }}
    >
      {children}
    </PriceAndCountType.Provider>
  );
};

export { PriceAndCountType, PriceAndCountContext };
