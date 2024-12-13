import NavBack from "@/components/NavBack";
import { Stack } from "expo-router";

export default function SecurityLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ header: () => <NavBack /> }} />
      <Stack.Screen
        name="code-change"
        options={{ header: () => <NavBack /> }}
      />
      <Stack.Screen
        name="code-change-success"
        options={{
          headerShown: false,
          presentation: "fullScreenModal",
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="password-change"
        options={{ header: () => <NavBack /> }}
      />
      <Stack.Screen
        name="password-change-success"
        options={{
          headerShown: false,
          presentation: "fullScreenModal",
          animation: "fade",
        }}
      />
    </Stack>
  );
}
