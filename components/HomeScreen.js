import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
  SafeAreaView
} from 'react-native';
import { getPopularTvShows, getTrendingMovies, getTopRatedMovies, searchMovies } from '../api';

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDownloads, setShowDownloads] = useState(false);
  const [downloads, setDownloads] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Estados de la API
  const [popularTvShows, setPopularTvShows] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  // Carga inicial desde los nuevos Endpoints
  useEffect(() => {
    const fetchHomeData = async () => {
      const shows = await getPopularTvShows();
      setPopularTvShows(shows);

      const trending = await getTrendingMovies();
      setTrendingMovies(trending);

      const topRated = await getTopRatedMovies();
      setTopRatedMovies(topRated);
    };
    fetchHomeData();
  }, []);

  // Búsqueda interactiva en tiempo real con retraso inteligente (Debounce)
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (search.trim() !== '') {
        const results = await searchMovies(search);
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const addToDownloads = (movie) => {
    setDownloads((prev) => {
      const id = movie.id || movie.name;
      if (!prev.find((m) => (m.id || m.name) === id)) {
        return [...prev, movie];
      }
      return prev;
    });
  };

  const removeDownload = (id) => {
    setDownloads((prev) => prev.filter((m) => (m.id || m.name) !== id));
  };

  const openDetails = (movie, isTv = false) => {
    // Pasamos el parámetro de navegación exigido por la rúbrica
    navigation.navigate('Details', { movie, isTv });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <TextInput
          placeholder="Buscar películas en tiempo real..."
          placeholderTextColor="#7F8C8D"
          style={styles.search}
          value={search}
          onChangeText={setSearch}
        />

        {search !== '' ? (
          <View>
            <Text style={styles.title}>Resultados de búsqueda</Text>
            {searchResults.map((movie) => (
              <View key={movie.id} style={styles.verticalItem}>
                <Image 
                  source={{ uri: movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'https://via.placeholder.com/150' }} 
                  style={styles.imageSmall} 
                />
                <View style={{ flex: 1, marginLeft: 15, justifyContent: 'center' }}>
                  <Text style={styles.movieTitle}>{movie.title || movie.name}</Text>
                  <Text style={{ color: '#FFDB57', fontSize: 13, marginTop: 2 }}>⭐ {movie.vote_average?.toFixed(1)}</Text>
                  <TouchableOpacity
                    onPress={() => openDetails(movie, !movie.title)}
                    style={{ marginTop: 8 }}>
                    <Text style={{ color: '#5DADE2', fontWeight: 'bold' }}>Ver detalle</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => addToDownloads(movie)} style={{ justifyContent: 'center', paddingHorizontal: 10 }}>
                  <Text style={{ fontSize: 22 }}>⬇️</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          <>
            <Text style={styles.title}>Series Populares</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
              {popularTvShows.map((movie) => (
                <View key={movie.id} style={styles.card}>
                  <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} style={styles.image} />
                  <Text numberOfLines={1} style={styles.movieText}>{movie.name}</Text>
                  <TouchableOpacity style={styles.downloadBtn} onPress={() => addToDownloads(movie)}>
                    <Text style={{ color: '#fff', fontSize: 12 }}>⬇️ Descargar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => openDetails(movie, true)} style={{ marginTop: 5 }}>
                    <Text style={{ color: '#2980B9', fontWeight: 'bold', fontSize: 13 }}>Ver detalles</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>

            <Text style={styles.title}>Películas en Tendencia 🔥</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
              {trendingMovies.map((movie) => (
                <View key={movie.id} style={styles.card}>
                  <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} style={styles.image} />
                  <Text numberOfLines={1} style={styles.movieText}>{movie.title}</Text>
                  <TouchableOpacity style={styles.downloadBtn} onPress={() => openDetails(movie, false)}>
                    <Text style={{ color: '#fff', fontSize: 12 }}>🎬 Ver info</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>

            <Text style={styles.title}>Aclamadas por la Crítica ⭐</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
              {topRatedMovies.map((movie) => (
                <View key={movie.id} style={styles.card}>
                  <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} style={styles.image} />
                  <Text numberOfLines={1} style={styles.movieText}>{movie.title}</Text>
                  <TouchableOpacity style={styles.downloadBtn} onPress={() => openDetails(movie, false)}>
                    <Text style={{ color: '#fff', fontSize: 12 }}>⭐ Ver más</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </>
        )}
      </ScrollView>

      <TouchableOpacity style={styles.floatingButton} onPress={() => setShowDownloads(true)}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>📥 Descargas ({downloads.length})</Text>
      </TouchableOpacity>

      <Modal visible={showDownloads} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Descargas del Sistema</Text>
              <TouchableOpacity onPress={() => setShowDownloads(false)}>
                <Text style={styles.close}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={{ marginTop: 10 }}>
              {downloads.length === 0 ? (
                <Text style={{ textAlign: 'center', marginTop: 20, color: '#666' }}>No hay descargas activas</Text>
              ) : (
                downloads.map((movie) => (
                  <View key={movie.id || movie.name} style={styles.downloadItem}>
                    <Text style={{ flex: 1, fontWeight: '500' }}>{movie.title || movie.name}</Text>
                    <TouchableOpacity onPress={() => setSelectedItem(movie)}>
                      <Text style={{ fontSize: 18, paddingHorizontal: 10 }}>⋮</Text>
                    </TouchableOpacity>
                  </View>
                ))
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {selectedItem && (
        <Modal transparent animationType="fade">
          <View style={styles.overlay}>
            <View style={styles.menuBox}>
              <Text style={{ fontWeight: 'bold', marginBottom: 15, textAlign: 'center' }}>{selectedItem.title || selectedItem.name}</Text>
              <TouchableOpacity
                onPress={() => {
                  removeDownload(selectedItem.id || selectedItem.name);
                  setSelectedItem(null);
                }}>
                <Text style={{ color: 'red', marginBottom: 20, fontWeight: 'bold' }}>Eliminar descarga</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedItem(null)}>
                <Text style={{ color: '#555' }}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111D27' },
  scrollContent: { padding: 20, paddingBottom: 120 },
  search: { backgroundColor: '#FFF', padding: 12, borderRadius: 10, marginBottom: 20, color: '#000', fontSize: 16 },
  title: { fontSize: 19, fontWeight: 'bold', color: '#FFDB57', marginVertical: 12 },
  horizontalScroll: { marginBottom: 15 },
  card: { width: 140, backgroundColor: '#1C2A38', marginRight: 15, borderRadius: 15, alignItems: 'center', padding: 8, elevation: 3 },
  image: { width: 124, height: 170, borderRadius: 10, marginBottom: 5 },
  movieText: { fontSize: 12, fontWeight: '700', textAlign: 'center', color: '#FFF', width: '100%' },
  downloadBtn: { marginTop: 6, backgroundColor: '#2980B9', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 6 },
  verticalItem: { flexDirection: 'row', backgroundColor: '#1C2A38', borderRadius: 10, padding: 10, marginBottom: 12 },
  imageSmall: { width: 70, height: 100, borderRadius: 6 },
  movieTitle: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  floatingButton: { position: 'absolute', bottom: 20, alignSelf: 'center', backgroundColor: '#E74C3C', paddingVertical: 12, paddingHorizontal: 25, borderRadius: 25, elevation: 5 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { width: '85%', backgroundColor: '#fff', borderRadius: 20, padding: 20, maxHeight: '60%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 10 },
  modalTitle: { fontSize: 18, fontWeight: 'bold' },
  close: { fontSize: 20, fontWeight: 'bold', color: '#999' },
  downloadItem: { flexDirection: 'row', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee', alignItems: 'center' },
  menuBox: { width: 260, backgroundColor: '#fff', padding: 25, borderRadius: 15, alignItems: 'center' },
});