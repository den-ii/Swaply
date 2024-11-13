import NavBack from "@/components/NavBack";
// import { OnboardingHeader } from "@/components/OnboardingHeader";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ animation: "fade" }}>
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
          header: () => <NavBack />,
        }}
      />
    </Stack>
  );
}
