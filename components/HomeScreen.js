import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image
} from 'react-native';
import { getPopularTvShows } from '../api';

// 🔥 IMÁGENES DE TENDENCIAS
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
  const [movies, setMovies] = useState([
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
      if (!prev.find((m) => m.id === movie.id)) {
        return [...prev, movie];
      }
      return prev;
    });
  };

  const removeDownload = (id) => {
    setDownloads((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar..."
        style={styles.search}
        value={search}
        onChangeText={setSearch}
      />

      {search !== '' ? (
        <ScrollView>
          {filtered.map((movie) => (
            <View key={movie.id} style={styles.verticalItem}>
              <Image source={movie.img} style={styles.imageSmall} />

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>{movie.title}</Text>

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
        </ScrollView>
      ) : (
        <>
          {/* POPULARES */}
          <Text style={styles.title}>Populares</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {popularTvShows.map((movie) => (
              <View key={movie.id} style={styles.card}>
                <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} style={styles.image} />
                <Text>{movie.name}</Text>

                <TouchableOpacity
                  style={styles.downloadBtn}
                  onPress={() => addToDownloads(movie)}>
                  <Text style={{ color: '#fff' }}>⬇️ Descargar</Text>
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

          {/* TENDENCIAS */}
          <Text style={styles.title}>Tendencias</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {trendingMovies.map((movie) => (
              <View key={movie.id} style={styles.card}>
                <Image source={movie.img} style={styles.image} />
                <Text>{movie.title}</Text>
              </View>
            ))}
          </ScrollView>
        </>
      )}

      {/* FOOTER */}
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
          <Text style={{ fontSize: 14, color: "red" }}>Salir</Text>
        </TouchableOpacity>
      </View>

      {/* MODAL DESCARGAS */}
      <Modal visible={showDownloads} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Descargas</Text>
              <TouchableOpacity onPress={() => setShowDownloads(false)}>
                <Text style={styles.close}>✕</Text>
              </TouchableOpacity>
            </View>

            {downloads.length === 0 ? (
              <Text style={{ textAlign: 'center', marginTop: 20 }}>
                No hay descargas
              </Text>
            ) : (
              downloads.map((movie) => (
                <View key={movie.id} style={styles.downloadItem}>
                  <Image source={movie.img} style={styles.imageDownload} />
                  <Text style={{ flex: 1, marginLeft: 10 }}>{movie.title}</Text>

                  <TouchableOpacity onPress={() => setSelectedItem(movie)}>
                    <Text style={{ fontSize: 18 }}>⋮</Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        </View>
      </Modal>

      {/* MENÚ */}
      {selectedItem && (
        <Modal transparent animationType="fade">
          <View style={styles.overlay}>
            <View style={styles.menuBox}>
              <Text>{selectedItem.title}</Text>

              <TouchableOpacity
                onPress={() => {
                  removeDownload(selectedItem.id);
                  setSelectedItem(null);
                }}>
                <Text style={{ color: 'red' }}>Eliminar</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setSelectedItem(null)}>
                <Text>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 80,
    backgroundColor: '#85929E', // Fondo agregado
  },

  search: {
    backgroundColor: '#FFDB57',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },

  card: {
    width: 140,
    height: 220,
    backgroundColor: '#ccc',
    marginRight: 10,
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
  },

  image: {
    width: 100,
    height: 120,
    borderRadius: 10,
    marginBottom: 5,
  },

  imageSmall: {
    width: 80,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },

  imageDownload: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },

  downloadBtn: {
    marginTop: 10,
    backgroundColor: '#000',
    padding: 5,
    borderRadius: 5,
  },

  verticalItem: {
    backgroundColor: '#ddd',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    backgroundColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  icon: { fontSize: 24 },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  close: { fontSize: 20 },

  downloadItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },

  menuBox: {
    width: 200,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
});