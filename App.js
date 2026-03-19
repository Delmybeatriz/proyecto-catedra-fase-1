import React, { useState } from "react";

import SplashScreen from "./components/SplashScreen";
import HomeScreen from "./components/HomeScreen";
import DetailScreen from "./components/DetailScreen";

import ProfileScreen from "./components/ProfileScreen"; // 👤 PERFIL
import LoginScreen from "./components/Prin"; // 🔐 LOGIN

import FavoritosScreen from "./components/FavoritosScreen";
import NotificacionesScreen from "./components/NotificacionesScreen";

export default function App() {

  const [screen, setScreen] = useState("splash");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [favoritos, setFavoritos] = useState([]);

  const addFavorito = (movie) => {
    if (!favoritos.some(fav => fav.id === movie.id)) {
      setFavoritos([...favoritos, movie]);
    }
  };

  // 🔥 🔥 NUEVO (ELIMINAR FAVORITO)
  const removeFavorito = (id) => {
    setFavoritos(favoritos.filter(fav => fav.id !== id));
  };

  // 🔥 SPLASH
  if (screen === "splash") {
    return <SplashScreen setScreen={setScreen} />;
  }

  // 🔐 LOGIN
  if (screen === "profile") {
    return <LoginScreen setScreen={setScreen} />;
  }

  // 🏠 HOME
  if (screen === "home") {
    return (
      <HomeScreen
        setScreen={setScreen}
        setSelectedMovie={setSelectedMovie}
      />
    );
  }

  // 🎬 DETALLE
  if (screen === "detail") {
    return (
      <DetailScreen
        setScreen={setScreen}
        movie={selectedMovie}
        addFavorito={addFavorito}
      />
    );
  }

  // 👤 PERFIL (usuario real)
  if (screen === "user") {
    return <ProfileScreen setScreen={setScreen} />;
  }

  // ⭐ FAVORITOS
  if (screen === "favoritos") {
    return (
      <FavoritosScreen
        setScreen={setScreen}
        favoritos={favoritos}
        removeFavorito={removeFavorito} // 🔥 AQUÍ
      />
    );
  }

  // 🔔 NOTIFICACIONES
  if (screen === "notificaciones") {
    return <NotificacionesScreen setScreen={setScreen} />;
  }
}