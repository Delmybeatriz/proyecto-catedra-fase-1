import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";


const FavoritesContext = createContext();

const FAVORITES_KEY = "@favoritos";


export const FavoritesProvider = ({ children }) => {

  const [favoritos, setFavoritos] = useState([]);


  // CARGAR FAVORITOS AL ABRIR APP
  useEffect(() => {
    loadFavorites();
  }, []);


  const loadFavorites = async () => {

    try {

      const data =
        await AsyncStorage.getItem(FAVORITES_KEY);

      if (data) {
        setFavoritos(JSON.parse(data));
      }

    } catch (error) {

      console.log(error);
    }
  };


  // GUARDAR FAVORITOS
  const saveFavorites = async (data) => {

    try {

      await AsyncStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(data)
      );

    } catch (error) {

      console.log(error);
    }
  };


  // AGREGAR FAVORITO
  const addFavorito = async (movie) => {

    const exists = favoritos.find(
      item => item.id === movie.id
    );

    if (exists) return;

    const updated = [...favoritos, movie];

    setFavoritos(updated);

    await saveFavorites(updated);
  };


  // ELIMINAR FAVORITO
  const removeFavorito = async (id) => {

    const updated = favoritos.filter(
      item => item.id !== id
    );

    setFavoritos(updated);

    await saveFavorites(updated);
  };


  return (

    <FavoritesContext.Provider
      value={{
        favoritos,
        addFavorito,
        removeFavorito
      }}
    >

      {children}

    </FavoritesContext.Provider>
  );
};


export const useFavorites = () =>
  useContext(FavoritesContext);