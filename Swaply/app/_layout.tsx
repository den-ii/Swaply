import { router, Slot, SplashScreen, Stack, usePathname } from "expo-router";
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
import { Platform, StatusBar } from "react-native";
import { clearAsyncStorage } from "@/utils/storage";
import { registerForPushNotificationsAsync } from "@/utils/registerPushNotification";
import * as Notifications from "expo-notifications";
import useSWRMutation from "swr/mutation";
import Constants from "expo-constants";
import { updateNotification } from "@/api/authApi";
import DismissKeyboard from "@/components/DismissKeyboard";
import {
  getInitialNotificationMessageHandler,
  handlePushNotification,
  notificationClickSubscription,
  notificationOpenedApp,
  requestUserPermission,
  setBackgroundMessageHandler,
} from "@/pushNotification";
import messaging from "@react-native-firebase/messaging";

export default function RootLayout() {
  const toastActive = toastStore.useState((state) => state.active);
  const barStyle = statusBarStore.useState((state) => state.barStyle);
  // const notificationListener = useRef<Notifications.Subscription>();
  // const responseListener = useRef<Notifications.Subscription>();
  // const token = authStore.useState((s) => s.token);
  const { trigger, data, isMutating } = useSWRMutation(
    "user/update-fcm",
    updateNotification
  );

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    P22Mackinac_Bold: require("../assets/fonts/P22-Mackinac/P22Mackinac-Bold_23.otf"),
  });
  const pathname = usePathname();
  const isAuthenticated = authStore.useState((state) => state.isAuthenticated);

  useEffect(() => {
    if (
      (isAuthenticated && pathname === "/") ||
      (!isAuthenticated && pathname === "/sign-in")
    ) {
      statusBarStore.update((s) => {
        s.barStyle = "light-content";
      });
      statusBarStore.update((s) => {
        s.barStyle = "dark-content";
      });
    }
  }, [pathname]);

  useEffect(() => {
    console.log("notification useEffect:");
    let unsubscribeForeground;

    const setupNotifications = async () => {
      if (await requestUserPermission()) {
        messaging()
          .getToken()
          .then((token) => {
            notificationStore.update((s) => {
              s.token = token;
            });
          });
      }
    };
    setupNotifications();

    unsubscribeForeground = messaging().onMessage(handlePushNotification);

    messaging().onNotificationOpenedApp(notificationOpenedApp);

    messaging().setBackgroundMessageHandler(setBackgroundMessageHandler);

    messaging()
      .getInitialNotification()
      .then(getInitialNotificationMessageHandler);

    return () => {
      if (unsubscribeForeground) {
        unsubscribeForeground();
      }
      notificationClickSubscription.remove();
    };
  }, []);

  // useEffect(() => {
  //   const notification = (async () => {
  //     if (await requestUserPermission()) {
  //       messaging()
  //         .getToken()
  //         .then((token) => console.log(token));
  //     }
  //   })();

  //   const unsubscribe = messaging().onMessage(handlePushNotification);
  //   messaging().onNotificationOpenedApp(notificationOpenedApp);

  //   // Check if the app was opened from a notification (when the app was completely quit)
  //   messaging()
  //     .getInitialNotification()
  //     .then(getInitialNotificationMessageHandler);

  //   messaging().setBackgroundMessageHandler(setBackgroundMessageHandler);

  //   // Clean up the event listeners
  //   return () => {
  //     unsubscribe();
  //     notificationClickSubscription.remove();
  //   };
  // }, []);

  // useEffect(() => {
  //   registerForPushNotificationsAsync()
  //     .then((token) => {
  //       notificationStore.update((s) => {
  //         s.token = token;
  //       });
  //     })
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
      <DismissKeyboard>
        <StatusBar barStyle={barStyle} />
        {toastActive && <Toast />}
        <Slot />
      </DismissKeyboard>
    </GestureHandlerRootView>
  );
}
