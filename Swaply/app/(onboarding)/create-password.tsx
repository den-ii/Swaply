import PasswordVerification from "@/components/PasswordVerification";
import { onboardingStore } from "@/store";
import { router } from "expo-router";

export default function CreatePassword() {
  const action = (password: string) => {
    onboardingStore.update((s) => {
      s.password = password;
    });
    router.push("/personal-details");
  };

  return (
    <PasswordVerification
      headerText="Create Password"
      action={action}
      labelText="Create password"
    />
  );
}
