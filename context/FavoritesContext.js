import { createContext, useContext } from "react";

export const FavoritesContext = createContext({
  favoritos: [],
  addFavorito: () => {},
  removeFavorito: () => {},
});

export const useFavorites = () => useContext(FavoritesContext);