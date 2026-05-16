import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFavorites } from "../context/FavoritesContext";

export default function FavoritosScreen({ navigation }) {
  const { favoritos = [], removeFavorito } = useFavorites();

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Favoritos</Text>

      {favoritos.length === 0 ? (
        <Text>No tienes favoritos aún</Text>
      ) : (
        favoritos.map(movie => (
          <TouchableOpacity key={movie.id || movie.name} style={styles.item} onPress={() => navigation.navigate("Details", { movie })}>

            <View style={styles.box}>
              <Ionicons name="play" size={20} color="#777" />
            </View>

            <Text style={styles.name}>{movie.title || movie.name}</Text>

            <Ionicons name="heart" size={20} color="black" />

            <TouchableOpacity onPress={() => removeFavorito(movie.id || movie.name)}>
              <Ionicons
                name="trash"
                size={22}
                color="red"
                style={{marginLeft:10}}
              />
            </TouchableOpacity>

          </TouchableOpacity>
        ))
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20,
    backgroundColor:"#5D6D7E"
  },

  title:{
    fontSize:24,
    marginBottom:20,
    color:"white"  
  },

  item:{
    flexDirection:"row",
    alignItems:"center",
    marginBottom:15
  },

  box:{
    width:60,
    height:60,
    backgroundColor:"#f3e6bc",
    marginRight:10,
    borderRadius:10,
    justifyContent:"center",
    alignItems:"center"
  },

  name:{
    flex:1,
    fontSize:16,
    color:"black"  
  },

});