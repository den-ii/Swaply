import NavBack from "@/components/NavBack";
import { OnboardingHeader } from "@/components/OnboardingHeader";
import { statusBarStore } from "@/store";
import { Stack } from "expo-router";
import { useLayoutEffect } from "react";

export default function OnboardingLayout() {
  useLayoutEffect(() => {
    statusBarStore.update((s) => {
      s.barStyle = "dark-content";
    });
  }, []);
  return (
    <Stack screenOptions={{ animation: "fade" }}>
      <Stack.Screen
        name="index"
        options={{ header: () => <OnboardingHeader currentStage={0} /> }}
      />
      <Stack.Screen
        name="verify-otp"
        options={{
          header: () => <OnboardingHeader currentStage={1} showBack />,
        }}
      />
      <Stack.Screen
        name="create-password"
        options={{
          header: () => <OnboardingHeader currentStage={2} showBack />,
        }}
      />

      <Stack.Screen
        name="personal-details"
        options={{
          header: () => <OnboardingHeader currentStage={3} showBack />,
        }}
      />
      <Stack.Screen
        name="secure-account"
        options={{
          header: () => <OnboardingHeader currentStage={4} showBack />,
        }}
      />
    </Stack>
  );
}
