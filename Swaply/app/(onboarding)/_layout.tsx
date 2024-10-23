import NavBack from "@/components/NavBack";
import { OnboardingHeader } from "@/components/OnboardingHeader";
import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ header: () => <OnboardingHeader currentStage={0} /> }}
      />
      {/* <Stack.Screen
        name="choose_receipient"
        options={{ header: () => <NavBack /> }}
      /> */}
    </Stack>
  );
}
