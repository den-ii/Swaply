import NavBack from "@/components/NavBack";
import { Stack } from "expo-router";

export default function MoreLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="account-limit"
        options={{ header: () => <NavBack /> }}
      />
      <Stack.Screen name="(kyc)" options={{ headerShown: false }} />
    </Stack>
  );
}
