import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useUserStore = create((set) => {
  // Obtener los datos del AsyncStorage al iniciar la aplicación
  AsyncStorage.getItem("userData")
    .then((userData) => {
      if (userData) {
        const { user, password, token } = JSON.parse(userData);
        set({ user, password, token });
      }
    })
    .catch((error) =>
      console.error("Error retrieving data from AsyncStorage:", error)
    );

  return {
    user: "",
    password: "",
    token: "",

    updateUser: (userData, passwordData ) =>
      set((state) => ({
        ...state,
        user: userData,
        password: passwordData,
      })),

    setToken: (tokenData) =>
      set((state) => ({
        ...state,
        token: tokenData,
      })),

    // Función para limpiar los datos del AsyncStorage
    clearAsyncStorage: async () => {
      try {
        await AsyncStorage.clear();
        console.log("AsyncStorage cleared successfully");
      } catch (error) {
        console.error("Error clearing AsyncStorage:", error);
      }
    },
  };
});

// Agregar un listener para almacenar los cambios en AsyncStorage
useUserStore.subscribe(
  (state) => {
    AsyncStorage.setItem("userData", JSON.stringify(state))
      .then(() => console.log("Data stored successfully"))
      .catch((error) =>
        console.error("Error storing data in AsyncStorage:", error)
      );
  },
  (state) => [state.user, state.password, state.token]
);

export default useUserStore;
