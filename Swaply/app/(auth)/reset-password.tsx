import PasswordVerification from "@/components/PasswordVerification";

export default function ResetPassword() {
  return (
    <PasswordVerification
      headerText="Reset Password"
      onContinue={() => {}}
      labelText="New password"
    />
  );
}
