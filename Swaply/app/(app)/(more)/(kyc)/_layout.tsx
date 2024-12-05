import NavBack from "@/components/NavBack";
import { Stack } from "expo-router";

export default function KYCLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ header: () => <NavBack /> }} />
      <Stack.Screen name="nin" options={{ header: () => <NavBack /> }} />
      <Stack.Screen name="bvn" options={{ header: () => <NavBack /> }} />
    </Stack>
  );
}
