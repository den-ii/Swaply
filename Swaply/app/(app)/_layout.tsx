import NavBack from "@/components/NavBack";
import { authStore } from "@/store";
import { Redirect, Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "/(tabs)/index",
};

export default function AppLayout() {
  const isAuthenticated = authStore.useState((state) => state.isAuthenticated);
  const isReturningUser = authStore.useState((state) => state.isReturningUser);

  console.log("isReturningUser:", isReturningUser);

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
          animation: "fade",
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
      <Stack.Screen
        name="notifications"
        options={{ header: () => <NavBack /> }}
      />
    </Stack>
  );
}
