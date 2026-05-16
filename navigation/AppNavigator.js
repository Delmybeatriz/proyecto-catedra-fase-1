import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../components/SplashScreen";
import LoginScreen from "../components/Prin";
import DetailScreen from "../components/DetailScreen";
import NotificacionesScreen from "../components/NotificacionesScreen";
import MainTabs from "./MainTabs";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen
        name="Details"
        component={DetailScreen}
        options={{
          headerShown: true,
          title: "Detalle",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Notificaciones"
        component={NotificacionesScreen}
        options={{
          headerShown: true,
          title: "Notificaciones",
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}