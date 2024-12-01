import PasswordVerification from "@/components/PasswordVerification";
import { router } from "expo-router";

export default function CreatePassword() {
  return (
    <PasswordVerification
      headerText="Create Password"
      action={() => router.push("/personal-details")}
      labelText="Create password"
    />
  );
}
