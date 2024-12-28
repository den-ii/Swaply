import { router } from "expo-router";
import useSWRMutation from "swr/mutation";
import Otp from "@/components/Otp";
import { authStore } from "@/store";
import { forgotPassword, validateOTP } from "@/api/authApi";

export default function VerifyOtp() {
  const email = authStore.useState((s) => s.email);

  const { trigger, isMutating } = useSWRMutation(
    "user/validate-otp",
    validateOTP,
    {
      onSuccess: (data) => {
        if (data?.status) {
          router.push("/(auth)/reset-password");
        }
      },
      onError: (error) => {
        console.log("error", error);
      },
    }
  );

  const verifyOtp = (otp: { code: string }) => {
    trigger(otp);
  };
  const { trigger: forgotPasswordTrigger } = useSWRMutation(
    "user/forgot-password",
    forgotPassword
  );

  return (
    <>
      <Otp
        title="Reset password"
        email={email}
        loading={isMutating}
        action={verifyOtp}
        actionText={"Continue"}
      />
    </>
  );
}
