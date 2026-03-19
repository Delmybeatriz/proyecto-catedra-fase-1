import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function DetailScreen({ setScreen, movie, addFavorito }) {

  if (!movie) return null;

  return (
    <View style={styles.container}>

      {/* 🔥 IMAGEN DE LA PELÍCULA */}
      <Image 
        source={movie.poster_path ? { uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` } : movie.img} 
        style={styles.poster} 
      />

      <Text style={styles.title}>{movie.name || movie.title}</Text>
      <Text style={styles.overview}>{movie.overview}</Text>

      <Text style={styles.info}>⭐ {movie.vote_average || movie.rating}</Text>
      {movie.genres && <Text style={styles.info}>{movie.genres}</Text>}

      <TouchableOpacity
        style={styles.favorite}
        onPress={() => addFavorito(movie)}
      >
        <Text style={styles.favoriteText}>❤️ Agregar a favoritos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.play}>
        <Text style={styles.playText}>▶ Reproducir</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setScreen("home")}>
        <Text style={styles.back}>Volver</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20,
    backgroundColor: "#85929E"
  },

  poster: {
    width: "100%",
    height: 220,
    borderRadius: 10,
    marginBottom: 20
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10
  },

  overview: {
    color: "white",
    marginBottom: 10,
    textAlign: 'justify'
  },

  info: {
    color: "white",
    marginBottom: 5
  },

  favorite: {
    marginTop: 15,
    padding: 12,
    backgroundColor: "#566573",
    borderRadius: 8,
    alignItems: "center"
  },

  favoriteText: {
    fontSize: 16,
    color: "white"
  },

  play: {
    backgroundColor: "#E50914",
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 20
  },

  playText: {
    color: "white",
    fontWeight: "bold"
  },

  back: {
    color: "white",
    textAlign: "center",
    marginTop: 10
  }
});