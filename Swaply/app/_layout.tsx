import { Slot, SplashScreen, Stack } from "expo-router";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "@/components/Toast";
import {
  authStore,
  notificationStore,
  statusBarStore,
  toastStore,
} from "@/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "react-native";
import { clearAsyncStorage } from "@/utils/storage";
import { registerForPushNotificationsAsync } from "@/utils/registerPushNotification";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

export default function RootLayout() {
  const toastActive = toastStore.useState((state) => state.active);
  const barStyle = statusBarStore.useState((state) => state.barStyle);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    P22Mackinac_Bold: require("../assets/fonts/P22-Mackinac/P22Mackinac-Bold_23.otf"),
  });

  useLayoutEffect(() => {
    const instantiate = async () => {
      try {
        const isFaceIDAuth = await AsyncStorage.getItem("isFaceIDAuth");
        const loginToken = await AsyncStorage.getItem("loginToken");
        const email = await AsyncStorage.getItem("email");
        console.log("loginToken:", loginToken);

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

  // useEffect(() => {
  //   registerForPushNotificationsAsync()
  //     .then((token) =>
  //       notificationStore.update((s) => {
  //         s.token = token ?? "";
  //       })
  //     )
  //     .catch((error: any) =>
  //       notificationStore.update((s) => {
  //         s.token = `${error}`;
  //       })
  //     );

  //   notificationListener.current =
  //     Notifications.addNotificationReceivedListener((notification) => {
  //       notificationStore.update((s) => {
  //         s.notification = notification;
  //       });
  //     });

  //   responseListener.current =
  //     Notifications.addNotificationResponseReceivedListener((response) => {
  //       console.log(response);
  //     });

  //   return () => {
  //     notificationListener.current &&
  //       Notifications.removeNotificationSubscription(
  //         notificationListener.current
  //       );
  //     responseListener.current &&
  //       Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);

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
