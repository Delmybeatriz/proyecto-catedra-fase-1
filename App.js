import React, { useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";

import AppNavigator from "./navigation/AppNavigator";

import { FavoritesProvider } from "./context/FavoritesContext";

import { saveApiKey } from "./services/secureStore";

export default function App() {
  
  useEffect(() => {

    saveApiKey("5c3b593257784048834508be58f44439");
  }, []);

  return (

    <FavoritesProvider>

      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>

    </FavoritesProvider>

  );
}