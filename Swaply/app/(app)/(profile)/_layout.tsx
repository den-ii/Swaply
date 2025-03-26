import NavBack from "@/components/NavBack";
import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="delete-account-info" />
      <Stack.Screen name="delete-account" />
    </Stack>
  );
}
