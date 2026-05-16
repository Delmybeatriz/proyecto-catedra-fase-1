import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../components/HomeScreen";
import FavoritosScreen from "../components/FavoritosScreen";
import ProfileScreen from "../components/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#E74C3C",
        tabBarInactiveTintColor: "#566573",
        tabBarStyle: {
          backgroundColor: "#F8F9F9",
          borderTopColor: "#D5DBDB",
        },
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Home: "home",
            Favoritos: "heart",
            Perfil: "person",
          };

          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favoritos" component={FavoritosScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}