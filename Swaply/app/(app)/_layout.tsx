import NavBack from "@/components/NavBack";
import { authStore, statusBarStore } from "@/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, Stack, usePathname } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { set } from "react-hook-form";
import { Platform } from "react-native";

export const unstable_settings = {
  initialRouteName: "/(tabs)/index",
};

export default function AppLayout() {
  const isAuthenticated = authStore.useState((s) => s.isAuthenticated);
  const [isReturningUser, setIsReturningUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useLayoutEffect(() => {
    const instantiate = async () => {
      setIsLoading(true);
      try {
        const isFaceIDAuth = await AsyncStorage.getItem("isFaceIDAuth");
        const loginToken = await AsyncStorage.getItem("loginToken");
        const token = await AsyncStorage.getItem("token");
        const email = await AsyncStorage.getItem("email");
        console.log("token: ", token);

        if (isFaceIDAuth !== null) {
          authStore.update((s) => {
            s.isFaceIDAuth = true;
          });
        }
        if (token !== null || loginToken !== null) {
          authStore.update((s) => {
            s.loginToken = loginToken;
            s.isReturningUser = true;
          });
          setIsReturningUser(true);
        }
        if (email !== null) {
          console.log("email: ", email);
          authStore.update((s) => {
            s.email = email;
          });
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };
    instantiate();
  }, []);

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

  console.log("isReturningUser:", isReturningUser);
  if (isLoading) return null;

  if (!isAuthenticated) {
    if (!isReturningUser) return <Redirect href={"/(onboarding)/"} />;
    return <Redirect href={"/(auth)/"} />;
  }
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="choose_recipient"
        options={{
          header: () => <NavBack />,
        }}
      />
      <Stack.Screen
        name="receipient_details"
        options={{ header: () => <NavBack /> }}
      />
      <Stack.Screen
        name="beneficiary_details"
        options={{ header: () => <NavBack /> }}
      />
      <Stack.Screen
        name="sending"
        options={{
          headerShown: false,
          presentation: "modal",
          animation: Platform.OS == "ios" ? "default" : "fade",
        }}
      />
      <Stack.Screen
        name="sent"
        options={{
          headerShown: false,
          presentation: "fullScreenModal",
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="(kyc)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(security)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="account-limit"
        options={{ header: () => <NavBack /> }}
      />
      <Stack.Screen name="profile" options={{ header: () => <NavBack /> }} />
      <Stack.Screen
        name="notifications"
        options={{ header: () => <NavBack /> }}
      />
    </Stack>
  );
}
