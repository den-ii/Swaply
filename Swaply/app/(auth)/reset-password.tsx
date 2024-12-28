import { resetPassword } from "@/api/authApi";
import PasswordVerification from "@/components/PasswordVerification";
import { authStore } from "@/store";
import { router } from "expo-router";
import useSWRMutation from "swr/mutation";

export default function ResetPassword() {
  const code = authStore.useState((s) => s.otp);

  const { trigger, isMutating } = useSWRMutation(
    "user/reset-password",
    resetPassword,
    {
      onSuccess: (data) => {
        if (data?.status) {
          router.push("/(auth)/reset-success");
        }
      },
      onError: (error) => {
        console.log("error", error);
      },
    }
  );

  const resetPasswordAction = (password: string) => {
    if (code) trigger({ code, password });
  };
  return (
    <PasswordVerification
      headerText="Reset Password"
      action={resetPasswordAction}
      labelText="New password"
    />
  );
}
