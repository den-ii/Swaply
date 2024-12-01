import NavBack from "@/components/NavBack";
import { Stack } from "expo-router";

export default function BeneficiaryLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="beneficiary_details"
        options={{ header: () => <NavBack /> }}
      />
    </Stack>
  );
}
