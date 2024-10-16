import NavBack from "@/components/NavBack";
import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="choose_receipient"
        options={{ header: () => <NavBack /> }}
      />
      <Stack.Screen
        name="receipient_details"
        options={{ header: () => <NavBack /> }}
      />
      <Stack.Screen
        name="sent"
        options={{ headerShown: false, presentation: "fullScreenModal" }}
      />
    </Stack>
  );
}
