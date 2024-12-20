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
import { toastStore } from "@/store";

export default function RootLayout() {
  const toastActive = toastStore.useState((state) => state.active);
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    P22Mackinac_Bold: require("../assets/fonts/P22-Mackinac/P22Mackinac-Bold_23.otf"),
  });

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
      {toastActive && <Toast />}
      <Slot />
    </GestureHandlerRootView>
  );
}
