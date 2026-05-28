import * as SecureStore from "expo-secure-store";


// GUARDAR API KEY
export const saveApiKey = async (key) => {

  try {

    await SecureStore.setItemAsync(
      "tmdb_api_key",
      key
    );

  } catch (error) {

    console.log(error);
  }
};


// OBTENER API KEY
export const getApiKey = async () => {

  try {

    return await SecureStore.getItemAsync(
      "tmdb_api_key"
    );

  } catch (error) {

    console.log(error);
  }
};