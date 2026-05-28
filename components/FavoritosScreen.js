import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useFavorites } from "../context/FavoritesContext";


export default function FavoritosScreen({ navigation }) {

  const {
    favoritos = [],
    removeFavorito
  } = useFavorites();


  const renderItem = ({ item }) => (

    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("Details", { movie: item })
      }
    >

      <Image
        source={{
          uri: item.poster_path
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : "https://via.placeholder.com/500x750"
        }}
        style={styles.poster}
      />

      <View style={styles.info}>

        <Text style={styles.title} numberOfLines={2}>
          {item.title || item.name}
        </Text>

        <View style={styles.ratingContainer}>
          <Ionicons
            name="star"
            size={16}
            color="#FFD700"
          />

          <Text style={styles.rating}>
            {item.vote_average?.toFixed(1) || "N/A"}
          </Text>
        </View>

        <Text
          style={styles.overview}
          numberOfLines={3}
        >
          {item.overview || "Sin descripción disponible"}
        </Text>

        <View style={styles.actions}>

          <TouchableOpacity
            style={styles.watchButton}
            onPress={() =>
              navigation.navigate("Details", { movie: item })
            }
          >
            <Ionicons
              name="play"
              size={16}
              color="white"
            />

            <Text style={styles.watchText}>
              Ver detalle
            </Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() =>
              removeFavorito(item.id || item.name)
            }
          >
            <Ionicons
              name="trash"
              size={20}
              color="white"
            />
          </TouchableOpacity>

        </View>

      </View>

    </TouchableOpacity>
  );


  return (

    <View style={styles.container}>

      <Text style={styles.header}>
        ❤️ Mis Favoritos
      </Text>


      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Home")}
      >

        <Ionicons
          name="arrow-back"
          size={20}
          color="white"
        />

        <Text style={styles.backText}>
          Volver al Inicio
        </Text>

      </TouchableOpacity>



      {favoritos.length === 0 ? (

        <View style={styles.emptyContainer}>

          <Ionicons
            name="heart-dislike"
            size={80}
            color="#7F8C8D"
          />

          <Text style={styles.emptyTitle}>
            No tienes favoritos
          </Text>

          <Text style={styles.emptyText}>
            Guarda películas y aparecerán aquí
          </Text>

        </View>

      ) : (

        <FlatList
          data={favoritos}
          keyExtractor={(item) =>
            (item.id || item.name).toString()
          }
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 30
          }}
        />

      )}

    </View>
  );
}


const styles = StyleSheet.create({

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#334155",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    alignSelf: "flex-start",
    marginBottom: 20
  },

  backText: {
    color: "white",
    marginLeft: 8,
    fontWeight: "bold",
    fontSize: 15
  },

  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    paddingHorizontal: 16,
    paddingTop: 20
  },

  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#1E293B",
    borderRadius: 20,
    marginBottom: 18,
    overflow: "hidden",
    elevation: 5
  },

  poster: {
    width: 120,
    height: 190
  },

  info: {
    flex: 1,
    padding: 14,
    justifyContent: "space-between"
  },

  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8
  },

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },

  rating: {
    color: "#FFD700",
    marginLeft: 5,
    fontWeight: "bold"
  },

  overview: {
    color: "#CBD5E1",
    fontSize: 13,
    lineHeight: 18
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14
  },

  watchButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E11D48",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    flex: 1,
    justifyContent: "center"
  },

  watchText: {
    color: "white",
    marginLeft: 6,
    fontWeight: "bold"
  },

  deleteButton: {
    marginLeft: 10,
    backgroundColor: "#DC2626",
    padding: 12,
    borderRadius: 12
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  emptyTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 15
  },

  emptyText: {
    color: "#94A3B8",
    marginTop: 8,
    fontSize: 15
  }

});