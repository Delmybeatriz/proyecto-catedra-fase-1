import React, { useState } from "react";
import {
  CameraView,
  useCameraPermissions
} from "expo-camera";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import * as Location from "expo-location";

import { useFavorites } from "../context/FavoritesContext";


export default function ProfileScreen({ navigation }) {

  const { favoritos } = useFavorites();

  const [ubicacion, setUbicacion] = useState(null);

  const [mostrarCamara, setMostrarCamara] = useState(false);

  const [facing, setFacing] = useState("front");

  const [permission, requestPermission] =
    useCameraPermissions();

  const obtenerUbicacion = async () => {

    let { status } =
      await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      alert("Permiso de ubicación denegado");
      return;
    }

    let location =
      await Location.getCurrentPositionAsync({});

    setUbicacion(location.coords);
  };

  if (mostrarCamara) {

    if (!permission) {
      return <View />;
    }

    if (!permission.granted) {
      return (
        <View style={styles.center}>

          <Text style={{ color: "white", marginBottom: 20 }}>
            Se necesita permiso para usar la cámara
          </Text>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={requestPermission}
          >
            <Text style={styles.logoutText}>
              Dar permiso
            </Text>
          </TouchableOpacity>

        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>

        <CameraView
          style={{ flex: 1 }}
          facing={facing}
        />

        {/* BOTÓN GIRAR CÁMARA */}
        <TouchableOpacity
          style={styles.flipButton}
          onPress={() =>
            setFacing(
              facing === "back"
                ? "front"
                : "back"
            )
          }
        >

          <Ionicons
            name="camera-reverse"
            size={30}
            color="white"
          />

        </TouchableOpacity>

        {/* BOTÓN CERRAR */}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setMostrarCamara(false)}
        >

          <Ionicons
            name="close"
            size={30}
            color="white"
          />

        </TouchableOpacity>

      </View>
    );
  }

  return (

    <ScrollView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>

          <Image
            source={require("../assets/usuario.jpg")}
            style={styles.avatar}
          />

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setMostrarCamara(true)}
          >

            <Ionicons
              name="add"
              size={24}
              color="white"
            />

          </TouchableOpacity>

        </View>
      </View>

      {/* ESTADÍSTICAS */}
      <View style={styles.statsContainer}>

        <View style={styles.statCard}>
          <Ionicons
            name="heart"
            size={26}
            color="#FF4D6D"
          />

          <Text style={styles.statNumber}>
            {favoritos.length}
          </Text>

          <Text style={styles.statLabel}>
            Favoritos
          </Text>
        </View>


        <View style={styles.statCard}>
          <Ionicons
            name="film"
            size={26}
            color="#FFD166"
          />

          <Text style={styles.statNumber}>
            120+
          </Text>

          <Text style={styles.statLabel}>
            Películas
          </Text>
        </View>

      </View>


      {/* OPCIONES */}

      <TouchableOpacity
        style={styles.option}
        onPress={() =>
          navigation.navigate("Favoritos")
        }
      >

        <View style={styles.optionLeft}>
          <Ionicons
            name="heart"
            size={22}
            color="#FF4D6D"
          />

          <Text style={styles.optionText}>
            Mis Favoritos
          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={22}
          color="#94A3B8"
        />

      </TouchableOpacity>


      <TouchableOpacity
        style={styles.option}
        onPress={() =>
          navigation.navigate("Notificaciones")
        }
      >

        <View style={styles.optionLeft}>
          <Ionicons
            name="notifications"
            size={22}
            color="#38BDF8"
          />

          <Text style={styles.optionText}>
            Notificaciones
          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={22}
          color="#94A3B8"
        />

      </TouchableOpacity>


      <TouchableOpacity
        style={styles.option}
        onPress={() =>
          navigation.navigate("Home")
        }
      >

        <View style={styles.optionLeft}>
          <Ionicons
            name="home"
            size={22}
            color="#4ADE80"
          />

          <Text style={styles.optionText}>
            Ir al Inicio
          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={22}
          color="#94A3B8"
        />

      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={obtenerUbicacion}
      >

        <View style={styles.optionLeft}>

          <Ionicons
            name="location"
            size={22}
            color="#F97316"
          />

          <Text style={styles.optionText}>
            Obtener Ubicación
          </Text>

        </View>

      </TouchableOpacity>

      {
        ubicacion && (

          <View style={styles.statCard}>

            <Text style={styles.optionText}>
              Latitud:
            </Text>

            <Text style={{ color: "white" }}>
              {ubicacion.latitude}
            </Text>

            <Text style={styles.optionText}>
              Longitud:
            </Text>

            <Text style={{ color: "white" }}>
              {ubicacion.longitude}
            </Text>

          </View>

        )
      }

      {/* BOTÓN LOGOUT */}

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() =>
          navigation.replace("Login")
        }
      >

        <Ionicons
          name="log-out"
          size={22}
          color="white"
        />

        <Text style={styles.logoutText}>
          Cerrar Sesión
        </Text>

      </TouchableOpacity>

    </ScrollView>
  );
}


const styles = StyleSheet.create({

  flipButton: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",

    backgroundColor: "rgba(0,0,0,0.6)",

    padding: 15,

    borderRadius: 50
  },

  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    paddingHorizontal: 20
  },

  header: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 30
  },

  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginTop: 40,
    marginBottom: 30
  },

  addButton: {
    position: "absolute",
    bottom: 0,
    right: 110,

    backgroundColor: "#E11D48",

    width: 40,
    height: 40,

    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 2,
    borderColor: "white"
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0F172A"
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#E11D48"
  },

  username: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 15
  },

  email: {
    color: "#94A3B8",
    marginTop: 5,
    fontSize: 15
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30
  },

  statCard: {
    backgroundColor: "#1E293B",
    width: "48%",
    borderRadius: 20,
    padding: 20,
    alignItems: "center"
  },

  statNumber: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10
  },

  statLabel: {
    color: "#94A3B8",
    marginTop: 5
  },

  option: {
    backgroundColor: "#1E293B",
    borderRadius: 18,
    padding: 18,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  optionLeft: {
    flexDirection: "row",
    alignItems: "center"
  },

  optionText: {
    color: "white",
    fontSize: 16,
    marginLeft: 14,
    fontWeight: "600"
  },

  logoutButton: {
    backgroundColor: "#DC2626",
    padding: 18,
    borderRadius: 18,
    marginTop: 30,
    marginBottom: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

  logoutText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 10,
    fontSize: 16
  },
  closeButton: {
  position: "absolute",
  top: 50,
  right: 20,

  backgroundColor: "rgba(0,0,0,0.6)",

  padding: 12,
  borderRadius: 50
}

});