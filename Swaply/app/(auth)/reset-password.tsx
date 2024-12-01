import PasswordVerification from "@/components/PasswordVerification";
import { router } from "expo-router";

export default function ResetPassword() {
  return (
    <PasswordVerification
      headerText="Reset Password"
      action={() => {
        router.push("/(auth)/reset-success");
      }}
      labelText="New password"
    />
  );
}
