import PasswordVerification from "@/components/PasswordVerification";
import { router } from "expo-router";

export default function ChangePassword() {
  return (
    <PasswordVerification
      headerText="Change Password"
      action={() => {
        router.push("/(security)/password-change-success");
      }}
      labelText="New password"
      buttonText="Save changes"
    />
  );
}
