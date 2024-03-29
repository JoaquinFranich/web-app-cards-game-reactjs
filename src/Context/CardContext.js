import { createContext, useState, useEffect, useContext } from "react";

export const CardContext = createContext({
  cards: [],
  setCards: () => {},
  loading: true,
  setLoading: () => {},
});

export const CardProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const value = { cards, setCards, loading, setLoading };

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character`)
      .then((response) => response.json())
      .then((data) => setCards(data.results))
      .then(() => setLoading(false))
      .catch((error) => console.log(error));
  }, []);
  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
};

export const useCardsCtx = () => useContext(CardContext);
