import { router } from "expo-router";
import useSWRMutation from "swr/mutation";
import Otp from "@/components/Otp";
import { codeActivation } from "@/api/authApi";
import { authStore, toastStore, ToastType } from "@/store";

export default function VerifyOtp() {
  const email = authStore.useState((s) => s.email);
  const { trigger, data, isMutating, error } = useSWRMutation(
    "user/verify/otp",
    codeActivation,
    {
      onSuccess: (data) => {
        if (data.data.status) router.push("/create-password");
      },
    }
  );
  return (
    <Otp
      title="Verify OTP"
      email={email}
      action={trigger}
      actionText={"Verify OTP"}
      loading={isMutating}
    />
  );
}
