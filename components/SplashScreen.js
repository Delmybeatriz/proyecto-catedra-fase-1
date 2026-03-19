import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SplashScreen({ setScreen }) {

  useEffect(() => {
    setTimeout(() => {
      setScreen("home");
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🎬 MoviesApp</Text>
      <Text>Cargando...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  logo:{
    fontSize:28,
    fontWeight:"bold"
  }
});