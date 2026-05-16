import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function ProfileScreen({ navigation }) {

  return (
    <View style={styles.container}>

      {/* 🔥 AVATAR CON IMAGEN */}
      <Image 
        source={require('../assets/usuario.jpg')} // aquí pones tu imagen
        style={styles.avatar}
      />

      <Text>@usuario</Text>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Favoritos")}>
        <Text>Favoritos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn}>
        <Text>Modo oscuro</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Notificaciones")}>
        <Text>Notificaciones</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Home")}>
        <Text>Ir a inicio</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.replace("Login")}>
        <Text>Cerrar sesión</Text>
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