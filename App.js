import React, { useMemo, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import { FavoritesContext } from "./context/FavoritesContext";

export default function App() {
  const [favoritos, setFavoritos] = useState([]);

  const addFavorito = (movie) => {
    setFavoritos((current) => {
      const movieId = movie.id ?? movie.name;

      if (current.some((fav) => (fav.id ?? fav.name) === movieId)) {
        return current;
      }

      return [...current, movie];
    });
  };

  const removeFavorito = (id) => {
    setFavoritos((current) => current.filter((fav) => (fav.id ?? fav.name) !== id));
  };

  const favoritesValue = useMemo(() => ({ favoritos, addFavorito, removeFavorito }), [favoritos]);

  return (
    <FavoritesContext.Provider value={favoritesValue}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </FavoritesContext.Provider>
  );
}