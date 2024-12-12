import NavBack from "@/components/NavBack";
import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "/(tabs)/index",
};

export default function AppLayout() {
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
