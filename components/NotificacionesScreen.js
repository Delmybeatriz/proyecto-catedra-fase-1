import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";

import { Ionicons } from "@expo/vector-icons";


export default function NotificacionesScreen({
  navigation
}) {

  return (

    <ScrollView style={styles.container}>

      {/* HEADER */}

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >

          <Ionicons
            name="arrow-back"
            size={22}
            color="white"
          />

        </TouchableOpacity>


        <Text style={styles.title}>
          Notificaciones
        </Text>

      </View>


      {/* CARD 1 */}

      <View style={styles.card}>

        <Image
          source={require("../assets/fresas.jpg")}
          style={styles.image}
        />

        <View style={styles.content}>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              PROXIMAMENTE            </Text>
          </View>

          <Text style={styles.movieTitle}>
            Strawberry Night
          </Text>

          <Text style={styles.description}>
            Ya disponible en la plataforma.
            Descubre el nuevo estreno más
            esperado de la semana 🍿
          </Text>

        </View>

      </View>


      {/* CARD 2 */}

      <View style={styles.card}>

        <Image
          source={require("../assets/candy.jpg")}
          style={styles.image}
        />

        <View style={styles.content}>

          <View
            style={[
              styles.badge,
              { backgroundColor: "#F59E0B" }
            ]}
          >

            <Text style={styles.badgeText}>
              PRÓXIMAMENTE
            </Text>

          </View>

          <Text style={styles.movieTitle}>
            Candy World
          </Text>

          <Text style={styles.description}>
            Muy pronto llegará una nueva
            aventura llena de fantasía y
            dulces increíbles 🎬
          </Text>

        </View>

      </View>


      {/* EXTRA */}

      <View style={styles.infoBox}>

        <Ionicons
          name="notifications"
          size={28}
          color="#38BDF8"
        />

        <Text style={styles.infoText}>
          Mantente atento a los próximos
          estrenos y recomendaciones
          personalizadas 😄
        </Text>

      </View>

    </ScrollView>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    paddingHorizontal: 18,
    paddingTop: 20
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25
  },

  backButton: {
    backgroundColor: "#1E293B",
    padding: 10,
    borderRadius: 12,
    marginRight: 15
  },

  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold"
  },

  card: {
    backgroundColor: "#1E293B",
    borderRadius: 22,
    overflow: "hidden",
    marginBottom: 25
  },

  image: {
    width: "100%",
    height: 220,
    resizeMode: "cover"
  },

  content: {
    padding: 18
  },

  badge: {
    backgroundColor: "#F59E0B",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 12
  },

  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold"
  },

  movieTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10
  },

  description: {
    color: "#CBD5E1",
    lineHeight: 22,
    fontSize: 14
  },

  infoBox: {
    backgroundColor: "#1E293B",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    marginBottom: 40
  },

  infoText: {
    color: "white",
    textAlign: "center",
    marginTop: 12,
    lineHeight: 22,
    fontSize: 15
  }

});