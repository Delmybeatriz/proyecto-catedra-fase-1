import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function ProfileScreen({ setScreen }) {

  return (
    <View style={styles.container}>

      {/* 🔥 AVATAR CON IMAGEN */}
      <Image 
        source={require('../assets/usuario.jpg')} // aquí pones tu imagen
        style={styles.avatar}
      />

      <Text>@usuario</Text>

      <TouchableOpacity style={styles.btn} onPress={() => setScreen("favoritos")}>
        <Text>Favoritos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn}>
        <Text>Modo oscuro</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => setScreen("notificaciones")}>
        <Text>Notificaciones</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => setScreen("home")}>
        <Text>Volver</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
    backgroundColor: "#85929E", // fondo gris-azulado
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#fff", // opcional: borde blanco para resaltar
  },

  btn: {
    width: "80%",
    backgroundColor: "#EC7063", // botón en color cálido
    padding: 12,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: "center",
  },
});