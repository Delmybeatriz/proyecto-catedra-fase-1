import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function NotificacionesScreen({ setScreen }) {
  return (
    <View style={styles.container}>

      {/* 🔥 BOTÓN REGRESAR AL PERFIL */}
      <TouchableOpacity
        style={styles.close}
        onPress={() => setScreen("user")}
      >
        <Text style={{ fontSize: 20, color: "#fff" }}>✖</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Notificaciones</Text>

      <Text style={styles.subtitle}>Estreno</Text>
      <View style={styles.bigBox}>
        <Image 
          source={require('../assets/fresas.jpg')} 
          style={styles.image} 
        />
      </View>

      <Text style={styles.subtitle}>Próximamente</Text>
      <View style={styles.bigBox}>
        <Image 
          source={require('../assets/candy.jpg')} 
          style={styles.image} 
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding:20,
    backgroundColor:"#5D6D7E" // fondo gris-azul oscuro
  },

  title:{
    fontSize:24,
    marginBottom:20,
    color:"#fff" // letra blanca
  },

  subtitle:{
    fontSize:16,
    marginTop:15,
    marginBottom:10,
    color:"#fff" // letra blanca
  },

  bigBox:{
    width:"100%",
    height:200, 
    backgroundColor:"#000", // fondo negro para resaltar imagen
    borderRadius:12,
    justifyContent:"center",
    alignItems:"center",
    overflow:"hidden", 
    marginBottom:20,
  },

  image:{
    width:"100%",
    height:"100%",
    resizeMode:"cover",
  },

  close:{
    position:"absolute",
    top:20,
    right:20,
    zIndex:10
  }
});