import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";

export default function LoginScreen({ setScreen }) {

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    if (correo === "admin@gmail.com" && password === "1234") {
      setScreen("home");
    } else {
      alert("Datos incorrectos");
    }
  };

  return (
    <View style={styles.container}>

      <Text style={{fontSize:20, marginBottom:20}}>Iniciar Sesión</Text>

      <TextInput
        placeholder="Correo"
        value={correo}
        onChangeText={setCorreo}
        style={styles.input}
      />

      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={{color:"#fff"}}>Iniciar sesión</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },

  input:{
    width:"80%",
    backgroundColor:"#ddd",
    padding:15,
    borderRadius:10,
    marginBottom:10
  },

  button:{
    backgroundColor:"#000",
    padding:15,
    borderRadius:10,
    width:"80%",
    alignItems:"center"
  }
});