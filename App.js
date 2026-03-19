import React, { useState } from "react";
import SplashScreen from "./components/SplashScreen";
import HomeScreen from "./components/HomeScreen";
import DetailScreen from "./components/DetailScreen";
import ProfileScreen from "./components/ProfileScreen"; 
import LoginScreen from "./components/Prin"; 
import FavoritosScreen from "./components/FavoritosScreen";
import NotificacionesScreen from "./components/NotificacionesScreen";

export default function App() {
  const [screen, setScreen] = useState("splash");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favoritos, setFavoritos] = useState([]);

  const addFavorito = (movie) => {
    if (!favoritos.some(fav => fav.id === (movie.id || movie.name))) {
      setFavoritos([...favoritos, movie]);
    }
  };

  const removeFavorito = (id) => {
    setFavoritos(favoritos.filter(fav => (fav.id || fav.name) !== id));
  };

  if (screen === "splash") return <SplashScreen setScreen={setScreen} />;
  if (screen === "profile") return <LoginScreen setScreen={setScreen} />;
  if (screen === "home") return <HomeScreen setScreen={setScreen} setSelectedMovie={setSelectedMovie} />;
  if (screen === "detail") return <DetailScreen setScreen={setScreen} movie={selectedMovie} addFavorito={addFavorito} />;
  if (screen === "user") return <ProfileScreen setScreen={setScreen} />;
  if (screen === "favoritos") return <FavoritosScreen setScreen={setScreen} favoritos={favoritos} removeFavorito={removeFavorito} />;
  if (screen === "notificaciones") return <NotificacionesScreen setScreen={setScreen} />;

  return null;
}