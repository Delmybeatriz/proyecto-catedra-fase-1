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
import { getPopularTvShows } from '../api';

const trendingMovies = [
  { id: 101, title: 'Rapidos y furiosos', img: require('../assets/furiosos.jpg') },
  { id: 102, title: 'La estafa Maestra', img: require('../assets/laestafa.jpg') },
  { id: 103, title: 'Sonic', img: require('../assets/sonic.jpg') },
  { id: 104, title: 'Titanic', img: require('../assets/titanic.jpg') },
];

export default function HomeScreen({ setScreen, setSelectedMovie }) {
  const [search, setSearch] = useState('');
  const [showDownloads, setShowDownloads] = useState(false);
  const [downloads, setDownloads] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [popularTvShows, setPopularTvShows] = useState([]);
  const [movies] = useState([
    { id: 1, title: 'Avatar', rating: 8.5, genres: 'Acción', img: require('../assets/avatar.jpg') },
    { id: 2, title: 'Bajo cero', rating: 9.0, genres: 'Romance', img: require('../assets/bajocreo.jpg') },
    { id: 3, title: 'Batman', rating: 8.2, genres: 'Acción', img: require('../assets/batman.jpg') },
  ]);

  useEffect(() => {
    const fetchTvShows = async () => {
      const shows = await getPopularTvShows();
      setPopularTvShows(shows);
    };
    fetchTvShows();
  }, []);

  const filtered = movies.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  const addToDownloads = (movie) => {
    setDownloads((prev) => {
      if (!prev.find((m) => m.id === (movie.id || movie.name))) {
        return [...prev, movie];
      }
      return prev;
    });
  };

  const removeDownload = (id) => {
    setDownloads((prev) => prev.filter((m) => (m.id || m.name) !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* CONTENIDO DESPLAZABLE */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TextInput
          placeholder="Buscar..."
          style={styles.search}
          value={search}
          onChangeText={setSearch}
        />

        {search !== '' ? (
          <View>
            {filtered.map((movie) => (
              <View key={movie.id} style={styles.verticalItem}>
                <Image source={movie.img} style={styles.imageSmall} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.movieTitle}>{movie.title}</Text>
                  <TouchableOpacity onPress={() => addToDownloads(movie)}>
                    <Text style={{ fontSize: 18 }}>⬇️</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedMovie(movie);
                    setScreen('detail');
                  }}>
                  <Text style={{ color: 'blue', marginTop: 5 }}>Ver detalle</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          <>
            <Text style={styles.title}>Populares</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
              {popularTvShows.map((movie) => (
                <View key={movie.id} style={styles.card}>
                  <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} style={styles.image} />
                  <Text numberOfLines={1} style={styles.movieText}>{movie.name}</Text>
                  <TouchableOpacity style={styles.downloadBtn} onPress={() => addToDownloads(movie)}>
                    <Text style={{ color: '#fff', fontSize: 12 }}>⬇️ Descargar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedMovie(movie);
                      setScreen('detail');
                    }}>
                    <Text style={{ color: 'blue', marginTop: 5 }}>Ver</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>

            <Text style={styles.title}>Tendencias</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
              {trendingMovies.map((movie) => (
                <View key={movie.id} style={styles.card}>
                  <Image source={movie.img} style={styles.image} />
                  <Text numberOfLines={1} style={styles.movieText}>{movie.title}</Text>
                </View>
              ))}
            </ScrollView>
          </>
        )}
      </ScrollView>

      {/* FOOTER FIJO ABAJO */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => setScreen("home")}>
          <Text style={styles.icon}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setScreen("user")}>
          <Text style={styles.icon}>👤</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowDownloads(true)}>
          <Text style={styles.icon}>⬇️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setScreen("profile")}>
          <Text style={{ fontSize: 14, color: "red", fontWeight: 'bold' }}>Salir</Text>
        </TouchableOpacity>
      </View>

      {/* MODAL DESCARGAS */}
      <Modal visible={showDownloads} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Descargas</Text>
              <TouchableOpacity onPress={() => setShowDownloads(false)}>
                <Text style={styles.close}>✕</Text>
              </TouchableOpacity>
            </View>
            {downloads.length === 0 ? (
              <Text style={{ textAlign: 'center', marginTop: 20 }}>No hay descargas</Text>
            ) : (
              downloads.map((movie) => (
                <View key={movie.id || movie.name} style={styles.downloadItem}>
                  <Text style={{ flex: 1 }}>{movie.title || movie.name}</Text>
                  <TouchableOpacity onPress={() => setSelectedItem(movie)}>
                    <Text style={{ fontSize: 18 }}>⋮</Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        </View>
      </Modal>

      {/* MENÚ ELIMINAR */}
      {selectedItem && (
        <Modal transparent animationType="fade">
          <View style={styles.overlay}>
            <View style={styles.menuBox}>
              <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>{selectedItem.title || selectedItem.name}</Text>
              <TouchableOpacity
                onPress={() => {
                  removeDownload(selectedItem.id || selectedItem.name);
                  setSelectedItem(null);
                }}>
                <Text style={{ color: 'red', marginBottom: 15 }}>Eliminar descarga</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedItem(null)}>
                <Text>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#85929E',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100, // Espacio para que el footer no tape el contenido
  },
  search: {
    backgroundColor: '#FFDB57',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 10,
  },
  horizontalScroll: {
    marginBottom: 20,
  },
  card: {
    width: 140,
    backgroundColor: '#EBEDEF',
    marginRight: 15,
    borderRadius: 15,
    alignItems: 'center',
    padding: 10,
    elevation: 3,
  },
  image: {
    width: 110,
    height: 150,
    borderRadius: 10,
    marginBottom: 5,
  },
  movieText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  downloadBtn: {
    marginTop: 8,
    backgroundColor: '#2C3E50',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#F4F6F7',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#D5DBDB',
    elevation: 10,
  },
  icon: { fontSize: 28 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    maxHeight: '70%',
  },
  menuBox: {
    width: 250,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  // ... resto de estilos que ya tenías
});