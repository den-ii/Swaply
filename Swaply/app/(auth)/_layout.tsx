import NavBack from "@/components/NavBack";
import { statusBarStore } from "@/store";
// import { OnboardingHeader } from "@/components/OnboardingHeader";
import { Stack } from "expo-router";
import { useLayoutEffect } from "react";

export default function AuthLayout() {
  useLayoutEffect(() => {
    statusBarStore.update((s) => {
      s.barStyle = "dark-content";
    });
  }, []);
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
        // options={{ header: () => <OnboardingHeader currentStage={0} /> }}
      />
      <Stack.Screen
        name="sign-in"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="verify-otp"
        options={{
          header: () => <NavBack />,
        }}
      />

      <Stack.Screen
        name="reset-password"
        options={{
          headerShown: true,
          header: () => <NavBack />,
        }}
      />
      <Stack.Screen
        name="reset-success"
        options={{
          headerShown: false,
          presentation: "fullScreenModal",
          animation: "fade",
        }}
      />
    </Stack>
  );
}
