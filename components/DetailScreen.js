import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { useFavorites } from "../context/FavoritesContext";
// Importamos las funciones que creaste en api.js para cumplir tu rol de Persona 2
import { getMovieCredits, getMovieTrailers } from "../api";

export default function DetailScreen({ navigation, route }) {
  const { addFavorito } = useFavorites();
  const movie = route?.params?.movie;
  const isTv = route?.params?.isTv || false;
  
  // Estados para guardar los datos dinámicos solicitados por la rúbrica
  const [cast, setCast] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    if (movie?.id) {
      const fetchDetails = async () => {
        // FUNCIONALIDAD PERSONA 2: Traer el reparto (Cast/Actores) real desde internet
        const castData = await getMovieCredits(movie.id, isTv);
        setCast(castData);

        // FUNCIONALIDAD PERSONA 2: Obtener el trailer oficial de YouTube
        const videoKey = await getMovieTrailers(movie.id, isTv);
        setTrailerKey(videoKey);
      };
      fetchDetails();
    }
  }, [movie]);

  if (!movie) return null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      
      {/* Muestra la imagen real proveída por los nuevos endpoints */}
      <Image 
        source={movie.poster_path ? { uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` } : movie.img} 
        style={styles.poster} 
      />

      <Text style={styles.title}>{movie.name || movie.title}</Text>
      <Text style={styles.overview}>{movie.overview || "Sin sinopsis disponible en español en este momento."}</Text>

      <Text style={styles.info}>⭐ Calificación: {movie.vote_average?.toFixed(1) || movie.rating}</Text>
      {movie.release_date && <Text style={styles.info}>📅 Lanzamiento: {movie.release_date}</Text>}

      {/* 👥 CUMPLIMIENTO DE FUNCIÓN: Sección interactiva de Cast/Actores en tiempo real */}
      <Text style={styles.sectionTitle}>👥 Actores Principales (Cast)</Text>
      <View style={styles.castContainer}>
        {cast.length === 0 ? (
          <Text style={styles.loadingText}>Cargando reparto real...</Text>
        ) : (
          cast.map((actor) => (
            <View key={actor.id} style={styles.actorBadge}>
              <Text style={styles.actorName}>{actor.name}</Text>
              <Text style={styles.characterName}>como {actor.character}</Text>
            </View>
          ))
        )}
      </View>

      {/* Nota para Persona 3: Este botón mandará el objeto dinámico completo para guardarse en AsyncStorage */}
      <TouchableOpacity style={styles.favorite} onPress={() => addFavorito(movie)}>
        <Text style={styles.favoriteText}>❤️ Guardar en Favoritos</Text>
      </TouchableOpacity>

      {/* 🎬 CUMPLIMIENTO DE FUNCIÓN: Traer Trailers de YouTube */}
      {/* Nota para Persona 4: Aquí ya provees la variable 'trailerKey' para enganchar expo-av o WebView */}
      <TouchableOpacity 
        style={[styles.play, !trailerKey && { backgroundColor: '#7F8C8D' }]}
        disabled={!trailerKey}
        onPress={() => alert(`ID de Trailer de YouTube listo: ${trailerKey}.\n(Aquí la Persona 4 integrará el reproductor multimedia final con permisos).`)}
      >
        <Text style={styles.playText}>
          {trailerKey ? "▶ Ver Trailer Oficial" : "❌ Trailer No Disponible"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingVertical: 10 }}>
        <Text style={styles.back}>Volver a la cartelera</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111D27", paddingHorizontal: 20, paddingTop: 10 },
  poster: { width: "100%", height: 320, borderRadius: 15, marginBottom: 15, resizeMode: 'cover' },
  title: { fontSize: 24, fontWeight: "bold", color: "#FFDB57", marginBottom: 10 },
  overview: { color: "white", marginBottom: 15, textAlign: 'justify', lineHeight: 20 },
  info: { color: "#AEB6BF", marginBottom: 5, fontSize: 14 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#FFDB57", marginTop: 20, marginBottom: 10 },
  castContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 15 },
  actorBadge: { backgroundColor: '#1C2A38', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, borderWidth: 0.5, borderColor: '#34495E' },
  actorName: { color: 'white', fontWeight: 'bold', fontSize: 13 },
  characterName: { color: '#BDC3C7', fontSize: 11 },
  loadingText: { color: '#7F8C8D', fontStyle: 'italic' },
  favorite: { marginTop: 15, padding: 14, backgroundColor: "#243B4F", borderRadius: 10, alignItems: "center" },
  favoriteText: { fontSize: 16, color: "white", fontWeight: '600' },
  play: { backgroundColor: "#E74C3C", padding: 15, alignItems: "center", borderRadius: 10, marginVertical: 15 },
  playText: { color: "white", fontWeight: "bold", fontSize: 16 },
  back: { color: "#FFDB57", textAlign: "center", marginBottom: 20 }
});