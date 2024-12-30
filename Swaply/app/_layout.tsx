import { Slot, SplashScreen, Stack } from "expo-router";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "@/components/Toast";
import { authStore, statusBarStore, toastStore } from "@/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "react-native";
import { clearAsyncStorage } from "@/utils";

export default function RootLayout() {
  const toastActive = toastStore.useState((state) => state.active);
  const barStyle = statusBarStore.useState((state) => state.barStyle);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    P22Mackinac_Bold: require("../assets/fonts/P22-Mackinac/P22Mackinac-Bold_23.otf"),
  });

  useEffect(() => {
    clearAsyncStorage();
    const instantiate = async () => {
      try {
        const isFaceIDAuth = await AsyncStorage.getItem("isFaceIDAuth");
        const loginToken = await AsyncStorage.getItem("loginToken");
        const email = await AsyncStorage.getItem("email");
        console.log(isFaceIDAuth, loginToken, email);

        if (isFaceIDAuth !== null) {
          authStore.update((s) => {
            s.isFaceIDAuth = true;
          });
        }
        if (loginToken !== null) {
          authStore.update((s) => {
            s.loginToken = loginToken;
            s.isReturningUser = true;
          });
        }
        if (email !== null) {
          authStore.update((s) => {
            s.email = email;
          });
        }
      } catch (e) {
        console.log(e);
      }
    };
    instantiate();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle={barStyle} />
      {toastActive && <Toast />}
      <Slot />
    </GestureHandlerRootView>
  );
}
