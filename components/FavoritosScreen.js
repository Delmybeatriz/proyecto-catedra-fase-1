import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function FavoritosScreen({ setScreen, favoritos = [], removeFavorito }) {

  return (
    <View style={styles.container}>

      {/* 🔥 BOTÓN REGRESAR A PERFIL */}
      <TouchableOpacity
        style={styles.close}
        onPress={() => setScreen("user")}
      >
        <Text style={{fontSize:20}}>✖</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Favoritos</Text>

      {favoritos.length === 0 ? (
        <Text>No tienes favoritos aún</Text>
      ) : (
        favoritos.map(movie => (
          <View key={movie.id} style={styles.item}>

            <View style={styles.box}>
              <Ionicons name="play" size={20} color="#777" />
            </View>

            <Text style={styles.name}>{movie.title}</Text>

            <Ionicons name="heart" size={20} color="black" />

            {/* 🔥 BOTÓN ELIMINAR CON BASURERO */}
            <TouchableOpacity onPress={() => removeFavorito(movie.id)}>
              <Ionicons
                name="trash"
                size={22}
                color="red"
                style={{marginLeft:10}}
              />
            </TouchableOpacity>

          </View>
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

  close:{
    position:"absolute",
    top:20,
    right:20,
    zIndex:10
  }
});